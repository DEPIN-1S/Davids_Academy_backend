-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 19, 2025 at 08:19 AM
-- Server version: 11.8.3-MariaDB-log
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `u160357475_davidacademy`
--

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `cs_id` int(11) NOT NULL,
  `cs_name` varchar(500) DEFAULT NULL,
  `cs_duration` varchar(100) NOT NULL,
  `cs_sub_title` varchar(500) DEFAULT NULL,
  `cs_description` text DEFAULT NULL,
  `cs_desc_points` text DEFAULT NULL,
  `cs_image` varchar(500) NOT NULL,
  `cs_status` varchar(500) DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`cs_id`, `cs_name`, `cs_duration`, `cs_sub_title`, `cs_description`, `cs_desc_points`, `cs_image`, `cs_status`) VALUES
(12, 'NCLEX-RN Preparation', '', 'Comprehensive NCLEX-RN exam training for registered nurses', 'This course includes practice questions, expert mentors, mock tests, adaptive learning modules, and performance analytics to help you pass the NCLEX-RN.', 'Comprehensive question bank,Expert mentors,Mock tests,Adaptive learning modules,Performance analytics', '/uploads/courses/1754646409682-135655663.jpg', 'active'),
(15, 'Prometric Coaching', '', 'Prometric exams open doors for healthcare careers in Saudi Arabia, Qatar, Oman, Bahrain, and Kuwait.', 'This comprehensive program is designed to help nursing professionals succeed in the NCLEX-RN examination. Our expert-led training focuses on real-world question patterns, advanced study methods, and personalized feedback to build your confidence and skills.', ' In-depth understanding of the NCLEX syllabus,Critical thinking and clinical judgment techniques,Exam strategy and time management,Extensive practice with mock tests and question banks, Personalized mentoring and progress tracking', '/uploads/courses/1755163521720-949606867.png', 'active'),
(19, 'DHA (Dubai Health Authority) Coaching', '', 'Essential for healthcare jobs in Dubai’s hospitals and clinics.', 'Our DHA Exam Coaching program prepares nursing and allied health professionals for success in Dubai’s healthcare system. You’ll gain in-depth knowledge, practical strategies, and mock test experience that mirror the DHA exam environment.', 'DHA exam structure and scoring system,Advanced clinical concepts for Dubai practice, Critical thinking and patient-care prioritization,Exam strategy and stress management, Mock tests with expert feedback', '/uploads/courses/1755686957644-383174898.png', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `DragAndDrop_Headings`
--

CREATE TABLE `DragAndDrop_Headings` (
  `id` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  `headings` varchar(500) NOT NULL,
  `drag_drop_answer` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `DragAndDrop_Headings_Options`
--

CREATE TABLE `DragAndDrop_Headings_Options` (
  `id` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  `headings_id` int(11) NOT NULL,
  `options_value` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `DragAndDrop_Headings_Options`
--

INSERT INTO `DragAndDrop_Headings_Options` (`id`, `question_id`, `headings_id`, `options_value`) VALUES
(1, 14, 1, '123456'),
(2, 14, 1, '122345'),
(3, 33, 2, '123456789'),
(4, 58, 3, 'urine output'),
(5, 58, 3, 'testicular swelling urine out'),
(6, 58, 4, 'request a prescription for an antibiotic'),
(7, 58, 4, 'keep the client nothing by mouth (NPO) status'),
(8, 58, 5, 'testicular swelling '),
(9, 58, 5, 'urine output'),
(10, 63, 6, 'Night blindness'),
(11, 63, 6, 'Pernicious anemia'),
(12, 63, 6, 'Scurvy'),
(13, 63, 6, 'Rickets'),
(14, 63, 7, 'Position client in high Fowler’s position'),
(15, 63, 7, 'Prepare for intubation and mechanical ventilation if oxygenation fails'),
(16, 63, 7, 'Apply continuous cardiac monitoring'),
(17, 63, 7, 'Administer nitroglycerin as prescribed (to reduce pulmonary congestion)'),
(18, 64, 8, 'asthma'),
(19, 64, 8, 'pneumonia'),
(20, 64, 8, 'hemothorax'),
(21, 75, 9, 'option 1'),
(22, 75, 9, 'option 2'),
(23, 75, 9, 'option 3 '),
(24, 75, 9, 'option 4'),
(25, 75, 10, 'Option 1'),
(26, 75, 10, 'Option 2'),
(27, 75, 10, 'Option 3'),
(28, 75, 10, 'Option 4'),
(29, 75, 11, 'Option 1'),
(30, 75, 11, 'Option 2'),
(31, 75, 11, 'Option 3'),
(32, 75, 11, 'Option 4'),
(33, 78, 12, 'option1'),
(34, 78, 12, 'option2'),
(35, 78, 12, 'option3'),
(36, 78, 12, 'option4'),
(37, 88, 13, 'option'),
(38, 88, 13, 'option 2'),
(39, 88, 13, 'option 3'),
(40, 88, 13, 'option 4'),
(41, 88, 14, 'option'),
(42, 88, 14, 'option 2'),
(43, 88, 14, 'option 3'),
(44, 88, 14, 'option 4'),
(45, 88, 15, 'option'),
(46, 88, 15, 'option 2'),
(47, 88, 15, 'option 3'),
(48, 88, 15, 'option 4'),
(49, 89, 16, 'option'),
(50, 89, 16, 'option 2'),
(51, 89, 16, 'option 3'),
(52, 89, 16, 'option 4'),
(53, 89, 17, 'option'),
(54, 89, 17, 'option 2'),
(55, 89, 17, 'option 3'),
(56, 89, 17, 'option 4'),
(57, 89, 18, 'option'),
(58, 89, 18, 'option 2'),
(59, 89, 18, 'option 3'),
(60, 89, 18, 'option 4'),
(61, 90, 19, 'option'),
(62, 90, 19, 'option 2'),
(63, 90, 19, 'option 3'),
(64, 90, 19, 'option 4'),
(65, 90, 20, 'option'),
(66, 90, 20, 'option 2'),
(67, 90, 20, 'option 3'),
(68, 90, 20, 'option 4'),
(69, 90, 21, 'option'),
(70, 90, 21, 'option 2'),
(71, 90, 21, 'option 3'),
(72, 90, 21, 'option 4'),
(73, 96, 22, 'option1'),
(74, 96, 22, 'option2'),
(75, 96, 22, 'option3'),
(76, 96, 22, 'option4'),
(77, 103, 23, 'some disease'),
(78, 103, 23, 'fever'),
(79, 103, 23, 'Option Heading'),
(80, 103, 23, 'symptoms'),
(81, 112, 24, 'some disease'),
(82, 112, 24, 'fever'),
(83, 112, 24, 'Option Heading'),
(84, 112, 24, 'symptoms'),
(85, 113, 25, 'some disease'),
(86, 113, 25, 'fever'),
(87, 113, 25, 'Option Heading'),
(88, 113, 25, 'symptoms'),
(89, 114, 26, 'some disease'),
(90, 114, 26, 'fever'),
(91, 114, 26, 'Option Heading'),
(92, 114, 26, 'symptoms'),
(93, 115, 27, 'option'),
(94, 115, 27, 'option 2'),
(95, 115, 27, 'option 3'),
(96, 115, 27, 'option 4'),
(97, 115, 28, 'option'),
(98, 115, 28, 'option 2'),
(99, 115, 28, 'option 3'),
(100, 115, 28, 'option 4'),
(101, 115, 29, 'option'),
(102, 115, 29, 'option 2'),
(103, 115, 29, 'option 3'),
(104, 115, 29, 'option 4'),
(105, 123, 30, 'option'),
(106, 123, 30, 'option 2'),
(107, 123, 30, 'option 3'),
(108, 123, 30, 'option 4'),
(109, 123, 31, 'option'),
(110, 123, 31, 'option 2'),
(111, 123, 31, 'option 3'),
(112, 123, 31, 'option 4'),
(113, 123, 32, 'option'),
(114, 123, 32, 'option 2'),
(115, 123, 32, 'option 3'),
(116, 123, 32, 'option 4'),
(117, 125, 33, 'ggggg'),
(118, 125, 33, 'kooo'),
(119, 125, 33, 'ss'),
(120, 125, 34, 'sdfgh'),
(121, 125, 34, '3e45rt6yu'),
(122, 125, 35, 'ertfgyh'),
(123, 125, 35, '4e5rt6y7u'),
(124, 125, 36, '12345'),
(125, 125, 36, '12345'),
(126, 125, 37, 'zz'),
(127, 126, 38, '12345u'),
(128, 126, 38, '1235'),
(129, 126, 38, '2345'),
(130, 126, 38, '2345'),
(131, 126, 39, '12345'),
(132, 126, 39, '123456'),
(133, 126, 39, '`123456'),
(134, 126, 40, '123'),
(135, 126, 40, '134'),
(136, 126, 40, '22345'),
(137, 126, 41, '123'),
(138, 126, 41, '1234'),
(139, 126, 41, '1234'),
(140, 126, 42, '123'),
(141, 126, 42, '12345'),
(142, 126, 42, '123');

-- --------------------------------------------------------

--
-- Table structure for table `tb_additionalInfo`
--

CREATE TABLE `tb_additionalInfo` (
  `id` int(11) NOT NULL,
  `questionId` int(11) NOT NULL,
  `info` longtext DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `isDeleted` tinyint(1) DEFAULT 0,
  `createdAt` timestamp NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tb_additionalInfo`
--

INSERT INTO `tb_additionalInfo` (`id`, `questionId`, `info`, `image`, `isDeleted`, `createdAt`, `updatedAt`) VALUES
(1, 2, 'rrrrr', NULL, 0, '2025-08-20 05:38:46', '2025-08-20 05:38:46'),
(2, 5, '234567894', NULL, 0, '2025-08-21 05:04:38', '2025-08-21 05:04:38'),
(3, 6, '123456', NULL, 0, '2025-08-21 12:22:16', '2025-08-21 12:22:16'),
(4, 7, '123456', NULL, 0, '2025-08-21 12:37:16', '2025-08-21 12:37:16'),
(5, 8, '12345678', NULL, 0, '2025-08-21 13:00:47', '2025-08-21 13:00:47'),
(6, 9, '123456789', NULL, 0, '2025-08-21 15:32:43', '2025-08-21 15:32:43'),
(7, 10, '12345678', NULL, 0, '2025-08-25 08:13:44', '2025-08-25 08:13:44'),
(8, 11, 'werty', '/uploads/infoimages/1756110488291-668189158.png', 0, '2025-08-25 08:28:08', '2025-08-25 08:28:08'),
(9, 12, 'erty', '/uploads/infoimages/1756110742005-868476180.png', 0, '2025-08-25 08:32:22', '2025-08-25 08:32:22'),
(10, 13, '1111111111111111111', '/uploads/infoimages/1756110904362-819569921.png', 0, '2025-08-25 08:35:05', '2025-08-25 08:35:05'),
(11, 14, '1234567', NULL, 0, '2025-08-25 08:36:55', '2025-08-25 08:36:55'),
(12, 15, '234567', NULL, 0, '2025-08-25 08:38:05', '2025-08-25 08:38:05'),
(13, 16, '2345678', NULL, 0, '2025-08-25 08:39:05', '2025-08-25 08:39:05'),
(14, 17, '23456789', NULL, 0, '2025-08-25 08:46:25', '2025-08-25 08:46:25'),
(15, 18, 'sssss', NULL, 0, '2025-08-25 08:52:26', '2025-08-25 08:52:26'),
(16, 19, 'vv', NULL, 0, '2025-08-25 08:55:45', '2025-08-25 08:55:45'),
(17, 20, 'rft', NULL, 0, '2025-08-25 09:01:10', '2025-08-25 09:01:10'),
(18, 21, 'eeeeeee', NULL, 0, '2025-08-25 09:09:31', '2025-08-25 09:09:31'),
(19, 22, '1234567890', NULL, 0, '2025-08-25 09:23:57', '2025-08-25 09:23:57'),
(20, 23, '22222222', NULL, 0, '2025-08-25 09:28:55', '2025-08-25 09:28:55'),
(21, 24, '1234', '/uploads/infoimages/1756114357843-663383198.jpg', 0, '2025-08-25 09:32:37', '2025-08-25 09:32:37'),
(22, 25, '12345', NULL, 0, '2025-08-25 09:42:48', '2025-08-25 09:42:48'),
(23, 26, 'wwwwww', NULL, 0, '2025-08-25 10:10:10', '2025-08-25 10:10:10'),
(24, 27, 'wertyuio', '/uploads/infoimages/1756117633164-884245497.png', 0, '2025-08-25 10:27:13', '2025-08-25 10:27:13'),
(25, 28, 'wwwwww', '/uploads/infoimages/1756117780214-749056139.png', 0, '2025-08-25 10:29:40', '2025-08-25 10:29:40'),
(26, 29, '123456', NULL, 0, '2025-08-25 10:39:23', '2025-08-25 10:39:23'),
(27, 30, '1234567', NULL, 0, '2025-08-25 10:55:02', '2025-08-25 10:55:02'),
(28, 31, 'tttt', '/uploads/infoimages/1756131931127-473046182.png', 0, '2025-08-25 14:25:31', '2025-08-25 14:25:31'),
(29, 32, '1111111111', NULL, 0, '2025-08-26 03:25:51', '2025-08-26 03:25:51'),
(30, 33, '1111111111', NULL, 0, '2025-08-26 03:51:27', '2025-08-26 03:51:27'),
(31, 37, 'Myocardial infarction most commonly occurs due to blockage of coronary arteries from atherosclerotic plaques, which restrict blood flow to the heart muscle.', NULL, 0, '2025-08-27 08:48:55', '2025-08-27 08:48:55'),
(32, 38, 'The client needs to receive pain medication approximately 30 to 60 minutes before a burn dressing change. This will help the client tolerate an otherwise painful procedure. None of the remaining options addresses the issue of pain effectively.', NULL, 0, '2025-08-27 10:12:10', '2025-08-27 10:12:10'),
(33, 39, 'Staphylococcus aureus stains Gram-positive due to its thick peptidoglycan cell wall, which retains the crystal violet stain during Gram staining.', NULL, 0, '2025-08-27 10:16:09', '2025-08-27 10:16:09'),
(34, 67, 'Tracheostomy suctioning should be performed using sterile technique with appropriate pressure settings (80-120 mmHg for adults) to prevent tissue trauma', NULL, 0, '2025-09-01 05:31:05', '2025-09-01 05:31:05'),
(35, 70, 'Patients with a history of severe allergies should carry an epinephrine auto-injector at all times.', NULL, 0, '2025-09-01 05:41:32', '2025-09-01 05:41:32'),
(36, 71, 'Patients with a history of severe allergies should carry an epinephrine auto-injector at all times.', NULL, 0, '2025-09-01 05:47:17', '2025-09-01 05:47:17'),
(37, 75, 'Fill in the Blanks Tracheostomy suctioning should be performed using sterile technique with appropriate pressure settings (80-120 mmHg for adults) to prevent tissue trauma.', NULL, 0, '2025-09-01 10:10:12', '2025-09-01 10:10:12'),
(38, 76, '', NULL, 0, '2025-09-01 10:21:35', '2025-09-01 10:21:35'),
(39, 77, 'Multiple Radio Tracheostomy suctioning should be performed using sterile technique with appropriate pressure settings (80-120 mmHg for adults) to prevent tissue trauma.', NULL, 0, '2025-09-01 10:25:21', '2025-09-01 10:25:21'),
(40, 79, 'Vitamin D can be obtained from sunlight exposure, food sources, and supplements.  ', '/uploads/infoimages/1757152373290-651821928.png', 0, '2025-09-06 09:53:03', '2025-09-06 09:53:03'),
(41, 80, 'Vitamin D can be obtained from sunlight exposure, food sources, and supplements.  ', '/uploads/infoimages/1757152748197-811592908.png', 0, '2025-09-06 09:59:07', '2025-09-06 09:59:07'),
(42, 81, 'Vitamin D can be obtained from sunlight exposure, food sources, and supplements.  ', '/uploads/infoimages/1757152755120-157390563.png', 0, '2025-09-06 09:59:15', '2025-09-06 09:59:15'),
(43, 82, 'Vitamin D can be obtained from sunlight exposure, food sources, and supplements.  ', NULL, 0, '2025-09-06 09:59:46', '2025-09-06 09:59:46'),
(44, 83, ' Multiple Radio Tracheostomy suctioning should be performed using sterile technique with appropriate pressure settings (80-120 mmHg for adults) to prevent tissue trauma.', '/uploads/infoimages/1757156962446-491123910.jpeg', 0, '2025-09-06 11:09:22', '2025-09-06 11:09:22'),
(45, 84, 'IV fluids aid in the management of acute renal failure; monitor renal function and urine output closely.', '/uploads/infoimages/1757158616762-872151528.jpeg', 0, '2025-09-06 11:36:57', '2025-09-06 11:36:57'),
(46, 85, 'Vitamin D can be obtained from sunlight exposure, food sources, and supplements.  ', '/uploads/infoimages/1757162117693-504811637.png', 0, '2025-09-06 12:35:17', '2025-09-06 12:35:17'),
(47, 86, 'Vitamin D can be obtained from sunlight exposure, food sources, and supplements.  ', '/uploads/infoimages/1757162225285-591581406.png', 0, '2025-09-06 12:37:04', '2025-09-06 12:37:04'),
(48, 87, 'Tracheostomy suctioning should be performed using sterile technique with appropriate pressure settings (80-120 mmHg for adults) to prevent tissue trauma.', '/uploads/infoimages/1757162403980-291595051.jpeg', 0, '2025-09-06 12:40:03', '2025-09-06 12:40:03'),
(49, 88, ' Multiple Radio Tracheostomy suctioning should be performed using sterile technique with appropriate pressure settings (80-120 mmHg for adults) to prevent tissue trauma.', NULL, 0, '2025-09-06 12:46:03', '2025-09-06 12:46:03'),
(50, 89, ' Multiple Radio Tracheostomy suctioning should be performed using sterile technique with appropriate pressure settings (80-120 mmHg for adults) to prevent tissue trauma.', NULL, 0, '2025-09-06 12:50:58', '2025-09-06 12:50:58'),
(51, 90, ' Multiple Radio Tracheostomy suctioning should be performed using sterile technique with appropriate pressure settings (80-120 mmHg for adults) to prevent tissue trauma.', '/uploads/infoimages/1757163182987-209903206.jpeg', 0, '2025-09-06 12:53:03', '2025-09-06 12:53:03'),
(52, 91, ' Multiple Radio Tracheostomy suctioning should be performed using sterile technique with appropriate pressure settings (80-120 mmHg for adults) to prevent tissue trauma.', '/uploads/infoimages/1757164146248-974152561.jpeg', 0, '2025-09-06 13:09:07', '2025-09-06 13:09:07'),
(53, 92, 'This is a text information', '/uploads/infoimages/1757165070517-777852964.jpeg', 0, '2025-09-06 13:24:31', '2025-09-06 13:24:31'),
(54, 94, 'The recommended daily amount for most adults is 600 to 800international units (IU), helping maintain bone and immune health.', NULL, 0, '2025-09-07 07:06:56', '2025-09-07 07:06:56'),
(55, 95, 'IV fluids aid in the management of acute renal failure; monitor renal functionand urine output closely.', NULL, 0, '2025-09-07 07:41:30', '2025-09-07 07:41:30'),
(56, 96, 'Multiple Radio Tracheostomy suctioning should be performed using steriletechnique with appropriate pressure settings (80-120 mmHg for adults) to preventtissue trauma.', NULL, 0, '2025-09-07 07:46:45', '2025-09-07 07:46:45'),
(57, 97, 'Multiple Radio Tracheostomy suctioning should be performed usingsterile technique with appropriate pressure settings (80-120 mmHg foradults) to prevent tissue trauma.', NULL, 0, '2025-09-07 07:56:30', '2025-09-07 07:56:30'),
(58, 98, 'Tracheostomy suctioning should be performed using sterile technique withappropriate pressure settings (80-120 mmHg for adults) to prevent tissue trauma.', NULL, 0, '2025-09-07 07:59:41', '2025-09-07 07:59:41'),
(59, 99, '', NULL, 0, '2025-09-07 08:03:58', '2025-09-07 08:03:58'),
(60, 100, ' Multiple Radio Tracheostomy suctioning should be performed using sterile technique with appropriate pressure settings (80-120 mmHg for adults) to prevent tissue trauma.', '/uploads/infoimages/1757304712823-421775693.jpeg', 0, '2025-09-08 04:11:53', '2025-09-08 04:11:53'),
(61, 101, ' Multiple Radio Tracheostomy suctioning should be performed using sterile technique with appropriate pressure settings (80-120 mmHg for adults) to prevent tissue trauma.', '/uploads/infoimages/1757305719058-361706325.jpeg', 0, '2025-09-08 04:28:40', '2025-09-08 04:28:40'),
(62, 102, 'This is a text information', '/uploads/infoimages/1757305762641-429381748.jpeg', 0, '2025-09-08 04:29:20', '2025-09-08 04:29:20'),
(63, 103, 'This is a text information', '/uploads/infoimages/1757306282370-130732423.jpeg', 0, '2025-09-08 04:38:01', '2025-09-08 04:38:01'),
(64, 106, 'Vitamin D can be obtained from sunlight exposure, food sources, and supplements.  ', '/uploads/infoimages/1757347834185-726448224.png', 0, '2025-09-08 16:10:37', '2025-09-08 16:10:37'),
(65, 107, 'Vitamin D can be obtained from sunlight exposure, food sources, and supplements.  ', '/uploads/infoimages/1757349269909-433958414.png', 0, '2025-09-08 16:34:30', '2025-09-08 16:34:30'),
(66, 108, 'IV fluids aid in the management of acute renal failure; monitor renal function and urine output closely.', '/uploads/infoimages/1757354594640-906165510.jpeg', 0, '2025-09-08 18:03:15', '2025-09-08 18:03:15'),
(67, 109, ' Multiple Radio Tracheostomy suctioning should be performed using sterile technique with appropriate pressure settings (80-120 mmHg for adults) to prevent tissue trauma.', '/uploads/infoimages/1757356987556-694725894.jpeg', 0, '2025-09-08 18:43:13', '2025-09-08 18:43:13'),
(68, 110, ' Multiple Radio Tracheostomy suctioning should be performed using sterile technique with appropriate pressure settings (80-120 mmHg for adults) to prevent tissue trauma.', '/uploads/infoimages/1757357529054-136541566.jpeg', 0, '2025-09-08 18:52:10', '2025-09-08 18:52:10'),
(69, 111, ' Multiple Radio Tracheostomy suctioning should be performed using sterile technique with appropriate pressure settings (80-120 mmHg for adults) to prevent tissue trauma.', '/uploads/infoimages/1757357574428-42050914.jpeg', 0, '2025-09-08 18:52:55', '2025-09-08 18:52:55'),
(70, 112, 'This is a text information', '/uploads/infoimages/1757357992536-262359245.jpeg', 0, '2025-09-08 18:59:54', '2025-09-08 18:59:54'),
(71, 113, 'This is a text information', '/uploads/infoimages/1757358080246-336259434.jpeg', 0, '2025-09-08 19:01:21', '2025-09-08 19:01:21'),
(72, 114, 'This is a text information', '/uploads/infoimages/1757359586074-284388407.jpeg', 0, '2025-09-08 19:26:26', '2025-09-08 19:26:26'),
(73, 115, ' Multiple Radio Tracheostomy suctioning should be performed using sterile technique with appropriate pressure settings (80-120 mmHg for adults) to prevent tissue trauma.', '/uploads/infoimages/1757359937175-71367510.jpeg', 0, '2025-09-08 19:32:18', '2025-09-08 19:32:18'),
(74, 116, ' Multiple Radio Tracheostomy suctioning should be performed using sterile technique with appropriate pressure settings (80-120 mmHg for adults) to prevent tissue trauma.', '/uploads/infoimages/1757362191607-186897062.jpeg', 0, '2025-09-08 20:09:52', '2025-09-08 20:09:52'),
(75, 117, '234567', NULL, 0, '2025-09-09 03:35:07', '2025-09-09 03:35:07'),
(76, 118, 'Vitamin D can be obtained from sunlight exposure, food sources, and supplements.  ', '/uploads/infoimages/1757567665153-14099095.png', 0, '2025-09-11 05:14:25', '2025-09-11 05:14:25'),
(77, 119, ' Multiple Radio Tracheostomy suctioning should be performed using sterile technique with appropriate pressure settings (80-120 mmHg for adults) to prevent tissue trauma.', '/uploads/infoimages/1757567685976-209930479.jpeg', 0, '2025-09-11 05:14:46', '2025-09-11 05:14:46'),
(78, 120, 'IV fluids aid in the management of acute renal failure; monitor renal function and urine output closely.', '/uploads/infoimages/1757567700071-185261381.jpeg', 0, '2025-09-11 05:15:01', '2025-09-11 05:15:01'),
(79, 121, 'Tracheostomy suctioning should be performed using sterile technique with appropriate pressure settings (80-120 mmHg for adults) to prevent tissue trauma.', '/uploads/infoimages/1757567717759-10927212.jpeg', 0, '2025-09-11 05:15:17', '2025-09-11 05:15:17'),
(80, 122, 'Tracheostomy suctioning should be performed using sterile technique with appropriate pressure settings (80-120 mmHg for adults) to prevent tissue trauma.', '/uploads/infoimages/1757567800235-54189879.jpeg', 0, '2025-09-11 05:16:40', '2025-09-11 05:16:40'),
(81, 123, ' Multiple Radio Tracheostomy suctioning should be performed using sterile technique with appropriate pressure settings (80-120 mmHg for adults) to prevent tissue trauma.', '/uploads/infoimages/1757567830043-460883047.jpeg', 0, '2025-09-11 05:17:10', '2025-09-11 05:17:10'),
(82, 124, 'waerty', NULL, 0, '2025-09-11 05:40:04', '2025-09-11 05:40:04'),
(83, 125, 'Create a drag and drop question with multiple tabs and draggable sections.', NULL, 0, '2025-09-11 10:08:22', '2025-09-11 10:08:22'),
(84, 126, 'tabs and draggable sections.', NULL, 0, '2025-09-11 10:29:53', '2025-09-11 10:29:53'),
(85, 128, '', NULL, 0, '2025-09-15 07:41:04', '2025-09-15 07:41:04'),
(86, 129, 'Vitamin D can be obtained from sunlight exposure, food sources, and supplements.  ', '/uploads/infoimages/1758013589127-414597920.png', 0, '2025-09-16 09:06:30', '2025-09-16 09:06:30'),
(87, 130, 'qwertyuio', NULL, 0, '2025-09-16 09:21:23', '2025-09-16 09:21:23'),
(88, 131, 'Vitamin D can be obtained from sunlight exposure, food sources, and supplements.  ', '/uploads/infoimages/1758017040489-85306623.png', 0, '2025-09-16 10:04:01', '2025-09-16 10:04:01'),
(89, 143, '234567', NULL, 0, '2025-09-17 13:43:59', '2025-09-17 13:43:59'),
(90, 144, '333333333333333333333', NULL, 0, '2025-09-17 13:45:24', '2025-09-17 13:45:24'),
(91, 145, 'Provide detailed explanations to help students', NULL, 0, '2025-09-17 14:10:56', '2025-09-17 14:10:56'),
(92, 146, 'Provide detailed explanations to help students', '/uploads/infoimages/1758118465991-984010005.jpg', 0, '2025-09-17 14:14:26', '2025-09-17 14:14:26'),
(93, 147, 'sdfghj', '/uploads/infoimages/1758119023686-635265117.jpg', 0, '2025-09-17 14:23:43', '2025-09-17 14:23:43'),
(94, 148, 'Vitamin D can be obtained from sunlight exposure, food sources, and supplements.  ', '/uploads/infoimages/1758119347213-105394025.png', 0, '2025-09-17 14:29:08', '2025-09-17 14:29:08'),
(95, 149, 'Enter MCQ Question Content', NULL, 0, '2025-09-17 14:37:52', '2025-09-17 14:37:52'),
(96, 150, 'Enter MCQ Question Content', '/uploads/infoimages/1758120047744-992905967.jpg', 0, '2025-09-17 14:40:47', '2025-09-17 14:40:47'),
(97, 151, 'Write the question your students will answer — be clear, concise, and clinically relevant.', '/uploads/infoimages/1758123049212-713725275.jpg', 0, '2025-09-17 15:30:49', '2025-09-17 15:30:49'),
(98, 152, 'Multiple Radio Tracheostomy suctioning should be performed using sterile technique with appropriate pressure settings (80-120 mmHg for adults) to prevent tissue trauma', NULL, 0, '2025-09-17 16:12:55', '2025-09-17 16:12:55'),
(99, 161, 'Create a multiple radio question with tabs and sentence-based radio selections.', NULL, 0, '2025-09-18 13:31:34', '2025-09-18 13:31:34'),
(100, 162, 'IV fluids aid in the management of acute renal failure; monitor renal functionand urine output closely.', NULL, 0, '2025-09-18 14:22:07', '2025-09-18 14:22:07'),
(101, 163, 'IV fluids aid in the management of acute renal failure; monitor renal functionand urine output closely.', NULL, 0, '2025-09-18 14:30:12', '2025-09-18 14:30:12'),
(102, 164, 'IV fluids aid in the management of acute renal failure; monitor renal functionand urine output closely.', NULL, 0, '2025-09-18 14:34:35', '2025-09-18 14:34:35'),
(103, 165, ' Multiple Radio Tracheostomy suctioning should be performed using sterile technique with appropriate pressure settings (80-120 mmHg for adults) to prevent tissue trauma.', '/uploads/infoimages/1758266042858-261837192.jpeg', 0, '2025-09-19 07:14:06', '2025-09-19 07:14:06'),
(104, 166, ' Multiple Radio Tracheostomy suctioning should be performed using sterile technique with appropriate pressure settings (80-120 mmHg for adults) to prevent tissue trauma.', '/uploads/infoimages/1758266106668-808234642.jpeg', 0, '2025-09-19 07:15:09', '2025-09-19 07:15:09'),
(105, 167, ' Multiple Radio Tracheostomy suctioning should be performed using sterile technique with appropriate pressure settings (80-120 mmHg for adults) to prevent tissue trauma.', '/uploads/infoimages/1758268971136-997635018.jpeg', 0, '2025-09-19 08:02:51', '2025-09-19 08:02:51');

-- --------------------------------------------------------

--
-- Table structure for table `tb_contact_us`
--

CREATE TABLE `tb_contact_us` (
  `cu_id` int(11) NOT NULL,
  `cu_name` varchar(255) NOT NULL,
  `cu_email` varchar(255) NOT NULL,
  `cu_mobile` varchar(20) DEFAULT NULL,
  `cu_course_interested` varchar(255) DEFAULT NULL,
  `cu_message` text DEFAULT NULL,
  `cu_created_at` timestamp NULL DEFAULT current_timestamp(),
  `cu_status` varchar(50) DEFAULT 'new'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tb_contact_us`
--

INSERT INTO `tb_contact_us` (`cu_id`, `cu_name`, `cu_email`, `cu_mobile`, `cu_course_interested`, `cu_message`, `cu_created_at`, `cu_status`) VALUES
(1, 'Jithin pm', 'jithinpm.official@gmail.com', '7560844748', 'NCLEX', 'I hope this message finds you well. I am interested in enrolling in a coaching program to prepare for the [name of the nursing exam, e.g., NCLEX-RN, CGFNS, DHA, HAAD, etc.], and I would like to know more about the courses you offer.', '2025-08-20 05:56:56', 'new'),
(2, 'SAMPKE ', 'EMAIL', 'PHONE', 'COURSE', 'MESSAGE', '2025-08-25 06:29:12', 'new'),
(3, 'SAMPKE ', 'EMAIL', 'PHONE', 'COURSE', 'MESSAGE', '2025-08-25 06:29:52', 'new'),
(4, 'testing123', 'jithinpm@gmail.com', '9074054045', '12', 'its testing purpose', '2025-09-11 16:46:32', 'new'),
(5, 'testing123', 'jithinpm@gmail.com', '9074054045', '12', 'its testing', '2025-09-11 16:52:12', 'new'),
(6, 'testing123', 'jithinpm@gmail.com', '9074054045', '12', 'testing', '2025-09-11 17:36:45', 'new'),
(7, 'testing123', 'jithinpm@gmail.com', '9074054045', '12', 'testing 123', '2025-09-11 18:23:43', 'new'),
(8, 'testing123', 'jithinpm@gmail.com', '9074054045', '12', 'testinh', '2025-09-11 18:24:55', 'new'),
(9, 'testing123', 'jithinpm@gmail.com', '9074054045', '12', 'testing', '2025-09-12 03:20:20', 'new'),
(10, 'testing123', 'jithinpm@gmail.com', '9074054045', '15', 'khgyjdvjbjhgg', '2025-09-12 03:37:11', 'new'),
(11, 'testing123', 'jithinpm@gmail.com', '9074054045', '12', 'dwdfgghfgdf', '2025-09-12 03:40:10', 'new'),
(12, 'testing123', 'jithinpm@gmail.com', '9074054045', '12', 'tefghsjcgskchls', '2025-09-13 09:47:01', 'new'),
(13, 'testing123', 'jithinpm@gmail.com', '9074054045', '12', 'testing', '2025-09-13 09:47:40', 'new'),
(14, 'testing123', 'jithinpm@gmail.com', '9074054045', '12', 'its testing', '2025-09-13 10:50:32', 'new'),
(15, 'testing123', 'jithinpm@gmail.com', '9074054045', '12', 'tefghsjcgskchls', '2025-09-13 11:16:35', 'new'),
(16, 'M Sambhunarayan', 'msambhunarayan07@gamil.com', '9249902771', '12', 'Test ', '2025-09-13 16:37:01', 'new'),
(17, 'Sambhu Narayan', 'msambhunarayan07@gamil.com', '9249902771', '12', 'test', '2025-09-15 03:23:15', 'new');

-- --------------------------------------------------------

--
-- Table structure for table `tb_dropdownOptions`
--

CREATE TABLE `tb_dropdownOptions` (
  `id` int(11) NOT NULL,
  `questionId` int(11) NOT NULL,
  `dropdowntext_id` int(11) NOT NULL,
  `dropdownValue` varchar(255) NOT NULL,
  `isDeleted` tinyint(1) DEFAULT 0,
  `createdAt` timestamp NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tb_dropdownOptions`
--

INSERT INTO `tb_dropdownOptions` (`id`, `questionId`, `dropdowntext_id`, `dropdownValue`, `isDeleted`, `createdAt`, `updatedAt`) VALUES
(1, 13, 2, '12345', 0, '2025-08-25 08:35:04', '2025-08-25 08:35:04'),
(2, 37, 4, 'Atherosclerosis', 0, '2025-08-27 08:48:55', '2025-08-27 08:48:55'),
(3, 37, 4, 'Atherosclerosis', 0, '2025-08-27 08:48:55', '2025-08-27 08:48:55'),
(4, 41, 5, 'into the middle third of the anterolateral aspect of the thigh', 0, '2025-08-28 08:32:37', '2025-08-28 08:32:37'),
(5, 41, 5, 'three finger widths below the acromion process.', 0, '2025-08-28 08:32:37', '2025-08-28 08:32:37'),
(6, 41, 5, 'just below the iliac crest on the side of the thigh.', 0, '2025-08-28 08:32:37', '2025-08-28 08:32:37'),
(7, 65, 7, 'asthm', 0, '2025-09-01 05:23:08', '2025-09-01 05:23:08'),
(8, 65, 7, 'pneumonia', 0, '2025-09-01 05:23:08', '2025-09-01 05:23:08'),
(9, 65, 7, 'hemothorax', 0, '2025-09-01 05:23:08', '2025-09-01 05:23:08'),
(10, 66, 8, 'asthma', 0, '2025-09-01 05:25:51', '2025-09-01 05:25:51'),
(11, 66, 8, 'pneumonia', 0, '2025-09-01 05:25:51', '2025-09-01 05:25:51'),
(12, 66, 8, 'hemothorax', 0, '2025-09-01 05:25:51', '2025-09-01 05:25:51'),
(13, 70, 9, 'asthma', 0, '2025-09-01 05:41:32', '2025-09-01 05:41:32'),
(14, 70, 9, 'pneumonia', 0, '2025-09-01 05:41:32', '2025-09-01 05:41:32'),
(15, 70, 9, 'hemothorax', 0, '2025-09-01 05:41:32', '2025-09-01 05:41:32'),
(16, 70, 10, 'pneumothorax', 0, '2025-09-01 05:41:32', '2025-09-01 05:41:32'),
(17, 70, 10, 'hemothorax', 0, '2025-09-01 05:41:32', '2025-09-01 05:41:32'),
(18, 70, 10, 'pleural effusion', 0, '2025-09-01 05:41:32', '2025-09-01 05:41:32'),
(19, 70, 11, 'pneumothorax', 0, '2025-09-01 05:41:32', '2025-09-01 05:41:32'),
(20, 70, 11, 'hemothorax', 0, '2025-09-01 05:41:32', '2025-09-01 05:41:32'),
(21, 70, 11, 'pleural effusion', 0, '2025-09-01 05:41:32', '2025-09-01 05:41:32'),
(22, 71, 12, 'asthma', 0, '2025-09-01 05:47:17', '2025-09-01 05:47:17'),
(23, 71, 12, 'pneumonia', 0, '2025-09-01 05:47:17', '2025-09-01 05:47:17'),
(24, 71, 12, 'hemothorax', 0, '2025-09-01 05:47:17', '2025-09-01 05:47:17'),
(25, 71, 13, 'pneumothorax', 0, '2025-09-01 05:47:17', '2025-09-01 05:47:17'),
(26, 71, 13, 'hemothorax', 0, '2025-09-01 05:47:17', '2025-09-01 05:47:17'),
(27, 71, 13, 'pleural effusion', 0, '2025-09-01 05:47:17', '2025-09-01 05:47:17'),
(28, 71, 14, 'pneumothorax', 0, '2025-09-01 05:47:17', '2025-09-01 05:47:17'),
(29, 71, 14, 'hemothorax', 0, '2025-09-01 05:47:17', '2025-09-01 05:47:17'),
(30, 71, 14, 'pleural effusion', 0, '2025-09-01 05:47:17', '2025-09-01 05:47:17'),
(31, 84, 15, 'acute renal failure', 0, '2025-09-06 11:36:56', '2025-09-06 11:36:56'),
(32, 84, 15, 'chronic liver disease', 0, '2025-09-06 11:36:56', '2025-09-06 11:36:56'),
(33, 84, 15, 'dehydration', 0, '2025-09-06 11:36:56', '2025-09-06 11:36:56'),
(34, 84, 16, 'anemia', 0, '2025-09-06 11:36:56', '2025-09-06 11:36:56'),
(35, 84, 16, 'hypoglycemia', 0, '2025-09-06 11:36:56', '2025-09-06 11:36:56'),
(36, 84, 16, 'infection', 0, '2025-09-06 11:36:56', '2025-09-06 11:36:56'),
(37, 84, 17, 'start antibiotics', 0, '2025-09-06 11:36:56', '2025-09-06 11:36:56'),
(38, 84, 17, 'admit for IV fluids', 0, '2025-09-06 11:36:56', '2025-09-06 11:36:56'),
(39, 84, 17, 'schedule outpatient follow-up', 0, '2025-09-06 11:36:56', '2025-09-06 11:36:56'),
(40, 95, 19, 'acute renal failure', 0, '2025-09-07 07:41:30', '2025-09-07 07:41:30'),
(41, 95, 19, 'ronic liverdisease', 0, '2025-09-07 07:41:30', '2025-09-07 07:41:30'),
(42, 95, 19, 'dehydration', 0, '2025-09-07 07:41:30', '2025-09-07 07:41:30'),
(43, 95, 20, 'anemia', 0, '2025-09-07 07:41:30', '2025-09-07 07:41:30'),
(44, 95, 20, 'hypoglycemia', 0, '2025-09-07 07:41:30', '2025-09-07 07:41:30'),
(45, 95, 20, 'infection', 0, '2025-09-07 07:41:30', '2025-09-07 07:41:30'),
(46, 95, 21, 'start antibiotics', 0, '2025-09-07 07:41:30', '2025-09-07 07:41:30'),
(47, 95, 21, 'admit for IVfluids', 0, '2025-09-07 07:41:30', '2025-09-07 07:41:30'),
(48, 95, 21, 'chedule outpatient follow-up', 0, '2025-09-07 07:41:30', '2025-09-07 07:41:30'),
(49, 108, 22, 'acute renal failure', 0, '2025-09-08 18:03:14', '2025-09-08 18:03:14'),
(50, 108, 22, 'chronic liver disease', 0, '2025-09-08 18:03:15', '2025-09-08 18:03:15'),
(51, 108, 22, 'dehydration', 0, '2025-09-08 18:03:15', '2025-09-08 18:03:15'),
(52, 108, 23, 'anemia', 0, '2025-09-08 18:03:15', '2025-09-08 18:03:15'),
(53, 108, 23, 'hypoglycemia', 0, '2025-09-08 18:03:15', '2025-09-08 18:03:15'),
(54, 108, 23, 'infection', 0, '2025-09-08 18:03:15', '2025-09-08 18:03:15'),
(55, 108, 24, 'start antibiotics', 0, '2025-09-08 18:03:15', '2025-09-08 18:03:15'),
(56, 108, 24, 'admit for IV fluids', 0, '2025-09-08 18:03:15', '2025-09-08 18:03:15'),
(57, 108, 24, 'schedule outpatient follow-up', 0, '2025-09-08 18:03:15', '2025-09-08 18:03:15'),
(58, 120, 26, 'acute renal failure', 0, '2025-09-11 05:14:59', '2025-09-11 05:14:59'),
(59, 120, 26, 'chronic liver disease', 0, '2025-09-11 05:14:59', '2025-09-11 05:14:59'),
(60, 120, 26, 'dehydration', 0, '2025-09-11 05:14:59', '2025-09-11 05:14:59'),
(61, 120, 27, 'anemia', 0, '2025-09-11 05:15:00', '2025-09-11 05:15:00'),
(62, 120, 27, 'hypoglycemia', 0, '2025-09-11 05:15:00', '2025-09-11 05:15:00'),
(63, 120, 27, 'infection', 0, '2025-09-11 05:15:00', '2025-09-11 05:15:00'),
(64, 120, 28, 'start antibiotics', 0, '2025-09-11 05:15:00', '2025-09-11 05:15:00'),
(65, 120, 28, 'admit for IV fluids', 0, '2025-09-11 05:15:00', '2025-09-11 05:15:00'),
(66, 120, 28, 'schedule outpatient follow-up', 0, '2025-09-11 05:15:00', '2025-09-11 05:15:00'),
(67, 162, 30, 'hronic liverdisease', 0, '2025-09-18 14:22:07', '2025-09-18 14:22:07'),
(68, 162, 30, 'acute renal failure', 0, '2025-09-18 14:22:07', '2025-09-18 14:22:07'),
(69, 162, 30, 'dehydration', 0, '2025-09-18 14:22:07', '2025-09-18 14:22:07'),
(70, 163, 31, 'chronic liverdisease', 0, '2025-09-18 14:30:12', '2025-09-18 14:30:12'),
(71, 163, 31, 'acute renal failure', 0, '2025-09-18 14:30:12', '2025-09-18 14:30:12'),
(72, 163, 31, 'dehydration', 0, '2025-09-18 14:30:12', '2025-09-18 14:30:12'),
(73, 164, 32, 'Chronic liverdisease', 0, '2025-09-18 14:34:35', '2025-09-18 14:34:35'),
(74, 164, 32, 'dehydration', 0, '2025-09-18 14:34:35', '2025-09-18 14:34:35'),
(75, 164, 33, 'anemia', 0, '2025-09-18 14:34:35', '2025-09-18 14:34:35'),
(76, 164, 33, 'hypoglycemia', 0, '2025-09-18 14:34:35', '2025-09-18 14:34:35'),
(77, 164, 33, 'infection', 0, '2025-09-18 14:34:35', '2025-09-18 14:34:35');

-- --------------------------------------------------------

--
-- Table structure for table `tb_dropdowns`
--

CREATE TABLE `tb_dropdowns` (
  `id` int(11) NOT NULL,
  `questionId` int(11) NOT NULL,
  `dropdownField` varchar(255) NOT NULL,
  `dropdownanswer` varchar(255) DEFAULT NULL,
  `blankOrNot` varchar(500) NOT NULL,
  `isDeleted` tinyint(1) DEFAULT 0,
  `createdAt` timestamp NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tb_dropdowns`
--

INSERT INTO `tb_dropdowns` (`id`, `questionId`, `dropdownField`, `dropdownanswer`, `blankOrNot`, `isDeleted`, `createdAt`, `updatedAt`) VALUES
(1, 13, '123', '', '0', 0, '2025-08-25 08:35:04', '2025-08-25 08:35:04'),
(2, 13, '1234', '123', '1', 0, '2025-08-25 08:35:04', '2025-08-25 08:35:04'),
(3, 37, 'Atherosclerosis', '', '0', 0, '2025-08-27 08:48:55', '2025-08-27 08:48:55'),
(4, 37, 'Atherosclerosis', 'Atherosclerosis', '1', 0, '2025-08-27 08:48:55', '2025-08-27 08:48:55'),
(5, 41, 'The nurse locates the client\'s vastus lateralis by injecting', 'into the middle third of the anterolateral aspect of the thigh.', '1', 0, '2025-08-28 08:32:37', '2025-08-28 08:32:37'),
(6, 41, 'and inject at', '', '0', 0, '2025-08-28 08:32:37', '2025-08-28 08:32:37'),
(7, 65, 'Based on the client\'s', 'pneumonia', '1', 0, '2025-09-01 05:23:08', '2025-09-01 05:23:08'),
(8, 66, 'Based on the client\'s', 'pneumonia', '1', 0, '2025-09-01 05:25:51', '2025-09-01 05:25:51'),
(9, 70, 'Based on the client\'s', 'pneumonia', '1', 0, '2025-09-01 05:41:32', '2025-09-01 05:41:32'),
(10, 70, 'And', 'hemothorax', '1', 0, '2025-09-01 05:41:32', '2025-09-01 05:41:32'),
(11, 70, 'this client is at highest risk for', 'pleural effusion', '1', 0, '2025-09-01 05:41:32', '2025-09-01 05:41:32'),
(12, 71, 'Based on the client\'s', 'pneumonia', '1', 0, '2025-09-01 05:47:17', '2025-09-01 05:47:17'),
(13, 71, 'And', 'hemothorax', '1', 0, '2025-09-01 05:47:17', '2025-09-01 05:47:17'),
(14, 71, 'this client is at highest risk for', 'pleural effusion', '1', 0, '2025-09-01 05:47:17', '2025-09-01 05:47:17'),
(15, 84, 'Based on the lab report, the condition is', 'acute renal failure', '1', 0, '2025-09-06 11:36:56', '2025-09-06 11:36:56'),
(16, 84, 'And the most likely cause of fatigue is', 'anemia', '1', 0, '2025-09-06 11:36:56', '2025-09-06 11:36:56'),
(17, 84, 'Overall, the next best step is to', 'admit for IV fluids', '1', 0, '2025-09-06 11:36:56', '2025-09-06 11:36:56'),
(18, 84, 'done', NULL, '0', 0, '2025-09-06 11:36:56', '2025-09-06 11:36:56'),
(19, 95, 'Based on the lab report, the conditionis', 'acute renal', '1', 0, '2025-09-07 07:41:30', '2025-09-07 07:41:30'),
(20, 95, 'And the most likely cause of fatigueis', 'anemia', '1', 0, '2025-09-07 07:41:30', '2025-09-07 07:41:30'),
(21, 95, 'Overall, the next best step isto', 'admit for IV', '1', 0, '2025-09-07 07:41:30', '2025-09-07 07:41:30'),
(22, 108, 'Based on the lab report, the condition is', 'acute renal failure', '1', 0, '2025-09-08 18:03:14', '2025-09-08 18:03:14'),
(23, 108, 'And the most likely cause of fatigue is', 'anemia', '1', 0, '2025-09-08 18:03:15', '2025-09-08 18:03:15'),
(24, 108, 'Overall, the next best step is to', 'admit for IV fluids', '1', 0, '2025-09-08 18:03:15', '2025-09-08 18:03:15'),
(25, 108, 'done', NULL, '0', 0, '2025-09-08 18:03:15', '2025-09-08 18:03:15'),
(26, 120, 'Based on the lab report, the condition is', 'acute renal failure', '1', 0, '2025-09-11 05:14:59', '2025-09-11 05:14:59'),
(27, 120, 'And the most likely cause of fatigue is', 'anemia', '1', 0, '2025-09-11 05:15:00', '2025-09-11 05:15:00'),
(28, 120, 'Overall, the next best step is to', 'admit for IV fluids', '1', 0, '2025-09-11 05:15:00', '2025-09-11 05:15:00'),
(29, 120, 'done', NULL, '0', 0, '2025-09-11 05:15:00', '2025-09-11 05:15:00'),
(30, 162, 'Based on the lab report, the conditionis', 'acute renal failure', '1', 0, '2025-09-18 14:22:07', '2025-09-18 14:22:07'),
(31, 163, 'Based on the lab report, ', 'acute renal failure', '1', 0, '2025-09-18 14:30:12', '2025-09-18 14:30:12'),
(32, 164, 'acute renal failure\"', 'acute renal failure\"', '1', 0, '2025-09-18 14:34:35', '2025-09-18 14:34:35'),
(33, 164, 'And the most likely cause of fatigueis', 'anemia', '1', 0, '2025-09-18 14:34:35', '2025-09-18 14:34:35');

-- --------------------------------------------------------

--
-- Table structure for table `tb_explanation`
--

CREATE TABLE `tb_explanation` (
  `id` int(11) NOT NULL,
  `questionId` int(11) NOT NULL,
  `heading` varchar(255) DEFAULT NULL,
  `explanation` longtext DEFAULT NULL,
  `isDeleted` tinyint(1) DEFAULT 0,
  `createdAt` timestamp NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tb_explanation`
--

INSERT INTO `tb_explanation` (`id`, `questionId`, `heading`, `explanation`, `isDeleted`, `createdAt`, `updatedAt`) VALUES
(1, 1, 'Choice C is correct', 'Choice C is correct. The nurse should inflate the balloon on the catheter at the bifurcation point. For male clients, the catheter should be advanced to the bifurcation (Y-site) before inflating the balloon. This ensures that the balloon is entirely inside the bladder, minimizing the risk of inflating it in the urethra, which can cause trauma.\nChoice A is incorrect. It is inappropriate to inflate the balloon on the catheter upon meeting resistance. In a male client, this could cause serious trauma to the urethra. The nurse must ensure the catheter is fully inside the bladder before inflating the balloon.\nChoice B is incorrect. Inflating the balloon on the catheter is inappropriate as soon as urine is observed in the tubing. \nChoice D is incorrect. It is not appropriate to fully advance the length of the catheter in every client. The length of the urethra and distance to the bladder will vary; therefore, the catheter will be advanced in different lengths depending on the client.', 0, '2025-08-20 05:17:46', '2025-08-20 05:17:46'),
(2, 2, '123456789', '1234567890-234567rrrr', 0, '2025-08-20 05:38:46', '2025-08-20 05:38:46'),
(3, 3, 'Choice C is correct.', 'The nurse should inflate the balloon on the catheter at the bifurcation point. For male clients, the catheter should be advanced to the bifurcation (Y-site) before inflating the balloon. This ensures that the balloon is entirely inside the bladder, minimizing the risk of inflating it in the urethra, which can cause trauma.', 0, '2025-08-20 05:42:39', '2025-08-20 05:42:39'),
(4, 4, 'Choice C is correct.', 'The nurse should inflate the balloon on the catheter at the bifurcation point. For male clients, the catheter should be advanced to the bifurcation (Y-site) before inflating the balloon. This ensures that the balloon is entirely inside the bladder, minimizing the risk of inflating it in the urethra, which can cause trauma.', 0, '2025-08-20 05:44:53', '2025-08-20 05:44:53'),
(5, 5, '123456789', '1234567890123456783456', 0, '2025-08-21 05:04:38', '2025-08-21 05:04:38'),
(6, 6, '123456789', '234567890-234567890345', 0, '2025-08-21 12:22:16', '2025-08-21 12:22:16'),
(7, 7, '123456789', '123456781234567dfghjkl;', 0, '2025-08-21 12:37:16', '2025-08-21 12:37:16'),
(8, 8, '23456789', '1234567890-[poi8u765redfghjk,', 0, '2025-08-21 13:00:47', '2025-08-21 13:00:47'),
(9, 9, '1234567890-=', '1234567890-=555555555', 0, '2025-08-21 15:32:43', '2025-08-21 15:32:43'),
(10, 10, '1234567890', '234567890234567890-34567890', 0, '2025-08-25 08:13:44', '2025-08-25 08:13:44'),
(11, 11, '123456', '123456789123456789123456789', 0, '2025-08-25 08:28:08', '2025-08-25 08:28:08'),
(12, 12, '1234567', '123456712345673456723456', 0, '2025-08-25 08:32:22', '2025-08-25 08:32:22'),
(13, 13, '12345678', '23456789023456233333', 0, '2025-08-25 08:35:05', '2025-08-25 08:35:05'),
(14, 14, '12345678', '12345678123412345234', 0, '2025-08-25 08:36:55', '2025-08-25 08:36:55'),
(15, 15, '1234567', '12345678912345678934567', 0, '2025-08-25 08:38:05', '2025-08-25 08:38:05'),
(16, 16, '1234567', '23456789023456789034567', 0, '2025-08-25 08:39:05', '2025-08-25 08:39:05'),
(17, 17, '2345678', 'qwertyu34567890456789', 0, '2025-08-25 08:46:25', '2025-08-25 08:46:25'),
(18, 18, 'qqqqqq', 'ppppppppppppppppppppppppppppppp', 0, '2025-08-25 08:52:26', '2025-08-25 08:52:26'),
(19, 19, 'wwww', 'ssssssssssssssssssssssss', 0, '2025-08-25 08:55:45', '2025-08-25 08:55:45'),
(20, 20, '12345678', '2345678e456y7iop[yui', 0, '2025-08-25 09:01:10', '2025-08-25 09:01:10'),
(21, 21, 'dd', 'dddddddddddddddddddd', 0, '2025-08-25 09:09:31', '2025-08-25 09:09:31'),
(22, 22, '123456789', '12345678902345678922', 0, '2025-08-25 09:23:57', '2025-08-25 09:23:57'),
(23, 23, '2222222222222', '22222222222222222222222222222', 0, '2025-08-25 09:28:55', '2025-08-25 09:28:55'),
(24, 24, '1234', '12345567899900000000', 0, '2025-08-25 09:32:37', '2025-08-25 09:32:37'),
(25, 25, '1234567845678', '12345678901234567890123456', 0, '2025-08-25 09:42:48', '2025-08-25 09:42:48'),
(26, 26, 'eeeeeeeeeeeeeee', 'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww', 0, '2025-08-25 10:10:10', '2025-08-25 10:10:10'),
(27, 27, '2ertyuio', 'wasedrtfgyhuijkopl;edrtf', 0, '2025-08-25 10:27:13', '2025-08-25 10:27:13'),
(28, 28, '1234567890', '1234567890poiuytrewasdfghjkl', 0, '2025-08-25 10:29:40', '2025-08-25 10:29:40'),
(29, 29, '123456789', '123456789pqwertyuio5', 0, '2025-08-25 10:39:23', '2025-08-25 10:39:23'),
(30, 30, '1234567`12345', '12345678901234561234567', 0, '2025-08-25 10:55:02', '2025-08-25 10:55:02'),
(31, 31, 'sssss', 'ddddddddddddddddddddddddd', 0, '2025-08-25 14:25:31', '2025-08-25 14:25:31'),
(32, 32, '1111111111111111', '2222222222222222222222222222222222', 0, '2025-08-26 03:25:51', '2025-08-26 03:25:51'),
(33, 33, '12345', '11111111111111111111', 0, '2025-08-26 03:51:27', '2025-08-26 03:51:27'),
(34, 34, 'Coronary Artery Disease', 'Myocardial infarction most commonly occurs due to blockage of coronary arteries from atherosclerotic plaques, which restrict blood flow to the heart muscle.', 0, '2025-08-27 08:36:56', '2025-08-27 08:36:56'),
(35, 35, 'Bone Mineralization', 'Rickets is caused by inadequate mineralization of bone due to vitamin D deficiency, leading to soft and weak bones in children.', 0, '2025-08-27 08:39:00', '2025-08-27 08:39:00'),
(36, 36, 'Bone Mineralization', 'Rickets is caused by inadequate mineralization of bone due to vitamin D deficiency, leading to soft and weak bones in children', 0, '2025-08-27 08:40:44', '2025-08-27 08:40:44'),
(37, 37, 'Coronary Artery Disease', 'Myocardial infarction most commonly occurs due to blockage of coronary arteries from atherosclerotic plaques, which restrict blood flow to the heart muscle.', 0, '2025-08-27 08:48:55', '2025-08-27 08:48:55'),
(38, 38, 'Rationale', 'The client needs to receive pain medication approximately 30 to 60 minutes before a burn dressing change. This will help the client tolerate an otherwise painful procedure. None of the remaining options addresses the issue of pain effectively.', 0, '2025-08-27 10:12:10', '2025-08-27 10:12:10'),
(39, 39, '\"Bacterial Classification', 'Staphylococcus aureus stains Gram-positive due to its thick peptidoglycan cell wall, which retains the crystal violet stain during Gram staining.', 0, '2025-08-27 10:16:09', '2025-08-27 10:16:09'),
(40, 40, 'rationale', 'Hyperbaric oxygen therapy is a process by which oxygen is administered at greater than atmospheric pressure. When oxygen is inhaled under pressure, the level of tissue oxygen is greatly increased. The high levels of oxygen promote the action of phagocytes and promote healing of the wound. Because the client is placed in a closed chamber, the administration of oxygen is of primary importance. Although options 1, 3, and 4 may be appropriate interventions, option 2 is the priority.', 0, '2025-08-28 06:42:06', '2025-08-28 06:42:06'),
(41, 41, 'Explanation', 'The appropriate anatomical landmark to administer an intramuscular (IM) injection into the client\'s\nvastus lateralis is locating the thigh\'s anterolateral aspect. It extends in an adult from a handbreadth\nabove the knee to a handbreadth below the greater trochanter of the femur. The nurse should use\nthe middle third for the injection. To help relax the muscle, ask the client to lie flat with the knee\nslightly flexed and foot externally rotated or to assume a sitting position. IM injections are\nadministered at 90 degrees.', 0, '2025-08-28 08:32:37', '2025-08-28 08:32:37'),
(42, 42, 'Epidural Hematoma Cause', 'The middle meningeal artery is the most common vessel ruptured in head trauma leading to an epidural hematoma.', 0, '2025-08-28 08:34:59', '2025-08-28 08:34:59'),
(43, 43, 'Hormonal Disorder', 'Acromegaly is caused by excessive secretion of growth hormone, usually due to a pituitary adenoma.', 0, '2025-08-28 08:37:09', '2025-08-28 08:37:09'),
(44, 44, 'Emergency Management', 'Intramuscular epinephrine is the first-line treatment for anaphylaxis because it rapidly reverses airway obstruction and hypotension.', 0, '2025-08-28 08:44:32', '2025-08-28 08:44:32'),
(45, 45, 'Hemophilia A', 'Hemophilia A is caused by a deficiency of Factor VIII, leading to defective coagulation.', 0, '2025-08-28 09:52:15', '2025-08-28 09:52:15'),
(46, 46, 'Acetaminophen Toxicity', 'N-acetylcysteine replenishes glutathione and prevents liver damage in paracetamol poisoning', 0, '2025-08-28 09:54:15', '2025-08-28 09:54:15'),
(47, 47, 'Clinical Signs of Hypocalcemia', 'Trousseau’s and Chvostek’s signs indicate neuromuscular irritability due to hypocalcemia.', 0, '2025-08-28 09:56:06', '2025-08-28 09:56:06'),
(48, 48, 'Shoulder Injuries', 'The axillary nerve runs around the surgical neck of the humerus and is commonly injured in fractures.', 0, '2025-08-28 09:58:07', '2025-08-28 09:58:07'),
(49, 49, 'Hypertension Etiology', 'Renal artery stenosis leads to decreased renal perfusion, stimulating the renin-angiotensin system and causing hypertension.', 0, '2025-08-28 10:01:37', '2025-08-28 10:01:37'),
(50, 50, 'Collagen Synthesis', 'Vitamin C is essential for collagen hydroxylation. Its deficiency causes scurvy, presenting with gum bleeding and poor wound healing.', 0, '2025-08-28 10:04:15', '2025-08-28 10:04:15'),
(51, 51, 'Valvular Lesions', 'Rheumatic heart disease most commonly affects the mitral valve, leading to mitral stenosis.', 0, '2025-08-28 10:07:02', '2025-08-28 10:07:02'),
(52, 52, 'Tumor Markers', 'Alpha-fetoprotein (AFP) is a tumor marker commonly elevated in hepatocellular carcinoma.', 0, '2025-08-28 10:08:38', '2025-08-28 10:08:38'),
(53, 53, 'Coronary Artery Disease', 'The LAD artery supplies a large portion of the left ventricle and its blockage can cause fatal myocardial infarction.', 0, '2025-08-28 10:11:12', '2025-08-28 10:11:12'),
(54, 54, 'Hormones of Pineal Gland', 'The pineal gland secretes melatonin, which regulates circadian rhythms and sleep cycles.', 0, '2025-08-28 10:13:20', '2025-08-28 10:13:20'),
(55, 55, 'Syphilis Diagnosis', 'The Venereal Disease Research Laboratory (VDRL) test is a non-treponemal test used for syphilis screening.', 0, '2025-08-28 10:15:16', '2025-08-28 10:15:16'),
(56, 56, 'Lysosomal Storage Disorders', 'Gaucher’s disease is caused by deficiency of beta-glucocerebrosidase, leading to accumulation of glucocerebroside.', 0, '2025-08-28 10:17:06', '2025-08-28 10:17:06'),
(57, 57, 'Renal Physiology', 'The proximal tubule reabsorbs around 65-70% of filtered water and solutes.', 0, '2025-08-28 10:19:20', '2025-08-28 10:19:20'),
(58, 58, 'Rational', 'Explanation\nPotential Conditions\n\nThis client has classic manifestations of testicular torsion. This medical emergency can cause nonviability of the affected teste if not treated within six hours.\nTesticular torsion can have an abrupt onset and may start in the middle of the night. Additionally, the finding of a hardened testicle with pain radiating to that side of the affected abdomen is consistent with a torsion.\nAppenciditis is unlikely considering the abrupt onset of pain, the client not having a fever, and focal tenderness in the testicle.\nSexually transmitted infections such as gonorrhea and chlamydia are unlikely because the client denies dysuria or any discharge.\nEpididymitis is unlikely because its gradual onset usually does not feature nausea and vomiting. Further, individuals typically have dysuria. Finally, epididymitis is generally driven by an infection such as gonorrhea or chlamydia.\nActions to Take\n\nAn order for a scrotal ultrasound is essential because this diagnostic testing, specifically color Doppler ultrasonography, will conclusively identify if torsion is present.\nThe nurse should also keep the client NPO because there is a strong likelihood that the client requires surgery to correct the torsion.\nA very low likelihood exists for an STI, so a urine specimen for gonorrhea and chlamydia is unnecessary.\nA very low likelihood exists for appendicitis or an STI, so a prescription for an antibiotic is unnecessary. Antibiotics are not used to treat testicular torsion.\nEpididymitis, if caused by an STI, would require an antibiotic, but the likelihood of epididymitis is unlikely.\nParameters to Monitor\n\nThe nurse needs to monitor the degree of testicular swelling to determine if it is worsening.\nThe nurse further needs to monitor the client\'s pain and anticipate a prescription for pain medication as the client is endorsing pain 7/10.\nThe client\'s oral temperature is not a parameter to monitor. The slight elevation is likely due to some dehydration associated with the vomiting the client experienced earlier.\nUOP is not a concern as testicular torsion, as the concern is the obstruction to the teste, not the urinary tract.', 0, '2025-08-30 10:09:58', '2025-08-30 10:09:58'),
(59, 59, 'Pneumonia Etiology', 'Streptococcus pneumoniae is the leading cause of community-acquired pneumonia worldwide.', 0, '2025-09-01 04:00:40', '2025-09-01 04:00:40'),
(60, 60, 'Eye Muscles', 'The abducens nerve (cranial nerve VI) innervates the lateral rectus muscle, responsible for eye abduction', 0, '2025-09-01 04:02:07', '2025-09-01 04:02:07'),
(61, 61, 'First-Line Treatment', 'Epinephrine is the first-line treatment for anaphylaxis as it reverses airway obstruction and hypotension rapidly.', 0, '2025-09-01 04:03:56', '2025-09-01 04:03:56'),
(62, 62, 'Immunoglobulins', 'Immunoglobulins IgG is the most abundant antibody in the blood and provides long-term immunity after infection or vaccination.', 0, '2025-09-01 04:05:52', '2025-09-01 04:05:52'),
(63, 63, 'Management of Acute Pulmonary Edema', 'The client is most likely experiencing acute pulmonary edema, a medical emergency. Immediate action includes providing high-flow oxygen and IV diuretics. Critical parameters to monitor are oxygenation, respiratory status, urine output, and electrolytes to assess therapy response.', 0, '2025-09-01 04:25:56', '2025-09-01 04:25:56'),
(64, 64, 'Explanation', 'Epinephrine is the first-line treatment for anaphylaxis due to its rapid action in reversing severe allergic symptoms.', 0, '2025-09-01 05:19:59', '2025-09-01 05:19:59'),
(65, 65, 'Explanation', 'Epinephrine is the first-line treatment for anaphylaxis due to its rapid action in reversing severe allergic symptoms.', 0, '2025-09-01 05:23:08', '2025-09-01 05:23:08'),
(66, 66, 'Explanation', 'pinephrine is the first-line treatment for anaphylaxis due to its rapid action in reversing severe allergic symptoms.', 0, '2025-09-01 05:25:51', '2025-09-01 05:25:51'),
(67, 67, 'Explanation', 'Proper tracheostomy suctioning follows a systematic approach to ensure patient safety and effectiveness. The correct sequence maintains sterility, prevents hypoxia, and ensures adequate airway clearance.\"', 0, '2025-09-01 05:31:05', '2025-09-01 05:31:05'),
(68, 68, 'Explanation', 'Epinephrine is the first-line treatment for anaphylaxis due to its rapid action in reversing severe allergic symptoms.', 0, '2025-09-01 05:35:03', '2025-09-01 05:35:03'),
(69, 69, 'Explanation', 'Epinephrine is the first-line treatment for anaphylaxis due to its rapid action in reversing severe allergic symptoms.', 0, '2025-09-01 05:36:26', '2025-09-01 05:36:26'),
(70, 70, 'Explanation', 'Epinephrine is the first-line treatment for anaphylaxis due to its rapid action in reversing severe allergic symptoms.', 0, '2025-09-01 05:41:32', '2025-09-01 05:41:32'),
(71, 71, 'Explanation', 'Epinephrine is the first-line treatment for anaphylaxis due to its rapid action in reversing severe allergic symptoms.', 0, '2025-09-01 05:47:17', '2025-09-01 05:47:17'),
(72, 72, 'Explanation', 'Proper tracheostomy suctioning follows a systematic approach to ensure patient safety and effectiveness. The correct sequence maintains sterility, prevents hypoxia, and ensures adequate airway clearance.', 0, '2025-09-01 09:33:07', '2025-09-01 09:33:07'),
(73, 73, 'Fill in the BlanksExplanation Heading', 'Fill in the Blanks Proper tracheostomy suctioning follows a systematic approach to ensure patient safety and effectiveness. The correct sequence maintains sterility, prevents hypoxia, and ensures adequate airway clearance', 0, '2025-09-01 09:54:44', '2025-09-01 09:54:44'),
(74, 74, 'Multiple Radio Explanation Heading', 'Multiple Radio Proper tracheostomy suctioning follows a systematic approach to ensure patient safety and effectiveness. The correct sequence maintains sterility, prevents hypoxia, and ensures adequate airway clearance', 0, '2025-09-01 10:05:17', '2025-09-01 10:05:17'),
(75, 75, 'Fill in the BlanksExplanation Heading', 'fill in the Blanks Proper tracheostomy suctioning follows a systematic approach to ensure patient safety and effectiveness. The correct sequence maintains sterility, prevents hypoxia, and ensures adequate airway clearance.\"', 0, '2025-09-01 10:10:12', '2025-09-01 10:10:12'),
(76, 76, 'Multiple Radio Explanation Heading', 'Multiple Radio Proper tracheostomy suctioning follows a systematic approach to ensure patient safety and effectiveness', 0, '2025-09-01 10:21:35', '2025-09-01 10:21:35'),
(77, 77, 'Multiple Radio Explanation Heading', 'Multiple Radio Proper tracheostomy suctioning follows a systematic approach to ensure patient safety and effectiveness', 0, '2025-09-01 10:25:21', '2025-09-01 10:25:21'),
(78, 78, 'Explanation Headin', 'Multiple Radio Proper tracheostomy suctioning follows a systematic approach to ensure patient safety and effectiveness', 0, '2025-09-01 10:31:40', '2025-09-01 10:31:40'),
(79, 79, 'Explanation', 'The recommended daily amount for most adults is 600 to 800 international units (IU), helping maintain bone and immune health.', 0, '2025-09-06 09:53:03', '2025-09-06 09:53:03'),
(80, 80, 'Explanation', 'The recommended daily amount for most adults is 600 to 800 international units (IU), helping maintain bone and immune health.', 0, '2025-09-06 09:59:07', '2025-09-06 09:59:07'),
(81, 81, 'Explanation', 'The recommended daily amount for most adults is 600 to 800 international units (IU), helping maintain bone and immune health.', 0, '2025-09-06 09:59:15', '2025-09-06 09:59:15'),
(82, 82, 'Explanation', 'The recommended daily amount for most adults is 600 to 800 international units (IU), helping maintain bone and immune health.', 0, '2025-09-06 09:59:46', '2025-09-06 09:59:46'),
(83, 83, ' Multiple Radio Explanation Heading', ' Multiple Radio Proper tracheostomy suctioning follows a systematic approach to ensure patient safety and effectiveness', 0, '2025-09-06 11:09:22', '2025-09-06 11:09:22'),
(84, 84, ' Explanation', 'Elevated serum creatinine suggests impaired kidney function, so admission and IV fluids are warranted if acute renal failure is suspected and symptomatic.', 0, '2025-09-06 11:36:56', '2025-09-06 11:36:56'),
(85, 85, 'Explanation', 'The recommended daily amount for most adults is 600 to 800 international units (IU), helping maintain bone and immune health.', 0, '2025-09-06 12:35:17', '2025-09-06 12:35:17'),
(86, 86, 'Explanation', 'The recommended daily amount for most adults is 600 to 800 international units (IU), helping maintain bone and immune health.', 0, '2025-09-06 12:37:04', '2025-09-06 12:37:04'),
(87, 87, 'Explanation', 'Proper tracheostomy suctioning follows a systematic approach to ensure patient safety and effectiveness. The correct sequence maintains sterility, prevents hypoxia, and ensures adequate airway clearance.', 0, '2025-09-06 12:40:03', '2025-09-06 12:40:03'),
(88, 88, ' Multiple Radio Explanation Heading', ' Multiple Radio Proper tracheostomy suctioning follows a systematic approach to ensure patient safety and effectiveness', 0, '2025-09-06 12:46:03', '2025-09-06 12:46:03'),
(89, 89, ' Multiple Radio Explanation Heading', ' Multiple Radio Proper tracheostomy suctioning follows a systematic approach to ensure patient safety and effectiveness', 0, '2025-09-06 12:50:58', '2025-09-06 12:50:58'),
(90, 90, ' Multiple Radio Explanation Heading', ' Multiple Radio Proper tracheostomy suctioning follows a systematic approach to ensure patient safety and effectiveness', 0, '2025-09-06 12:53:03', '2025-09-06 12:53:03'),
(91, 91, 'Multiple Radio Explanation Heading', 'Multiple Radio Proper tracheostomy suctioning follows a systematic approach to ensure patient safety and effectiveness', 0, '2025-09-06 13:09:07', '2025-09-06 13:09:07'),
(92, 92, NULL, NULL, 0, '2025-09-06 13:24:31', '2025-09-06 13:24:31'),
(93, 93, 'Explanation', 'The recommended daily amount for most adults is 600 to 800international units (IU), helping maintain bone and immune health.info:Vitamin D can be obtained from sunlight exposure, food sources, andsupplements.', 0, '2025-09-07 07:03:59', '2025-09-07 07:03:59'),
(94, 94, 'Explanation', 'The recommended daily amount for most adults is 600 to 800international units (IU), helping maintain bone and immune health.', 0, '2025-09-07 07:06:56', '2025-09-07 07:06:56'),
(95, 95, 'Explanation', 'Elevated serum creatinine suggests impaired kidney function, soadmission and IV fluids are warranted if acute renal failure is suspected andsymptomatic.', 0, '2025-09-07 07:41:30', '2025-09-07 07:41:30'),
(96, 96, 'Multiple Radio Explanation Heading', 'Multiple Radio Proper tracheostomy suctioning follows a systematicapproach to ensure patient safety and effectiveness', 0, '2025-09-07 07:46:45', '2025-09-07 07:46:45'),
(97, 97, 'Multiple Radio Explanation Heading', 'Multiple Radio Proper tracheostomy suctioning follows asystematic approach to ensure patient safety and effectivenessinfo: Multiple Radio Tracheostomy suctioning should be performed usingsterile technique with appropriate pressure settings (80-120 mmHg foradults) to prevent tissue trauma.', 0, '2025-09-07 07:56:30', '2025-09-07 07:56:30'),
(98, 98, 'Explanation', 'Proper tracheostomy suctioning follows a systematic approach toensure patient safety and effectiveness. The correct sequence maintains sterility,prevents hypoxia, and ensures adequate airway clearance.', 0, '2025-09-07 07:59:41', '2025-09-07 07:59:41'),
(99, 99, 'Multiple Radio Explanation Heading', 'Multiple Radio Proper tracheostomy suctioning follows a systematicapproach to ensure patient safety and effectivenessinfo: Multiple Radio Tracheostomy suctioning should be performed using steriletechnique with appropriate pressure settings (80-120 mmHg for adults) to preventtissue trauma.', 0, '2025-09-07 08:03:58', '2025-09-07 08:03:58'),
(100, 100, 'Multiple Radio Explanation Heading', 'Multiple Radio Proper tracheostomy suctioning follows a systematic approach to ensure patient safety and effectiveness', 0, '2025-09-08 04:11:53', '2025-09-08 04:11:53'),
(101, 101, 'Multiple Radio Explanation Heading', 'Multiple Radio Proper tracheostomy suctioning follows a systematic approach to ensure patient safety and effectiveness', 0, '2025-09-08 04:28:40', '2025-09-08 04:28:40'),
(102, 106, 'Explanation', 'The recommended daily amount for most adults is 600 to 800 international units (IU), helping maintain bone and immune health.', 0, '2025-09-08 16:10:37', '2025-09-08 16:10:37'),
(103, 107, 'Explanation', 'The recommended daily amount for most adults is 600 to 800 international units (IU), helping maintain bone and immune health.', 0, '2025-09-08 16:34:30', '2025-09-08 16:34:30'),
(104, 108, ' Explanation', 'Elevated serum creatinine suggests impaired kidney function, so admission and IV fluids are warranted if acute renal failure is suspected and symptomatic.', 0, '2025-09-08 18:03:15', '2025-09-08 18:03:15'),
(105, 109, 'Multiple Radio Explanation Heading', 'Multiple Radio Proper tracheostomy suctioning follows a systematic approach to ensure patient safety and effectiveness', 0, '2025-09-08 18:43:13', '2025-09-08 18:43:13'),
(106, 110, 'Multiple Radio Explanation Heading', 'Multiple Radio Proper tracheostomy suctioning follows a systematic approach to ensure patient safety and effectiveness', 0, '2025-09-08 18:52:10', '2025-09-08 18:52:10'),
(107, 111, 'Multiple Radio Explanation Heading', 'Multiple Radio Proper tracheostomy suctioning follows a systematic approach to ensure patient safety and effectiveness', 0, '2025-09-08 18:52:55', '2025-09-08 18:52:55'),
(108, 115, ' Multiple Radio Explanation Heading', ' Multiple Radio Proper tracheostomy suctioning follows a systematic approach to ensure patient safety and effectiveness', 0, '2025-09-08 19:32:18', '2025-09-08 19:32:18'),
(109, 116, ' Multiple Radio Explanation Heading', ' Multiple Radio Proper tracheostomy suctioning follows a systematic approach to ensure patient safety and effectiveness', 0, '2025-09-08 20:09:52', '2025-09-08 20:09:52'),
(110, 117, '777777777', '1234567890--------------', 0, '2025-09-09 03:35:07', '2025-09-09 03:35:07'),
(111, 118, 'Explanation', 'The recommended daily amount for most adults is 600 to 800 international units (IU), helping maintain bone and immune health.', 0, '2025-09-11 05:14:25', '2025-09-11 05:14:25'),
(112, 119, ' Multiple Radio Explanation Heading', ' Multiple Radio Proper tracheostomy suctioning follows a systematic approach to ensure patient safety and effectiveness', 0, '2025-09-11 05:14:45', '2025-09-11 05:14:45'),
(113, 120, ' Explanation', 'Elevated serum creatinine suggests impaired kidney function, so admission and IV fluids are warranted if acute renal failure is suspected and symptomatic.', 0, '2025-09-11 05:15:00', '2025-09-11 05:15:00'),
(114, 121, 'Explanation', 'Proper tracheostomy suctioning follows a systematic approach to ensure patient safety and effectiveness. The correct sequence maintains sterility, prevents hypoxia, and ensures adequate airway clearance.', 0, '2025-09-11 05:15:17', '2025-09-11 05:15:17'),
(115, 122, 'Explanation', 'Proper tracheostomy suctioning follows a systematic approach to ensure patient safety and effectiveness. The correct sequence maintains sterility, prevents hypoxia, and ensures adequate airway clearance.', 0, '2025-09-11 05:16:40', '2025-09-11 05:16:40'),
(116, 123, ' Multiple Radio Explanation Heading', ' Multiple Radio Proper tracheostomy suctioning follows a systematic approach to ensure patient safety and effectiveness', 0, '2025-09-11 05:17:10', '2025-09-11 05:17:10'),
(117, 124, '23456789', '234567890poiuytrewasdfghjkl', 0, '2025-09-11 05:40:04', '2025-09-11 05:40:04'),
(118, 125, 'Create a drag and drop question with multiple tabs and draggable sections.', 'Create a drag and drop question with multiple tabs and draggable sections.', 0, '2025-09-11 10:08:22', '2025-09-11 10:08:22'),
(119, 126, 'tabs and draggable sections.', 'tabs and draggable sections.', 0, '2025-09-11 10:29:53', '2025-09-11 10:29:53'),
(120, 127, 'Explanation', 'Choice D is correct. The hemoglobin A1C value of 6.1% shown is abnormal (normal HgbA1c is below\n5.7). Prediabetes is a hemoglobin A1C value from 5.7% to 6.4%. The nurse should educate the client\non lifestyle changes such as exercise and consuming foods low in simple carbohydrates. The HgbA1C\nand fasting blood glucose levels need to be monitored with the goal of both trending downward. If\nthe trend continues, the client risks diabetes mellitus which is diagnosed at a hemoglobin A1C of 6.5%\nor greater.\nChoice A is incorrect. Although elevated blood sugar levels can be associated with an increased risk of\ninfections, the given HbA1C level of 6.1% indicates impaired glucose metabolism rather than a severe\nhyperglycemic state that would warrant an immediate assessment for infection.\nChoice B is incorrect. An HbA1C level of 6.1% is above the normal range (typically less than 5.7%).\nInstructing the client that the results are within normal limits would be inaccurate and misleading.\nChoice C is incorrect. This option is not necessary because the HbA1C level, which reflects average\nblood glucose levels over the past two to three months, indicates impaired glucose metabolism.\nGlycosuria (glucose in the urine) occurs when blood glucose levels are consistently elevated and the\nkidneys cannot reabsorb all the glucose. While glycosuria can be a sign of diabetes, it might not\nalways be present, especially in the early stages or with mildly elevated blood sugar levels.', 0, '2025-09-15 07:35:27', '2025-09-15 07:35:27'),
(121, 128, 'Explanation', 'The nurse should be concerned with the client reporting symmetrical paresthesias, forgetfulness,\nfatigue, and oral ulcers found during the physical examination. These manifestations suggest a\ncomplication following this type of surgery.\nThe nurse is not concerned with the other findings.\nLosing weight is a therapeutic finding as clients after this surgery typically lose 1 to 2 pounds a week\nfor the first year after this procedure.\nThe surgery intends to reduce the calorie intake and make the client feel fuller sooner. Excess skin is\ncommon as the client starts to lose weight. Skin removal surgeries usually occur once the client gets\nto an appropriate weight', 0, '2025-09-15 07:41:04', '2025-09-15 07:41:04'),
(122, 129, 'Explanation', 'The recommended daily amount for most adults is 600 to 800 international units (IU), helping maintain bone and immune health.', 0, '2025-09-16 09:06:30', '2025-09-16 09:06:30'),
(123, 130, 'wertyui', '1234567890-wertyunnn', 0, '2025-09-16 09:21:23', '2025-09-16 09:21:23'),
(124, 131, 'Explanation', 'The recommended daily amount for most adults is 600 to 800 international units (IU), helping maintain bone and immune health.', 0, '2025-09-16 10:04:01', '2025-09-16 10:04:01'),
(125, 132, 'Explanation', 'Explanation\nChoices A, C, D, and E, are correct. Prolonged labor with hypotonic contractions is classified as labor dystocia. Labor dystocia is a broad term that indicates that labor is not progressing. Key interventions for a client experiencing labor dystocia include encouraging the client to void frequently (when she feels the urge) because a full bladder will impede uterine contractions. A potential infusion of oxytocin to augment uterine contractions is a plausible prescription to be anticipated from the primary healthcare provider (PHCP). Frequent maternal repositioning is a key and noninvasive intervention that helps with fetal descent and effective contractions. The nurse should keep the client upright and encourage frequent repositioning. Fluid and electrolyte imbalances may be a cause of stunted labor. The nurse should be prepared to administer parenteral fluids because fluid and electrolyte abnormalities may cause labor dystocia.\n\nChoice B is incorrect. Strict bedrest is not an effective intervention considering her hypotonic labor. Dystocia can present in different forms, but a key intervention is frequent maternal repositioning, especially upright. This could be the client ambulating or standing upright under a warm shower.', 0, '2025-09-16 17:12:24', '2025-09-16 17:12:24'),
(126, 133, 'Explanation', 'Choice C is correct. Assessing if the patient is responsive is the primary concern of the nurse in this example.\n\nChoices A and B are incorrect. The client’s responsiveness is a priority before moving the client.\n\nChoice D is incorrect. This answer choice would be the least important among the choices given.\n\nNCSBN Client Need Topic: Safe and Effective Care Environment, Subtopic: Safety and Infection Control - Falls', 0, '2025-09-16 17:16:29', '2025-09-16 17:16:29'),
(127, 134, 'Explanation', 'Choice B is correct. Some redness at the surgical site is a normal finding three days after surgery. Signs of infection include pus, excess wound drainage, increasing warmth from the wound, and red streaks from the site.\n\nChoice A is incorrect. While light, clear drainage is an expected finding three days post-operatively, pus drainage is not. Pus indicates a developing infection.\n\nChoice C is incorrect. While some heat is normal, an increase in temperature produced by the wound indicates infection at the site.\n\nChoice D is incorrect. Red streaks indicate a potentially dangerous infection at the wound and could mean the development of a disease and even sepsis.\n\n\nRelated Videos', 0, '2025-09-16 17:18:47', '2025-09-16 17:18:47'),
(128, 135, 'Explanation', 'Choice C is correct.  Metoprolol is known to cause bradycardia as one of its pharmacodynamic effects. Therefore, clients taking metoprolol should monitor their heart rate regularly and report any significant changes to their healthcare provider. \n\nChoice A is incorrect. Stopping metoprolol suddenly can lead to rebound hypertension, so clients should be advised never to discontinue the medication abruptly without consulting their healthcare provider. Instead, they should be instructed to report any adverse effects promptly. \n\nChoice B is incorrect. Metoprolol is a beta-blocker that works by blocking beta-adrenergic receptors, resulting in decreased heart rate and blood pressure. It does not affect the production of angiotensin II. \n\nChoice D is incorrect. Unlike some medications, taking metoprolol with food does not significantly affect its absorption. It can be taken with or without food, but consistent dosing is essential for maintaining therapeutic blood levels.', 0, '2025-09-16 17:21:22', '2025-09-16 17:21:22'),
(129, 136, 'Explanation', 'Choice B is correct. It is appropriate for the nurse to advise the client to increase their fiber intake. Dietary fiber and bulk help produce bulky, soft stools and establish regular bowel elimination habits. The patient should ingest about 30 to 40 g of fiber each day.\n\nChoices A, C, and D are incorrect. Dairy may be a trigger for a client with IBS, and while triggers are individualized, dairy is likely a trigger for an IBS flare. Fat and calcium has no bearing on IBS management, and the emphasis should be on the intake of fiber.', 0, '2025-09-16 17:23:56', '2025-09-16 17:23:56'),
(130, 137, 'Explanation', 'Choice D is correct. The client is manifesting signs of disseminated intravascular coagulation (DIC). This critical complication often happens in the intensive care unit and is usually secondary to other serious etiologies such as sepsis. In this condition, the clotting system is activated significantly, leading to platelet consumption and clotting factors. DIC can manifest with either bleeding or clotting complications. Thrombocytopenia (low platelet count), coagulopathy (increased prothrombin time, increased partial thromboplastin time, decreased fibrinogen), and hemolysis are hallmarks of DIC. The nurse needs to notify the physician of this critical condition change.\n\nChoice A is incorrect. The client having septic shock makes them highly likely to develop this complication. Heparin could cause heparin-induced thrombocytopenia. However, heparin does not cause disseminated intravascular coagulation (DIC). The client\'s admitting diagnosis and bleeding from the IV site coincide with the causation of this disorder.\n\nChoice B is incorrect. Reviewing the client\'s lactic acid level would be irrelevant to the client developing DIC. This level helps determine if the client is responding to antibiotics, intravenous fluids, and supplemental oxygen. A serum lactic acid level greater than 2 mmol/L or greater may indicate sepsis.\n\nChoice C is incorrect. Assessing the client\'s oxygen saturation may also be performed later. The client is not in apparent respiratory distress based on the information presented. Hypoxia is not the cause of his bleeding complications. DIC should be suspected in this bleeding, septic client, and the nurse must notify the physician immediately since urgent intervention is needed', 0, '2025-09-16 17:26:37', '2025-09-16 17:26:37'),
(131, 138, 'Explanation', 'Choices A, C, and E are correct. These actions are appropriate during the process of log-rolling a client. It is appropriate for a client who is to be log rolled to have a pillow placed between the client\'s knees to prevent tension on the spinal column and adduction of the hip. Fanning out a draw sheet under the client enables staff to have strong handles to grip without slipping. The purpose of log rolling a client is to move the client in one smooth, continuous motion to prevent twisting of the spinal column.\n\nChoice B is incorrect. To prevent a client from injuring their arms, the client should cross their arms across their chest during the repositioning.  \n\nChoice D is incorrect. Instructing the client to laterally flex the neck would defeat the purpose of log rolling, as this action causes twisting of the spinal column.', 0, '2025-09-16 17:30:29', '2025-09-16 17:30:29'),
(132, 139, 'Explanation', 'Choices B and E are correct. An interdisciplinary care conference is where the nurse can get the necessary medical professionals to develop one big care plan for the client. A client with an ischemic stroke with hemiplegia will require interdisciplinary care such as occupational and physical therapy. Further, the client may require subacute rehabilitation provided by nursing. A client with a fractured tibia and fibula will require physical therapy and social services consultation to assist the client with housing.\n\nChoices A, C, D, and F are incorrect. A client with pulmonary tuberculosis requiring multiple prescriptions will require nursing care to reinforce teaching on the therapies. Additionally, a client scheduled for surgery will require nursing care until discharge. Further, a client with stage one Alzheimer\'s disease can still live independently even though this client is going to reside with family. Finally, a client refusing care will require counseling from nursing and not any other specialty.', 0, '2025-09-16 17:33:36', '2025-09-16 17:33:36'),
(133, 140, 'Explanation', 'Choice D is correct. This comment indicates a learning need for this unlicensed assistive personnel (UAP) relating to the therapeutic milieu. A therapeutic milieu has consistent boundaries that are adhered to by all members of the healthcare team. Milieu therapy takes advantage of the naturally occurring events in the client\'s environment to utilize these events as learning opportunities for clients. A consistent routine and structure are maintained to provide clients with predictability and trust.\n\nChoice A is incorrect. Nothing about this comment indicates this unlicensed assistive personnel (UAP) favors this client over any other client who has not received telephone privileges at this point. Therefore, the statement should not be construed as such.\n\nChoice B is incorrect. Although it may initially appear that the unlicensed assistive personnel (UAP) is ensuring the equal rights of all clients, this action indicates that this unlicensed assistive personnel (UAP) is not only not adhering to the client\'s established boundaries, but lacks a fundamental understanding of the therapeutic milieu. Of note, according to federal law, under certain instances, a mental health care provider (HCP) may restrict a client\'s rights to mail, telephone, and/or visitors, but only with a written order that must be periodically reviewed for renewal.\n\nChoice C is incorrect. Nothing about the current fact pattern, the client\'s current telephone restriction, and/or the unlicensed assistive personnel\'s (UAP) actions appear to be related to the prevention of discrimination. Instead, the action by this unlicensed assistive personnel (UAP) to not adhere to the client\'s established boundaries demonstrates a lack of fundamental understanding of the therapeutic milieu.', 0, '2025-09-16 17:36:58', '2025-09-16 17:36:58'),
(134, 141, 'Explanation', 'Choice A is correct. Alcohol dependence is a significant risk factor for suicide. Alcohol dependence increases aggressivity and impulsivity and causes deterioration in cognitive capacity and flexibility to find constructive coping strategies. This can make the client feel quite emotional and engage in high-risk behaviors while having poor judgment. The suicide rate is 50 times higher in alcohol-dependent persons than in those who are not alcohol-dependent.\n\nChoice B is incorrect. Antidepressant use may temporarily increase the risk of suicide. However, the benefit of antidepressant medication far outweighs the risk. The risk for suicidal behavior is generally seen in the earlier part of treatment. This client has been taking this medication for five years, and the likelihood of it influencing suicide is low compared to if it was just started. Finally, antidepressant medications do not cause an impairment of insight and judgment, unlike alcohol.\n\nChoice C is incorrect. A chronic illness is a risk factor for suicide. However, psoriasis does not cause considerable pain or disability, unlike conditions such as HIV, cancer, and neurodegenerative disorders. Finally, psoriasis does not cause an impairment of insight and judgment, unlike alcohol.\n\nChoice D is incorrect. A support group would be a protective factor because it allows individuals to develop social ties. Loneliness is a risk factor for suicide, and having the client join a support/social network would be a reassuring finding.', 0, '2025-09-16 17:39:39', '2025-09-16 17:39:39'),
(135, 142, 'Explanation', 'Choice A is correct. By saying, \"Sometimes having a mental illness can feel very discouraging. I wonder how you are feeling?\" the nurse is expressing an understanding of the client\'s experience and emotions. This reflects empathy, which involves recognizing and understanding another person\'s feelings without necessarily sharing those feelings.\n\nChoice B is incorrect. This statement does not demonstrate reassurance. Reassurance would involve offering comfort or alleviating the client\'s fears.\n\nChoice C is incorrect. This statement does not demonstrate normalizing. Normalizing would involve making clients feel that their experience is common or typical.\n\nChoice D is incorrect. This statement does not demonstrate sympathy. Sympathy would involve feeling pity or sorrow for the client\'s situation, which is more of a feeling of \"sorry for\" than understanding and connecting with the client\'s feelings.', 0, '2025-09-16 17:49:13', '2025-09-16 17:49:13'),
(136, 143, '12345678', '1234567890-poiuytrew', 0, '2025-09-17 13:43:59', '2025-09-17 13:43:59'),
(137, 144, '333333333333', '123456789eefffffffff', 0, '2025-09-17 13:45:24', '2025-09-17 13:45:24'),
(138, 145, 'Provide detailed explanations to help students', 'Provide detailed explanations to help students', 0, '2025-09-17 14:10:56', '2025-09-17 14:10:56'),
(139, 146, 'Provide detailed explanations to help students', 'Provide detailed explanations to help students', 0, '2025-09-17 14:14:26', '2025-09-17 14:14:26'),
(140, 147, '12345678', '1234590o98765rewsdfghjk', 0, '2025-09-17 14:23:43', '2025-09-17 14:23:43'),
(141, 148, 'Explanation', 'The recommended daily amount for most adults is 600 to 800 international units (IU), helping maintain bone and immune health.', 0, '2025-09-17 14:29:08', '2025-09-17 14:29:08'),
(142, 149, 'Enter MCQ Question Content', 'Enter MCQ Question Content', 0, '2025-09-17 14:37:52', '2025-09-17 14:37:52'),
(143, 150, 'Enter MCQ Question Content', 'Enter MCQ Question Content', 0, '2025-09-17 14:40:47', '2025-09-17 14:40:47'),
(144, 151, 'Write the question your students will answer — be clear, concise, and clinically relevant.', 'Write the question your students will answer — be clear, concise, and clinically relevant.', 0, '2025-09-17 15:30:49', '2025-09-17 15:30:49'),
(145, 152, 'Multiple Radio Explanation Heading', 'Multiple Radio Proper tracheostomy suctioning follows a systematic approach to ensure patient safety and effectiveness. The correct sequence maintains sterility, prevents hypoxia, and ensures adequate airway clearance.', 0, '2025-09-17 16:12:55', '2025-09-17 16:12:55'),
(146, 153, 'Explanation', 'Choice D is correct. This observation requires follow-up because a belt restraint should be applied to the client’s waist – not the chest. Having a belt restraint secured over the client’s chest is inappropriate because it may restrict the client\'s chest rise and fall.\n\nChoice A is incorrect. This observation does not require follow-up. An indwelling urinary catheter drainage bag should hang freely from the bed frame (and not from the side rails). This keeps the system secure versus if it were on the side rails, which may cause trauma to the urinary tract when the side rail is lowered.\n\nChoice B is incorrect. This observation does not require follow-up. The client with delirium tremens should have seizure precautions applied, which include the insertion of a peripheral vascular access device in the event of the need to administer a prescribed benzodiazepine to terminate the seizure.\n\nChoice C is incorrect. This observation does not require follow-up. If a client has right-sided weakness, their ambulation device (cane, walker, etc.) should be placed on their stronger side.', 0, '2025-09-17 17:31:55', '2025-09-17 17:31:55'),
(147, 154, 'Explanation', 'Choice B is correct. Informed consent is a client\'s agreement to have a medical procedure performed following full disclosure of risks, benefits, alternatives, and consequences of refusal. The principles of autonomy and self-determination govern the practice of informed consent.\n\nChoice A is incorrect. Beneficence refers to taking positive actions to assist others. This concept is fundamental to the practice of both nursing and medicine alike. When one agrees to act with beneficence, the client\'s best interests will remain more important than one\'s self-interest. Although assisting a client in the informed consent process is a beneficent action, beneficence itself is not a principle governing the practice of informed consent.\n\nChoice C is incorrect. Nonmaleficence refers to the avoidance of harm or hurt. More specifically, ethical practice in health care involves the will to do good and an equal commitment to do no harm. Although nurses follow an ethical responsibility of nonmaleficence during the informed consent process, nonmaleficence is not a principle governing the practice of informed consent.\n\nChoice D is incorrect. Confidentiality is fundamental to the relationship between a nurse and a client. Although most laws mandate that the nurse adheres to confidentiality regulations, confidentiality is not a governing principle of informed consent.', 0, '2025-09-17 17:41:32', '2025-09-17 17:41:32'),
(148, 155, 'Explanation', 'Choice D is correct. Characteristics of the total patient care model include: the RN being responsible for all aspects of care during a shift of care, care can be delegated, and the RN works directly with the patient, family, and health care team members.\n\nChoices A and C are incorrect. The RN having responsibility for a caseload of patients and providing care for the same patients during their hospital stay are characteristics related to the primary nursing model.\n\nChoice B is incorrect. In team nursing, team members provide patient care under the supervision of the RN team leader.', 0, '2025-09-17 17:51:18', '2025-09-17 17:51:18'),
(149, 156, 'Explanation', 'Choice D is correct. This task is appropriate to delegate to the UAP. Gathering supplies (suction, vital sign equipment, etc.) is within the scope of a UAP.\n\nChoices A, B, and C are incorrect. Setting up the sterile field is not within the scope of a UAP because UAPs do not perform any sterile tasks. Palpating the bladder for distention is an assessment and not within the scope of a UAP. Finally, explaining the procedure should not come from the UAP; rather, this explanation should be from the nurse.', 0, '2025-09-17 17:54:29', '2025-09-17 17:54:29'),
(150, 157, 'Explanation', 'Choice C is correct. This patient’s tumor originates in the breast. Breast cancer may spread locally into the chest wall and lymph nodes. Due to its proximity to the superior vena cava (SVC), a locally advanced tumor or metastatic lymph node enlargement in the chest may obstruct blood flow to and from the superior vena cava. Such an obstruction results in venous congestion (puffiness in the face/ neck) and jugular-venous distension. Frequent clinical features of venous congestion in superior vena cava syndrome include blurred vision, hoarse voice, stridor, dyspnea, and nasal congestion.\n\nChoices A, B, and D are incorrect. These do not explain the patient\'s presentation. Spinal cord compression (choice A) may present with motor and sensory deficits, not puffy face and dyspnea. Non-Hodgkin\'s lymphoma (choice B) may cause SVC obstruction. However, the client has breast cancer, likely responsible for the SVC obstruction, not an occult lymphoma. Shock (choice D) presents with hypotension and impaired perfusion, not a puffy face and stridor.', 0, '2025-09-17 17:56:55', '2025-09-17 17:56:55'),
(151, 158, 'Explanation', 'Choice B is correct. Peer relationships are significant to an adolescent. To meet the client\'s psychosocial needs, it would be appropriate for the nurse to arrange a visit from the client\'s peers.\n\nChoice A is incorrect. Adolescents become less reliant on parental relationships and focus more on peer relationships. While this would not be harmful, it would not be the most helpful option for the nurse to pursue.\n\nChoice C is incorrect. Optimal pain control following surgery is always a priority for the client in the postoperative period. While a PCA may assist with the client having autonomy over their pain control, this would not satisfy a psychosocial need.\n\nChoice D is incorrect. Promoting meals high in protein and vitamin C is recommended to promote wound healing following surgery. However, this would satisfy a physical need, not a psychosocial need.', 0, '2025-09-17 17:59:35', '2025-09-17 17:59:35');
INSERT INTO `tb_explanation` (`id`, `questionId`, `heading`, `explanation`, `isDeleted`, `createdAt`, `updatedAt`) VALUES
(152, 159, 'Explanation', 'Choice A is correct. A simple observation, the level of consciousness, is widely recognized as the most sensitive indicator to a change, either improvement or deterioration, in a child\'s neurological status. Any changes, such as increased irritability or lethargy, should be reported to the healthcare provider.\n\nChoice B is incorrect. Blood pressure would not be an early indicator of neurological change. Blood pressure changes occur later during neurological deterioration, specifically, systolic hypertension, which is found in increased intracranial pressure (ICP).\n\nChoice C is incorrect. Direct ICP measurements are possible through a catheter inserted directly into the epidural space, but changes in ICP will manifest later than changes in a child\'s level of consciousness.\n\nChoice D is incorrect. A pupil assessment is an essential component of a neurological exam, but changes in the pupils would be a very late sign of an issue. Alterations in the LOC would be one of the earliest signs of worsening', 0, '2025-09-18 02:23:42', '2025-09-18 02:23:42'),
(153, 160, 'Explanation', 'Choice A is correct. A complication of transsphenoidal hypophysectomy is meningitis. The client needs to be immediately assessed for other manifestations of meningitis, including photophobia, nuchal rigidity, and altered mentation. Complications following this surgery include CSF leakage, infection, optic nerve damage, and diabetes insipidus.\n\nChoice B is incorrect. A pneumothorax produces diminished to absent breath sounds on the affected side due to lung collapse. Therefore, chest tube treatment aims to increase negative pressure in the pleural space to promote lung expansion. This is an expected finding.\n\nChoice C is incorrect. Albuterol stimulates the release of the body\'s epinephrine, which can cause the client to feel nervous or jittery. This, along with an elevated heart rate, is expected and will resolve a few hours after the treatment.\n\nChoice D is incorrect. Peritoneal dialysis is when the client instills hypertonic fluid into the peritoneum to draw out waste products. Cramping during fluid instillation is common and can be mitigated by warming the solution and slowing down fluid instillation.', 0, '2025-09-18 02:30:17', '2025-09-18 02:30:17'),
(154, 161, 'Create a multiple radio question with tabs and sentence-based radio selections.', 'Create a multiple radio question with tabs and sentence-based radio selections.', 0, '2025-09-18 13:31:34', '2025-09-18 13:31:34'),
(155, 162, 'Explanation', 'Elevated serum creatinine suggests impaired kidney function, soadmission and IV fluids are warranted if acute renal failure is suspected andsymptomatic.', 0, '2025-09-18 14:22:07', '2025-09-18 14:22:07'),
(156, 163, 'Explanation', 'Elevated serum creatinine suggests impaired kidney function, soadmission and IV fluids are warranted if acute renal failure is suspected andsymptomatic.', 0, '2025-09-18 14:30:12', '2025-09-18 14:30:12'),
(157, 164, 'Explanation', 'Elevated serum creatinine suggests impaired kidney function, soadmission and IV fluids are warranted if acute renal failure is suspected andsymptomatic.', 0, '2025-09-18 14:34:35', '2025-09-18 14:34:35'),
(158, 165, 'Multiple Radio Explanation Heading', 'Multiple Radio Proper tracheostomy suctioning follows a systematic approach to ensure patient safety and effectiveness', 0, '2025-09-19 07:14:05', '2025-09-19 07:14:05'),
(159, 166, 'Multiple Radio Explanation Heading', 'Multiple Radio Proper tracheostomy suctioning follows a systematic approach to ensure patient safety and effectiveness', 0, '2025-09-19 07:15:09', '2025-09-19 07:15:09'),
(160, 167, 'Multiple Radio Explanation Heading', 'Multiple Radio Proper tracheostomy suctioning follows a systematic approach to ensure patient safety and effectiveness', 0, '2025-09-19 08:02:51', '2025-09-19 08:02:51');

-- --------------------------------------------------------

--
-- Table structure for table `tb_fillTheBlanks`
--

CREATE TABLE `tb_fillTheBlanks` (
  `id` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  `question_text` varchar(500) NOT NULL,
  `answers` varchar(500) NOT NULL,
  `blankOrNot` varchar(500) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tb_fillTheBlanks`
--

INSERT INTO `tb_fillTheBlanks` (`id`, `question_id`, `question_text`, `answers`, `blankOrNot`, `createdAt`, `updatedAt`) VALUES
(1, 33, '1234567890-', '1234567890-', 'false', '2025-08-26 03:51:27', '2025-08-26 03:51:27'),
(2, 103, 'Turn on the suction device and set appropriate pressure.', 'some disease', 'true', '2025-09-08 04:38:00', '2025-09-08 04:38:00'),
(3, 103, 'and', 'symptoms', 'true', '2025-09-08 04:38:00', '2025-09-08 04:38:00'),
(4, 103, 'if the condition is not managed', '', 'false', '2025-09-08 04:38:00', '2025-09-08 04:38:00'),
(5, 112, 'Turn on the suction device and set appropriate pressure.', 'some disease', 'true', '2025-09-08 18:59:52', '2025-09-08 18:59:52'),
(6, 112, 'and', 'symptoms', 'true', '2025-09-08 18:59:53', '2025-09-08 18:59:53'),
(7, 112, 'if the condition is not managed', '', 'false', '2025-09-08 18:59:53', '2025-09-08 18:59:53'),
(8, 113, 'Turn on the suction device and set appropriate pressure.', 'some disease', 'true', '2025-09-08 19:01:20', '2025-09-08 19:01:20'),
(9, 113, 'and', 'symptoms', 'true', '2025-09-08 19:01:20', '2025-09-08 19:01:20'),
(10, 113, 'if the condition is not managed', '', 'false', '2025-09-08 19:01:20', '2025-09-08 19:01:20'),
(11, 114, 'Turn on the suction device and set appropriate pressure.', 'some disease', 'true', '2025-09-08 19:26:26', '2025-09-08 19:26:26'),
(12, 114, 'and', 'symptoms', 'true', '2025-09-08 19:26:26', '2025-09-08 19:26:26'),
(13, 114, 'if the condition is not managed', '', 'false', '2025-09-08 19:26:26', '2025-09-08 19:26:26');

-- --------------------------------------------------------

--
-- Table structure for table `tb_fillTheBlanks_options`
--

CREATE TABLE `tb_fillTheBlanks_options` (
  `id` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  `option_heading` varchar(500) NOT NULL,
  `options_vlaue` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tb_marklist`
--

CREATE TABLE `tb_marklist` (
  `id` int(11) NOT NULL,
  `studentId` int(11) DEFAULT NULL,
  `testId` int(11) DEFAULT NULL,
  `testStatus` tinyint(4) DEFAULT NULL COMMENT '1-ongoing,2-completed',
  `mark` double DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tb_mcqAnswers`
--

CREATE TABLE `tb_mcqAnswers` (
  `id` int(11) NOT NULL,
  `questionId` int(11) NOT NULL,
  `mcqAnswer` varchar(255) NOT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tb_mcqAnswers`
--

INSERT INTO `tb_mcqAnswers` (`id`, `questionId`, `mcqAnswer`, `createdAt`, `updatedAt`) VALUES
(24, 107, '400 IU', '2025-09-08 16:34:30', '2025-09-08 16:34:30'),
(25, 107, '600–800 IU', '2025-09-08 16:34:30', '2025-09-08 16:34:30'),
(26, 118, '400 IU', '2025-09-11 05:14:24', '2025-09-11 05:14:24'),
(27, 118, '600–800 IU', '2025-09-11 05:14:24', '2025-09-11 05:14:24'),
(28, 129, '400 IU', '2025-09-16 09:06:29', '2025-09-16 09:06:29'),
(29, 129, '600–800 IU', '2025-09-16 09:06:29', '2025-09-16 09:06:29'),
(30, 130, '12345', '2025-09-16 09:21:23', '2025-09-16 09:21:23'),
(31, 131, '400 IU', '2025-09-16 10:04:00', '2025-09-16 10:04:00'),
(32, 131, '600–800 IU', '2025-09-16 10:04:00', '2025-09-16 10:04:00'),
(33, 132, 'A. Encourage frequent voiding', '2025-09-16 17:12:24', '2025-09-16 17:12:24'),
(34, 132, 'C. Prepare for a prescribed infusion of oxytocin', '2025-09-16 17:12:24', '2025-09-16 17:12:24'),
(35, 132, 'D. Encourage frequent repositioning', '2025-09-16 17:12:24', '2025-09-16 17:12:24'),
(36, 132, 'E. Prepare for an infusion of intravenous (IV) fluids', '2025-09-16 17:12:24', '2025-09-16 17:12:24'),
(37, 133, 'C. Establish if the client is responsive ', '2025-09-16 17:16:29', '2025-09-16 17:16:29'),
(38, 134, 'B. Some redness along the edges of the site', '2025-09-16 17:18:47', '2025-09-16 17:18:47'),
(39, 135, ' C. \"I should monitor my heart rate regularly as metoprolol can cause bradycardia.\"', '2025-09-16 17:21:22', '2025-09-16 17:21:22'),
(40, 136, 'B. fiber intake. ', '2025-09-16 17:23:56', '2025-09-16 17:23:56'),
(41, 137, '  D. Notify the primary healthcare provider (PHCP)', '2025-09-16 17:26:37', '2025-09-16 17:26:37'),
(42, 138, 'A. Place a small pillow between the client\'s knees.   ', '2025-09-16 17:30:29', '2025-09-16 17:30:29'),
(43, 138, 'C. Fanfold a drawsheet along the backside of the client.', '2025-09-16 17:30:29', '2025-09-16 17:30:29'),
(44, 138, 'E. Roll the client as one unit in a smooth, continuous motion.', '2025-09-16 17:30:29', '2025-09-16 17:30:29'),
(45, 139, 'B. ischemic stroke who has left-sided hemiplegia. ', '2025-09-16 17:33:36', '2025-09-16 17:33:36'),
(46, 139, 'E. fractured tibia and fibula and is homeless. ', '2025-09-16 17:33:36', '2025-09-16 17:33:36'),
(47, 140, 'D. This comment indicates a learning need for the unlicensed assistive personnel (UAP) relating to the therapeutic milieu.', '2025-09-16 17:36:58', '2025-09-16 17:36:58'),
(48, 141, 'A. having alcohol dependence.   ', '2025-09-16 17:39:39', '2025-09-16 17:39:39'),
(49, 142, 'A. empathy.     ', '2025-09-16 17:49:13', '2025-09-16 17:49:13'),
(50, 143, '5678', '2025-09-17 13:43:59', '2025-09-17 13:43:59'),
(51, 143, '1111', '2025-09-17 13:43:59', '2025-09-17 13:43:59'),
(52, 144, '12345', '2025-09-17 13:45:24', '2025-09-17 13:45:24'),
(53, 145, '12345', '2025-09-17 14:10:56', '2025-09-17 14:10:56'),
(54, 146, '1234', '2025-09-17 14:14:26', '2025-09-17 14:14:26'),
(55, 147, '12345', '2025-09-17 14:23:43', '2025-09-17 14:23:43'),
(56, 148, '400 IU', '2025-09-17 14:29:07', '2025-09-17 14:29:07'),
(57, 148, '600–800 IU', '2025-09-17 14:29:07', '2025-09-17 14:29:07'),
(58, 149, '12345', '2025-09-17 14:37:52', '2025-09-17 14:37:52'),
(59, 150, '12345', '2025-09-17 14:40:47', '2025-09-17 14:40:47'),
(60, 151, '12345', '2025-09-17 15:30:49', '2025-09-17 15:30:49'),
(61, 153, 'D. a belt restraint was applied and secured over the chest.', '2025-09-17 17:31:55', '2025-09-17 17:31:55'),
(62, 154, 'B. autonomy.', '2025-09-17 17:41:32', '2025-09-17 17:41:32'),
(63, 155, '  D. The RN is responsible for all aspects of care during a shift of care.', '2025-09-17 17:51:18', '2025-09-17 17:51:18'),
(64, 156, 'D. Place the urinary catheter kit at the bedside', '2025-09-17 17:54:29', '2025-09-17 17:54:29'),
(65, 157, 'C. Superior vena cava syndrome ', '2025-09-17 17:56:55', '2025-09-17 17:56:55'),
(66, 158, 'B. arrange for his peers to visit him.', '2025-09-17 17:59:35', '2025-09-17 17:59:35'),
(67, 159, 'A. Level of consciousness    ', '2025-09-18 02:23:42', '2025-09-18 02:23:42'),
(68, 160, 'A. three days postoperative following transsphenoidal hypophysectomy and has a temperature of 101°F (38.3°C).  ', '2025-09-18 02:30:17', '2025-09-18 02:30:17');

-- --------------------------------------------------------

--
-- Table structure for table `tb_mcqOptions`
--

CREATE TABLE `tb_mcqOptions` (
  `id` int(11) NOT NULL,
  `option` varchar(255) NOT NULL,
  `isDeleted` tinyint(1) DEFAULT 0,
  `questionId` int(11) NOT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tb_mcqOptions`
--

INSERT INTO `tb_mcqOptions` (`id`, `option`, `isDeleted`, `questionId`, `createdAt`, `updatedAt`) VALUES
(197, 'A. Encourage frequent voiding', 0, 132, '2025-09-16 17:12:24', '2025-09-16 17:12:24'),
(198, 'B. Maintain strict bedrest', 0, 132, '2025-09-16 17:12:24', '2025-09-16 17:12:24'),
(199, 'C. Prepare for a prescribed infusion of oxytocin', 0, 132, '2025-09-16 17:12:24', '2025-09-16 17:12:24'),
(200, 'D. Encourage frequent repositioning', 0, 132, '2025-09-16 17:12:24', '2025-09-16 17:12:24'),
(201, 'E. Prepare for an infusion of intravenous (IV) fluids', 0, 132, '2025-09-16 17:12:24', '2025-09-16 17:12:24'),
(202, 'A. Call for help to get the client back in bed', 0, 133, '2025-09-16 17:16:29', '2025-09-16 17:16:29'),
(203, 'B. Assist the client back to bed', 0, 133, '2025-09-16 17:16:29', '2025-09-16 17:16:29'),
(204, 'C. Establish if the client is responsive', 0, 133, '2025-09-16 17:16:29', '2025-09-16 17:16:29'),
(205, 'D. Ask the client what happened', 0, 133, '2025-09-16 17:16:29', '2025-09-16 17:16:29'),
(206, 'A. Pus and clear drainage from the site', 0, 134, '2025-09-16 17:18:47', '2025-09-16 17:18:47'),
(207, 'B. Some redness along the edges of the site', 0, 134, '2025-09-16 17:18:47', '2025-09-16 17:18:47'),
(208, 'C. Increasing warmth from the wound', 0, 134, '2025-09-16 17:18:47', '2025-09-16 17:18:47'),
(209, 'D. Red streaks from the site', 0, 134, '2025-09-16 17:18:47', '2025-09-16 17:18:47'),
(210, 'A. \"I should stop taking metoprolol immediately if I experience any dizziness or lightheadedness.\"', 0, 135, '2025-09-16 17:21:22', '2025-09-16 17:21:22'),
(211, 'B. \"Metoprolol works by increasing the production of angiotensin II to lower blood pressure.\"', 0, 135, '2025-09-16 17:21:22', '2025-09-16 17:21:22'),
(212, 'C. \"I should monitor my heart rate regularly as metoprolol can cause bradycardia.\"', 0, 135, '2025-09-16 17:21:22', '2025-09-16 17:21:22'),
(213, 'D. \"It\'s essential to take metoprolol with a high-fat meal to enhance its absorption.', 0, 135, '2025-09-16 17:21:22', '2025-09-16 17:21:22'),
(214, 'A. dairy intake.', 0, 136, '2025-09-16 17:23:56', '2025-09-16 17:23:56'),
(215, 'B. fiber intake.', 0, 136, '2025-09-16 17:23:56', '2025-09-16 17:23:56'),
(216, 'C. fat intake.', 0, 136, '2025-09-16 17:23:56', '2025-09-16 17:23:56'),
(217, 'D. calcium intake.', 0, 136, '2025-09-16 17:23:56', '2025-09-16 17:23:56'),
(218, 'A. Assess if the client is receiving heparin products', 0, 137, '2025-09-16 17:26:37', '2025-09-16 17:26:37'),
(219, 'B. Review the client\'s most recent lactic acid level', 0, 137, '2025-09-16 17:26:37', '2025-09-16 17:26:37'),
(220, 'C. Assess the client\'s oxygen saturation', 0, 137, '2025-09-16 17:26:37', '2025-09-16 17:26:37'),
(221, 'D. Notify the primary healthcare provider (PHCP)', 0, 137, '2025-09-16 17:26:37', '2025-09-16 17:26:37'),
(222, 'A. Place a small pillow between the client\'s knees.', 0, 138, '2025-09-16 17:30:29', '2025-09-16 17:30:29'),
(223, 'B. Places the client\'s arms at their side.', 0, 138, '2025-09-16 17:30:29', '2025-09-16 17:30:29'),
(224, 'C. Fanfold a drawsheet along the backside of the client.', 0, 138, '2025-09-16 17:30:29', '2025-09-16 17:30:29'),
(225, 'D. Instruct the client to laterally flex the neck during the turn.', 0, 138, '2025-09-16 17:30:29', '2025-09-16 17:30:29'),
(226, 'E. Roll the client as one unit in a smooth, continuous motion.', 0, 138, '2025-09-16 17:30:29', '2025-09-16 17:30:29'),
(227, 'A. pulmonary tuberculosis with multiple prescriptions.', 0, 139, '2025-09-16 17:33:36', '2025-09-16 17:33:36'),
(228, 'B. ischemic stroke who has left-sided hemiplegia.', 0, 139, '2025-09-16 17:33:36', '2025-09-16 17:33:36'),
(229, 'C. hyperthyroidism and is scheduled for a thyroidectomy.', 0, 139, '2025-09-16 17:33:36', '2025-09-16 17:33:36'),
(230, 'D. stage one Alzheimer’s disease who lives with family.', 0, 139, '2025-09-16 17:33:36', '2025-09-16 17:33:36'),
(231, 'E. fractured tibia and fibula and is homeless.', 0, 139, '2025-09-16 17:33:36', '2025-09-16 17:33:36'),
(232, 'F. end-stage-renal disease who refuses dialysis.', 0, 139, '2025-09-16 17:33:36', '2025-09-16 17:33:36'),
(233, 'A. This comment demonstrates that the unlicensed assistive personnel (UAP) favors this client.', 0, 140, '2025-09-16 17:36:58', '2025-09-16 17:36:58'),
(234, 'B. This comment indicates that the unlicensed assistive personnel (UAP) is ensuring equal rights.', 0, 140, '2025-09-16 17:36:58', '2025-09-16 17:36:58'),
(235, 'C. This comment indicates that the unlicensed assistive personnel (UAP) is preventing discrimination.', 0, 140, '2025-09-16 17:36:58', '2025-09-16 17:36:58'),
(236, 'D. This comment indicates a learning need for the unlicensed assistive personnel (UAP) relating to the therapeutic milieu.', 0, 140, '2025-09-16 17:36:58', '2025-09-16 17:36:58'),
(237, 'A. having alcohol dependence.', 0, 141, '2025-09-16 17:39:39', '2025-09-16 17:39:39'),
(238, 'B. taking an antidepressant for the past five years.', 0, 141, '2025-09-16 17:39:39', '2025-09-16 17:39:39'),
(239, 'C. newly diagnosed with psoriasis.', 0, 141, '2025-09-16 17:39:39', '2025-09-16 17:39:39'),
(240, 'D. just started attending a support group for individuals with psoriasis.', 0, 141, '2025-09-16 17:39:39', '2025-09-16 17:39:39'),
(241, 'A. empathy.', 0, 142, '2025-09-16 17:49:13', '2025-09-16 17:49:13'),
(242, 'B. reassurance.', 0, 142, '2025-09-16 17:49:13', '2025-09-16 17:49:13'),
(243, 'C. normalizing.', 0, 142, '2025-09-16 17:49:13', '2025-09-16 17:49:13'),
(244, 'D. sympathy.', 0, 142, '2025-09-16 17:49:13', '2025-09-16 17:49:13'),
(253, '1234', 0, 146, '2025-09-17 14:14:26', '2025-09-17 14:14:26'),
(254, '12345', 0, 146, '2025-09-17 14:14:26', '2025-09-17 14:14:26'),
(255, '12345', 0, 147, '2025-09-17 14:23:43', '2025-09-17 14:23:43'),
(256, '1234', 0, 147, '2025-09-17 14:23:43', '2025-09-17 14:23:43'),
(257, '400 IU', 0, 148, '2025-09-17 14:29:07', '2025-09-17 14:29:07'),
(258, '600–800 IU', 0, 148, '2025-09-17 14:29:08', '2025-09-17 14:29:08'),
(259, '1,200 IU', 0, 148, '2025-09-17 14:29:08', '2025-09-17 14:29:08'),
(260, '2,000 IU', 0, 148, '2025-09-17 14:29:08', '2025-09-17 14:29:08'),
(261, '1234', 0, 149, '2025-09-17 14:37:52', '2025-09-17 14:37:52'),
(262, '12345', 0, 149, '2025-09-17 14:37:52', '2025-09-17 14:37:52'),
(263, '12345', 0, 150, '2025-09-17 14:40:47', '2025-09-17 14:40:47'),
(264, '12345rr', 0, 150, '2025-09-17 14:40:47', '2025-09-17 14:40:47'),
(265, '12345', 0, 151, '2025-09-17 15:30:49', '2025-09-17 15:30:49'),
(266, '123456', 0, 151, '2025-09-17 15:30:49', '2025-09-17 15:30:49'),
(267, '12345667', 0, 151, '2025-09-17 15:30:49', '2025-09-17 15:30:49'),
(268, 'A. an indwelling urinary catheter bag secured to the bed frame.', 0, 153, '2025-09-17 17:31:55', '2025-09-17 17:31:55'),
(269, 'B. delirium tremens having a peripheral vascular access device (VAD) inserted.', 0, 153, '2025-09-17 17:31:55', '2025-09-17 17:31:55'),
(270, 'C. right-sided weakness with their cane on the left side of the bed.', 0, 153, '2025-09-17 17:31:55', '2025-09-17 17:31:55'),
(271, 'D. a belt restraint was applied and secured over the chest.', 0, 153, '2025-09-17 17:31:55', '2025-09-17 17:31:55'),
(272, 'A. beneficence.', 0, 154, '2025-09-17 17:41:32', '2025-09-17 17:41:32'),
(273, 'B. autonomy.', 0, 154, '2025-09-17 17:41:32', '2025-09-17 17:41:32'),
(274, 'C. nonmaleficence.', 0, 154, '2025-09-17 17:41:32', '2025-09-17 17:41:32'),
(275, 'D. confidentiality.', 0, 154, '2025-09-17 17:41:32', '2025-09-17 17:41:32'),
(276, 'A. The RN assumes responsibility for a caseload of patients.', 0, 155, '2025-09-17 17:51:18', '2025-09-17 17:51:18'),
(277, 'B. The RN supervises team members providing direct patient care.', 0, 155, '2025-09-17 17:51:18', '2025-09-17 17:51:18'),
(278, 'C. The RN provides care for the same patients during their hospital stay.', 0, 155, '2025-09-17 17:51:18', '2025-09-17 17:51:18'),
(279, 'D. The RN is responsible for all aspects of care during a shift of care.', 0, 155, '2025-09-17 17:51:18', '2025-09-17 17:51:18'),
(280, 'A. Set up the sterile field', 0, 156, '2025-09-17 17:54:29', '2025-09-17 17:54:29'),
(281, 'B. Palpate the bladder for distention', 0, 156, '2025-09-17 17:54:29', '2025-09-17 17:54:29'),
(282, 'C. Explain the procedure to the client', 0, 156, '2025-09-17 17:54:29', '2025-09-17 17:54:29'),
(283, 'D. Place the urinary catheter kit at the bedside', 0, 156, '2025-09-17 17:54:29', '2025-09-17 17:54:29'),
(284, 'A. Spinal cord compression', 0, 157, '2025-09-17 17:56:55', '2025-09-17 17:56:55'),
(285, 'B. Non-Hodgkin’s Lymphoma (NHL)', 0, 157, '2025-09-17 17:56:55', '2025-09-17 17:56:55'),
(286, 'C. Superior vena cava syndrome', 0, 157, '2025-09-17 17:56:55', '2025-09-17 17:56:55'),
(287, 'D. Shock', 0, 157, '2025-09-17 17:56:55', '2025-09-17 17:56:55'),
(288, 'A. tell the parents to stay overnight with him.', 0, 158, '2025-09-17 17:59:35', '2025-09-17 17:59:35'),
(289, 'B. arrange for his peers to visit him.', 0, 158, '2025-09-17 17:59:35', '2025-09-17 17:59:35'),
(290, 'C. recommend a prescription for patient-controlled analgesia.', 0, 158, '2025-09-17 17:59:35', '2025-09-17 17:59:35'),
(291, 'D. provide meals high in protein and vitamin C.', 0, 158, '2025-09-17 17:59:35', '2025-09-17 17:59:35'),
(292, 'A. Level of consciousness', 0, 159, '2025-09-18 02:23:42', '2025-09-18 02:23:42'),
(293, 'B. Blood pressure', 0, 159, '2025-09-18 02:23:42', '2025-09-18 02:23:42'),
(294, 'C. Intracranial pressure (ICP) measurement', 0, 159, '2025-09-18 02:23:42', '2025-09-18 02:23:42'),
(295, 'D. Pupil assessment', 0, 159, '2025-09-18 02:23:42', '2025-09-18 02:23:42'),
(296, 'A. three days postoperative following transsphenoidal hypophysectomy and has a temperature of 101°F (38.3°C).', 0, 160, '2025-09-18 02:30:17', '2025-09-18 02:30:17'),
(297, 'B. connected to a chest tube for a pneumothorax and has absent breath sounds on the affected side.', 0, 160, '2025-09-18 02:30:17', '2025-09-18 02:30:17'),
(298, 'C. receiving albuterol via a nebulizer and telling the unlicensed assistive personnel they feel nervous.', 0, 160, '2025-09-18 02:30:17', '2025-09-18 02:30:17'),
(299, 'D. receiving peritoneal dialysis and reports cramping as the solution is being instilled.', 0, 160, '2025-09-18 02:30:17', '2025-09-18 02:30:17');

-- --------------------------------------------------------

--
-- Table structure for table `tb_MultipleRadio`
--

CREATE TABLE `tb_MultipleRadio` (
  `id` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  `client_findings` varchar(500) NOT NULL,
  `answer` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tb_MultipleRadio`
--

INSERT INTO `tb_MultipleRadio` (`id`, `question_id`, `client_findings`, `answer`) VALUES
(43, 74, 'tachypnea', 'hemothorax'),
(44, 74, 'reduced (or absent) breath sounds of the affected side', 'asthma exacerbation'),
(45, 74, 'percussion on the involved side produces a dull sound', 'hemothorax'),
(46, 74, 'chest wall tenderness', 'asthma exacerbation'),
(47, 83, 'tachypnea', 'hemothorax'),
(48, 83, 'reduced (or absent) breath sounds of the affected side', 'asthma exacerbation'),
(49, 83, 'percussion on the involved side produces a dull sound', 'hemothorax'),
(50, 83, 'chest wall tenderness', 'asthma exacerbation'),
(51, 97, 'Multiple Radio Proper tracheostomy suctioning follows asystematic approach to ensure patient safety and effectiveness', 'hemothorax'),
(52, 116, 'tachypnea', 'hemothorax'),
(53, 116, 'reduced (or absent) breath sounds of the affected side', 'asthma exacerbation'),
(54, 116, 'percussion on the involved side produces a dull sound', 'hemothorax'),
(55, 116, 'chest wall tenderness', 'asthma exacerbation'),
(56, 119, 'tachypnea', 'hemothorax'),
(57, 119, 'reduced (or absent) breath sounds of the affected side', 'asthma exacerbation'),
(58, 119, 'percussion on the involved side produces a dull sound', 'hemothorax'),
(59, 119, 'chest wall tenderness', 'asthma exacerbation'),
(60, 127, 'Paranoia', 'Alcohol'),
(61, 127, 'Vomiting', 'Amphetamine'),
(62, 127, 'Hypertension', 'Amphetamine'),
(63, 127, 'Tachycardia', 'Alcohol'),
(64, 152, 'Multiple Radio Proper tracheostomy suctioning follows a systematic approach to ensure patient safety and effectiveness. The correct sequence maintains sterility, prevents hypoxia, and ensures adequate airway clearance.\",', 'asthma exacerbation'),
(65, 161, 'sentence text', '1245');

-- --------------------------------------------------------

--
-- Table structure for table `tb_MultipleRadio_RadioOptions`
--

CREATE TABLE `tb_MultipleRadio_RadioOptions` (
  `id` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  `options` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tb_MultipleRadio_RadioOptions`
--

INSERT INTO `tb_MultipleRadio_RadioOptions` (`id`, `question_id`, `options`) VALUES
(1, 74, 'hemothorax'),
(2, 74, 'asthma exacerbation'),
(3, 74, 'asthma exacerbation'),
(4, 74, 'hemothorax'),
(5, 83, 'hemothorax'),
(6, 83, 'asthma exacerbation'),
(7, 97, 'hemothorax'),
(8, 97, 'asthmaexacerbation'),
(9, 116, 'hemothorax'),
(10, 116, 'asthma exacerbation'),
(11, 119, 'hemothorax'),
(12, 119, 'asthma exacerbation'),
(13, 127, 'Alcohol'),
(14, 127, 'Amphetamine'),
(15, 152, 'hemothorax'),
(16, 152, 'asthma exacerbation'),
(17, 161, '123'),
(18, 161, '1245');

-- --------------------------------------------------------

--
-- Table structure for table `tb_notes`
--

CREATE TABLE `tb_notes` (
  `n_id` int(11) NOT NULL,
  `n_user_id` int(11) NOT NULL,
  `n_title` varchar(255) NOT NULL,
  `n_description` varchar(1000) DEFAULT NULL,
  `n_status` varchar(50) DEFAULT 'pending',
  `n_is_deleted` tinyint(4) DEFAULT 0,
  `n_created_at` timestamp NULL DEFAULT current_timestamp(),
  `n_updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tb_questions`
--

CREATE TABLE `tb_questions` (
  `id` int(11) NOT NULL,
  `question` longtext NOT NULL,
  `question_type_id` int(11) NOT NULL,
  `courseId` int(11) NOT NULL,
  `answer` varchar(255) DEFAULT NULL COMMENT 'Answers for sentence highlight question,Fill in the blanks',
  `marks` double NOT NULL,
  `exam_type` varchar(500) NOT NULL,
  `drag_drop_content` varchar(500) DEFAULT NULL,
  `difficulty` varchar(50) DEFAULT NULL,
  `isDeleted` tinyint(1) DEFAULT 0,
  `exhibit` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tb_questions`
--

INSERT INTO `tb_questions` (`id`, `question`, `question_type_id`, `courseId`, `answer`, `marks`, `exam_type`, `drag_drop_content`, `difficulty`, `isDeleted`, `exhibit`, `createdAt`, `updatedAt`) VALUES
(132, 'The nurse is caring for a client experiencing prolonged labor with hypotonic contractions. Which of the following actions should the nurse take?﻿﻿ Select all that apply.', 7, 12, NULL, 4, 'q-bank', NULL, 'Medium', 0, NULL, '2025-09-16 17:12:24', '2025-09-16 17:12:24'),
(133, 'Upon entering a client’s room, the nurse finds the client lying on the floor. What is the first action the nurse should implement?', 7, 12, NULL, 1, 'q-bank', NULL, 'Easy', 0, NULL, '2025-09-16 17:16:29', '2025-09-16 17:16:29'),
(134, 'The nurse is evaluating a client three days post-operative for signs and symptoms of infection. Which of the following is not a sign of infection from a surgical wound?', 7, 12, NULL, 1, 'q-bank', NULL, 'Hard', 0, NULL, '2025-09-16 17:18:47', '2025-09-16 17:18:47'),
(135, 'The nurse has provided teaching to a client regarding metoprolol.\n\n Which of the following statements by the client would indicate a correct understanding of the teaching?', 7, 12, NULL, 1, 'q-bank', NULL, 'Easy', 0, NULL, '2025-09-16 17:21:22', '2025-09-16 17:21:22'),
(136, 'The nurse is counseling a client diagnosed with irritable bowel syndrome (IBS). The nurse should advise the client to increase their', 7, 12, NULL, 1, 'q-bank', NULL, 'Medium', 0, NULL, '2025-09-16 17:23:56', '2025-09-16 17:23:56'),
(137, 'The intensive care unit (ICU) nurse is caring for a client with septic shock. The assessment shows bleeding from the peripheral intravenous site, gum bleeding, and hematuria.\n\nBased on the assessment, which action should the nurse take?', 7, 12, NULL, 1, 'q-bank', NULL, 'Hard', 0, NULL, '2025-09-16 17:26:37', '2025-09-16 17:26:37'),
(138, 'The nurse and two unlicensed assistive personnel (UAP) are preparing to reposition a client who requires log rolling. Which actions would be appropriate? Select all that apply.', 7, 12, NULL, 3, 'q-bank', NULL, 'Medium', 0, NULL, '2025-09-16 17:30:29', '2025-09-16 17:30:29'),
(139, 'The nurse is caring for assigned clients. Which of the following clients would be appropriate for the nurse to refer for an interdisciplinary conference? A client with\n\nSelect all that apply.', 7, 12, NULL, 2, 'q-bank', NULL, 'Medium', 0, NULL, '2025-09-16 17:33:36', '2025-09-16 17:33:36'),
(140, 'You are caring for a group of psychiatric mental health clients. One of these clients, who has anger management and aggressive behavior concerns, has not yet gained telephone privileges. You notice an unlicensed assistive personnel (UAP) on the unit escorting this client to the telephone. After you speak to the client about the telephone privileges, the UAP tells you, \"It is unfair for this client not to be able to use the telephone when other clients are free to do so.\" What should you determine about this UAP\'s comment?', 7, 12, NULL, 1, 'q-bank', NULL, 'Medium', 0, NULL, '2025-09-16 17:36:58', '2025-09-16 17:36:58'),
(141, 'The nurse is conducting a suicide assessment on a client. While reviewing the assessment data, the nurse is most concerned about the client', 7, 12, NULL, 1, 'q-bank', NULL, 'Hard', 0, NULL, '2025-09-16 17:39:39', '2025-09-16 17:39:39'),
(142, 'The nurse in the behavioral health clinic is interviewing a client with depression. The nurse tells the client, \'Sometimes having a mental illness can feel very discouraging. I wonder how you are feeling?\' By making this statement, the nurse is demonstrating', 7, 12, NULL, 1, 'q-bank', NULL, 'Medium', 0, NULL, '2025-09-16 17:49:13', '2025-09-16 17:49:13'),
(146, 'Test mcq 4', 7, 12, NULL, 5, 'q-bank', NULL, 'Easy', 0, NULL, '2025-09-17 14:14:26', '2025-09-17 14:14:26'),
(147, 'Mcq formdata test', 7, 12, NULL, 3, 'q-bank', NULL, 'Medium', 0, NULL, '2025-09-17 14:23:43', '2025-09-17 14:23:43'),
(148, 'What is the recommended daily intake of Vitamin D for adults?', 7, 12, NULL, 5, 'q-bank', NULL, NULL, 0, '/uploads/exhibit/1758119347197-357371665.jpeg', '2025-09-17 14:29:07', '2025-09-17 14:29:07'),
(149, 'Enter MCQ Question Content', 7, 12, NULL, 5, 'q-bank', NULL, 'Medium', 0, NULL, '2025-09-17 14:37:52', '2025-09-17 14:37:52'),
(150, 'Enter MCQ Question Content', 7, 12, NULL, 5, 'q-bank', NULL, 'Medium', 0, NULL, '2025-09-17 14:40:47', '2025-09-17 14:40:47'),
(151, 'Write the question your students will answer — be clear, concise, and clinically relevant.', 7, 12, NULL, 6, 'q-bank', NULL, 'Medium', 0, '/uploads/exhibit/1758123049211-515356028.png', '2025-09-17 15:30:49', '2025-09-17 15:30:49'),
(152, 'Arrange the steps in the correct order for performing tracheostomy suctioning.', 10, 12, NULL, 5, 'Q-Bank', NULL, 'Easy', 0, NULL, '2025-09-17 16:12:55', '2025-09-17 16:12:55'),
(153, 'The charge nurse is performing safety rounds on clients in the nursing unit.\n\nWhich observation by the charge nurse requires follow-up? A client with', 7, 12, NULL, 1, 'q-bank', NULL, 'Medium', 0, NULL, '2025-09-17 17:31:55', '2025-09-17 17:31:55'),
(154, 'The nurse witnesses a client providing informed consent to the primary healthcare provider (PHCP).\n\nThe nurse understands that obtaining informed consent demonstrates respect for the client’s', 7, 12, NULL, 1, 'q-bank', NULL, 'Hard', 0, NULL, '2025-09-17 17:41:32', '2025-09-17 17:41:32'),
(155, 'The nurse is providing patient care working in a unit that uses the total patient care model for delivering nursing care. The nurse recognizes which of the following as an aspect of this nursing care delivery model?', 7, 12, NULL, 1, 'q-bank', NULL, 'Hard', 0, NULL, '2025-09-17 17:51:18', '2025-09-17 17:51:18'),
(156, 'The nurse is preparing to insert an indwelling urinary catheter. Which action may be delegated to the unlicensed assistive personnel (UAP)?', 7, 12, NULL, 1, 'q-bank', NULL, 'Medium', 0, NULL, '2025-09-17 17:54:29', '2025-09-17 17:54:29'),
(157, 'The nurse is caring for a client with a breast tumor. The client reports trouble breathing, a puffy face/neck, nasal congestion, and a raspy voice. The nurse would suspect which of the following?', 7, 12, NULL, 1, 'q-bank', NULL, 'Hard', 0, NULL, '2025-09-17 17:56:55', '2025-09-17 17:56:55'),
(158, 'The nurse is planning care for an adolescent scheduled for spinal surgery and is expected to remain hospitalized for several days. To meet this client\'s psychosocial needs, the nurse should', 7, 12, NULL, 1, 'q-bank', NULL, 'Hard', 0, NULL, '2025-09-17 17:59:35', '2025-09-17 17:59:35'),
(159, 'The nurse is caring for a child admitted with a concussion.\n\nWhich assessment finding would be the earliest in determining the client\'s worsening neurological status?', 7, 12, NULL, 1, 'q-bank', NULL, 'Hard', 0, NULL, '2025-09-18 02:23:42', '2025-09-18 02:23:42'),
(160, 'The nurse is caring for assigned clients.\n\nThe nurse should initially follow up on the client who is', 7, 12, NULL, 1, 'q-bank', NULL, 'Hard', 0, NULL, '2025-09-18 02:30:17', '2025-09-18 02:30:17'),
(164, 'Match each lab finding with its corresponding clinical implication', 8, 12, NULL, 5, 'mock test', NULL, 'Hard', 0, NULL, '2025-09-18 14:34:35', '2025-09-18 14:34:35'),
(165, 'Arrange the steps in the correct order for performing tracheostomy suctioning.', 12, 12, NULL, 5, 'q- bank', NULL, 'Medium', 0, NULL, '2025-09-19 07:14:02', '2025-09-19 07:14:02'),
(166, 'Arrange the steps in the correct order for performing tracheostomy suctioning.', 12, 12, NULL, 5, 'q- bank', NULL, 'Medium', 0, NULL, '2025-09-19 07:15:05', '2025-09-19 07:15:05'),
(167, 'Arrange the steps in the correct order for performing tracheostomy suctioning.', 12, 12, NULL, 5, 'q- bank', NULL, 'Medium', 0, NULL, '2025-09-19 08:02:50', '2025-09-19 08:02:50');

-- --------------------------------------------------------

--
-- Table structure for table `tb_questionTabs`
--

CREATE TABLE `tb_questionTabs` (
  `id` int(11) NOT NULL,
  `questionId` int(11) NOT NULL,
  `tabKey` varchar(255) NOT NULL,
  `tabValue` longtext NOT NULL,
  `isDeleted` tinyint(1) DEFAULT 0,
  `createdAt` timestamp NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tb_questionTabs`
--

INSERT INTO `tb_questionTabs` (`id`, `questionId`, `tabKey`, `tabValue`, `isDeleted`, `createdAt`, `updatedAt`) VALUES
(1, 13, '1234', '12345', 0, '2025-08-25 08:35:04', '2025-08-25 08:35:04'),
(2, 14, '122222', '222222222222', 0, '2025-08-25 08:36:55', '2025-08-25 08:36:55'),
(3, 17, '123', '123456', 0, '2025-08-25 08:46:25', '2025-08-25 08:46:25'),
(4, 17, '1234', '12345678', 0, '2025-08-25 08:46:25', '2025-08-25 08:46:25'),
(5, 19, '12345', '12345', 0, '2025-08-25 08:55:45', '2025-08-25 08:55:45'),
(6, 20, '12345', '123456', 0, '2025-08-25 09:01:10', '2025-08-25 09:01:10'),
(7, 21, '1234', '12345678', 0, '2025-08-25 09:09:31', '2025-08-25 09:09:31'),
(8, 22, 'eee', 'wwww', 0, '2025-08-25 09:23:57', '2025-08-25 09:23:57'),
(9, 23, 'tabane', 'tab ane', 0, '2025-08-25 09:28:55', '2025-08-25 09:28:55'),
(10, 25, '1234', '123', 0, '2025-08-25 09:42:48', '2025-08-25 09:42:48'),
(11, 26, '123', '321', 0, '2025-08-25 10:10:10', '2025-08-25 10:10:10'),
(12, 27, '123456', '235678', 0, '2025-08-25 10:27:13', '2025-08-25 10:27:13'),
(13, 28, '123', '12345678', 0, '2025-08-25 10:29:40', '2025-08-25 10:29:40'),
(14, 31, '12345', '123', 0, '2025-08-25 14:25:31', '2025-08-25 14:25:31'),
(15, 37, 'Atherosclerosis', 'Atherosclerosis', 0, '2025-08-27 08:48:55', '2025-08-27 08:48:55'),
(16, 41, 'Progress Note', '1500: Client is twelve weeks postoperative following gastric bypass surgery. The client\'s weight at this\nvisit was 245 pounds (111.36 kilograms), a decrease of 6 pounds since the previous visit (2.72\nkilograms) four weeks ago. She reports that she is starting to notice excess skin between her legs and\nupper arms. The client reports exercising regularly and eating solid foods with no reflux or nausea.\nIncision site appears fully healed with a minimal scar. The client reports no incisional pain. She reports\nfeeling full much sooner compared to before the surgery. Denies abdominal pain, nausea, vomiting,\nand diarrhea. She reports symmetric paresthesias in both the upper and lower extremities. She\nendorses forgetfulness and fatigue. Physical exam was unremarkable with the exception of two oral\nulcers.', 0, '2025-08-28 08:32:37', '2025-08-28 08:32:37'),
(17, 41, 'Medical History', 'Diabetes mellitus, type II\nGastric bypass surgery\nIrritable bowel syndrome\n', 0, '2025-08-28 08:32:37', '2025-08-28 08:32:37'),
(18, 41, 'Physician\'s Orders', 'Cyanocobalamin 1000 mcg intramuscular (IM) x 1 dose\nThe nurse reviews the physician\'s orders\nComplete the sentences below from the list of options\n', 0, '2025-08-28 08:32:37', '2025-08-28 08:32:37'),
(19, 58, 'Nurses\' Notes', '\n0449: 19-year-old male presents with right-sided testicular pain that has worsened in intensity. The client states that he was sleeping and was awakened with sharp, right-sided abdominal and testicular pain that he describes as \'unbearable and sharp.\' He reports the pain as 7/10 on the numerical pain scale. The onset of these symptoms was three hours prior to arrival. He reports that he has never experienced anything like this before. The client denies any trauma to the testicles. On assessment, the client is alert and completely oriented. He is in moderate distress and reports nausea and one episode of emesis prior to arrival. Lung sounds are clear bilaterally. S1/S2 heart tones auscultated. Normoactive bowel sounds, pain in the right lower quadrant with palpation. Peripheral pulses 2+. No peripheral edema. Skin is warm, and the color is normal for ethnicity. Denies dysuria, hematuria, or discharge. Right testicular swelling was noted on visual exam. The testicle was hard and tender with palpation. The client reports being sexually active with multiple partners and has not been recently tested for sexually transmitted infections. The client has no reported medical history besides being treated for multiple sexually transmitted infections, including syphilis, chlamydia, and gonorrhea. The client takes no daily medications. Vital signs: T 99° F (37° C), P 99, RR 19, BP 142/76, pulse oximetry reading 95% on room air.', 0, '2025-08-30 10:09:58', '2025-08-30 10:09:58'),
(20, 63, 'Match the vitamin with its deficiency disease.', 'Match the vitamin with its deficiency disease.', 0, '2025-09-01 04:25:56', '2025-09-01 04:25:56'),
(21, 64, 'Triage Note', 'The patient presents with chest pain and shortness of breath...', 0, '2025-09-01 05:19:59', '2025-09-01 05:19:59'),
(22, 64, 'Vital Signs', 'BP: 110/70, HR: 98 bpm, SpO2: 92% on room air.', 0, '2025-09-01 05:19:59', '2025-09-01 05:19:59'),
(23, 65, 'Triage Note', 'The patient presents with chest pain and shortness of breath...', 0, '2025-09-01 05:23:08', '2025-09-01 05:23:08'),
(24, 66, 'Triage Note', 'The patient presents with chest pain and shortness of breath...', 0, '2025-09-01 05:25:51', '2025-09-01 05:25:51'),
(25, 66, 'Vital Signs', 'BP: 110/70, HR: 98 bpm, SpO2: 92% on room air', 0, '2025-09-01 05:25:51', '2025-09-01 05:25:51'),
(26, 70, 'Triage Note', 'The patient presents with chest pain and shortness of breath...', 0, '2025-09-01 05:41:32', '2025-09-01 05:41:32'),
(27, 70, 'Vital Signs', 'BP: 110/70, HR: 98 bpm, SpO2: 92% on room air.', 0, '2025-09-01 05:41:32', '2025-09-01 05:41:32'),
(28, 71, 'Triage Note', 'The patient presents with chest pain and shortness of breath...', 0, '2025-09-01 05:47:17', '2025-09-01 05:47:17'),
(29, 71, 'Vital Signs', 'BP: 110/70, HR: 98 bpm, SpO2: 92% on room air.', 0, '2025-09-01 05:47:17', '2025-09-01 05:47:17'),
(30, 74, 'Triage Note', 'Client presents with dyspnea and right-sided chest pain that is worse when he takes a deep breath and coughs. Pain rated 7 on a scale of 0 (no pain) to 10 (severe pain). The client arrived with his friends after playing baseball outdoors and was struck by a baseball bat on the right side of his chest. Immediately after he sustained the injury, he reported sharp chest pain. Vital signs: T 99° F (37.2° C) P 94, RR 25, BP 127/76, pulse oximetry reading 89% on room air. He has a medical history of hemophilia A and asthma. On assessment, the client is alert and oriented and anxious. The client has labored breathing using his accessory muscles, and lung sounds are absent in the right-sided bases.', 0, '2025-09-01 10:05:17', '2025-09-01 10:05:17'),
(31, 75, 'Triage Note', 'Client presents with dyspnea and right-sided chest pain that is worse when he takes a deep breath and coughs. Pain rated 7 on a scale of 0 (no pain) to 10 (severe pain). The client arrived with his friends after playing baseball outdoors and was struck by a baseball bat on the right side of his chest. Immediately after he sustained the injury, he reported sharp chest pain. Vital signs: T 99° F (37.2° C) P 94, RR 25, BP 127/76, pulse oximetry reading 89% on room air. He has a medical history of hemophilia A and asthma. On assessment, the client is alert and oriented and anxious. The client has labored breathing using his accessory muscles, and lung sounds are absent in the right-sided bases', 0, '2025-09-01 10:10:12', '2025-09-01 10:10:12'),
(32, 76, 'Triage Note', 'Client presents with dyspnea and right-sided chest pain that is worse when he takes a deep breath and coughs. Pain rated 7 on a scale of 0 (no pain) to 10 (severe pain). The client arrived with his friends after playing baseball outdoors and was struck by a baseball bat on the right side of his chest. Immediately after he sustained the injury, he reported sharp chest pain. Vital signs: T 99° F (37.2° C) P 94, RR 25, BP 127/76, pulse oximetry reading 89% on room air. He has a medical history of hemophilia A and asthma. On assessment, the client is alert and oriented and anxious. The client has labored breathing using his accessory muscles, and lung sounds are absent in the right-sided bases', 0, '2025-09-01 10:21:35', '2025-09-01 10:21:35'),
(33, 76, 'Vital sign', 'Upon assessment, the client is visibly anxious and struggling to breathe, with pink frothy sputum noted during coughing.The client is experiencing sudden shortness of breath and chest tightness. Physical examination reveals bilateral crackles in all lung fields, jugular venous distension (JVD), and peripheral cyanosis. An ECG shows sinus tachycardia with no ischemic changes, and a chest X-ray reveals pulmonary vascular congestion. The client reports a history of chronic heart failure.\" }]\nhighlightoptions:loremIpsum ', 0, '2025-09-01 10:21:35', '2025-09-01 10:21:35'),
(34, 77, 'Triage Note', ' Client presents with dyspnea and right-sided chest pain that is worse when he takes a deep breath and coughs. Pain rated 7 on a scale of 0 (no pain) to 10 (severe pain). The client arrived with his friends after playing baseball outdoors and was struck by a baseball bat on the right side of his chest. Immediately after he sustained the injury, he reported sharp chest pain. Vital signs: T 99° F (37.2° C) P 94, RR 25, BP 127/76, pulse oximetry reading 89% on room air. He has a medical history of hemophilia A and asthma. On assessment, the client is alert and oriented and anxious. The client has labored breathing using his accessory muscles, and lung sounds are absent in the right-sided bases', 0, '2025-09-01 10:25:21', '2025-09-01 10:25:21'),
(35, 78, 'Triage', 'Client presents with dyspnea and right-sided chest pain that is worse when he takes a deep breath and coughs. Pain rated 7 on a scale of 0 (no pain) to 10 (severe pain). The client arrived with his friends after playing baseball outdoors and was struck by a baseball bat on the right side of his chest. Immediately after he sustained the injury, he reported sharp chest pain. Vital signs: T 99° F (37.2° C) P 94, RR 25, BP 127/76, pulse oximetry reading 89% on room air. He has a medical history of hemophilia A and asthma. On assessment, the client is alert and oriented and anxious. The client has labored breathing using his accessory muscles, and lung sounds are absent in the right-sided bases.\"},{\"tabKey\":\"Vital sign\",\"tabValue\": \"0800: Upon assessment, the client is visibly anxious and struggling to breathe, with pink frothy sputum noted during coughing.The client is experiencing sudden shortness of breath and chest tightness. Physical examination reveals bilateral crackles in all lung fields, jugular venous distension (JVD), and peripheral cyanosis. An ECG shows sinus tachycardia with no ischemic changes, and a chest X-ray reveals pulmonary vascular congestion. ', 0, '2025-09-01 10:31:40', '2025-09-01 10:31:40'),
(36, 83, 'Triage Note', 'Client presents with dyspnea and right-sided chest pain that is worse when he takes a deep breath and coughs. Pain rated 7 on a scale of 0 (no pain) to 10 (severe pain). The client arrived with his friends after playing baseball outdoors and was struck by a baseball bat on the right side of his chest. Immediately after he sustained the injury, he reported sharp chest pain. Vital signs: T 99° F (37.2° C) P 94, RR 25, BP 127/76, pulse oximetry reading 89% on room air. He has a medical history of hemophilia A and asthma. On assessment, the client is alert and oriented and anxious. The client has labored breathing using his accessory muscles, and lung sounds are absent in the right-sided bases.', 0, '2025-09-06 11:09:21', '2025-09-06 11:09:21'),
(37, 84, 'Lab Report', 'Elevated serum creatinine detected on routine blood test.', 0, '2025-09-06 11:36:56', '2025-09-06 11:36:56'),
(38, 84, 'Symptom', 'Patient complains of persistent fatigue and decreased urine output.', 0, '2025-09-06 11:36:56', '2025-09-06 11:36:56'),
(39, 88, 'Triage Note', '1840: Client presents with dyspnea and right-sided chest pain that is worse when he takes a deep breath and coughs. Pain rated 7 on a scale of 0 (no pain) to 10 (severe pain). The client arrived with his friends after playing baseball outdoors and was struck by a baseball bat on the right side of his chest. Immediately after he sustained the injury, he reported sharp chest pain. Vital signs: T 99° F (37.2° C) P 94, RR 25, BP 127/76, pulse oximetry reading 89% on room air. He has a medical history of hemophilia A and asthma. On assessment, the client is alert and oriented and anxious. The client has labored breathing using his accessory muscles, and lung sounds are absent in the right-sided bases.', 0, '2025-09-06 12:46:02', '2025-09-06 12:46:02'),
(40, 88, 'Vital sign', '0800: Upon assessment, the client is visibly anxious and struggling to breathe, with pink frothy sputum noted during coughing.The client is experiencing sudden shortness of breath and chest tightness. Physical examination reveals bilateral crackles in all lung fields, jugular venous distension (JVD), and peripheral cyanosis. An ECG shows sinus tachycardia with no ischemic changes, and a chest X-ray reveals pulmonary vascular congestion. The client reports a history of chronic heart failure.', 0, '2025-09-06 12:46:03', '2025-09-06 12:46:03'),
(41, 89, 'Triage Note', '1840: Client presents with dyspnea and right-sided chest pain that is worse when he takes a deep breath and coughs. Pain rated 7 on a scale of 0 (no pain) to 10 (severe pain). The client arrived with his friends after playing baseball outdoors and was struck by a baseball bat on the right side of his chest. Immediately after he sustained the injury, he reported sharp chest pain. Vital signs: T 99° F (37.2° C) P 94, RR 25, BP 127/76, pulse oximetry reading 89% on room air. He has a medical history of hemophilia A and asthma. On assessment, the client is alert and oriented and anxious. The client has labored breathing using his accessory muscles, and lung sounds are absent in the right-sided bases.', 0, '2025-09-06 12:50:57', '2025-09-06 12:50:57'),
(42, 89, 'Vital sign', '0800: Upon assessment, the client is visibly anxious and struggling to breathe, with pink frothy sputum noted during coughing.The client is experiencing sudden shortness of breath and chest tightness. Physical examination reveals bilateral crackles in all lung fields, jugular venous distension (JVD), and peripheral cyanosis. An ECG shows sinus tachycardia with no ischemic changes, and a chest X-ray reveals pulmonary vascular congestion. The client reports a history of chronic heart failure.', 0, '2025-09-06 12:50:57', '2025-09-06 12:50:57'),
(43, 90, 'Triage Note', '1840: Client presents with dyspnea and right-sided chest pain that is worse when he takes a deep breath and coughs. Pain rated 7 on a scale of 0 (no pain) to 10 (severe pain). The client arrived with his friends after playing baseball outdoors and was struck by a baseball bat on the right side of his chest. Immediately after he sustained the injury, he reported sharp chest pain. Vital signs: T 99° F (37.2° C) P 94, RR 25, BP 127/76, pulse oximetry reading 89% on room air. He has a medical history of hemophilia A and asthma. On assessment, the client is alert and oriented and anxious. The client has labored breathing using his accessory muscles, and lung sounds are absent in the right-sided bases.', 0, '2025-09-06 12:53:02', '2025-09-06 12:53:02'),
(44, 90, 'Vital sign', '0800: Upon assessment, the client is visibly anxious and struggling to breathe, with pink frothy sputum noted during coughing.The client is experiencing sudden shortness of breath and chest tightness. Physical examination reveals bilateral crackles in all lung fields, jugular venous distension (JVD), and peripheral cyanosis. An ECG shows sinus tachycardia with no ischemic changes, and a chest X-ray reveals pulmonary vascular congestion. The client reports a history of chronic heart failure.', 0, '2025-09-06 12:53:02', '2025-09-06 12:53:02'),
(45, 91, 'Triage Note', '1840: Client presents with dyspnea and right-sided chest pain that is worse when he takes a deep breath and coughs. Pain rated 7 on a scale of 0 (no pain) to 10 (severe pain). The client arrived with his friends after playing baseball outdoors and was struck by a baseball bat on the right side of his chest. Immediately after he sustained the injury, he reported sharp chest pain. Vital signs: T 99° F (37.2° C) P 94, RR 25, BP 127/76, pulse oximetry reading 89% on room air. He has a medical history of hemophilia A and asthma. On assessment, the client is alert and oriented and anxious. The client has labored breathing using his accessory muscles, and lung sounds are absent in the right-sided bases.', 0, '2025-09-06 13:09:07', '2025-09-06 13:09:07'),
(46, 91, 'Vital sign', '0800: Upon assessment, the client is visibly anxious and struggling to breathe, with pink frothy sputum noted during coughing.The client is experiencing sudden shortness of breath and chest tightness. Physical examination reveals bilateral crackles in all lung fields, jugular venous distension (JVD), and peripheral cyanosis. An ECG shows sinus tachycardia with no ischemic changes, and a chest X-ray reveals pulmonary vascular congestion. The client reports a history of chronic heart failure.', 0, '2025-09-06 13:09:07', '2025-09-06 13:09:07'),
(47, 92, 'Triage Note', '1840: Client presents with dyspnea and right-sided chest pain that is worse when he takes a deep breath and coughs. Pain rated 7 on a scale of 0 (no pain) to 10 (severe pain). The client arrived with his friends after playing baseball outdoors and was struck by a baseball bat on the right side of his chest. Immediately after he sustained the injury, he reported sharp chest pain. Vital signs: T 99° F (37.2° C) P 94, RR 25, BP 127/76, pulse oximetry reading 89% on room air. He has a medical history of hemophilia A and asthma. On assessment, the client is alert and oriented and anxious. The client has labored breathing using his accessory muscles, and lung sounds are absent in the right-sided bases.', 0, '2025-09-06 13:24:31', '2025-09-06 13:24:31'),
(48, 92, 'Vital sign', '0800: Upon assessment, the client is visibly anxious and struggling to breathe, with pink frothy sputum noted during coughing.The client is experiencing sudden shortness of breath and chest tightness. Physical examination reveals bilateral crackles in all lung fields, jugular venous distension (JVD), and peripheral cyanosis. An ECG shows sinus tachycardia with no ischemic changes, and a chest X-ray reveals pulmonary vascular congestion. The client reports a history of chronic heart failure.', 0, '2025-09-06 13:24:31', '2025-09-06 13:24:31'),
(49, 95, 'Lab Report', 'Elevated serum creatinine detected onroutine blood test.', 0, '2025-09-07 07:41:30', '2025-09-07 07:41:30'),
(50, 95, 'Symptom', 'Patient complains ofpersistent fatigue and decreased urine output.\"}', 0, '2025-09-07 07:41:30', '2025-09-07 07:41:30'),
(51, 96, 'Triage Note', '840: Client presents with dyspnea andright-sided chest pain that is worse when he takes a deep breath and coughs. Painrated 7 on a scale of 0 (no pain) to 10 (severe pain). The client arrived with his friendsafter playing baseball outdoors and was struck by a baseball bat on the right side ofhis chest. Immediately after he sustained the injury, he reported sharp chest pain.Vital signs: T 99° F (37.2° C) P 94, RR 25, BP 127/76, pulse oximetry reading 89% onroom air. He has a medical history of hemophilia A and asthma. On assessment, theclient is alert and oriented and anxious. The client has labored breathing using hisaccessory muscles, and lung sounds are absent in the right-sidedbases.', 0, '2025-09-07 07:46:45', '2025-09-07 07:46:45'),
(52, 96, 'Vital sign', '0800: Upon assessment, the client isvisibly anxious and struggling to breathe, with pink frothy sputum noted duringcoughing.The client is experiencing sudden shortness of breath and chest tightness.Physical examination reveals bilateral crackles in all lung fields, jugular venousdistension (JVD), and peripheral cyanosis. A', 0, '2025-09-07 07:46:45', '2025-09-07 07:46:45'),
(53, 97, 'Triage Note', 'Client presents with dyspnea andright-sided chest pain that is worse when he takes a deep breath and coughs.Pain rated 7 on a scale of 0 (no pain) to 10 (severe pain). The client arrivedwith his friends after playing baseball outdoors and was struck by a baseballbat on the right side of his chest. Immediately after he sustained the injury,he reported sharp chest pain. Vital signs: T 99° F (37.2° C) P 94, RR 25, BP127/76, pulse oximetry reading 89% on room air. He has a medical history ofhemophilia A and asthma. On assessment, the client is alert and oriented andanxious. The client has labored breathing using his accessory muscles, andlung sounds are absent in the right-sided bases.', 0, '2025-09-07 07:56:30', '2025-09-07 07:56:30'),
(54, 99, 'Triage Note', '840: Client presents with dyspnea andright-sided chest pain that is worse when he takes a deep breath and coughs. Painrated 7 on a scale of 0 (no pain) to 10 (severe pain). The client arrived with his friendsafter playing baseball outdoors and was struck by a baseball bat on the right side ofhis chest. Immediately after he sustained the injury, he reported sharp chest pain.Vital signs: T 99° F (37.2° C) P 94, RR 25, BP 127/76, pulse oximetry reading 89% onroom air. He has a medical history of hemophilia A and asthma. On assessment, theclient is alert and oriented and anxious. The client has labored breathing using hisaccessory muscles, and lung sounds are absent in the right-sidedbases', 0, '2025-09-07 08:03:58', '2025-09-07 08:03:58'),
(55, 99, 'Vital sign', '0800: Upon assessment, the client isvisibly anxious and struggling to breathe, with pink frothy sputum noted duringcoughing.The client is experiencing sudden shortness of breath and chest tightness.Physical examination reveals bilateral crackles in all lung fields, jugular venousdistension (JVD), and peripheral cyanosis. An ECG shows sinus tachycardia with noischemic changes, and a chest X-ray reveals pulmonary vascular congestion. Theclient reports a history of chronic heart failure.\"', 0, '2025-09-07 08:03:58', '2025-09-07 08:03:58'),
(56, 100, 'Triage Note', '1840: Client presents with dyspnea and right-sided chest pain that is worse when he takes a deep breath and coughs. Pain rated 7 on a scale of 0 (no pain) to 10 (severe pain). The client arrived with his friends after playing baseball outdoors and was struck by a baseball bat on the right side of his chest. Immediately after he sustained the injury, he reported sharp chest pain. Vital signs: T 99° F (37.2° C) P 94, RR 25, BP 127/76, pulse oximetry reading 89% on room air. He has a medical history of hemophilia A and asthma. On assessment, the client is alert and oriented and anxious. The client has labored breathing using his accessory muscles, and lung sounds are absent in the right-sided bases.', 0, '2025-09-08 04:11:53', '2025-09-08 04:11:53'),
(57, 100, 'Vital sign', '0800: Upon assessment, the client is visibly anxious and struggling to breathe, with pink frothy sputum noted during coughing.The client is experiencing sudden shortness of breath and chest tightness. Physical examination reveals bilateral crackles in all lung fields, jugular venous distension (JVD), and peripheral cyanosis. An ECG shows sinus tachycardia with no ischemic changes, and a chest X-ray reveals pulmonary vascular congestion. The client reports a history of chronic heart failure.', 0, '2025-09-08 04:11:53', '2025-09-08 04:11:53'),
(58, 101, 'Triage Note', '1840: Client presents with dyspnea and right-sided chest pain that is worse when he takes a deep breath and coughs. Pain rated 7 on a scale of 0 (no pain) to 10 (severe pain). The client arrived with his friends after playing baseball outdoors and was struck by a baseball bat on the right side of his chest. Immediately after he sustained the injury, he reported sharp chest pain. Vital signs: T 99° F (37.2° C) P 94, RR 25, BP 127/76, pulse oximetry reading 89% on room air. He has a medical history of hemophilia A and asthma. On assessment, the client is alert and oriented and anxious. The client has labored breathing using his accessory muscles, and lung sounds are absent in the right-sided bases.', 0, '2025-09-08 04:28:39', '2025-09-08 04:28:39'),
(59, 101, 'Vital sign', '0800: Upon assessment, the client is visibly anxious and struggling to breathe, with pink frothy sputum noted during coughing.The client is experiencing sudden shortness of breath and chest tightness. Physical examination reveals bilateral crackles in all lung fields, jugular venous distension (JVD), and peripheral cyanosis. An ECG shows sinus tachycardia with no ischemic changes, and a chest X-ray reveals pulmonary vascular congestion. The client reports a history of chronic heart failure.', 0, '2025-09-08 04:28:39', '2025-09-08 04:28:39'),
(60, 108, 'Lab Report', 'Elevated serum creatinine detected on routine blood test.', 0, '2025-09-08 18:03:14', '2025-09-08 18:03:14'),
(61, 108, 'Symptom', 'Patient complains of persistent fatigue and decreased urine output.', 0, '2025-09-08 18:03:14', '2025-09-08 18:03:14'),
(62, 109, 'Triage Note', '1840: Client presents with dyspnea and right-sided chest pain that is worse when he takes a deep breath and coughs. Pain rated 7 on a scale of 0 (no pain) to 10 (severe pain). The client arrived with his friends after playing baseball outdoors and was struck by a baseball bat on the right side of his chest. Immediately after he sustained the injury, he reported sharp chest pain. Vital signs: T 99° F (37.2° C) P 94, RR 25, BP 127/76, pulse oximetry reading 89% on room air. He has a medical history of hemophilia A and asthma. On assessment, the client is alert and oriented and anxious. The client has labored breathing using his accessory muscles, and lung sounds are absent in the right-sided bases.', 0, '2025-09-08 18:43:12', '2025-09-08 18:43:12'),
(63, 109, 'Vital sign', '0800: Upon assessment, the client is visibly anxious and struggling to breathe, with pink frothy sputum noted during coughing.The client is experiencing sudden shortness of breath and chest tightness. Physical examination reveals bilateral crackles in all lung fields, jugular venous distension (JVD), and peripheral cyanosis. An ECG shows sinus tachycardia with no ischemic changes, and a chest X-ray reveals pulmonary vascular congestion. The client reports a history of chronic heart failure.', 0, '2025-09-08 18:43:12', '2025-09-08 18:43:12'),
(64, 110, 'Triage Note', '1840: Client presents with dyspnea and right-sided chest pain that is worse when he takes a deep breath and coughs. Pain rated 7 on a scale of 0 (no pain) to 10 (severe pain). The client arrived with his friends after playing baseball outdoors and was struck by a baseball bat on the right side of his chest. Immediately after he sustained the injury, he reported sharp chest pain. Vital signs: T 99° F (37.2° C) P 94, RR 25, BP 127/76, pulse oximetry reading 89% on room air. He has a medical history of hemophilia A and asthma. On assessment, the client is alert and oriented and anxious. The client has labored breathing using his accessory muscles, and lung sounds are absent in the right-sided bases.', 0, '2025-09-08 18:52:10', '2025-09-08 18:52:10'),
(65, 110, 'Vital sign', '0800: Upon assessment, the client is visibly anxious and struggling to breathe, with pink frothy sputum noted during coughing.The client is experiencing sudden shortness of breath and chest tightness. Physical examination reveals bilateral crackles in all lung fields, jugular venous distension (JVD), and peripheral cyanosis. An ECG shows sinus tachycardia with no ischemic changes, and a chest X-ray reveals pulmonary vascular congestion. The client reports a history of chronic heart failure.', 0, '2025-09-08 18:52:10', '2025-09-08 18:52:10'),
(66, 111, 'Triage Note', '1840: Client presents with dyspnea and right-sided chest pain that is worse when he takes a deep breath and coughs. Pain rated 7 on a scale of 0 (no pain) to 10 (severe pain). The client arrived with his friends after playing baseball outdoors and was struck by a baseball bat on the right side of his chest. Immediately after he sustained the injury, he reported sharp chest pain. Vital signs: T 99° F (37.2° C) P 94, RR 25, BP 127/76, pulse oximetry reading 89% on room air. He has a medical history of hemophilia A and asthma. On assessment, the client is alert and oriented and anxious. The client has labored breathing using his accessory muscles, and lung sounds are absent in the right-sided bases.', 0, '2025-09-08 18:52:55', '2025-09-08 18:52:55'),
(67, 111, 'Vital sign', '0800: Upon assessment, the client is visibly anxious and struggling to breathe, with pink frothy sputum noted during coughing.The client is experiencing sudden shortness of breath and chest tightness. Physical examination reveals bilateral crackles in all lung fields, jugular venous distension (JVD), and peripheral cyanosis. An ECG shows sinus tachycardia with no ischemic changes, and a chest X-ray reveals pulmonary vascular congestion. The client reports a history of chronic heart failure.', 0, '2025-09-08 18:52:55', '2025-09-08 18:52:55'),
(68, 115, 'Triage Note', '1840: Client presents with dyspnea and right-sided chest pain that is worse when he takes a deep breath and coughs. Pain rated 7 on a scale of 0 (no pain) to 10 (severe pain). The client arrived with his friends after playing baseball outdoors and was struck by a baseball bat on the right side of his chest. Immediately after he sustained the injury, he reported sharp chest pain. Vital signs: T 99° F (37.2° C) P 94, RR 25, BP 127/76, pulse oximetry reading 89% on room air. He has a medical history of hemophilia A and asthma. On assessment, the client is alert and oriented and anxious. The client has labored breathing using his accessory muscles, and lung sounds are absent in the right-sided bases.', 0, '2025-09-08 19:32:17', '2025-09-08 19:32:17'),
(69, 115, 'Vital sign', '0800: Upon assessment, the client is visibly anxious and struggling to breathe, with pink frothy sputum noted during coughing.The client is experiencing sudden shortness of breath and chest tightness. Physical examination reveals bilateral crackles in all lung fields, jugular venous distension (JVD), and peripheral cyanosis. An ECG shows sinus tachycardia with no ischemic changes, and a chest X-ray reveals pulmonary vascular congestion. The client reports a history of chronic heart failure.', 0, '2025-09-08 19:32:17', '2025-09-08 19:32:17'),
(70, 116, 'Triage Note', 'Client presents with dyspnea and right-sided chest pain that is worse when he takes a deep breath and coughs. Pain rated 7 on a scale of 0 (no pain) to 10 (severe pain). The client arrived with his friends after playing baseball outdoors and was struck by a baseball bat on the right side of his chest. Immediately after he sustained the injury, he reported sharp chest pain. Vital signs: T 99° F (37.2° C) P 94, RR 25, BP 127/76, pulse oximetry reading 89% on room air. He has a medical history of hemophilia A and asthma. On assessment, the client is alert and oriented and anxious. The client has labored breathing using his accessory muscles, and lung sounds are absent in the right-sided bases.', 0, '2025-09-08 20:09:51', '2025-09-08 20:09:51'),
(71, 119, 'Triage Note', 'Client presents with dyspnea and right-sided chest pain that is worse when he takes a deep breath and coughs. Pain rated 7 on a scale of 0 (no pain) to 10 (severe pain). The client arrived with his friends after playing baseball outdoors and was struck by a baseball bat on the right side of his chest. Immediately after he sustained the injury, he reported sharp chest pain. Vital signs: T 99° F (37.2° C) P 94, RR 25, BP 127/76, pulse oximetry reading 89% on room air. He has a medical history of hemophilia A and asthma. On assessment, the client is alert and oriented and anxious. The client has labored breathing using his accessory muscles, and lung sounds are absent in the right-sided bases.', 0, '2025-09-11 05:14:45', '2025-09-11 05:14:45'),
(72, 120, 'Lab Report', 'Elevated serum creatinine detected on routine blood test.', 0, '2025-09-11 05:14:59', '2025-09-11 05:14:59'),
(73, 120, 'Symptom', 'Patient complains of persistent fatigue and decreased urine output.', 0, '2025-09-11 05:14:59', '2025-09-11 05:14:59'),
(74, 123, 'Triage Note', '1840: Client presents with dyspnea and right-sided chest pain that is worse when he takes a deep breath and coughs. Pain rated 7 on a scale of 0 (no pain) to 10 (severe pain). The client arrived with his friends after playing baseball outdoors and was struck by a baseball bat on the right side of his chest. Immediately after he sustained the injury, he reported sharp chest pain. Vital signs: T 99° F (37.2° C) P 94, RR 25, BP 127/76, pulse oximetry reading 89% on room air. He has a medical history of hemophilia A and asthma. On assessment, the client is alert and oriented and anxious. The client has labored breathing using his accessory muscles, and lung sounds are absent in the right-sided bases.', 0, '2025-09-11 05:17:10', '2025-09-11 05:17:10'),
(75, 123, 'Vital sign', '0800: Upon assessment, the client is visibly anxious and struggling to breathe, with pink frothy sputum noted during coughing.The client is experiencing sudden shortness of breath and chest tightness. Physical examination reveals bilateral crackles in all lung fields, jugular venous distension (JVD), and peripheral cyanosis. An ECG shows sinus tachycardia with no ischemic changes, and a chest X-ray reveals pulmonary vascular congestion. The client reports a history of chronic heart failure.', 0, '2025-09-11 05:17:10', '2025-09-11 05:17:10'),
(76, 124, '12345', '1234567890', 0, '2025-09-11 05:40:04', '2025-09-11 05:40:04'),
(77, 125, 'Create a drag and drop question with multiple tabs and draggable sections.', 'Create a drag and drop question with multiple tabs and draggable sections.', 0, '2025-09-11 10:08:22', '2025-09-11 10:08:22'),
(78, 126, 'Create a dropdown question with multiple tabs and dropdown selections.', 'Create a dropdown question with multiple tabs and dropdown selections.\n\n', 0, '2025-09-11 10:29:52', '2025-09-11 10:29:52'),
(79, 127, 'Nurses notes', 'A 31-year-old male client was brought to the emergency department (ED) by police after being found\nacting bizarrely at a local park. The client is hyper-alert and oriented. His speech is fast, and\nrepeatedly states that \'someone is after him.\' He has vomited twice approximately 100 mL of opaque\nfluid.\nVital Signs\nOral temperature 99.5 F (37.5° C)\nPulse 110 bpm\nRespirations 22/minute\nBP 193/113 mm Hg\nOxygen saturation 95% on room air', 0, '2025-09-15 07:35:27', '2025-09-15 07:35:27'),
(80, 128, 'Progress Note (tab1)', '1500: Client is twelve weeks postoperative following gastric bypass surgery. The client\'s weight at this\nvisit was 245 pounds (111.36 kilograms), a decrease of 6 pounds since the previous visit (2.72\nkilograms) four weeks ago. She reports that she is starting to notice excess skin between her legs and\nupper arms. The client reports exercising regularly and eating solid foods with no reflux or nausea.\nIncision site appears fully healed with a minimal scar. The client reports no incisional pain. She reports\nfeeling full much sooner compared to before the surgery. Denies abdominal pain, nausea, vomiting,\nand diarrhea. She reports symmetric paresthesias in both the upper and lower extremities. She\nendorses forgetfulness and fatigue. Physical exam was unremarkable with the exception of two oral\nulcers.\n', 0, '2025-09-15 07:41:04', '2025-09-15 07:41:04'),
(81, 128, 'Medical History', 'Diabetes mellitus, type II\nGastric bypass surgery\nIrritable bowel syndrome\nThe nurse reviews the physician\'s progress note', 0, '2025-09-15 07:41:04', '2025-09-15 07:41:04'),
(82, 152, 'Triage Note', 'Client presents with dyspnea and right-sided chest pain that is worse when he takes a deep breath and coughs. Pain rated 7 on a scale of 0 (no pain) to 10 (severe pain). The client arrived with his friends after playing baseball outdoors and was struck by a baseball bat on the right side of his chest. Immediately after he sustained the injury, he reported sharp chest pain. Vital signs: T 99° F (37.2° C) P 94, RR 25, BP 127/76, pulse oximetry reading 89% on room air. He has a medical history of hemophilia A and asthma. On assessment, the client is alert and oriented and anxious. The client has labored breathing using his accessory muscles, and lung sounds are absent in the right-sided bases.', 0, '2025-09-17 16:12:55', '2025-09-17 16:12:55'),
(83, 161, 'Create a multiple radio question with tabs and sentence-based radio selections.', 'Create a multiple radio question with tabs and sentence-based radio selections.', 0, '2025-09-18 13:31:34', '2025-09-18 13:31:34'),
(84, 162, 'Lab Report', 'Elevated serum creatinine detected onroutine blood test.', 0, '2025-09-18 14:22:07', '2025-09-18 14:22:07'),
(85, 162, 'Symptom', 'Patient complains ofpersistent fatigue and decreased urine output.\"}', 0, '2025-09-18 14:22:07', '2025-09-18 14:22:07'),
(86, 163, 'Lab Report', 'Elevated serum creatinine detected onroutine blood test.', 0, '2025-09-18 14:30:12', '2025-09-18 14:30:12'),
(87, 163, 'Symptom', 'Patient complains ofpersistent fatigue and decreased urine output.\"}', 0, '2025-09-18 14:30:12', '2025-09-18 14:30:12'),
(88, 164, 'Lab Report', 'Elevated serum creatinine detected onroutine blood test.', 0, '2025-09-18 14:34:35', '2025-09-18 14:34:35'),
(89, 164, 'Symptom', 'Patient complains ofpersistent fatigue and decreased urine output.', 0, '2025-09-18 14:34:35', '2025-09-18 14:34:35'),
(90, 165, 'Triage Note', '1840: Client presents with dyspnea and right-sided chest pain that is worse when he takes a deep breath and coughs. Pain rated 7 on a scale of 0 (no pain) to 10 (severe pain). The client arrived with his friends after playing baseball outdoors and was struck by a baseball bat on the right side of his chest. Immediately after he sustained the injury, he reported sharp chest pain. Vital signs: T 99° F (37.2° C) P 94, RR 25, BP 127/76, pulse oximetry reading 89% on room air. He has a medical history of hemophilia A and asthma. On assessment, the client is alert and oriented and anxious. The client has labored breathing using his accessory muscles, and lung sounds are absent in the right-sided bases.', 0, '2025-09-19 07:14:05', '2025-09-19 07:14:05'),
(91, 165, 'Vital sign', '0800: Upon assessment, the client is visibly anxious and struggling to breathe, with pink frothy sputum noted during coughing.The client is experiencing sudden shortness of breath and chest tightness. Physical examination reveals bilateral crackles in all lung fields, jugular venous distension (JVD), and peripheral cyanosis. An ECG shows sinus tachycardia with no ischemic changes, and a chest X-ray reveals pulmonary vascular congestion. The client reports a history of chronic heart failure.', 0, '2025-09-19 07:14:05', '2025-09-19 07:14:05'),
(92, 166, 'Triage Note', '1840: Client presents with dyspnea and right-sided chest pain that is worse when he takes a deep breath and coughs. Pain rated 7 on a scale of 0 (no pain) to 10 (severe pain). The client arrived with his friends after playing baseball outdoors and was struck by a baseball bat on the right side of his chest. Immediately after he sustained the injury, he reported sharp chest pain. Vital signs: T 99° F (37.2° C) P 94, RR 25, BP 127/76, pulse oximetry reading 89% on room air. He has a medical history of hemophilia A and asthma. On assessment, the client is alert and oriented and anxious. The client has labored breathing using his accessory muscles, and lung sounds are absent in the right-sided bases.', 0, '2025-09-19 07:15:09', '2025-09-19 07:15:09'),
(93, 166, 'Vital sign', '0800: Upon assessment, the client is visibly anxious and struggling to breathe, with pink frothy sputum noted during coughing.The client is experiencing sudden shortness of breath and chest tightness. Physical examination reveals bilateral crackles in all lung fields, jugular venous distension (JVD), and peripheral cyanosis. An ECG shows sinus tachycardia with no ischemic changes, and a chest X-ray reveals pulmonary vascular congestion. The client reports a history of chronic heart failure.', 0, '2025-09-19 07:15:09', '2025-09-19 07:15:09'),
(94, 167, 'Triage Note', '1840: Client presents with dyspnea and right-sided chest pain that is worse when he takes a deep breath and coughs. Pain rated 7 on a scale of 0 (no pain) to 10 (severe pain). The client arrived with his friends after playing baseball outdoors and was struck by a baseball bat on the right side of his chest. Immediately after he sustained the injury, he reported sharp chest pain. Vital signs: T 99° F (37.2° C) P 94, RR 25, BP 127/76, pulse oximetry reading 89% on room air. He has a medical history of hemophilia A and asthma. On assessment, the client is alert and oriented and anxious. The client has labored breathing using his accessory muscles, and lung sounds are absent in the right-sided bases.', 0, '2025-09-19 08:02:51', '2025-09-19 08:02:51'),
(95, 167, 'Vital sign', '0800: Upon assessment, the client is visibly anxious and struggling to breathe, with pink frothy sputum noted during coughing.The client is experiencing sudden shortness of breath and chest tightness. Physical examination reveals bilateral crackles in all lung fields, jugular venous distension (JVD), and peripheral cyanosis. An ECG shows sinus tachycardia with no ischemic changes, and a chest X-ray reveals pulmonary vascular congestion. The client reports a history of chronic heart failure.', 0, '2025-09-19 08:02:51', '2025-09-19 08:02:51');

-- --------------------------------------------------------

--
-- Table structure for table `tb_questionType`
--

CREATE TABLE `tb_questionType` (
  `id` int(11) NOT NULL,
  `type` varchar(100) NOT NULL,
  `status` varchar(500) NOT NULL DEFAULT 'active',
  `isDeleted` tinyint(1) DEFAULT 0,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tb_questionType`
--

INSERT INTO `tb_questionType` (`id`, `type`, `status`, `isDeleted`, `createdAt`, `updatedAt`) VALUES
(7, 'MCQ', 'active', 0, '2025-07-15 06:10:27', '2025-07-15 06:10:27'),
(8, 'Dropdown', 'active', 0, '2025-07-15 06:10:43', '2025-07-15 06:10:43'),
(9, 'Drag Drop', 'active', 0, '2025-07-15 06:11:10', '2025-07-15 06:11:10'),
(10, 'Multiple Radio', 'active', 0, '2025-07-15 06:11:41', '2025-07-15 06:11:41'),
(11, 'Sorting', 'active', 0, '2025-07-15 06:11:53', '2025-07-15 06:11:53'),
(12, 'Sentence Highlight', 'active', 0, '2025-07-15 06:12:22', '2025-07-15 06:15:18'),
(13, 'Fill in the Blanks', 'active', 0, '2025-07-15 06:14:12', '2025-07-16 07:36:56');

-- --------------------------------------------------------

--
-- Table structure for table `tb_recordings`
--

CREATE TABLE `tb_recordings` (
  `r_id` int(11) NOT NULL,
  `r_thumbnail` varchar(255) DEFAULT NULL,
  `r_title` varchar(255) DEFAULT NULL,
  `r_record_date` date NOT NULL,
  `r_course` int(11) DEFAULT NULL,
  `r_duration` varchar(50) DEFAULT NULL,
  `r_tutor_name` varchar(100) DEFAULT NULL,
  `r_video_url` varchar(255) DEFAULT NULL,
  `r_created_at` timestamp NULL DEFAULT current_timestamp(),
  `r_update_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tb_recordings`
--

INSERT INTO `tb_recordings` (`r_id`, `r_thumbnail`, `r_title`, `r_record_date`, `r_course`, `r_duration`, `r_tutor_name`, `r_video_url`, `r_created_at`, `r_update_at`) VALUES
(39, '/uploads/records/1758165158826-430443155.png', 'cleft lip and cleft palate , OA and TOF, Hirschsprungs disease and intussusception', '0000-00-00', 12, '1', 'Ancy ', 'https://drive.google.com/file/d/1yO4bOM7z_8WyWyFLwgOu7iY3tsftoWuM/view?usp=drive_link', '2025-09-18 03:12:40', '2025-09-18 03:12:40'),
(40, '/uploads/records/1758217125100-130490111.png', 'Pediatric GI question discussion', '0000-00-00', 12, '1', 'Ancy ', 'https://drive.google.com/file/d/1NBWBJQO4s-_rzBUsMy79Fk-RtfNItgLt/view?usp=drive_link', '2025-09-18 17:38:45', '2025-09-18 17:38:45'),
(44, '/uploads/records/1758269958270-23589737.png', 'Engineering graphics', '2025-09-18', 12, '20 min', 'Jithin', 'https://drive.google.com/file/d/1SMEMOO6y2oOYbynGO8ef6-nIVRSL3d_y/view?usp=drive_link', '2025-09-19 08:19:18', '2025-09-19 08:19:18');

-- --------------------------------------------------------

--
-- Table structure for table `tb_sentanceHighlight`
--

CREATE TABLE `tb_sentanceHighlight` (
  `id` int(11) NOT NULL,
  `questionId` int(11) NOT NULL,
  `options` varchar(500) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tb_sentanceHighlight`
--

INSERT INTO `tb_sentanceHighlight` (`id`, `questionId`, `options`, `createdAt`, `updatedAt`) VALUES
(200, 110, 'test1', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(201, 110, 'test2', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(202, 110, 'test3', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(203, 111, 'test1', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(204, 111, 'test2', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(205, 111, 'test3', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(206, 124, 'main', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(207, 128, 'She reports symmetric paresthesias in both the upper and lower extremities.', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(208, 128, 'She endorses forgetfulness and fatigue.', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(209, 128, 'Physical exam unremarkable with the exception of two oral ulcers', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(210, 165, 'test1', '2025-09-19 07:14:02', '2025-09-19 07:14:02'),
(211, 165, 'test2', '2025-09-19 07:14:02', '2025-09-19 07:14:02'),
(212, 165, 'test3', '2025-09-19 07:14:02', '2025-09-19 07:14:02'),
(213, 166, 'test1', '2025-09-19 07:15:05', '2025-09-19 07:15:05'),
(214, 166, 'test2', '2025-09-19 07:15:06', '2025-09-19 07:15:06'),
(215, 166, 'test3', '2025-09-19 07:15:06', '2025-09-19 07:15:06'),
(216, 167, 'test1', '2025-09-19 08:02:50', '2025-09-19 08:02:50'),
(217, 167, 'test2', '2025-09-19 08:02:50', '2025-09-19 08:02:50'),
(218, 167, 'test3', '2025-09-19 08:02:50', '2025-09-19 08:02:50');

-- --------------------------------------------------------

--
-- Table structure for table `tb_sentenceHighlightAnswers`
--

CREATE TABLE `tb_sentenceHighlightAnswers` (
  `id` int(11) NOT NULL,
  `answer` longtext NOT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `questionId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tb_sortItems`
--

CREATE TABLE `tb_sortItems` (
  `id` int(11) NOT NULL,
  `questionId` int(11) DEFAULT NULL,
  `sortItem` varchar(255) NOT NULL,
  `itemOrder` int(11) NOT NULL,
  `isDeleted` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tb_sortItems`
--

INSERT INTO `tb_sortItems` (`id`, `questionId`, `sortItem`, `itemOrder`, `isDeleted`) VALUES
(1, 16, '12345', 1, 0),
(2, 16, '345', 2, 0),
(3, 16, '5678', 3, 0),
(4, 16, '91213', 4, 0),
(5, 67, 'Insert catheter without applying suction.', 1, 0),
(6, 67, 'Turn on the suction device and set appropriate pressure', 2, 0),
(7, 67, 'Don sterile gloves and prepare catheter.', 3, 0),
(8, 67, 'Apply suction while withdrawing the catheter slowly', 4, 0),
(9, 67, 'Reassess client\'s respiratory status.', 5, 0),
(10, 72, 'Turn on the suction device and set appropriate pressure', 1, 0),
(11, 72, 'Don sterile gloves and prepare catheter.', 2, 0),
(12, 72, 'Insert catheter without applying suction.', 3, 0),
(13, 72, 'Apply suction while withdrawing the catheter slowly.', 4, 0),
(14, 72, 'Reassess client\'s respiratory status.', 5, 0),
(15, 87, 'Turn on the suction device and set appropriate pressure.', 1, 0),
(16, 87, 'Don sterile gloves and prepare catheter.', 2, 0),
(17, 87, 'Insert catheter without applying suction.', 3, 0),
(18, 87, 'Apply suction while withdrawing the catheter slowly.', 4, 0),
(19, 87, 'Reassess client\'s respiratory status.', 5, 0),
(20, 98, 'Turn on the suction device and set appropriatepressure.', 1, 0),
(21, 98, 'Don sterile gloves and preparecatheter.', 2, 0),
(22, 98, 'catheter without applyingsuction.', 3, 0),
(23, 98, 'Apply suction while withdrawing the catheterslowly', 4, 0),
(24, 121, 'Turn on the suction device and set appropriate pressure.', 1, 0),
(25, 121, 'Don sterile gloves and prepare catheter.', 2, 0),
(26, 121, 'Insert catheter without applying suction.', 3, 0),
(27, 121, 'Apply suction while withdrawing the catheter slowly.', 4, 0),
(28, 121, 'Reassess client\'s respiratory status.', 5, 0),
(29, 122, 'Turn on the suction device and set appropriate pressure.', 1, 0),
(30, 122, 'Don sterile gloves and prepare catheter.', 2, 0),
(31, 122, 'Insert catheter without applying suction.', 3, 0),
(32, 122, 'Apply suction while withdrawing the catheter slowly.', 4, 0),
(33, 122, 'Reassess client\'s respiratory status.', 5, 0);

-- --------------------------------------------------------

--
-- Table structure for table `tb_submittedQuestions`
--

CREATE TABLE `tb_submittedQuestions` (
  `sq_id` int(11) NOT NULL,
  `sq_user_id` int(11) NOT NULL,
  `sq_test_id` int(11) NOT NULL,
  `sq_question_id` int(11) NOT NULL,
  `sq_is_correct` tinyint(1) DEFAULT NULL,
  `sq_mark` float DEFAULT NULL,
  `sq_created_at` timestamp NULL DEFAULT current_timestamp(),
  `sq_updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tb_submittedQuestions`
--

INSERT INTO `tb_submittedQuestions` (`sq_id`, `sq_user_id`, `sq_test_id`, `sq_question_id`, `sq_is_correct`, `sq_mark`, `sq_created_at`, `sq_updated_at`) VALUES
(1, 37, 39, 74, 1, 5, '2025-09-06 06:45:31', '2025-09-06 06:45:31'),
(2, 37, 39, 74, 1, 5, '2025-09-06 06:59:27', '2025-09-06 06:59:27'),
(3, 37, 39, 74, 1, 5, '2025-09-06 07:19:36', '2025-09-06 07:19:36'),
(4, 37, 39, 74, 1, 5, '2025-09-06 07:22:53', '2025-09-06 07:22:53'),
(5, 37, 39, 78, 1, 5, '2025-09-06 09:04:46', '2025-09-06 09:04:46'),
(6, 37, 39, 78, 1, 5, '2025-09-06 09:06:27', '2025-09-06 09:06:27'),
(7, 37, 39, 78, 1, 5, '2025-09-06 09:08:36', '2025-09-06 09:08:36'),
(8, 37, 39, 78, 1, 5, '2025-09-06 09:20:15', '2025-09-06 09:20:15'),
(9, 37, 39, 74, 1, 5, '2025-09-06 09:55:41', '2025-09-06 09:55:41'),
(10, 37, 39, 74, 1, 5, '2025-09-06 10:36:25', '2025-09-06 10:36:25'),
(11, 37, 40, 73, 1, 5, '2025-09-08 06:54:58', '2025-09-08 06:54:58'),
(12, 37, 40, 73, 1, 5, '2025-09-08 08:40:57', '2025-09-08 08:40:57'),
(13, 37, 40, 70, 1, 5, '2025-09-08 09:18:56', '2025-09-08 09:18:56'),
(14, 37, 40, 73, 1, 5, '2025-09-11 05:30:41', '2025-09-11 05:30:41');

-- --------------------------------------------------------

--
-- Table structure for table `tb_submittedTest`
--

CREATE TABLE `tb_submittedTest` (
  `st_id` int(11) NOT NULL,
  `st_user_id` int(11) NOT NULL,
  `st_test_id` int(11) NOT NULL,
  `st_score` double DEFAULT NULL,
  `st_created_at` timestamp NULL DEFAULT current_timestamp(),
  `st_updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `is_submitted` tinyint(1) DEFAULT 0,
  `status` enum('pending','completed') DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tb_submittedTest`
--

INSERT INTO `tb_submittedTest` (`st_id`, `st_user_id`, `st_test_id`, `st_score`, `st_created_at`, `st_updated_at`, `is_submitted`, `status`) VALUES
(1, 37, 39, 3, '2025-08-13 08:40:28', '2025-09-08 04:52:22', 0, 'pending'),
(2, 37, 37, 0, '2025-09-08 08:19:48', '2025-09-08 08:19:48', 0, 'pending'),
(3, 37, 40, 5, '2025-09-08 08:28:26', '2025-09-08 08:28:26', 0, 'pending'),
(4, 37, 40, 5, '2025-09-08 08:29:52', '2025-09-08 08:29:52', 0, 'pending'),
(5, 37, 40, 15, '2025-09-08 09:19:33', '2025-09-08 09:19:33', 0, 'pending'),
(6, 37, 40, 15, '2025-09-09 03:23:05', '2025-09-12 17:53:11', 1, 'completed'),
(7, 37, 41, 0, '2025-09-09 05:17:50', '2025-09-09 05:17:50', 0, 'pending'),
(8, 37, 41, 0, '2025-09-09 08:21:07', '2025-09-09 08:21:07', 0, 'pending'),
(9, 37, 41, 0, '2025-09-11 05:30:16', '2025-09-11 05:30:16', 0, 'pending'),
(10, 37, 46, 0, '2025-09-12 18:15:19', '2025-09-13 08:23:08', 1, 'completed'),
(11, 37, 46, 0, '2025-09-13 07:26:38', '2025-09-13 08:23:08', 1, 'completed'),
(12, 37, 46, 0, '2025-09-13 07:37:42', '2025-09-13 08:23:08', 1, 'completed'),
(13, 37, 46, 0, '2025-09-13 07:56:49', '2025-09-13 08:23:08', 1, 'completed'),
(14, 37, 46, 0, '2025-09-13 08:23:08', '2025-09-13 08:23:08', 1, 'completed');

-- --------------------------------------------------------

--
-- Table structure for table `tb_tabImages`
--

CREATE TABLE `tb_tabImages` (
  `id` int(11) NOT NULL,
  `imageUrl` varchar(255) NOT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tb_tabImages`
--

INSERT INTO `tb_tabImages` (`id`, `imageUrl`, `createdAt`, `updatedAt`) VALUES
(2, '/uploads/tabImage/1758010218773-295071297.jpeg', '2025-09-16 08:10:18', '2025-09-16 08:10:18'),
(3, '/uploads/tabImage/1758010221979-139612575.jpeg', '2025-09-16 08:10:22', '2025-09-16 08:10:22'),
(4, '/uploads/tabImage/1758010300654-568614957.jpeg', '2025-09-16 08:11:40', '2025-09-16 08:11:40'),
(5, '/uploads/tabImage/1758010457632-904837111.jpeg', '2025-09-16 08:14:17', '2025-09-16 08:14:17'),
(6, '/uploads/tabImage/1758010515471-217829845.jpeg', '2025-09-16 08:15:15', '2025-09-16 08:15:15');

-- --------------------------------------------------------

--
-- Table structure for table `tb_testQuestions`
--

CREATE TABLE `tb_testQuestions` (
  `id` int(11) NOT NULL,
  `testId` int(11) DEFAULT NULL,
  `questionId` int(11) DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tb_testQuestions`
--

INSERT INTO `tb_testQuestions` (`id`, `testId`, `questionId`, `createdAt`, `updatedAt`) VALUES
(45, 16, 13, '2025-08-27 09:13:41', NULL),
(46, 16, 18, '2025-08-27 09:13:41', NULL),
(47, 16, 15, '2025-08-27 09:13:41', NULL),
(48, 17, 13, '2025-08-30 03:45:35', NULL),
(49, 17, 18, '2025-08-30 03:45:35', NULL),
(50, 17, 15, '2025-08-30 03:45:35', NULL),
(51, 18, 47, '2025-08-30 04:24:06', NULL),
(52, 19, 47, '2025-08-30 04:24:08', NULL),
(53, 20, 47, '2025-08-30 04:24:08', NULL),
(54, 21, 47, '2025-08-30 04:24:09', NULL),
(55, 22, 47, '2025-08-30 04:24:09', NULL),
(56, 23, 47, '2025-08-30 04:24:19', NULL),
(57, 23, 54, '2025-08-30 04:24:19', NULL),
(69, 33, 54, '2025-08-30 05:04:40', NULL),
(70, 34, 51, '2025-08-30 05:05:06', NULL),
(71, 35, 51, '2025-08-30 05:14:10', NULL),
(72, 1, 12, '2025-08-30 09:12:39', NULL),
(73, 1, 18, '2025-08-30 09:12:39', NULL),
(74, 1, 35, '2025-08-30 09:12:39', NULL),
(78, 36, 70, '2025-09-01 05:56:58', NULL),
(79, 37, 71, '2025-09-01 05:57:42', NULL),
(80, 37, 70, '2025-09-01 05:57:42', NULL),
(81, 37, 69, '2025-09-01 05:57:42', NULL),
(82, 38, 78, '2025-09-01 10:43:06', NULL),
(83, 38, 74, '2025-09-01 10:43:06', NULL),
(84, 38, 73, '2025-09-01 10:43:06', NULL),
(85, 38, 72, '2025-09-01 10:43:06', NULL),
(86, 38, 71, '2025-09-01 10:43:06', NULL),
(87, 38, 69, '2025-09-01 10:43:06', NULL),
(122, 39, 12, '2025-09-06 15:28:22', NULL),
(123, 39, 18, '2025-09-06 15:28:22', NULL),
(124, 39, 35, '2025-09-06 15:28:22', NULL),
(125, 40, 70, '2025-09-08 06:53:49', NULL),
(126, 40, 72, '2025-09-08 06:53:49', NULL),
(127, 40, 73, '2025-09-08 06:53:49', NULL),
(128, 40, 74, '2025-09-08 06:53:49', NULL),
(129, 40, 78, '2025-09-08 06:53:49', NULL),
(130, 40, 87, '2025-09-08 06:53:49', NULL),
(131, 40, 84, '2025-09-08 06:53:49', NULL),
(132, 40, 71, '2025-09-08 06:53:49', NULL),
(133, 40, 68, '2025-09-08 06:53:49', NULL),
(134, 40, 69, '2025-09-08 06:53:49', NULL),
(135, 41, 87, '2025-09-08 09:33:11', NULL),
(136, 41, 72, '2025-09-08 09:33:11', NULL),
(137, 41, 69, '2025-09-08 09:33:11', NULL),
(138, 42, 13, '2025-09-09 10:37:34', NULL),
(139, 42, 18, '2025-09-09 10:37:34', NULL),
(140, 42, 15, '2025-09-09 10:37:34', NULL),
(141, 43, 13, '2025-09-09 10:39:02', NULL),
(142, 43, 18, '2025-09-09 10:39:03', NULL),
(143, 43, 15, '2025-09-09 10:39:03', NULL),
(150, 44, 12, '2025-09-09 11:20:52', NULL),
(151, 44, 18, '2025-09-09 11:20:52', NULL),
(152, 44, 35, '2025-09-09 11:20:52', NULL),
(156, 46, 108, '2025-09-11 10:47:10', NULL),
(157, 46, 120, '2025-09-11 10:47:10', NULL),
(158, 46, 78, '2025-09-11 10:47:10', NULL),
(159, 47, 13, '2025-09-16 06:15:32', NULL),
(160, 47, 18, '2025-09-16 06:15:32', NULL),
(161, 47, 15, '2025-09-16 06:15:33', NULL),
(162, 48, 164, '2025-09-18 14:35:49', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tb_tests`
--

CREATE TABLE `tb_tests` (
  `id` int(11) NOT NULL,
  `fromDate` date DEFAULT NULL,
  `toDate` date DEFAULT NULL,
  `testTitle` varchar(100) DEFAULT NULL,
  `totalQuestions` int(11) NOT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `createdAt` timestamp NULL DEFAULT current_timestamp(),
  `courseId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tb_tests`
--

INSERT INTO `tb_tests` (`id`, `fromDate`, `toDate`, `testTitle`, `totalQuestions`, `updatedAt`, `createdAt`, `courseId`) VALUES
(47, '2025-09-19', '2025-09-16', 'annual test 122', 3, NULL, '2025-09-16 06:15:32', 12),
(48, '2025-09-18', '2025-09-23', 'Test Question Check', 1, NULL, '2025-09-18 14:35:49', 12);

-- --------------------------------------------------------

--
-- Table structure for table `tb_users`
--

CREATE TABLE `tb_users` (
  `id` int(11) NOT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `mobile` varchar(20) DEFAULT NULL,
  `role` varchar(500) NOT NULL DEFAULT 'user',
  `created_At` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `target_exam` int(11) DEFAULT NULL,
  `class_type` varchar(100) DEFAULT NULL,
  `status` varchar(50) DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tb_users`
--

INSERT INTO `tb_users` (`id`, `firstname`, `lastname`, `email`, `password`, `mobile`, `role`, `created_At`, `updatedAt`, `target_exam`, `class_type`, `status`) VALUES
(2, 'anoop', 'jose', 'anoopjosecj@gmail.com', '$2a$10$xCG99udxj9r4HTifwUpE6OofsRexZgdBcepDAoI/DP3xd3jpw4AyK', '9249902771', 'admin', '2025-08-26 03:43:29', '2025-08-26 03:43:29', 12, NULL, 'active'),
(41, 'Veena Sarojam ', NULL, 'veenasprathapan@gmail.com', '$2b$10$rwNvAzKIrhLf57vlOz9S3e2HAJgu4yJRgj.43PuN4y5yshES0HZTG', '8129598281', 'student', '2025-09-16 07:24:44', '2025-09-16 07:24:44', 12, NULL, 'active'),
(42, 'Jithin pm', NULL, 'jithinpm.official@gmail.com', '$2b$10$jwOfwNQEnLlqNCqOJ918se2ynXn1FW/qT8oiJLwDCFEBqN.F5iiba', '7560844748', 'student', '2025-09-17 16:18:59', '2025-09-17 16:18:59', 12, NULL, 'active');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`cs_id`);

--
-- Indexes for table `DragAndDrop_Headings`
--
ALTER TABLE `DragAndDrop_Headings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `DragAndDrop_Headings_Options`
--
ALTER TABLE `DragAndDrop_Headings_Options`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_additionalInfo`
--
ALTER TABLE `tb_additionalInfo`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_contact_us`
--
ALTER TABLE `tb_contact_us`
  ADD PRIMARY KEY (`cu_id`);

--
-- Indexes for table `tb_dropdownOptions`
--
ALTER TABLE `tb_dropdownOptions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `questionId` (`questionId`);

--
-- Indexes for table `tb_dropdowns`
--
ALTER TABLE `tb_dropdowns`
  ADD PRIMARY KEY (`id`),
  ADD KEY `questionId` (`questionId`);

--
-- Indexes for table `tb_explanation`
--
ALTER TABLE `tb_explanation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `questionId` (`questionId`);

--
-- Indexes for table `tb_fillTheBlanks`
--
ALTER TABLE `tb_fillTheBlanks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_fillTheBlanks_options`
--
ALTER TABLE `tb_fillTheBlanks_options`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_marklist`
--
ALTER TABLE `tb_marklist`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_mcqAnswers`
--
ALTER TABLE `tb_mcqAnswers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_mcqOptions`
--
ALTER TABLE `tb_mcqOptions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `questionId` (`questionId`);

--
-- Indexes for table `tb_MultipleRadio`
--
ALTER TABLE `tb_MultipleRadio`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_MultipleRadio_RadioOptions`
--
ALTER TABLE `tb_MultipleRadio_RadioOptions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_notes`
--
ALTER TABLE `tb_notes`
  ADD PRIMARY KEY (`n_id`);

--
-- Indexes for table `tb_questions`
--
ALTER TABLE `tb_questions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_questionTabs`
--
ALTER TABLE `tb_questionTabs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `questionId` (`questionId`);

--
-- Indexes for table `tb_questionType`
--
ALTER TABLE `tb_questionType`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_recordings`
--
ALTER TABLE `tb_recordings`
  ADD PRIMARY KEY (`r_id`);

--
-- Indexes for table `tb_sentanceHighlight`
--
ALTER TABLE `tb_sentanceHighlight`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_sentenceHighlightAnswers`
--
ALTER TABLE `tb_sentenceHighlightAnswers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_sortItems`
--
ALTER TABLE `tb_sortItems`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_submittedQuestions`
--
ALTER TABLE `tb_submittedQuestions`
  ADD PRIMARY KEY (`sq_id`);

--
-- Indexes for table `tb_submittedTest`
--
ALTER TABLE `tb_submittedTest`
  ADD PRIMARY KEY (`st_id`);

--
-- Indexes for table `tb_tabImages`
--
ALTER TABLE `tb_tabImages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_testQuestions`
--
ALTER TABLE `tb_testQuestions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_tests`
--
ALTER TABLE `tb_tests`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_users`
--
ALTER TABLE `tb_users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `cs_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `DragAndDrop_Headings`
--
ALTER TABLE `DragAndDrop_Headings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `DragAndDrop_Headings_Options`
--
ALTER TABLE `DragAndDrop_Headings_Options`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=143;

--
-- AUTO_INCREMENT for table `tb_additionalInfo`
--
ALTER TABLE `tb_additionalInfo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=106;

--
-- AUTO_INCREMENT for table `tb_contact_us`
--
ALTER TABLE `tb_contact_us`
  MODIFY `cu_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `tb_dropdownOptions`
--
ALTER TABLE `tb_dropdownOptions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;

--
-- AUTO_INCREMENT for table `tb_dropdowns`
--
ALTER TABLE `tb_dropdowns`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `tb_explanation`
--
ALTER TABLE `tb_explanation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=161;

--
-- AUTO_INCREMENT for table `tb_fillTheBlanks`
--
ALTER TABLE `tb_fillTheBlanks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `tb_fillTheBlanks_options`
--
ALTER TABLE `tb_fillTheBlanks_options`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tb_marklist`
--
ALTER TABLE `tb_marklist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tb_mcqAnswers`
--
ALTER TABLE `tb_mcqAnswers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

--
-- AUTO_INCREMENT for table `tb_mcqOptions`
--
ALTER TABLE `tb_mcqOptions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=300;

--
-- AUTO_INCREMENT for table `tb_MultipleRadio`
--
ALTER TABLE `tb_MultipleRadio`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- AUTO_INCREMENT for table `tb_MultipleRadio_RadioOptions`
--
ALTER TABLE `tb_MultipleRadio_RadioOptions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `tb_notes`
--
ALTER TABLE `tb_notes`
  MODIFY `n_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tb_questions`
--
ALTER TABLE `tb_questions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=168;

--
-- AUTO_INCREMENT for table `tb_questionTabs`
--
ALTER TABLE `tb_questionTabs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=96;

--
-- AUTO_INCREMENT for table `tb_questionType`
--
ALTER TABLE `tb_questionType`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `tb_recordings`
--
ALTER TABLE `tb_recordings`
  MODIFY `r_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `tb_sentanceHighlight`
--
ALTER TABLE `tb_sentanceHighlight`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=219;

--
-- AUTO_INCREMENT for table `tb_sentenceHighlightAnswers`
--
ALTER TABLE `tb_sentenceHighlightAnswers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT for table `tb_sortItems`
--
ALTER TABLE `tb_sortItems`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `tb_submittedQuestions`
--
ALTER TABLE `tb_submittedQuestions`
  MODIFY `sq_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `tb_submittedTest`
--
ALTER TABLE `tb_submittedTest`
  MODIFY `st_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `tb_tabImages`
--
ALTER TABLE `tb_tabImages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tb_testQuestions`
--
ALTER TABLE `tb_testQuestions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=163;

--
-- AUTO_INCREMENT for table `tb_tests`
--
ALTER TABLE `tb_tests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `tb_users`
--
ALTER TABLE `tb_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tb_mcqOptions`
--
ALTER TABLE `tb_mcqOptions`
  ADD CONSTRAINT `tb_mcqOptions_ibfk_1` FOREIGN KEY (`questionId`) REFERENCES `tb_questions` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
