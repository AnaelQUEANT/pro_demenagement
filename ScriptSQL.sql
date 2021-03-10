-- MySQL Script generated by MySQL Workbench
-- Wed Mar 10 14:17:17 2021
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema zfm1-zhoussagw
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema zfm1-zhoussagw
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `zfm1-zhoussagw` DEFAULT CHARACTER SET utf8 ;
USE `zfm1-zhoussagw` ;

-- -----------------------------------------------------
-- Table `zfm1-zhoussagw`.`Type_Logement`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `zfm1-zhoussagw`.`Type_Logement` (
  `Type_Logement_id` INT NOT NULL AUTO_INCREMENT,
  `Type_Logement_nom` VARCHAR(25) NOT NULL,
  PRIMARY KEY (`Type_Logement_id`),
  UNIQUE INDEX `id_Logement_UNIQUE` (`Type_Logement_id` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `zfm1-zhoussagw`.`Logement`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `zfm1-zhoussagw`.`Logement` (
  `Logement_id` INT NOT NULL AUTO_INCREMENT,
  `Logement_adresse` VARCHAR(80) NOT NULL,
  `Logement_etage` INT NULL,
  `Logement_ascenceur` TINYINT NULL,
  `Type_Logement_id` INT NOT NULL,
  PRIMARY KEY (`Logement_id`),
  UNIQUE INDEX `Logemet_id_UNIQUE` (`Logement_id` ASC) ,
  INDEX `fk_Logement_Type_Logement_idx` (`Type_Logement_id` ASC) ,
  CONSTRAINT `fk_Logement_Type_Logement`
    FOREIGN KEY (`Type_Logement_id`)
    REFERENCES `zfm1-zhoussagw`.`Type_Logement` (`Type_Logement_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `zfm1-zhoussagw`.`Piece`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `zfm1-zhoussagw`.`Piece` (
  `Piece_id` INT NOT NULL AUTO_INCREMENT,
  `Piece_nom` VARCHAR(40) NOT NULL,
  `Piece_couleur` VARCHAR(20) NOT NULL,
  `Piece_taille` DOUBLE NOT NULL,
  `Logement_id` INT NOT NULL,
  PRIMARY KEY (`Piece_id`),
  UNIQUE INDEX `Piece_id_UNIQUE` (`Piece_id` ASC) ,
  INDEX `fk_Piece_Logement1_idx` (`Logement_id` ASC) ,
  CONSTRAINT `fk_Piece_Logement1`
    FOREIGN KEY (`Logement_id`)
    REFERENCES `zfm1-zhoussagw`.`Logement` (`Logement_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `zfm1-zhoussagw`.`Camion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `zfm1-zhoussagw`.`Camion` (
  `Camion_id` INT NOT NULL AUTO_INCREMENT,
  `Camion_description` VARCHAR(80) NULL,
  `Camion_largeur` DOUBLE NOT NULL,
  `Camion_hauteur` DOUBLE NOT NULL,
  `Camion_longueur` DOUBLE NOT NULL,
  `Camion_permisMin` VARCHAR(20) NULL,
  PRIMARY KEY (`Camion_id`),
  UNIQUE INDEX `Camion_id_UNIQUE` (`Camion_id` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `zfm1-zhoussagw`.`Mobilier`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `zfm1-zhoussagw`.`Mobilier` (
  `Mobilier_id` INT NOT NULL AUTO_INCREMENT,
  `Mobilier_nom` VARCHAR(125) NOT NULL,
  `Mobilier_largeur` DOUBLE NOT NULL,
  `Mobilier_hauteur` DOUBLE NOT NULL,
  `Mobilier_longueur` DOUBLE NOT NULL,
  `Piece_id` INT NOT NULL,
  `Camion_id` INT NULL,
  PRIMARY KEY (`Mobilier_id`),
  UNIQUE INDEX `Mobilier_id_UNIQUE` (`Mobilier_id` ASC) ,
  INDEX `fk_Mobilier_Piece1_idx` (`Piece_id` ASC) ,
  INDEX `fk_Mobilier_Camion1_idx` (`Camion_id` ASC) ,
  CONSTRAINT `fk_Mobilier_Piece1`
    FOREIGN KEY (`Piece_id`)
    REFERENCES `zfm1-zhoussagw`.`Piece` (`Piece_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Mobilier_Camion1`
    FOREIGN KEY (`Camion_id`)
    REFERENCES `zfm1-zhoussagw`.`Camion` (`Camion_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `zfm1-zhoussagw`.`Carton`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `zfm1-zhoussagw`.`Carton` (
  `Carton_id` INT NOT NULL AUTO_INCREMENT,
  `Carton_photo` VARCHAR(120) NULL,
  `Carton_QRCode` VARCHAR(50) NULL,
  `Carton_description` VARCHAR(250) NULL,
  `Carton_origine` VARCHAR(25) NULL,
  `Carton_couleur` VARCHAR(20) NULL,
  `Carton_largeur` DOUBLE NOT NULL,
  `Carton_hauteur` DOUBLE NOT NULL,
  `Carton_longueur` DOUBLE NOT NULL,
  `Carton_fragile` TINYINT NOT NULL,
  `Piece_id` INT NOT NULL,
  `Camion_id` INT NULL,
  PRIMARY KEY (`Carton_id`),
  UNIQUE INDEX `Carton_id_UNIQUE` (`Carton_id` ASC) ,
  INDEX `fk_Carton_Piece1_idx` (`Piece_id` ASC) ,
  INDEX `fk_Carton_Camion1_idx` (`Camion_id` ASC) ,
  CONSTRAINT `fk_Carton_Piece1`
    FOREIGN KEY (`Piece_id`)
    REFERENCES `zfm1-zhoussagw`.`Piece` (`Piece_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Carton_Camion1`
    FOREIGN KEY (`Camion_id`)
    REFERENCES `zfm1-zhoussagw`.`Camion` (`Camion_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `zfm1-zhoussagw`.`Equipement_Carton`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `zfm1-zhoussagw`.`Equipement_Carton` (
  `Equipement_Carton_id` INT NOT NULL AUTO_INCREMENT,
  `Equipement_Carton_nom` VARCHAR(80) NOT NULL,
  `Equipement_Carton_quantite` INT NOT NULL,
  PRIMARY KEY (`Equipement_Carton_id`),
  UNIQUE INDEX `Equipement_Carton_id_UNIQUE` (`Equipement_Carton_id` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `zfm1-zhoussagw`.`Carton_has_Equipement`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `zfm1-zhoussagw`.`Carton_has_Equipement` (
  `Carton_id` INT NOT NULL,
  `Equipement_Carton_id` INT NOT NULL,
  PRIMARY KEY (`Carton_id`, `Equipement_Carton_id`),
  INDEX `fk_Carton_has_Equipement_Carton_Equipement_Carton1_idx` (`Equipement_Carton_id` ASC) ,
  INDEX `fk_Carton_has_Equipement_Carton_Carton1_idx` (`Carton_id` ASC) ,
  CONSTRAINT `fk_Carton_has_Equipement_Carton_Carton1`
    FOREIGN KEY (`Carton_id`)
    REFERENCES `zfm1-zhoussagw`.`Carton` (`Carton_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Carton_has_Equipement_Carton_Equipement_Carton1`
    FOREIGN KEY (`Equipement_Carton_id`)
    REFERENCES `zfm1-zhoussagw`.`Equipement_Carton` (`Equipement_Carton_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
