-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 27, 2026 at 02:58 PM
-- Server version: 10.4.10-MariaDB
-- PHP Version: 7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `surf_tracker`
--

-- --------------------------------------------------------

--
-- Table structure for table `surfspots`
--

CREATE TABLE `surfspots` (
  `id` int(11) NOT NULL,
  `spot_name` varchar(100) NOT NULL,
  `difficulty` int(11) NOT NULL,
  `type` varchar(20) NOT NULL,
  `location` varchar(100) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `surfspots`
--

INSERT INTO `surfspots` (`id`, `spot_name`, `difficulty`, `type`, `location`, `user_id`) VALUES
(5, 'Reefim', 9, 'reef', 'Haifa, Israel', NULL),
(13, '123', 123, '123', '123', NULL),
(14, '3456', 3456, '3456', '3456', NULL),
(33, 'aaaaa', 0, 'loadSpots', 'loadSpots', NULL),
(34, 'aaaaa', 0, 'loadSpots', 'loadSpots', NULL),
(35, 'aaaaa', 0, 'loadSpots', 'loadSpots', NULL),
(36, 'aaaaa', 0, 'loadSpots', 'loadSpots', NULL),
(37, 'aaaaa', 0, 'loadSpots', 'loadSpots', NULL),
(38, '', 0, '', '', NULL),
(39, '', 0, '', '', NULL),
(40, '', 0, '', '', NULL),
(41, '', 0, '', '', NULL),
(42, '', 0, '', 'sa', NULL),
(43, '', 0, 'sa', 'sa', NULL),
(44, '', 0, 'sa', 'sa', NULL),
(45, 'as', 0, 'sa', 'sa', NULL),
(53, 'ya', 0, 'sa', 'sa', 1),
(54, 'asas', 0, 'sasa', 'sa', 1),
(55, 'was', 0, 'asa', 's', 2);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `email` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`) VALUES
(1, 'yamen', 'surf123', 'yamen@example.com'),
(2, 'wassim', 'wass1', 'wassim@example.com'),
(3, 'saleh', 'saleh1', 'saleh@example.com'),
(4, 'sam', 'sam1', 'sam@example.com'),
(5, 'adam', 'adam1', 'adam@example.com'),
(6, 'mali', 'wass', 'mali@example.com'),
(7, 'testforwassim', 'wass1', NULL),
(8, 'husss', 'Hy123Hy', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_spots`
--

CREATE TABLE `user_spots` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `spot_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `surfspots`
--
ALTER TABLE `surfspots`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_spots`
--
ALTER TABLE `user_spots`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `spot_id` (`spot_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `surfspots`
--
ALTER TABLE `surfspots`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `user_spots`
--
ALTER TABLE `user_spots`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `user_spots`
--
ALTER TABLE `user_spots`
  ADD CONSTRAINT `user_spots_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `user_spots_ibfk_2` FOREIGN KEY (`spot_id`) REFERENCES `surfspots` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
