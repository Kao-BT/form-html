-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.32-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.5.0.6677
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for form_data
CREATE DATABASE IF NOT EXISTS `form_data` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `form_data`;

-- Dumping structure for table form_data.assistance_needs
CREATE TABLE IF NOT EXISTS `assistance_needs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `assistance_needs` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`assistance_needs`)),
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `assistance_needs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users_data` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table form_data.assistance_needs: ~2 rows (approximately)
REPLACE INTO `assistance_needs` (`id`, `user_id`, `assistance_needs`) VALUES
	(26, 41, '[3,5]'),
	(27, 42, '[2,4]');

-- Dumping structure for table form_data.evaluation_info
CREATE TABLE IF NOT EXISTS `evaluation_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `evaluation` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `evaluation_info_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users_data` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table form_data.evaluation_info: ~2 rows (approximately)
REPLACE INTO `evaluation_info` (`id`, `user_id`, `evaluation`, `created_at`) VALUES
	(3, 41, 'sss', '2024-09-13 08:35:45'),
	(4, 42, 'test', '2024-09-13 08:42:56');

-- Dumping structure for table form_data.family_evaluation
CREATE TABLE IF NOT EXISTS `family_evaluation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `evaluation_status` enum('yes','no') NOT NULL,
  `evaluation_score` int(3) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `family_evaluation_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users_data` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table form_data.family_evaluation: ~2 rows (approximately)
REPLACE INTO `family_evaluation` (`id`, `user_id`, `evaluation_status`, `evaluation_score`, `created_at`) VALUES
	(1, 41, 'yes', 100, '2024-09-13 08:36:08'),
	(2, 42, 'no', NULL, '2024-09-13 08:43:03');

-- Dumping structure for table form_data.family_map
CREATE TABLE IF NOT EXISTS `family_map` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `image_path` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `family_map_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users_data` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table form_data.family_map: ~1 rows (approximately)
REPLACE INTO `family_map` (`id`, `user_id`, `image_path`, `created_at`) VALUES
	(1, 44, 'uploads\\1726217782488.png', '2024-09-13 08:56:22');

-- Dumping structure for table form_data.risk_assessment
CREATE TABLE IF NOT EXISTS `risk_assessment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `risks` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`risks`)),
  `details` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`details`)),
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `risk_assessment_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users_data` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table form_data.risk_assessment: ~2 rows (approximately)
REPLACE INTO `risk_assessment` (`id`, `user_id`, `risks`, `details`) VALUES
	(10, 41, '[7,9]', '{"1":"","2":"","3":"","4":"","6":"","7":"","8":"","9":"","10":"","11":"","13":"","14":""}'),
	(11, 42, '[5,12]', '{"1":"","2":"","3":"","4":"","6":"","7":"","8":"","9":"","10":"","11":"","13":"","14":""}');

-- Dumping structure for table form_data.search_info
CREATE TABLE IF NOT EXISTS `search_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `search_criteria` varchar(255) DEFAULT NULL,
  `organization_input` varchar(255) DEFAULT NULL,
  `department_input` varchar(255) DEFAULT NULL,
  `admit_date` date DEFAULT NULL,
  `service_type` varchar(255) DEFAULT NULL,
  `disease_input` varchar(255) DEFAULT NULL,
  `type_input` varchar(255) DEFAULT NULL,
  `specify_input` varchar(255) DEFAULT NULL,
  `symptom_input` varchar(255) DEFAULT NULL,
  `medical_fee` varchar(255) DEFAULT NULL,
  `payment_ability` varchar(255) DEFAULT NULL,
  `assistance` varchar(255) DEFAULT NULL,
  `information_type` varchar(255) DEFAULT NULL,
  `other_name` varchar(255) DEFAULT NULL,
  `relationship` varchar(255) DEFAULT NULL,
  `info_address` varchar(255) DEFAULT NULL,
  `info_phone` varchar(255) DEFAULT NULL,
  `monthly_income` varchar(255) DEFAULT NULL,
  `income_source` varchar(255) DEFAULT NULL,
  `source_input` varchar(255) DEFAULT NULL,
  `debt_status` varchar(255) DEFAULT NULL,
  `debt_amount` decimal(10,2) DEFAULT NULL,
  `debt_source` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user_id` (`user_id`),
  CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `users_data` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table form_data.search_info: ~3 rows (approximately)
REPLACE INTO `search_info` (`id`, `user_id`, `search_criteria`, `organization_input`, `department_input`, `admit_date`, `service_type`, `disease_input`, `type_input`, `specify_input`, `symptom_input`, `medical_fee`, `payment_ability`, `assistance`, `information_type`, `other_name`, `relationship`, `info_address`, `info_phone`, `monthly_income`, `income_source`, `source_input`, `debt_status`, `debt_amount`, `debt_source`) VALUES
	(46, 40, 'patient_himself', '', '', NULL, 'general_service_user', '', '', '', '', '520', '520', '200', NULL, '', '', '21/4 ม.3 จ.จันทบุรี อ.เมือง', '0874536874', '20000', NULL, '', NULL, 0.00, NULL),
	(47, 41, 'patient_himself', '', '', NULL, 'general_service_user', '', '', '', '', '520', '520', '200', 'user', '', '', '21/4 ม.3 จ.จันทบุรี อ.เมือง', '0874536874', '20000', 'work', '', 'ไม่มี', 0.00, NULL),
	(48, 42, 'patient_himself', '', '', NULL, 'general_service_user', '', '', '', '', '520', '520', '200', NULL, '', '', '21/4 ม.3 จ.จันทบุรี อ.เมือง', '0874536874', '20000', NULL, '', NULL, 0.00, NULL);

-- Dumping structure for table form_data.service_termination
CREATE TABLE IF NOT EXISTS `service_termination` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `topic` varchar(255) DEFAULT NULL,
  `free_text` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `service_termination_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users_data` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table form_data.service_termination: ~2 rows (approximately)
REPLACE INTO `service_termination` (`id`, `user_id`, `topic`, `free_text`, `created_at`) VALUES
	(2, 41, 'option1', NULL, '2024-09-13 08:37:18'),
	(3, 42, 'option1', NULL, '2024-09-13 08:42:59');

-- Dumping structure for table form_data.social_issues_data
CREATE TABLE IF NOT EXISTS `social_issues_data` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `social_issues` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`social_issues`)),
  `free_text1` text DEFAULT NULL,
  `free_text2` text DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `social_issues_data_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users_data` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table form_data.social_issues_data: ~2 rows (approximately)
REPLACE INTO `social_issues_data` (`id`, `user_id`, `social_issues`, `free_text1`, `free_text2`) VALUES
	(29, 41, '[8,16]', '', ''),
	(30, 42, '[4,11]', '', '');

-- Dumping structure for table form_data.social_support_info
CREATE TABLE IF NOT EXISTS `social_support_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `social_support` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `social_support_info_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users_data` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table form_data.social_support_info: ~2 rows (approximately)
REPLACE INTO `social_support_info` (`id`, `user_id`, `social_support`, `created_at`) VALUES
	(8, 41, 'sss', '2024-09-13 08:35:42'),
	(9, 42, 'test', '2024-09-13 08:42:53');

-- Dumping structure for table form_data.users_data
CREATE TABLE IF NOT EXISTS `users_data` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` date DEFAULT NULL,
  `hn` varchar(255) DEFAULT NULL,
  `an` varchar(255) DEFAULT NULL,
  `sn` varchar(255) DEFAULT NULL,
  `prefix` varchar(255) DEFAULT NULL,
  `fullname` varchar(255) DEFAULT NULL,
  `idcard` varchar(255) DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `nationality` varchar(255) DEFAULT NULL,
  `ethnicity` varchar(255) DEFAULT NULL,
  `religion` varchar(255) DEFAULT NULL,
  `marital_status` varchar(255) DEFAULT NULL,
  `education` varchar(255) DEFAULT NULL,
  `treatment_rights` varchar(255) DEFAULT NULL,
  `occupation` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `address` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table form_data.users_data: ~5 rows (approximately)
REPLACE INTO `users_data` (`id`, `date`, `hn`, `an`, `sn`, `prefix`, `fullname`, `idcard`, `birthdate`, `age`, `nationality`, `ethnicity`, `religion`, `marital_status`, `education`, `treatment_rights`, `occupation`, `phone`, `address`) VALUES
	(40, '2024-09-13', '32101', '1215', '2541', 'นาย', 'ภานุวัฒน์ บัวทอง', '1229900968707', '2024-09-13', 22, 'ไทย', 'ไทย', 'พุทธ', 'โสด', 'ป.ตรี', 'ไม่มี', 'นักศึกษา', '0957497131', '21/4 ม.3 จ.จันทบุรี อ.เมือง'),
	(41, '2024-09-13', '32101', '1215', '2541', 'นาย', 'ภานุวัฒน์ บัวทอง', '1229900968707', '2024-09-13', 22, 'ไทย', 'ไทย', 'พุทธ', 'โสด', 'ป.ตรี', 'ไม่มี', 'นักศึกษา', '0957497131', '21/4 ม.3 จ.จันทบุรี อ.เมือง'),
	(42, '2024-09-13', '32101', '1215', '2541', 'นาย', 'ภานุวัฒน์ บัวทอง', '1229900968707', '2024-09-13', 22, 'ไทย', 'ไทย', 'พุทธ', 'โสด', 'ป.ตรี', 'ไม่มี', 'นักศึกษา', '0957497131', ''),
	(43, '2024-09-13', '32101', '1215', '2541', 'นาย', 'ภานุวัฒน์ บัวทอง', '1229900968707', '2024-09-13', 22, 'ไทย', 'ไทย', 'พุทธ', 'โสด', 'ป.ตรี', 'ไม่มี', 'นักศึกษา', '0957497131', '21/4 ม.3 จ.จันทบุรี อ.เมือง'),
	(44, '2024-09-13', '32101', '1215', '2541', 'นาย', 'ภานุวัฒน์ บัวทอง', '1229900968707', '2024-09-13', 22, 'ไทย', 'ไทย', 'พุทธ', 'โสด', 'ป.ตรี', 'ไม่มี', 'นักศึกษา', '0957497131', '21/4 ม.3 จ.จันทบุรี อ.เมือง');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
