-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le :  mer. 10 mars 2021 à 14:31
-- Version du serveur :  10.3.9-MariaDB
-- Version de PHP :  7.2.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `zfm1-zhoussagw`
--

-- --------------------------------------------------------

--
-- Structure de la table `Camion`
--

CREATE TABLE `Camion` (
  `Camion_id` int(11) NOT NULL,
  `Camion_description` varchar(80) DEFAULT NULL,
  `Camion_largeur` double NOT NULL,
  `Camion_hauteur` double NOT NULL,
  `Camion_longueur` double NOT NULL,
  `Camion_permisMin` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `Camion`
--

INSERT INTO `Camion` (`Camion_id`, `Camion_description`, `Camion_largeur`, `Camion_hauteur`, `Camion_longueur`, `Camion_permisMin`) VALUES
(1, 'Camion de Robert', 2.5, 3, 7, 'Permis ok'),
(2, NULL, 1.5, 2, 3, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `Carton`
--

CREATE TABLE `Carton` (
  `Carton_id` int(11) NOT NULL,
  `Carton_photo` varchar(120) DEFAULT NULL,
  `Carton_QRCode` varchar(50) DEFAULT NULL,
  `Carton_description` varchar(250) DEFAULT NULL,
  `Carton_origine` varchar(25) DEFAULT NULL,
  `Carton_couleur` varchar(20) DEFAULT NULL,
  `Carton_largeur` double NOT NULL,
  `Carton_hauteur` double NOT NULL,
  `Carton_longueur` double NOT NULL,
  `Carton_fragile` tinyint(4) NOT NULL,
  `Piece_id` int(11) NOT NULL,
  `Camion_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `Carton`
--

INSERT INTO `Carton` (`Carton_id`, `Carton_photo`, `Carton_QRCode`, `Carton_description`, `Carton_origine`, `Carton_couleur`, `Carton_largeur`, `Carton_hauteur`, `Carton_longueur`, `Carton_fragile`, `Piece_id`, `Camion_id`) VALUES
(1, 'Photo 1', 'QR Code 1', 'Carton pour la cuisine', 'Cuisine', 'Vert', 50, 30, 50, 1, 1, 1),
(2, NULL, NULL, 'Bordel', NULL, NULL, 60, 50, 60, 1, 4, NULL),
(3, NULL, NULL, NULL, NULL, NULL, 30, 30, 40, 0, 3, NULL),
(4, NULL, NULL, NULL, NULL, NULL, 10, 10, 10, 1, 6, NULL),
(5, NULL, NULL, NULL, NULL, NULL, 30, 20, 30, 0, 8, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `Carton_has_Equipement`
--

CREATE TABLE `Carton_has_Equipement` (
  `Carton_id` int(11) NOT NULL,
  `Equipement_Carton_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `Carton_has_Equipement`
--

INSERT INTO `Carton_has_Equipement` (`Carton_id`, `Equipement_Carton_id`) VALUES
(1, 1),
(1, 4),
(2, 2),
(3, 3),
(4, 4),
(5, 5);

-- --------------------------------------------------------

--
-- Structure de la table `Equipement_Carton`
--

CREATE TABLE `Equipement_Carton` (
  `Equipement_Carton_id` int(11) NOT NULL,
  `Equipement_Carton_nom` varchar(80) NOT NULL,
  `Equipement_Carton_quantite` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `Equipement_Carton`
--

INSERT INTO `Equipement_Carton` (`Equipement_Carton_id`, `Equipement_Carton_nom`, `Equipement_Carton_quantite`) VALUES
(1, 'Déco', 3),
(2, 'Bordel', 20),
(3, 'Petit meuble', 1),
(4, 'Livres', 8),
(5, 'Vêtements', 12);

-- --------------------------------------------------------

--
-- Structure de la table `Logement`
--

CREATE TABLE `Logement` (
  `Logement_id` int(11) NOT NULL,
  `Logement_adresse` varchar(80) NOT NULL,
  `Logement_etage` int(11) DEFAULT NULL,
  `Logement_ascenceur` tinyint(4) DEFAULT NULL,
  `Type_Logement_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `Logement`
--

INSERT INTO `Logement` (`Logement_id`, `Logement_adresse`, `Logement_etage`, `Logement_ascenceur`, `Type_Logement_id`) VALUES
(1, '7, place Lejeune', 1, 0, 1),
(2, '6, avenue de Riviere', NULL, NULL, 2),
(3, '677, rue de Le Gall', NULL, NULL, 3),
(4, 'chemin Etienne', 3, 1, 1);

-- --------------------------------------------------------

--
-- Structure de la table `Mobilier`
--

CREATE TABLE `Mobilier` (
  `Mobilier_id` int(11) NOT NULL,
  `Mobilier_nom` varchar(125) NOT NULL,
  `Mobilier_largeur` double NOT NULL,
  `Mobilier_hauteur` double NOT NULL,
  `Mobilier_longueur` double NOT NULL,
  `Piece_id` int(11) NOT NULL,
  `Camion_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `Mobilier`
--

INSERT INTO `Mobilier` (`Mobilier_id`, `Mobilier_nom`, `Mobilier_largeur`, `Mobilier_hauteur`, `Mobilier_longueur`, `Piece_id`, `Camion_id`) VALUES
(1, 'Table', 2, 1, 2, 1, 1),
(2, 'Four', 0.5, 0.4, 0.7, 2, NULL),
(3, 'Frigo', 0.6, 2, 0.6, 3, NULL),
(4, 'Lit', 1.5, 0.7, 2, 8, NULL),
(5, 'TV', 0.05, 0.6, 1, 4, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `Piece`
--

CREATE TABLE `Piece` (
  `Piece_id` int(11) NOT NULL,
  `Piece_nom` varchar(40) NOT NULL,
  `Piece_couleur` varchar(20) NOT NULL,
  `Piece_taille` double NOT NULL,
  `Logement_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `Piece`
--

INSERT INTO `Piece` (`Piece_id`, `Piece_nom`, `Piece_couleur`, `Piece_taille`, `Logement_id`) VALUES
(1, 'Cuisine', 'Vert', 10, 1),
(2, 'Cuisine', 'Vert', 10, 4),
(3, 'Cuisine', 'Vert', 20, 2),
(4, 'Principale', 'Rouge', 5, 3),
(5, 'Salle principale', 'Rouge', 15, 1),
(6, 'Salle principale', 'Rouge', 10, 4),
(7, 'Salle principale', 'Rouge', 25, 2),
(8, 'Chambre', 'Bleu', 10, 2),
(9, 'Chambre', 'Jaune', 10, 2);

-- --------------------------------------------------------

--
-- Structure de la table `Type_Logement`
--

CREATE TABLE `Type_Logement` (
  `Type_Logement_id` int(11) NOT NULL,
  `Type_Logement_nom` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `Type_Logement`
--

INSERT INTO `Type_Logement` (`Type_Logement_id`, `Type_Logement_nom`) VALUES
(1, 'Appartement'),
(2, 'Maison'),
(3, 'Local');

-- --------------------------------------------------------

--
-- Structure de la table `t_administrateur`
--

CREATE TABLE `t_administrateur` (
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `t_administrateur`
--

INSERT INTO `t_administrateur` (`id`) VALUES
(1),
(24);

-- --------------------------------------------------------

--
-- Structure de la table `t_compte`
--

CREATE TABLE `t_compte` (
  `id` int(11) NOT NULL,
  `login` varchar(50) NOT NULL,
  `mdp` varchar(50) NOT NULL,
  `mail` varchar(80) NOT NULL,
  `isAdmin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `t_compte`
--

INSERT INTO `t_compte` (`id`, `login`, `mdp`, `mail`, `isAdmin`) VALUES
(1, 'admin', 'admin', 'admmin@univ-brest.fr', 1),
(6, 'duval', 'laurence', 'duval.laurence@univ-brest.fr', 0),
(7, 'autret', 'yvon', 'autret.yvon@univ-brest.fr', 0),
(24, 'testlog', 'testmdp', 'testmail', 1);

-- --------------------------------------------------------

--
-- Structure de la table `t_enseignant`
--

CREATE TABLE `t_enseignant` (
  `id` int(11) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `prenom` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `t_enseignant`
--

INSERT INTO `t_enseignant` (`id`, `nom`, `prenom`) VALUES
(6, 'DUVAL', 'Laurence'),
(7, 'AUTRET', 'Yvon');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `Camion`
--
ALTER TABLE `Camion`
  ADD PRIMARY KEY (`Camion_id`),
  ADD UNIQUE KEY `Camion_id_UNIQUE` (`Camion_id`);

--
-- Index pour la table `Carton`
--
ALTER TABLE `Carton`
  ADD PRIMARY KEY (`Carton_id`),
  ADD UNIQUE KEY `Carton_id_UNIQUE` (`Carton_id`),
  ADD KEY `fk_Carton_Piece1_idx` (`Piece_id`),
  ADD KEY `fk_Carton_Camion1_idx` (`Camion_id`);

--
-- Index pour la table `Carton_has_Equipement`
--
ALTER TABLE `Carton_has_Equipement`
  ADD PRIMARY KEY (`Carton_id`,`Equipement_Carton_id`),
  ADD KEY `fk_Carton_has_Equipement_Carton_Equipement_Carton1_idx` (`Equipement_Carton_id`),
  ADD KEY `fk_Carton_has_Equipement_Carton_Carton1_idx` (`Carton_id`);

--
-- Index pour la table `Equipement_Carton`
--
ALTER TABLE `Equipement_Carton`
  ADD PRIMARY KEY (`Equipement_Carton_id`),
  ADD UNIQUE KEY `Equipement_Carton_id_UNIQUE` (`Equipement_Carton_id`);

--
-- Index pour la table `Logement`
--
ALTER TABLE `Logement`
  ADD PRIMARY KEY (`Logement_id`),
  ADD UNIQUE KEY `Logemet_id_UNIQUE` (`Logement_id`),
  ADD KEY `fk_Logement_Type_Logement_idx` (`Type_Logement_id`);

--
-- Index pour la table `Mobilier`
--
ALTER TABLE `Mobilier`
  ADD PRIMARY KEY (`Mobilier_id`),
  ADD UNIQUE KEY `Mobilier_id_UNIQUE` (`Mobilier_id`),
  ADD KEY `fk_Mobilier_Piece1_idx` (`Piece_id`),
  ADD KEY `fk_Mobilier_Camion1_idx` (`Camion_id`);

--
-- Index pour la table `Piece`
--
ALTER TABLE `Piece`
  ADD PRIMARY KEY (`Piece_id`),
  ADD UNIQUE KEY `Piece_id_UNIQUE` (`Piece_id`),
  ADD KEY `fk_Piece_Logement1_idx` (`Logement_id`);

--
-- Index pour la table `Type_Logement`
--
ALTER TABLE `Type_Logement`
  ADD PRIMARY KEY (`Type_Logement_id`),
  ADD UNIQUE KEY `id_Logement_UNIQUE` (`Type_Logement_id`);

--
-- Index pour la table `t_administrateur`
--
ALTER TABLE `t_administrateur`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `t_compte`
--
ALTER TABLE `t_compte`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `t_enseignant`
--
ALTER TABLE `t_enseignant`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `Camion`
--
ALTER TABLE `Camion`
  MODIFY `Camion_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `Carton`
--
ALTER TABLE `Carton`
  MODIFY `Carton_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `Equipement_Carton`
--
ALTER TABLE `Equipement_Carton`
  MODIFY `Equipement_Carton_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `Logement`
--
ALTER TABLE `Logement`
  MODIFY `Logement_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `Mobilier`
--
ALTER TABLE `Mobilier`
  MODIFY `Mobilier_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `Piece`
--
ALTER TABLE `Piece`
  MODIFY `Piece_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pour la table `Type_Logement`
--
ALTER TABLE `Type_Logement`
  MODIFY `Type_Logement_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `t_compte`
--
ALTER TABLE `t_compte`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `Carton`
--
ALTER TABLE `Carton`
  ADD CONSTRAINT `fk_Carton_Camion1` FOREIGN KEY (`Camion_id`) REFERENCES `Camion` (`Camion_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Carton_Piece1` FOREIGN KEY (`Piece_id`) REFERENCES `Piece` (`Piece_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `Carton_has_Equipement`
--
ALTER TABLE `Carton_has_Equipement`
  ADD CONSTRAINT `fk_Carton_has_Equipement_Carton_Carton1` FOREIGN KEY (`Carton_id`) REFERENCES `Carton` (`Carton_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Carton_has_Equipement_Carton_Equipement_Carton1` FOREIGN KEY (`Equipement_Carton_id`) REFERENCES `Equipement_Carton` (`Equipement_Carton_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `Logement`
--
ALTER TABLE `Logement`
  ADD CONSTRAINT `fk_Logement_Type_Logement` FOREIGN KEY (`Type_Logement_id`) REFERENCES `Type_Logement` (`Type_Logement_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `Mobilier`
--
ALTER TABLE `Mobilier`
  ADD CONSTRAINT `fk_Mobilier_Camion1` FOREIGN KEY (`Camion_id`) REFERENCES `Camion` (`Camion_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Mobilier_Piece1` FOREIGN KEY (`Piece_id`) REFERENCES `Piece` (`Piece_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `Piece`
--
ALTER TABLE `Piece`
  ADD CONSTRAINT `fk_Piece_Logement1` FOREIGN KEY (`Logement_id`) REFERENCES `Logement` (`Logement_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
