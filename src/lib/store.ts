// Client-side singleton store for user-added buildings and reviews.
// Persisted to localStorage to survive page refreshes.
import { Apartment, ReviewWithAuthor } from './types';

const BUILDINGS_KEY = 'aptly_user_buildings';
const REVIEWS_KEY = 'aptly_user_reviews';

export function getUserBuildings(): Apartment[] {
    if (typeof window === 'undefined') return [];
    try {
        const data = localStorage.getItem(BUILDINGS_KEY);
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
}

export function getUserReviews(): ReviewWithAuthor[] {
    if (typeof window === 'undefined') return [];
    try {
        const data = localStorage.getItem(REVIEWS_KEY);
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
}

function saveUserBuildings(buildings: Apartment[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(BUILDINGS_KEY, JSON.stringify(buildings));
}

function saveUserReviews(reviews: ReviewWithAuthor[]): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(REVIEWS_KEY, JSON.stringify(reviews));
}

/** Find a user-added apartment by address (case-insensitive) */
export function findByAddress(address: string): Apartment | undefined {
    const needle = address.trim().toLowerCase();
    const buildings = getUserBuildings();
    return buildings.find(a => a.address.trim().toLowerCase() === needle);
}

/** Add a new apartment to the store */
export function addBuilding(apt: Apartment): void {
    const buildings = getUserBuildings();
    buildings.unshift(apt);
    saveUserBuildings(buildings);
}

/** Update an existing apartment in the store (e.g. to add an image) */
export function updateBuilding(apt: Apartment): void {
    const buildings = getUserBuildings();
    const idx = buildings.findIndex(b => b.id === apt.id);
    if (idx !== -1) {
        buildings[idx] = apt;
        saveUserBuildings(buildings);
    }
}

/** Add a new review to the store */
export function addUserReview(review: ReviewWithAuthor): void {
    const reviews = getUserReviews();
    reviews.unshift(review);
    saveUserReviews(reviews);
}

/** Update an existing review in the store */
export function updateUserReview(reviewId: string, updatedData: Partial<ReviewWithAuthor>): void {
    const reviews = getUserReviews();
    const idx = reviews.findIndex(r => r.id === reviewId);
    if (idx !== -1) {
        reviews[idx] = { ...reviews[idx], ...updatedData };
        saveUserReviews(reviews);
    }
}

/** Slugify a string for use as a URL */
export function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
}
