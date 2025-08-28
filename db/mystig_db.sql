-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Hôte : mysql:3306
-- Généré le : dim. 17 août 2025 à 17:40
-- Version du serveur : 8.0.42
-- Version de PHP : 8.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `mystig_db`
--

-- --------------------------------------------------------

--
-- Structure de la table `artisan_images`
--

CREATE TABLE `artisan_images` (
  `is_primary` bit(1) NOT NULL,
  `artisan_id` binary(16) DEFAULT NULL,
  `id` binary(16) NOT NULL,
  `caption` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `artisan_materials`
--

CREATE TABLE `artisan_materials` (
  `artisan_id` binary(16) NOT NULL,
  `material` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `artisan_products`
--

CREATE TABLE `artisan_products` (
  `in_stock` bit(1) NOT NULL,
  `price` decimal(19,2) NOT NULL,
  `quantity` int DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `id` binary(16) NOT NULL,
  `owner_id` binary(16) DEFAULT NULL,
  `category` enum('CERAMICS','JEWELRY','LEATHER','METALWORK','TEXTILES','WOODWORK') DEFAULT NULL,
  `craftsman` varchar(255) DEFAULT NULL,
  `currency` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `dimensions` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `origin` varchar(255) DEFAULT NULL,
  `status` enum('AVAILABLE','RESERVED','SOLD') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `bookings`
--

CREATE TABLE `bookings` (
  `item_end_date` date DEFAULT NULL,
  `item_start_date` date DEFAULT NULL,
  `participants` int DEFAULT NULL,
  `total_amount` decimal(19,2) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `id` binary(16) NOT NULL,
  `item_id` binary(16) NOT NULL,
  `seller_id` binary(16) DEFAULT NULL,
  `booking_number` varchar(255) NOT NULL,
  `booking_type` enum('EVENT','HOTEL','PACKAGE') NOT NULL,
  `currency` varchar(255) DEFAULT NULL,
  `customer_city` varchar(255) DEFAULT NULL,
  `customer_country` varchar(255) DEFAULT NULL,
  `customer_email` varchar(255) DEFAULT NULL,
  `customer_name` varchar(255) DEFAULT NULL,
  `customer_phone` varchar(255) DEFAULT NULL,
  `customer_street` varchar(255) DEFAULT NULL,
  `customer_zip_code` varchar(255) DEFAULT NULL,
  `item_description` varchar(255) DEFAULT NULL,
  `item_name` varchar(255) DEFAULT NULL,
  `payment_method` varchar(255) DEFAULT NULL,
  `payment_status` enum('PAID','PENDING','REFUNDED') DEFAULT NULL,
  `special_requests` text,
  `status` enum('CANCELLED','COMPLETED','CONFIRMED','PENDING') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `events`
--

CREATE TABLE `events` (
  `age_limit` int DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `end_time` time(6) DEFAULT NULL,
  `featured` bit(1) NOT NULL,
  `lat` double DEFAULT NULL,
  `lng` double DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `start_time` time(6) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `id` binary(16) NOT NULL,
  `organizer_id` binary(16) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `category` enum('BASKETBALL','CEREMONY','COMPETITION','CONCERT','EXHIBITION','FOOTBALL','WORKSHOP') DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `description` text NOT NULL,
  `dresscode` varchar(255) DEFAULT NULL,
  `facebook` varchar(255) DEFAULT NULL,
  `instagram` varchar(255) DEFAULT NULL,
  `status` enum('CANCELLED','COMPLETED','DRAFT','PUBLISHED') DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `twitter` varchar(255) DEFAULT NULL,
  `type` enum('ART','CONFERENCE','CULTURE','FESTIVAL','FOOD','MUSIC','SPORT') DEFAULT NULL,
  `venue` varchar(255) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `events`
--

INSERT INTO `events` (`age_limit`, `end_date`, `end_time`, `featured`, `lat`, `lng`, `start_date`, `start_time`, `created_at`, `updated_at`, `id`, `organizer_id`, `address`, `category`, `city`, `description`, `dresscode`, `facebook`, `instagram`, `status`, `title`, `twitter`, `type`, `venue`, `website`) VALUES
(NULL, '2025-08-21', '12:00:00.000000', b'1', NULL, NULL, '2025-08-20', '10:00:00.000000', '2025-08-17 11:40:23.945881', '2025-08-17 11:40:23.945921', 0xa5196531a1284f80b75d84365506552f, 0xffe9d8f9312a4f53b07856a91dfb429c, 'Online', 'CONCERT', 'Remote', 'This is a test event', NULL, NULL, NULL, NULL, 'Test Event', NULL, 'MUSIC', 'Zoom', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `event_attendees`
--

CREATE TABLE `event_attendees` (
  `created_at` datetime(6) DEFAULT NULL,
  `event_id` binary(16) NOT NULL,
  `id` binary(16) NOT NULL,
  `ticket_id` binary(16) DEFAULT NULL,
  `user_id` binary(16) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `event_images`
--

CREATE TABLE `event_images` (
  `is_primary` bit(1) NOT NULL,
  `event_id` binary(16) DEFAULT NULL,
  `id` binary(16) NOT NULL,
  `caption` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `event_special_requirements`
--

CREATE TABLE `event_special_requirements` (
  `event_id` binary(16) NOT NULL,
  `special_requirements` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `event_tags`
--

CREATE TABLE `event_tags` (
  `event_id` binary(16) NOT NULL,
  `tag` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `event_tickets`
--

CREATE TABLE `event_tickets` (
  `price` decimal(38,2) DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `sold` int DEFAULT NULL,
  `event_id` binary(16) DEFAULT NULL,
  `id` binary(16) NOT NULL,
  `currency` varchar(255) DEFAULT NULL,
  `type_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `food_experiences`
--

CREATE TABLE `food_experiences` (
  `max_participants` int DEFAULT NULL,
  `price` decimal(19,2) NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `id` binary(16) NOT NULL,
  `owner_id` binary(16) DEFAULT NULL,
  `currency` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `difficulty` enum('ADVANCED','BEGINNER','INTERMEDIATE') DEFAULT NULL,
  `duration` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `status` enum('AVAILABLE','UNAVAILABLE') DEFAULT NULL,
  `type` enum('COOKING_CLASS','FINE_DINING','FOOD_TOUR','MARKET_VISIT') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `food_images`
--

CREATE TABLE `food_images` (
  `is_primary` bit(1) NOT NULL,
  `food_id` binary(16) DEFAULT NULL,
  `id` binary(16) NOT NULL,
  `caption` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `food_includes`
--

CREATE TABLE `food_includes` (
  `food_id` binary(16) NOT NULL,
  `include_item` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `hotels`
--

CREATE TABLE `hotels` (
  `average` double DEFAULT NULL,
  `base_price` decimal(38,2) DEFAULT NULL,
  `featured` bit(1) NOT NULL,
  `lat` double DEFAULT NULL,
  `lng` double DEFAULT NULL,
  `rooms_available` int DEFAULT NULL,
  `rooms_total` int DEFAULT NULL,
  `bookings_this_month` bigint DEFAULT NULL,
  `bookings_total` bigint DEFAULT NULL,
  `count` bigint DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `id` binary(16) NOT NULL,
  `owner_id` binary(16) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `currency` varchar(255) DEFAULT NULL,
  `description` text NOT NULL,
  `name` varchar(255) NOT NULL,
  `region` varchar(255) DEFAULT NULL,
  `status` enum('ACTIVE','INACTIVE','MAINTENANCE') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `hotel_amenities`
--

CREATE TABLE `hotel_amenities` (
  `hotel_id` binary(16) NOT NULL,
  `amenity` enum('BAR','CONCIERGE','GYM','LAUNDRY','PARKING','POOL','RESTAURANT','ROOM_SERVICE','SPA','WIFI') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `hotel_images`
--

CREATE TABLE `hotel_images` (
  `is_primary` bit(1) NOT NULL,
  `hotel_id` binary(16) DEFAULT NULL,
  `id` binary(16) NOT NULL,
  `caption` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `hotel_reviews`
--

CREATE TABLE `hotel_reviews` (
  `rating` int NOT NULL,
  `date` datetime(6) DEFAULT NULL,
  `hotel_id` binary(16) NOT NULL,
  `id` binary(16) NOT NULL,
  `user_id` binary(16) NOT NULL,
  `comment` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `hotel_room_types`
--

CREATE TABLE `hotel_room_types` (
  `capacity` int DEFAULT NULL,
  `price` decimal(38,2) DEFAULT NULL,
  `hotel_id` binary(16) DEFAULT NULL,
  `id` binary(16) NOT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `hotel_room_type_amenities`
--

CREATE TABLE `hotel_room_type_amenities` (
  `room_type_id` binary(16) NOT NULL,
  `amenity` enum('BAR','CONCIERGE','GYM','LAUNDRY','PARKING','POOL','RESTAURANT','ROOM_SERVICE','SPA','WIFI') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `hotel_seasonal_prices`
--

CREATE TABLE `hotel_seasonal_prices` (
  `end_date` date DEFAULT NULL,
  `multiplier` double DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `hotel_id` binary(16) NOT NULL,
  `season` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `inclusions_activities`
--

CREATE TABLE `inclusions_activities` (
  `package_id` binary(16) NOT NULL,
  `activity` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `inclusions_other`
--

CREATE TABLE `inclusions_other` (
  `package_id` binary(16) NOT NULL,
  `other_item` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `packages`
--

CREATE TABLE `packages` (
  `average` double DEFAULT NULL,
  `base_price` decimal(38,2) DEFAULT NULL,
  `days` int DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `featured` bit(1) NOT NULL,
  `max_participants` int DEFAULT NULL,
  `min_participants` int DEFAULT NULL,
  `nights` int DEFAULT NULL,
  `price_per_person` decimal(38,2) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `bookings_this_month` bigint DEFAULT NULL,
  `bookings_total` bigint DEFAULT NULL,
  `count` bigint DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `id` binary(16) NOT NULL,
  `owner_id` binary(16) DEFAULT NULL,
  `accommodation` varchar(255) DEFAULT NULL,
  `currency` varchar(255) DEFAULT NULL,
  `description` text NOT NULL,
  `guide` varchar(255) DEFAULT NULL,
  `meals` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `status` enum('ACTIVE','ARCHIVED','DRAFT','INACTIVE') DEFAULT NULL,
  `transport` varchar(255) DEFAULT NULL,
  `type` enum('ADVENTURE','BUSINESS','CULTURAL','FAMILY','GROUP','LUXURY','ROMANTIC') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `package_destinations`
--

CREATE TABLE `package_destinations` (
  `duration_days` int DEFAULT NULL,
  `package_id` binary(16) NOT NULL,
  `activities_json` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `region` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `package_group_discounts`
--

CREATE TABLE `package_group_discounts` (
  `travel_package_id` binary(16) NOT NULL,
  `group_discounts` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `package_images`
--

CREATE TABLE `package_images` (
  `is_primary` bit(1) NOT NULL,
  `id` binary(16) NOT NULL,
  `travel_package_id` binary(16) DEFAULT NULL,
  `caption` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `package_itinerary`
--

CREATE TABLE `package_itinerary` (
  `day` int DEFAULT NULL,
  `package_id` binary(16) NOT NULL,
  `accommodation` varchar(255) DEFAULT NULL,
  `activities_json` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `meals_json` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `package_reviews`
--

CREATE TABLE `package_reviews` (
  `rating` int NOT NULL,
  `date` datetime(6) DEFAULT NULL,
  `id` binary(16) NOT NULL,
  `travel_package_id` binary(16) NOT NULL,
  `user_id` binary(16) NOT NULL,
  `comment` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `package_seasonal_prices`
--

CREATE TABLE `package_seasonal_prices` (
  `end_date` date DEFAULT NULL,
  `multiplier` double DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `travel_package_id` binary(16) NOT NULL,
  `season` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `used` bit(1) NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `expires_at` datetime(6) NOT NULL,
  `id` binary(16) NOT NULL,
  `user_id` binary(16) NOT NULL,
  `token` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `refresh_tokens`
--

CREATE TABLE `refresh_tokens` (
  `revoked` bit(1) NOT NULL,
  `used` bit(1) NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `expires_at` datetime(6) NOT NULL,
  `id` binary(16) NOT NULL,
  `user_id` binary(16) NOT NULL,
  `token` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `refresh_tokens`
--

INSERT INTO `refresh_tokens` (`revoked`, `used`, `created_at`, `expires_at`, `id`, `user_id`, `token`) VALUES
(b'0', b'0', '2025-08-17 11:39:10.568342', '2025-09-16 11:39:10.568218', 0x5917b3a4289341bf8648c7192a649b3f, 0xffe9d8f9312a4f53b07856a91dfb429c, '8rwHiVs4FAfPmZk3Ntq3lUvMFNQsF5NH8vpvSBW2Dz5PupAPrO32L2lJLXDMrGQI5HERgAmT4ljDa2YTLzRoc5S1BvxNgtbINvfJXjvQvOkezNhhu2bDRTIfmyuIFewb'),
(b'0', b'0', '2025-08-17 12:41:40.066651', '2025-09-16 12:41:40.066642', 0xa51d5494906d4597bbacda9e4f50e83b, 0xffe9d8f9312a4f53b07856a91dfb429c, 'qmLAZW648sDlo1hwuehGCdaO2ZPHfdRFKTQPMUnGynW3qlIssAhkYeaM1yYjpQ8LAjZ2QCPy4GBpIxK2dq7xHejtCegVaN682JSY8KQhRDr8ZiBN3fiXZXRS11AGP6PG');

-- --------------------------------------------------------

--
-- Structure de la table `transports`
--

CREATE TABLE `transports` (
  `capacity` int DEFAULT NULL,
  `price` decimal(19,2) NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `id` binary(16) NOT NULL,
  `owner_id` binary(16) DEFAULT NULL,
  `currency` varchar(255) NOT NULL,
  `description` text,
  `name` varchar(255) NOT NULL,
  `status` enum('ACTIVE','INACTIVE') DEFAULT NULL,
  `type` enum('AIRPORT_TRANSFER','BUS','PRIVATE_CAR','TAXI') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `transport_cities`
--

CREATE TABLE `transport_cities` (
  `transport_id` binary(16) NOT NULL,
  `cities` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `transport_features`
--

CREATE TABLE `transport_features` (
  `transport_id` binary(16) NOT NULL,
  `feature` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `transport_routes`
--

CREATE TABLE `transport_routes` (
  `transport_id` binary(16) NOT NULL,
  `routes` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `travel_package_exclusions`
--

CREATE TABLE `travel_package_exclusions` (
  `travel_package_id` binary(16) NOT NULL,
  `exclusions` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `travel_package_tags`
--

CREATE TABLE `travel_package_tags` (
  `travel_package_id` binary(16) NOT NULL,
  `tags` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `email_verified` bit(1) NOT NULL,
  `is_active` bit(1) NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `id` binary(16) NOT NULL,
  `email` varchar(180) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `company_name` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `license` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `role` enum('ROLE_ADMIN','ROLE_SELLER') NOT NULL,
  `street` varchar(255) DEFAULT NULL,
  `zip_code` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`email_verified`, `is_active`, `created_at`, `last_login`, `updated_at`, `id`, `email`, `avatar`, `city`, `company_name`, `country`, `description`, `license`, `name`, `password`, `phone`, `role`, `street`, `zip_code`) VALUES
(b'1', b'1', '2025-08-17 11:38:32.701217', '2025-08-17 12:41:40.064878', '2025-08-17 12:41:40.072909', 0xffe9d8f9312a4f53b07856a91dfb429c, 'marwanelaksiouer@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, 'Test User', '$2a$10$SOtd58N/ua7lWdwE/3NFAO9xN2a/8gCpoLMqtsimnDiS0PpMvwgB.', NULL, 'ROLE_SELLER', NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `user_specialties`
--

CREATE TABLE `user_specialties` (
  `user_id` binary(16) NOT NULL,
  `specialties` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `verification_tokens`
--

CREATE TABLE `verification_tokens` (
  `consumed` bit(1) NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `expires_at` datetime(6) NOT NULL,
  `id` binary(16) NOT NULL,
  `user_id` binary(16) NOT NULL,
  `token` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `artisan_images`
--
ALTER TABLE `artisan_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKppvrbhjidtihy4euuerqhuiqe` (`artisan_id`);

--
-- Index pour la table `artisan_materials`
--
ALTER TABLE `artisan_materials`
  ADD KEY `FK9q84ft9nk1j3uw4wr2a1rcuw8` (`artisan_id`);

--
-- Index pour la table `artisan_products`
--
ALTER TABLE `artisan_products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDXjntw93sfjkmj45666e3m6jb5s` (`name`),
  ADD KEY `IDXi8ms55kjsj1vcwy31cite3n83` (`category`),
  ADD KEY `IDX9j4tyy4ll786kiamg0cdfu366` (`owner_id`),
  ADD KEY `IDX3nqlism8iqwyp3c1harnin1d5` (`status`);

--
-- Index pour la table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK_e2b8ksk9hptq6l8msdvoo6anv` (`booking_number`),
  ADD KEY `IDXe10ahq91shcksjr3sdr2ok5de` (`booking_type`),
  ADD KEY `IDXgvl8ukb48884ce2c0b8gqhtvd` (`item_id`),
  ADD KEY `IDXphrr66uyd2jikuyab1vjc7b1x` (`status`),
  ADD KEY `IDXhqho8ll8ee3a2uc6y6ghu7pey` (`payment_status`),
  ADD KEY `FK1p8sb9hn74gww3baj43p6ucgh` (`seller_id`);

--
-- Index pour la table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDXs28f48qss2cnh9fowua47xjss` (`title`),
  ADD KEY `IDXkbltl9oyaeprntejwjy8updcn` (`status`),
  ADD KEY `IDX6i1025bhdfysqbg8js52f9yvq` (`organizer_id`),
  ADD KEY `IDXemqfm04otett0fu5pavnpltdy` (`featured`);

--
-- Index pour la table `event_attendees`
--
ALTER TABLE `event_attendees`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDXq8nkugnij12nnr76pb38979m5` (`event_id`),
  ADD KEY `IDXhw9b4jv74iw02ipf6o2rvhyhp` (`ticket_id`),
  ADD KEY `FK3mumymyj0ryrrywpf5ivgnf1f` (`user_id`);

--
-- Index pour la table `event_images`
--
ALTER TABLE `event_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK90aphyy4imr1x6rvklnvtmat6` (`event_id`);

--
-- Index pour la table `event_special_requirements`
--
ALTER TABLE `event_special_requirements`
  ADD KEY `FKgwr781cby1vnb50be0rxkoytf` (`event_id`);

--
-- Index pour la table `event_tags`
--
ALTER TABLE `event_tags`
  ADD KEY `FKiwoyitw224ykom58m5xnoa9y6` (`event_id`);

--
-- Index pour la table `event_tickets`
--
ALTER TABLE `event_tickets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKkub6ty3cjkpmxp6wb3ipuy3te` (`event_id`);

--
-- Index pour la table `food_experiences`
--
ALTER TABLE `food_experiences`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDXspkyxv4wectmn4dbkx723im5n` (`name`),
  ADD KEY `IDXox82i3imvkju3m3560foqrp9o` (`type`),
  ADD KEY `IDXhgv6i8axq63jdbkn4xef6atmm` (`owner_id`),
  ADD KEY `IDXbnxb9ax1jf28dmxpsi9j3s6ij` (`status`);

--
-- Index pour la table `food_images`
--
ALTER TABLE `food_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKmwi1exryig49w5lsl5d46bkes` (`food_id`);

--
-- Index pour la table `food_includes`
--
ALTER TABLE `food_includes`
  ADD KEY `FK6duudra7n8w13oaool902dmkr` (`food_id`);

--
-- Index pour la table `hotels`
--
ALTER TABLE `hotels`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDXm7xlqsndengqp2kpd5nux2s3i` (`name`),
  ADD KEY `IDXmurhie0ttq5811mvxgp0nrtwm` (`status`),
  ADD KEY `IDXmse4wke061k31hj0np6eqxaaq` (`featured`),
  ADD KEY `IDXc37pmfkv57qjnc5qcnimdjp4b` (`owner_id`);

--
-- Index pour la table `hotel_amenities`
--
ALTER TABLE `hotel_amenities`
  ADD KEY `FK5v984hm7iyuvyccsgboplo7ii` (`hotel_id`);

--
-- Index pour la table `hotel_images`
--
ALTER TABLE `hotel_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKrj3n45f8oqy1yr996g14j757i` (`hotel_id`);

--
-- Index pour la table `hotel_reviews`
--
ALTER TABLE `hotel_reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKupsydsvh0dj9jmcqu4gbnm6d` (`hotel_id`),
  ADD KEY `FK8l5lt0ltbxx94e6g6j57b7vxa` (`user_id`);

--
-- Index pour la table `hotel_room_types`
--
ALTER TABLE `hotel_room_types`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKr1op5ia2dcxem6g9oj4ahm2k5` (`hotel_id`);

--
-- Index pour la table `hotel_room_type_amenities`
--
ALTER TABLE `hotel_room_type_amenities`
  ADD KEY `FKkhk6o1vww7yqhlphnm85ebs3h` (`room_type_id`);

--
-- Index pour la table `hotel_seasonal_prices`
--
ALTER TABLE `hotel_seasonal_prices`
  ADD KEY `FK5idw9kh1t8c1sr4mmwnm6a2r6` (`hotel_id`);

--
-- Index pour la table `inclusions_activities`
--
ALTER TABLE `inclusions_activities`
  ADD KEY `FK91aus58f5qjh2gk9y25kv47r0` (`package_id`);

--
-- Index pour la table `inclusions_other`
--
ALTER TABLE `inclusions_other`
  ADD KEY `FKjnmoc4xipkx9cauw6tqjfod9r` (`package_id`);

--
-- Index pour la table `packages`
--
ALTER TABLE `packages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDXeqxgfbgi0k6ir1yjyadhnghdr` (`name`),
  ADD KEY `IDXo34g1bj8m6s140d2yxndoepsc` (`type`),
  ADD KEY `IDXnd39730wdliweyydutjvn1osr` (`status`),
  ADD KEY `IDX3d9f4n4jgq27ock6r9vkqbgqx` (`owner_id`);

--
-- Index pour la table `package_destinations`
--
ALTER TABLE `package_destinations`
  ADD KEY `FKeahfisr1vwf747q813nl19sm3` (`package_id`);

--
-- Index pour la table `package_group_discounts`
--
ALTER TABLE `package_group_discounts`
  ADD KEY `FKpslbs9fq6xaif0wsjhh6i217o` (`travel_package_id`);

--
-- Index pour la table `package_images`
--
ALTER TABLE `package_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKqtyn2nalqmti6pwkyjt8tylox` (`travel_package_id`);

--
-- Index pour la table `package_itinerary`
--
ALTER TABLE `package_itinerary`
  ADD KEY `FK7rba19m72ytw8d811t0x1oi33` (`package_id`);

--
-- Index pour la table `package_reviews`
--
ALTER TABLE `package_reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK3uyxf050g8jyspof8biudty4` (`travel_package_id`),
  ADD KEY `FK7xj84u3kgp1fyl9bdp8gef20e` (`user_id`);

--
-- Index pour la table `package_seasonal_prices`
--
ALTER TABLE `package_seasonal_prices`
  ADD KEY `FKkpty1l61t71hes4bi6rtc552r` (`travel_package_id`);

--
-- Index pour la table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK_71lqwbwtklmljk3qlsugr1mig` (`token`),
  ADD KEY `FKk3ndxg5xp6v7wd4gjyusp15gq` (`user_id`);

--
-- Index pour la table `refresh_tokens`
--
ALTER TABLE `refresh_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK_ghpmfn23vmxfu3spu3lfg4r2d` (`token`),
  ADD KEY `IDX7tdcd6ab5wsgoudnvj7xf1b7l` (`user_id`);

--
-- Index pour la table `transports`
--
ALTER TABLE `transports`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDXrtqmm3v7fpqdtiavr2l59opox` (`name`),
  ADD KEY `IDX6cc075jr0cm5k6yytj37w5jil` (`type`),
  ADD KEY `IDXck9uenksnap2ya6g0yxj1a3ou` (`owner_id`),
  ADD KEY `IDXbihrkj4bm3x4c505xo4hdnllj` (`status`);

--
-- Index pour la table `transport_cities`
--
ALTER TABLE `transport_cities`
  ADD KEY `FKns9ae5r8ij41uru4jhg6yidl1` (`transport_id`);

--
-- Index pour la table `transport_features`
--
ALTER TABLE `transport_features`
  ADD KEY `FK6wjt0v2xc1qo4tm04g54n921t` (`transport_id`);

--
-- Index pour la table `transport_routes`
--
ALTER TABLE `transport_routes`
  ADD KEY `FKra90w2bpcbg0sq6qxjgby5nrb` (`transport_id`);

--
-- Index pour la table `travel_package_exclusions`
--
ALTER TABLE `travel_package_exclusions`
  ADD KEY `FKtow74shbvtt71pgdqvt3nl5lq` (`travel_package_id`);

--
-- Index pour la table `travel_package_tags`
--
ALTER TABLE `travel_package_tags`
  ADD KEY `FKsf2nnduhpvtw2bkkhdb199wbi` (`travel_package_id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK_6dotkott2kjsp8vw4d0m25fb7` (`email`);

--
-- Index pour la table `user_specialties`
--
ALTER TABLE `user_specialties`
  ADD KEY `FKakp4ka4fvtng810ydiptw4ggy` (`user_id`);

--
-- Index pour la table `verification_tokens`
--
ALTER TABLE `verification_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK_dqp95ggn6gvm865km5muba2o5` (`user_id`),
  ADD UNIQUE KEY `UK_6q9nsb665s9f8qajm3j07kd1e` (`token`);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `artisan_images`
--
ALTER TABLE `artisan_images`
  ADD CONSTRAINT `FKppvrbhjidtihy4euuerqhuiqe` FOREIGN KEY (`artisan_id`) REFERENCES `artisan_products` (`id`);

--
-- Contraintes pour la table `artisan_materials`
--
ALTER TABLE `artisan_materials`
  ADD CONSTRAINT `FK9q84ft9nk1j3uw4wr2a1rcuw8` FOREIGN KEY (`artisan_id`) REFERENCES `artisan_products` (`id`);

--
-- Contraintes pour la table `artisan_products`
--
ALTER TABLE `artisan_products`
  ADD CONSTRAINT `FKm9cbf5tj5s4fr0tish650342h` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`);

--
-- Contraintes pour la table `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `FK1p8sb9hn74gww3baj43p6ucgh` FOREIGN KEY (`seller_id`) REFERENCES `users` (`id`);

--
-- Contraintes pour la table `events`
--
ALTER TABLE `events`
  ADD CONSTRAINT `FKdocju8m76a3f8o6ljh2jrn2ra` FOREIGN KEY (`organizer_id`) REFERENCES `users` (`id`);

--
-- Contraintes pour la table `event_attendees`
--
ALTER TABLE `event_attendees`
  ADD CONSTRAINT `FK24qk9jij23dhaeis7rtekhkov` FOREIGN KEY (`ticket_id`) REFERENCES `event_tickets` (`id`),
  ADD CONSTRAINT `FK3mumymyj0ryrrywpf5ivgnf1f` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `FKg0w14vgqmpawqmil4fceac4yl` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`);

--
-- Contraintes pour la table `event_images`
--
ALTER TABLE `event_images`
  ADD CONSTRAINT `FK90aphyy4imr1x6rvklnvtmat6` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`);

--
-- Contraintes pour la table `event_special_requirements`
--
ALTER TABLE `event_special_requirements`
  ADD CONSTRAINT `FKgwr781cby1vnb50be0rxkoytf` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`);

--
-- Contraintes pour la table `event_tags`
--
ALTER TABLE `event_tags`
  ADD CONSTRAINT `FKiwoyitw224ykom58m5xnoa9y6` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`);

--
-- Contraintes pour la table `event_tickets`
--
ALTER TABLE `event_tickets`
  ADD CONSTRAINT `FKkub6ty3cjkpmxp6wb3ipuy3te` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`);

--
-- Contraintes pour la table `food_experiences`
--
ALTER TABLE `food_experiences`
  ADD CONSTRAINT `FK9awx3i76c7bbu6eev5n252mfd` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`);

--
-- Contraintes pour la table `food_images`
--
ALTER TABLE `food_images`
  ADD CONSTRAINT `FKmwi1exryig49w5lsl5d46bkes` FOREIGN KEY (`food_id`) REFERENCES `food_experiences` (`id`);

--
-- Contraintes pour la table `food_includes`
--
ALTER TABLE `food_includes`
  ADD CONSTRAINT `FK6duudra7n8w13oaool902dmkr` FOREIGN KEY (`food_id`) REFERENCES `food_experiences` (`id`);

--
-- Contraintes pour la table `hotels`
--
ALTER TABLE `hotels`
  ADD CONSTRAINT `FKjlj2pyi45k16gjvlin6smjfjy` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`);

--
-- Contraintes pour la table `hotel_amenities`
--
ALTER TABLE `hotel_amenities`
  ADD CONSTRAINT `FK5v984hm7iyuvyccsgboplo7ii` FOREIGN KEY (`hotel_id`) REFERENCES `hotels` (`id`);

--
-- Contraintes pour la table `hotel_images`
--
ALTER TABLE `hotel_images`
  ADD CONSTRAINT `FKrj3n45f8oqy1yr996g14j757i` FOREIGN KEY (`hotel_id`) REFERENCES `hotels` (`id`);

--
-- Contraintes pour la table `hotel_reviews`
--
ALTER TABLE `hotel_reviews`
  ADD CONSTRAINT `FK8l5lt0ltbxx94e6g6j57b7vxa` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `FKupsydsvh0dj9jmcqu4gbnm6d` FOREIGN KEY (`hotel_id`) REFERENCES `hotels` (`id`);

--
-- Contraintes pour la table `hotel_room_types`
--
ALTER TABLE `hotel_room_types`
  ADD CONSTRAINT `FKr1op5ia2dcxem6g9oj4ahm2k5` FOREIGN KEY (`hotel_id`) REFERENCES `hotels` (`id`);

--
-- Contraintes pour la table `hotel_room_type_amenities`
--
ALTER TABLE `hotel_room_type_amenities`
  ADD CONSTRAINT `FKkhk6o1vww7yqhlphnm85ebs3h` FOREIGN KEY (`room_type_id`) REFERENCES `hotel_room_types` (`id`);

--
-- Contraintes pour la table `hotel_seasonal_prices`
--
ALTER TABLE `hotel_seasonal_prices`
  ADD CONSTRAINT `FK5idw9kh1t8c1sr4mmwnm6a2r6` FOREIGN KEY (`hotel_id`) REFERENCES `hotels` (`id`);

--
-- Contraintes pour la table `inclusions_activities`
--
ALTER TABLE `inclusions_activities`
  ADD CONSTRAINT `FK91aus58f5qjh2gk9y25kv47r0` FOREIGN KEY (`package_id`) REFERENCES `packages` (`id`);

--
-- Contraintes pour la table `inclusions_other`
--
ALTER TABLE `inclusions_other`
  ADD CONSTRAINT `FKjnmoc4xipkx9cauw6tqjfod9r` FOREIGN KEY (`package_id`) REFERENCES `packages` (`id`);

--
-- Contraintes pour la table `packages`
--
ALTER TABLE `packages`
  ADD CONSTRAINT `FK4lg5q2gvdbvhh596rqk87gk1l` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`);

--
-- Contraintes pour la table `package_destinations`
--
ALTER TABLE `package_destinations`
  ADD CONSTRAINT `FKeahfisr1vwf747q813nl19sm3` FOREIGN KEY (`package_id`) REFERENCES `packages` (`id`);

--
-- Contraintes pour la table `package_group_discounts`
--
ALTER TABLE `package_group_discounts`
  ADD CONSTRAINT `FKpslbs9fq6xaif0wsjhh6i217o` FOREIGN KEY (`travel_package_id`) REFERENCES `packages` (`id`);

--
-- Contraintes pour la table `package_images`
--
ALTER TABLE `package_images`
  ADD CONSTRAINT `FKqtyn2nalqmti6pwkyjt8tylox` FOREIGN KEY (`travel_package_id`) REFERENCES `packages` (`id`);

--
-- Contraintes pour la table `package_itinerary`
--
ALTER TABLE `package_itinerary`
  ADD CONSTRAINT `FK7rba19m72ytw8d811t0x1oi33` FOREIGN KEY (`package_id`) REFERENCES `packages` (`id`);

--
-- Contraintes pour la table `package_reviews`
--
ALTER TABLE `package_reviews`
  ADD CONSTRAINT `FK3uyxf050g8jyspof8biudty4` FOREIGN KEY (`travel_package_id`) REFERENCES `packages` (`id`),
  ADD CONSTRAINT `FK7xj84u3kgp1fyl9bdp8gef20e` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Contraintes pour la table `package_seasonal_prices`
--
ALTER TABLE `package_seasonal_prices`
  ADD CONSTRAINT `FKkpty1l61t71hes4bi6rtc552r` FOREIGN KEY (`travel_package_id`) REFERENCES `packages` (`id`);

--
-- Contraintes pour la table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD CONSTRAINT `FKk3ndxg5xp6v7wd4gjyusp15gq` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Contraintes pour la table `refresh_tokens`
--
ALTER TABLE `refresh_tokens`
  ADD CONSTRAINT `FK1lih5y2npsf8u5o3vhdb9y0os` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Contraintes pour la table `transports`
--
ALTER TABLE `transports`
  ADD CONSTRAINT `FKm99wwmboewm702ugu3p8najch` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`);

--
-- Contraintes pour la table `transport_cities`
--
ALTER TABLE `transport_cities`
  ADD CONSTRAINT `FKns9ae5r8ij41uru4jhg6yidl1` FOREIGN KEY (`transport_id`) REFERENCES `transports` (`id`);

--
-- Contraintes pour la table `transport_features`
--
ALTER TABLE `transport_features`
  ADD CONSTRAINT `FK6wjt0v2xc1qo4tm04g54n921t` FOREIGN KEY (`transport_id`) REFERENCES `transports` (`id`);

--
-- Contraintes pour la table `transport_routes`
--
ALTER TABLE `transport_routes`
  ADD CONSTRAINT `FKra90w2bpcbg0sq6qxjgby5nrb` FOREIGN KEY (`transport_id`) REFERENCES `transports` (`id`);

--
-- Contraintes pour la table `travel_package_exclusions`
--
ALTER TABLE `travel_package_exclusions`
  ADD CONSTRAINT `FKtow74shbvtt71pgdqvt3nl5lq` FOREIGN KEY (`travel_package_id`) REFERENCES `packages` (`id`);

--
-- Contraintes pour la table `travel_package_tags`
--
ALTER TABLE `travel_package_tags`
  ADD CONSTRAINT `FKsf2nnduhpvtw2bkkhdb199wbi` FOREIGN KEY (`travel_package_id`) REFERENCES `packages` (`id`);

--
-- Contraintes pour la table `user_specialties`
--
ALTER TABLE `user_specialties`
  ADD CONSTRAINT `FKakp4ka4fvtng810ydiptw4ggy` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Contraintes pour la table `verification_tokens`
--
ALTER TABLE `verification_tokens`
  ADD CONSTRAINT `FK54y8mqsnq1rtyf581sfmrbp4f` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
