import fs from 'fs';
import path from 'path';

import { mockApartments, mockReviews } from './src/lib/mock-data';

const sentences = [
    "The location is decent for the price, but the walls are a bit thin.",
    "Management responds to maintenance requests within a day, which is nice.",
    "Amenities are okay, but the internet can be spotty during peak hours.",
    "It's a solid place to live, fairly quiet on weekdays but noisy on weekends.",
    "Kitchen appliances are a bit older, but totally functional.",
    "Right next to the bus stop, making getting to the engineering quad really easy.",
    "I haven't had any major issues, but you can definitely hear your upstairs neighbor walking.",
    "Packages sometimes get left in the lobby, but I've never lost anything.",
    "Heating is included which is great for the brutal winters here.",
    "The bedrooms are spacious, though the living room is a bit cramped for four people.",
    "Honestly, for campustown, it's pretty clean and well-kept.",
    "Maintenance guys are super friendly and fixed our dishwasher quickly.",
    "It's a typical campus apartment—nothing luxurious, but gets the job done."
];

function getRandomSentence() {
    return sentences[Math.floor(Math.random() * sentences.length)];
}

function getRandomRating() {
    return Math.floor(Math.random() * 3) + 3; // 3 to 5
}

function generateReviews() {
    // Only generate for apartments that don't already have one in mockReviews
    const existingReviewAptIds = new Set(mockReviews.map(r => r.apartment_id));
    
    const newReviews = [];
    let idCounter = Date.now();
    
    for (const apt of mockApartments) {
        if (!existingReviewAptIds.has(apt.id)) {
            newReviews.push({
                id: `rev-mock-${idCounter++}`,
                apartment_id: apt.id,
                user_id: `user-${Math.floor(Math.random() * 1000)}`,
                management_rating: getRandomRating(),
                maintenance_rating: getRandomRating(),
                value_rating: getRandomRating(),
                noise_rating: getRandomRating(),
                monthly_rent_paid: Math.floor(Math.random() * 400 + 600), // 600-1000
                written_review: `${getRandomSentence()} ${getRandomSentence()}`,
                image_urls: [],
                created_at: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
                profile: {
                    first_name: "Illini Student",
                    last_name: null,
                    is_verified: true
                },
                comments: []
            });
        }
    }
    
    return newReviews;
}

const reviewsToAdd = generateReviews();
console.log(`Generated ${reviewsToAdd.length} reviews. Reading current mock-data.ts...`);

const dataPath = path.join(__dirname, 'src', 'lib', 'mock-data.ts');
let content = fs.readFileSync(dataPath, 'utf-8');

const allReviews = [...mockReviews, ...reviewsToAdd];
const newReviewsString = JSON.stringify(allReviews, null, 4);
const newApartmentsString = JSON.stringify(mockApartments, null, 4);

const newFileContent = `import { Apartment, ReviewWithAuthor } from './types';

export const mockApartments: Apartment[] = ${newApartmentsString};

export const mockReviews: ReviewWithAuthor[] = ${newReviewsString};
`;

fs.writeFileSync(dataPath, newFileContent, 'utf-8');
console.log("Successfully appended new reviews to mock-data.ts");
