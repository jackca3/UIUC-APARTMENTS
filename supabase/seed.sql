-- UIUC Apartment Review Platform — Seed Data

-- LEASING COMPANIES
insert into public.leasing_companies (id, name, slug, website, phone, email) values
('c1a2f082-d72a-2b28-1008-18b9cad0e1f2', 'JSM Living', 'jsm-living', 'https://jsmliving.com', '217-328-3030', 'jsm@jsmliving.com'),
('c2a2f082-d72a-2b28-1008-18b9cad0e1f3', 'Green Street Realty', 'green-street-realty', 'https://greenstrealty.com', '217-356-8750', 'info@greenstrealty.com'),
('c3a2f082-d72a-2b28-1008-18b9cad0e1f4', 'Smile Student Living', 'smile-student-living', 'https://smilestudentliving.com', '217-239-2690', 'info@smilestudentliving.com'),
('c4a2f082-d72a-2b28-1008-18b9cad0e1f5', 'U Group', 'u-group', 'https://ugroupcu.com', '217-367-1500', 'leasing@ugroupcu.com'),
('c5a2f082-d72a-2b28-1008-18b9cad0e1f6', 'Bankier Apartments', 'bankier-apartments', 'https://bankierapartments.com', '217-328-3770', 'info@bankierapartments.com'),
('c6a2f082-d72a-2b28-1008-18b9cad0e1f7', 'Roland Realty', 'roland-realty', 'https://rolandrealty.com', '217-352-5085', 'management@rolandrealty.com');

--- APARTMENTS
insert into public.apartments (id, name, slug, address, city, state, zip, description, latitude, longitude, management_company, official_website, image_url) values
('a1', '112 E Chalmers (Lancaster)', '112-e-chalmers-lancaster', '112 E Chalmers St', 'Champaign', 'IL', '61820', 'Modern apartments located near the heart of Campustown.', 40.1065, -88.2325, 'Lancaster Apartments', 'https://www.lancasterchampaign.com/', 'https://images1.apartments.com/i2/39-Qd4X0P05_0d7UvId-6B9U9p5JvYmD-j_u4r9x3Ww/111/lancaster-apartments-champaign-il-primary-photo.jpg'),
('a10', 'The Hub', 'the-hub-champaign', '601 S First St', 'Champaign', 'IL', '61820', 'Luxury residential tower with a rooftop pool.', 40.1102, -88.2395, 'Core Spaces', 'https://huboncampus.com/champaign/', 'https://huboncampus.com/champaign/wp-content/uploads/sites/11/2020/07/HUB_Champaign_Exterior_Night_01.jpg'),
('a14', 'Smile 615', 'smile-615-wright', '615 S Wright St', 'Champaign', 'IL', '61820', 'New landmark building directly across from the Alma Mater.', 40.1090, -88.2290, 'Smile Student Living', 'https://www.smilestudentliving.com/property/615-s-wright', 'https://lirp.cdn-website.com/0af4bf1b/dms3rep/multi/opt/615swright-1920w.jpg'),
('a15', '309 Green', '309-green-champaign', '309 E Green St', 'Champaign', 'IL', '61820', 'The iconic high-rise on Green Street.', 40.1102, -88.2346, 'American Campus Communities', 'https://www.americancampus.com/student-apartments/il/champaign/309-green', 'https://www.americancampus.com/getmedia/f5a620e3-ce1a-49b4-845b-e6d3619a4c5b/416_-01_Gallery_730x547.jpg'),
('a18', 'Seven07', 'seven07-champaign', '707 S Fourth St', 'Champaign', 'IL', '61820', 'Ultra-luxury student living with world-class amenities.', 40.1045, -88.2345, 'Seven07', 'https://seven-07.com/', 'https://seven-07.com/wp-content/uploads/2021/04/Exterior_01.jpg'),
('a19', 'Octave', 'octave-champaign', '210 S Fourth St', 'Champaign', 'IL', '61820', 'Sophisticated student living near Midtown.', 40.1125, -88.2345, 'Octave', 'https://octavechampaign.com/', 'https://octavechampaign.com/wp-content/uploads/2021/04/Exterior_01.jpg'),
('a25', 'ICON', 'icon-champaign', '309 E Springfield Ave', 'Champaign', 'IL', '61820', 'Striking architecture with modern interiors.', 40.1125, -88.2345, 'American Campus Communities', 'https://www.americancampus.com/student-apartments/il/champaign/icon', 'https://www.americancampus.com/getmedia/8706fa82-628d-4f10-9b63-8a3fc0952a22/866-Main-Hero-1440x542.jpg'),
('a40', 'Skyline Tower', 'skyline-tower-champaign', '519 E Green St', 'Champaign', 'IL', '61820', 'Modern high-rise with stunning views of the North Quad.', 40.1102, -88.2300, 'Bankier Apartments', 'https://www.519bankierapartments.com/', 'https://images1.apartments.com/i2/T-voffcMHipGTkbflO1J2J1TK1IOtjwRyxUJBfpDARM/111/519-e-green-st-by-bankier-apartments-champaign-il-primary-photo.jpg?p=1'),
('a55', 'West Quad', 'west-quad-champaign', '301 S First St', 'Champaign', 'IL', '61820', 'Luxury resort-style living with pool and gym.', 40.1120, -88.2395, 'West Quad', 'https://www.westquad.com/', 'https://images1.apartments.com/i2/4X_2-XF_0-1_2_3_4_5_6_7_8_9_0_1_2_3_4_5_6_7_8_9_0_1_2_3_4_5_6_7_8_9_0_1_2_3_4_5_6_7_8_9_0_1_2_3_4_5_6_7_8_9_0_1_2_3_4_5_6_7_8_9_0_1_2_3_4_5_6_7_8_9_0_1_2_3_4_5_6_7_8_9_0_1_2_3_4_5_6_7_8_9_0/111/west-quad-apartments-champaign-il-primary-photo.jpg'),
('a60', 'HERE Champaign', 'here-champaign', '308 E Green St', 'Champaign', 'IL', '61820', 'Premium high-rise living on Green Street.', 40.1102, -88.2340, 'HERE Champaign', 'https://herechampaign.com/', 'https://herechampaign.com/wp-content/uploads/2021/04/Exterior_01.jpg');

-- MOCK USERS (To allow viewing reviews without logging in)
insert into auth.users (id, email) values
('u1a2f082-d72a-2b28-1008-18b9cad0e1f2', 'user1@illinois.edu');

-- PROFILES (Matches mock users)
insert into public.profiles (id, email, first_name, last_name, is_verified) values
('u1a2f082-d72a-2b28-1008-18b9cad0e1f2', 'user1@illinois.edu', 'Alex', 'Smith', true);

-- REVIEWS (EMPTY - No fake reviews)

-- COMMENTS (EMPTY)

-- HELPFUL VOTES (EMPTY)


