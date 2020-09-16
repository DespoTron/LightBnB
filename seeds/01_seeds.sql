INSERT INTO users (name, email, password) 
VALUES ('Raddix Amin', 'rad_amin@gmail.com', '$2a$10$FB'),
('Arrow Aadi', 'marksmenArrow@hotmail.com', 'BOAVhpuLvpOREQVmvmezD4ED'),
('Thorn Enzo', 'EnzoThorn@yahoo.com', '.JBIDRh70tGevYzYzQgFId2u.')
('Rhys Brooks', 'King_Brooks@aol.com', '$2y$12$yem')
('Ryland Orion', 'OrionBelt@outlook.com', 'NoyP7b7NVsjT');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
VALUES (1, "Speed lamp", "description", 'https://w7.pngwing.com/pngs/853/941/png-transparent-orange-hotel-illustration-hotel-gratis-vecteur-hotel-angle-text-orange-thumbnail.png', 'https://m.foolcdn.com/media/millionacres/original_images/hotel-bed-sunlight-GI.jpg?crop=4:3,smart', 355, 2, 1, 2, 'Canada', 'Bridgeport', 'Richmond', 'V5X3A2', TRUE),
(1, "Black corner", "description", 'https://www.coasthotels.com/wp-content/uploads/sites/14/2020/01/Coast-Hotels-thumbnail-coast-chilliwack-hotel-by-APA2020-335x225.png', 'https://pixnio.com/free-images/2017/06/23/2017-06-23-07-15-38.jpg', 499, 1, 3, 1, 'Canada', 'Broadway', 'Vancouver', 'V5X1X2', TRUE),
(2, "Habit mix", "description", 'https://www.coasthotels.com/wp-content/uploads/sites/28/2019/02/Coast-Hotels-thumbnail-coast-anabelle-hotel-335x225.jpg', 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F28%2F2020%2F03%2Fgraduate-hotel-nashville-room-GRADUATEHOTEL0220-1.jpg&q=85', 299, 2, 2, 2, 'Canada', 'Nanaimo', 'Coquitlam', 'G2G1B2', FALSE),
(4, "Habitat for Humanity", "description", 'https://i.insider.com/5f174571f0f41957336c0a43?width=1100&format=jpeg&auto=webp' 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F9%2F2020%2F01%2FBread-Hotel-Bed-FT-Blog0120.jpg', 599, 2, 2, 2, 'Canada', 'Bridgeport', 'Burnaby', 'Q2W3E4', FALSE),
(6, "The Great Escape", "description", 'https://www.coasthotels.com/wp-content/uploads/sites/17/2019/02/Coast-Hotels-thumbnail-coast-capri-hotel.jpg', 'https://imagesvc.meredithcorp.io/v3/mm/image?q=85&c=sc&poi=face&w=1600&h=838&url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F28%2F2019%2F06%2Fsonop-lodge-namibia-bedroom-view-SONOP0619.jpg', 499, 1, 3, 2, 'Canada', 'Cloudy Way', 'Hope', 'A5S6D7', TRUE),
(6, "Budget Friendly", "description", 'https://www.telegraph.co.uk/content/dam/Travel/galleries/travel/picturegalleries/The-worlds-ugliest-hotels/ugly-spiritslovaki_2395831a.jpg', 'https://www.oyster.com/wp-content/uploads/sites/35/2019/05/1977-2010-10-ocean-view-hotel-room-ocean-resort-hotel-waikiki-v369491-912.jpg', 99, 0, 1, 1, 'Canada', 'Whalley', 'Surrey', 'Z8X9C1', FALSE);

 INSERT INTO reservations (start_date, end_date, property_id, guest_id)
 VALUES ('2020-08-16', '2020-08-31', 1, 3),
 ('2021-01-05', '2021-01-17', 2, 1),
 ('2021-05-16', '2021-05-31', 1, 2);

 INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
 VALUES (1, 1, 1, 4, "It was okay"),
 (1, 3, 2, 3, "message"),
 (2, 2, 3, 2, "Could be better");

