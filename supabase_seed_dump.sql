-- ================================================================
-- Apt.ly Supabase Seed Data
-- SAFE TO RUN: No auth.users inserts (Supabase blocks those via SQL Editor)
-- ================================================================

-- Disable RLS temporarily for bulk insert
ALTER TABLE public.apartments DISABLE ROW LEVEL SECURITY;

-- ── Insert all apartments ──────────────────────────────────────
INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    'c4750e76-6c6c-47fe-9b70-e87f16e712bb',
    '202 E Chalmers',
    '202-e-chalmers-202',
    '202 E Chalmers St',
    'Champaign',
    'IL',
    '61820',
    '202 E Chalmers offers convenient student housing located close to the UIUC campus.',
    40.1065,
    -88.2333,
    'Independent',
    NULL,
    '/apartments/202_e_chalmers.png',
    '2026-04-09T07:43:00.844Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    '85898f18-fc0c-4f2a-a618-76a96b67eb05',
    'The Dean Campustown',
    'the-dean-campustown',
    '708 S 6th St',
    'Champaign',
    'IL',
    '61820',
    'The Dean offers premium student living with a rooftop pool, modern amenities, and prime location steps from Greek life and Green Street.',
    40.1111,
    -88.2307,
    'Core Spaces',
    'https://thedean.com',
    '/apartments/the_dean.jpg',
    '2026-04-09T07:26:25.032Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    '6bcf6c66-8271-4cb1-81e6-c70b61aa4ad7',
    'Seven07',
    'seven07',
    '707 S 3rd St',
    'Champaign',
    'IL',
    '61820',
    'Seven07 offers luxury high-rise living with a gym, outdoor pool, and spectacular views of the UIUC campus.',
    40.1114,
    -88.2373,
    'Greystar',
    'https://seven07.com',
    '/apartments/seven07.jpg',
    '2026-04-09T07:26:25.046Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    '3fe6a2fc-e98b-41e8-9864-44105b2a5434',
    '212 East',
    '212-east',
    '212 E Green St',
    'Champaign',
    'IL',
    '61820',
    '212 East is a premier residential building located in the heart of Green street, offering fully furnished apartments.',
    40.1102,
    -88.2355,
    'Green Street Realty',
    NULL,
    '/apartments/212_east.jpg',
    '2026-04-09T07:26:25.046Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    'bcef781a-c87c-4a3a-a4a4-22a915df149c',
    'Latitude',
    'latitude',
    '608 E University Ave',
    'Champaign',
    'IL',
    '61820',
    'Latitude features luxury student apartments close to the engineering quad, with study spaces, a pool, and high-end fitness center.',
    40.1167,
    -88.2286,
    'Peak Campus',
    NULL,
    '/apartments/latitude.jpg',
    '2026-04-09T07:26:25.046Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    '90fec5f7-be1c-40fd-9536-7fabd2bbff23',
    'Hub Champaign-Daniel',
    'hub-champaign-daniel',
    '616 E Daniel St',
    'Champaign',
    'IL',
    '61820',
    'Hub Champaign Daniel offers fully furnished student apartments with luxury amenities including a spa, sauna, and resort-style pool.',
    40.1098,
    -88.2295,
    'Core Spaces',
    NULL,
    '/apartments/the_hub.jpg',
    '2026-04-09T07:26:25.046Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    '33fb2d7c-4843-43c0-bb38-94ff1c8d31b8',
    'HERE Champaign',
    'here-champaign',
    '308 E Green St',
    'Champaign',
    'IL',
    '61820',
    'HERE offers luxury student apartments featuring automated parking, bowling alley, and an expansive rooftop terrace.',
    40.1105,
    -88.2325,
    'CA Ventures',
    NULL,
    '/apartments/here.jpg',
    '2026-04-09T07:26:25.046Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    'b0f25fa6-a2ee-4194-8a5b-7f8bac10de65',
    'Burnham 310',
    'burnham-310',
    '310 E Springfield Ave',
    'Champaign',
    'IL',
    '61820',
    'Burnham 310 features unique apartment layouts, a private dog park, grocery store on ground floor, and fitness center.',
    40.1122,
    -88.233,
    'The Scion Group',
    NULL,
    '/apartments/burnham_310.jpg',
    '2026-04-09T07:26:25.046Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    '29c4a3f9-26ec-427c-afe9-7c039effee14',
    'Campus Circle',
    'campus-circle',
    '1010 W University Ave',
    'Urbana',
    'IL',
    '61801',
    'Campus Circle provides an exceptional student living experience just steps from the engineering campus.',
    40.116,
    -88.223,
    'Peak Campus',
    NULL,
    '/apartments/campus_circle.png',
    '2026-04-09T07:26:25.046Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    'ba4fcbf2-c5ea-42c5-b2b4-eea2e32a6752',
    'Octave Apartments',
    'octave-apartments',
    '210 E John St',
    'Champaign',
    'IL',
    '61820',
    'Octave offers stylish and contemporary student apartments located just blocks from the Main Quad.',
    40.1085,
    -88.236,
    'Lincoln Property Company',
    NULL,
    '/apartments/octave.jpg',
    '2026-04-09T07:26:25.047Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    '39876ef5-7fcf-4b76-a80b-7d1ed778c9fb',
    'Tower at Third',
    'tower-at-third',
    '302 E John St',
    'Champaign',
    'IL',
    '61820',
    'Tower at Third offers renovated high-rise living with sweeping views of the entire university.',
    40.1086,
    -88.233,
    'American Campus Communities',
    NULL,
    '/apartments/tower_at_third.jpg',
    '2026-04-09T07:26:25.047Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    '15f0fdde-ec5a-4482-aa8a-52ae47f681d5',
    '309 E Green',
    '309-e-green-309',
    '309 E Green St',
    'Champaign',
    'IL',
    '61820',
    '309 E Green is a premier residential high-rise managed by American Campus Communities, featuring a rooftop sun deck and state-of-the-art amenities.',
    40.11407602198269,
    -88.23235352272111,
    'American Campus Communities',
    'https://www.americancampus.com/student-apartments/il/champaign/309-green',
    'https://www.americancampus.com/getmedia/1a3f689e-2f5b-4b8c-8f1d-5550c6c1097e/309-Green-Exterior-1.jpg',
    '2026-03-12T03:24:32.530Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    '9947cba8-fc96-4929-aa70-ccfe177248dc',
    '405 E Green',
    '405-e-green-405',
    '405 E Green St',
    'Champaign',
    'IL',
    '61820',
    'Premium apartments at the corner of 4th and Green, offering unparalleled access to Campustown dining and campus life.',
    40.11337662814925,
    -88.22796889942981,
    'Green Street Realty',
    'https://www.greenstreetrealty.com/properties/profile/401-405-e-green-st',
    'https://images1.loopnet.com/i2/7S7v-5w_d8-yYvS4w-W-W-W-W-W-W-W-W-W-W-W-W/110/401-405-E-Green-St-Champaign-IL-1-Large.jpg',
    '2026-03-12T03:24:32.535Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    '2697e4bf-7614-42aa-8d51-72d084db987e',
    '406 E Green',
    '406-e-green-406',
    '406 E Green St',
    'Champaign',
    'IL',
    '61820',
    'Elegant apartments with retail-level convenience, located directly above the heart of Green Street.',
    40.10664616443061,
    -88.22895930705826,
    'Bankier Apartments',
    'http://www.406bankierapartments.com/',
    'http://www.406bankierapartments.com/images/406-E-Green-St-Champaign-IL-primary.jpg',
    '2026-03-12T03:24:32.535Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    '8835c7b8-4505-49e8-9018-3ede72796279',
    '410 E Green',
    '410-e-green-410',
    '410 E Green St',
    'Champaign',
    'IL',
    '61820',
    '410 E Green is a premier residential building managed by Smile Student Living, offering convenient access to the UIUC campus.',
    40.118530552884934,
    -88.22838837395648,
    'Smile Student Living',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=410%20E%20Green%20St%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.535Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    'babd2678-cb4f-4af9-aa0e-ed1f497d03de',
    '412 E Green',
    '412-e-green-412',
    '412 E Green St',
    'Champaign',
    'IL',
    '61820',
    '412 E Green is a premier residential building managed by Bankier Apartments, offering convenient access to the UIUC campus.',
    40.10099965204817,
    -88.23042605665626,
    'Bankier Apartments',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=412%20E%20Green%20St%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.535Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    'abe34355-7704-4a87-ab23-8b61f3543830',
    '501 E Green',
    '501-e-green-501',
    '501 E Green St',
    'Champaign',
    'IL',
    '61820',
    '501 E Green is a premier residential building managed by University Group, offering convenient access to the UIUC campus.',
    40.112918607770546,
    -88.22245648086658,
    'University Group',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=501%20E%20Green%20St%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.535Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    '9f4c1003-e82c-4f1c-97a2-1a9cc186806b',
    '505 E Green',
    '505-e-green-505',
    '505 E Green St',
    'Champaign',
    'IL',
    '61820',
    '505 E Green is a premier residential building managed by Green Street Realty, offering convenient access to the UIUC campus.',
    40.10183402853715,
    -88.23965561878289,
    'Green Street Realty',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=505%20E%20Green%20St%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.535Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    '76d6007f-d93a-4e31-9e84-4fe2ee055878',
    '508 E Green',
    '508-e-green-508',
    '508 E Green St',
    'Champaign',
    'IL',
    '61820',
    '508 E Green is a premier residential building managed by JSM Living, offering convenient access to the UIUC campus.',
    40.116087612798225,
    -88.23085481944912,
    'JSM Living',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=508%20E%20Green%20St%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.535Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    '37e1290b-ca63-41ee-8d9a-5abcab23d63f',
    '512 E Green',
    '512-e-green-512',
    '512 E Green St',
    'Champaign',
    'IL',
    '61820',
    '512 E Green is a premier residential building managed by Smile Student Living, offering convenient access to the UIUC campus.',
    40.100779146413416,
    -88.22744975123251,
    'Smile Student Living',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=512%20E%20Green%20St%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.535Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    'f427ffda-8cbb-466f-8ace-985059d98514',
    '601 E Green',
    '601-e-green-601',
    '601 E Green St',
    'Champaign',
    'IL',
    '61820',
    '601 E Green is a premier residential building managed by Bankier Apartments, offering convenient access to the UIUC campus.',
    40.10976999003744,
    -88.23520974903388,
    'Bankier Apartments',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=601%20E%20Green%20St%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.536Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    '2616a578-8811-4db3-8754-54d40bdba693',
    '605 E Green',
    '605-e-green-605',
    '605 E Green St',
    'Champaign',
    'IL',
    '61820',
    '605 E Green is a premier residential building managed by University Group, offering convenient access to the UIUC campus.',
    40.10268311591844,
    -88.23546540702685,
    'University Group',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=605%20E%20Green%20St%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.536Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    'ff40c812-d45e-4eed-b665-890440b89956',
    '608 E Green',
    '608-e-green-608',
    '608 E Green St',
    'Champaign',
    'IL',
    '61820',
    '608 E Green is a premier residential building managed by Green Street Realty, offering convenient access to the UIUC campus.',
    40.101355459774325,
    -88.23098705686574,
    'Green Street Realty',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=608%20E%20Green%20St%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.536Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    'a2e1eaa7-a15a-49ce-b012-53fa25021cd4',
    '700 E Green',
    '700-e-green-700',
    '700 E Green St',
    'Champaign',
    'IL',
    '61820',
    '700 E Green is a premier residential building managed by JSM Living, offering convenient access to the UIUC campus.',
    40.10125577794471,
    -88.22914806625192,
    'JSM Living',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=700%20E%20Green%20St%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.536Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    '1b9fa90c-2c40-456c-9826-4d0e39b3fa1f',
    '707 E Green',
    '707-e-green-707',
    '707 E Green St',
    'Champaign',
    'IL',
    '61820',
    '707 E Green is a premier residential building managed by Smile Student Living, offering convenient access to the UIUC campus.',
    40.10290095507942,
    -88.22325706368744,
    'Smile Student Living',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=707%20E%20Green%20St%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.536Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    '0579ac24-bd7c-460a-87a0-826ccfbe2adf',
    '711 E Green',
    '711-e-green-711',
    '711 E Green St',
    'Champaign',
    'IL',
    '61820',
    '711 E Green is a premier residential building managed by Bankier Apartments, offering convenient access to the UIUC campus.',
    40.107717436716435,
    -88.22713531002242,
    'Bankier Apartments',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=711%20E%20Green%20St%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.536Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    '9081f556-e02a-48a9-b7b3-aa7c7026de92',
    '801 E Green',
    '801-e-green-801',
    '801 E Green St',
    'Champaign',
    'IL',
    '61820',
    '801 E Green is a premier residential building managed by University Group, offering convenient access to the UIUC campus.',
    40.11475097770523,
    -88.23688926637485,
    'University Group',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=801%20E%20Green%20St%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.536Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    'cf7eaece-0733-417e-93f2-c3f2af9f408b',
    '807 E Green',
    '807-e-green-807',
    '807 E Green St',
    'Champaign',
    'IL',
    '61820',
    '807 E Green is a premier residential building managed by Green Street Realty, offering convenient access to the UIUC campus.',
    40.10737242405641,
    -88.23652578512248,
    'Green Street Realty',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=807%20E%20Green%20St%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.536Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    '53e6181f-11f1-4c11-b2f9-a688977a3670',
    '901 E Green',
    '901-e-green-901',
    '901 E Green St',
    'Champaign',
    'IL',
    '61820',
    '901 E Green is a premier residential building managed by JSM Living, offering convenient access to the UIUC campus.',
    40.10173034045847,
    -88.22783226577673,
    'JSM Living',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=901%20E%20Green%20St%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.536Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    '24c84a1a-9046-4cae-883f-781cc505e505',
    '1001 E Green',
    '1001-e-green-1001',
    '1001 E Green St',
    'Champaign',
    'IL',
    '61820',
    '1001 E Green is a premier residential building managed by Smile Student Living, offering convenient access to the UIUC campus.',
    40.11948007930779,
    -88.23924265284707,
    'Smile Student Living',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=1001%20E%20Green%20St%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.536Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    '87d61529-6f40-4daf-b1b3-ebb276c211b3',
    '1107 E Green',
    '1107-e-green-1107',
    '1107 E Green St',
    'Champaign',
    'IL',
    '61820',
    '1107 E Green is a premier residential building managed by Bankier Apartments, offering convenient access to the UIUC campus.',
    40.11920799260221,
    -88.23429273913263,
    'Bankier Apartments',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=1107%20E%20Green%20St%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.536Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    '9faacfb7-eb35-4828-9b18-13c78d5a42d6',
    '105 E Chalmers',
    '105-e-chalmers-105',
    '105 E Chalmers St',
    'Champaign',
    'IL',
    '61820',
    '105 E Chalmers is a premier residential building managed by University Group, offering convenient access to the UIUC campus.',
    40.10659576155936,
    -88.22563885768221,
    'University Group',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=105%20E%20Chalmers%20St%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.536Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    '23afb98d-185c-447d-9ce5-ca4efbae43f4',
    '107 E Chalmers',
    '107-e-chalmers-107',
    '107 E Chalmers St',
    'Champaign',
    'IL',
    '61820',
    '107 E Chalmers is a premier residential building managed by Green Street Realty, offering convenient access to the UIUC campus.',
    40.10383089500214,
    -88.22897159565291,
    'Green Street Realty',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=107%20E%20Chalmers%20St%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.536Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    '3e7f6547-9ea5-4633-9f8c-4e31ae969872',
    '201 E Chalmers',
    '201-e-chalmers-201',
    '201 E Chalmers St',
    'Champaign',
    'IL',
    '61820',
    '201 E Chalmers is a premier residential building managed by JSM Living, offering convenient access to the UIUC campus.',
    40.117942770361346,
    -88.23592134150938,
    'JSM Living',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=201%20E%20Chalmers%20St%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.536Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    '1cd32ebe-a0a6-43b3-948b-fbf2c187638c',
    '203 E Chalmers',
    '203-e-chalmers-203',
    '203 E Chalmers St',
    'Champaign',
    'IL',
    '61820',
    '203 E Chalmers is a premier residential building managed by Smile Student Living, offering convenient access to the UIUC campus.',
    40.10494694216921,
    -88.22156281262083,
    'Smile Student Living',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=203%20E%20Chalmers%20St%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.536Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    '50e24835-1d52-415c-a33e-e30f05c19682',
    '205 E Chalmers',
    '205-e-chalmers-205',
    '205 E Chalmers St',
    'Champaign',
    'IL',
    '61820',
    '205 E Chalmers is a premier residential building managed by Bankier Apartments, offering convenient access to the UIUC campus.',
    40.10929717216336,
    -88.22029920964656,
    'Bankier Apartments',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=205%20E%20Chalmers%20St%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.536Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    '134844c9-8a7e-4118-a957-ab28b4be87ea',
    '303 E Chalmers',
    '303-e-chalmers-303',
    '303 E Chalmers St',
    'Champaign',
    'IL',
    '61820',
    '303 E Chalmers is a premier residential building managed by University Group, offering convenient access to the UIUC campus.',
    40.10656395166355,
    -88.23048639578828,
    'University Group',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=303%20E%20Chalmers%20St%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.536Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    'c39c8234-dd16-4b6b-9926-c7901ca6fad4',
    '305 E Chalmers',
    '305-e-chalmers-305',
    '305 E Chalmers St',
    'Champaign',
    'IL',
    '61820',
    '305 E Chalmers is a premier residential building managed by Green Street Realty, offering convenient access to the UIUC campus.',
    40.108816989335224,
    -88.22466645526374,
    'Green Street Realty',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=305%20E%20Chalmers%20St%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.536Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    '5cc5dc85-d055-434a-a434-c75499c303fd',
    '307 E Chalmers',
    '307-e-chalmers-307',
    '307 E Chalmers St',
    'Champaign',
    'IL',
    '61820',
    '307 E Chalmers is a premier residential building managed by JSM Living, offering convenient access to the UIUC campus.',
    40.11299232738858,
    -88.2208817348746,
    'JSM Living',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=307%20E%20Chalmers%20St%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.536Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    'f48744df-fd2a-42c9-8488-8450e38b6e28',
    '401 E Chalmers',
    '401-e-chalmers-401',
    '401 E Chalmers St',
    'Champaign',
    'IL',
    '61820',
    '401 E Chalmers is a premier residential building managed by Smile Student Living, offering convenient access to the UIUC campus.',
    40.11293328277243,
    -88.22845448073971,
    'Smile Student Living',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=401%20E%20Chalmers%20St%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.536Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    '36116cc9-82f3-4b23-8072-7500c3971cb2',
    '403 E Chalmers',
    '403-e-chalmers-403',
    '403 E Chalmers St',
    'Champaign',
    'IL',
    '61820',
    '403 E Chalmers is a premier residential building managed by Bankier Apartments, offering convenient access to the UIUC campus.',
    40.116705035898505,
    -88.22158498840709,
    'Bankier Apartments',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=403%20E%20Chalmers%20St%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.536Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    'fa97f92e-e5fa-453c-8542-89762e06237b',
    '111 E Healey',
    '111-e-healey-111',
    '111 E Healey St',
    'Champaign',
    'IL',
    '61820',
    '111 E Healey is a premier residential building managed by University Group, offering convenient access to the UIUC campus.',
    40.11521759506942,
    -88.22953839379743,
    'University Group',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=111%20E%20Healey%20St%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.536Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    '9d525eef-2263-40e0-b5c9-9c9041e40e8e',
    '201 E Healey',
    '201-e-healey-201',
    '201 E Healey St',
    'Champaign',
    'IL',
    '61820',
    '201 E Healey is a premier residential building managed by Green Street Realty, offering convenient access to the UIUC campus.',
    40.10094732592819,
    -88.23437983559238,
    'Green Street Realty',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=201%20E%20Healey%20St%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.536Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    '120ef33f-6937-464e-9607-5ea97798b8f9',
    '301 E Healey',
    '301-e-healey-301',
    '301 E Healey St',
    'Champaign',
    'IL',
    '61820',
    '301 E Healey is a premier residential building managed by JSM Living, offering convenient access to the UIUC campus.',
    40.10314403448249,
    -88.22303049547568,
    'JSM Living',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=301%20E%20Healey%20St%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.536Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    'e778a975-efc5-4879-a100-6cba3fb736df',
    '303 E Healey',
    '303-e-healey-303',
    '303 E Healey St',
    'Champaign',
    'IL',
    '61820',
    '303 E Healey is a premier residential building managed by Smile Student Living, offering convenient access to the UIUC campus.',
    40.11746033711786,
    -88.23087745559812,
    'Smile Student Living',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=303%20E%20Healey%20St%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.536Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    '08d16fa5-eb26-4e85-9b60-6a1c950a0f60',
    '401 E Healey',
    '401-e-healey-401',
    '401 E Healey St',
    'Champaign',
    'IL',
    '61820',
    '401 E Healey is a premier residential building managed by Bankier Apartments, offering convenient access to the UIUC campus.',
    40.1032682788599,
    -88.22920878925183,
    'Bankier Apartments',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=401%20E%20Healey%20St%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.536Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    '90731ab8-6d64-4883-8d52-8ff85bfb937a',
    '403 E Healey',
    '403-e-healey-403',
    '403 E Healey St',
    'Champaign',
    'IL',
    '61820',
    '403 E Healey is a premier residential building managed by University Group, offering convenient access to the UIUC campus.',
    40.10298143988344,
    -88.22133649525298,
    'University Group',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=403%20E%20Healey%20St%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.536Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    '973e9fba-0911-4abc-9b31-9b307bb326f4',
    '405 E Healey',
    '405-e-healey-405',
    '405 E Healey St',
    'Champaign',
    'IL',
    '61820',
    '405 E Healey is a premier residential building managed by Green Street Realty, offering convenient access to the UIUC campus.',
    40.10613225823921,
    -88.23933650574746,
    'Green Street Realty',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=405%20E%20Healey%20St%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.536Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    'abd993d2-91fb-487c-9f50-df4dbf4f9f27',
    '501 E Healey',
    '501-e-healey-501',
    '501 E Healey St',
    'Champaign',
    'IL',
    '61820',
    '501 E Healey is a premier residential building managed by JSM Living, offering convenient access to the UIUC campus.',
    40.102842863522355,
    -88.22361721040978,
    'JSM Living',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=501%20E%20Healey%20St%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.536Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    '2a45952b-cd90-4a56-81aa-9949f79e24b8',
    '502 E Healey',
    '502-e-healey-502',
    '502 E Healey St',
    'Champaign',
    'IL',
    '61820',
    '502 E Healey is a premier residential building managed by Smile Student Living, offering convenient access to the UIUC campus.',
    40.10978279718112,
    -88.22243251491025,
    'Smile Student Living',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=502%20E%20Healey%20St%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.536Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    'afdf2629-a6bb-40c3-95c6-f2970fce0670',
    '601 E Healey',
    '601-e-healey-601',
    '601 E Healey St',
    'Champaign',
    'IL',
    '61820',
    '601 E Healey is a premier residential building managed by Bankier Apartments, offering convenient access to the UIUC campus.',
    40.100234581519814,
    -88.23329343387836,
    'Bankier Apartments',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=601%20E%20Healey%20St%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.536Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    '6539ad47-a879-401d-b024-011d69b7a71c',
    '106 E Daniel',
    '106-e-daniel-106',
    '106 E Daniel St',
    'Champaign',
    'IL',
    '61820',
    '106 E Daniel is a premier residential building managed by University Group, offering convenient access to the UIUC campus.',
    40.105570588275626,
    -88.22435277735009,
    'University Group',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=106%20E%20Daniel%20St%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.536Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    'af58c3b2-9a89-47e4-99fc-77819f252c04',
    '202 E Daniel',
    '202-e-daniel-202',
    '202 E Daniel St',
    'Champaign',
    'IL',
    '61820',
    '202 E Daniel is a premier residential building managed by Green Street Realty, offering convenient access to the UIUC campus.',
    40.10125020890517,
    -88.23330921279339,
    'Green Street Realty',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=202%20E%20Daniel%20St%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.536Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    '81ea997a-4015-46d5-92b0-b0a0a65c3104',
    '208 E Daniel',
    '208-e-daniel-208',
    '208 E Daniel St',
    'Champaign',
    'IL',
    '61820',
    '208 E Daniel is a premier residential building managed by JSM Living, offering convenient access to the UIUC campus.',
    40.11587406291237,
    -88.22350583480947,
    'JSM Living',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=208%20E%20Daniel%20St%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.536Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    '9f4ed03f-1a1c-4a5e-b263-c2f8c18ddd74',
    '302 E Daniel',
    '302-e-daniel-302',
    '302 E Daniel St',
    'Champaign',
    'IL',
    '61820',
    '302 E Daniel is a premier residential building managed by Smile Student Living, offering convenient access to the UIUC campus.',
    40.11649208496359,
    -88.22141802566242,
    'Smile Student Living',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=302%20E%20Daniel%20St%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.536Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    'ed106537-f197-454a-aae6-d92ab8c541f7',
    '304 E Daniel',
    '304-e-daniel-304',
    '304 E Daniel St',
    'Champaign',
    'IL',
    '61820',
    '304 E Daniel is a premier residential building managed by Bankier Apartments, offering convenient access to the UIUC campus.',
    40.11177745021881,
    -88.2301896333085,
    'Bankier Apartments',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=304%20E%20Daniel%20St%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.536Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    'fddc828a-69fa-482c-aa08-093d9f0a66a4',
    '400 E Daniel',
    '400-e-daniel-400',
    '400 E Daniel St',
    'Champaign',
    'IL',
    '61820',
    '400 E Daniel is a premier residential building managed by University Group, offering convenient access to the UIUC campus.',
    40.1112392101116,
    -88.22470622970211,
    'University Group',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=400%20E%20Daniel%20St%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.536Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    'ba61c057-f540-4014-9d0f-bad510b6d1d4',
    '401 E Daniel',
    '401-e-daniel-401',
    '401 E Daniel St',
    'Champaign',
    'IL',
    '61820',
    '401 E Daniel is a premier residential building managed by Green Street Realty, offering convenient access to the UIUC campus.',
    40.109738052345186,
    -88.23056636385942,
    'Green Street Realty',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=401%20E%20Daniel%20St%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.536Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    '834ed559-3eeb-42ad-ae67-d5b1dd57baac',
    '501 E Daniel',
    '501-e-daniel-501',
    '501 E Daniel St',
    'Champaign',
    'IL',
    '61820',
    '501 E Daniel is a premier residential building managed by JSM Living, offering convenient access to the UIUC campus.',
    40.11860765198508,
    -88.23875682688303,
    'JSM Living',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=501%20E%20Daniel%20St%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.536Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    'e9266842-58dc-4339-8c65-c1bb1f96b03d',
    '502 E Daniel',
    '502-e-daniel-502',
    '502 E Daniel St',
    'Champaign',
    'IL',
    '61820',
    '502 E Daniel is a premier residential building managed by Smile Student Living, offering convenient access to the UIUC campus.',
    40.10012898415687,
    -88.2239240651993,
    'Smile Student Living',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=502%20E%20Daniel%20St%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.536Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    'bb5632d9-fbf7-485e-aad4-c27dd72339c7',
    '602 E Daniel',
    '602-e-daniel-602',
    '602 E Daniel St',
    'Champaign',
    'IL',
    '61820',
    '602 E Daniel is a premier residential building managed by Bankier Apartments, offering convenient access to the UIUC campus.',
    40.109812194574474,
    -88.2334435632481,
    'Bankier Apartments',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=602%20E%20Daniel%20St%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.536Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    '68e77019-16e2-4afd-945a-7023258e7099',
    '58 E John St',
    '58-e-john-st-58',
    '58 E John St',
    'Champaign',
    'IL',
    '61820',
    '58 E John St is a premier residential building managed by University Group, offering convenient access to the UIUC campus.',
    40.113316022195114,
    -88.23367539248045,
    'University Group',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=58%20E%20John%20St%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.536Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    'e23e1e89-54e7-4935-b7ab-69fa003b5e19',
    '101 E John St',
    '101-e-john-st-101',
    '101 E John St',
    'Champaign',
    'IL',
    '61820',
    '101 E John St is a premier residential building managed by Green Street Realty, offering convenient access to the UIUC campus.',
    40.11184301716344,
    -88.23721828962705,
    'Green Street Realty',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=101%20E%20John%20St%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.536Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    '39cdc87c-ddee-4534-b7c9-d927d86687c6',
    '103 E John St',
    '103-e-john-st-103',
    '103 E John St',
    'Champaign',
    'IL',
    '61820',
    '103 E John St is a premier residential building managed by JSM Living, offering convenient access to the UIUC campus.',
    40.1030384482714,
    -88.22684310513462,
    'JSM Living',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=103%20E%20John%20St%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.536Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    '33417047-8d4f-44b8-8bdc-7c88e7784079',
    '201 E John St',
    '201-e-john-st-201',
    '201 E John St',
    'Champaign',
    'IL',
    '61820',
    '201 E John St is a premier residential building managed by Smile Student Living, offering convenient access to the UIUC campus.',
    40.11690020880539,
    -88.22052162042438,
    'Smile Student Living',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=201%20E%20John%20St%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.536Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    'b0491686-40b4-478d-8a34-194c8fc4ae1c',
    '202 E John St',
    '202-e-john-st-202',
    '202 E John St',
    'Champaign',
    'IL',
    '61820',
    '202 E John St is a premier residential building managed by Bankier Apartments, offering convenient access to the UIUC campus.',
    40.10336557159273,
    -88.23743072283783,
    'Bankier Apartments',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=202%20E%20John%20St%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.536Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    'd5150a31-8d6d-4f68-b6ca-324faf46ada9',
    '301 E John St',
    '301-e-john-st-301',
    '301 E John St',
    'Champaign',
    'IL',
    '61820',
    '301 E John St is a premier residential building managed by University Group, offering convenient access to the UIUC campus.',
    40.10285279318178,
    -88.22662511900687,
    'University Group',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=301%20E%20John%20St%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.536Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    'f92b2416-a36c-4a96-86da-c4418c5e372e',
    '302 E John St',
    '302-e-john-st-302',
    '302 E John St',
    'Champaign',
    'IL',
    '61820',
    '302 E John St is a premier residential building managed by Green Street Realty, offering convenient access to the UIUC campus.',
    40.10963665475079,
    -88.22413966153367,
    'Green Street Realty',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=302%20E%20John%20St%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.536Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    '61a8e9a1-357f-4991-9181-77df1da242d2',
    '401 E John St',
    '401-e-john-st-401',
    '401 E John St',
    'Champaign',
    'IL',
    '61820',
    '401 E John St is a premier residential building managed by JSM Living, offering convenient access to the UIUC campus.',
    40.10148125800013,
    -88.23854305077982,
    'JSM Living',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=401%20E%20John%20St%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.536Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    '3ae1b312-707f-4238-b662-8d8fa8dbc1f4',
    '402 E John St',
    '402-e-john-st-402',
    '402 E John St',
    'Champaign',
    'IL',
    '61820',
    '402 E John St is a premier residential building managed by Smile Student Living, offering convenient access to the UIUC campus.',
    40.11981846569102,
    -88.2370719866972,
    'Smile Student Living',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=402%20E%20John%20St%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.536Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    '1d6c8ebe-8b9a-4740-9d89-a55de187e682',
    '501 E John St',
    '501-e-john-st-501',
    '501 E John St',
    'Champaign',
    'IL',
    '61820',
    '501 E John St is a premier residential building managed by Bankier Apartments, offering convenient access to the UIUC campus.',
    40.118821149247196,
    -88.23631279473535,
    'Bankier Apartments',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=501%20E%20John%20St%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.536Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    'ffff73b6-e74b-45be-968d-65a03252f697',
    '309 E White',
    '309-e-white-309',
    '309 E White St',
    'Champaign',
    'IL',
    '61820',
    '309 E White is a premier residential building managed by University Group, offering convenient access to the UIUC campus.',
    40.10785812313952,
    -88.2242378556505,
    'University Group',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=309%20E%20White%20St%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.536Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    '445843ef-b6d9-4375-aeb5-d83d2c2b8b23',
    '405 E White',
    '405-e-white-405',
    '405 E White St',
    'Champaign',
    'IL',
    '61820',
    '405 E White is a premier residential building managed by Green Street Realty, offering convenient access to the UIUC campus.',
    40.10913713657882,
    -88.2355559002809,
    'Green Street Realty',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=405%20E%20White%20St%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.536Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    '07b6bdc5-6d1d-43af-843d-9f4cc0898fc9',
    '407 E White',
    '407-e-white-407',
    '407 E White St',
    'Champaign',
    'IL',
    '61820',
    '407 E White is a premier residential building managed by JSM Living, offering convenient access to the UIUC campus.',
    40.105334818441186,
    -88.22388367009457,
    'JSM Living',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=407%20E%20White%20St%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.536Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    'dff336d2-fe78-48b8-9ca7-bb6c431ea2f7',
    '409 E White',
    '409-e-white-409',
    '409 E White St',
    'Champaign',
    'IL',
    '61820',
    '409 E White is a premier residential building managed by Smile Student Living, offering convenient access to the UIUC campus.',
    40.117501603160264,
    -88.22343841554887,
    'Smile Student Living',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=409%20E%20White%20St%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.536Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    '3c9be047-46e9-42df-85bf-1fc0c470c9a0',
    '501 E White',
    '501-e-white-501',
    '501 E White St',
    'Champaign',
    'IL',
    '61820',
    '501 E White is a premier residential building managed by Bankier Apartments, offering convenient access to the UIUC campus.',
    40.10012644124212,
    -88.22203969240245,
    'Bankier Apartments',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=501%20E%20White%20St%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.536Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    '9a317cf4-a4d8-45cd-8e86-35255d417616',
    '503 E White',
    '503-e-white-503',
    '503 E White St',
    'Champaign',
    'IL',
    '61820',
    '503 E White is a premier residential building managed by University Group, offering convenient access to the UIUC campus.',
    40.1173665767367,
    -88.23606756201032,
    'University Group',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=503%20E%20White%20St%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.536Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    '0b6a4a77-766b-46c2-8c86-9ff76e1ed027',
    '505 E White',
    '505-e-white-505',
    '505 E White St',
    'Champaign',
    'IL',
    '61820',
    '505 E White is a premier residential building managed by Green Street Realty, offering convenient access to the UIUC campus.',
    40.11990360754408,
    -88.22831821835516,
    'Green Street Realty',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=505%20E%20White%20St%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.536Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    '9e1c835b-6623-4147-935d-68e1954b3c76',
    '507 E White',
    '507-e-white-507',
    '507 E White St',
    'Champaign',
    'IL',
    '61820',
    '507 E White is a premier residential building managed by JSM Living, offering convenient access to the UIUC campus.',
    40.100254996791534,
    -88.2265260619419,
    'JSM Living',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=507%20E%20White%20St%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.536Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    'ab814b00-143a-4dfe-bfa9-ce2582e76ecc',
    '601 E White',
    '601-e-white-601',
    '601 E White St',
    'Champaign',
    'IL',
    '61820',
    '601 E White is a premier residential building managed by Smile Student Living, offering convenient access to the UIUC campus.',
    40.1122220497138,
    -88.22588391657301,
    'Smile Student Living',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=601%20E%20White%20St%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.536Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    'f54786e3-6117-4c70-8428-880fd3010018',
    '604 E White',
    '604-e-white-604',
    '604 E White St',
    'Champaign',
    'IL',
    '61820',
    '604 E White is a premier residential building managed by Bankier Apartments, offering convenient access to the UIUC campus.',
    40.10980988343536,
    -88.23837693722946,
    'Bankier Apartments',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=604%20E%20White%20St%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.536Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    'd4942e77-9a74-4ccd-ad5c-61f8f317525c',
    '401 S First St',
    '401-s-first-st-401',
    '401 S First St',
    'Champaign',
    'IL',
    '61820',
    '401 S First St is a premier residential building managed by University Group, offering convenient access to the UIUC campus.',
    40.119802271315685,
    -88.22046207886495,
    'University Group',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=401%20S%20First%20St%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.536Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    'dab19808-8085-4752-ae2a-8d2a472f470d',
    '501 S First St',
    '501-s-first-st-501',
    '501 S First St',
    'Champaign',
    'IL',
    '61820',
    '501 S First St is a premier residential building managed by Green Street Realty, offering convenient access to the UIUC campus.',
    40.10078469527327,
    -88.23742835327096,
    'Green Street Realty',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=501%20S%20First%20St%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.536Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    '5ea09e5b-f7bb-4ce9-8131-53b6568a9793',
    '601 S First St',
    '601-s-first-st-601',
    '601 S First St',
    'Champaign',
    'IL',
    '61820',
    '601 S First St is a premier residential building managed by JSM Living, offering convenient access to the UIUC campus.',
    40.11854220576317,
    -88.23500503075941,
    'JSM Living',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=601%20S%20First%20St%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.536Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    'ff8d2ac4-8bea-4f32-b3e2-233e51c20693',
    '701 S First St',
    '701-s-first-st-701',
    '701 S First St',
    'Champaign',
    'IL',
    '61820',
    '701 S First St is a premier residential building managed by Smile Student Living, offering convenient access to the UIUC campus.',
    40.10564368153477,
    -88.23278278548548,
    'Smile Student Living',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=701%20S%20First%20St%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.536Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    'e60200b0-ed62-4aba-8fe5-5b44c2f2e4df',
    '801 S First St',
    '801-s-first-st-801',
    '801 S First St',
    'Champaign',
    'IL',
    '61820',
    '801 S First St is a premier residential building managed by Bankier Apartments, offering convenient access to the UIUC campus.',
    40.11096276663297,
    -88.2208949157156,
    'Bankier Apartments',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=801%20S%20First%20St%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.536Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    '5c8c7059-2340-4e6c-a716-aea334268cd5',
    '901 S First St',
    '901-s-first-st-901',
    '901 S First St',
    'Champaign',
    'IL',
    '61820',
    '901 S First St is a premier residential building managed by University Group, offering convenient access to the UIUC campus.',
    40.118267775932715,
    -88.2330415981609,
    'University Group',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=901%20S%20First%20St%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.536Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    'b75b175f-43ab-457f-a461-4e76259d1150',
    '1001 S First St',
    '1001-s-first-st-1001',
    '1001 S First St',
    'Champaign',
    'IL',
    '61820',
    '1001 S First St is a premier residential building managed by Green Street Realty, offering convenient access to the UIUC campus.',
    40.11983624291743,
    -88.23649963728867,
    'Green Street Realty',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=1001%20S%20First%20St%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.536Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    'aef91a93-45f4-4a52-90e6-bcfabd185075',
    '1101 S First St',
    '1101-s-first-st-1101',
    '1101 S First St',
    'Champaign',
    'IL',
    '61820',
    '1101 S First St is a premier residential building managed by JSM Living, offering convenient access to the UIUC campus.',
    40.10033246000689,
    -88.23139654809074,
    'JSM Living',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=1101%20S%20First%20St%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.536Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    '224da2fa-d181-458e-b22b-5f892f4f4fa6',
    '1201 S First St',
    '1201-s-first-st-1201',
    '1201 S First St',
    'Champaign',
    'IL',
    '61820',
    '1201 S First St is a premier residential building managed by Smile Student Living, offering convenient access to the UIUC campus.',
    40.1158894983049,
    -88.22734351866421,
    'Smile Student Living',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=1201%20S%20First%20St%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.536Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    'c1b04e9f-32f8-404e-9897-d1e89abd270c',
    '1301 S First St',
    '1301-s-first-st-1301',
    '1301 S First St',
    'Champaign',
    'IL',
    '61820',
    '1301 S First St is a premier residential building managed by Bankier Apartments, offering convenient access to the UIUC campus.',
    40.10070424646496,
    -88.23364704375787,
    'Bankier Apartments',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=1301%20S%20First%20St%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.536Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    'd010963b-9e1e-47b0-b141-324e1e09d638',
    '409 S Third St',
    '409-s-third-st-409',
    '409 S Third St',
    'Champaign',
    'IL',
    '61820',
    '409 S Third St is a premier residential building managed by University Group, offering convenient access to the UIUC campus.',
    40.11987258588941,
    -88.22814727968793,
    'University Group',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=409%20S%20Third%20St%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.536Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    'd00ae6c6-af59-4fd2-a86b-1272591c764b',
    '502 S Third St',
    '502-s-third-st-502',
    '502 S Third St',
    'Champaign',
    'IL',
    '61820',
    '502 S Third St is a premier residential building managed by Green Street Realty, offering convenient access to the UIUC campus.',
    40.10947325960417,
    -88.23615302354291,
    'Green Street Realty',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=502%20S%20Third%20St%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.536Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    'aca374be-eb11-413d-a76e-d6afcf48fe66',
    'The Peer',
    'the-peer-605',
    '605 S Fourth St',
    'Champaign',
    'IL',
    '61820',
    'The Peer is a premier residential building managed by JSM Living, offering convenient access to the UIUC campus.',
    40.11925909458631,
    -88.23643500586884,
    'JSM Living',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=605%20S%20Fourth%20St%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.537Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    '4795d9a9-9a0f-421a-9349-3bd1704e25f4',
    '707 S Fourth',
    '707-s-fourth-707',
    '707 S Fourth St',
    'Champaign',
    'IL',
    '61820',
    '707 S Fourth is a premier residential building managed by Smile Student Living, offering convenient access to the UIUC campus.',
    40.10014239276727,
    -88.234729885021,
    'Smile Student Living',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=707%20S%20Fourth%20St%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.537Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    'fe9b7cd8-b2aa-441c-a1fc-05f9c7c8ae3c',
    '801 S Fourth',
    '801-s-fourth-801',
    '801 S Fourth St',
    'Champaign',
    'IL',
    '61820',
    '801 S Fourth is a premier residential building managed by Bankier Apartments, offering convenient access to the UIUC campus.',
    40.11059893553193,
    -88.22233509981294,
    'Bankier Apartments',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=801%20S%20Fourth%20St%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.537Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    '5a507c67-6ec8-400b-a409-8472d3e1319a',
    '905 S Fourth',
    '905-s-fourth-905',
    '905 S Fourth St',
    'Champaign',
    'IL',
    '61820',
    '905 S Fourth is a premier residential building managed by University Group, offering convenient access to the UIUC campus.',
    40.110425095267345,
    -88.22151252854793,
    'University Group',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=905%20S%20Fourth%20St%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.537Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    'd66954c0-02af-4d33-8c76-c3fec778d16a',
    'The Station',
    'the-station-505',
    '505 S Fifth St',
    'Champaign',
    'IL',
    '61820',
    'The Station is a premier residential building managed by Green Street Realty, offering convenient access to the UIUC campus.',
    40.119885529497246,
    -88.22762094366972,
    'Green Street Realty',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=505%20S%20Fifth%20St%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.537Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    '12d045b3-2e68-44f2-b0be-8c844b4b33f6',
    '707 S Fifth',
    '707-s-fifth-707',
    '707 S Fifth St',
    'Champaign',
    'IL',
    '61820',
    '707 S Fifth is a premier residential building managed by JSM Living, offering convenient access to the UIUC campus.',
    40.10645071553455,
    -88.23548335800696,
    'JSM Living',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=707%20S%20Fifth%20St%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.537Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    '1fbd4bfd-f73c-412e-97dd-eae10b2744f4',
    '801 S Fifth',
    '801-s-fifth-801',
    '801 S Fifth St',
    'Champaign',
    'IL',
    '61820',
    '801 S Fifth is a premier residential building managed by Smile Student Living, offering convenient access to the UIUC campus.',
    40.10210898982125,
    -88.22707149142099,
    'Smile Student Living',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=801%20S%20Fifth%20St%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.537Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    '40046e65-5914-4621-8876-025d69da6c13',
    '901 S Fifth',
    '901-s-fifth-901',
    '901 S Fifth St',
    'Champaign',
    'IL',
    '61820',
    '901 S Fifth is a premier residential building managed by Bankier Apartments, offering convenient access to the UIUC campus.',
    40.1171587261943,
    -88.23171176652616,
    'Bankier Apartments',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=901%20S%20Fifth%20St%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.537Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    '90b7d5c9-3bd1-486a-80d3-bb57e5097d6d',
    '102 E Gregory',
    '102-e-gregory-102',
    '102 E Gregory St',
    'Champaign',
    'IL',
    '61820',
    '102 E Gregory is a premier residential building managed by University Group, offering convenient access to the UIUC campus.',
    40.1128345944546,
    -88.22119703711057,
    'University Group',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=102%20E%20Gregory%20St%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.537Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    '6dd4cb59-9a58-4cbd-8642-ae1048829414',
    '110 S Gregory',
    '110-s-gregory-110',
    '110 S Gregory St',
    'Champaign',
    'IL',
    '61820',
    '110 S Gregory is a premier residential building managed by Green Street Realty, offering convenient access to the UIUC campus.',
    40.10471639969137,
    -88.23861972125853,
    'Green Street Realty',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=110%20S%20Gregory%20St%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.537Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    'a4bb7397-f58d-4193-b1c0-4a9cd6527d08',
    '202 S Gregory',
    '202-s-gregory-202',
    '202 S Gregory St',
    'Champaign',
    'IL',
    '61820',
    '202 S Gregory is a premier residential building managed by JSM Living, offering convenient access to the UIUC campus.',
    40.11702994335501,
    -88.22817517192064,
    'JSM Living',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=202%20S%20Gregory%20St%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.537Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    'e90ff3e8-4f9c-47d4-9c8d-aff0413e874a',
    '301 S Gregory',
    '301-s-gregory-301',
    '301 S Gregory St',
    'Champaign',
    'IL',
    '61820',
    '301 S Gregory is a premier residential building managed by Smile Student Living, offering convenient access to the UIUC campus.',
    40.118145650987415,
    -88.22752993851414,
    'Smile Student Living',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=301%20S%20Gregory%20St%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.537Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    'c33e740c-0373-458d-8b23-8efe19d96991',
    '401 S Gregory',
    '401-s-gregory-401',
    '401 S Gregory St',
    'Champaign',
    'IL',
    '61820',
    '401 S Gregory is a premier residential building managed by Bankier Apartments, offering convenient access to the UIUC campus.',
    40.10988512286312,
    -88.2366595702259,
    'Bankier Apartments',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=401%20S%20Gregory%20St%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.537Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    '2292c02b-98df-4bdb-8948-cf9da72f8fd7',
    'Campus Oaks',
    'campus-oaks-502',
    '502 W Green St',
    'Champaign',
    'IL',
    '61820',
    'Campus Oaks is a premier residential building managed by University Group, offering convenient access to the UIUC campus.',
    40.10818452653029,
    -88.22226450770157,
    'University Group',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=502%20W%20Green%20St%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.537Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    'a1efce14-0cbb-42c6-9462-ff7f7c9bc837',
    '601 S Lincoln',
    '601-s-lincoln-601',
    '601 S Lincoln Ave',
    'Champaign',
    'IL',
    '61820',
    '601 S Lincoln is a premier residential building managed by Green Street Realty, offering convenient access to the UIUC campus.',
    40.10517668755568,
    -88.22465583824966,
    'Green Street Realty',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=601%20S%20Lincoln%20Ave%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.537Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    '4c7afe42-8981-4ecc-9a25-bd08ff210a79',
    '701 S Lincoln',
    '701-s-lincoln-701',
    '701 S Lincoln Ave',
    'Champaign',
    'IL',
    '61820',
    '701 S Lincoln is a premier residential building managed by JSM Living, offering convenient access to the UIUC campus.',
    40.10936436878489,
    -88.22272622720686,
    'JSM Living',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=701%20S%20Lincoln%20Ave%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.537Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    '9132c714-2c20-4fb2-b6cc-8207948c098a',
    '805 S Lincoln',
    '805-s-lincoln-805',
    '805 S Lincoln Ave',
    'Champaign',
    'IL',
    '61820',
    '805 S Lincoln is a premier residential building managed by Smile Student Living, offering convenient access to the UIUC campus.',
    40.11615633342455,
    -88.22569836462993,
    'Smile Student Living',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=805%20S%20Lincoln%20Ave%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.537Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    '7cd18de8-9d47-4e86-98a3-1aa1b2caa79a',
    '808 S Lincoln',
    '808-s-lincoln-808',
    '808 S Lincoln Ave',
    'Champaign',
    'IL',
    '61820',
    '808 S Lincoln is a premier residential building managed by Bankier Apartments, offering convenient access to the UIUC campus.',
    40.11993880636022,
    -88.23315794438427,
    'Bankier Apartments',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=808%20S%20Lincoln%20Ave%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.537Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    '5be58fe6-7f9c-4a68-b1a1-17181e51e3ca',
    'The Dean Campustown',
    'the-dean-campustown-708',
    '708 S Sixth St',
    'Champaign',
    'IL',
    '61820',
    'Luxurious student living in the heart of Campustown, offering modern floor plans and premium study spaces.',
    40.100380317387064,
    -88.2213252312293,
    'Core Spaces',
    'https://www.thedean.com/campustown/',
    'https://www.thedean.com/campustown/wp-content/uploads/2025/08/0011_The-Dean-Campustown-Rentals-318_1.webp',
    '2026-03-12T03:24:32.537Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    'b7903832-c082-4fde-8daf-1833df0d324b',
    'HERE Champaign',
    'here-champaign-410',
    '410 E Green St',
    'Champaign',
    'IL',
    '61820',
    'Modern high-rise living on Green Street, featuring high-end finishes and social amenities designed for students.',
    40.10831736685364,
    -88.23974629753967,
    'CA Ventures',
    'https://www.herechampaign.com/',
    'https://www.herechampaign.com/images/gallery/gallery-community-1-main.webp',
    '2026-03-12T03:24:32.537Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    'aa91994d-a154-4e17-a942-771ba2f5ca2d',
    'Tower at Third',
    'tower-at-third-302',
    '302 E John St',
    'Champaign',
    'IL',
    '61820',
    'Tower at Third is a premier residential building managed by ACC, offering convenient access to the UIUC campus.',
    40.11116466976358,
    -88.22816221212672,
    'ACC',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=302%20E%20John%20St%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.537Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    'c6713a39-6937-436b-bfaf-072c9f7e7920',
    'Suites at Third',
    'suites-at-third-707',
    '707 S Third St',
    'Champaign',
    'IL',
    '61820',
    'Suites at Third is a premier residential building managed by ACC, offering convenient access to the UIUC campus.',
    40.10286479530642,
    -88.23787665210662,
    'ACC',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=707%20S%20Third%20St%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.537Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    '622f3ac4-cf87-40b1-8a9e-ba8468ae80bd',
    'Latitude Apartments',
    'latitude-apartments-608',
    '608 E University Ave',
    'Champaign',
    'IL',
    '61820',
    'Latitude Apartments is a premier residential building managed by Latidude, offering convenient access to the UIUC campus.',
    40.116574010659356,
    -88.23515670311671,
    'Latidude',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=608%20E%20University%20Ave%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.537Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    'e6aa87ec-d389-4287-8e3d-040b43f9f251',
    'Burnham 310',
    'burnham-310-310',
    '310 E Springfield Ave',
    'Champaign',
    'IL',
    '61820',
    'Award-winning design at the intersection of campus and downtown, featuring an on-site local grocery and fitness center.',
    40.10533974093858,
    -88.23263082228642,
    'Burnham',
    'https://burnham310.com/',
    'https://burnham310.com/wp-content/uploads/2022/05/IMG_2743_4_5-1.jpg',
    '2026-03-12T03:24:32.537Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    '662f31a3-7468-44a9-81ee-5d187a17cc62',
    'Campus Circle',
    'campus-circle-401',
    '401 W University Ave',
    'Champaign',
    'IL',
    '61820',
    'Campus Circle is a premier residential building managed by Campus Circle, offering convenient access to the UIUC campus.',
    40.103706849119355,
    -88.23244540675009,
    'Campus Circle',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=401%20W%20University%20Ave%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.537Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    '62fac9c1-3b87-439b-a770-a2bf5fd1b613',
    '212 East',
    '212-east-212',
    '212 E Green St',
    'Champaign',
    'IL',
    '61820',
    '212 East is a premier residential building managed by 212 East, offering convenient access to the UIUC campus.',
    40.11181617223655,
    -88.23982111701947,
    '212 East',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=212%20E%20Green%20St%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.537Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    '3e5008e3-d484-498f-8fc0-2629fa5f4369',
    'Midtown Plaza',
    'midtown-plaza-302',
    '302 S Second St',
    'Champaign',
    'IL',
    '61820',
    'Midtown Plaza is a premier residential building managed by Midtown, offering convenient access to the UIUC campus.',
    40.114941189682945,
    -88.23350623862426,
    'Midtown',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=302%20S%20Second%20St%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.537Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    'f3a7fb09-add9-4da5-a79e-90a2954ff78c',
    'Midtown Lofts',
    'midtown-lofts-302',
    '302 S Second St',
    'Champaign',
    'IL',
    '61820',
    'Midtown Lofts is a premier residential building managed by Midtown, offering convenient access to the UIUC campus.',
    40.112004367015544,
    -88.23929937896965,
    'Midtown',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=302%20S%20Second%20St%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.537Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    '53f4de43-e72a-462b-a786-6a6a14d78317',
    'Octave Apartments',
    'octave-apartments-210',
    '210 S Fourth St',
    'Champaign',
    'IL',
    '61820',
    'Octave Apartments is a premier residential building managed by Octave, offering convenient access to the UIUC campus.',
    40.103714734901295,
    -88.22393145342508,
    'Octave',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=210%20S%20Fourth%20St%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.537Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    '44dcd455-abf7-4c11-81fc-cfaef610e769',
    'The Hub Champaign',
    'the-hub-champaign-601',
    '601 S First St',
    'Champaign',
    'IL',
    '61820',
    'Iconic residential tower with a rooftop pool and fitness club, defining the campus skyline.',
    40.116451716876675,
    -88.22041867280737,
    'Core Spaces',
    'https://huboncampus.com/champaign/',
    'https://huboncampus.com/champaign/wp-content/uploads/2024/06/gallerypage_gallery-32.jpg',
    '2026-03-12T03:24:32.537Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    '6e60cdbf-d697-4a56-b8e6-3fada0d1a8d7',
    'The Academy Campustown',
    'the-academy-campustown-508',
    '508 E Healey St',
    'Champaign',
    'IL',
    '61820',
    'The Academy Campustown is a premier residential building managed by The Academy, offering convenient access to the UIUC campus.',
    40.102227790846555,
    -88.23160256015731,
    'The Academy',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=508%20E%20Healey%20St%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.537Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    '177e8759-8586-49ae-a253-932c61759768',
    'The Linc',
    'the-linc-1301',
    '1301 S Lincoln Ave',
    'Champaign',
    'IL',
    '61820',
    'The Linc is a premier residential building managed by The Linc, offering convenient access to the UIUC campus.',
    40.10003771416388,
    -88.23611786042603,
    'The Linc',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=1301%20S%20Lincoln%20Ave%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.537Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    'd4dc63aa-af3b-4c70-b256-b40d38b48aee',
    '707 Apartments',
    '707-apartments-707',
    '707 S Fourth St',
    'Champaign',
    'IL',
    '61820',
    '707 Apartments is a premier residential building managed by 707, offering convenient access to the UIUC campus.',
    40.113151387214785,
    -88.23992409086675,
    '707',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=707%20S%20Fourth%20St%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.537Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    '3398728d-03c4-4014-b8a6-b335cc1acce8',
    '901 Western',
    '901-western-901',
    '901 S Western Ave',
    'Champaign',
    'IL',
    '61820',
    '901 Western is a premier residential building managed by 901 Western, offering convenient access to the UIUC campus.',
    40.10816562831561,
    -88.23582231673394,
    '901 Western',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=901%20S%20Western%20Ave%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.537Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    'cfb3699a-2c1a-43ea-b476-96b727ae8761',
    'Orchard Downs',
    'orchard-downs-2041',
    '2041 S Orchard St',
    'Champaign',
    'IL',
    '61820',
    'Orchard Downs is a premier residential building managed by UIUC Housing, offering convenient access to the UIUC campus.',
    40.110749063085926,
    -88.22631749373114,
    'UIUC Housing',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=2041%20S%20Orchard%20St%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.537Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    '3065ffde-2876-43dd-8bac-73d2cae73719',
    'Orchard Place',
    'orchard-place-1911',
    '1911 S Orchard St',
    'Champaign',
    'IL',
    '61820',
    'Orchard Place is a premier residential building managed by UIUC Housing, offering convenient access to the UIUC campus.',
    40.108733101575524,
    -88.23366601092766,
    'UIUC Housing',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=1911%20S%20Orchard%20St%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.537Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    '1957674b-73be-4f2d-8176-6da1661d773f',
    'Ashton Woods',
    'ashton-woods-2221',
    '2221 Ashton Ln',
    'Champaign',
    'IL',
    '61820',
    'Ashton Woods is a premier residential building managed by UIUC Housing, offering convenient access to the UIUC campus.',
    40.11905254316534,
    -88.22769260824408,
    'UIUC Housing',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=2221%20Ashton%20Ln%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.537Z'
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url, created_at)
VALUES (
    '06301b6c-4469-4c77-9497-034ae2ba6b0f',
    'Goodwin-Green',
    'goodwin-green-300',
    '300 S Goodwin Ave',
    'Champaign',
    'IL',
    '61820',
    'Goodwin-Green is a premier residential building managed by UIUC Housing, offering convenient access to the UIUC campus.',
    40.114778489652004,
    -88.23672349921128,
    'UIUC Housing',
    NULL,
    'https://maps.googleapis.com/maps/api/streetview?size=800x600&location=300%20S%20Goodwin%20Ave%2C%20Champaign%2C%20IL',
    '2026-03-12T03:24:32.537Z'
) ON CONFLICT (slug) DO NOTHING;

-- Re-enable RLS
ALTER TABLE public.apartments ENABLE ROW LEVEL SECURITY;

-- ── Insert mock reviews ────────────────────────────────────────────────
-- IMPORTANT: Reviews require a real user_id from auth.users.
-- We use a DO block to only insert reviews if the mock user exists.
-- Run the CREATE USER step first via Supabase Dashboard > Authentication > Add User,
-- then paste that user's UUID below.

-- REPLACE THIS UUID with the UUID from the user you created in Supabase Auth dashboard:
DO $$
DECLARE
    mock_user_id UUID;
BEGIN
    -- Try to find an existing user to attach reviews to
    SELECT id INTO mock_user_id FROM auth.users LIMIT 1;

    IF mock_user_id IS NULL THEN
        RAISE NOTICE 'No users found. Skipping review inserts. Create a user in Supabase Auth dashboard first.';
        RETURN;
    END IF;

    RAISE NOTICE 'Using user % for mock reviews', mock_user_id;

    ALTER TABLE public.reviews DISABLE ROW LEVEL SECURITY;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        '54291f70-0bb9-404c-aa6a-b9a5c2d2f030',
        'c4750e76-6c6c-47fe-9b70-e87f16e712bb',
        mock_user_id,
        5,
        5,
        4,
        4,
        774,
        'Right next to the bus stop, making getting to the engineering quad really easy. Maintenance guys are super friendly and fixed our dishwasher quickly.',
        '{}',
        '2026-02-06T06:10:10.441Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        '7ea546fe-dfce-4f04-8bb1-cbbe95cda4be',
        '85898f18-fc0c-4f2a-a618-76a96b67eb05',
        mock_user_id,
        3,
        4,
        5,
        4,
        996,
        'I haven''t had any major issues, but you can definitely hear your upstairs neighbor walking. It''s a solid place to live, fairly quiet on weekdays but noisy on weekends.',
        '{}',
        '2025-12-25T16:00:40.521Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        'd6e8ebf9-bb8f-44ee-80cf-49d28dbb6dbc',
        '6bcf6c66-8271-4cb1-81e6-c70b61aa4ad7',
        mock_user_id,
        3,
        4,
        4,
        3,
        680,
        'The bedrooms are spacious, though the living room is a bit cramped for four people. Honestly, for campustown, it''s pretty clean and well-kept.',
        '{}',
        '2026-01-28T18:10:38.488Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        'b8ed8c7c-de68-4401-a19e-dcdad0459430',
        '3fe6a2fc-e98b-41e8-9864-44105b2a5434',
        mock_user_id,
        4,
        5,
        5,
        3,
        865,
        'The bedrooms are spacious, though the living room is a bit cramped for four people. Heating is included which is great for the brutal winters here.',
        '{}',
        '2026-02-03T12:29:32.531Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        '7fa658a6-3840-4efd-b8d2-16c53d48f3a4',
        'bcef781a-c87c-4a3a-a4a4-22a915df149c',
        mock_user_id,
        5,
        4,
        3,
        5,
        841,
        'Heating is included which is great for the brutal winters here. Amenities are okay, but the internet can be spotty during peak hours.',
        '{}',
        '2026-02-15T09:18:29.211Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        'a80ef019-16b4-4d4e-9e38-b3d50838c4fe',
        '90fec5f7-be1c-40fd-9536-7fabd2bbff23',
        mock_user_id,
        5,
        4,
        5,
        4,
        644,
        'Honestly, for campustown, it''s pretty clean and well-kept. Packages sometimes get left in the lobby, but I''ve never lost anything.',
        '{}',
        '2026-03-20T04:30:19.726Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        '6516c113-a0ca-4276-a8f8-31c015e63b3d',
        '33fb2d7c-4843-43c0-bb38-94ff1c8d31b8',
        mock_user_id,
        5,
        3,
        4,
        5,
        694,
        'It''s a solid place to live, fairly quiet on weekdays but noisy on weekends. Honestly, for campustown, it''s pretty clean and well-kept.',
        '{}',
        '2026-02-08T13:45:53.276Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        '8d868ccb-555f-4584-9bad-b3f15511c8e6',
        'b0f25fa6-a2ee-4194-8a5b-7f8bac10de65',
        mock_user_id,
        3,
        5,
        4,
        3,
        760,
        'Right next to the bus stop, making getting to the engineering quad really easy. The bedrooms are spacious, though the living room is a bit cramped for four people.',
        '{}',
        '2025-12-25T19:28:43.676Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        'bd428d38-4157-42bf-bca8-27abf4b8a77d',
        '29c4a3f9-26ec-427c-afe9-7c039effee14',
        mock_user_id,
        4,
        3,
        4,
        4,
        741,
        'Kitchen appliances are a bit older, but totally functional. The bedrooms are spacious, though the living room is a bit cramped for four people.',
        '{}',
        '2026-01-07T21:36:40.237Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        '496eabdc-41ad-4e71-a1dd-4a5963171eb4',
        'ba4fcbf2-c5ea-42c5-b2b4-eea2e32a6752',
        mock_user_id,
        5,
        5,
        5,
        4,
        647,
        'Right next to the bus stop, making getting to the engineering quad really easy. Maintenance guys are super friendly and fixed our dishwasher quickly.',
        '{}',
        '2026-02-18T20:45:59.406Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        'e19b136c-4aae-4970-9e68-e64d8c19d6d8',
        '39876ef5-7fcf-4b76-a80b-7d1ed778c9fb',
        mock_user_id,
        5,
        5,
        5,
        5,
        623,
        'Maintenance guys are super friendly and fixed our dishwasher quickly. Management responds to maintenance requests within a day, which is nice.',
        '{}',
        '2026-02-08T22:06:31.179Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        '5ff32fd0-cd1d-49c6-90d9-0a2787e14013',
        '15f0fdde-ec5a-4482-aa8a-52ae47f681d5',
        mock_user_id,
        4,
        4,
        3,
        4,
        914,
        'Honestly, for campustown, it''s pretty clean and well-kept. I haven''t had any major issues, but you can definitely hear your upstairs neighbor walking.',
        '{}',
        '2026-01-09T23:35:30.741Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        'f4fcc3bf-d2c7-4b1b-a1fe-8f037cfe4837',
        '9947cba8-fc96-4929-aa70-ccfe177248dc',
        mock_user_id,
        4,
        4,
        3,
        4,
        982,
        'Right next to the bus stop, making getting to the engineering quad really easy. Right next to the bus stop, making getting to the engineering quad really easy.',
        '{}',
        '2026-02-23T16:52:56.969Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        '0e97b277-9eae-4478-87eb-58c282d51a65',
        '2697e4bf-7614-42aa-8d51-72d084db987e',
        mock_user_id,
        3,
        5,
        3,
        4,
        612,
        'It''s a solid place to live, fairly quiet on weekdays but noisy on weekends. Management responds to maintenance requests within a day, which is nice.',
        '{}',
        '2026-04-06T16:38:06.473Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        'e844c3d0-8b5a-476d-8ffa-51092ba400b7',
        '8835c7b8-4505-49e8-9018-3ede72796279',
        mock_user_id,
        5,
        5,
        4,
        4,
        671,
        'Management responds to maintenance requests within a day, which is nice. Kitchen appliances are a bit older, but totally functional.',
        '{}',
        '2026-01-05T18:43:21.164Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        '98addc88-287c-4798-86e7-353fc847f58d',
        'babd2678-cb4f-4af9-aa0e-ed1f497d03de',
        mock_user_id,
        5,
        3,
        5,
        5,
        730,
        'Heating is included which is great for the brutal winters here. Heating is included which is great for the brutal winters here.',
        '{}',
        '2026-01-28T19:30:28.578Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        '99735b03-4036-4653-b23e-b4ee1f89f20c',
        'abe34355-7704-4a87-ab23-8b61f3543830',
        mock_user_id,
        5,
        3,
        5,
        4,
        888,
        'Packages sometimes get left in the lobby, but I''ve never lost anything. Packages sometimes get left in the lobby, but I''ve never lost anything.',
        '{}',
        '2026-02-17T09:19:41.031Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        'bc0f2eb8-9f23-44a6-8755-4c986644396f',
        '9f4c1003-e82c-4f1c-97a2-1a9cc186806b',
        mock_user_id,
        3,
        4,
        3,
        3,
        712,
        'The location is decent for the price, but the walls are a bit thin. The location is decent for the price, but the walls are a bit thin.',
        '{}',
        '2026-01-03T19:17:22.081Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        'e6961f95-68c5-4bea-b799-5cfa3b39e348',
        '76d6007f-d93a-4e31-9e84-4fe2ee055878',
        mock_user_id,
        4,
        5,
        4,
        5,
        814,
        'Heating is included which is great for the brutal winters here. Honestly, for campustown, it''s pretty clean and well-kept.',
        '{}',
        '2026-03-02T00:15:22.169Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        'ad2ba98a-2dfa-42b8-9656-aa74d620528f',
        '37e1290b-ca63-41ee-8d9a-5abcab23d63f',
        mock_user_id,
        5,
        3,
        4,
        5,
        926,
        'The location is decent for the price, but the walls are a bit thin. The bedrooms are spacious, though the living room is a bit cramped for four people.',
        '{}',
        '2026-02-16T20:28:52.171Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        '672c5c26-f0e0-42ee-9c9c-22949b1b789c',
        'f427ffda-8cbb-466f-8ace-985059d98514',
        mock_user_id,
        3,
        3,
        4,
        4,
        912,
        'Heating is included which is great for the brutal winters here. I haven''t had any major issues, but you can definitely hear your upstairs neighbor walking.',
        '{}',
        '2026-03-22T07:39:07.347Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        '405eba92-0468-48fc-be8c-f582a3cfc646',
        '2616a578-8811-4db3-8754-54d40bdba693',
        mock_user_id,
        4,
        3,
        3,
        5,
        630,
        'It''s a solid place to live, fairly quiet on weekdays but noisy on weekends. I haven''t had any major issues, but you can definitely hear your upstairs neighbor walking.',
        '{}',
        '2026-02-14T00:22:43.374Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        '017251cd-9838-4899-ae24-1a90f90617e6',
        'ff40c812-d45e-4eed-b665-890440b89956',
        mock_user_id,
        4,
        4,
        5,
        4,
        672,
        'Kitchen appliances are a bit older, but totally functional. It''s a solid place to live, fairly quiet on weekdays but noisy on weekends.',
        '{}',
        '2025-12-29T12:48:16.319Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        'a5b22c29-1d14-41c3-a085-f574496fcdde',
        'a2e1eaa7-a15a-49ce-b012-53fa25021cd4',
        mock_user_id,
        3,
        3,
        4,
        5,
        799,
        'Maintenance guys are super friendly and fixed our dishwasher quickly. I haven''t had any major issues, but you can definitely hear your upstairs neighbor walking.',
        '{}',
        '2025-12-15T12:59:15.693Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        '60b79b09-3eec-4dfa-82f6-584af4c4716c',
        '1b9fa90c-2c40-456c-9826-4d0e39b3fa1f',
        mock_user_id,
        5,
        3,
        3,
        3,
        871,
        'I haven''t had any major issues, but you can definitely hear your upstairs neighbor walking. Right next to the bus stop, making getting to the engineering quad really easy.',
        '{}',
        '2026-03-14T18:21:00.715Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        '1563174e-4783-49de-8f4d-a43ad58adbee',
        '0579ac24-bd7c-460a-87a0-826ccfbe2adf',
        mock_user_id,
        4,
        5,
        4,
        4,
        710,
        'Heating is included which is great for the brutal winters here. The bedrooms are spacious, though the living room is a bit cramped for four people.',
        '{}',
        '2026-01-11T17:12:49.255Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        'a77dd7f2-28e3-4543-bfb8-11f293c698f4',
        '9081f556-e02a-48a9-b7b3-aa7c7026de92',
        mock_user_id,
        4,
        3,
        3,
        4,
        977,
        'The bedrooms are spacious, though the living room is a bit cramped for four people. Heating is included which is great for the brutal winters here.',
        '{}',
        '2026-02-16T21:38:17.805Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        'c672d3be-d263-458f-8882-b9e30d4dc584',
        'cf7eaece-0733-417e-93f2-c3f2af9f408b',
        mock_user_id,
        4,
        3,
        3,
        4,
        910,
        'Packages sometimes get left in the lobby, but I''ve never lost anything. It''s a typical campus apartment—nothing luxurious, but gets the job done.',
        '{}',
        '2026-03-21T18:01:48.974Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        '3d4b27f7-0094-44db-9d93-85e780558de5',
        '53e6181f-11f1-4c11-b2f9-a688977a3670',
        mock_user_id,
        3,
        4,
        3,
        4,
        748,
        'The bedrooms are spacious, though the living room is a bit cramped for four people. The location is decent for the price, but the walls are a bit thin.',
        '{}',
        '2026-03-14T07:22:03.317Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        'c5e035a6-bd80-4cd3-9042-21a43ddd40bf',
        '24c84a1a-9046-4cae-883f-781cc505e505',
        mock_user_id,
        3,
        4,
        4,
        3,
        761,
        'Amenities are okay, but the internet can be spotty during peak hours. The location is decent for the price, but the walls are a bit thin.',
        '{}',
        '2026-03-11T02:17:18.787Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        'f4ba343c-17c6-420b-bc68-0945891edd4b',
        '87d61529-6f40-4daf-b1b3-ebb276c211b3',
        mock_user_id,
        3,
        5,
        3,
        5,
        708,
        'The bedrooms are spacious, though the living room is a bit cramped for four people. Heating is included which is great for the brutal winters here.',
        '{}',
        '2026-03-30T15:37:02.328Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        '4e653caa-dfa6-477f-b0b4-29342d736b06',
        '9faacfb7-eb35-4828-9b18-13c78d5a42d6',
        mock_user_id,
        5,
        5,
        3,
        4,
        830,
        'Maintenance guys are super friendly and fixed our dishwasher quickly. Kitchen appliances are a bit older, but totally functional.',
        '{}',
        '2026-01-19T21:18:33.158Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        '15db45ea-7c54-40ba-976a-473c88a49bbd',
        '23afb98d-185c-447d-9ce5-ca4efbae43f4',
        mock_user_id,
        4,
        3,
        4,
        5,
        935,
        'Amenities are okay, but the internet can be spotty during peak hours. The location is decent for the price, but the walls are a bit thin.',
        '{}',
        '2025-12-28T16:29:35.416Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        '90989034-a721-4ac5-9ae2-a92b57bd357e',
        '3e7f6547-9ea5-4633-9f8c-4e31ae969872',
        mock_user_id,
        4,
        4,
        5,
        3,
        729,
        'Amenities are okay, but the internet can be spotty during peak hours. It''s a solid place to live, fairly quiet on weekdays but noisy on weekends.',
        '{}',
        '2026-02-16T15:16:52.356Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        'f82acc7f-2943-491b-9ac8-9379cef1ccda',
        '1cd32ebe-a0a6-43b3-948b-fbf2c187638c',
        mock_user_id,
        5,
        3,
        5,
        3,
        616,
        'The location is decent for the price, but the walls are a bit thin. It''s a solid place to live, fairly quiet on weekdays but noisy on weekends.',
        '{}',
        '2025-12-15T18:50:44.629Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        '63417dc5-74b4-4fe5-ac58-e6aa289092fd',
        '50e24835-1d52-415c-a33e-e30f05c19682',
        mock_user_id,
        4,
        3,
        4,
        3,
        745,
        'Kitchen appliances are a bit older, but totally functional. Management responds to maintenance requests within a day, which is nice.',
        '{}',
        '2026-02-26T18:42:16.560Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        '463cfddf-6329-470a-8a4b-9f93ad4133e9',
        '134844c9-8a7e-4118-a957-ab28b4be87ea',
        mock_user_id,
        4,
        5,
        4,
        5,
        698,
        'Heating is included which is great for the brutal winters here. Packages sometimes get left in the lobby, but I''ve never lost anything.',
        '{}',
        '2026-02-23T19:08:21.229Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        '29ef8d17-da6c-4197-b925-b2669a7a0d8b',
        'c39c8234-dd16-4b6b-9926-c7901ca6fad4',
        mock_user_id,
        4,
        3,
        4,
        5,
        620,
        'Kitchen appliances are a bit older, but totally functional. Kitchen appliances are a bit older, but totally functional.',
        '{}',
        '2026-02-11T18:24:27.497Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        '8f8029d0-3d40-4127-8eb9-304a947eddea',
        '5cc5dc85-d055-434a-a434-c75499c303fd',
        mock_user_id,
        5,
        3,
        3,
        4,
        959,
        'The bedrooms are spacious, though the living room is a bit cramped for four people. I haven''t had any major issues, but you can definitely hear your upstairs neighbor walking.',
        '{}',
        '2026-01-26T19:00:27.883Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        '5086de56-96bd-4c92-afaf-5fad8830e36b',
        'f48744df-fd2a-42c9-8488-8450e38b6e28',
        mock_user_id,
        3,
        4,
        3,
        5,
        780,
        'It''s a typical campus apartment—nothing luxurious, but gets the job done. The location is decent for the price, but the walls are a bit thin.',
        '{}',
        '2026-02-16T15:55:50.732Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        '2a6d53f6-cd32-4f28-8146-c43c4c43c16e',
        '36116cc9-82f3-4b23-8072-7500c3971cb2',
        mock_user_id,
        5,
        4,
        3,
        5,
        623,
        'The location is decent for the price, but the walls are a bit thin. Maintenance guys are super friendly and fixed our dishwasher quickly.',
        '{}',
        '2025-12-30T16:22:46.989Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        'ce1aa1e6-bcc1-44cf-b9bd-02b50ebc4921',
        'fa97f92e-e5fa-453c-8542-89762e06237b',
        mock_user_id,
        3,
        3,
        5,
        4,
        813,
        'The location is decent for the price, but the walls are a bit thin. The bedrooms are spacious, though the living room is a bit cramped for four people.',
        '{}',
        '2026-04-04T04:15:54.354Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        '8b99d82b-802a-4486-8f46-9e893ac4e7f0',
        '9d525eef-2263-40e0-b5c9-9c9041e40e8e',
        mock_user_id,
        4,
        5,
        3,
        5,
        663,
        'Honestly, for campustown, it''s pretty clean and well-kept. It''s a solid place to live, fairly quiet on weekdays but noisy on weekends.',
        '{}',
        '2025-12-26T06:57:52.297Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        'fabc39fd-89c8-4359-a8b6-20bf69d7a077',
        '120ef33f-6937-464e-9607-5ea97798b8f9',
        mock_user_id,
        3,
        4,
        3,
        5,
        929,
        'It''s a typical campus apartment—nothing luxurious, but gets the job done. Heating is included which is great for the brutal winters here.',
        '{}',
        '2026-04-02T01:00:46.304Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        '44eaed6a-2632-45fb-9367-8ea696ba4748',
        'e778a975-efc5-4879-a100-6cba3fb736df',
        mock_user_id,
        4,
        3,
        3,
        5,
        773,
        'Management responds to maintenance requests within a day, which is nice. Management responds to maintenance requests within a day, which is nice.',
        '{}',
        '2026-03-14T03:32:51.738Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        '6551adca-a997-4e82-b1d8-53331df92d5e',
        '08d16fa5-eb26-4e85-9b60-6a1c950a0f60',
        mock_user_id,
        4,
        3,
        5,
        3,
        716,
        'It''s a typical campus apartment—nothing luxurious, but gets the job done. Amenities are okay, but the internet can be spotty during peak hours.',
        '{}',
        '2026-03-13T14:09:42.937Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        '0c657e2c-4676-40f6-acb9-1453531882e9',
        '90731ab8-6d64-4883-8d52-8ff85bfb937a',
        mock_user_id,
        5,
        3,
        4,
        3,
        897,
        'Packages sometimes get left in the lobby, but I''ve never lost anything. I haven''t had any major issues, but you can definitely hear your upstairs neighbor walking.',
        '{}',
        '2026-04-03T20:30:17.410Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        '0b887b59-4af9-44b5-8002-a63dccc7895f',
        '973e9fba-0911-4abc-9b31-9b307bb326f4',
        mock_user_id,
        4,
        3,
        3,
        4,
        801,
        'Packages sometimes get left in the lobby, but I''ve never lost anything. The location is decent for the price, but the walls are a bit thin.',
        '{}',
        '2025-12-19T09:58:36.827Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        'b14b9e11-a619-4029-bbe8-648ff3fb41c2',
        'abd993d2-91fb-487c-9f50-df4dbf4f9f27',
        mock_user_id,
        5,
        5,
        5,
        3,
        746,
        'Honestly, for campustown, it''s pretty clean and well-kept. It''s a solid place to live, fairly quiet on weekdays but noisy on weekends.',
        '{}',
        '2026-03-15T02:21:10.524Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        '98ecadf8-8f7e-4165-aa8f-9b05a673549f',
        '2a45952b-cd90-4a56-81aa-9949f79e24b8',
        mock_user_id,
        4,
        3,
        5,
        3,
        723,
        'Kitchen appliances are a bit older, but totally functional. Honestly, for campustown, it''s pretty clean and well-kept.',
        '{}',
        '2026-01-06T09:58:45.718Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        'e9f38cf5-023e-4de4-a9dd-531d3c29b54f',
        'afdf2629-a6bb-40c3-95c6-f2970fce0670',
        mock_user_id,
        5,
        5,
        3,
        4,
        676,
        'Right next to the bus stop, making getting to the engineering quad really easy. The location is decent for the price, but the walls are a bit thin.',
        '{}',
        '2026-03-20T08:02:30.242Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        '6634cf9c-07c2-48bc-b9d6-0162a5a3e59d',
        '6539ad47-a879-401d-b024-011d69b7a71c',
        mock_user_id,
        4,
        3,
        3,
        3,
        625,
        'Amenities are okay, but the internet can be spotty during peak hours. Management responds to maintenance requests within a day, which is nice.',
        '{}',
        '2026-01-15T11:48:50.983Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        '95c27446-ce5a-4578-b5dc-76e199bed81b',
        'af58c3b2-9a89-47e4-99fc-77819f252c04',
        mock_user_id,
        5,
        4,
        4,
        5,
        673,
        'It''s a solid place to live, fairly quiet on weekdays but noisy on weekends. I haven''t had any major issues, but you can definitely hear your upstairs neighbor walking.',
        '{}',
        '2025-12-23T09:55:20.118Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        'ed5be213-2e27-452e-be7c-4376cc21dbdc',
        '81ea997a-4015-46d5-92b0-b0a0a65c3104',
        mock_user_id,
        5,
        3,
        3,
        5,
        664,
        'Heating is included which is great for the brutal winters here. Heating is included which is great for the brutal winters here.',
        '{}',
        '2026-02-05T22:21:59.376Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        '8531766b-bb7c-49da-b74e-a2875158bfcd',
        '9f4ed03f-1a1c-4a5e-b263-c2f8c18ddd74',
        mock_user_id,
        3,
        4,
        4,
        4,
        630,
        'It''s a solid place to live, fairly quiet on weekdays but noisy on weekends. Maintenance guys are super friendly and fixed our dishwasher quickly.',
        '{}',
        '2025-12-29T12:35:57.505Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        '4379b12c-15cf-42cb-a56b-72c3a79f9a04',
        'ed106537-f197-454a-aae6-d92ab8c541f7',
        mock_user_id,
        5,
        5,
        5,
        3,
        851,
        'I haven''t had any major issues, but you can definitely hear your upstairs neighbor walking. Heating is included which is great for the brutal winters here.',
        '{}',
        '2026-01-24T14:47:39.739Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        '63e21143-dbed-4afc-ac09-8254da31cc15',
        'fddc828a-69fa-482c-aa08-093d9f0a66a4',
        mock_user_id,
        3,
        5,
        5,
        5,
        873,
        'Kitchen appliances are a bit older, but totally functional. It''s a solid place to live, fairly quiet on weekdays but noisy on weekends.',
        '{}',
        '2026-02-15T20:02:06.627Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        'ae16bfa2-0791-4013-aa5d-6ba2195add57',
        'ba61c057-f540-4014-9d0f-bad510b6d1d4',
        mock_user_id,
        5,
        5,
        5,
        3,
        933,
        'Right next to the bus stop, making getting to the engineering quad really easy. The location is decent for the price, but the walls are a bit thin.',
        '{}',
        '2026-02-13T05:06:46.533Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        '0dc4dfc3-1f64-42a0-ba23-cb115f46667b',
        '834ed559-3eeb-42ad-ae67-d5b1dd57baac',
        mock_user_id,
        3,
        3,
        3,
        3,
        954,
        'Right next to the bus stop, making getting to the engineering quad really easy. Amenities are okay, but the internet can be spotty during peak hours.',
        '{}',
        '2026-03-06T19:29:34.201Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        'babd4f72-d3a6-4c16-a442-152f25404cfd',
        'e9266842-58dc-4339-8c65-c1bb1f96b03d',
        mock_user_id,
        3,
        5,
        5,
        3,
        960,
        'Management responds to maintenance requests within a day, which is nice. It''s a solid place to live, fairly quiet on weekdays but noisy on weekends.',
        '{}',
        '2026-03-29T16:09:49.479Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        '9fe32759-cd84-465f-8617-a1bc627fa3de',
        'bb5632d9-fbf7-485e-aad4-c27dd72339c7',
        mock_user_id,
        4,
        4,
        5,
        5,
        645,
        'It''s a solid place to live, fairly quiet on weekdays but noisy on weekends. I haven''t had any major issues, but you can definitely hear your upstairs neighbor walking.',
        '{}',
        '2026-02-08T07:15:01.112Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        'e67fa75e-f837-4f5a-87c5-9af65d3342d8',
        '68e77019-16e2-4afd-945a-7023258e7099',
        mock_user_id,
        3,
        5,
        3,
        3,
        973,
        'It''s a solid place to live, fairly quiet on weekdays but noisy on weekends. It''s a solid place to live, fairly quiet on weekdays but noisy on weekends.',
        '{}',
        '2026-01-23T01:40:06.887Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        '687e4f6e-6134-4b4d-baae-d740f54d5599',
        'e23e1e89-54e7-4935-b7ab-69fa003b5e19',
        mock_user_id,
        4,
        5,
        4,
        4,
        683,
        'Heating is included which is great for the brutal winters here. I haven''t had any major issues, but you can definitely hear your upstairs neighbor walking.',
        '{}',
        '2026-01-20T13:16:49.820Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        '51688af7-07aa-449a-ba34-d2cf57121ec6',
        '39cdc87c-ddee-4534-b7c9-d927d86687c6',
        mock_user_id,
        3,
        3,
        3,
        3,
        604,
        'Honestly, for campustown, it''s pretty clean and well-kept. Maintenance guys are super friendly and fixed our dishwasher quickly.',
        '{}',
        '2026-01-23T18:38:15.750Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        'd109b122-9f57-40da-944a-f52fffb0a7a8',
        '33417047-8d4f-44b8-8bdc-7c88e7784079',
        mock_user_id,
        5,
        5,
        4,
        4,
        738,
        'Maintenance guys are super friendly and fixed our dishwasher quickly. Maintenance guys are super friendly and fixed our dishwasher quickly.',
        '{}',
        '2026-02-12T10:56:08.416Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        '379528f7-1ce6-4e4d-9bb2-d1e536a1846c',
        'b0491686-40b4-478d-8a34-194c8fc4ae1c',
        mock_user_id,
        5,
        5,
        4,
        5,
        817,
        'Maintenance guys are super friendly and fixed our dishwasher quickly. Maintenance guys are super friendly and fixed our dishwasher quickly.',
        '{}',
        '2025-12-21T06:09:05.165Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        'c1d4164c-0084-41be-9e61-a996aa5c002e',
        'd5150a31-8d6d-4f68-b6ca-324faf46ada9',
        mock_user_id,
        5,
        4,
        4,
        4,
        713,
        'It''s a typical campus apartment—nothing luxurious, but gets the job done. It''s a solid place to live, fairly quiet on weekdays but noisy on weekends.',
        '{}',
        '2026-03-09T07:25:27.729Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        'd89f5e08-8754-49ec-9f4a-7553cbcde74f',
        'f92b2416-a36c-4a96-86da-c4418c5e372e',
        mock_user_id,
        3,
        5,
        4,
        3,
        928,
        'Amenities are okay, but the internet can be spotty during peak hours. The bedrooms are spacious, though the living room is a bit cramped for four people.',
        '{}',
        '2026-01-20T22:53:52.104Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        '18f5470b-4ad4-4d2a-b985-8761e5f7c39c',
        '61a8e9a1-357f-4991-9181-77df1da242d2',
        mock_user_id,
        4,
        4,
        3,
        5,
        613,
        'Maintenance guys are super friendly and fixed our dishwasher quickly. Management responds to maintenance requests within a day, which is nice.',
        '{}',
        '2026-03-28T15:29:17.790Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        'b8b2daea-f2a3-48b8-baa1-4c8544446308',
        '3ae1b312-707f-4238-b662-8d8fa8dbc1f4',
        mock_user_id,
        3,
        4,
        5,
        5,
        872,
        'Honestly, for campustown, it''s pretty clean and well-kept. Maintenance guys are super friendly and fixed our dishwasher quickly.',
        '{}',
        '2025-12-21T12:55:07.878Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        'af4d3dbf-c009-4ece-96bc-331dd63e2ad1',
        '1d6c8ebe-8b9a-4740-9d89-a55de187e682',
        mock_user_id,
        5,
        5,
        3,
        5,
        867,
        'It''s a solid place to live, fairly quiet on weekdays but noisy on weekends. It''s a typical campus apartment—nothing luxurious, but gets the job done.',
        '{}',
        '2026-01-01T03:49:37.974Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        'd63b8529-7e56-44da-b42e-8343f38977dc',
        'ffff73b6-e74b-45be-968d-65a03252f697',
        mock_user_id,
        4,
        3,
        4,
        3,
        697,
        'Kitchen appliances are a bit older, but totally functional. The location is decent for the price, but the walls are a bit thin.',
        '{}',
        '2026-02-12T13:08:52.020Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        '216bf33e-0682-461e-9bcd-a4b455cc611e',
        '445843ef-b6d9-4375-aeb5-d83d2c2b8b23',
        mock_user_id,
        3,
        5,
        5,
        3,
        906,
        'Packages sometimes get left in the lobby, but I''ve never lost anything. Heating is included which is great for the brutal winters here.',
        '{}',
        '2026-03-28T04:02:26.748Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        '8d03da5a-e244-4f6f-b12b-da8f53a6ff3e',
        '07b6bdc5-6d1d-43af-843d-9f4cc0898fc9',
        mock_user_id,
        5,
        5,
        3,
        4,
        876,
        'Right next to the bus stop, making getting to the engineering quad really easy. The location is decent for the price, but the walls are a bit thin.',
        '{}',
        '2026-03-14T08:47:45.019Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        'abf96376-9207-4c89-ab57-75453cd05d6c',
        'dff336d2-fe78-48b8-9ca7-bb6c431ea2f7',
        mock_user_id,
        4,
        4,
        4,
        4,
        615,
        'It''s a typical campus apartment—nothing luxurious, but gets the job done. Kitchen appliances are a bit older, but totally functional.',
        '{}',
        '2026-01-06T19:16:22.145Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        '69a69b8a-9289-4473-a587-5fb7eaaf5358',
        '3c9be047-46e9-42df-85bf-1fc0c470c9a0',
        mock_user_id,
        4,
        5,
        3,
        5,
        915,
        'Amenities are okay, but the internet can be spotty during peak hours. Packages sometimes get left in the lobby, but I''ve never lost anything.',
        '{}',
        '2026-02-09T21:56:21.749Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        'dc7db185-4b83-4a85-9130-40cb8b95eec6',
        '9a317cf4-a4d8-45cd-8e86-35255d417616',
        mock_user_id,
        3,
        3,
        5,
        4,
        844,
        'Maintenance guys are super friendly and fixed our dishwasher quickly. Kitchen appliances are a bit older, but totally functional.',
        '{}',
        '2025-12-25T13:27:13.270Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        'dcc8d2a8-fcb0-405c-9921-d110b2463a53',
        '0b6a4a77-766b-46c2-8c86-9ff76e1ed027',
        mock_user_id,
        5,
        4,
        3,
        5,
        832,
        'The location is decent for the price, but the walls are a bit thin. I haven''t had any major issues, but you can definitely hear your upstairs neighbor walking.',
        '{}',
        '2026-03-01T19:13:21.621Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        'd2b1fb92-8080-4313-89a8-ff4b21e04c54',
        '9e1c835b-6623-4147-935d-68e1954b3c76',
        mock_user_id,
        3,
        4,
        5,
        4,
        910,
        'Amenities are okay, but the internet can be spotty during peak hours. Honestly, for campustown, it''s pretty clean and well-kept.',
        '{}',
        '2026-01-11T19:33:15.850Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        '0177eb99-c5ac-453c-805d-a6665686bce7',
        'ab814b00-143a-4dfe-bfa9-ce2582e76ecc',
        mock_user_id,
        4,
        4,
        3,
        3,
        695,
        'Maintenance guys are super friendly and fixed our dishwasher quickly. Heating is included which is great for the brutal winters here.',
        '{}',
        '2026-02-24T15:14:27.330Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        '14be5751-529b-484e-99a4-b839fbef26fd',
        'f54786e3-6117-4c70-8428-880fd3010018',
        mock_user_id,
        5,
        4,
        5,
        5,
        934,
        'Right next to the bus stop, making getting to the engineering quad really easy. Amenities are okay, but the internet can be spotty during peak hours.',
        '{}',
        '2026-01-11T20:40:03.084Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        '400006c4-a41c-4eb4-93cb-cef6dfdae6c4',
        'd4942e77-9a74-4ccd-ad5c-61f8f317525c',
        mock_user_id,
        4,
        3,
        4,
        3,
        835,
        'The location is decent for the price, but the walls are a bit thin. It''s a solid place to live, fairly quiet on weekdays but noisy on weekends.',
        '{}',
        '2026-01-03T18:44:46.068Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        'fe2e0d99-acfd-446b-8185-28706a61a82a',
        'dab19808-8085-4752-ae2a-8d2a472f470d',
        mock_user_id,
        4,
        3,
        5,
        3,
        706,
        'Maintenance guys are super friendly and fixed our dishwasher quickly. Amenities are okay, but the internet can be spotty during peak hours.',
        '{}',
        '2025-12-18T15:12:15.164Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        '1f8a1911-2fdf-488d-b597-28044433ee12',
        '5ea09e5b-f7bb-4ce9-8131-53b6568a9793',
        mock_user_id,
        3,
        3,
        4,
        4,
        914,
        'Amenities are okay, but the internet can be spotty during peak hours. Heating is included which is great for the brutal winters here.',
        '{}',
        '2026-02-21T21:24:40.924Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        'fe7cf580-2faa-4c66-ba41-17467bee44f6',
        'ff8d2ac4-8bea-4f32-b3e2-233e51c20693',
        mock_user_id,
        3,
        5,
        4,
        3,
        978,
        'Amenities are okay, but the internet can be spotty during peak hours. Maintenance guys are super friendly and fixed our dishwasher quickly.',
        '{}',
        '2025-12-30T21:35:48.666Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        '5cf00b6d-b6f7-4086-a28b-2a0108486048',
        'e60200b0-ed62-4aba-8fe5-5b44c2f2e4df',
        mock_user_id,
        3,
        4,
        3,
        5,
        722,
        'The bedrooms are spacious, though the living room is a bit cramped for four people. Kitchen appliances are a bit older, but totally functional.',
        '{}',
        '2026-03-14T15:42:04.368Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        'baa94c44-0131-4bff-a904-b4c3c09d8c96',
        '5c8c7059-2340-4e6c-a716-aea334268cd5',
        mock_user_id,
        3,
        5,
        3,
        3,
        992,
        'Honestly, for campustown, it''s pretty clean and well-kept. Heating is included which is great for the brutal winters here.',
        '{}',
        '2026-03-06T11:45:41.194Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        'fa6c1464-73a4-419b-99a5-6858d33b5951',
        'b75b175f-43ab-457f-a461-4e76259d1150',
        mock_user_id,
        5,
        5,
        5,
        5,
        617,
        'I haven''t had any major issues, but you can definitely hear your upstairs neighbor walking. The bedrooms are spacious, though the living room is a bit cramped for four people.',
        '{}',
        '2026-03-31T19:39:46.502Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        '488cf52a-beea-47eb-9c2f-f2141be3873b',
        'aef91a93-45f4-4a52-90e6-bcfabd185075',
        mock_user_id,
        3,
        5,
        3,
        3,
        887,
        'Heating is included which is great for the brutal winters here. Amenities are okay, but the internet can be spotty during peak hours.',
        '{}',
        '2025-12-30T09:35:19.460Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        '0523a45d-2e24-4920-86b1-f04d3ce7298b',
        '224da2fa-d181-458e-b22b-5f892f4f4fa6',
        mock_user_id,
        5,
        3,
        5,
        5,
        828,
        'Management responds to maintenance requests within a day, which is nice. Amenities are okay, but the internet can be spotty during peak hours.',
        '{}',
        '2026-01-02T13:57:11.028Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        '10aacb38-a5dd-47ed-b684-d55c5af786fc',
        'c1b04e9f-32f8-404e-9897-d1e89abd270c',
        mock_user_id,
        4,
        3,
        3,
        4,
        825,
        'Kitchen appliances are a bit older, but totally functional. The location is decent for the price, but the walls are a bit thin.',
        '{}',
        '2026-03-22T04:54:01.642Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        'e2aa25b5-825f-4239-b1f0-4207f4098e76',
        'd010963b-9e1e-47b0-b141-324e1e09d638',
        mock_user_id,
        5,
        5,
        4,
        3,
        889,
        'It''s a typical campus apartment—nothing luxurious, but gets the job done. Packages sometimes get left in the lobby, but I''ve never lost anything.',
        '{}',
        '2025-12-21T02:52:52.297Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        'a72efff8-cc89-4eb4-b7fe-f66b930c560e',
        'd00ae6c6-af59-4fd2-a86b-1272591c764b',
        mock_user_id,
        5,
        4,
        5,
        5,
        771,
        'Kitchen appliances are a bit older, but totally functional. The bedrooms are spacious, though the living room is a bit cramped for four people.',
        '{}',
        '2026-02-14T14:08:22.430Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        'c1f99242-32d8-4a85-872e-b38ee660a691',
        'aca374be-eb11-413d-a76e-d6afcf48fe66',
        mock_user_id,
        4,
        4,
        3,
        4,
        969,
        'The bedrooms are spacious, though the living room is a bit cramped for four people. It''s a typical campus apartment—nothing luxurious, but gets the job done.',
        '{}',
        '2026-02-13T22:39:34.082Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        'c3b18328-4b44-455b-be9e-05e381251b7b',
        '4795d9a9-9a0f-421a-9349-3bd1704e25f4',
        mock_user_id,
        3,
        4,
        4,
        4,
        781,
        'It''s a solid place to live, fairly quiet on weekdays but noisy on weekends. Honestly, for campustown, it''s pretty clean and well-kept.',
        '{}',
        '2025-12-23T18:11:19.097Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        '7b65e3da-7d1b-4659-b208-5281fc72451c',
        'fe9b7cd8-b2aa-441c-a1fc-05f9c7c8ae3c',
        mock_user_id,
        3,
        5,
        4,
        4,
        618,
        'Amenities are okay, but the internet can be spotty during peak hours. Heating is included which is great for the brutal winters here.',
        '{}',
        '2026-01-01T22:15:07.281Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        'e6c75981-2b66-455c-8f6b-e1917033db45',
        '5a507c67-6ec8-400b-a409-8472d3e1319a',
        mock_user_id,
        3,
        3,
        5,
        4,
        999,
        'Management responds to maintenance requests within a day, which is nice. I haven''t had any major issues, but you can definitely hear your upstairs neighbor walking.',
        '{}',
        '2026-03-11T07:18:00.647Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        'fe4471d8-420c-4208-bc14-32da67a8cdc0',
        'd66954c0-02af-4d33-8c76-c3fec778d16a',
        mock_user_id,
        3,
        5,
        5,
        5,
        659,
        'The location is decent for the price, but the walls are a bit thin. Management responds to maintenance requests within a day, which is nice.',
        '{}',
        '2025-12-29T06:45:28.181Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        'e813f19f-7c52-4c87-b8b2-b6dd49c39870',
        '12d045b3-2e68-44f2-b0be-8c844b4b33f6',
        mock_user_id,
        3,
        5,
        5,
        5,
        692,
        'Honestly, for campustown, it''s pretty clean and well-kept. It''s a typical campus apartment—nothing luxurious, but gets the job done.',
        '{}',
        '2026-01-11T16:54:39.556Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        'e3d18f74-d0c3-47c2-b3d4-21653dad2786',
        '1fbd4bfd-f73c-412e-97dd-eae10b2744f4',
        mock_user_id,
        4,
        5,
        3,
        5,
        811,
        'Management responds to maintenance requests within a day, which is nice. Packages sometimes get left in the lobby, but I''ve never lost anything.',
        '{}',
        '2025-12-28T09:57:44.166Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        '4826b0db-02a9-4dd1-a517-ac2d59edb90d',
        '40046e65-5914-4621-8876-025d69da6c13',
        mock_user_id,
        5,
        5,
        5,
        3,
        606,
        'Maintenance guys are super friendly and fixed our dishwasher quickly. Kitchen appliances are a bit older, but totally functional.',
        '{}',
        '2025-12-30T16:35:42.864Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        'cd230414-619a-4ccc-8a6d-77e52a1dede5',
        '90b7d5c9-3bd1-486a-80d3-bb57e5097d6d',
        mock_user_id,
        5,
        4,
        3,
        3,
        649,
        'Management responds to maintenance requests within a day, which is nice. Management responds to maintenance requests within a day, which is nice.',
        '{}',
        '2026-03-18T02:29:20.220Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        '0697eb81-25e0-4ea0-b01e-98d5ffd49ed4',
        '6dd4cb59-9a58-4cbd-8642-ae1048829414',
        mock_user_id,
        4,
        3,
        3,
        5,
        624,
        'Management responds to maintenance requests within a day, which is nice. It''s a typical campus apartment—nothing luxurious, but gets the job done.',
        '{}',
        '2026-02-04T17:33:09.664Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        '2936c6dc-161e-4ab9-979f-ae18748259f1',
        'a4bb7397-f58d-4193-b1c0-4a9cd6527d08',
        mock_user_id,
        3,
        4,
        5,
        3,
        722,
        'Right next to the bus stop, making getting to the engineering quad really easy. Kitchen appliances are a bit older, but totally functional.',
        '{}',
        '2026-04-07T08:13:39.825Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        '1215caac-0c73-48ad-b0a3-49d654c2fa07',
        'e90ff3e8-4f9c-47d4-9c8d-aff0413e874a',
        mock_user_id,
        3,
        5,
        4,
        4,
        928,
        'I haven''t had any major issues, but you can definitely hear your upstairs neighbor walking. Maintenance guys are super friendly and fixed our dishwasher quickly.',
        '{}',
        '2026-03-24T08:27:17.574Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        'ad6f93fc-04c2-4874-8fb9-9b9d7f479d82',
        'c33e740c-0373-458d-8b23-8efe19d96991',
        mock_user_id,
        4,
        4,
        4,
        3,
        612,
        'It''s a typical campus apartment—nothing luxurious, but gets the job done. Heating is included which is great for the brutal winters here.',
        '{}',
        '2026-01-04T03:15:58.659Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        '307c36a3-584c-4dbb-93f7-e3df97a51d6c',
        '2292c02b-98df-4bdb-8948-cf9da72f8fd7',
        mock_user_id,
        4,
        5,
        4,
        4,
        763,
        'Heating is included which is great for the brutal winters here. Honestly, for campustown, it''s pretty clean and well-kept.',
        '{}',
        '2025-12-22T03:12:36.511Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        '0bdb7559-f764-4a25-ad50-3a4e54f3e8c7',
        'a1efce14-0cbb-42c6-9462-ff7f7c9bc837',
        mock_user_id,
        4,
        4,
        4,
        4,
        613,
        'Packages sometimes get left in the lobby, but I''ve never lost anything. Kitchen appliances are a bit older, but totally functional.',
        '{}',
        '2026-03-18T08:21:25.618Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        '4445e78c-40a6-41d4-a17f-7ad54cb81cd0',
        '4c7afe42-8981-4ecc-9a25-bd08ff210a79',
        mock_user_id,
        3,
        4,
        4,
        5,
        845,
        'The location is decent for the price, but the walls are a bit thin. Amenities are okay, but the internet can be spotty during peak hours.',
        '{}',
        '2026-03-30T01:49:39.858Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        'f42ef85b-0aa5-4ed5-a8ec-8ff90392f872',
        '9132c714-2c20-4fb2-b6cc-8207948c098a',
        mock_user_id,
        5,
        5,
        4,
        5,
        771,
        'I haven''t had any major issues, but you can definitely hear your upstairs neighbor walking. Honestly, for campustown, it''s pretty clean and well-kept.',
        '{}',
        '2026-03-18T09:53:01.689Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        'e2b8416b-e9fc-4d07-ae9e-191fc1f5434f',
        '7cd18de8-9d47-4e86-98a3-1aa1b2caa79a',
        mock_user_id,
        3,
        3,
        3,
        4,
        993,
        'Packages sometimes get left in the lobby, but I''ve never lost anything. I haven''t had any major issues, but you can definitely hear your upstairs neighbor walking.',
        '{}',
        '2026-03-21T07:16:29.870Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        'e0fd17cf-36bb-4785-9894-a417b5c12053',
        '5be58fe6-7f9c-4a68-b1a1-17181e51e3ca',
        mock_user_id,
        5,
        5,
        3,
        3,
        861,
        'Right next to the bus stop, making getting to the engineering quad really easy. Amenities are okay, but the internet can be spotty during peak hours.',
        '{}',
        '2026-01-07T12:49:51.394Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        '03f75607-5836-4b09-8fc7-8b3ae6e929aa',
        'b7903832-c082-4fde-8daf-1833df0d324b',
        mock_user_id,
        4,
        5,
        3,
        3,
        727,
        'The bedrooms are spacious, though the living room is a bit cramped for four people. Maintenance guys are super friendly and fixed our dishwasher quickly.',
        '{}',
        '2026-02-25T22:44:45.575Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        'b551b087-c777-428e-9f85-785114bf04b6',
        'aa91994d-a154-4e17-a942-771ba2f5ca2d',
        mock_user_id,
        4,
        3,
        4,
        5,
        671,
        'Right next to the bus stop, making getting to the engineering quad really easy. The location is decent for the price, but the walls are a bit thin.',
        '{}',
        '2026-01-31T17:46:06.243Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        '3ceb424b-8a20-4794-b3b3-2dda14b4eb56',
        'c6713a39-6937-436b-bfaf-072c9f7e7920',
        mock_user_id,
        3,
        4,
        5,
        5,
        922,
        'I haven''t had any major issues, but you can definitely hear your upstairs neighbor walking. I haven''t had any major issues, but you can definitely hear your upstairs neighbor walking.',
        '{}',
        '2026-03-05T18:21:13.375Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        'fce5f628-0884-4c50-84c1-0044d57c8c19',
        '622f3ac4-cf87-40b1-8a9e-ba8468ae80bd',
        mock_user_id,
        3,
        4,
        5,
        4,
        707,
        'Right next to the bus stop, making getting to the engineering quad really easy. It''s a solid place to live, fairly quiet on weekdays but noisy on weekends.',
        '{}',
        '2026-03-21T16:36:04.243Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        '6fe04b6f-2007-46b2-bb51-d8c2424b84b8',
        'e6aa87ec-d389-4287-8e3d-040b43f9f251',
        mock_user_id,
        3,
        3,
        5,
        5,
        611,
        'Right next to the bus stop, making getting to the engineering quad really easy. Heating is included which is great for the brutal winters here.',
        '{}',
        '2026-01-26T21:51:53.248Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        'f8f2e802-3caf-48a6-9cf6-3c01f0a06413',
        '662f31a3-7468-44a9-81ee-5d187a17cc62',
        mock_user_id,
        5,
        3,
        4,
        4,
        877,
        'Heating is included which is great for the brutal winters here. It''s a solid place to live, fairly quiet on weekdays but noisy on weekends.',
        '{}',
        '2025-12-21T18:31:38.886Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        '894694be-3bef-4061-9b65-e66d2b9d2ffb',
        '62fac9c1-3b87-439b-a770-a2bf5fd1b613',
        mock_user_id,
        4,
        4,
        3,
        3,
        899,
        'The bedrooms are spacious, though the living room is a bit cramped for four people. Honestly, for campustown, it''s pretty clean and well-kept.',
        '{}',
        '2026-02-15T03:45:27.076Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        '9ba17697-8f43-4251-998c-e1d4f2c8ddd0',
        '3e5008e3-d484-498f-8fc0-2629fa5f4369',
        mock_user_id,
        5,
        5,
        4,
        4,
        967,
        'Kitchen appliances are a bit older, but totally functional. Kitchen appliances are a bit older, but totally functional.',
        '{}',
        '2026-03-14T11:09:36.777Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        '96a292ec-06e3-428e-b2da-692d10b87e55',
        'f3a7fb09-add9-4da5-a79e-90a2954ff78c',
        mock_user_id,
        5,
        3,
        5,
        4,
        813,
        'It''s a typical campus apartment—nothing luxurious, but gets the job done. Management responds to maintenance requests within a day, which is nice.',
        '{}',
        '2026-02-05T01:58:04.838Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        '813a7302-c94b-4a89-8845-cec99c3c8b59',
        '53f4de43-e72a-462b-a786-6a6a14d78317',
        mock_user_id,
        5,
        3,
        4,
        3,
        979,
        'It''s a solid place to live, fairly quiet on weekdays but noisy on weekends. Amenities are okay, but the internet can be spotty during peak hours.',
        '{}',
        '2025-12-23T00:22:52.967Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        'f042bd92-c519-432d-b3d2-99a4540d1d87',
        '44dcd455-abf7-4c11-81fc-cfaef610e769',
        mock_user_id,
        3,
        5,
        3,
        5,
        753,
        'Heating is included which is great for the brutal winters here. It''s a solid place to live, fairly quiet on weekdays but noisy on weekends.',
        '{}',
        '2026-03-12T22:27:16.320Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        '5775af91-43fd-45ae-b635-264c41011474',
        '6e60cdbf-d697-4a56-b8e6-3fada0d1a8d7',
        mock_user_id,
        3,
        3,
        3,
        4,
        628,
        'Management responds to maintenance requests within a day, which is nice. The bedrooms are spacious, though the living room is a bit cramped for four people.',
        '{}',
        '2026-01-06T02:16:18.046Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        'b75082a9-e795-42d6-b1d1-9eef78757d1d',
        '177e8759-8586-49ae-a253-932c61759768',
        mock_user_id,
        4,
        3,
        5,
        3,
        665,
        'The bedrooms are spacious, though the living room is a bit cramped for four people. Amenities are okay, but the internet can be spotty during peak hours.',
        '{}',
        '2025-12-19T16:50:51.524Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        '7612edee-3c54-41f4-ab59-e2715e8a3928',
        'd4dc63aa-af3b-4c70-b256-b40d38b48aee',
        mock_user_id,
        5,
        4,
        4,
        5,
        990,
        'Amenities are okay, but the internet can be spotty during peak hours. The location is decent for the price, but the walls are a bit thin.',
        '{}',
        '2026-01-12T16:41:05.869Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        '06afe270-238d-408c-92ac-6357371a5297',
        '3398728d-03c4-4014-b8a6-b335cc1acce8',
        mock_user_id,
        3,
        5,
        3,
        5,
        904,
        'The bedrooms are spacious, though the living room is a bit cramped for four people. Management responds to maintenance requests within a day, which is nice.',
        '{}',
        '2026-02-18T19:20:20.261Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        '981cced1-8bcb-43ec-8cf9-83432988cb4d',
        'cfb3699a-2c1a-43ea-b476-96b727ae8761',
        mock_user_id,
        5,
        4,
        5,
        4,
        976,
        'Kitchen appliances are a bit older, but totally functional. It''s a typical campus apartment—nothing luxurious, but gets the job done.',
        '{}',
        '2026-01-21T16:23:05.548Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        '14cc431b-4fa3-4e62-a9e5-b155d5f26836',
        '3065ffde-2876-43dd-8bac-73d2cae73719',
        mock_user_id,
        5,
        4,
        3,
        5,
        695,
        'Management responds to maintenance requests within a day, which is nice. Packages sometimes get left in the lobby, but I''ve never lost anything.',
        '{}',
        '2026-03-09T06:44:31.003Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        '55975676-3d1c-42b5-98f5-6a4298cd9094',
        '1957674b-73be-4f2d-8176-6da1661d773f',
        mock_user_id,
        3,
        3,
        5,
        5,
        787,
        'Heating is included which is great for the brutal winters here. The location is decent for the price, but the walls are a bit thin.',
        '{}',
        '2026-01-05T03:30:50.986Z'
    ) ON CONFLICT DO NOTHING;

    INSERT INTO public.reviews (id, apartment_id, user_id, management_rating, maintenance_rating, value_rating, noise_rating, monthly_rent_paid, written_review, image_urls, created_at)
    VALUES (
        'b8c2ddea-4a09-440c-b32d-eb1965e7ca37',
        '06301b6c-4469-4c77-9497-034ae2ba6b0f',
        mock_user_id,
        5,
        3,
        3,
        4,
        670,
        'Heating is included which is great for the brutal winters here. Honestly, for campustown, it''s pretty clean and well-kept.',
        '{}',
        '2026-02-10T06:56:20.704Z'
    ) ON CONFLICT DO NOTHING;

    ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

END $$;
