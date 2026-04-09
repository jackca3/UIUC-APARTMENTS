import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { mockApartments, mockReviews } from './src/lib/mock-data';

function escapeSqlString(str: string | null | undefined): string {
    if (str === null || str === undefined) return 'NULL';
    return "'" + str.replace(/'/g, "''") + "'";
}

let sql = `-- Supabase Seeding SQL Dump\n\n`;

// 1. Create a dummy user in auth.users to own all these mock reviews
const MOCK_USER_ID = crypto.randomUUID();
sql += `
-- 1. Insert Dummy User
INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at)
VALUES (
    '00000000-0000-0000-0000-000000000000',
    '${MOCK_USER_ID}',
    'authenticated',
    'authenticated',
    'mockuser_12345@illinois.edu',
    crypt('mockpassword123', gen_salt('bf')),
    NOW(),
    '{"provider":"email","providers":["email"]}',
    '{}',
    NOW(),
    NOW()
) ON CONFLICT (id) DO NOTHING;

-- Supabase triggers will automatically create public.profiles. We just update the name.
UPDATE public.profiles
SET first_name = 'Illini', last_name = 'Student', is_verified = TRUE
WHERE id = '${MOCK_USER_ID}';

`;

// Map old mock IDs to new UUIDs
const apartmentIdMap = new Map<string, string>();

sql += `-- 2. Insert Apartments\n`;
for (const apt of mockApartments) {
    const newId = crypto.randomUUID();
    apartmentIdMap.set(apt.id, newId);
    
    sql += `INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    '${newId}',
    ${escapeSqlString(apt.name)},
    ${escapeSqlString(apt.slug)},
    ${escapeSqlString(apt.address)},
    ${escapeSqlString(apt.city)},
    ${escapeSqlString(apt.state)},
    ${escapeSqlString(apt.zip)},
    ${escapeSqlString(apt.description)},
    ${apt.latitude || 'NULL'},
    ${apt.longitude || 'NULL'},
    ${escapeSqlString(apt.management_company)},
    ${escapeSqlString(apt.official_website)},
    ${escapeSqlString(apt.image_url)},
    ${escapeSqlString(apt.created_at)}
);\n`;
}

sql += `\n-- 3. Insert Reviews\n`;
for (const rev of mockReviews) {
    const newId = crypto.randomUUID();
    const aptUuid = apartmentIdMap.get(rev.apartment_id);
    if (!aptUuid) continue; // Skip if apartment not found
    
    // Convert array to Postgres string array format
    let imagesSql = 'NULL';
    if (rev.image_urls && rev.image_urls.length > 0) {
        const escapedUrls = rev.image_urls.map(u => '"' + u.replace(/"/g, '""') + '"').join(',');
        imagesSql = `'{${escapedUrls}}'`;
    }

    sql += `INSERT INTO public.reviews (id, apartment_id, user_id, maintenance_rating, noise_rating, management_rating, value_rating, monthly_rent_paid, written_review, image_urls, created_at)
VALUES (
    '${newId}',
    '${aptUuid}',
    '${MOCK_USER_ID}',
    ${rev.maintenance_rating},
    ${rev.noise_rating},
    ${rev.management_rating},
    ${rev.value_rating},
    ${rev.monthly_rent_paid || 'NULL'},
    ${escapeSqlString(rev.written_review)},
    ${imagesSql},
    ${escapeSqlString(rev.created_at)}
);\n`;
}

fs.writeFileSync('supabase_seed_dump.sql', sql, 'utf-8');
console.log('Successfully generated supabase_seed_dump.sql');
