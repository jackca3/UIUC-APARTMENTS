import { Apartment, ReviewWithAuthor } from './types';
import { mockApartments, mockReviews } from './mock-data';

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
    return mockApartments.map(apt => ({
        ...apt,
        is_favorited: favorites.has(apt.id)
    }));
}

export async function getApartmentBySlug(slug: string, userId?: string): Promise<Apartment | null> {
    await delay(300);
    const favorites = getPersistedFavorites();
    const apt = mockApartments.find(a => a.slug === slug);
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
    return mockApartments.filter(apt => favorites.has(apt.id));
}

export async function getReviewsForApartment(apartmentId: string): Promise<ReviewWithAuthor[]> {
    await delay(300);
    return mockReviews.filter(r => r.apartment_id === apartmentId);
}
