import { createClient } from './supabase';
import { mockApartments, mockReviews } from './mock-data';
import { Apartment, ReviewWithAuthor } from './types';

// ── Helper ────────────────────────────────────────────────────────
const isSupabaseConfigured = () =>
    !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

// ── Favorites (localStorage fallback — fine since it's per-user) ──
const getPersistedFavorites = (): Set<string> => {
    if (typeof window === 'undefined') return new Set();
    const saved = localStorage.getItem('aptly_favorites');
    return saved ? new Set(JSON.parse(saved)) : new Set();
};
const savePersistedFavorites = (favs: Set<string>) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('aptly_favorites', JSON.stringify(Array.from(favs)));
};

// ── Types ─────────────────────────────────────────────────────────
export interface NewBuildingData {
    name: string;
    address: string;
    city: string;
    state: string;
    management_company?: string;
    official_website?: string;
    image_url?: string;
    description?: string;
}

export interface NewReviewData {
    apartmentSlug: string;
    user_id: string;
    username: string;
    written_review?: string;
    writtenReview?: string;
    managementCompany?: string;
    management_rating?: number;
    managementRating?: number;
    maintenance_rating?: number;
    maintenanceRating?: number;
    value_rating?: number;
    valueRating?: number;
    noise_rating?: number;
    noiseRating?: number;
    monthly_rent_paid?: number | null;
    monthlyRentPaid?: number | null;
    imageUrls?: string[];
    buildingImageUrl?: string | null;
}

function slugify(str: string): string {
    return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

// ── Map Supabase row → Apartment ─────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function rowToApartment(row: any): Apartment {
    return {
        id: row.id,
        name: row.name,
        slug: row.slug,
        address: row.address,
        city: row.city ?? 'Champaign',
        state: row.state ?? 'IL',
        zip: row.zip ?? '61820',
        description: row.description ?? '',
        latitude: Number(row.latitude) || 40.1106,
        longitude: Number(row.longitude) || -88.2284,
        management_company: row.management_company ?? null,
        official_website: row.official_website ?? null,
        image_url: row.image_url ?? null,
        created_at: row.created_at,
    };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function rowToReview(row: any): ReviewWithAuthor {
    return {
        id: row.id,
        apartment_id: row.apartment_id,
        user_id: row.user_id,
        management_rating: row.management_rating,
        maintenance_rating: row.maintenance_rating,
        value_rating: row.value_rating,
        noise_rating: row.noise_rating,
        monthly_rent_paid: row.monthly_rent_paid ?? null,
        written_review: row.written_review,
        image_urls: row.image_urls ?? [],
        created_at: row.created_at,
        profile: {
            first_name: row.profiles?.first_name ?? 'Illini Student',
            last_name: row.profiles?.last_name ?? null,
            is_verified: row.profiles?.is_verified ?? true,
        },
        comments: [],
    };
}

// ═══════════════════════════════════════════════════════════════════
// GET APARTMENTS
// ═══════════════════════════════════════════════════════════════════
export async function getApartments(): Promise<Apartment[]> {
    const favorites = getPersistedFavorites();

    if (!isSupabaseConfigured()) {
        // Fallback: use mock data
        return mockApartments.map(apt => ({ ...apt, is_favorited: favorites.has(apt.id) }));
    }

    const supabase = createClient();
    const { data, error } = await supabase
        .from('apartments')
        .select('*')
        .order('created_at', { ascending: false });

    if (error || !data?.length) {
        // Supabase returned nothing — fall back to mock
        return mockApartments.map(apt => ({ ...apt, is_favorited: favorites.has(apt.id) }));
    }

    return data.map(row => ({
        ...rowToApartment(row),
        is_favorited: favorites.has(row.id),
    }));
}

// ═══════════════════════════════════════════════════════════════════
// GET APARTMENT BY SLUG
// ═══════════════════════════════════════════════════════════════════
export async function getApartmentBySlug(slug: string): Promise<Apartment | null> {
    const favorites = getPersistedFavorites();

    if (!isSupabaseConfigured()) {
        const apt = mockApartments.find(a => a.slug === slug);
        return apt ? { ...apt, is_favorited: favorites.has(apt.id) } : null;
    }

    const supabase = createClient();
    const { data, error } = await supabase
        .from('apartments')
        .select('*')
        .eq('slug', slug)
        .single();

    if (error || !data) {
        const apt = mockApartments.find(a => a.slug === slug);
        return apt ? { ...apt, is_favorited: favorites.has(apt.id) } : null;
    }

    return { ...rowToApartment(data), is_favorited: favorites.has(data.id) };
}

// ═══════════════════════════════════════════════════════════════════
// GET REVIEWS FOR APARTMENT
// ═══════════════════════════════════════════════════════════════════
export async function getReviewsForApartment(apartmentId: string): Promise<ReviewWithAuthor[]> {
    if (!isSupabaseConfigured()) {
        return mockReviews.filter(r => r.apartment_id === apartmentId);
    }

    const supabase = createClient();
    
    // First attempt: Joined fetch
    const { data, error } = await supabase
        .from('reviews')
        .select('*, profiles(first_name, last_name, is_verified)')
        .eq('apartment_id', apartmentId)
        .order('created_at', { ascending: false });

    // Fallback if join relationship is missing in Supabase cache
    if (error?.message?.includes('relationship') || error?.message?.includes('profiles')) {
        console.warn('Relationship "profiles" not found in cache, falling back to non-joined fetch.');
        const { data: secondData, error: secondError } = await supabase
            .from('reviews')
            .select('*')
            .eq('apartment_id', apartmentId)
            .order('created_at', { ascending: false });
            
        if (secondError || !secondData) {
             return mockReviews.filter(r => r.apartment_id === apartmentId);
        }
        return secondData.map(rowToReview);
    }

    if (error || !data) {
        return mockReviews.filter(r => r.apartment_id === apartmentId);
    }

    return data.map(rowToReview);
}

// ═══════════════════════════════════════════════════════════════════
// GET REVIEW BY ID
// ═══════════════════════════════════════════════════════════════════
export async function getReviewById(reviewId: string): Promise<ReviewWithAuthor | null> {
    if (!isSupabaseConfigured()) {
        return mockReviews.find(r => r.id === reviewId) ?? null;
    }

    const supabase = createClient();
    
    // First attempt: Joined fetch
    const { data, error } = await supabase
        .from('reviews')
        .select('*, profiles(first_name, last_name, is_verified)')
        .eq('id', reviewId)
        .single();

    // Fallback if join relationship is missing in Supabase cache
    if (error?.message?.includes('relationship') || error?.message?.includes('profiles')) {
        const { data: secondData, error: secondError } = await supabase
            .from('reviews')
            .select('*')
            .eq('id', reviewId)
            .single();
        if (secondError || !secondData) return null;
        return rowToReview(secondData);
    }

    if (error || !data) return null;
    return rowToReview(data);
}

// ═══════════════════════════════════════════════════════════════════
// TOGGLE FAVORITE (localStorage — works without Supabase)
// ═══════════════════════════════════════════════════════════════════
export async function toggleFavorite(apartmentId: string): Promise<boolean> {
    const favorites = getPersistedFavorites();
    if (favorites.has(apartmentId)) {
        favorites.delete(apartmentId);
        savePersistedFavorites(favorites);
        return false;
    }
    favorites.add(apartmentId);
    savePersistedFavorites(favorites);
    return true;
}

export async function getFavorites(): Promise<Apartment[]> {
    const favorites = getPersistedFavorites();
    const all = await getApartments();
    return all.filter(apt => favorites.has(apt.id));
}

// ═══════════════════════════════════════════════════════════════════
// ADD BUILDING
// ═══════════════════════════════════════════════════════════════════
export async function addBuilding(data: NewBuildingData): Promise<{ apartment: Apartment; isDuplicate: boolean }> {
    if (!isSupabaseConfigured()) {
        // Fallback — store locally
        const { addBuilding: storeAdd, findByAddress, slugify: storeSlugify } = await import('./store');
        const existing = findByAddress(data.address);
        if (existing) return { apartment: existing, isDuplicate: true };
        const id = `user-${Date.now()}`;
        const slug = storeSlugify(data.name) + '-' + id.slice(-6);
        const apt: Apartment = {
            id, name: data.name, slug, address: data.address, city: data.city || 'Champaign',
            state: data.state || 'IL', zip: '61820',
            description: data.description || `${data.name} is a student-listed property in Champaign, IL.`,
            latitude: 40.1106, longitude: -88.2284,
            management_company: data.management_company ?? null,
            official_website: data.official_website ?? null,
            image_url: data.image_url ?? null,
            created_at: new Date().toISOString(),
        };
        storeAdd(apt);
        return { apartment: apt, isDuplicate: false };
    }

    const supabase = createClient();

    // Duplicate check
    const { data: existing } = await supabase
        .from('apartments')
        .select('*')
        .ilike('address', data.address.trim())
        .maybeSingle();

    if (existing) return { apartment: rowToApartment(existing), isDuplicate: true };

    const slug = slugify(data.name) + '-' + Date.now().toString().slice(-6);
    const newApt = {
        name: data.name,
        slug,
        address: data.address,
        city: data.city || 'Champaign',
        state: data.state || 'IL',
        zip: '61820',
        description: data.description || `${data.name} is a student-listed property in Champaign, IL.`,
        latitude: 40.1106,
        longitude: -88.2284,
        management_company: data.management_company ?? null,
        official_website: data.official_website ?? null,
        image_url: data.image_url ?? null,
    };

    const { data: inserted, error } = await supabase
        .from('apartments')
        .insert(newApt)
        .select()
        .single();

    if (error || !inserted) throw new Error(error?.message || 'Failed to add building.');
    return { apartment: rowToApartment(inserted), isDuplicate: false };
}

// ═══════════════════════════════════════════════════════════════════
// ADD REVIEW
// ═══════════════════════════════════════════════════════════════════
export async function addReview(data: NewReviewData): Promise<ReviewWithAuthor> {
    const managementRating  = data.managementRating  ?? data.management_rating  ?? 0;
    const maintenanceRating = data.maintenanceRating ?? data.maintenance_rating ?? 0;
    const valueRating       = data.valueRating       ?? data.value_rating       ?? 0;
    const noiseRating       = data.noiseRating       ?? data.noise_rating       ?? 0;
    const writtenReview     = data.writtenReview     ?? data.written_review     ?? '';
    const monthlyRentPaid   = data.monthlyRentPaid   ?? data.monthly_rent_paid  ?? null;
    const imageUrls         = data.imageUrls?.filter(u => u.trim()) ?? [];

    if (!isSupabaseConfigured()) {
        const { addUserReview, getUserReviews, getUserBuildings, updateBuilding } = await import('./store');
        const { mockApartments: mApts } = await import('./mock-data');
        const apt = getUserBuildings().find(a => a.slug === data.apartmentSlug)
            || mApts.find(a => a.slug === data.apartmentSlug);
        const apartmentId = apt?.id ?? data.apartmentSlug;

        const existing = getUserReviews().find(r => r.apartment_id === apartmentId && r.user_id === data.user_id);
        if (existing) throw new Error('You have already reviewed this apartment.');

        // Update cover image
        if (apt) {
            const coverImg = data.buildingImageUrl || (imageUrls.length ? imageUrls[0] : null);
            if (coverImg) {
                apt.image_url = coverImg;
                updateBuilding({ ...apt });
            }
        }

        const review: ReviewWithAuthor = {
            id: `rev-${Date.now()}`,
            apartment_id: apartmentId,
            user_id: data.user_id,
            management_rating: managementRating,
            maintenance_rating: maintenanceRating,
            value_rating: valueRating,
            noise_rating: noiseRating,
            monthly_rent_paid: monthlyRentPaid,
            written_review: writtenReview,
            image_urls: imageUrls,
            created_at: new Date().toISOString(),
            profile: { first_name: data.username, last_name: null, is_verified: true },
            comments: [],
        };
        addUserReview(review);
        return review;
    }

    const supabase = createClient();

    // Resolve apartment ID from slug
    const { data: apt, error: aptErr } = await supabase
        .from('apartments')
        .select('id, image_url')
        .eq('slug', data.apartmentSlug)
        .single();

    if (aptErr || !apt) throw new Error('Apartment not found.');

    // Duplicate check
    const { data: existingRev } = await supabase
        .from('reviews')
        .select('id')
        .eq('apartment_id', apt.id)
        .eq('user_id', data.user_id)
        .maybeSingle();

    if (existingRev) throw new Error('You have already reviewed this apartment.');

    // Update cover image if user pasted one
    const coverImg = data.buildingImageUrl || (imageUrls.length ? imageUrls[0] : null);
    if (coverImg) {
        await supabase
            .from('apartments')
            .update({ image_url: coverImg })
            .eq('id', apt.id);
    }

    // 1. Ensure profile exists (Upsert)
    const { error: profileErr } = await supabase
        .from('profiles')
        .upsert({
            id: data.user_id,
            email: `${data.username}@illinois.edu`,
            username: data.username,
            first_name: data.username,
            is_verified: true
        });

    if (profileErr) {
        console.error('Profile upsert failed:', profileErr);
        // We continue anyway, but the review insert might fail if FK is strict
    }

    // 2. Insert Review (Simplified select to bypass schema cache issues)
    const { data: inserted, error } = await supabase
        .from('reviews')
        .insert({
            apartment_id: apt.id,
            user_id: data.user_id,
            management_rating: managementRating,
            maintenance_rating: maintenanceRating,
            value_rating: valueRating,
            noise_rating: noiseRating,
            monthly_rent_paid: monthlyRentPaid,
            written_review: writtenReview,
            image_urls: imageUrls,
        })
        .select('*')
        .single();

    if (error || !inserted) {
        console.error('Review insert failed:', error);
        throw new Error(error?.message || 'Failed to submit review.');
    }

    // Manually construct the review object with the author info we already have
    // This avoids needing a database join that might be broken in the cache
    return {
        ...inserted,
        profile: {
            first_name: data.username,
            last_name: null,
            is_verified: true
        },
        comments: []
    } as ReviewWithAuthor;
}


// ═══════════════════════════════════════════════════════════════════
// UPDATE REVIEW
// ═══════════════════════════════════════════════════════════════════
export async function updateReview(reviewId: string, data: NewReviewData): Promise<ReviewWithAuthor | null> {
    if (!isSupabaseConfigured()) {
        const { updateUserReview, getUserReviews } = await import('./store');
        const existing = getUserReviews().find(r => r.id === reviewId);
        if (!existing) return null;
        const updatedData = {
            management_rating:  data.managementRating  ?? data.management_rating  ?? existing.management_rating,
            maintenance_rating: data.maintenanceRating ?? data.maintenance_rating ?? existing.maintenance_rating,
            value_rating:       data.valueRating       ?? data.value_rating       ?? existing.value_rating,
            noise_rating:       data.noiseRating       ?? data.noise_rating       ?? existing.noise_rating,
            monthly_rent_paid:  data.monthlyRentPaid   ?? data.monthly_rent_paid  ?? existing.monthly_rent_paid,
            written_review:     data.writtenReview     ?? data.written_review     ?? existing.written_review,
            image_urls:         data.imageUrls?.filter(u => u.trim()) ?? existing.image_urls,
        };
        updateUserReview(reviewId, updatedData);
        return { ...existing, ...updatedData };
    }

    const existing = await getReviewById(reviewId);
    if (!existing) return null;

    const supabase = createClient();

    const imageUrls = data.imageUrls?.filter(u => u.trim()) ?? existing.image_urls ?? [];

    // Update apartment cover image if a new one was pasted
    const coverImg = data.buildingImageUrl || (imageUrls.length ? imageUrls[0] : null);
    if (coverImg) {
        await supabase
            .from('apartments')
            .update({ image_url: coverImg })
            .eq('id', existing.apartment_id);
    }

    const { data: updated, error } = await supabase
        .from('reviews')
        .update({
            management_rating:  data.managementRating  ?? data.management_rating  ?? existing.management_rating,
            maintenance_rating: data.maintenanceRating ?? data.maintenance_rating ?? existing.maintenance_rating,
            value_rating:       data.valueRating       ?? data.value_rating       ?? existing.value_rating,
            noise_rating:       data.noiseRating       ?? data.noise_rating       ?? existing.noise_rating,
            monthly_rent_paid:  data.monthlyRentPaid   ?? data.monthly_rent_paid  ?? existing.monthly_rent_paid,
            written_review:     data.writtenReview     ?? data.written_review     ?? existing.written_review,
            image_urls: imageUrls,
        })
        .eq('id', reviewId)
        .select('*')
        .single();

    if (error || !updated) return null;
    
    // Return with existing profile info to avoid the relationship join error
    return {
        ...updated,
        profile: existing.profile,
        comments: existing.comments || []
    } as ReviewWithAuthor;
}
