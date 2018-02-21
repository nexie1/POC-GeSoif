-- phpMyAdmin SQL Dump
-- version 4.1.4
-- http://www.phpmyadmin.net
--
-- Client :  127.0.0.1
-- Généré le :  Mer 04 Mai 2016 à 13:18
-- Version du serveur :  5.6.15-log
-- Version de PHP :  5.4.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données :  `db_gesoif`
--

-- --------------------------------------------------------

--
-- Structure de la table `t_fountain`
--

CREATE TABLE IF NOT EXISTS `t_fountain` (
  `idFountain` bigint(20) NOT NULL AUTO_INCREMENT,
  `title` varchar(80) NOT NULL DEFAULT 'Eau',
  `latitude` float(10,6) NOT NULL,
  `longitude` float(10,6) NOT NULL,
  `address` varchar(255) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `olpb` int(11) NOT NULL DEFAULT '0',
  `img` varchar(70) NOT NULL,
  PRIMARY KEY (`idFountain`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=46 ;

--
-- Contenu de la table `t_fountain`
--

INSERT INTO `t_fountain` (`idFountain`, `title`, `latitude`, `longitude`, `address`, `active`, `olpb`, `img`) VALUES
(31, 'Eau de Gen', 46.198338, 6.140413, 'Plainpalais, plaine de, 1205 Gen', 1, 1, 'default.png'),
(32, 'Eau de Gen', 46.202255, 6.149756, 'Rue de la Fontaine 4, 1204 Gen', 1, 2, 'img_35.jpg'),
(33, 'Eau de Gen', 46.200264, 6.146464, 'Rue de la Croix-Rouge 4, 1204 Gen', 1, 1, 'GeSoif.png'),
(34, 'Eau de Gen', 46.190292, 6.164832, 'Avenue Eug', 1, 0, 'P1040863.jpg'),
(35, 'test', 46.197121, 6.117175, 'Avenue du Cimetière 8, 1213 Petit-Lancy, Suisse', 1, 9, 'P1040863.jpg'),
(36, 'zurich', 47.389343, 8.520176, 'Hardstrasse 301, 8005 Zürich, Suisse', 1, 0, 'P1040865.jpg'),
(37, 'Eau de Genève', 46.195599, 6.110287, 'Chemin Gérard-De-Ternier 10, 1213 Petit-Lancy, Suisse', 0, 0, ''),
(38, 'test fontaine ', 46.183990, 6.110029, 'Chemin de Tirelonge 25, 1213 Onex, Suisse', 0, 0, ''),
(39, 'Eau de Genève', 46.188805, 6.131272, 'Route des Acacias 60, 1227 Carouge, Suisse', 0, 0, ''),
(40, 'Eau de Genève', 46.195042, 6.224270, '49 Rue des Marronniers, 74100 Ambilly, France', 0, 0, ''),
(41, 'sfsdfs', 46.193199, 6.124685, 'Chemin de Surville 1, 1213 Petit-Lancy, Suisse', 0, 0, ''),
(42, 'kllklk', 46.183514, 6.088228, 'Chemin de Carabot 40, 1233 Confignon, Suisse', 0, 0, ''),
(43, 'sdfadf', 46.191212, 6.104171, 'Rue de la Calle 19, 1213 Onex, Suisse', 0, 0, ''),
(44, 'test avec image', 46.191654, 6.099257, 'Avenue des Grandes-Communes 62, 1213 Onex, Suisse', 1, 0, '5728ad276547bwordle 2.png'),
(45, 'test3', 46.196915, 6.100717, 'Chemin des Sellières 27, 1219 Aire-la-Ville, Suisse', 1, 0, '5728add33151010485533_10154478462330542_6236711150690613502_n.jpg');

-- --------------------------------------------------------

--
-- Structure de la table `t_user`
--

CREATE TABLE IF NOT EXISTS `t_user` (
  `idUser` bigint(20) NOT NULL AUTO_INCREMENT,
  `identifier` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(40) NOT NULL,
  `admin` tinyint(1) NOT NULL DEFAULT '0',
  `active` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`idUser`),
  UNIQUE KEY `identifier` (`identifier`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Contenu de la table `t_user`
--

INSERT INTO `t_user` (`idUser`, `identifier`, `email`, `password`, `admin`, `active`) VALUES
(1, 'Admin', 'admin@gesoif.ch', 'f6889fc97e14b42dec11a8c183ea791c5465b658', 1, 1);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
