import { Apartment, ReviewWithAuthor } from './types';
import { mockApartments, mockReviews } from './mock-data';
import { getUserBuildings, getUserReviews, addBuilding as storeAddBuilding, updateBuilding, addUserReview, updateUserReview, findByAddress, slugify } from './store';

// Helper to handle localStorage in a SSR-safe way
const getPersistedFavorites = (): Set<string> => {
    if (typeof window === 'undefined') return new Set();
    const saved = localStorage.getItem('aptly_favorites');
    return saved ? new Set(JSON.parse(saved)) : new Set();
};

const savePersistedFavorites = (favs: Set<string>) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('aptly_favorites', JSON.stringify(Array.from(favs)));
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function getApartments(userId?: string): Promise<Apartment[]> {
    await delay(300);
    const favorites = getPersistedFavorites();
    const all = [...getUserBuildings(), ...mockApartments];
    return all.map(apt => ({
        ...apt,
        is_favorited: favorites.has(apt.id)
    }));
}

export async function getApartmentBySlug(slug: string, userId?: string): Promise<Apartment | null> {
    await delay(300);
    const favorites = getPersistedFavorites();
    // Check user-added buildings first
    const userApt = getUserBuildings().find(a => a.slug === slug);
    const apt = userApt || mockApartments.find(a => a.slug === slug);
    if (!apt) return null;
    return { 
        ...apt, 
        is_favorited: favorites.has(apt.id) 
    };
}

export async function toggleFavorite(apartmentId: string): Promise<boolean> {
    await delay(100);
    const favorites = getPersistedFavorites();
    let newState = false;
    if (favorites.has(apartmentId)) {
        favorites.delete(apartmentId);
        newState = false;
    } else {
        favorites.add(apartmentId);
        newState = true;
    }
    savePersistedFavorites(favorites);
    return newState;
}

export async function getFavorites(userId: string): Promise<Apartment[]> {
    await delay(300);
    const favorites = getPersistedFavorites();
    const all = [...getUserBuildings(), ...mockApartments];
    return all.filter(apt => favorites.has(apt.id));
}

export async function getReviewById(reviewId: string): Promise<ReviewWithAuthor | null> {
    await delay(200);
    const storeRevs = getUserReviews();
    const rev = storeRevs.find(r => r.id === reviewId) || mockReviews.find(r => r.id === reviewId);
    return rev || null;
}

export async function getReviewsForApartment(apartmentId: string): Promise<ReviewWithAuthor[]> {
    await delay(300);
    const storeRevs = getUserReviews().filter(r => r.apartment_id === apartmentId);
    const mockRevs = mockReviews.filter(r => r.apartment_id === apartmentId);
    return [...storeRevs, ...mockRevs];
}

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

/** Returns existing apartment if address duplicate, otherwise creates and returns the new one */
export async function addBuilding(data: NewBuildingData): Promise<{ apartment: Apartment; isDuplicate: boolean }> {
    await delay(500);
    // Duplicate check
    const existing = findByAddress(data.address);
    if (existing) {
        return { apartment: existing, isDuplicate: true };
    }
    const id = `user-${Date.now()}`;
    const slug = slugify(data.name) + '-' + id.slice(-6);
    const now = new Date().toISOString();
    const apt: Apartment = {
        id,
        name: data.name,
        slug,
        address: data.address,
        city: data.city || 'Champaign',
        state: data.state || 'IL',
        zip: '61820',
        description: data.description || `${data.name} is a residential building in Champaign, IL added by a verified Apt.ly student.`,
        latitude: 40.1106,
        longitude: -88.2284,
        management_company: data.management_company || null,
        official_website: data.official_website || null,
        image_url: data.image_url || `https://maps.googleapis.com/maps/api/streetview?size=800x600&location=${encodeURIComponent(data.address + ', Champaign, IL')}`,
        created_at: now,
    };
    storeAddBuilding(apt);
    return { apartment: apt, isDuplicate: false };
}

export async function addReview(data: NewReviewData): Promise<ReviewWithAuthor> {
    await delay(300);

    // Normalise field names (supports both camelCase from write-review and snake_case from add-building)
    const managementRating = data.managementRating ?? data.management_rating ?? 0;
    const maintenanceRating = data.maintenanceRating ?? data.maintenance_rating ?? 0;
    const valueRating = data.valueRating ?? data.value_rating ?? 0;
    const noiseRating = data.noiseRating ?? data.noise_rating ?? 0;
    const writtenReview = data.writtenReview ?? data.written_review ?? '';
    const monthlyRentPaid = data.monthlyRentPaid ?? data.monthly_rent_paid ?? null;

    // Resolve apartment_id from slug
    const apt = getUserBuildings().find(a => a.slug === data.apartmentSlug)
        || mockApartments.find(a => a.slug === data.apartmentSlug);
    const apartmentId = apt?.id ?? data.apartmentSlug;

    // Strict check: only one review per apartment per user allowed
    const storeRevs = getUserReviews();
    const existingReview = storeRevs.find(r => r.apartment_id === apartmentId && r.user_id === data.user_id);
    if (existingReview) {
        throw new Error("You have already reviewed this apartment.");
    }

    // If reviewer supplied a building photo, update the apartment's image_url
    if (data.buildingImageUrl && apt && !apt.image_url) {
        apt.image_url = data.buildingImageUrl;
        updateBuilding(apt);
    } else if (data.buildingImageUrl && apt) {
        // Always prefer user-supplied photo over street view fallback
        apt.image_url = data.buildingImageUrl;
        updateBuilding(apt);
    } else if (data.imageUrls?.length && apt && !apt.image_url) {
        // If they didn't provide a building image specifically, but provided a review image,
        // use the first review image as the cover photo if it doesn't have one
        apt.image_url = data.imageUrls[0];
        updateBuilding(apt);
    }

    // Update management company if provided and currently missing
    if (data.managementCompany && apt && !apt.management_company) {
        apt.management_company = data.managementCompany;
        updateBuilding(apt);
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
        image_urls: data.imageUrls?.filter(u => u.trim()) ?? [],
        created_at: new Date().toISOString(),
        profile: {
            first_name: data.username,
            last_name: null,
            is_verified: true,
        },
        comments: [],
    };
    addUserReview(review);
    return review;
}

export async function updateReview(reviewId: string, data: NewReviewData): Promise<ReviewWithAuthor | null> {
    await delay(300);
    const existing = await getReviewById(reviewId);
    if (!existing) return null;

    const managementRating = data.managementRating ?? data.management_rating ?? existing.management_rating;
    const maintenanceRating = data.maintenanceRating ?? data.maintenance_rating ?? existing.maintenance_rating;
    const valueRating = data.valueRating ?? data.value_rating ?? existing.value_rating;
    const noiseRating = data.noiseRating ?? data.noise_rating ?? existing.noise_rating;
    const writtenReview = data.writtenReview ?? data.written_review ?? existing.written_review;
    const monthlyRentPaid = data.monthlyRentPaid !== undefined ? data.monthlyRentPaid : data.monthly_rent_paid !== undefined ? data.monthly_rent_paid : existing.monthly_rent_paid;
    
    // Update management company if provided and currently missing
    const apt = getUserBuildings().find(a => a.id === existing.apartment_id) || mockApartments.find(a => a.id === existing.apartment_id);
    if (data.managementCompany && apt && !apt.management_company) {
        apt.management_company = data.managementCompany;
        updateBuilding(apt);
    }

    const updatedData: Partial<ReviewWithAuthor> = {
        management_rating: managementRating,
        maintenance_rating: maintenanceRating,
        value_rating: valueRating,
        noise_rating: noiseRating,
        monthly_rent_paid: monthlyRentPaid,
        written_review: writtenReview,
        image_urls: data.imageUrls?.filter(u => u.trim()) ?? existing.image_urls,
    };
    
    updateUserReview(reviewId, updatedData);
    return { ...existing, ...updatedData };
}
