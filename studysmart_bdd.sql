-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: mysql-studysmart.alwaysdata.net
-- Generation Time: Nov 10, 2023 at 12:16 PM
-- Server version: 10.6.14-MariaDB
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `studysmart_bdd`
--

-- --------------------------------------------------------

--
-- Table structure for table `Comments`
--

CREATE TABLE `Comments` (
  `id` int(11) NOT NULL,
  `publication_id` int(11) NOT NULL,
  `text` text NOT NULL,
  `reaction` text NOT NULL,
  `reponse` text NOT NULL,
  `date` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Profile`
--

CREATE TABLE `Profile` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `gender` text NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Publication`
--

CREATE TABLE `Publication` (
  `id` int(11) NOT NULL,
  `profile_id` int(11) NOT NULL,
  `title` char(255) NOT NULL,
  `description` text NOT NULL,
  `date` date NOT NULL DEFAULT current_timestamp(),
  `text` text NOT NULL,
  `link` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Publication`
--

INSERT INTO `Publication` (`id`, `profile_id`, `title`, `description`, `date`, `text`, `link`) VALUES
(1, 0, 'yrs', 'azer', '2023-11-08', 'edvdv', ''),
(2, 1, 'azer', 'fdf', '2023-11-08', '', 'vdq');

-- --------------------------------------------------------

--
-- Table structure for table `User`
--

CREATE TABLE `User` (
  `id` int(11) NOT NULL,
  `lastname` text NOT NULL,
  `firstname` text NOT NULL,
  `email` text NOT NULL,
  `username` text NOT NULL,
  `password` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `User`
--

INSERT INTO `User` (`id`, `lastname`, `firstname`, `email`, `username`, `password`) VALUES
(1, 'lili', 'jiji', 'jiji.lili@gmail.com', 'lilijiji', '::'),
(2, 'Petersen', 'Maria', 'mau.petersen', '', '::'),
(3, 'aze', 'zer', 'gqq', 'zg', '::'),
(4, 'Petersen', 'Maria', 'mau.petersen@gmail.com', 'maupowaa', '::'),
(5, 'Jensen', 'Mette', 'plouf@gmail.com', 'plouf', '$2y$10$T6gIK5rhB0Le6cShaoscQuhffUVBmN9dE0sa3BxWrtLBaQXPs3yXu\''),
(6, 'Ibsen', 'Po', 'pooooooo@gmail.com', 'po37', 'mypo'),
(7, 'undefined', 'undefined', 'undefined', 'undefined', '[object Promise]'),
(8, 'loki', 'god', 'loki', 'cooleme', 'test'),
(9, 'emi', 'pop', 'emi@gm.com', 'cacou', 'test'),
(10, 'paul', 'pop', 'popop@gm.com', 'paulette', '$2b$10$1wdnNqP1vuEB7wpj4sJvwOhKn.pEbKHdwWrNFizdo.dbua0sZZzYm'),
(11, 'paul', 'pop', 'poopopopopopopo@gm.com', 'paupaaaar', '$2b$10$d20MEyw3etlCYtWyUuyBDeKmDtkueBOWdLPVeyI8tzMRLbFxzCIe2'),
(12, 'paul', 'pipip', 'beer@gm.com', 'paupkikor', '$2b$10$LPSADHPEu8nFJKXaEOy5J.1ftAYuEi8/IWoZ1KTNItgcIQkdSF0jG');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Comments`
--
ALTER TABLE `Comments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Profile`
--
ALTER TABLE `Profile`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Publication`
--
ALTER TABLE `Publication`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`) USING HASH,
  ADD UNIQUE KEY `email` (`email`) USING HASH;

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Comments`
--
ALTER TABLE `Comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Profile`
--
ALTER TABLE `Profile`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Publication`
--
ALTER TABLE `Publication`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `User`
--
ALTER TABLE `User`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
