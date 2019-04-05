/*
SQLyog Ultimate v8.71 
MySQL _ 5.5.5_10.1.38_MariaDB : Database _ ixiaoping
*********************************************************************
*/


/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`ixiaoping` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `ixiaoping`;

/*Table structure for table `dining_hall` */

DROP TABLE IF EXISTS `dining_hall`;

CREATE TABLE `dining_hall` (
  `dh_id` int(11) NOT NULL AUTO_INCREMENT,
  `sc_id` int(11) DEFAULT NULL,
  `dh_name` varchar(32) DEFAULT NULL,
  `dh_info` varchar(128) DEFAULT NULL,
  `dh_star` int(32) DEFAULT NULL,
  `dh_score` decimal(11) DEFAULT NULL,
  `dining` varchar(32) DEFAULT NULL,
  `dh_main_img` varchar(128) DEFAULT NULL,
  `dh_add` varchar(32) DEFAULT NULL,
  `breakfast` int(11) DEFAULT NULL,
  `noodles` int(11) DEFAULT NULL,
  `meat` int(11) DEFAULT NULL,
  `rice` int(11) DEFAULT NULL,
  `rihan` int(11) DEFAULT NULL,
  PRIMARY KEY (`dh_id`),
  KEY `dh_sc` (`sc_id`),
  CONSTRAINT `dh_sc` FOREIGN KEY (`sc_id`) REFERENCES `school` (`sc_id`),
  CONSTRAINT `dh_us` FOREIGN KEY (`dh_id`) REFERENCES `user` (`dh_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `dining_hall`(`dh_id`, `sc_id`, `dh_name`, `dh_info`, `dh_star`, `dh_score`, `dining`, `dh_main_img`, `dh_add`, `breakfast`, `noodles`, `meat`, `rice`, `rihan`) VALUES ( 1,1,'重庆小面','最具重庆特色的面食，你一定要进来尝尝！店内各种口味都有，酸甜咸辣你值得拥有!',103,4.5,'玫瑰园','11.jpg','玫瑰园3楼',1,1,0,null,0 )

/*Data for the table `dining_hall` */

/*Table structure for table `dining_hall_img` */

DROP TABLE IF EXISTS `dining_hall_img`;

CREATE TABLE `dining_hall_img` (
  `dh_img_id` int(11) NOT NULL AUTO_INCREMENT,
  `dh_id` int(11) DEFAULT NULL,
  `dg_img_path` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`dh_img_id`),
  KEY `img_dh` (`dh_id`),
  CONSTRAINT `img_dh` FOREIGN KEY (`dh_id`) REFERENCES `dining_hall` (`dh_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `dining_hall_img` */

/*Table structure for table `dish` */

DROP TABLE IF EXISTS `dish`;

CREATE TABLE `dish` (
  `ds_id` int(11) NOT NULL AUTO_INCREMENT,
  `dh_id` int(11) DEFAULT NULL,
  `ds_name` varchar(64) DEFAULT NULL,
  `ds_img_path` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`ds_id`),
  KEY `ds_sh` (`dh_id`),
  CONSTRAINT `ds_sh` FOREIGN KEY (`dh_id`) REFERENCES `dining_hall` (`dh_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `dish` */

/*Table structure for table `estimate` */

DROP TABLE IF EXISTS `estimate`;

CREATE TABLE `estimate` (
  `es_id` int(11) NOT NULL AUTO_INCREMENT,
  `dh_id` int(11) DEFAULT NULL,
  `us_id` int(11) DEFAULT NULL,
  `es_content` varchar(2048) DEFAULT NULL,
  `es_date` date DEFAULT NULL,
  `es_score` varchar(32) DEFAULT NULL,
  `es_star` varchar(32) DEFAULT NULL,
  `es_main_img` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`es_id`),
  KEY `es_dh` (`dh_id`),
  KEY `es_us` (`us_id`),
  CONSTRAINT `es_us` FOREIGN KEY (`us_id`) REFERENCES `user` (`us_id`),
  CONSTRAINT `es_dh` FOREIGN KEY (`dh_id`) REFERENCES `dining_hall` (`dh_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `estimate` */
insert  into `estimate`(`es_id`,`dh_id`,`us_id`,`es_content`,`es_score`,`es_star`,`es_main_img`) values (1,1,1,'太好吃了！从未吃过如此美味的食物','4.6','96','es.jpg');
insert  into `estimate`(`dh_id`,`us_id`,`es_content`,`es_score`,`es_star`,`es_main_img`) values (1,1,'颜值太高了，必须先拍照再吃！','4.7','89','es2.jpg');
insert  into `estimate`(`dh_id`,`us_id`,`es_content`,`es_score`,`es_star`,`es_main_img`) values (1,1,'装修非常棒，我们吃的超开心的','4.6','103','es3.jpg');
insert  into `estimate`(`dh_id`,`us_id`,`es_content`,`es_score`,`es_star`,`es_main_img`) values (1,1,'物美价廉，非常喜欢他们家的菜啊', '4.8','92','es4.jpg');


/*Table structure for table `estimate_img` */

DROP TABLE IF EXISTS `estimate_img`;

CREATE TABLE `estimate_img` (
  `es_img_id` int(11) NOT NULL AUTO_INCREMENT,
  `es_id` int(11) DEFAULT NULL,
  `es_img_path` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`es_img_id`),
  KEY `img_es` (`es_id`),
  CONSTRAINT `img_es` FOREIGN KEY (`es_id`) REFERENCES `estimate` (`es_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `estimate_img` */

/*Table structure for table `school` */

DROP TABLE IF EXISTS `school`;

CREATE TABLE `school` (
  `sc_id` int(11) NOT NULL AUTO_INCREMENT,
  `sc_name` varchar(64) DEFAULT NULL,
  `sc_add` varchar(32) DEFAULT NULL,
  `sc_img` varchar(128) DEFAULT NULL,
  `sc_img1` varchar(128) DEFAULT NULL,
  `sc_img2` varchar(128) DEFAULT NULL,
  `sc_img3` varchar(128) DEFAULT NULL,
  `sc_img4` varchar(128) DEFAULT NULL,
  `sc_img5` varchar(128) DEFAULT NULL,
  UNIQUE KEY `sc_id` (`sc_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

/*Data for the table `school` */

insert  into `school`(`sc_id`,`sc_name`,`sc_add`,`sc_img`,`sc_img1`,`sc_img2`,`sc_img3`,`sc_img4`,`sc_img5`) values (1,'浙江理工大学','杭州','zstu.jpg','zstu1.jpg','zstu2.jpg','zstu3.jpg','zstu4.jpg','zstu5.jpg');

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `us_id` int(11) NOT NULL,
  `dh_id` int(11) DEFAULT NULL,
  `us_ph` varchar(11) DEFAULT NULL,
  `us_name` varchar(32) DEFAULT NULL,
  `us_pwd` varchar(32) DEFAULT NULL,
  `us_pic` varchar(128) DEFAULT NULL,
  `us_sign` varchar(520) DEFAULT NULL,
  `us_birh` date DEFAULT NULL,
  `us_email` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`us_id`),
  KEY `FK_user` (`dh_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

insert  into `user`(`us_id`,`dh_id`,`us_ph`,`us_name`,`us_pwd`,`us_sign`,`us_email`) values (1,1,'18177310581','Admin','Admin','我就是我，不一样的烟火','153769507@qq.com');

/*Data for the table `user` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;