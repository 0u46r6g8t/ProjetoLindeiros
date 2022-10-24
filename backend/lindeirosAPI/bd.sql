-- MySQL Script generated by MySQL Workbench
-- Tue Sep 13 21:18:51 2022
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema db_lindeiros
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema db_lindeiros
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `db_lindeiros` DEFAULT CHARACTER SET utf8 ;
USE `db_lindeiros` ;

-- -----------------------------------------------------
-- Table `db_lindeiros`.`tb_objective`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_lindeiros`.`tb_objective` (
  `id` VARCHAR(40) NOT NULL,
  `general` TEXT NOT NULL,
  `textSpecific` TEXT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_lindeiros`.`tb_axes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_lindeiros`.`tb_axes` (
  `id` VARCHAR(40) NOT NULL,
  `name` VARCHAR(30) NOT NULL,
  `sigle` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_lindeiros`.`tb_city`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_lindeiros`.`tb_city` (
  `id` VARCHAR(40) NOT NULL,
  `name` VARCHAR(30) NOT NULL,
  `state` VARCHAR(25) NOT NULL,
  `uf` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_lindeiros`.`tb_demands`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_lindeiros`.`tb_demands` (
  `id` VARCHAR(40) NOT NULL,
  `name` VARCHAR(30) NOT NULL,
  `url` VARCHAR(255) NULL,
  `progress` INT NULL,
  `description` VARCHAR(150) NULL,
  `cover` VARCHAR(100) NULL,
  `createdAt` TIMESTAMP(1) NULL,
  `priority` VARCHAR(20) NOT NULL,
  `status` INT NULL,
  `objective_id` VARCHAR(40) NOT NULL,
  `axes_id` VARCHAR(40) NOT NULL,
  `city_id` VARCHAR(40) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) ,
  INDEX `fk_tb_demands_tb_objective1_idx` (`objective_id` ASC) ,
  INDEX `fk_tb_demands_tb_eixos1_idx` (`axes_id` ASC) ,
  INDEX `fk_tb_demands_tb_city1_idx` (`city_id` ASC) ,
  CONSTRAINT `fk_tb_demands_tb_objective1`
    FOREIGN KEY (`objective_id`)
    REFERENCES `db_lindeiros`.`tb_objective` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tb_demands_tb_eixos1`
    FOREIGN KEY (`axes_id`)
    REFERENCES `db_lindeiros`.`tb_axes` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tb_demands_tb_city1`
    FOREIGN KEY (`city_id`)
    REFERENCES `db_lindeiros`.`tb_city` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_lindeiros`.`tb_userType`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_lindeiros`.`tb_userType` (
  `id` VARCHAR(40) NOT NULL,
  `name` VARCHAR(30) NOT NULL,
  `permission` INT(1) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_lindeiros`.`tb_user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_lindeiros`.`tb_user` (
  `id` VARCHAR(40) NOT NULL,
  `name` VARCHAR(30) NOT NULL,
  `phone` INT NOT NULL,
  `phone_ddd` INT(2) NOT NULL,
  `born_date` DATE NOT NULL,
  `cpf` BIGINT(20) NOT NULL,
  `address` VARCHAR(125) NULL,
  `email` VARCHAR(80) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `city_id` VARCHAR(40) NOT NULL,
  `userType_id` VARCHAR(40) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) ,
  INDEX `fk_tb_user_tb_city1_idx` (`city_id` ASC) ,
  INDEX `fk_tb_user_tb_userType1_idx` (`userType_id` ASC) ,
  CONSTRAINT `fk_tb_user_tb_city1`
    FOREIGN KEY (`city_id`)
    REFERENCES `db_lindeiros`.`tb_city` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tb_user_tb_userType1`
    FOREIGN KEY (`userType_id`)
    REFERENCES `db_lindeiros`.`tb_userType` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_lindeiros`.`tb_details`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_lindeiros`.`tb_details` (
  `id` VARCHAR(40) NOT NULL,
  `value` FLOAT NOT NULL,
  `deadline` DATETIME NOT NULL,
  `numberInvolved` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) )
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_lindeiros`.`tb_proposal`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_lindeiros`.`tb_proposal` (
  `id` VARCHAR(40) NOT NULL,
  `description` LONGTEXT NOT NULL,
  `isAproved` INT NOT NULL DEFAULT 0,
  `details_id` VARCHAR(40) NOT NULL,
  `user_id` VARCHAR(40) NOT NULL,
  PRIMARY KEY (`id`, `details_id`),
  INDEX `fk_tb_proposal_tb_details1_idx` (`details_id` ASC) ,
  INDEX `fk_tb_proposal_tb_user1_idx` (`user_id` ASC) ,
  CONSTRAINT `fk_tb_proposal_tb_details1`
    FOREIGN KEY (`details_id`)
    REFERENCES `db_lindeiros`.`tb_details` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tb_proposal_tb_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `db_lindeiros`.`tb_user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_lindeiros`.`tb_team`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_lindeiros`.`tb_team` (
  `id` VARCHAR(40) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `proposal_id` VARCHAR(40) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_tb_team_tb_proposal1_idx` (`proposal_id` ASC) ,
  CONSTRAINT `fk_tb_team_tb_proposal1`
    FOREIGN KEY (`proposal_id`)
    REFERENCES `db_lindeiros`.`tb_proposal` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_lindeiros`.`tb_cityEnvolved`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_lindeiros`.`tb_cityEnvolved` (
  `id` VARCHAR(40) NOT NULL,
  `details_id` VARCHAR(40) NOT NULL,
  `city_id` VARCHAR(40) NOT NULL,
  `is_main` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_tb_details_has_tb_city_tb_city1_idx` (`city_id` ASC) ,
  INDEX `fk_tb_details_has_tb_city_tb_details1_idx` (`details_id` ASC) ,
  CONSTRAINT `fk_tb_details_has_tb_city_tb_details1`
    FOREIGN KEY (`details_id`)
    REFERENCES `db_lindeiros`.`tb_details` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tb_details_has_tb_city_tb_city1`
    FOREIGN KEY (`city_id`)
    REFERENCES `db_lindeiros`.`tb_city` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_lindeiros`.`tb_info`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_lindeiros`.`tb_info` (
  `id` VARCHAR(40) NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  `tb_user_id` VARCHAR(40) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_tb_info_tb_user1_idx` (`tb_user_id` ASC) ,
  CONSTRAINT `fk_tb_info_tb_user1`
    FOREIGN KEY (`tb_user_id`)
    REFERENCES `db_lindeiros`.`tb_user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_lindeiros`.`tb_document`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_lindeiros`.`tb_document` (
  `id` VARCHAR(40) NOT NULL,
  `name` VARCHAR(30) NOT NULL,
  `extension` VARCHAR(10) NOT NULL,
  `path` VARCHAR(150) NOT NULL,
  `demands_id` VARCHAR(40) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_tb_document_tb_demands1_idx` (`demands_id` ASC) ,
  CONSTRAINT `fk_tb_document_tb_demands1`
    FOREIGN KEY (`demands_id`)
    REFERENCES `db_lindeiros`.`tb_demands` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_lindeiros`.`tb_proposallist`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_lindeiros`.`tb_proposallist` (
  `id` VARCHAR(40) NOT NULL,
  `proposal_id` VARCHAR(40) NOT NULL,
  `demands_id` VARCHAR(40) NOT NULL,
  PRIMARY KEY (`id`, `proposal_id`, `demands_id`),
  INDEX `fk_tb_proposal_has_tb_demands_tb_demands1_idx` (`demands_id` ASC) ,
  INDEX `fk_tb_proposal_has_tb_demands_tb_proposal1_idx` (`proposal_id` ASC) ,
  CONSTRAINT `fk_tb_proposal_has_tb_demands_tb_proposal1`
    FOREIGN KEY (`proposal_id`)
    REFERENCES `db_lindeiros`.`tb_proposal` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tb_proposal_has_tb_demands_tb_demands1`
    FOREIGN KEY (`demands_id`)
    REFERENCES `db_lindeiros`.`tb_demands` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_lindeiros`.`tb_news`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_lindeiros`.`tb_news` (
  `id` VARCHAR(40) NOT NULL,
  `title` VARCHAR(150) NULL,
  `title_url` VARCHAR(255) NULL,
  `created_at` TIMESTAMP(1) NULL,
  `body` LONGTEXT NULL,
  `city_id` VARCHAR(40) NOT NULL,
  `axes_id` VARCHAR(40) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_tb_news_tb_city1_idx` (`city_id` ASC) ,
  INDEX `fk_tb_news_tb_axes1_idx` (`axes_id` ASC) ,
  CONSTRAINT `fk_tb_news_tb_city1`
    FOREIGN KEY (`city_id`)
    REFERENCES `db_lindeiros`.`tb_city` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tb_news_tb_axes1`
    FOREIGN KEY (`axes_id`)
    REFERENCES `db_lindeiros`.`tb_axes` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_lindeiros`.`tb_photos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_lindeiros`.`tb_photos` (
  `id` VARCHAR(40) NOT NULL,
  `name` VARCHAR(255) NULL,
  `extension` VARCHAR(5) NULL,
  `path` VARCHAR(50) NULL,
  `news_id` VARCHAR(40) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_tb_photos_tb_news1_idx` (`news_id` ASC) ,
  CONSTRAINT `fk_tb_photos_tb_news1`
    FOREIGN KEY (`news_id`)
    REFERENCES `db_lindeiros`.`tb_news` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;