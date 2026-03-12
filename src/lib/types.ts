export type Profile = {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  is_verified: boolean;
  created_at: string;
};

export type LeasingCompany = {
  id: string;
  name: string;
  slug: string;
  website: string | null;
  phone: string | null;
  email: string | null;
  created_at: string;
};

export interface Apartment {
  id: string;
  name: string;
  slug: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  description: string;
  latitude: number;
  longitude: number;
  management_company: string | null;
  official_website: string | null;
  image_url: string | null;
  created_at: string;
  is_favorited?: boolean;
}

export interface Review {
  id: string;
  apartment_id: string;
  user_id: string;
  management_rating: number;
  maintenance_rating: number;
  value_rating: number;
  noise_rating: number;
  monthly_rent_paid: number | null;
  written_review: string;
  image_urls?: string[];
  created_at: string;
}

export type Comment = {
  id: string;
  review_id: string;
  user_id: string;
  body: string;
  created_at: string;
  updated_at: string;
};

export interface Favorite {
  id: string;
  user_id: string;
  apartment_id: string;
  created_at: string;
}

export type HelpfulVote = {
  id: string;
  review_id: string;
  user_id: string;
  created_at: string;
};

// Joined types for UI
export type ApartmentWithCompany = Apartment & {
  leasing_company: LeasingCompany | null;
  reviews?: Review[];
};

export type ReviewWithAuthor = Review & {
  profile: Pick<Profile, 'first_name' | 'last_name' | 'is_verified'>;
  comments?: CommentWithAuthor[];
};

export type CommentWithAuthor = Comment & {
  profile: Pick<Profile, 'first_name' | 'last_name' | 'is_verified'>;
};
