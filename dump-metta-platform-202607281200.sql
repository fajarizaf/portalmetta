/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19-11.8.2-MariaDB, for osx10.20 (arm64)
--
-- Host: 202.145.0.38    Database: metta-platform
-- ------------------------------------------------------
-- Server version	8.0.42-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*M!100616 SET @OLD_NOTE_VERBOSITY=@@NOTE_VERBOSITY, NOTE_VERBOSITY=0 */;

--
-- Table structure for table `Branch`
--

DROP TABLE IF EXISTS `Branch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `Branch` (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `companyId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Branch_code_key` (`code`),
  KEY `Branch_companyId_fkey` (`companyId`),
  CONSTRAINT `Branch_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Branch`
--

LOCK TABLES `Branch` WRITE;
/*!40000 ALTER TABLE `Branch` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `Branch` VALUES
('cmk6k26a1000cukrnkf8vku40','JABABEKA','HQ','cmkewzoro0000hdrnmyii2gpp','2026-01-09 07:29:07.654','2026-02-03 01:55:51.872'),
('cmkf0a66u0002nwrnnmbpy5s8','Holding Group','HG','cmkezmo140000nwrn8b8lorev','2026-01-15 05:25:24.053','2026-01-15 05:25:24.053'),
('cmkfbdazb0000airn2albkfd3','CYBER POP 1','POP-1','cmkewzoro0000hdrnmyii2gpp','2026-01-15 10:35:46.000','2026-02-03 01:56:01.585');
/*!40000 ALTER TABLE `Branch` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `Building`
--

DROP TABLE IF EXISTS `Building`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `Building` (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `branchId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Building_branchId_fkey` (`branchId`),
  CONSTRAINT `Building_branchId_fkey` FOREIGN KEY (`branchId`) REFERENCES `Branch` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Building`
--

LOCK TABLES `Building` WRITE;
/*!40000 ALTER TABLE `Building` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `Building` VALUES
('cml5y51p8000oairnbfuf1b0a','JB Building 1','cmk6k26a1000cukrnkf8vku40','2026-02-03 01:55:12.464','2026-03-17 03:22:25.797'),
('cml5y5aj9000pairn0inrthyf','CB Building 1','cmkfbdazb0000airn2albkfd3','2026-02-03 01:55:23.923','2026-03-17 03:22:16.915');
/*!40000 ALTER TABLE `Building` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `Company`
--

DROP TABLE IF EXISTS `Company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `Company` (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `address` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `companyEmail` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `companyPhoneNumber` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fax` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `isDataCenter` tinyint(1) NOT NULL DEFAULT '0',
  `parentId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `logoUrl` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `picId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Company_name_key` (`name`),
  KEY `Company_parentId_fkey` (`parentId`),
  KEY `Company_picId_fkey` (`picId`),
  CONSTRAINT `Company_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `Company` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Company_picId_fkey` FOREIGN KEY (`picId`) REFERENCES `User` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Company`
--

LOCK TABLES `Company` WRITE;
/*!40000 ALTER TABLE `Company` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `Company` VALUES
('cmk6k269v000bukrn5hs6vlqq','PT. Media Energi','2026-01-09 07:29:07.640','2026-02-03 08:31:06.435','Jl Pegangsaan Timur','info@mediaenergy.com','089238234324',NULL,0,'cmkewzoro0000hdrnmyii2gpp',NULL,'cml6c9w0w0000k4rn8qg8t7wj'),
('cmk6se3ka000045rnz5t6qe9d','PT. Metro Data','2026-01-09 11:22:20.936','2026-02-03 08:31:12.568','Jl Pegangsaan Timur','doc@sehat.com','089238234324',NULL,0,'cmkewzoro0000hdrnmyii2gpp',NULL,'cmk6k26ec000eukrn64t25jm4'),
('cmkewzoro0000hdrnmyii2gpp','PT. MettaDC','2026-01-15 03:53:16.057','2026-01-29 03:47:58.059','SCBD, Treasury Tower, 5th Floor, District 8, Jl. Jenderal Sudirman No.52-53, RT.5/RW.3, Senayan, South Jakarta','info@mettadc.com','089238234324','0894845345345',1,NULL,'/uploads/dc-company/cmkewzoro0000hdrnmyii2gpp.png',NULL),
('cmkexir3c0001unrnris7a5i1','Default Company','2026-01-15 04:08:05.543','2026-01-15 04:08:05.543',NULL,NULL,NULL,NULL,0,'cmkewzoro0000hdrnmyii2gpp',NULL,NULL),
('cmkezmo140000nwrn8b8lorev','PT. Limputra Manggala Nusantara','2026-01-15 05:07:07.429','2026-01-15 09:29:00.082','Jl Merdeka','info@limputra.com','089348345834','089348345',1,NULL,'/uploads/dc-company/cmkezmo140000nwrn8b8lorev.png',NULL),
('cmocavd1n0001yl8ohp4nb4w2','PT Gajah Mungkur','2026-04-24 02:37:19.640','2026-04-24 02:37:19.640','Jl Pegangsaan Timur','oxawo1583@hacknapp.com','083934859343',NULL,0,'cmkewzoro0000hdrnmyii2gpp',NULL,NULL);
/*!40000 ALTER TABLE `Company` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `DocField`
--

DROP TABLE IF EXISTS `DocField`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `DocField` (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `docTypeId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `key` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `label` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` enum('TEXT','TEXTAREA','NUMBER','PRICE','DROPDOWN','CHECKBOX','DATE','DATETIME','LINK','TABLE','ATTACHMENT') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `required` tinyint(1) NOT NULL DEFAULT '0',
  `order` int NOT NULL DEFAULT '0',
  `config` json DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `readOnly` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `DocField_docTypeId_key_key` (`docTypeId`,`key`),
  CONSTRAINT `DocField_docTypeId_fkey` FOREIGN KEY (`docTypeId`) REFERENCES `DocType` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DocField`
--

LOCK TABLES `DocField` WRITE;
/*!40000 ALTER TABLE `DocField` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `DocField` VALUES
('cmkme3k0i00f2vfrng6nejk37','cmkmdaan300f0vfrnluov51ak','company_id','Assigned Company','DROPDOWN',0,70,'{\"source\": {\"table\": \"Company\", \"labelField\": \"name\", \"valueField\": \"id\"}}','2026-01-20 09:26:33.222','2026-03-18 03:16:32.024',0),
('cmknoljbk0002bjrnz9hjm58k','cmknoljb70000bjrnetv689gg','quote_date','Tanggal','DATE',1,2,NULL,'2026-01-21 07:08:14.479','2026-04-21 08:47:52.451',0),
('cmknoljbp0003bjrnwcyrzx1a','cmknoljb70000bjrnetv689gg','customer_id','Customer','DROPDOWN',1,3,'{\"source\": {\"table\": \"Company\", \"labelField\": \"name\", \"valueField\": \"id\"}}','2026-01-21 07:08:14.483','2026-04-21 08:47:52.457',0),
('cmknoljby0005bjrn28czl1b1','cmknoljb70000bjrnetv689gg','valid_until','Berlaku Sampai','DATE',1,5,NULL,'2026-01-21 07:08:14.494','2026-04-21 08:47:52.467',0),
('cmknoljci0008bjrntgfo8jph','cmknoljcd0007bjrn7heczhpp','product_id','Produk','DROPDOWN',1,3,'{\"source\": {\"table\": \"Product\", \"filter\": {\"field\": \"id\", \"dependsOn\": \"product_sub_category\"}, \"labelField\": \"name\", \"valueField\": \"id\"}}','2026-01-21 07:08:14.514','2026-05-13 08:59:18.831',0),
('cmknoljcr0009bjrnpxh4xlft','cmknoljcd0007bjrn7heczhpp','qty','Jumlah','NUMBER',1,2,'{\"default\": 1}','2026-01-21 07:08:14.522','2026-04-21 08:47:52.507',0),
('cmknt97xz0000nsrnm3bodbfb','cmknoljb70000bjrnetv689gg','items','Items','TABLE',0,80,'{}','2026-01-21 09:18:37.943','2026-04-21 08:47:52.495',0),
('cmkp5h8v90007emrnmpylj3n3','cmknoljcd0007bjrn7heczhpp','product_category','Product Category','DROPDOWN',0,1,'{\"source\": {\"table\": \"ProductGroup\", \"labelField\": \"name\", \"valueField\": \"id\"}}','2026-01-22 07:48:33.952','2026-01-22 08:21:31.417',0),
('cmkp7gx710008emrn4fedtuc1','cmknoljcd0007bjrn7heczhpp','product_sub_category','Product Sub Category','DROPDOWN',0,2,'{\"source\": {\"table\": \"ProductGroup\", \"filter\": {\"field\": \"parentId\", \"dependsOn\": \"product_category\"}, \"labelField\": \"name\", \"valueField\": \"id\"}}','2026-01-22 08:44:18.045','2026-01-22 08:44:28.422',0),
('cmkp8jfkg000bemrnpa2l3kpd','cmknoljb70000bjrnetv689gg','term_of_payment','Term Of Payment','DROPDOWN',1,6,'{\"options\": [{\"label\": \"One Time\", \"value\": \"One Time\"}, {\"label\": \"Monthly\", \"value\": \"Monthly\"}, {\"label\": \"Quarterly\", \"value\": \"Quarterly\"}, {\"label\": \"Annually\", \"value\": \"Annually\"}]}','2026-01-22 09:14:14.787','2026-04-21 08:47:52.472',0),
('cmkq9lya500000vrnu3zqzk5x','cmknoljcd0007bjrn7heczhpp','nrc','NRC (Setup Fee)','NUMBER',0,2,NULL,'2026-01-23 02:31:58.150','2026-04-21 08:47:52.512',0),
('cmkq9ma9f00010vrn0o3x1lh6','cmknoljcd0007bjrn7heczhpp','mrc','MRC (Monthly Fee)','NUMBER',0,5,'{}','2026-01-23 02:32:13.675','2026-05-13 08:57:04.407',0),
('cmkqd679s00022urnj3polrcq','cmknoljb70000bjrnetv689gg','term_of_contract','Term Of Contract ( Month )','NUMBER',1,7,'{\"defaultValue\": 12}','2026-01-23 04:11:41.774','2026-02-02 05:35:58.192',0),
('cmkqe0ary00052urn0em5geal','cmknoljcd0007bjrn7heczhpp','subtotal_nrc','Subtotal NRC','PRICE',0,7,'{\"compute\": {\"formula\": \"qty * nrc\"}}','2026-01-23 04:35:05.997','2026-01-23 06:35:01.579',1),
('cmkqe1hmy00062urnu3clio8x','cmknoljcd0007bjrn7heczhpp','subtotal_mrc','Subtotal MRC','PRICE',0,8,'{\"compute\": {\"formula\": \"qty * mrc\"}}','2026-01-23 04:36:01.544','2026-01-23 06:35:14.269',1),
('cmkw4cq830007btrn0w6jfdo6','cmkw4cq7u0005btrnhgh11cdg','order_date','Tanggal','DATE',1,2,'{\"defaultNow\": true, \"defaultDateCreated\": false}','2026-01-27 04:51:26.786','2026-04-21 08:47:52.562',0),
('cmkw4cq890008btrn937n0296','cmkw4cq7u0005btrnhgh11cdg','customer_id','Customer','DROPDOWN',1,3,'{\"source\": {\"table\": \"Company\", \"labelField\": \"name\", \"valueField\": \"id\"}}','2026-01-27 04:51:26.792','2026-04-21 08:47:52.566',0),
('cmkw4cq8h000bbtrnhdsgqf31','cmkw4cq7u0005btrnhgh11cdg','items','Items','TABLE',0,60,'{}','2026-01-27 04:51:26.800','2026-04-21 08:47:52.591',0),
('cmkw4cq8r000dbtrnx09qg54f','cmkw4cq8m000cbtrno82k33h7','product_id','Produk','DROPDOWN',1,1,'{\"source\": {\"table\": \"Product\", \"labelField\": \"name\", \"valueField\": \"id\"}}','2026-01-27 04:51:26.810','2026-04-21 08:47:52.594',0),
('cmkw4cq8u000ebtrn2bck0byq','cmkw4cq8m000cbtrno82k33h7','qty','Jumlah','NUMBER',1,2,'{\"default\": 1}','2026-01-27 04:51:26.813','2026-04-21 08:47:52.596',0),
('cmkwaa3aj0000w5rn43x9lpsp','cmkw4cq7u0005btrnhgh11cdg','term_of_contract','Term Of Contract (Months)','NUMBER',1,8,'{\"defaultValue\": 6}','2026-01-27 07:37:21.428','2026-02-06 02:43:25.455',0),
('cmkwali8t0004w5rnrirzwets','cmkw4cq8m000cbtrno82k33h7','product_category','Product Category','DROPDOWN',0,1,'{\"source\": {\"table\": \"ProductGroup\", \"labelField\": \"name\", \"valueField\": \"id\"}}','2026-01-27 07:46:14.043','2026-01-27 07:58:28.050',0),
('cmkwaogzt0005w5rnfe6ssjn4','cmkw4cq8m000cbtrno82k33h7','product_sub_category','Product Sub Category','DROPDOWN',0,2,'{\"source\": {\"table\": \"ProductGroup\", \"filter\": {\"field\": \"parentId\", \"dependsOn\": \"product_category\"}, \"labelField\": \"name\", \"valueField\": \"id\"}}','2026-01-27 07:48:32.385','2026-01-27 07:58:37.820',0),
('cmkwarg440007w5rnd8rk8mj9','cmkw4cq8m000cbtrno82k33h7','nrc','NRC (Setup Fee)','NUMBER',1,2,'{}','2026-01-27 07:50:51.218','2026-04-21 08:47:52.600',0),
('cmkwartb20008w5rnn3g65ndh','cmkw4cq8m000cbtrno82k33h7','mrc','MRC (Monthly Fee)','NUMBER',1,2,'{}','2026-01-27 07:51:08.316','2026-04-21 08:47:52.602',0),
('cmkwascd90009w5rnwvkodmio','cmkw4cq8m000cbtrno82k33h7','subtotal_nrc','Subtotal NRC','PRICE',0,7,'{\"compute\": {\"formula\": \"qty * nrc\"}}','2026-01-27 07:51:33.018','2026-04-01 07:02:51.111',1),
('cmkwaste7000aw5rnxkih7vu4','cmkw4cq8m000cbtrno82k33h7','subtotal_mrc','Subtotal_MRC','PRICE',1,8,'{\"compute\": {\"formula\": \"qty * mrc\"}}','2026-01-27 07:51:55.085','2026-04-01 07:02:51.317',1),
('cmkz5wz8n000gswrnk221v5gc','cmkw4cq7u0005btrnhgh11cdg','commencement_date','Commencement Date','DATE',1,4,'{\"defaultNow\": true}','2026-01-29 07:58:29.729','2026-01-29 07:58:40.898',0),
('cmkz6vsv7000ahorn7svqoflb','cmkz6vsv20008hornl8c3i9w4','wo_date','Tanggal','DATE',1,2,'{\"defaultNow\": true, \"defaultDateCreated\": false}','2026-01-29 08:25:34.435','2026-04-21 08:47:52.738',0),
('cmkz6vsva000bhorno0loibca','cmkz6vsv20008hornl8c3i9w4','customer_id','Customer','DROPDOWN',1,3,'{\"source\": {\"table\": \"Company\", \"labelField\": \"name\", \"valueField\": \"id\"}}','2026-01-29 08:25:34.437','2026-04-21 08:47:52.744',0),
('cmkz6vsvk000ehornjwjs0ve4','cmkz6vsv20008hornl8c3i9w4','items','Items','TABLE',0,6,'{}','2026-01-29 08:25:34.448','2026-04-21 08:47:52.758',0),
('cmkz6vsvr000ghornrs2va6pi','cmkz6vsvn000fhornnrk104c7','product_id','Produk','DROPDOWN',1,1,'{\"source\": {\"table\": \"Product\", \"labelField\": \"name\", \"valueField\": \"id\"}}','2026-01-29 08:25:34.455','2026-04-21 08:47:52.765',0),
('cmkz6vsvu000hhornhilrwfsu','cmkz6vsvn000fhornnrk104c7','qty','Jumlah','NUMBER',1,2,'{}','2026-01-29 08:25:34.458','2026-04-21 08:47:52.768',0),
('cmkza5r690002csrn53jg0zxi','cmkza5r640000csrnn4eccui8','req_date','Tanggal','DATE',1,2,'{\"defaultNow\": true}','2026-01-29 09:57:17.649','2026-04-21 08:47:52.695',0),
('cmkza5r6b0003csrn1bpdb4be','cmkza5r640000csrnn4eccui8','customer_id','Customer','DROPDOWN',1,3,'{\"source\": {\"table\": \"Company\", \"labelField\": \"name\", \"valueField\": \"id\"}}','2026-01-29 09:57:17.651','2026-04-21 08:47:52.697',0),
('cmkza5r6j0006csrng2u4jljr','cmkza5r640000csrnn4eccui8','items','Items','TABLE',0,6,'{}','2026-01-29 09:57:17.658','2026-04-21 08:47:52.708',0),
('cmkza5r6n0008csrnbgypyscw','cmkza5r6k0007csrnuqan4bpl','product_id','Produk','DROPDOWN',1,1,'{\"source\": {\"table\": \"Product\", \"labelField\": \"name\", \"valueField\": \"id\"}}','2026-01-29 09:57:17.663','2026-04-21 08:47:52.711',0),
('cmkza5r6p0009csrnpubbcggm','cmkza5r6k0007csrnuqan4bpl','qty','Jumlah','NUMBER',1,2,'{\"defaultValue\": 1}','2026-01-29 09:57:17.665','2026-04-21 08:47:52.714',0),
('cml09jsad00032brnmyvxwe4d','cmkza5r6k0007csrnuqan4bpl','product_category','Product Category','DROPDOWN',1,1,'{\"source\": {\"table\": \"ProductGroup\", \"labelField\": \"name\", \"valueField\": \"id\"}}','2026-01-30 02:27:58.834','2026-01-30 07:15:50.919',0),
('cml09kzxf00042brnj84lelac','cmkza5r6k0007csrnuqan4bpl','product_sub_category','Product Sub Category','DROPDOWN',0,2,'{\"source\": {\"table\": \"ProductGroup\", \"filter\": {\"field\": \"parentId\", \"dependsOn\": \"product_category\"}, \"labelField\": \"name\", \"valueField\": \"id\"}}','2026-01-30 02:28:55.388','2026-01-30 02:28:55.388',0),
('cml4m9q1z0004ytrn0v8dca1f','cmkz6vsvn000fhornnrk104c7','product_category','Product Category','DROPDOWN',1,1,'{\"source\": {\"table\": \"ProductGroup\", \"labelField\": \"name\", \"valueField\": \"id\"}}','2026-02-02 03:35:09.093','2026-02-02 03:35:09.093',0),
('cml4mapwv0005ytrnct47586s','cmkz6vsvn000fhornnrk104c7','product_sub_category','Product Sub Category','DROPDOWN',0,2,'{\"source\": {\"table\": \"ProductGroup\", \"filter\": {\"field\": \"parentId\", \"dependsOn\": \"product_category\"}, \"labelField\": \"name\", \"valueField\": \"id\"}}','2026-02-02 03:35:55.566','2026-02-02 03:35:55.566',0),
('cml4vwo78001m12rnoyvjgm5x','cmkz6vsv20008hornl8c3i9w4','catatan','Catatan','TEXTAREA',1,4,'{}','2026-02-02 08:04:56.320','2026-02-05 07:41:40.454',0),
('cml4xwl430002n7rn470iuu69','cml4xwl370000n7rnpzeigyq9','coc_date','COC Date','DATE',1,1,'{\"defaultNow\": true, \"defaultDateCreated\": false}','2026-02-02 09:00:51.554','2026-02-03 04:11:43.038',0),
('cml4xwl490003n7rnw84nw50n','cml4xwl370000n7rnpzeigyq9','customer_id','Customer','DROPDOWN',1,4,'{\"source\": {\"table\": \"Company\", \"labelField\": \"name\", \"valueField\": \"id\"}}','2026-02-02 09:00:51.558','2026-02-03 04:12:00.899',0),
('cml4xwl4k0005n7rnnc0twx4f','cml4xwl370000n7rnpzeigyq9','notes','Catatan','TEXTAREA',0,5,'{}','2026-02-02 09:00:51.572','2026-02-02 10:28:03.751',0),
('cml4xwl4n0006n7rnuycr5ywe','cml4xwl370000n7rnpzeigyq9','items','Items','TABLE',0,6,'{}','2026-02-02 09:00:51.574','2026-02-02 10:28:03.754',0),
('cml4xwl4s0008n7rnxjgzpije','cml4xwl4q0007n7rnbwn4gr6n','product_id','Produk','DROPDOWN',1,1,'{\"source\": {\"table\": \"Product\", \"labelField\": \"name\", \"valueField\": \"id\"}}','2026-02-02 09:00:51.580','2026-02-02 10:28:03.761',0),
('cml4xwl4w0009n7rni7efkim1','cml4xwl4q0007n7rnbwn4gr6n','qty','Jumlah','NUMBER',1,2,'{}','2026-02-02 09:00:51.583','2026-02-02 10:28:03.763',0),
('cml4yi3g8000dairntpve8n0e','cml4xwl370000n7rnpzeigyq9','sow','Scope Of Work','TEXTAREA',1,5,'{}','2026-02-02 09:17:35.095','2026-02-02 10:05:46.427',0),
('cml4ymmjt000eairng4ieoxjx','cml4xwl4q0007n7rnbwn4gr6n','product_category','Product Category','DROPDOWN',1,1,'{\"source\": {\"table\": \"ProductGroup\", \"labelField\": \"name\", \"valueField\": \"id\"}}','2026-02-02 09:21:06.472','2026-02-02 09:21:06.472',0),
('cml4zzb52000fairntm4d1isd','cml4xwl4q0007n7rnbwn4gr6n','product_sub_category','Product Sub Category','DROPDOWN',0,2,'{\"source\": {\"table\": \"ProductGroup\", \"filter\": {\"field\": \"parentId\", \"dependsOn\": \"product_category\"}, \"labelField\": \"name\", \"valueField\": \"id\"}}','2026-02-02 09:58:57.827','2026-02-02 09:58:57.827',0),
('cml62ze160006yzrnojlfr1lr','cml4xwl370000n7rnpzeigyq9','rfs_date','RFS Date','DATE',1,2,'{\"defaultNow\": true, \"defaultDateCreated\": false}','2026-02-03 04:10:46.600','2026-02-03 04:11:49.258',0),
('cml6303az0007yzrns46xpqxl','cml4xwl370000n7rnpzeigyq9','billing_date','Billing Date','DATE',1,3,'{\"defaultNow\": true, \"defaultDateCreated\": false}','2026-02-03 04:11:19.354','2026-02-03 04:11:54.712',0),
('cml7t218s000mferndmevb9cq','cmkz6vsv20008hornl8c3i9w4','sow','Scope Of Work','TEXTAREA',1,5,'{}','2026-02-04 09:08:26.182','2026-02-05 07:41:43.467',0),
('cmlal9r7h0001olrnmcajnl0y','cmlal9r6q0000olrni50y5m7t','request_date','Tanggal Permintaan','DATE',1,1,NULL,'2026-02-06 07:53:48.024','2026-04-21 08:47:52.791',0),
('cmlal9r7s0002olrnuwg8930z','cmlal9r6q0000olrni50y5m7t','sender_name','Nama Pengirim','TEXT',1,2,NULL,'2026-02-06 07:53:48.037','2026-04-21 08:47:52.793',0),
('cmlal9r7w0003olrngk10yd5h','cmlal9r6q0000olrni50y5m7t','sender_contact','Kontak Pengirim','TEXT',0,3,NULL,'2026-02-06 07:53:48.044','2026-04-21 08:47:52.795',0),
('cmlal9r820004olrnubt09muv','cmlal9r6q0000olrni50y5m7t','notes','Catatan','TEXTAREA',0,4,NULL,'2026-02-06 07:53:48.048','2026-04-21 08:47:52.799',0),
('cmlal9r880006olrnqzngoksz','cmlal9r6q0000olrni50y5m7t','items','Daftar Barang','TABLE',0,6,NULL,'2026-02-06 07:53:48.056','2026-04-21 08:47:52.811',0),
('cmlal9r8f0008olrnlz0jy6pc','cmlal9r8c0007olrnfvow06tf','item_name','Nama Barang','TEXT',1,1,NULL,'2026-02-06 07:53:48.063','2026-04-21 08:47:52.816',0),
('cmlal9r8i0009olrn5cax5zub','cmlal9r8c0007olrnfvow06tf','quantity','Jumlah','NUMBER',1,2,'{\"defaultValue\": 1}','2026-02-06 07:53:48.065','2026-04-21 08:47:52.819',0),
('cmlal9r8k000aolrn6sozqc9o','cmlal9r8c0007olrnfvow06tf','serial_number','Serial Number','TEXT',0,3,'{}','2026-02-06 07:53:48.068','2026-04-21 08:47:52.822',0),
('cmlal9r8m000bolrn5a5hax23','cmlal9r8c0007olrnfvow06tf','description','Deskripsi/Kondisi','TEXTAREA',0,4,'{}','2026-02-06 07:53:48.070','2026-04-21 08:47:52.825',0),
('cmlal9r92000dolrny4u1qe9w','cmlal9r8x000colrn693ih8dl','request_date','Tanggal Permintaan','DATE',1,1,NULL,'2026-02-06 07:53:48.085','2026-04-21 08:47:52.833',0),
('cmlal9r94000eolrnh2rwopk0','cmlal9r8x000colrn693ih8dl','recipient_name','Nama Penerima','TEXT',1,2,NULL,'2026-02-06 07:53:48.087','2026-04-21 08:47:52.835',0),
('cmlal9r96000folrn16neubdt','cmlal9r8x000colrn693ih8dl','recipient_contact','Kontak Penerima','TEXT',0,3,NULL,'2026-02-06 07:53:48.089','2026-04-21 08:47:52.838',0),
('cmlal9r99000golrn2nbds1hm','cmlal9r8x000colrn693ih8dl','notes','Catatan','TEXTAREA',0,4,NULL,'2026-02-06 07:53:48.091','2026-04-21 08:47:52.840',0),
('cmlal9r9f000iolrndozcrppk','cmlal9r8x000colrn693ih8dl','items','Daftar Barang','TABLE',0,6,NULL,'2026-02-06 07:53:48.097','2026-04-21 08:47:52.844',0),
('cmlal9r9l000kolrnvcu5ozm1','cmlal9r9j000jolrneyqg4y3d','item_name','Nama Barang','TEXT',1,1,NULL,'2026-02-06 07:53:48.105','2026-04-21 08:47:52.848',0),
('cmlalfvtw0000kerna5uu2uv0','cmlal9r6q0000olrni50y5m7t','recipient_name','Recipient Name','TEXT',1,3,NULL,'2026-02-06 07:58:33.953','2026-02-06 07:58:33.953',0),
('cmlalfvv60001kernw5ws7rcl','cmlal9r8x000colrn693ih8dl','purpose','Purpose','TEXTAREA',1,3,NULL,'2026-02-06 07:58:34.002','2026-02-06 07:58:34.002',0),
('cmlalgy470003rkrn6rn8m2rw','cmknoljb70000bjrnetv689gg','notes','Catatan','TEXTAREA',0,70,NULL,'2026-02-06 07:59:23.575','2026-04-21 08:47:52.475',0),
('cmlalgy4g0004rkrncr568lai','cmknoljcd0007bjrn7heczhpp','price','Total Harga','NUMBER',1,4,'{}','2026-02-06 07:59:23.584','2026-05-13 08:56:27.502',0),
('cmlalgy4j0005rkrngy0dlp4h','cmknoljcd0007bjrn7heczhpp','discount_percent','Diskon (%)','NUMBER',0,4,NULL,'2026-02-06 07:59:23.586','2026-04-21 08:47:52.520',0),
('cmlalgy4l0006rkrno9d9aszo','cmknoljcd0007bjrn7heczhpp','description','Deskripsi','TEXTAREA',0,5,NULL,'2026-02-06 07:59:23.589','2026-04-21 08:47:52.524',0),
('cmlalgy580009rkrn4r3q0nos','cmkw4cq7u0005btrnhgh11cdg','notes','Catatan','TEXTAREA',0,50,NULL,'2026-02-06 07:59:23.612','2026-04-21 08:47:52.579',0),
('cmlalgy5s000crkrnt170g51t','cmkw4cq8m000cbtrno82k33h7','description','Deskripsi','TEXTAREA',0,5,NULL,'2026-02-06 07:59:23.631','2026-04-21 08:47:52.609',0),
('cmlalgy6g000frkrn4tuhuajj','cmkza5r640000csrnn4eccui8','notes','Catatan','TEXTAREA',0,5,NULL,'2026-02-06 07:59:23.656','2026-04-21 08:47:52.705',0),
('cmlalgy6n000grkrnpmvc5l55','cmkza5r6k0007csrnuqan4bpl','price','Harga Satuan','NUMBER',1,3,NULL,'2026-02-06 07:59:23.663','2026-04-21 08:47:52.719',0),
('cmlalgy6p000hrkrn53so1j9h','cmkza5r6k0007csrnuqan4bpl','discount_percent','Diskon (%)','NUMBER',0,4,NULL,'2026-02-06 07:59:23.665','2026-04-21 08:47:52.722',0),
('cmlalgy6s000irkrn3j42miyq','cmkza5r6k0007csrnuqan4bpl','description','Deskripsi','TEXTAREA',0,5,NULL,'2026-02-06 07:59:23.667','2026-04-21 08:47:52.725',0),
('cmlalgy6z000jrkrn22ol9epq','cmkz6vsv20008hornl8c3i9w4','wo_no','Nomor WO','TEXT',1,1,NULL,'2026-02-06 07:59:23.675','2026-04-21 08:47:52.734',0),
('cmlalgy76000krkrn6wnmwcxv','cmkz6vsv20008hornl8c3i9w4','currency','Mata Uang','DROPDOWN',1,4,'{\"options\": [{\"label\": \"IDR\", \"value\": \"IDR\"}, {\"label\": \"USD\", \"value\": \"USD\"}]}','2026-02-06 07:59:23.679','2026-04-21 08:47:52.748',0),
('cmlalgy78000lrkrn4pqaovvw','cmkz6vsv20008hornl8c3i9w4','notes','Catatan','TEXTAREA',0,5,NULL,'2026-02-06 07:59:23.684','2026-04-21 08:47:52.755',0),
('cmlalgy7t000mrkrn0yi2zksh','cmkz6vsvn000fhornnrk104c7','price','Harga Satuan','NUMBER',1,3,NULL,'2026-02-06 07:59:23.703','2026-04-21 08:47:52.770',0),
('cmlalgy7v000nrkrn8x19fbak','cmkz6vsvn000fhornnrk104c7','discount_percent','Diskon (%)','NUMBER',0,4,NULL,'2026-02-06 07:59:23.707','2026-04-21 08:47:52.772',0),
('cmlalgy7x000orkrnlnl7a3ri','cmkz6vsvn000fhornnrk104c7','description','Deskripsi','TEXTAREA',0,5,NULL,'2026-02-06 07:59:23.709','2026-04-21 08:47:52.775',0),
('cmmbsirnj000ou9rna7wrbu5y','cmlal9r8c0007olrnfvow06tf','type_of_material','Type Of Material','DROPDOWN',0,2,'{\"options\": [{\"label\": \"Server\", \"value\": \"server\"}, {\"label\": \"Network\", \"value\": \"network\"}, {\"label\": \"Others\", \"value\": \"others\"}]}','2026-03-04 08:44:14.332','2026-03-04 08:49:48.249',0),
('cmmbskn6i000pu9rncdgtkyo1','cmlal9r8c0007olrnfvow06tf','brand','Brand','DROPDOWN',1,3,'{\"options\": [{\"label\": \"Supermicro\", \"value\": \"supermicro\"}, {\"label\": \"IBM\", \"value\": \"ibm\"}, {\"label\": \"Others\", \"value\": \"others\"}]}','2026-03-04 08:45:41.848','2026-03-04 08:49:21.984',0),
('cmmctpapq0013u9rntjh96avh','cmlal9r9j000jolrneyqg4y3d','type_of_material','Type Of Material','DROPDOWN',1,2,'{\"options\": [{\"label\": \"Server\", \"value\": \"server\"}, {\"label\": \"Network\", \"value\": \"network\"}, {\"label\": \"Others\", \"value\": \"others\"}]}','2026-03-05 02:05:04.763','2026-03-05 02:05:35.130',0),
('cmmctptb10014u9rny6iw3bxl','cmlal9r9j000jolrneyqg4y3d','brand','Brand','DROPDOWN',1,3,'{\"options\": [{\"label\": \"Supermicro\", \"value\": \"supermicro\"}, {\"label\": \"IBM\", \"value\": \"ibm\"}, {\"label\": \"Others\", \"value\": \"others\"}]}','2026-03-05 02:05:28.860','2026-03-05 02:05:28.860',0),
('cmmctr3yn0015u9rnzb2qdzg9','cmlal9r9j000jolrneyqg4y3d','quantity','Jumlah','NUMBER',1,2,'{\"defaultValue\": 1}','2026-03-05 02:06:29.326','2026-04-21 08:47:52.850',0),
('cmmctrsq90016u9rninqyjf3a','cmlal9r9j000jolrneyqg4y3d','serial_number','Serial Number','TEXT',0,3,'{}','2026-03-05 02:07:01.424','2026-04-21 08:47:52.852',0),
('cmmctshto0017u9rn1jp3mqz1','cmlal9r9j000jolrneyqg4y3d','desc','Deskripsi/Kondisi','TEXTAREA',0,6,'{}','2026-03-05 02:07:33.944','2026-03-05 02:07:47.330',0),
('cmmli5odj0001k9rnobf92zd2','cmmli5oc70000k9rnyn8aw3a8','visitor_name','Nama Visitor','TEXT',1,10,'null','2026-03-11 03:51:49.153','2026-03-11 04:41:22.938',0),
('cmmli5odp0002k9rn45ih390f','cmmli5oc70000k9rnyn8aw3a8','nik','NIK','TEXT',1,20,'null','2026-03-11 03:51:49.164','2026-03-11 04:41:22.961',0),
('cmmli5odx0003k9rnxtrhspvy','cmmli5oc70000k9rnyn8aw3a8','phone_number','No. HP','TEXT',0,30,'null','2026-03-11 03:51:49.172','2026-03-11 04:41:22.978',0),
('cmmli5odz0004k9rndn9qw2su','cmmli5oc70000k9rnyn8aw3a8','email','Email','TEXT',0,40,'null','2026-03-11 03:51:49.175','2026-03-11 04:41:22.986',0),
('cmmli5oe40005k9rnbam57ica','cmmli5oc70000k9rnyn8aw3a8','ktp_file','Upload KTP','ATTACHMENT',1,50,'null','2026-03-11 03:51:49.178','2026-03-11 04:41:22.991',0),
('cmmli5oe60006k9rnpobb8br3','cmmli5oc70000k9rnyn8aw3a8','notes','Catatan','TEXTAREA',0,60,'null','2026-03-11 03:51:49.182','2026-03-11 04:41:22.994',0),
('cmmli5oed0008k9rnhf5u4ajw','cmmli5oe90007k9rnvwijkl1y','visit_date','Tanggal Kunjungan','DATE',1,10,'null','2026-03-11 03:51:49.188','2026-03-11 04:41:23.000',0),
('cmmli5oef0009k9rn0kciqwgb','cmmli5oe90007k9rnvwijkl1y','purpose','Keperluan','TEXTAREA',1,20,'null','2026-03-11 03:51:49.190','2026-03-11 04:41:23.002',0),
('cmmli5oej000bk9rn047rhxpp','cmmli5oe90007k9rnvwijkl1y','visitors','Daftar Visitor','TABLE',0,100,'{\"childDocTypeKey\": \"visitor_request_item\"}','2026-03-11 03:51:49.195','2026-03-11 04:41:23.015',0),
('cmmlqe9k30001narn7y5fr7n1','cmmlqe9jb0000narnjeujecw3','subject','Subjek','TEXT',1,10,NULL,'2026-03-11 07:42:26.783','2026-03-12 03:23:32.391',0),
('cmmlqe9kb0002narn0pt7bmm5','cmmlqe9jb0000narnjeujecw3','category','Kategori','DROPDOWN',1,20,'{\"options\": [{\"label\": \"Teknis\", \"value\": \"Technical\"}, {\"label\": \"Billing\", \"value\": \"Billing\"}, {\"label\": \"Umum\", \"value\": \"General\"}]}','2026-03-11 07:42:26.791','2026-03-12 03:23:32.399',0),
('cmmlqe9ki0003narnlzjt2t9s','cmmlqe9jb0000narnjeujecw3','priority','Prioritas','DROPDOWN',1,30,'{\"options\": [{\"label\": \"Rendah\", \"value\": \"Low\"}, {\"label\": \"Normal\", \"value\": \"Medium\"}, {\"label\": \"Tinggi\", \"value\": \"High\"}]}','2026-03-11 07:42:26.798','2026-03-12 03:23:32.404',0),
('cmmlqe9km0004narncqefmidp','cmmlqe9jb0000narnjeujecw3','description','Deskripsi Lengkap','TEXTAREA',1,40,NULL,'2026-03-11 07:42:26.805','2026-03-12 03:23:32.409',0),
('cmmlqe9ks0006narn92yei1pk','cmmlqe9kq0005narny4j2r07n','message','Pesan','TEXTAREA',1,10,NULL,'2026-03-11 07:42:26.812','2026-03-12 03:23:32.436',0),
('cmmlqe9kv0007narn6i6io6r0','cmmlqe9kq0005narny4j2r07n','sender_name','Pengirim','TEXT',0,20,NULL,'2026-03-11 07:42:26.814','2026-03-12 03:23:32.441',0),
('cmmlqe9kx0008narn86j1lp2u','cmmlqe9kq0005narny4j2r07n','attachment','Lampiran','ATTACHMENT',0,30,NULL,'2026-03-11 07:42:26.817','2026-03-12 03:23:32.444',0),
('cmmlr6ex700007vrngyuebr6l','cmmlqe9jb0000narnjeujecw3','messages','Percakapan Tiket','TABLE',0,50,NULL,'2026-03-11 08:04:20.103','2026-03-12 03:23:32.424',0),
('cmmmwl5tu0000x5rn4bt3sfh4','cmmlqe9jb0000narnjeujecw3','attachment','Lampiran','ATTACHMENT',0,45,NULL,'2026-03-12 03:23:32.414','2026-03-12 03:23:32.414',0),
('cmmu15avj0000o1rnc8g3cxri','cmkmdaan300f0vfrnluov51ak','branch_id','Branch','DROPDOWN',1,10,'{\"source\": {\"table\": \"Branch\", \"labelField\": \"name\", \"valueField\": \"id\"}}','2026-03-17 03:05:33.774','2026-03-18 03:16:31.992',0),
('cmmu15avp0001o1rn41zz4j9t','cmkmdaan300f0vfrnluov51ak','building_id','Building','DROPDOWN',1,20,'{\"source\": {\"table\": \"Building\", \"filter\": {\"field\": \"branchId\", \"dependsOn\": \"branch_id\"}, \"labelField\": \"name\", \"valueField\": \"id\"}}','2026-03-17 03:05:33.780','2026-03-18 03:16:32.002',0),
('cmmu15avt0002o1rnmq7nd79a','cmkmdaan300f0vfrnluov51ak','floor_id','Floor','DROPDOWN',1,30,'{\"source\": {\"table\": \"Floor\", \"filter\": {\"field\": \"buildingId\", \"dependsOn\": \"building_id\"}, \"labelField\": \"level\", \"valueField\": \"id\"}}','2026-03-17 03:05:33.784','2026-03-18 03:16:32.008',0),
('cmmu15avz0003o1rniurcf1g6','cmkmdaan300f0vfrnluov51ak','room_id','Room','DROPDOWN',1,40,'{\"source\": {\"table\": \"Room\", \"filter\": {\"field\": \"floorId\", \"dependsOn\": \"floor_id\"}, \"labelField\": \"name\", \"valueField\": \"id\"}}','2026-03-17 03:05:33.790','2026-03-18 03:16:32.012',0),
('cmmu15aw20004o1rn76o3yd50','cmkmdaan300f0vfrnluov51ak','rack_id','ID Rack','TEXT',1,50,NULL,'2026-03-17 03:05:33.793','2026-03-18 03:16:32.015',1),
('cmmu3om8l00003grnz9bawn80','cmkmdaan300f0vfrnluov51ak','rack_name','Nama Rack','TEXT',1,51,NULL,'2026-03-17 04:16:34.196','2026-03-18 03:16:32.017',0),
('cmmvg77og0000mlrn6om3am6p','cmkmdaan300f0vfrnluov51ak','patch_panels','Patch Panels','TABLE',0,80,NULL,'2026-03-18 02:54:43.359','2026-03-18 03:16:32.027',0),
('cmmvgowkr0000v3rn184j8hfz','cmkmdaan300f0vfrnluov51ak','hardware','Hardware','TABLE',0,90,NULL,'2026-03-18 03:08:28.778','2026-03-18 03:16:32.031',0),
('cmmvgowlv0002v3rng46iev13','cmmvgowlt0001v3rn43hnbvx1','name','Nama Hardware','TEXT',1,10,NULL,'2026-03-18 03:08:28.818','2026-03-18 03:16:32.077',0),
('cmmvgowlx0003v3rnukjmpjo7','cmmvgowlt0001v3rn43hnbvx1','description','Deskripsi','TEXTAREA',0,20,NULL,'2026-03-18 03:08:28.821','2026-03-18 03:16:32.080',0),
('cmmvgowm00004v3rn4nmnwfit','cmmvgowlt0001v3rn43hnbvx1','serial_number','Serial Number','TEXT',1,30,NULL,'2026-03-18 03:08:28.823','2026-03-18 03:16:32.084',0),
('cmmvgowm20005v3rn9ivi8r2c','cmmvgowlt0001v3rn43hnbvx1','electricity','Kebutuhan Listrik (Watt)','NUMBER',0,40,NULL,'2026-03-18 03:08:28.825','2026-03-18 03:16:32.086',0),
('cmmvgowm40006v3rn0evahtpp','cmmvgowlt0001v3rn43hnbvx1','weight','Berat (kg)','NUMBER',0,50,NULL,'2026-03-18 03:08:28.828','2026-03-18 03:16:32.088',0),
('cmmvgz9gm0000xsrnxnf1nimn','cmmvg77os0001mlrn5ybkyq4t','patch_panel_number','Patch Panel Number','TEXT',1,10,NULL,'2026-03-18 03:16:32.037','2026-03-18 03:16:32.037',0),
('cmmvi3o5m0001lbrnq8faekhd','cmmvi3o4k0000lbrn2jnietzz','branch_id','Branch','DROPDOWN',1,10,'{\"source\": {\"table\": \"Branch\", \"labelField\": \"name\", \"valueField\": \"id\"}}','2026-03-18 03:47:57.320','2026-03-30 04:57:12.449',0),
('cmmvi3o5v0002lbrnbx4vxegd','cmmvi3o4k0000lbrn2jnietzz','activation_date','Activation Date','DATE',1,20,NULL,'2026-03-18 03:47:57.330','2026-03-30 04:57:12.490',0),
('cmmvi3o620003lbrn0xn485fh','cmmvi3o4k0000lbrn2jnietzz','cross_connect_type','Cross Connect Type','DROPDOWN',1,30,'{\"options\": [{\"label\": \"Fiber Optic\", \"value\": \"Fiber Optic\"}, {\"label\": \"UTP\", \"value\": \"UTP\"}]}','2026-03-18 03:47:57.335','2026-03-30 04:57:12.499',0),
('cmmvi3o670004lbrnu61kqkeh','cmmvi3o4k0000lbrn2jnietzz','request_type','Request Type','DROPDOWN',1,40,'{\"options\": [{\"label\": \"New\", \"value\": \"New\"}, {\"label\": \"Terminate\", \"value\": \"Terminate\"}]}','2026-03-18 03:47:57.342','2026-03-30 04:57:12.516',0),
('cmmvi3o6c0005lbrn9etkjorq','cmmvi3o4k0000lbrn2jnietzz','__header_source','SOURCE','TEXT',0,50,NULL,'2026-03-18 03:47:57.346','2026-03-30 04:57:12.529',0),
('cmmvi3o6f0006lbrnfjuqwy5i','cmmvi3o4k0000lbrn2jnietzz','source_rack_id','Rack ID','DROPDOWN',1,60,'{\"source\": {\"key\": \"master_rack\", \"filter\": {\"field\": \"branch_id\", \"dependsOn\": \"branch_id\"}, \"labelField\": \"rack_name\", \"valueField\": \"id\"}}','2026-03-18 03:47:57.350','2026-03-30 04:57:12.532',0),
('cmmvi3o6j0007lbrne69ttwam','cmmvi3o4k0000lbrn2jnietzz','source_material','Material','DROPDOWN',1,70,'{\"source\": {\"mode\": \"inventory\", \"filter\": {\"field\": \"branch_id\", \"dependsOn\": \"branch_id\"}}}','2026-03-18 03:47:57.354','2026-03-30 04:57:12.538',0),
('cmmvi3o6m0008lbrnliejzcb5','cmmvi3o4k0000lbrn2jnietzz','source_connector_type','Connector Type','DROPDOWN',1,80,'{\"source\": {\"mode\": \"static_dep\", \"filter\": {\"field\": \"cross_connect_type\", \"dependsOn\": \"cross_connect_type\"}}}','2026-03-18 03:47:57.357','2026-03-30 04:57:12.541',0),
('cmmvi3o6s0009lbrnxed6na0y','cmmvi3o4k0000lbrn2jnietzz','__header_destination','DESTINATION','TEXT',0,90,NULL,'2026-03-18 03:47:57.362','2026-03-30 04:57:12.546',0),
('cmmvi3o73000albrnefushzlt','cmmvi3o4k0000lbrn2jnietzz','destination','Destination','DROPDOWN',1,100,'{\"options\": [{\"label\": \"APJII\", \"value\": \"APJII\"}, {\"label\": \"Open IXP\", \"value\": \"Open IXP\"}]}','2026-03-18 03:47:57.374','2026-03-30 04:57:12.551',0),
('cmmvi3o7b000blbrnch6wnddx','cmmvi3o4k0000lbrn2jnietzz','destination_rack_id','Rack ID','TEXT',1,110,NULL,'2026-03-18 03:47:57.381','2026-03-30 04:57:12.554',0),
('cmmvi3o7f000clbrnqqhv6r02','cmmvi3o4k0000lbrn2jnietzz','destination_connector_type','Connector Type','DROPDOWN',1,120,'{\"source\": {\"mode\": \"static_dep\", \"filter\": {\"field\": \"cross_connect_type\", \"dependsOn\": \"cross_connect_type\"}}}','2026-03-18 03:47:57.386','2026-03-30 04:57:12.557',0),
('cmmvoo6lp0000k8rn3arh9jsf','cmmvi3o4k0000lbrn2jnietzz','status','Status','DROPDOWN',1,45,'{\"options\": [{\"label\": \"Active\", \"value\": \"Active\"}, {\"label\": \"Inactive\", \"value\": \"Inactive\"}]}','2026-03-18 06:51:52.043','2026-03-30 04:57:12.525',0),
('cmn8oknfc00046irn48x8x0ne','cmlal9r6q0000olrni50y5m7t','status','Status','DROPDOWN',1,5,'{\"options\": [{\"label\": \"Draft\", \"value\": \"Draft\"}, {\"label\": \"Submitted\", \"value\": \"Submitted\"}, {\"label\": \"Approved\", \"value\": \"Approved\"}, {\"label\": \"Rejected\", \"value\": \"Rejected\"}, {\"label\": \"Completed\", \"value\": \"Completed\"}], \"defaultValue\": \"Draft\"}','2026-03-27 09:10:07.511','2026-04-21 08:47:52.806',0),
('cmn8okngm00056irnxbwnr7ng','cmlal9r8x000colrn693ih8dl','status','Status','DROPDOWN',1,5,'{\"options\": [{\"label\": \"Draft\", \"value\": \"Draft\"}, {\"label\": \"Submitted\", \"value\": \"Submitted\"}, {\"label\": \"Approved\", \"value\": \"Approved\"}, {\"label\": \"Rejected\", \"value\": \"Rejected\"}, {\"label\": \"Completed\", \"value\": \"Completed\"}], \"defaultValue\": \"Draft\"}','2026-03-27 09:10:07.558','2026-04-21 08:47:52.842',0),
('cmn8oknh300066irn7jcdmtgf','cmlal9r9j000jolrneyqg4y3d','description','Deskripsi/Kondisi','TEXTAREA',0,4,NULL,'2026-03-27 09:10:07.575','2026-04-21 08:47:52.854',0),
('cmncot0tv000010rnn0vpd7ta','cmkw4cq7u0005btrnhgh11cdg','term_of_payment','Term Of Payment','DROPDOWN',1,4,'{\"options\": [{\"label\": \"One Time\", \"value\": \"One Time\"}, {\"label\": \"Monthly\", \"value\": \"Monthly\"}, {\"label\": \"Quarterly\", \"value\": \"Quarterly\"}, {\"label\": \"Annually\", \"value\": \"Annually\"}]}','2026-03-30 04:27:42.835','2026-04-21 08:47:52.574',0),
('cmncot0uy000110rnzwpankuz','cmkza5r640000csrnn4eccui8','term_of_payment','Term Of Payment','DROPDOWN',1,4,'{\"options\": [{\"label\": \"One Time\", \"value\": \"One Time\"}, {\"label\": \"Monthly\", \"value\": \"Monthly\"}, {\"label\": \"Quarterly\", \"value\": \"Quarterly\"}, {\"label\": \"Annually\", \"value\": \"Annually\"}]}','2026-03-30 04:27:42.874','2026-04-21 08:47:52.703',0),
('cmncot0vk000210rn44b5rb5x','cmkz6vsv20008hornl8c3i9w4','term_of_payment','Term Of Payment','DROPDOWN',1,4,'{\"options\": [{\"label\": \"One Time\", \"value\": \"One Time\"}, {\"label\": \"Monthly\", \"value\": \"Monthly\"}, {\"label\": \"Quarterly\", \"value\": \"Quarterly\"}, {\"label\": \"Annually\", \"value\": \"Annually\"}]}','2026-03-30 04:27:42.895','2026-04-21 08:47:52.752',0),
('cmnfpqvd20008ycrn1xfdcf11','cmkw4cq7u0005btrnhgh11cdg','total_contract_currency','Total Contract','NUMBER',0,7,NULL,'2026-04-01 07:17:20.580','2026-04-01 07:17:20.580',0),
('cmo84gup60008s58oxpuwvk25','cmo84gup40007s58o77hm25oq','sales_order_id','Sales Order','TEXT',1,1,NULL,'2026-04-21 04:27:00.329','2026-04-21 08:47:52.637',0),
('cmo84gup70009s58ovcfqyn6j','cmo84gup40007s58o77hm25oq','customer_id','Customer','DROPDOWN',1,2,'{\"source\": {\"table\": \"Company\", \"labelField\": \"name\", \"valueField\": \"id\"}}','2026-04-21 04:27:00.331','2026-04-21 08:47:52.642',0),
('cmo84gup9000as58oixuvcpu5','cmo84gup40007s58o77hm25oq','start_date','Start Date','DATE',1,3,NULL,'2026-04-21 04:27:00.332','2026-04-21 08:47:52.645',0),
('cmo84gupb000bs58owrqqy6jq','cmo84gup40007s58o77hm25oq','end_date','End Date','DATE',0,4,NULL,'2026-04-21 04:27:00.335','2026-04-21 08:47:52.654',0),
('cmo84gupd000cs58o1n5idd3d','cmo84gup40007s58o77hm25oq','frequency','Frequency','DROPDOWN',1,5,'{\"options\": [{\"label\": \"One Time\", \"value\": \"One Time\"}, {\"label\": \"Monthly\", \"value\": \"Monthly\"}, {\"label\": \"Quarterly\", \"value\": \"Quarterly\"}, {\"label\": \"Annually\", \"value\": \"Annually\"}]}','2026-04-21 04:27:00.336','2026-04-21 08:47:52.661',0),
('cmo84gupg000es58ok0yqolnv','cmo84gup40007s58o77hm25oq','total_mrc','Total MRC','PRICE',1,7,NULL,'2026-04-21 04:27:00.340','2026-04-21 08:47:52.676',0),
('cmo84gupj000fs58o0d5o7535','cmo84gup40007s58o77hm25oq','next_billing_date','Next Billing Date','DATE',0,8,NULL,'2026-04-21 04:27:00.342','2026-04-21 08:47:52.681',0),
('cmo858kj70000bc8ohq2mc62y','cmo84gup40007s58o77hm25oq','service_name','Nama Layanan','TEXT',0,1,NULL,'2026-04-21 04:48:33.523','2026-04-21 08:47:52.639',0),
('cmockoggm00016s8o4gr1jsuz','cmockogfh00006s8od6x3z7hb','invoice_number','Invoice Number','TEXT',1,1,NULL,'2026-04-24 07:11:53.636','2026-04-24 07:11:53.636',0),
('cmockoggm00026s8odjr4xj5q','cmockogfh00006s8od6x3z7hb','subscription_id','Subscription','DROPDOWN',1,2,'{\"source\": {\"key\": \"subscription_management\", \"labelField\": \"service_name\", \"valueField\": \"service_name\"}}','2026-04-24 07:11:53.636','2026-04-27 04:28:28.743',0),
('cmockoggm00036s8oi4q5je5j','cmockogfh00006s8od6x3z7hb','customer_id','Customer','DROPDOWN',1,3,'{\"source\": {\"table\": \"Company\", \"labelField\": \"name\", \"valueField\": \"id\"}}','2026-04-24 07:11:53.636','2026-04-24 07:11:53.636',0),
('cmockoggm00046s8o19mxpt8u','cmockogfh00006s8od6x3z7hb','invoice_date','Invoice Date','DATE',1,4,NULL,'2026-04-24 07:11:53.636','2026-04-24 07:11:53.636',0),
('cmockoggm00056s8ou39nlagp','cmockogfh00006s8od6x3z7hb','due_date','Due Date','DATE',1,5,NULL,'2026-04-24 07:11:53.636','2026-04-24 07:11:53.636',0),
('cmockoggm00066s8omc0uwedq','cmockogfh00006s8od6x3z7hb','billing_period_start','Period Start','DATE',0,6,NULL,'2026-04-24 07:11:53.636','2026-04-24 07:11:53.636',0),
('cmockoggm00076s8o2vcjq3q5','cmockogfh00006s8od6x3z7hb','billing_period_end','Period End','DATE',0,7,NULL,'2026-04-24 07:11:53.636','2026-04-24 07:11:53.636',0),
('cmockoggm00086s8oc8io7c0p','cmockogfh00006s8od6x3z7hb','subtotal','Subtotal','PRICE',1,8,NULL,'2026-04-24 07:11:53.636','2026-04-24 07:11:53.636',0),
('cmockoggm00096s8ouejkq2oy','cmockogfh00006s8od6x3z7hb','tax','Tax (11%)','PRICE',0,9,NULL,'2026-04-24 07:11:53.636','2026-04-24 07:11:53.636',0),
('cmockoggm000a6s8ozuzxgy8r','cmockogfh00006s8od6x3z7hb','total_amount','Total Amount','PRICE',1,10,NULL,'2026-04-24 07:11:53.636','2026-04-24 07:11:53.636',0),
('cmockoggm000b6s8oliv8z0b9','cmockogfh00006s8od6x3z7hb','prorate_details','Prorate Details','TEXTAREA',0,11,NULL,'2026-04-24 07:11:53.636','2026-04-24 07:11:53.636',0),
('cmockoggm000c6s8o5fh8ozue','cmockogfh00006s8od6x3z7hb','nrc_amount','NRC (Setup Fee)','PRICE',0,12,NULL,'2026-04-24 07:11:53.636','2026-04-24 07:11:53.636',0),
('cmockoggm000d6s8ouw64ta0y','cmockogfh00006s8od6x3z7hb','mrc_amount','MRC (Recurring)','PRICE',0,13,NULL,'2026-04-24 07:11:53.636','2026-04-24 07:11:53.636',0),
('cmockoggm000e6s8o8tyzeh69','cmockogfh00006s8od6x3z7hb','status','Status','DROPDOWN',1,14,'{\"options\": [{\"label\": \"Draft\", \"value\": \"Draft\"}, {\"label\": \"Sent\", \"value\": \"Sent\"}, {\"label\": \"Paid\", \"value\": \"Paid\"}, {\"label\": \"Overdue\", \"value\": \"Overdue\"}, {\"label\": \"Cancelled\", \"value\": \"Cancelled\"}]}','2026-04-24 07:11:53.636','2026-04-24 07:11:53.636',0),
('cms2wvfof0000f3jlcvwqa7lt','cmlal9r8c0007olrnfvow06tf','tinggi','Tinggi','TEXT',1,5,NULL,'2026-07-27 07:34:22.236','2026-07-27 07:34:22.236',0),
('cms2wxi2h0001f3jlz1t4z1pv','cmlal9r8c0007olrnfvow06tf','lebar','Lebar','TEXT',1,7,NULL,'2026-07-27 07:35:58.648','2026-07-27 07:35:58.648',0),
('cms2xil120002f3jl3exe5id9','cmlal9r8c0007olrnfvow06tf','panjang','Panjang','NUMBER',1,8,NULL,'2026-07-27 07:52:22.261','2026-07-27 07:52:22.261',0);
/*!40000 ALTER TABLE `DocField` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `DocNamingCounter`
--

DROP TABLE IF EXISTS `DocNamingCounter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `DocNamingCounter` (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `docTypeId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `branchId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `series` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `seq` int NOT NULL DEFAULT '0',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `DocNamingCounter_docTypeId_branchId_series_key` (`docTypeId`,`branchId`,`series`),
  KEY `DocNamingCounter_docTypeId_branchId_idx` (`docTypeId`,`branchId`),
  KEY `DocNamingCounter_branchId_fkey` (`branchId`),
  CONSTRAINT `DocNamingCounter_branchId_fkey` FOREIGN KEY (`branchId`) REFERENCES `Branch` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `DocNamingCounter_docTypeId_fkey` FOREIGN KEY (`docTypeId`) REFERENCES `DocType` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DocNamingCounter`
--

LOCK TABLES `DocNamingCounter` WRITE;
/*!40000 ALTER TABLE `DocNamingCounter` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `DocNamingCounter` VALUES
('cml93e7zn00145arn4gluxgjy','cmkza5r640000csrnn4eccui8','cmk6k26a1000cukrnkf8vku40','REQ-#####',11,'2026-02-05 06:45:37.137','2026-04-27 03:58:10.632'),
('cml93efsb00185arnya11oohm','cmkz6vsv20008hornl8c3i9w4','cmk6k26a1000cukrnkf8vku40','WO-#####',2,'2026-02-05 06:45:47.243','2026-02-05 08:22:34.849'),
('cmla8xs68000jd7rn9py4juhc','cmkw4cq7u0005btrnhgh11cdg','cmk6k26a1000cukrnkf8vku40','SO-#####',14,'2026-02-06 02:08:34.014','2026-04-27 03:59:16.052'),
('cmlacyss9000ptdrnzc6k78by','cmkza5r6k0007csrnuqan4bpl','cmk6k26a1000cukrnkf8vku40','REQITEM-#####',1,'2026-02-06 04:01:19.927','2026-02-06 04:01:19.927'),
('cmmbfc7v30000u9rnotvnz69p','cmlal9r6q0000olrni50y5m7t',NULL,'GIN-{YYYY}-{MM}-{#####}',3,'2026-03-04 02:35:13.739','2026-03-04 03:27:16.066'),
('cmmbg7sj40008u9rnezwoy88r','cmlal9r6q0000olrni50y5m7t','cmk6k26a1000cukrnkf8vku40','GIN-{YYYY}-{MM}-{#####}',5,'2026-03-04 02:59:46.864','2026-03-04 03:16:09.683'),
('cmmbhopbd000ju9rn85xhhv3a','cmlal9r6q0000olrni50y5m7t','cmkfbdazb0000airn2albkfd3','GIN-{YYYY}-{MM}-{#####}',5,'2026-03-04 03:40:55.462','2026-03-05 04:14:07.675'),
('cmmcthv310010u9rnu28ziwji','cmlal9r8x000colrn693ih8dl','cmkfbdazb0000airn2albkfd3','GOUT-{YYYY}-{MM}-{#####}',2,'2026-03-05 01:59:17.916','2026-03-05 03:34:28.094'),
('cmmcygmaz0004svrnzny2376e','cmlal9r6q0000olrni50y5m7t','cmkfbdazb0000airn2albkfd3','GIN-#####',2,'2026-03-05 04:18:17.955','2026-03-27 01:34:43.571'),
('cmmljgh4d00012jrnab7fkrs8','cmmli5oe90007k9rnvwijkl1y','cmkfbdazb0000airn2albkfd3','VR-####',2,'2026-03-11 04:28:12.583','2026-03-11 04:50:33.745'),
('cmmmwuya10002pwrnlrfp1cgx','cmmlqe9jb0000narnjeujecw3','cmkfbdazb0000airn2albkfd3','TIC-#####',1,'2026-03-12 03:31:09.191','2026-03-12 03:31:09.191'),
('cmmn5nc5i000e2ernatedti0u','cmknoljb70000bjrnetv689gg','cmk6k26a1000cukrnkf8vku40','QUOT-#####',1,'2026-03-12 07:37:10.470','2026-03-12 07:37:10.470'),
('cmmodxq49000i2ernwpz443um','cmmli5oe90007k9rnvwijkl1y','cmk6k26a1000cukrnkf8vku40','VR-####',3,'2026-03-13 04:16:58.231','2026-03-13 04:16:58.279'),
('cmn8a1pg6000h9mrn6ve1rz66','cmmvi3o4k0000lbrn2jnietzz','cmkfbdazb0000airn2albkfd3','CROSS-#####',2,'2026-03-27 02:23:29.045','2026-03-27 06:45:19.240'),
('cmn8jk1v20001jzrnl4kr7ovt','cmkw4cq7u0005btrnhgh11cdg','cmkfbdazb0000airn2albkfd3','SO-#####',6,'2026-03-27 06:49:41.485','2026-04-01 02:50:01.958'),
('cmo9ihowv00001p8oakcs8v2y','cmo84gup40007s58o77hm25oq','cmk6k26a1000cukrnkf8vku40','SUB-#####',2,'2026-04-22 03:47:20.285','2026-04-27 04:01:19.734'),
('cmo9st9pr0000ternq2v03o0t','cmo84gup40007s58o77hm25oq','cmkfbdazb0000airn2albkfd3','SUB-#####',3,'2026-04-22 08:36:16.623','2026-04-22 09:34:13.258'),
('cmp3hr4gd0000phrnmje4eucn','cmockogfh00006s8od6x3z7hb',NULL,'INV/2026/05',8,'2026-05-13 03:19:45.958','2026-05-22 03:51:14.427');
/*!40000 ALTER TABLE `DocNamingCounter` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `DocPermission`
--

DROP TABLE IF EXISTS `DocPermission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `DocPermission` (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `docTypeId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `roleId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `canCreate` tinyint(1) NOT NULL DEFAULT '0',
  `canRead` tinyint(1) NOT NULL DEFAULT '1',
  `canWrite` tinyint(1) NOT NULL DEFAULT '0',
  `canDelete` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `canAssign` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `DocPermission_docTypeId_roleId_key` (`docTypeId`,`roleId`),
  KEY `DocPermission_roleId_fkey` (`roleId`),
  CONSTRAINT `DocPermission_docTypeId_fkey` FOREIGN KEY (`docTypeId`) REFERENCES `DocType` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `DocPermission_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DocPermission`
--

LOCK TABLES `DocPermission` WRITE;
/*!40000 ALTER TABLE `DocPermission` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `DocPermission` VALUES
('cmknoljde000dbjrn1s1dozw7','cmknoljb70000bjrnetv689gg','cmkeyb3a600003crngd8squ82',1,1,1,1,'2026-01-21 07:08:14.541','2026-01-29 09:57:17.596',0),
('cmkw4cq99000ibtrnqmxv9tcq','cmkw4cq7u0005btrnhgh11cdg','cmkeyb3a600003crngd8squ82',1,1,1,1,'2026-01-27 04:51:26.828','2026-02-06 03:34:26.216',1),
('cmkw4cq9c000jbtrnoasgw8ff','cmkw4cq7u0005btrnhgh11cdg','cmkexir460003unrnggeczxbh',0,1,1,0,'2026-01-27 04:51:26.832','2026-04-22 04:24:56.928',0),
('cmkwavl3u000bw5rnd3ant5d4','cmkw4cq8m000cbtrno82k33h7','cmkeyb3a600003crngd8squ82',1,1,1,1,'2026-01-27 07:54:04.280','2026-01-27 07:54:04.280',0),
('cmkwavta4000cw5rnip0zwwgd','cmkw4cq8m000cbtrno82k33h7','cmkql5s4y000f2urnyg8pjk4j',1,1,1,0,'2026-01-27 07:54:14.899','2026-01-27 07:54:14.899',0),
('cmkz6vswa000lhornbgw92833','cmkz6vsv20008hornl8c3i9w4','cmkeyb3a600003crngd8squ82',1,1,1,1,'2026-01-29 08:25:34.473','2026-01-29 09:57:17.709',0),
('cmkz6vswf000mhornlt7tr4s6','cmkz6vsv20008hornl8c3i9w4','cmkexir460003unrnggeczxbh',0,1,0,0,'2026-01-29 08:25:34.479','2026-01-29 09:57:17.713',0),
('cmkz8975y000kswrn16msf7v6','cmkz6vsv20008hornl8c3i9w4','cmkql5s4y000f2urnyg8pjk4j',1,1,0,0,'2026-01-29 09:03:59.107','2026-01-29 09:03:59.107',0),
('cmkza5r6z000dcsrni8rg1nwe','cmkza5r640000csrnn4eccui8','cmkeyb3a600003crngd8squ82',1,1,1,1,'2026-01-29 09:57:17.674','2026-02-06 07:03:10.224',1),
('cml0dtq0i000c2brnffr97kbg','cmkw4cq7u0005btrnhgh11cdg','cmkql5s4y000f2urnyg8pjk4j',0,1,1,0,'2026-01-30 04:27:40.887','2026-01-30 04:27:40.887',0),
('cml0ihr75000e2brnzgnmikb8','cmknoljb70000bjrnetv689gg','cmkql5s4y000f2urnyg8pjk4j',0,1,1,0,'2026-01-30 06:38:20.649','2026-01-30 06:38:20.649',0),
('cml15u9dn0000qlrntj4pzam4','cmknoljb70000bjrnetv689gg','cmkexir460003unrnggeczxbh',0,1,1,0,'2026-01-30 17:31:55.257','2026-01-30 17:31:55.257',0),
('cml4qzu78000a12rnwn163bfl','cmknoljcd0007bjrn7heczhpp','cmkeyb3a600003crngd8squ82',1,1,1,1,'2026-02-02 05:47:25.983','2026-02-02 05:47:25.983',0),
('cml4r617u000l12rnobacqjzm','cmknoljcd0007bjrn7heczhpp','cmkql5s4y000f2urnyg8pjk4j',1,1,1,1,'2026-02-02 05:52:15.016','2026-02-02 06:51:10.781',0),
('cml4tchir000s12rns9ymhinq','cmkza5r6k0007csrnuqan4bpl','cmkeyb3a600003crngd8squ82',1,1,1,1,'2026-02-02 06:53:15.313','2026-02-02 06:53:15.313',0),
('cml4tcz04000t12rnkk9e6crs','cmkza5r6k0007csrnuqan4bpl','cmkql5s4y000f2urnyg8pjk4j',1,1,1,1,'2026-02-02 06:53:37.971','2026-02-02 06:53:37.971',0),
('cml4urvf5001c12rnwgh4i6fr','cmkz6vsvn000fhornnrk104c7','cmkeyb3a600003crngd8squ82',1,1,1,1,'2026-02-02 07:33:12.782','2026-02-02 07:33:12.782',0),
('cml4uuc0f001h12rn2a2x31ht','cmkz6vsvn000fhornnrk104c7','cml4nc06f0006ytrn5flvktxz',0,1,0,0,'2026-02-02 07:35:07.596','2026-02-02 07:35:07.596',0),
('cml4uyu9l001l12rnun060c6b','cmkz6vsv20008hornl8c3i9w4','cml4nc06f0006ytrn5flvktxz',0,1,1,0,'2026-02-02 07:38:37.879','2026-02-03 03:06:12.690',0),
('cml4w2bzg001n12rn27ejy31y','cmkmdaan300f0vfrnluov51ak','cml4nc06f0006ytrn5flvktxz',1,1,1,1,'2026-02-02 08:09:20.425','2026-02-02 08:09:20.425',0),
('cml4xgngu0003airnis7uby6y','cmkza5r640000csrnn4eccui8','cml4nc06f0006ytrn5flvktxz',0,1,0,0,'2026-02-02 08:48:28.108','2026-02-02 08:48:28.108',0),
('cml4xhj060004airnswlqkzn6','cmkza5r640000csrnn4eccui8','cmkql5s4y000f2urnyg8pjk4j',1,1,1,0,'2026-02-02 08:49:08.977','2026-02-02 08:49:08.977',0),
('cml4xir9o0005airno252z7jj','cmkmdaan300f0vfrnluov51ak','cmkz8742x000hswrnkcrtxio5',1,1,1,1,'2026-02-02 08:50:06.339','2026-02-02 08:50:06.339',0),
('cml4xixmj0006airnxk9qd5wi','cmkmdaan300f0vfrnluov51ak','cmkeyb3a600003crngd8squ82',1,1,1,1,'2026-02-02 08:50:14.585','2026-02-02 08:50:14.585',0),
('cml4xjx5n0007airn1bha8biz','cmkz6vsv20008hornl8c3i9w4','cmkz8742x000hswrnkcrtxio5',0,1,1,0,'2026-02-02 08:51:00.633','2026-02-03 03:05:29.277',1),
('cml4xl10j0008airns4gfz42h','cmkz6vsvn000fhornnrk104c7','cmkz8742x000hswrnkcrtxio5',0,1,0,0,'2026-02-02 08:51:52.289','2026-02-02 08:51:52.289',0),
('cml4xwl5f000dn7rn90n14d8f','cml4xwl370000n7rnpzeigyq9','cmk6k26840009ukrnnw45u6fi',1,1,1,1,'2026-02-02 09:00:51.602','2026-02-02 10:28:03.782',0),
('cml4xwl5j000en7rnfmu74h6l','cml4xwl4q0007n7rnbwn4gr6n','cmk6k26840009ukrnnw45u6fi',1,1,1,1,'2026-02-02 09:00:51.606','2026-02-02 10:28:03.786',0),
('cml4xwl5l000fn7rnli1jvcvb','cml4xwl370000n7rnpzeigyq9','cmkeyb3a600003crngd8squ82',1,1,1,1,'2026-02-02 09:00:51.608','2026-02-02 10:28:03.790',0),
('cml4xwl5q000gn7rntppvdab0','cml4xwl4q0007n7rnbwn4gr6n','cmkeyb3a600003crngd8squ82',1,1,1,1,'2026-02-02 09:00:51.612','2026-02-02 10:28:03.792',0),
('cml4y4uii0009airngep4gnir','cml4xwl370000n7rnpzeigyq9','cml4nc06f0006ytrn5flvktxz',1,1,1,0,'2026-02-02 09:07:16.983','2026-02-02 09:07:16.983',0),
('cml4y4xit000aairn9gtpgh1d','cml4xwl370000n7rnpzeigyq9','cmkz8742x000hswrnkcrtxio5',1,1,1,0,'2026-02-02 09:07:20.883','2026-02-02 09:07:20.883',0),
('cmlae9nty000ttdrncq3nejbr','cmknoljb70000bjrnetv689gg','cmlacb785000mtdrnmw82brql',0,1,1,0,'2026-02-06 04:37:46.329','2026-02-06 04:37:46.329',1),
('cmlaladyu0001uqrnafxafwhj','cmlal9r8c0007olrnfvow06tf','cmkeyb3a600003crngd8squ82',1,1,1,1,'2026-02-06 07:54:17.524','2026-04-21 08:47:52.866',0),
('cmlaladyx0002uqrnjtvqwvxv','cmlal9r8x000colrn693ih8dl','cmkeyb3a600003crngd8squ82',1,1,1,1,'2026-02-06 07:54:17.528','2026-04-21 08:47:52.870',0),
('cmlaladyz0003uqrnscx4t37p','cmlal9r9j000jolrneyqg4y3d','cmkeyb3a600003crngd8squ82',1,1,1,1,'2026-02-06 07:54:17.531','2026-04-21 08:47:52.872',0),
('cmlaladz40005uqrn8e5mruv0','cmlal9r8c0007olrnfvow06tf','cmkexir460003unrnggeczxbh',1,1,1,1,'2026-02-06 07:54:17.535','2026-04-21 08:47:52.879',0),
('cmlaladz80007uqrnczoav275','cmlal9r9j000jolrneyqg4y3d','cmkexir460003unrnggeczxbh',1,1,1,1,'2026-02-06 07:54:17.540','2026-04-21 08:47:52.883',0),
('cmlalfvvy0003kernpot94r59','cmlal9r8c0007olrnfvow06tf','cmk6k26840009ukrnnw45u6fi',1,1,1,1,'2026-02-06 07:58:34.029','2026-02-06 07:58:34.029',0),
('cmlalfvw50005kerntmrxn6k4','cmlal9r9j000jolrneyqg4y3d','cmk6k26840009ukrnnw45u6fi',1,1,1,1,'2026-02-06 07:58:34.035','2026-02-06 07:58:34.035',0),
('cmmbfgd9w0004u9rnjpojy73d','cmlal9r8x000colrn693ih8dl','cmkexir460003unrnggeczxbh',1,1,1,1,'2026-03-04 02:38:27.378','2026-04-21 08:47:52.881',0),
('cmmctgzsv000zu9rnj0v2mf60','cmlal9r8x000colrn693ih8dl','cmmcsfbjf000su9rnbiwvc4h1',0,1,1,0,'2026-03-05 01:58:37.373','2026-03-05 01:58:37.373',0),
('cmmcy8y1f0000svrn45b5ze3m','cmlal9r8x000colrn693ih8dl','cmkql5s4y000f2urnyg8pjk4j',0,1,1,0,'2026-03-05 04:12:19.921','2026-03-05 04:12:19.921',0),
('cmmli5oep000ck9rn4pol7jwu','cmmli5oe90007k9rnvwijkl1y','cmkexir460003unrnggeczxbh',1,1,1,0,'2026-03-11 03:51:49.200','2026-03-11 04:41:23.026',0),
('cmmli5oev000ek9rn0o35t2e5','cmmli5oe90007k9rnvwijkl1y','cmkz8742x000hswrnkcrtxio5',1,1,1,0,'2026-03-11 03:51:49.206','2026-03-11 04:41:23.044',1),
('cmmli5oex000fk9rnp1nj3yuz','cmmli5oe90007k9rnvwijkl1y','cmmcsfbjf000su9rnbiwvc4h1',0,1,0,0,'2026-03-11 03:51:49.209','2026-03-11 04:41:23.048',0),
('cmmli5of4000gk9rnt78fa38f','cmmli5oc70000k9rnyn8aw3a8','cmkexir460003unrnggeczxbh',1,1,1,0,'2026-03-11 03:51:49.215','2026-03-11 04:41:23.051',0),
('cmmli5of9000ik9rn5vqvwa73','cmmli5oc70000k9rnyn8aw3a8','cmkz8742x000hswrnkcrtxio5',1,1,1,0,'2026-03-11 03:51:49.220','2026-03-11 04:41:23.065',1),
('cmmli5ofb000jk9rn771hvrdw','cmmli5oc70000k9rnyn8aw3a8','cmmcsfbjf000su9rnbiwvc4h1',0,1,0,0,'2026-03-11 03:51:49.223','2026-03-11 04:41:23.068',0),
('cmmliebjs00004lrnfjbs1sfb','cmmli5oe90007k9rnvwijkl1y','cmkeyb3a600003crngd8squ82',1,1,1,1,'2026-03-11 03:58:32.439','2026-03-11 04:41:23.041',1),
('cmmliebkr00014lrnxm4i8cer','cmmli5oc70000k9rnyn8aw3a8','cmkeyb3a600003crngd8squ82',1,1,1,1,'2026-03-11 03:58:32.474','2026-03-11 04:41:23.063',1),
('cmmljkpc100052jrnxslk4sct','cmmli5oe90007k9rnvwijkl1y','cmkql5s4y000f2urnyg8pjk4j',1,1,1,0,'2026-03-11 04:31:29.854','2026-03-11 04:31:29.854',0),
('cmmljl4n300062jrns7orc4l5','cmmli5oc70000k9rnyn8aw3a8','cmkql5s4y000f2urnyg8pjk4j',1,1,1,0,'2026-03-11 04:31:49.693','2026-03-11 04:31:49.693',0),
('cmmljxf160001a3rnuo0tqdi8','cmmli5oe90007k9rnvwijkl1y','cmk6k26840009ukrnnw45u6fi',1,1,1,1,'2026-03-11 04:41:23.032','2026-03-11 04:41:23.040',1),
('cmmljxf1p0002a3rnrhk9dvb3','cmmli5oc70000k9rnyn8aw3a8','cmk6k26840009ukrnnw45u6fi',1,1,1,1,'2026-03-11 04:41:23.053','2026-03-11 04:41:23.061',1),
('cmmlqe9l20009narnms891og8','cmmlqe9jb0000narnjeujecw3','cmkeyb3a600003crngd8squ82',1,1,1,1,'2026-03-11 07:42:26.820','2026-03-12 03:23:32.447',1),
('cmmlqe9l5000anarn2rzvhux7','cmmlqe9kq0005narny4j2r07n','cmkeyb3a600003crngd8squ82',1,1,1,1,'2026-03-11 07:42:26.824','2026-03-12 03:23:32.452',1),
('cmmlqe9l8000bnarncw39vb5g','cmmlqe9jb0000narnjeujecw3','cmkexir460003unrnggeczxbh',1,1,1,0,'2026-03-11 07:42:26.827','2026-03-12 03:23:32.456',0),
('cmmlqe9la000cnarn4vat08h4','cmmlqe9kq0005narny4j2r07n','cmkexir460003unrnggeczxbh',1,1,1,0,'2026-03-11 07:42:26.830','2026-03-12 03:23:32.458',0),
('cmmmxzsq20000c0rnc5u0gi5u','cml4xwl370000n7rnpzeigyq9','cmkexir460003unrnggeczxbh',0,1,0,0,'2026-03-12 04:02:54.885','2026-03-12 04:02:54.885',0),
('cmmmxzsqw0001c0rnf25122kx','cml4xwl4q0007n7rnbwn4gr6n','cmkexir460003unrnggeczxbh',0,1,0,0,'2026-03-12 04:02:54.917','2026-03-12 04:02:54.917',0),
('cmmn501on00002ernsrpulkvf','cmkza5r640000csrnn4eccui8','cmkexir460003unrnggeczxbh',0,1,1,0,'2026-03-12 07:19:03.781','2026-03-12 07:19:03.781',0),
('cmmvg881e0000zjrnzrebu0np','cmmvg77os0001mlrn5ybkyq4t','cmkeyb3a600003crngd8squ82',1,1,1,1,'2026-03-18 02:55:30.481','2026-03-18 03:16:32.072',0),
('cmmvgowm70007v3rnxi853e7g','cmmvgowlt0001v3rn43hnbvx1','cmkeyb3a600003crngd8squ82',1,1,1,1,'2026-03-18 03:08:28.830','2026-03-18 03:16:32.090',0),
('cmngxhfe3000aycrn8vnlpk5i','cmlal9r6q0000olrni50y5m7t','cmkexir460003unrnggeczxbh',1,1,1,1,'2026-04-02 03:41:43.079','2026-04-21 08:47:52.875',0),
('cmngxhn24000bycrn9fdc7lma','cmlal9r6q0000olrni50y5m7t','cmkql5s4y000f2urnyg8pjk4j',0,1,1,0,'2026-04-02 03:41:53.018','2026-04-02 03:41:53.018',0),
('cmngxi4bp000cycrn8kc8n86e','cmlal9r6q0000olrni50y5m7t','cmmcsfbjf000su9rnbiwvc4h1',0,1,1,0,'2026-04-02 03:42:15.393','2026-04-02 03:42:15.393',0),
('cmo84gupk000gs58olpc6tljf','cmo84gup40007s58o77hm25oq','cmkeyb3a600003crngd8squ82',1,1,1,1,'2026-04-21 04:27:00.344','2026-04-21 04:27:00.344',0),
('cmo84gupm000hs58os8gcx4zp','cmo84gup40007s58o77hm25oq','cmkexir460003unrnggeczxbh',0,1,0,0,'2026-04-21 04:27:00.345','2026-04-21 04:27:00.345',0),
('cmo84gusf000ks58o41q4pkxg','cmlal9r6q0000olrni50y5m7t','cmkeyb3a600003crngd8squ82',1,1,1,1,'2026-04-21 04:27:00.447','2026-04-21 08:47:52.860',0),
('cmoau1oie0005tern7x5l89ex','cmo84gup40007s58o77hm25oq','cml4nc06f0006ytrn5flvktxz',1,1,1,1,'2026-04-23 01:58:34.834','2026-04-23 01:58:34.834',0),
('cmockv0t20000jy8of665s1gc','cmockogfh00006s8od6x3z7hb','cmk6k26840009ukrnnw45u6fi',1,1,1,1,'2026-04-24 07:16:59.988','2026-04-24 07:21:44.051',1),
('cmockxbzz00007d8odqpqzkvi','cmockogfh00006s8od6x3z7hb','cmlaqg6wt0003ztrn58gpuvp6',1,1,1,1,'2026-04-24 07:18:47.803','2026-04-24 07:21:44.070',1),
('cmocl13zw00004y8oitnserzx','cmockogfh00006s8od6x3z7hb','cmkexir410002unrnfsg1x40j',1,1,1,1,'2026-04-24 07:21:44.058','2026-04-24 07:21:44.058',1);
/*!40000 ALTER TABLE `DocPermission` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `DocRecord`
--

DROP TABLE IF EXISTS `DocRecord`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `DocRecord` (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `docTypeId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `branchId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `data` json NOT NULL,
  `createdById` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `updatedById` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `code` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `docStatus` int DEFAULT NULL,
  `parentId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `assignedToId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `DocRecord_code_key` (`code`),
  KEY `DocRecord_docTypeId_idx` (`docTypeId`),
  KEY `DocRecord_branchId_idx` (`branchId`),
  KEY `DocRecord_createdById_fkey` (`createdById`),
  KEY `DocRecord_updatedById_fkey` (`updatedById`),
  KEY `DocRecord_parentId_idx` (`parentId`),
  KEY `DocRecord_assignedToId_fkey` (`assignedToId`),
  CONSTRAINT `DocRecord_assignedToId_fkey` FOREIGN KEY (`assignedToId`) REFERENCES `User` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `DocRecord_branchId_fkey` FOREIGN KEY (`branchId`) REFERENCES `Branch` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `DocRecord_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `User` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `DocRecord_docTypeId_fkey` FOREIGN KEY (`docTypeId`) REFERENCES `DocType` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `DocRecord_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `DocRecord` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `DocRecord_updatedById_fkey` FOREIGN KEY (`updatedById`) REFERENCES `User` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DocRecord`
--

LOCK TABLES `DocRecord` WRITE;
/*!40000 ALTER TABLE `DocRecord` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `DocRecord` VALUES
('cml93e81800165arngebt0tpb','cmkza5r6k0007csrnuqan4bpl','cmk6k26a1000cukrnkf8vku40','Pending','{\"qty\": 1, \"_parentId\": \"cml93e80c00155arn3lzbgpsn\", \"product_id\": \"cmkkyfjsv0002vfrnhx4xbraa\", \"spec_rack_id\": \"adad\", \"_parentDocType\": \"request\", \"spec_server_id\": \"adasdasd\", \"spec_description\": \"adadsad\", \"spec_server_room_id\": \"asdasdsad\", \"product_sub_category\": \"cmkkwfq8400015grnyatwxk86\"}','cmk6k26ec000eukrn64t25jm4','cmk6k26ec000eukrn64t25jm4','2026-02-05 06:45:37.195','2026-02-05 06:45:37.195',NULL,1,NULL,'cmk6k26ec000eukrn64t25jm4'),
('cml93efsv001b5arn4kjdddis','cmkz6vsvn000fhornnrk104c7','cmk6k26a1000cukrnkf8vku40','Pending Approval','{\"qty\": 1, \"_parentId\": \"cml93efsj00195arn6p40mygs\", \"product_id\": \"cmkkyfjsv0002vfrnhx4xbraa\", \"spec_rack_id\": \"adad\", \"_parentDocType\": \"work_order\", \"spec_server_id\": \"adasdasd\", \"__childRecordId\": \"cml93e81800165arngebt0tpb\", \"spec_description\": \"adadsad\", \"spec_server_room_id\": \"asdasdsad\", \"product_sub_category\": \"cmkkwfq8400015grnyatwxk86\"}','cmk6k26ec000eukrn64t25jm4','cmkqlsl9w000j2urn9hglxen1','2026-02-05 06:45:47.263','2026-02-05 06:45:47.263',NULL,0,NULL,NULL),
('cml968vp80001twrngoiz8hv3','cmkza5r6k0007csrnuqan4bpl','cmk6k26a1000cukrnkf8vku40','Pending','{\"qty\": 1, \"_parentId\": \"cml968vom0000twrn21te7iyk\", \"product_id\": \"cmkkwgm0t00025grnhc95r349\", \"spec_rack_id\": \"adsads\", \"_parentDocType\": \"request\", \"spec_server_id\": \"asdad\", \"spec_description\": \"dadsad\", \"spec_server_room_id\": \"asdsad\", \"product_sub_category\": \"cmkkwfq8400015grnyatwxk86\"}','cmk6k26ec000eukrn64t25jm4','cmk6k26ec000eukrn64t25jm4','2026-02-05 08:05:26.779','2026-02-05 08:05:26.779',NULL,1,NULL,'cmk6k26ec000eukrn64t25jm4'),
('cml96uwza0005twrnekur0nbn','cmkz6vsvn000fhornnrk104c7','cmk6k26a1000cukrnkf8vku40','Pending Approval','{\"qty\": 1, \"_parentId\": \"cml96uwyy0003twrntmlg43aq\", \"product_id\": \"cmkkwgm0t00025grnhc95r349\", \"spec_rack_id\": \"adsads\", \"_parentDocType\": \"work_order\", \"spec_server_id\": \"asdad\", \"__childRecordId\": \"cml968vp80001twrngoiz8hv3\", \"spec_description\": \"dadsad\", \"spec_server_room_id\": \"asdsad\", \"product_sub_category\": \"cmkkwfq8400015grnyatwxk86\"}','cmk6k26ec000eukrn64t25jm4','cmkqlsl9w000j2urn9hglxen1','2026-02-05 08:22:34.870','2026-02-05 08:22:34.870',NULL,0,NULL,NULL),
('cml9a1g8q0004d7rnd0otgesp','cmkza5r6k0007csrnuqan4bpl','cmk6k26a1000cukrnkf8vku40','Pending','{\"qty\": 1, \"_parentId\": \"cml9a1g800003d7rnh02kkdy5\", \"product_id\": \"cml99hufu0000d7rnguozk4co\", \"_parentDocType\": \"request\", \"product_category\": \"cmkkyiztb0008vfrn4wpmx0ow\", \"spec_description\": \"adaasd\", \"product_sub_category\": \"cmkkyos820009vfrnfm8s8avr\"}','cmk6k26ec000eukrn64t25jm4','cmk6k26ec000eukrn64t25jm4','2026-02-05 09:51:38.617','2026-02-05 09:51:38.617',NULL,1,NULL,'cmk6k26ec000eukrn64t25jm4'),
('cml9ajbvl0007d7rnjvvg5cuj','cmkza5r6k0007csrnuqan4bpl','cmk6k26a1000cukrnkf8vku40','Pending','{\"qty\": 1, \"_parentId\": \"cml9ajbuw0006d7rnot9g2yam\", \"product_id\": \"cml99hufu0000d7rnguozk4co\", \"_parentDocType\": \"request\", \"product_category\": \"cmkkyiztb0008vfrn4wpmx0ow\", \"product_sub_category\": \"cmkkyos820009vfrnfm8s8avr\"}','cmk6k26ec000eukrn64t25jm4','cmk6k26ec000eukrn64t25jm4','2026-02-05 10:05:32.769','2026-02-05 10:05:32.769',NULL,1,NULL,'cmk6k26ec000eukrn64t25jm4'),
('cmla8xs79000ld7rnpvximmwp','cmkw4cq8m000cbtrno82k33h7','cmk6k26a1000cukrnkf8vku40','Pending','{\"qty\": 1, \"_parentId\": \"cmla8xs6z000kd7rnurhdt3y3\", \"product_id\": \"cml99hufu0000d7rnguozk4co\", \"_parentDocType\": \"sales_order\", \"product_category\": \"cmkkyiztb0008vfrn4wpmx0ow\", \"spec_description\": \"ini desc\", \"product_sub_category\": \"cmkkyos820009vfrnfm8s8avr\"}','cmk6k26ec000eukrn64t25jm4','cmk6k26ec000eukrn64t25jm4','2026-02-06 02:08:34.052','2026-02-06 02:08:34.052',NULL,1,NULL,'cmk6k26ec000eukrn64t25jm4'),
('cmla9ggr5000od7rnc0qf8x2e','cmkw4cq8m000cbtrno82k33h7','cmk6k26a1000cukrnkf8vku40','Pending','{\"mrc\": 0, \"nrc\": 100000, \"qty\": 1, \"_parentId\": \"cmla9ggqm000nd7rncljcqpxf\", \"product_id\": \"cmla86beq0009d7rnsosmsuk3\", \"_parentDocType\": \"sales_order\", \"product_category\": \"cmkkyiztb0008vfrn4wpmx0ow\", \"product_sub_category\": \"cmkkyos820009vfrnfm8s8avr\"}','cmk6k26ec000eukrn64t25jm4','cmk6k26ec000eukrn64t25jm4','2026-02-06 02:23:05.680','2026-02-06 02:23:05.680',NULL,1,NULL,'cmk6k26ec000eukrn64t25jm4'),
('cmla9ggrm000qd7rnxig9dnh3','cmkw4cq8m000cbtrno82k33h7','cmk6k26a1000cukrnkf8vku40','Pending','{\"mrc\": 0, \"nrc\": 1500000, \"qty\": 1, \"_parentId\": \"cmla9ggqm000nd7rncljcqpxf\", \"product_id\": \"cmla8cyen000gd7rnnuatcpsf\", \"_parentDocType\": \"sales_order\", \"product_category\": \"cmkkyiztb0008vfrn4wpmx0ow\", \"product_sub_category\": \"cmkkyos820009vfrnfm8s8avr\"}','cmk6k26ec000eukrn64t25jm4','cmk6k26ec000eukrn64t25jm4','2026-02-06 02:23:05.698','2026-02-06 02:23:05.698',NULL,1,NULL,'cmk6k26ec000eukrn64t25jm4'),
('cmla9p76z000td7rnodud7isg','cmkw4cq8m000cbtrno82k33h7','cmk6k26a1000cukrnkf8vku40','Pending','{\"mrc\": 0, \"nrc\": 100000, \"qty\": 1, \"_parentId\": \"cmla9p763000sd7rnbxy8jata\", \"product_id\": \"cmla86beq0009d7rnsosmsuk3\", \"_parentDocType\": \"sales_order\", \"term_of_payment\": \"One Time\", \"product_category\": \"cmkkyiztb0008vfrn4wpmx0ow\", \"term_of_contract\": 0, \"product_sub_category\": \"cmkkyos820009vfrnfm8s8avr\"}','cmk6k26ec000eukrn64t25jm4','cmk6k26ec000eukrn64t25jm4','2026-02-06 02:29:53.194','2026-02-06 02:29:53.194',NULL,1,NULL,'cmk6k26ec000eukrn64t25jm4'),
('cmla9p77c000vd7rndyr4imhb','cmkw4cq8m000cbtrno82k33h7','cmk6k26a1000cukrnkf8vku40','Pending','{\"mrc\": 0, \"nrc\": 15000000, \"qty\": 1, \"_parentId\": \"cmla9p763000sd7rnbxy8jata\", \"product_id\": \"cmla8bjx5000ed7rnfufd6skq\", \"_parentDocType\": \"sales_order\", \"term_of_payment\": \"One Time\", \"product_category\": \"cmkkyiztb0008vfrn4wpmx0ow\", \"term_of_contract\": 0, \"product_sub_category\": \"cmkkyos820009vfrnfm8s8avr\"}','cmk6k26ec000eukrn64t25jm4','cmk6k26ec000eukrn64t25jm4','2026-02-06 02:29:53.207','2026-02-06 02:29:53.207',NULL,1,NULL,'cmk6k26ec000eukrn64t25jm4'),
('cmlaan9p60001tdrnz82q6wdr','cmkw4cq8m000cbtrno82k33h7','cmk6k26a1000cukrnkf8vku40','Pending','{\"mrc\": 0, \"nrc\": 100000, \"qty\": 2, \"_parentId\": \"cmlaan9oq0000tdrncol7knvm\", \"product_id\": \"cmla86beq0009d7rnsosmsuk3\", \"subtotal_mrc\": 0, \"subtotal_nrc\": 200000, \"_parentDocType\": \"sales_order\", \"term_of_payment\": \"One Time\", \"product_category\": \"cmkkyiztb0008vfrn4wpmx0ow\", \"term_of_contract\": 0, \"product_sub_category\": \"cmkkyos820009vfrnfm8s8avr\"}','cmk6k26ec000eukrn64t25jm4','cmk6k26ec000eukrn64t25jm4','2026-02-06 02:56:22.745','2026-02-06 02:56:22.745',NULL,1,NULL,'cmk6k26ec000eukrn64t25jm4'),
('cmlaan9pg0003tdrn7xgtakd6','cmkw4cq8m000cbtrno82k33h7','cmk6k26a1000cukrnkf8vku40','Pending','{\"mrc\": 0, \"nrc\": 1500000, \"qty\": 1, \"_parentId\": \"cmlaan9oq0000tdrncol7knvm\", \"product_id\": \"cmla8cyen000gd7rnnuatcpsf\", \"subtotal_mrc\": 0, \"subtotal_nrc\": 1500000, \"_parentDocType\": \"sales_order\", \"term_of_payment\": \"One Time\", \"product_category\": \"cmkkyiztb0008vfrn4wpmx0ow\", \"term_of_contract\": 0, \"product_sub_category\": \"cmkkyos820009vfrnfm8s8avr\"}','cmk6k26ec000eukrn64t25jm4','cmk6k26ec000eukrn64t25jm4','2026-02-06 02:56:22.756','2026-02-06 02:56:22.756',NULL,1,NULL,'cmk6k26ec000eukrn64t25jm4'),
('cmlaavfno0006tdrnzmc20ais','cmkw4cq8m000cbtrno82k33h7','cmk6k26a1000cukrnkf8vku40','Pending','{\"mrc\": 0, \"nrc\": 100000, \"qty\": 2, \"_parentId\": \"cmlaavfnb0005tdrnavl5fo2f\", \"product_id\": \"cmla86beq0009d7rnsosmsuk3\", \"subtotal_mrc\": 0, \"subtotal_nrc\": 200000, \"_parentDocType\": \"sales_order\", \"term_of_payment\": \"One Time\", \"product_category\": \"cmkkyiztb0008vfrn4wpmx0ow\", \"term_of_contract\": 0, \"product_sub_category\": \"cmkkyos820009vfrnfm8s8avr\"}','cmk6k26ec000eukrn64t25jm4','cmk6k26ec000eukrn64t25jm4','2026-02-06 03:02:43.716','2026-02-06 03:02:43.716',NULL,1,NULL,'cmk6k26ec000eukrn64t25jm4'),
('cmlaavfnz0008tdrndz0ccshn','cmkw4cq8m000cbtrno82k33h7','cmk6k26a1000cukrnkf8vku40','Pending','{\"mrc\": 0, \"nrc\": 1500000, \"qty\": 1, \"_parentId\": \"cmlaavfnb0005tdrnavl5fo2f\", \"product_id\": \"cmla8cyen000gd7rnnuatcpsf\", \"subtotal_mrc\": 0, \"subtotal_nrc\": 1500000, \"_parentDocType\": \"sales_order\", \"term_of_payment\": \"One Time\", \"product_category\": \"cmkkyiztb0008vfrn4wpmx0ow\", \"term_of_contract\": 0, \"product_sub_category\": \"cmkkyos820009vfrnfm8s8avr\"}','cmk6k26ec000eukrn64t25jm4','cmk6k26ec000eukrn64t25jm4','2026-02-06 03:02:43.726','2026-02-06 03:02:43.726',NULL,1,NULL,'cmk6k26ec000eukrn64t25jm4'),
('cmlabpljh000btdrnd0ou6t8a','cmkw4cq8m000cbtrno82k33h7','cmk6k26a1000cukrnkf8vku40','Pending','{\"mrc\": 0, \"nrc\": 100000, \"qty\": 12, \"_parentId\": \"cmlabplj5000atdrnco70bsuo\", \"product_id\": \"cmla86beq0009d7rnsosmsuk3\", \"subtotal_mrc\": 0, \"subtotal_nrc\": 1200000, \"_parentDocType\": \"sales_order\", \"term_of_payment\": \"One Time\", \"product_category\": \"cmkkyiztb0008vfrn4wpmx0ow\", \"term_of_contract\": 0, \"product_sub_category\": \"cmkkyos820009vfrnfm8s8avr\"}','cmk6k26ec000eukrn64t25jm4','cmk6k26ec000eukrn64t25jm4','2026-02-06 03:26:11.020','2026-02-06 03:26:11.020',NULL,1,NULL,'cmk6k26ec000eukrn64t25jm4'),
('cmlabpljs000dtdrnwnxdfoks','cmkw4cq8m000cbtrno82k33h7','cmk6k26a1000cukrnkf8vku40','Pending','{\"mrc\": 0, \"nrc\": 1500000, \"qty\": 1, \"_parentId\": \"cmlabplj5000atdrnco70bsuo\", \"product_id\": \"cmla8cyen000gd7rnnuatcpsf\", \"subtotal_mrc\": 0, \"subtotal_nrc\": 1500000, \"_parentDocType\": \"sales_order\", \"term_of_payment\": \"One Time\", \"product_category\": \"cmkkyiztb0008vfrn4wpmx0ow\", \"term_of_contract\": 0, \"product_sub_category\": \"cmkkyos820009vfrnfm8s8avr\"}','cmk6k26ec000eukrn64t25jm4','cmk6k26ec000eukrn64t25jm4','2026-02-06 03:26:11.032','2026-02-06 03:26:11.032',NULL,1,NULL,'cmk6k26ec000eukrn64t25jm4'),
('cmlabu4f6000itdrnn76i7dx8','cmkw4cq8m000cbtrno82k33h7','cmk6k26a1000cukrnkf8vku40','Pending','{\"mrc\": 0, \"nrc\": 1500000, \"qty\": 1, \"_parentId\": \"cmlabu4et000htdrn9zfs11ea\", \"product_id\": \"cmla8cyen000gd7rnnuatcpsf\", \"subtotal_mrc\": 0, \"subtotal_nrc\": 1500000, \"_parentDocType\": \"sales_order\", \"term_of_payment\": \"One Time\", \"product_category\": \"cmkkyiztb0008vfrn4wpmx0ow\", \"term_of_contract\": 0, \"product_sub_category\": \"cmkkyos820009vfrnfm8s8avr\"}','cmk6k26ec000eukrn64t25jm4','cmk6k26ec000eukrn64t25jm4','2026-02-06 03:29:42.114','2026-02-06 03:29:42.114',NULL,1,NULL,'cmk6k26ec000eukrn64t25jm4'),
('cmlabu4gt000ktdrnf3hzipu4','cmkw4cq8m000cbtrno82k33h7','cmk6k26a1000cukrnkf8vku40','Pending','{\"mrc\": 2000000, \"nrc\": 100000, \"qty\": 1, \"_parentId\": \"cmlabu4et000htdrn9zfs11ea\", \"product_id\": \"cmlabr7no000ftdrnf6vtm1z4\", \"subtotal_mrc\": 2000000, \"subtotal_nrc\": 100000, \"_parentDocType\": \"sales_order\", \"term_of_payment\": \"One Time\", \"product_category\": \"cmkkyiztb0008vfrn4wpmx0ow\", \"term_of_contract\": 0, \"product_sub_category\": \"cmkkyos820009vfrnfm8s8avr\"}','cmk6k26ec000eukrn64t25jm4','cmk6k26ec000eukrn64t25jm4','2026-02-06 03:29:42.173','2026-02-06 03:29:42.173',NULL,1,NULL,'cmk6k26ec000eukrn64t25jm4'),
('cmlacyssl000qtdrn3qkn5iwp','cmkza5r6k0007csrnuqan4bpl','cmk6k26a1000cukrnkf8vku40','DRAFT','{\"qty\": 1, \"product_id\": \"cmkkwgm0t00025grnhc95r349\", \"spec_rack_id\": \"adad\", \"spec_server_id\": \"adada\", \"product_category\": \"cmkkwfq8400015grnyatwxk86\", \"spec_description\": \"asdasdsad\", \"spec_server_room_id\": \"adasd\", \"product_sub_category\": \"\"}','cmkqlsl9w000j2urn9hglxen1','cmkqlsl9w000j2urn9hglxen1','2026-02-06 04:01:19.940','2026-02-06 04:01:19.940','REQITEM-00001',NULL,NULL,NULL),
('cmmljgh5f00022jrn5y497c3v','cmmli5oe90007k9rnvwijkl1y','cmkfbdazb0000airn2albkfd3','Pending','{\"purpose\": \"mau tes visit\", \"_parentId\": \"\", \"visit_date\": \"2026-03-11\", \"_parentDocType\": \"\"}','cmk6k26ec000eukrn64t25jm4','cmk6k26ec000eukrn64t25jm4','2026-03-11 04:28:12.622','2026-03-11 04:28:12.622','VR-0001',0,NULL,'cmk6k26ec000eukrn64t25jm4'),
('cmmlk97zx00072jrn9l2zrv49','cmmli5oe90007k9rnvwijkl1y','cmkfbdazb0000airn2albkfd3','Pending','{\"purpose\": \"asdadad\", \"_parentId\": \"\", \"visit_date\": \"2026-03-11\", \"naming_series\": \"\", \"_parentDocType\": \"\"}','cmk6k26ec000eukrn64t25jm4','cmk6k26ec000eukrn64t25jm4','2026-03-11 04:50:33.788','2026-03-11 04:50:33.788','VR-0002',0,NULL,'cmk6k26ec000eukrn64t25jm4'),
('cmmmwuyb00003pwrn7rfw5aeg','cmmlqe9jb0000narnjeujecw3','cmkfbdazb0000airn2albkfd3','Customer Reply','{\"subject\": \"bagaimana cara pakai portal\", \"category\": \"Technical\", \"messages\": \"\", \"priority\": \"Low\", \"attachment\": null, \"description\": \"ini isi pesan deskripsi\"}','cmk6k26ec000eukrn64t25jm4','cmk6k26ec000eukrn64t25jm4','2026-03-12 03:31:09.228','2026-03-12 03:45:16.541','TIC-00001',0,NULL,'cmk6k26ec000eukrn64t25jm4'),
('cmmmwvt970004pwrn15xjd9as','cmmlqe9kq0005narny4j2r07n','cmkfbdazb0000airn2albkfd3','DRAFT','{\"message\": \"baik akan kami proses terlebih dahulu\", \"attachment\": \"blob\", \"sender_name\": \"Admin (Admin)\"}','cmkeyb3dd00013crn5j2s67gb','cmkeyb3dd00013crn5j2s67gb','2026-03-12 03:31:49.337','2026-03-12 03:31:49.337',NULL,NULL,'cmmmwuyb00003pwrn7rfw5aeg',NULL),
('cmmn5asmg00012ernj64azt6f','cmkw4cq7u0005btrnhgh11cdg','cmk6k26a1000cukrnkf8vku40','Pending','{\"status\": \"Pending\", \"customer\": \"cmk6se3ka000045rnz5t6qe9d\", \"order_date\": \"2026-03-12\", \"customer_id\": \"cmk6se3ka000045rnz5t6qe9d\", \"total_contract\": 1600000, \"term_of_payment\": \"One Time\", \"term_of_contract\": 0, \"transaction_date\": \"2026-03-12\", \"commencement_date\": null}','cmk6k26ec000eukrn64t25jm4','cmk6k26ec000eukrn64t25jm4','2026-03-12 07:27:25.288','2026-03-12 07:27:25.344','SO-00008',1,NULL,'cmk6k26ec000eukrn64t25jm4'),
('cmmn5asn300022ernx97rjb74','cmkw4cq8m000cbtrno82k33h7','cmk6k26a1000cukrnkf8vku40','Pending','{\"mrc\": 0, \"nrc\": 100000, \"qty\": 1, \"price\": 0, \"_parentId\": \"cmmn5asmg00012ernj64azt6f\", \"product_id\": \"cmla86beq0009d7rnsosmsuk3\", \"subtotal_mrc\": 0, \"subtotal_nrc\": 100000, \"_parentDocType\": \"sales_order\", \"term_of_payment\": \"One Time\", \"product_category\": \"cmkkyiztb0008vfrn4wpmx0ow\", \"term_of_contract\": 0, \"product_sub_category\": \"cmkkyos820009vfrnfm8s8avr\"}','cmk6k26ec000eukrn64t25jm4','cmk6k26ec000eukrn64t25jm4','2026-03-12 07:27:25.311','2026-03-12 07:27:25.311',NULL,1,'cmmn5asmg00012ernj64azt6f','cmk6k26ec000eukrn64t25jm4'),
('cmmn5asnr00042ern2xi350rn','cmkw4cq8m000cbtrno82k33h7','cmk6k26a1000cukrnkf8vku40','Pending','{\"mrc\": 0, \"nrc\": 1500000, \"qty\": 1, \"price\": 0, \"_parentId\": \"cmmn5asmg00012ernj64azt6f\", \"product_id\": \"cmla8cyen000gd7rnnuatcpsf\", \"subtotal_mrc\": 0, \"subtotal_nrc\": 1500000, \"_parentDocType\": \"sales_order\", \"term_of_payment\": \"One Time\", \"product_category\": \"cmkkyiztb0008vfrn4wpmx0ow\", \"term_of_contract\": 0, \"product_sub_category\": \"cmkkyos820009vfrnfm8s8avr\"}','cmk6k26ec000eukrn64t25jm4','cmk6k26ec000eukrn64t25jm4','2026-03-12 07:27:25.335','2026-03-12 07:27:25.335',NULL,1,'cmmn5asmg00012ernj64azt6f','cmk6k26ec000eukrn64t25jm4'),
('cmmn5lhgs00062ernxkubl4gc','cmkw4cq7u0005btrnhgh11cdg','cmk6k26a1000cukrnkf8vku40','Pending','{\"status\": \"Pending\", \"customer\": \"cmk6se3ka000045rnz5t6qe9d\", \"order_date\": \"2026-03-12\", \"customer_id\": \"cmk6se3ka000045rnz5t6qe9d\", \"total_contract\": 1600000, \"term_of_payment\": \"One Time\", \"term_of_contract\": 0, \"transaction_date\": \"2026-03-12\", \"commencement_date\": null}','cmk6k26ec000eukrn64t25jm4','cmk6k26ec000eukrn64t25jm4','2026-03-12 07:35:44.044','2026-03-12 07:35:44.078','SO-00009',1,NULL,'cmk6k26ec000eukrn64t25jm4'),
('cmmn5lhh700072erncetely17','cmkw4cq8m000cbtrno82k33h7','cmk6k26a1000cukrnkf8vku40','Pending','{\"mrc\": 0, \"nrc\": 100000, \"qty\": 1, \"price\": 0, \"_parentId\": \"cmmn5lhgs00062ernxkubl4gc\", \"product_id\": \"cmla86beq0009d7rnsosmsuk3\", \"subtotal_mrc\": 0, \"subtotal_nrc\": 100000, \"_parentDocType\": \"sales_order\", \"term_of_payment\": \"One Time\", \"product_category\": \"cmkkyiztb0008vfrn4wpmx0ow\", \"term_of_contract\": 0, \"product_sub_category\": \"cmkkyos820009vfrnfm8s8avr\"}','cmk6k26ec000eukrn64t25jm4','cmk6k26ec000eukrn64t25jm4','2026-03-12 07:35:44.059','2026-03-12 07:35:44.059',NULL,1,'cmmn5lhgs00062ernxkubl4gc','cmk6k26ec000eukrn64t25jm4'),
('cmmn5lhhl00092ernh1vbmd0o','cmkw4cq8m000cbtrno82k33h7','cmk6k26a1000cukrnkf8vku40','Pending','{\"mrc\": 0, \"nrc\": 1500000, \"qty\": 1, \"price\": 0, \"_parentId\": \"cmmn5lhgs00062ernxkubl4gc\", \"product_id\": \"cmla8cyen000gd7rnnuatcpsf\", \"subtotal_mrc\": 0, \"subtotal_nrc\": 1500000, \"_parentDocType\": \"sales_order\", \"term_of_payment\": \"One Time\", \"product_category\": \"cmkkyiztb0008vfrn4wpmx0ow\", \"term_of_contract\": 0, \"product_sub_category\": \"cmkkyos820009vfrnfm8s8avr\"}','cmk6k26ec000eukrn64t25jm4','cmk6k26ec000eukrn64t25jm4','2026-03-12 07:35:44.072','2026-03-12 07:35:44.072',NULL,1,'cmmn5lhgs00062ernxkubl4gc','cmk6k26ec000eukrn64t25jm4'),
('cmmn5mc24000b2ernkexrzuna','cmkza5r640000csrnn4eccui8','cmk6k26a1000cukrnkf8vku40','Send Quotation','{\"items\": \"\", \"notes\": \"\", \"req_date\": \"2026-03-12\", \"__activity\": [{\"at\": \"2026-03-12T07:37:10.419Z\", \"text\": \"Status diubah: Pending → Send Quotation oleh sales metta\"}], \"customer_id\": \"cmk6se3ka000045rnz5t6qe9d\"}','cmk6k26ec000eukrn64t25jm4','cmkqlsl9w000j2urn9hglxen1','2026-03-12 07:36:23.680','2026-03-12 07:37:10.424','REQ-00007',1,NULL,'cmk6k26ec000eukrn64t25jm4'),
('cmmn5mc5r000c2ernm6lqgj50','cmkza5r6k0007csrnuqan4bpl','cmk6k26a1000cukrnkf8vku40','Pending','{\"qty\": 1, \"price\": 0, \"_parentId\": \"cmmn5mc24000b2ernkexrzuna\", \"product_id\": \"cmkkyfjsv0002vfrnhx4xbraa\", \"spec_rack_id\": \"823923\", \"_parentDocType\": \"request\", \"spec_server_id\": \"2382349\", \"spec_description\": \"tidak ada\", \"spec_server_room_id\": \"483495\", \"product_sub_category\": \"cmkkwfq8400015grnyatwxk86\"}','cmk6k26ec000eukrn64t25jm4','cmk6k26ec000eukrn64t25jm4','2026-03-12 07:36:23.820','2026-03-12 07:36:23.820',NULL,1,'cmmn5mc24000b2ernkexrzuna','cmk6k26ec000eukrn64t25jm4'),
('cmmn5nc5q000f2ernpuasosdq','cmknoljb70000bjrnetv689gg','cmk6k26a1000cukrnkf8vku40','Draft','{\"items\": \"\", \"notes\": \"\", \"req_date\": \"2026-03-12\", \"_parentId\": \"cmmn5mc24000b2ernkexrzuna\", \"__activity\": [{\"at\": \"2026-03-12T07:37:10.419Z\", \"text\": \"Status diubah: Pending → Send Quotation oleh sales metta\"}], \"customer_id\": \"cmk6se3ka000045rnz5t6qe9d\", \"_parentDocType\": \"request\"}','cmk6k26ec000eukrn64t25jm4','cmkqlsl9w000j2urn9hglxen1','2026-03-12 07:37:10.478','2026-03-12 07:37:10.478','QUOT-00001',0,'cmmn5mc24000b2ernkexrzuna','cmkqlsl9w000j2urn9hglxen1'),
('cmmn5nc61000h2ernvw91irzr','cmknoljcd0007bjrn7heczhpp','cmk6k26a1000cukrnkf8vku40','Draft','{\"qty\": 1, \"price\": 0, \"_parentId\": \"cmmn5nc5q000f2ernpuasosdq\", \"product_id\": \"cmkkyfjsv0002vfrnhx4xbraa\", \"spec_rack_id\": \"823923\", \"_parentDocType\": \"quotation\", \"spec_server_id\": \"2382349\", \"__childRecordId\": \"cmmn5mc5r000c2ernm6lqgj50\", \"spec_description\": \"tidak ada\", \"spec_server_room_id\": \"483495\", \"product_sub_category\": \"cmkkwfq8400015grnyatwxk86\"}','cmk6k26ec000eukrn64t25jm4','cmkqlsl9w000j2urn9hglxen1','2026-03-12 07:37:10.489','2026-03-12 07:37:10.489',NULL,0,'cmmn5nc5q000f2ernpuasosdq',NULL),
('cmmodxq5p000j2erngt6d1lxv','cmmli5oe90007k9rnvwijkl1y','cmk6k26a1000cukrnkf8vku40','Approved','{\"purpose\": \"mau visit\", \"_parentId\": \"\", \"__activity\": [{\"at\": \"2026-03-13T04:19:26.067Z\", \"text\": \"Status diubah: Pending → Approved oleh sales metta\"}, {\"at\": \"2026-03-13T04:19:26.067Z\", \"text\": \"DocStatus diubah: 0 → 1 oleh sales metta\"}], \"visit_date\": \"2026-03-13\", \"_parentDocType\": \"\"}','cmk6k26ec000eukrn64t25jm4','cmkqlsl9w000j2urn9hglxen1','2026-03-13 04:16:58.284','2026-03-13 04:19:26.068','VR-0003',1,NULL,'cmk6k26ec000eukrn64t25jm4'),
('cmmu40xt60005x1rnxau4bjrq','cmkmdaan300f0vfrnluov51ak','cmkfbdazb0000airn2albkfd3','Active','{\"status\": \"In Use\", \"id_rack\": \"R-001\", \"room_id\": \"cmmu1sbet0001x1rnvy2fi2pe\", \"floor_id\": \"cmmu1rnex0000x1rn8eu3fcbk\", \"_parentId\": \"\", \"branch_id\": \"cmkfbdazb0000airn2albkfd3\", \"rack_name\": \"R-001\", \"__activity\": [{\"at\": \"2026-04-02T03:55:31.994Z\", \"text\": \"Status diubah: Available → In Use oleh engginer\"}, {\"at\": \"2026-04-02T03:55:31.994Z\", \"text\": \"DocStatus diubah: - → 1 oleh engginer\"}, {\"at\": \"2026-04-02T04:32:51.122Z\", \"text\": \"Status diubah: Available → Active oleh engginer\"}], \"company_id\": \"cmk6se3ka000045rnz5t6qe9d\", \"building_id\": \"cml5y5aj9000pairn0inrthyf\", \"_parentDocType\": \"\"}','cmkeyb3dd00013crn5j2s67gb','cml4ncnii0007ytrnoip1jd76','2026-03-17 04:26:09.061','2026-04-02 04:32:51.125','R-001',1,NULL,'cmkeyb3dd00013crn5j2s67gb'),
('cmmvh16cc00009mrnjth98tv0','cmmvg77os0001mlrn5ybkyq4t','cmkfbdazb0000airn2albkfd3','DRAFT','{\"patch_panel_number\": \"PA-NM-089348\"}','cmkeyb3dd00013crn5j2s67gb','cmkeyb3dd00013crn5j2s67gb','2026-03-18 03:18:01.305','2026-03-18 03:18:01.305','PA-NM-089348',NULL,'cmmu40xt60005x1rnxau4bjrq',NULL),
('cmn8851mq00029mrnhrm6114u','cmkmdaan300f0vfrnluov51ak','cmkfbdazb0000airn2albkfd3','Active','{\"status\": \"In Use\", \"id_rack\": \"R-002\", \"room_id\": \"cmmu1sbet0001x1rnvy2fi2pe\", \"floor_id\": \"cmmu1rnex0000x1rn8eu3fcbk\", \"hardware\": \"\", \"_parentId\": \"\", \"branch_id\": \"cmkfbdazb0000airn2albkfd3\", \"rack_name\": \"R-002\", \"__activity\": [{\"at\": \"2026-04-02T03:55:24.735Z\", \"text\": \"Status diubah: Available → In Use oleh engginer\"}, {\"at\": \"2026-04-02T03:55:24.735Z\", \"text\": \"DocStatus diubah: - → 1 oleh engginer\"}, {\"at\": \"2026-04-02T04:32:44.951Z\", \"text\": \"Status diubah: Available → Active oleh engginer\"}], \"company_id\": \"cmk6se3ka000045rnz5t6qe9d\", \"building_id\": \"cml5y5aj9000pairn0inrthyf\", \"patch_panels\": \"\", \"_parentDocType\": \"\"}','cmkeyb3dd00013crn5j2s67gb','cml4ncnii0007ytrnoip1jd76','2026-03-27 01:30:05.565','2026-04-02 04:32:44.953','R-002',1,NULL,'cmkeyb3dd00013crn5j2s67gb'),
('cmn885a5100049mrnfe1mywiy','cmmvg77os0001mlrn5ybkyq4t','cmkfbdazb0000airn2albkfd3','DRAFT','{\"patch_panel_number\": \"PA-NM-77834733\"}','cmkeyb3dd00013crn5j2s67gb','cmkeyb3dd00013crn5j2s67gb','2026-03-27 01:30:16.596','2026-03-27 01:30:16.596','PA-NM-77834733',NULL,'cmn8851mq00029mrnhrm6114u',NULL),
('cmn88s3y7000f9mrnjsi3gujc','cmlal9r8c0007olrnfvow06tf','cmkfbdazb0000airn2albkfd3',NULL,'{\"notes\": \"kirim server\", \"_parentId\": \"cmn88b06200069mrndrz2ht2x\", \"__activity\": [{\"at\": \"2026-03-27T01:44:25.225Z\", \"text\": \"Status diubah: Submited → Approved oleh sales metta\"}, {\"at\": \"2026-03-27T01:48:01.603Z\", \"text\": \"Status diubah: Approved → Completed oleh security Wanaya\"}], \"sender_name\": \"rangga\", \"request_date\": \"2026-03-27\", \"_parentDocType\": \"goods_in_request\", \"recipient_name\": \"fajar\", \"sender_contact\": \"083493485\"}','cmk6k26ec000eukrn64t25jm4','cmmcsg0v1000tu9rnxv2iruow','2026-03-27 01:48:01.662','2026-03-27 01:48:01.662',NULL,NULL,NULL,'cmmcsg0v1000tu9rnxv2iruow'),
('cmn8a1pgf000i9mrnl4xfi71w','cmmvi3o4k0000lbrn2jnietzz','cmkfbdazb0000airn2albkfd3','Pending','{\"_parentId\": \"\", \"branch_id\": \"cmkfbdazb0000airn2albkfd3\", \"destination\": \"APJII\", \"request_type\": \"New\", \"_parentDocType\": \"\", \"source_rack_id\": \"cmn8851mq00029mrnhrm6114u\", \"__header_source\": \"\", \"activation_date\": \"2026-03-27\", \"source_material\": \"Dedicated Server\", \"cross_connect_type\": \"Fiber Optic\", \"destination_rack_id\": \"R-895\", \"__header_destination\": \"\", \"source_connector_type\": \"SC-SC\", \"destination_connector_type\": \"LC-SC\"}','cmk6k26ec000eukrn64t25jm4','cmk6k26ec000eukrn64t25jm4','2026-03-27 02:23:29.054','2026-03-27 02:23:29.054','CROSS-00001',1,NULL,'cmk6k26ec000eukrn64t25jm4'),
('cmn8jefjl0000jzrnj0bgkrro','cmmvi3o4k0000lbrn2jnietzz','cmkfbdazb0000airn2albkfd3','Send Sales Order','{\"_parentId\": \"\", \"branch_id\": \"cmkfbdazb0000airn2albkfd3\", \"__activity\": [{\"at\": \"2026-03-27T06:49:41.419Z\", \"text\": \"Status diubah: Pending → Send Sales Order oleh sales metta\"}, {\"at\": \"2026-03-27T06:59:48.853Z\", \"text\": \"Status diubah: Send Sales Order → Pending oleh sales metta\"}, {\"at\": \"2026-03-27T06:59:51.077Z\", \"text\": \"Status diubah: Pending → Send Sales Order oleh sales metta\"}, {\"at\": \"2026-03-27T07:01:23.354Z\", \"text\": \"Status diubah: Send Sales Order → Pending oleh sales metta\"}, {\"at\": \"2026-03-27T07:13:04.424Z\", \"text\": \"Status diubah: Pending → Send Sales Order oleh sales metta\"}, {\"at\": \"2026-03-27T07:16:41.961Z\", \"text\": \"Status diubah: Send Sales Order → Pending oleh sales metta\"}, {\"at\": \"2026-03-27T07:22:08.596Z\", \"text\": \"Status diubah: Pending → Send Sales Order oleh sales metta\"}, {\"at\": \"2026-03-27T10:04:09.098Z\", \"text\": \"Status diubah: Send Sales Order → Pending oleh sales metta\"}, {\"at\": \"2026-03-27T10:04:11.476Z\", \"text\": \"Status diubah: Pending → Send Sales Order oleh sales metta\"}], \"destination\": \"Open IXP\", \"request_type\": \"New\", \"_parentDocType\": \"\", \"source_rack_id\": \"cmmu40xt60005x1rnxau4bjrq\", \"__header_source\": \"\", \"activation_date\": \"2026-03-27\", \"source_material\": \"Dedicated Server\", \"cross_connect_type\": \"UTP\", \"destination_rack_id\": \"R-7853\", \"__header_destination\": \"\", \"source_connector_type\": \"LAN\", \"destination_connector_type\": \"LAN\"}','cmk6k26ec000eukrn64t25jm4','cmkqlsl9w000j2urn9hglxen1','2026-03-27 06:45:19.281','2026-03-27 10:04:11.477','CROSS-00002',1,NULL,'cmk6k26ec000eukrn64t25jm4'),
('cmn8kpsbl0005jzrnfd4m3o6r','cmkw4cq7u0005btrnhgh11cdg','cmkfbdazb0000airn2albkfd3',NULL,'{\"_parentId\": \"cmn8jefjl0000jzrnj0bgkrro\", \"branch_id\": \"cmkfbdazb0000airn2albkfd3\", \"__activity\": [{\"at\": \"2026-03-27T06:49:41.419Z\", \"text\": \"Status diubah: Pending → Send Sales Order oleh sales metta\"}, {\"at\": \"2026-03-27T06:59:48.853Z\", \"text\": \"Status diubah: Send Sales Order → Pending oleh sales metta\"}, {\"at\": \"2026-03-27T06:59:51.077Z\", \"text\": \"Status diubah: Pending → Send Sales Order oleh sales metta\"}, {\"at\": \"2026-03-27T07:01:23.354Z\", \"text\": \"Status diubah: Send Sales Order → Pending oleh sales metta\"}, {\"at\": \"2026-03-27T07:13:04.424Z\", \"text\": \"Status diubah: Pending → Send Sales Order oleh sales metta\"}, {\"at\": \"2026-03-27T07:16:41.961Z\", \"text\": \"Status diubah: Send Sales Order → Pending oleh sales metta\"}, {\"at\": \"2026-03-27T07:22:08.596Z\", \"text\": \"Status diubah: Pending → Send Sales Order oleh sales metta\"}], \"customer_id\": \"cmk6se3ka000045rnz5t6qe9d\", \"destination\": \"Open IXP\", \"request_type\": \"New\", \"_parentDocType\": \"cross_connect\", \"source_rack_id\": \"cmmu40xt60005x1rnxau4bjrq\", \"__header_source\": \"\", \"activation_date\": \"2026-03-27\", \"source_material\": \"Dedicated Server\", \"cross_connect_type\": \"UTP\", \"destination_rack_id\": \"R-7853\", \"__header_destination\": \"\", \"source_connector_type\": \"LAN\", \"destination_connector_type\": \"LAN\"}','cmk6k26ec000eukrn64t25jm4','cmkqlsl9w000j2urn9hglxen1','2026-03-27 07:22:08.672','2026-03-27 07:22:08.672','SO-00004',NULL,'cmn8jefjl0000jzrnj0bgkrro','cmkqlsl9w000j2urn9hglxen1'),
('cmn8kpsc70007jzrn8rkgnhxb','cmkw4cq8m000cbtrno82k33h7','cmkfbdazb0000airn2albkfd3','Draft','{\"qty\": 1, \"price\": 0, \"_parentId\": \"cmn8kpsbl0005jzrnfd4m3o6r\", \"product_id\": \"Dedicated Server\", \"description\": \"Cross Connect Service: UTP (New)\", \"_parentDocType\": \"sales_order\"}','cmk6k26ec000eukrn64t25jm4','cmkqlsl9w000j2urn9hglxen1','2026-03-27 07:22:08.695','2026-03-27 07:22:08.695',NULL,NULL,'cmn8kpsbl0005jzrnfd4m3o6r',NULL),
('cmn8qi6is0008jzrnkx481qd7','cmkw4cq7u0005btrnhgh11cdg','cmkfbdazb0000airn2albkfd3',NULL,'{\"notes\": \"\", \"_parentId\": \"cmn8jefjl0000jzrnj0bgkrro\", \"branch_id\": \"cmkfbdazb0000airn2albkfd3\", \"__activity\": [{\"at\": \"2026-03-27T06:49:41.419Z\", \"text\": \"Status diubah: Pending → Send Sales Order oleh sales metta\"}, {\"at\": \"2026-03-27T06:59:48.853Z\", \"text\": \"Status diubah: Send Sales Order → Pending oleh sales metta\"}, {\"at\": \"2026-03-27T06:59:51.077Z\", \"text\": \"Status diubah: Pending → Send Sales Order oleh sales metta\"}, {\"at\": \"2026-03-27T07:01:23.354Z\", \"text\": \"Status diubah: Send Sales Order → Pending oleh sales metta\"}, {\"at\": \"2026-03-27T07:13:04.424Z\", \"text\": \"Status diubah: Pending → Send Sales Order oleh sales metta\"}, {\"at\": \"2026-03-27T07:16:41.961Z\", \"text\": \"Status diubah: Send Sales Order → Pending oleh sales metta\"}, {\"at\": \"2026-03-27T07:22:08.596Z\", \"text\": \"Status diubah: Pending → Send Sales Order oleh sales metta\"}, {\"at\": \"2026-03-27T10:04:09.098Z\", \"text\": \"Status diubah: Send Sales Order → Pending oleh sales metta\"}, {\"at\": \"2026-03-27T10:04:11.476Z\", \"text\": \"Status diubah: Pending → Send Sales Order oleh sales metta\"}], \"order_date\": \"2026-03-27\", \"customer_id\": \"cmk6se3ka000045rnz5t6qe9d\", \"destination\": \"Open IXP\", \"request_type\": \"New\", \"subtotal_mrc\": 1000, \"subtotal_nrc\": 5000, \"_parentDocType\": \"cross_connect\", \"source_rack_id\": \"cmmu40xt60005x1rnxau4bjrq\", \"total_contract\": 6000, \"__header_source\": \"\", \"activation_date\": \"2026-03-27\", \"source_material\": \"Dedicated Server\", \"term_of_payment\": \"Monthly\", \"term_of_contract\": 12, \"commencement_date\": \"2026-03-31\", \"cross_connect_type\": \"UTP\", \"destination_rack_id\": \"R-7853\", \"__header_destination\": \"\", \"source_connector_type\": \"LAN\", \"total_contract_currency\": 1500000, \"destination_connector_type\": \"LAN\"}','cmk6k26ec000eukrn64t25jm4','cmkeyb3dd00013crn5j2s67gb','2026-03-27 10:04:11.524','2026-04-23 02:04:20.937','SO-00005',NULL,'cmn8jefjl0000jzrnj0bgkrro','cmkqlsl9w000j2urn9hglxen1'),
('cmn8qi6je000ajzrn96pr05ts','cmkw4cq8m000cbtrno82k33h7','cmkfbdazb0000airn2albkfd3','Draft','{\"mrc\": 1000000, \"nrc\": 500000, \"qty\": 1, \"price\": 1500000, \"_parentId\": \"cmn8qi6is0008jzrnkx481qd7\", \"product_id\": \"prod_cross_connect\", \"description\": \"Cross Connect Service: UTP (New)\", \"_parentDocType\": \"sales_order\"}','cmk6k26ec000eukrn64t25jm4','cmkqlsl9w000j2urn9hglxen1','2026-03-27 10:04:11.546','2026-03-27 10:04:11.546',NULL,NULL,'cmn8qi6is0008jzrnkx481qd7',NULL),
('cmncokwz20000jfrne1yrdhx9','cmkw4cq7u0005btrnhgh11cdg','cmk6k26a1000cukrnkf8vku40','Approved','{\"status\": \"Pending\", \"customer\": \"cmk6se3ka000045rnz5t6qe9d\", \"order_date\": \"2026-03-30\", \"customer_id\": \"cmk6se3ka000045rnz5t6qe9d\", \"subtotal_mrc\": 1000000, \"subtotal_nrc\": 500000, \"total_contract\": 1500000, \"term_of_payment\": \"Monthly\", \"term_of_contract\": 12, \"transaction_date\": \"2026-03-30\", \"commencement_date\": \"2026-03-30\"}','cmk6k26ec000eukrn64t25jm4','cmk6k26ec000eukrn64t25jm4','2026-03-30 04:21:24.589','2026-04-22 03:47:20.254','SO-00010',1,NULL,'cmk6k26ec000eukrn64t25jm4'),
('cmncokwzp0001jfrn2g1hlxdg','cmkw4cq8m000cbtrno82k33h7','cmk6k26a1000cukrnkf8vku40','Pending','{\"mrc\": 1000000, \"nrc\": 500000, \"qty\": 1, \"price\": 1000000, \"_parentId\": \"cmncokwz20000jfrne1yrdhx9\", \"product_id\": \"prod_cross_connect\", \"subtotal_mrc\": 1000000, \"subtotal_nrc\": 500000, \"_parentDocType\": \"sales_order\", \"term_of_payment\": \"One Time\", \"term_of_contract\": 0, \"product_sub_category\": \"connectivity_services\"}','cmk6k26ec000eukrn64t25jm4','cmk6k26ec000eukrn64t25jm4','2026-03-30 04:21:24.611','2026-03-30 04:21:24.611',NULL,1,'cmncokwz20000jfrne1yrdhx9','cmk6k26ec000eukrn64t25jm4'),
('cmnfg73ym0003jfrn9aakdl00','cmkw4cq7u0005btrnhgh11cdg','cmkfbdazb0000airn2albkfd3','Approved','{\"items\": \"\", \"notes\": \"\", \"__activity\": [{\"at\": \"2026-04-22T08:36:16.445Z\", \"by\": \"customer@example.com\", \"text\": \"Status diubah: Pending -> Approved\"}, {\"at\": \"2026-04-22T09:34:13.143Z\", \"by\": \"customer@example.com\", \"text\": \"Status diubah: Pending Approval -> Approved\"}], \"order_date\": \"2026-04-01\", \"customer_id\": \"cmk6se3ka000045rnz5t6qe9d\", \"subtotal_mrc\": 1000000, \"subtotal_nrc\": 500000, \"total_contract\": 1500000, \"term_of_payment\": \"Monthly\", \"term_of_contract\": 12, \"commencement_date\": \"2026-04-01\", \"total_contract_currency\": null}','cmk6k26ec000eukrn64t25jm4','cmk6k26ec000eukrn64t25jm4','2026-04-01 02:50:02.061','2026-04-22 09:34:13.222','SO-00006',1,NULL,'cmk6k26ec000eukrn64t25jm4'),
('cmnfg740y0004jfrn6hdnrwsu','cmkw4cq8m000cbtrno82k33h7','cmkfbdazb0000airn2albkfd3','Pending','{\"mrc\": 1000000, \"nrc\": 500000, \"qty\": 1, \"price\": 1000000, \"_parentId\": \"cmnfg73ym0003jfrn9aakdl00\", \"product_id\": \"prod_cross_connect\", \"subtotal_mrc\": 1000000, \"subtotal_nrc\": 500000, \"_parentDocType\": \"sales_order\", \"term_of_payment\": \"One Time\", \"spec_destination\": \"Open IXP\", \"term_of_contract\": 0, \"spec_request_type\": \"New\", \"spec_source_rack_id\": \"cmnebgsqa00001grnunro35g1\", \"product_sub_category\": \"connectivity_services\", \"spec_source_material\": \"Dedicated Server\", \"spec_cross_connect_type\": \"UTP\", \"spec_destination_rack_id\": \"SC-1245\", \"spec_source_connector_type\": \"LC-SC\", \"spec_destination_connector_type\": \"SC-SC\"}','cmk6k26ec000eukrn64t25jm4','cmk6k26ec000eukrn64t25jm4','2026-04-01 02:50:02.144','2026-04-01 02:50:02.144',NULL,1,'cmnfg73ym0003jfrn9aakdl00','cmk6k26ec000eukrn64t25jm4'),
('cmnfgb8a90006jfrnyetfc9ak','cmkza5r640000csrnn4eccui8','cmk6k26a1000cukrnkf8vku40','Pending','{\"items\": \"\", \"notes\": \"\", \"req_no\": \"\", \"currency\": \"\", \"req_date\": \"2026-04-01\", \"customer_id\": \"cmk6se3ka000045rnz5t6qe9d\", \"term_of_payment\": \"\"}','cmk6k26ec000eukrn64t25jm4','cmk6k26ec000eukrn64t25jm4','2026-04-01 02:53:14.288','2026-04-01 02:53:14.288','REQ-00008',1,NULL,'cmk6k26ec000eukrn64t25jm4'),
('cmnfgb8ay0007jfrn356pdj9g','cmkza5r6k0007csrnuqan4bpl','cmk6k26a1000cukrnkf8vku40','Pending','{\"qty\": 1, \"price\": 1000000, \"_parentId\": \"cmnfgb8a90006jfrnyetfc9ak\", \"product_id\": \"prod_cross_connect\", \"_parentDocType\": \"request\", \"spec_destination\": \"APJII\", \"spec_request_type\": \"New\", \"spec_source_rack_id\": \"cmnebgsqa00001grnunro35g1\", \"product_sub_category\": \"connectivity_services\", \"spec_source_material\": \"Dedicated Server\", \"spec_cross_connect_type\": \"Fiber Optic\", \"spec_destination_rack_id\": \"R-8857\", \"spec_source_connector_type\": \"SC-SC\", \"spec_destination_connector_type\": \"SC-SC\"}','cmk6k26ec000eukrn64t25jm4','cmk6k26ec000eukrn64t25jm4','2026-04-01 02:53:14.314','2026-04-01 02:53:14.314',NULL,1,'cmnfgb8a90006jfrnyetfc9ak','cmk6k26ec000eukrn64t25jm4'),
('cmnfgfltz0009jfrnro4nml7h','cmkza5r640000csrnn4eccui8','cmk6k26a1000cukrnkf8vku40','Send Sales Order','{\"items\": \"\", \"notes\": \"Request cross connect\", \"req_no\": \"\", \"currency\": \"\", \"req_date\": \"2026-04-01\", \"__activity\": [{\"at\": \"2026-04-01T02:58:36.855Z\", \"text\": \"Status diubah: Pending → Send Sales Order oleh sales metta\"}, {\"at\": \"2026-04-01T02:58:36.855Z\", \"text\": \"DocStatus diubah: 0 → 1 oleh sales metta\"}], \"customer_id\": \"cmk6se3ka000045rnz5t6qe9d\", \"term_of_payment\": \"Monthly\"}','cmk6k26ec000eukrn64t25jm4','cmkqlsl9w000j2urn9hglxen1','2026-04-01 02:56:38.470','2026-04-01 02:58:36.857','REQ-00009',1,NULL,'cmk6k26ec000eukrn64t25jm4'),
('cmnfgfluk000ajfrnv72rdwa2','cmkza5r6k0007csrnuqan4bpl','cmk6k26a1000cukrnkf8vku40','Pending','{\"qty\": 1, \"price\": 1000000, \"_parentId\": \"cmnfgfltz0009jfrnro4nml7h\", \"product_id\": \"prod_cross_connect\", \"_parentDocType\": \"request\", \"spec_destination\": \"APJII\", \"spec_request_type\": \"New\", \"spec_source_rack_id\": \"cmnebgsqa00001grnunro35g1\", \"product_sub_category\": \"connectivity_services\", \"spec_source_material\": \"Dedicated Server\", \"spec_cross_connect_type\": \"UTP\", \"spec_destination_rack_id\": \"R-8948\", \"spec_source_connector_type\": \"SC-SC\", \"spec_destination_connector_type\": \"SC-SC\"}','cmk6k26ec000eukrn64t25jm4','cmk6k26ec000eukrn64t25jm4','2026-04-01 02:56:38.491','2026-04-01 02:56:38.491',NULL,1,'cmnfgfltz0009jfrnro4nml7h','cmk6k26ec000eukrn64t25jm4'),
('cmnfgi57i000cjfrnemji25iu','cmkw4cq7u0005btrnhgh11cdg','cmk6k26a1000cukrnkf8vku40','Draft','{\"items\": \"\", \"notes\": \"Request cross connect\", \"req_no\": \"\", \"currency\": \"\", \"req_date\": \"2026-04-01\", \"_parentId\": \"cmnfgfltz0009jfrnro4nml7h\", \"__activity\": [{\"at\": \"2026-04-01T02:58:36.855Z\", \"text\": \"Status diubah: Pending → Send Sales Order oleh sales metta\"}, {\"at\": \"2026-04-01T02:58:36.855Z\", \"text\": \"DocStatus diubah: 0 → 1 oleh sales metta\"}], \"order_date\": \"2026-04-01\", \"customer_id\": \"cmk6se3ka000045rnz5t6qe9d\", \"subtotal_mrc\": 10000, \"subtotal_nrc\": 5000, \"_parentDocType\": \"request\", \"total_contract\": 125000, \"term_of_payment\": \"Monthly\", \"term_of_contract\": 12, \"commencement_date\": \"2026-04-08\"}','cmk6k26ec000eukrn64t25jm4','cmkqlsl9w000j2urn9hglxen1','2026-04-01 02:58:36.893','2026-04-01 06:55:01.534','SO-00011',0,'cmnfgfltz0009jfrnro4nml7h','cmkqlsl9w000j2urn9hglxen1'),
('cmnfgi57z000ejfrnv6dt5sq1','cmkw4cq8m000cbtrno82k33h7','cmk6k26a1000cukrnkf8vku40','Draft','{\"qty\": 1, \"price\": 1000000, \"_parentId\": \"cmnfgi57i000cjfrnemji25iu\", \"product_id\": \"prod_cross_connect\", \"_parentDocType\": \"sales_order\", \"__childRecordId\": \"cmnfgfluk000ajfrnv72rdwa2\", \"spec_destination\": \"APJII\", \"spec_request_type\": \"New\", \"spec_source_rack_id\": \"cmnebgsqa00001grnunro35g1\", \"product_sub_category\": \"connectivity_services\", \"spec_source_material\": \"Dedicated Server\", \"spec_cross_connect_type\": \"UTP\", \"spec_destination_rack_id\": \"R-8948\", \"spec_source_connector_type\": \"SC-SC\", \"spec_destination_connector_type\": \"SC-SC\"}','cmk6k26ec000eukrn64t25jm4','cmkqlsl9w000j2urn9hglxen1','2026-04-01 02:58:36.911','2026-04-01 02:58:36.911',NULL,0,'cmnfgi57i000cjfrnemji25iu',NULL),
('cmnfpnq2h0003ycrntb7mrf5w','cmkw4cq7u0005btrnhgh11cdg','cmk6k26a1000cukrnkf8vku40','Draft','{\"items\": \"\", \"notes\": \"\", \"req_date\": \"2026-04-01\", \"_parentId\": \"cmnfpncj30000ycrnti7kemru\", \"__activity\": [{\"at\": \"2026-04-01T07:14:51.163Z\", \"text\": \"Status diubah: Draft → Pending oleh sales metta\"}, {\"at\": \"2026-04-01T07:14:53.720Z\", \"text\": \"Status diubah: Pending → Send Sales Order oleh sales metta\"}, {\"at\": \"2026-04-01T07:14:53.720Z\", \"text\": \"DocStatus diubah: 0 → 1 oleh sales metta\"}], \"order_date\": \"2026-04-02\", \"customer_id\": \"cmk6k269v000bukrn5hs6vlqq\", \"_parentDocType\": \"request\", \"term_of_payment\": \"Monthly\", \"term_of_contract\": 12, \"commencement_date\": \"2026-04-09\", \"total_contract_currency\": 245000}','cmkqlsl9w000j2urn9hglxen1','cmkqlsl9w000j2urn9hglxen1','2026-04-01 07:14:53.753','2026-04-01 07:17:55.022','SO-00012',0,NULL,'cmkqlsl9w000j2urn9hglxen1'),
('cmnfpnq2u0005ycrnep0wj2f1','cmkw4cq8m000cbtrno82k33h7','cmk6k26a1000cukrnkf8vku40','Draft','{\"qty\": 1, \"price\": 5000, \"_parentId\": \"cmnfpnq2h0003ycrntb7mrf5w\", \"product_id\": \"cmla8cyen000gd7rnnuatcpsf\", \"description\": \"\", \"_parentDocType\": \"sales_order\", \"discount_percent\": null, \"product_category\": \"cmkkwfq8400015grnyatwxk86\", \"product_sub_category\": \"cmkkwfq8400015grnyatwxk86\"}','cmkqlsl9w000j2urn9hglxen1','cmkqlsl9w000j2urn9hglxen1','2026-04-01 07:14:53.766','2026-04-01 07:14:53.766',NULL,0,'cmnfpnq2h0003ycrntb7mrf5w',NULL),
('cmnfpnq2x0007ycrnn1smx2b3','cmkw4cq8m000cbtrno82k33h7','cmk6k26a1000cukrnkf8vku40','Draft','{\"qty\": 1, \"price\": 10000, \"_parentId\": \"cmnfpnq2h0003ycrntb7mrf5w\", \"product_id\": \"cmkmewdod00f4vfrnxsh6m0ol\", \"description\": \"\", \"_parentDocType\": \"sales_order\", \"discount_percent\": null, \"product_category\": \"cmkkyiztb0008vfrn4wpmx0ow\", \"product_sub_category\": \"cmkkyos820009vfrnfm8s8avr\"}','cmkqlsl9w000j2urn9hglxen1','cmkqlsl9w000j2urn9hglxen1','2026-04-01 07:14:53.769','2026-04-01 07:14:53.769',NULL,0,'cmnfpnq2h0003ycrntb7mrf5w',NULL),
('cmngwwzt80009ycrn63umkzvy','cmkmdaan300f0vfrnluov51ak','cmk6k26a1000cukrnkf8vku40','Active','{\"status\": \"In Use\", \"room_id\": \"cmnebejmw0001zornlkqfib2e\", \"floor_id\": \"cmnebejlu0000zorn14oe6m0y\", \"hardware\": \"\", \"_parentId\": \"\", \"branch_id\": \"cmk6k26a1000cukrnkf8vku40\", \"rack_name\": \"JB-001\", \"__activity\": [{\"at\": \"2026-04-02T03:43:34.190Z\", \"text\": \"Status diubah: Available → In Use oleh engginer\"}, {\"at\": \"2026-04-02T03:43:34.190Z\", \"text\": \"DocStatus diubah: - → 1 oleh engginer\"}, {\"at\": \"2026-04-02T04:31:08.587Z\", \"text\": \"Status diubah (sinkronisasi): In Use → Available oleh Admin\"}, {\"at\": \"2026-04-02T04:33:51.510Z\", \"text\": \"Status diubah: Available → Active oleh engginer\"}, {\"at\": \"2026-04-02T04:33:51.510Z\", \"text\": \"DocStatus diubah: 0 → 1 oleh engginer\"}], \"company_id\": \"cmk6se3ka000045rnz5t6qe9d\", \"building_id\": \"cml5y51p8000oairnbfuf1b0a\", \"patch_panels\": \"\", \"_parentDocType\": \"\"}','cmkeyb3dd00013crn5j2s67gb','cml4ncnii0007ytrnoip1jd76','2026-04-02 03:25:49.768','2026-04-02 04:33:51.511','JB-001',1,NULL,'cmkeyb3dd00013crn5j2s67gb'),
('cmo9ihox600011p8o0rka0r2z','cmo84gup40007s58o77hm25oq','cmk6k26a1000cukrnkf8vku40','Active','{\"status\": \"Deactive\", \"end_date\": \"\", \"frequency\": \"Monthly\", \"total_mrc\": 1000000, \"__activity\": [{\"at\": \"2026-04-23T02:07:47.462Z\", \"text\": \"Status diubah: Deactive → Active oleh engginer\"}, {\"at\": \"2026-04-23T02:07:47.462Z\", \"text\": \"DocStatus diubah: 0 → 1 oleh engginer\"}], \"start_date\": \"2026-03-30\", \"customer_id\": \"cmk6se3ka000045rnz5t6qe9d\", \"service_name\": \"Service\", \"sales_order_id\": \"cmncokwz20000jfrne1yrdhx9\", \"next_billing_date\": \"2026-03-30\"}','cmk6k26ec000eukrn64t25jm4','cml4ncnii0007ytrnoip1jd76','2026-04-22 03:47:20.296','2026-04-23 02:07:47.463','SUB-00001',1,NULL,'cmk6k26ec000eukrn64t25jm4'),
('cmo9uvsb60002ternf8bvv7yg','cmo84gup40007s58o77hm25oq','cmkfbdazb0000airn2albkfd3','Deactive','{\"status\": \"Active\", \"end_date\": \"2026-05-30\", \"frequency\": \"Quarterly\", \"total_mrc\": 1000000, \"start_date\": \"2026-04-30\", \"customer_id\": \"cmk6se3ka000045rnz5t6qe9d\", \"service_name\": \"Cross Connect\", \"sales_order_id\": \"cmnfg73ym0003jfrn9aakdl00\", \"next_billing_date\": \"2026-04-01\"}','cmk6k26ec000eukrn64t25jm4','cmlaqhaak0004ztrnhhcnjlby','2026-04-22 09:34:13.265','2026-05-08 03:47:12.001','SUB-00003',0,NULL,'cmk6k26ec000eukrn64t25jm4'),
('cmocaxzdd0002yl8og8ot4b2a','cmkw4cq7u0005btrnhgh11cdg','cmk6k26a1000cukrnkf8vku40','Approved','{\"items\": \"\", \"notes\": \"\", \"__activity\": [{\"at\": \"2026-04-24T02:42:14.849Z\", \"by\": \"voxawo1583@hacknapp.com\", \"text\": \"Status diubah: Pending -> Approved\"}], \"order_date\": \"2026-04-24\", \"customer_id\": \"cmocavd1n0001yl8ohp4nb4w2\", \"subtotal_mrc\": 0, \"subtotal_nrc\": 1600000, \"total_contract\": 1600000, \"term_of_payment\": \"One Time\", \"term_of_contract\": 1, \"commencement_date\": \"2026-04-24\", \"total_contract_currency\": 1600000}','cmocappot0000yl8oz9felwuh','cmocappot0000yl8oz9felwuh','2026-04-24 02:39:21.935','2026-04-24 02:42:15.117','SO-00013',1,NULL,'cmocappot0000yl8oz9felwuh'),
('cmocaxzff0003yl8oj5blxpq6','cmkw4cq8m000cbtrno82k33h7','cmk6k26a1000cukrnkf8vku40','Pending','{\"mrc\": 0, \"nrc\": 100000, \"qty\": 1, \"_parentId\": \"cmocaxzdd0002yl8og8ot4b2a\", \"product_id\": \"cmla86beq0009d7rnsosmsuk3\", \"subtotal_mrc\": 0, \"subtotal_nrc\": 100000, \"_parentDocType\": \"sales_order\", \"term_of_payment\": \"One Time\", \"product_category\": \"cmkkyiztb0008vfrn4wpmx0ow\", \"term_of_contract\": 0, \"product_sub_category\": \"cmkkyos820009vfrnfm8s8avr\"}','cmocappot0000yl8oz9felwuh','cmocappot0000yl8oz9felwuh','2026-04-24 02:39:22.007','2026-04-24 02:39:22.007',NULL,1,'cmocaxzdd0002yl8og8ot4b2a','cmocappot0000yl8oz9felwuh'),
('cmocaxzgo0005yl8omct8sqdu','cmkw4cq8m000cbtrno82k33h7','cmk6k26a1000cukrnkf8vku40','Pending','{\"mrc\": 0, \"nrc\": 1500000, \"qty\": 1, \"_parentId\": \"cmocaxzdd0002yl8og8ot4b2a\", \"product_id\": \"cmla8cyen000gd7rnnuatcpsf\", \"subtotal_mrc\": 0, \"subtotal_nrc\": 1500000, \"_parentDocType\": \"sales_order\", \"term_of_payment\": \"One Time\", \"product_category\": \"cmkkyiztb0008vfrn4wpmx0ow\", \"term_of_contract\": 0, \"product_sub_category\": \"cmkkyos820009vfrnfm8s8avr\"}','cmocappot0000yl8oz9felwuh','cmocappot0000yl8oz9felwuh','2026-04-24 02:39:22.056','2026-04-24 02:39:22.056',NULL,1,'cmocaxzdd0002yl8og8ot4b2a','cmocappot0000yl8oz9felwuh'),
('cmoclomh50000gk8ocibzkqmg','cmockogfh00006s8od6x3z7hb','cmkfbdazb0000airn2albkfd3','Draft','{\"tax\": 25667, \"status\": \"Sent\", \"due_date\": \"2026-05-04\", \"subtotal\": 450000, \"mrc_amount\": 1000000, \"nrc_amount\": 0, \"customer_id\": \"cmk6se3ka000045rnz5t6qe9d\", \"invoice_date\": \"2026-04-24\", \"total_amount\": 475667, \"invoice_number\": \"INV/2026/04/0001\", \"prorate_details\": \"Prorate (24 - 30 Apr): Rp 233.333 (7 days @ Rp 33.333/day)\", \"subscription_id\": \"cmo9uvsb60002ternf8bvv7yg\", \"billing_period_end\": \"2026-04-24\", \"billing_period_start\": \"2026-04-24\"}','cmk6k26ec000eukrn64t25jm4','cmlaqhaak0004ztrnhhcnjlby','2026-04-24 07:40:01.095','2026-05-07 03:37:11.669','INV/2026/04/0001',0,'cmo9uvsb60002ternf8bvv7yg',NULL),
('cmogo2w2w0001gk8o9qmd7up5','cmkza5r640000csrnn4eccui8','cmk6k26a1000cukrnkf8vku40','Send Sales Order','{\"items\": \"\", \"notes\": \"\", \"req_date\": \"2026-04-27\", \"__activity\": [{\"at\": \"2026-04-27T03:59:16.005Z\", \"text\": \"Status diubah: Pending → Send Sales Order oleh sales metta\"}, {\"at\": \"2026-04-27T03:59:16.005Z\", \"text\": \"DocStatus diubah: 0 → 1 oleh sales metta\"}], \"customer_id\": \"cmocavd1n0001yl8ohp4nb4w2\", \"term_of_payment\": \"Monthly\"}','cmocappot0000yl8oz9felwuh','cmkqlsl9w000j2urn9hglxen1','2026-04-27 03:58:10.663','2026-04-27 03:59:16.006','REQ-00011',1,NULL,'cmocappot0000yl8oz9felwuh'),
('cmogo2w380002gk8o65exbo1g','cmkza5r6k0007csrnuqan4bpl','cmk6k26a1000cukrnkf8vku40','Pending','{\"qty\": 1, \"_parentId\": \"cmogo2w2w0001gk8o9qmd7up5\", \"product_id\": \"cmngyg1jc000fycrnhu6cblmt\", \"spec_power\": \"220Vac\", \"_parentDocType\": \"request\", \"spec_rack_size\": \"4x40\", \"product_category\": \"cmkkyiztb0008vfrn4wpmx0ow\", \"spec_amount_rack\": 1, \"product_sub_category\": \"cmngyfai0000eycrnxzft9j1i\"}','cmocappot0000yl8oz9felwuh','cmocappot0000yl8oz9felwuh','2026-04-27 03:58:10.675','2026-04-27 03:58:10.675',NULL,1,'cmogo2w2w0001gk8o9qmd7up5','cmocappot0000yl8oz9felwuh'),
('cmogo4ajg0004gk8oxrkfn3sk','cmkw4cq7u0005btrnhgh11cdg','cmk6k26a1000cukrnkf8vku40','Approved','{\"items\": \"\", \"notes\": \"\", \"__activity\": [{\"at\": \"2026-04-27T03:59:16.005Z\", \"text\": \"Status diubah: Pending → Send Sales Order oleh sales metta\"}, {\"at\": \"2026-04-27T03:59:16.005Z\", \"text\": \"DocStatus diubah: 0 → 1 oleh sales metta\"}, {\"at\": \"2026-04-27T04:00:51.506Z\", \"text\": \"Status diubah: Draft → Pending Approval oleh sales metta\"}, {\"at\": \"2026-04-27T04:00:51.506Z\", \"text\": \"DocStatus diubah: 0 → 1 oleh sales metta\"}, {\"at\": \"2026-04-27T04:01:19.665Z\", \"by\": \"voxawo1583@hacknapp.com\", \"text\": \"Status diubah: Pending Approval -> Approved\"}], \"order_date\": \"2026-04-27\", \"customer_id\": \"cmocavd1n0001yl8ohp4nb4w2\", \"subtotal_mrc\": 500000, \"subtotal_nrc\": 200000, \"total_contract\": 700000, \"term_of_payment\": \"Monthly\", \"term_of_contract\": 12, \"commencement_date\": \"2026-04-30\", \"total_contract_currency\": 700000}','cmocappot0000yl8oz9felwuh','cmocappot0000yl8oz9felwuh','2026-04-27 03:59:16.060','2026-04-27 04:01:19.713','SO-00014',1,'cmogo2w2w0001gk8o9qmd7up5','cmkqlsl9w000j2urn9hglxen1'),
('cmogo4ajr0006gk8oyweonfos','cmkw4cq8m000cbtrno82k33h7','cmk6k26a1000cukrnkf8vku40','Draft','{\"qty\": 1, \"_parentId\": \"cmogo4ajg0004gk8oxrkfn3sk\", \"product_id\": \"cmngyg1jc000fycrnhu6cblmt\", \"spec_power\": \"220Vac\", \"_parentDocType\": \"sales_order\", \"spec_rack_size\": \"4x40\", \"__childRecordId\": \"cmogo2w380002gk8o65exbo1g\", \"product_category\": \"cmkkyiztb0008vfrn4wpmx0ow\", \"spec_amount_rack\": 1, \"product_sub_category\": \"cmngyfai0000eycrnxzft9j1i\"}','cmocappot0000yl8oz9felwuh','cmkqlsl9w000j2urn9hglxen1','2026-04-27 03:59:16.071','2026-04-27 03:59:16.071',NULL,0,'cmogo4ajg0004gk8oxrkfn3sk',NULL),
('cmogo6xz00007gk8oio34ji1k','cmo84gup40007s58o77hm25oq','cmk6k26a1000cukrnkf8vku40','Deactive','{\"status\": \"Deactive\", \"end_date\": \"\", \"frequency\": \"Quarterly\", \"total_mrc\": 500000, \"start_date\": \"2026-04-01\", \"customer_id\": \"cmocavd1n0001yl8ohp4nb4w2\", \"service_name\": \"Additional Rack\", \"sales_order_id\": \"cmogo4ajg0004gk8oxrkfn3sk\", \"next_billing_date\": \"2026-04-30\"}','cmocappot0000yl8oz9felwuh','cml4ncnii0007ytrnoip1jd76','2026-04-27 04:01:19.740','2026-04-30 04:19:43.114','SUB-00002',0,NULL,'cmkqlsl9w000j2urn9hglxen1'),
('cmotwcv2g0001ef8omzeqyj23','cmockogfh00006s8od6x3z7hb','cmkfbdazb0000airn2albkfd3','Draft','{\"tax\": 202258, \"status\": \"Draft\", \"due_date\": \"2026-05-16\", \"subtotal\": 1838710, \"mrc_amount\": 1000000, \"nrc_amount\": 0, \"customer_id\": \"cmk6se3ka000045rnz5t6qe9d\", \"invoice_date\": \"2026-05-06\", \"total_amount\": 2040968, \"invoice_number\": \"INV/2026/05/0001\", \"billing_period_end\": \"2026-05-06\", \"billing_period_start\": \"2026-04-24\"}','cmk6k26ec000eukrn64t25jm4',NULL,'2026-05-06 10:10:53.118','2026-05-06 10:10:53.118','INV/2026/05/0001',0,'cmo9uvsb60002ternf8bvv7yg',NULL),
('cmotwddfz0004ef8ov9njy43l','cmockogfh00006s8od6x3z7hb','cmkfbdazb0000airn2albkfd3','Draft','{\"tax\": 202258, \"status\": \"Draft\", \"due_date\": \"2026-05-16\", \"subtotal\": 2038710, \"mrc_amount\": 1000000, \"nrc_amount\": 0, \"customer_id\": \"cmk6se3ka000045rnz5t6qe9d\", \"invoice_date\": \"2026-05-06\", \"total_amount\": 2240968, \"invoice_number\": \"INV/2026/05/0002\", \"billing_period_end\": \"2026-05-06\", \"billing_period_start\": \"2026-04-24\"}','cmk6k26ec000eukrn64t25jm4','cmlaqhaak0004ztrnhhcnjlby','2026-05-06 10:11:16.940','2026-05-08 03:43:24.223','INV/2026/05/0002',0,'cmo9uvsb60002ternf8bvv7yg',NULL),
('cmouws4jj0007ef8onoag36j8','cmockogfh00006s8od6x3z7hb','cmkfbdazb0000airn2albkfd3','Unpaid','{\"tax\": 55000, \"status\": \"Draft\", \"due_date\": \"2026-05-17\", \"subtotal\": 500000, \"__activity\": [{\"at\": \"2026-05-07T03:42:38.639Z\", \"text\": \"Status diubah: Draft → Unpaid oleh finance\"}, {\"at\": \"2026-05-07T03:42:38.639Z\", \"text\": \"DocStatus diubah: 0 → 1 oleh finance\"}], \"mrc_amount\": 0, \"nrc_amount\": 500000, \"customer_id\": \"cmk6se3ka000045rnz5t6qe9d\", \"invoice_date\": \"2026-05-07\", \"invoice_type\": \"setup\", \"total_amount\": 555000, \"invoice_number\": \"INV/2026/05/0003\", \"billing_period_end\": \"2026-05-07\", \"billing_period_start\": \"2026-05-07\"}','cmk6k26ec000eukrn64t25jm4','cmlaqhaak0004ztrnhhcnjlby','2026-05-07 03:10:31.399','2026-05-07 03:42:38.641','INV/2026/05/0003',1,'cmo9uvsb60002ternf8bvv7yg',NULL),
('cmp25ojm800054s8oic4v7q0q','cmockogfh00006s8od6x3z7hb','cmkfbdazb0000airn2albkfd3','Draft','{\"tax\": 73534, \"status\": \"Draft\", \"due_date\": \"2026-05-22\", \"subtotal\": 668493, \"mrc_amount\": 1000000, \"nrc_amount\": 0, \"customer_id\": \"cmk6se3ka000045rnz5t6qe9d\", \"invoice_date\": \"2026-05-12\", \"total_amount\": 742027, \"invoice_number\": \"INV/2026/05/0004\", \"billing_period_end\": \"2026-05-11\", \"billing_period_start\": \"2026-04-30\"}','cmk6k26ec000eukrn64t25jm4',NULL,'2026-05-12 04:54:04.078','2026-05-12 04:54:04.078','INV/2026/05/0004',0,'cmo9uvsb60002ternf8bvv7yg',NULL),
('cmp25p6x900074s8oxtiqc2cl','cmockogfh00006s8od6x3z7hb','cmkfbdazb0000airn2albkfd3','Draft','{\"tax\": 55000, \"status\": \"Draft\", \"due_date\": \"2026-05-22\", \"subtotal\": 500000, \"mrc_amount\": 0, \"nrc_amount\": 500000, \"customer_id\": \"cmk6se3ka000045rnz5t6qe9d\", \"invoice_date\": \"2026-05-12\", \"invoice_type\": \"setup\", \"total_amount\": 555000, \"invoice_number\": \"INV/2026/05/0005\", \"billing_period_end\": \"2026-05-12\", \"billing_period_start\": \"2026-05-12\"}','cmk6k26ec000eukrn64t25jm4',NULL,'2026-05-12 04:54:34.311','2026-05-12 04:54:34.311','INV/2026/05/0005',0,'cmo9uvsb60002ternf8bvv7yg',NULL),
('cmp3hzrcl0003phrnjviifa03','cmockogfh00006s8od6x3z7hb','cmkfbdazb0000airn2albkfd3','Draft','{\"tax\": 73534, \"status\": \"Draft\", \"due_date\": \"2026-05-23\", \"subtotal\": 668493, \"mrc_amount\": 1000000, \"nrc_amount\": 0, \"customer_id\": \"cmk6se3ka000045rnz5t6qe9d\", \"invoice_date\": \"2026-05-13\", \"total_amount\": 742027, \"invoice_number\": \"INV/2026/05/0006\", \"billing_period_end\": \"2026-05-12\", \"billing_period_start\": \"2026-04-30\"}','cmk6k26ec000eukrn64t25jm4',NULL,'2026-05-13 03:26:28.916','2026-05-13 03:26:28.916','INV/2026/05/0006',0,'cmo9uvsb60002ternf8bvv7yg',NULL),
('cmp3i00ww0005phrnkeqrci80','cmockogfh00006s8od6x3z7hb','cmk6k26a1000cukrnkf8vku40','Draft','{\"tax\": 287419, \"status\": \"Draft\", \"due_date\": \"2026-05-23\", \"subtotal\": 2612903, \"mrc_amount\": 1000000, \"nrc_amount\": 0, \"customer_id\": \"cmk6se3ka000045rnz5t6qe9d\", \"invoice_date\": \"2026-05-13\", \"total_amount\": 2900322, \"invoice_number\": \"INV/2026/05/0007\", \"billing_period_end\": \"2026-05-13\", \"billing_period_start\": \"2026-03-30\"}','cmk6k26ec000eukrn64t25jm4',NULL,'2026-05-13 03:26:41.311','2026-05-13 03:26:41.311','INV/2026/05/0007',0,'cmo9ihox600011p8o0rka0r2z',NULL),
('cmpgdu9l90000u1jl4db1npkf','cmockogfh00006s8od6x3z7hb','cmk6k26a1000cukrnkf8vku40','Draft','{\"tax\": 255484, \"status\": \"Draft\", \"due_date\": \"2026-06-01\", \"subtotal\": 2322581, \"mrc_amount\": 1000000, \"nrc_amount\": 0, \"customer_id\": \"cmk6se3ka000045rnz5t6qe9d\", \"invoice_date\": \"2026-05-22\", \"total_amount\": 2578065, \"invoice_number\": \"INV/2026/05/0008\", \"billing_period_end\": \"2026-05-22\", \"billing_period_start\": \"2026-03-30\"}','cmk6k26ec000eukrn64t25jm4',NULL,'2026-05-22 03:51:14.444','2026-05-22 03:51:14.444','INV/2026/05/0008',0,'cmo9ihox600011p8o0rka0r2z',NULL);
/*!40000 ALTER TABLE `DocRecord` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `DocRow`
--

DROP TABLE IF EXISTS `DocRow`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `DocRow` (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `recordId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `childDocTypeId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `idx` int NOT NULL DEFAULT '0',
  `data` json NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `DocRow_recordId_idx` (`recordId`),
  KEY `DocRow_childDocTypeId_fkey` (`childDocTypeId`),
  CONSTRAINT `DocRow_childDocTypeId_fkey` FOREIGN KEY (`childDocTypeId`) REFERENCES `DocType` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `DocRow_recordId_fkey` FOREIGN KEY (`recordId`) REFERENCES `DocRecord` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DocRow`
--

LOCK TABLES `DocRow` WRITE;
/*!40000 ALTER TABLE `DocRow` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `DocRow` VALUES
('cmmljgh5z00032jrnfi4dgmka','cmmljgh5f00022jrn5y497c3v','cmmli5oc70000k9rnyn8aw3a8',0,'{\"nik\": \"90349340539535\", \"email\": \"raka@gmail.com\", \"notes\": \"mau visit\", \"phone_number\": \"08934839458435345\", \"visitor_name\": \"Raka Bumi rana\"}','2026-03-11 04:28:12.647','2026-03-11 04:28:12.647'),
('cmmljgh6900042jrnuhryjbln','cmmljgh5f00022jrn5y497c3v','cmmli5oc70000k9rnyn8aw3a8',1,'{\"nik\": \"03493459385\", \"email\": \"ratina@gmail.com\", \"notes\": \"tidak ada\", \"phone_number\": \"03495345345\", \"visitor_name\": \"Ratina dwi sasongko\"}','2026-03-11 04:28:12.657','2026-03-11 04:28:12.657'),
('cmmlk980j00082jrnlx713vuj','cmmlk97zx00072jrn9l2zrv49','cmmli5oc70000k9rnyn8aw3a8',0,'{\"nik\": \"0893483535\", \"email\": \"rani@gmail.com\", \"notes\": \"adsdad\", \"ktp_file\": \"/uploads/doc-attachments/visitor_request_item/cmmlk97zx00072jrn9l2zrv49/row-0-ktp_file-1773204633806.JPG\", \"phone_number\": \"834935835\", \"visitor_name\": \"rani\"}','2026-03-11 04:50:33.810','2026-03-11 04:50:33.810'),
('cmmlk980r00092jrnn0wu8fpl','cmmlk97zx00072jrn9l2zrv49','cmmli5oc70000k9rnyn8aw3a8',1,'{\"nik\": \"03493459385\", \"email\": \"ratina@gmail.com\", \"notes\": \"asdadasd\", \"ktp_file\": \"/uploads/doc-attachments/visitor_request_item/cmmlk97zx00072jrn9l2zrv49/row-1-ktp_file-1773204633813.JPG\", \"phone_number\": \"03495345345\", \"visitor_name\": \"Ratina dwi sasongko\"}','2026-03-11 04:50:33.818','2026-03-11 04:50:33.818'),
('cmmmwvt9r0005pwrnma42fn5e','cmmmwuyb00003pwrn7rfw5aeg','cmmlqe9kq0005narny4j2r07n',0,'{\"message\": \"baik akan kami proses terlebih dahulu\", \"attachment\": \"blob\", \"sender_name\": \"Admin (Admin)\", \"__childRecordId\": \"cmmmwvt970004pwrn15xjd9as\"}','2026-03-12 03:31:49.359','2026-03-12 03:31:49.359'),
('cmmmxd42j0006pwrnwwpfgtmh','cmmmwuyb00003pwrn7rfw5aeg','cmmlqe9kq0005narny4j2r07n',1,'{\"message\": \"baik, terimakasih\", \"attachment\": null, \"sender_name\": \"Customer\"}','2026-03-12 03:45:16.504','2026-03-12 03:45:16.504'),
('cmmn5asng00032ernb6wi6amf','cmmn5asmg00012ernj64azt6f','cmkw4cq8m000cbtrno82k33h7',0,'{\"mrc\": 0, \"nrc\": 100000, \"qty\": 1, \"price\": 0, \"product_id\": \"cmla86beq0009d7rnsosmsuk3\", \"subtotal_mrc\": 0, \"subtotal_nrc\": 100000, \"__childRecordId\": \"cmmn5asn300022ernx97rjb74\", \"term_of_payment\": \"One Time\", \"product_category\": \"cmkkyiztb0008vfrn4wpmx0ow\", \"term_of_contract\": 0, \"product_sub_category\": \"cmkkyos820009vfrnfm8s8avr\"}','2026-03-12 07:27:25.323','2026-03-12 07:27:25.323'),
('cmmn5asnx00052ernpm0liwtv','cmmn5asmg00012ernj64azt6f','cmkw4cq8m000cbtrno82k33h7',1,'{\"mrc\": 0, \"nrc\": 1500000, \"qty\": 1, \"price\": 0, \"product_id\": \"cmla8cyen000gd7rnnuatcpsf\", \"subtotal_mrc\": 0, \"subtotal_nrc\": 1500000, \"__childRecordId\": \"cmmn5asnr00042ern2xi350rn\", \"term_of_payment\": \"One Time\", \"product_category\": \"cmkkyiztb0008vfrn4wpmx0ow\", \"term_of_contract\": 0, \"product_sub_category\": \"cmkkyos820009vfrnfm8s8avr\"}','2026-03-12 07:27:25.339','2026-03-12 07:27:25.339'),
('cmmn5lhhb00082ern4o56rcny','cmmn5lhgs00062ernxkubl4gc','cmkw4cq8m000cbtrno82k33h7',0,'{\"mrc\": 0, \"nrc\": 100000, \"qty\": 1, \"price\": 0, \"product_id\": \"cmla86beq0009d7rnsosmsuk3\", \"subtotal_mrc\": 0, \"subtotal_nrc\": 100000, \"__childRecordId\": \"cmmn5lhh700072erncetely17\", \"term_of_payment\": \"One Time\", \"product_category\": \"cmkkyiztb0008vfrn4wpmx0ow\", \"term_of_contract\": 0, \"product_sub_category\": \"cmkkyos820009vfrnfm8s8avr\"}','2026-03-12 07:35:44.063','2026-03-12 07:35:44.063'),
('cmmn5lhho000a2ernrz6si48b','cmmn5lhgs00062ernxkubl4gc','cmkw4cq8m000cbtrno82k33h7',1,'{\"mrc\": 0, \"nrc\": 1500000, \"qty\": 1, \"price\": 0, \"product_id\": \"cmla8cyen000gd7rnnuatcpsf\", \"subtotal_mrc\": 0, \"subtotal_nrc\": 1500000, \"__childRecordId\": \"cmmn5lhhl00092ernh1vbmd0o\", \"term_of_payment\": \"One Time\", \"product_category\": \"cmkkyiztb0008vfrn4wpmx0ow\", \"term_of_contract\": 0, \"product_sub_category\": \"cmkkyos820009vfrnfm8s8avr\"}','2026-03-12 07:35:44.076','2026-03-12 07:35:44.076'),
('cmmn5mc6v000d2ern71fbxz6o','cmmn5mc24000b2ernkexrzuna','cmkza5r6k0007csrnuqan4bpl',0,'{\"qty\": 1, \"price\": 0, \"product_id\": \"cmkkyfjsv0002vfrnhx4xbraa\", \"spec_rack_id\": \"823923\", \"spec_server_id\": \"2382349\", \"__childRecordId\": \"cmmn5mc5r000c2ernm6lqgj50\", \"spec_description\": \"tidak ada\", \"spec_server_room_id\": \"483495\", \"product_sub_category\": \"cmkkwfq8400015grnyatwxk86\"}','2026-03-12 07:36:23.855','2026-03-12 07:36:23.855'),
('cmmn5nc5z000g2ernj8m4cefh','cmmn5nc5q000f2ernpuasosdq','cmknoljcd0007bjrn7heczhpp',0,'{\"qty\": 1, \"price\": 0, \"product_id\": \"cmkkyfjsv0002vfrnhx4xbraa\", \"spec_rack_id\": \"823923\", \"spec_server_id\": \"2382349\", \"__childRecordId\": \"cmmn5mc5r000c2ernm6lqgj50\", \"spec_description\": \"tidak ada\", \"spec_server_room_id\": \"483495\", \"product_sub_category\": \"cmkkwfq8400015grnyatwxk86\"}','2026-03-12 07:37:10.487','2026-03-12 07:37:10.487'),
('cmmodxq6d000k2ernxxtqrwcs','cmmodxq5p000j2erngt6d1lxv','cmmli5oc70000k9rnyn8aw3a8',0,'{\"nik\": \"0484504586456\", \"email\": \"raka@gmail.com\", \"notes\": \"adadad\", \"ktp_file\": \"/uploads/doc-attachments/visitor_request_item/cmmodxq5p000j2erngt6d1lxv/row-0-ktp_file-1773375418303.png\", \"phone_number\": \"083493458345\", \"visitor_name\": \"Raka Bumi rana\"}','2026-03-13 04:16:58.309','2026-03-13 04:16:58.309'),
('cmmvh16d200019mrnyd0xw1ne','cmmu40xt60005x1rnxau4bjrq','cmmvg77os0001mlrn5ybkyq4t',1,'{\"__childRecordId\": \"cmmvh16cc00009mrnjth98tv0\", \"patch_panel_number\": \"PA-NM-089348\"}','2026-03-18 03:18:01.334','2026-03-18 03:18:01.334'),
('cmn8851nr00039mrn411uxspn','cmn8851mq00029mrnhrm6114u','cmmvg77os0001mlrn5ybkyq4t',0,'{\"patch_panel_number\": \"PA-NM-839834\"}','2026-03-27 01:30:05.605','2026-03-27 01:30:05.605'),
('cmn885a5b00059mrn55qcb3r9','cmn8851mq00029mrnhrm6114u','cmmvg77os0001mlrn5ybkyq4t',1,'{\"__childRecordId\": \"cmn885a5100049mrnfe1mywiy\", \"patch_panel_number\": \"PA-NM-77834733\"}','2026-03-27 01:30:16.607','2026-03-27 01:30:16.607'),
('cmn8kpsc00006jzrnnpdvyyz8','cmn8kpsbl0005jzrnfd4m3o6r','cmkw4cq8m000cbtrno82k33h7',0,'{\"qty\": 1, \"price\": 0, \"product_id\": \"Dedicated Server\", \"description\": \"Cross Connect Service: UTP (New)\"}','2026-03-27 07:22:08.688','2026-03-27 07:22:08.688'),
('cmn8qi6j90009jzrnneuyayxr','cmn8qi6is0008jzrnkx481qd7','cmkw4cq8m000cbtrno82k33h7',0,'{\"mrc\": 1000, \"nrc\": 5000, \"qty\": 1, \"price\": 6000, \"product_id\": \"prod_cross_connect\", \"description\": \"Cross Connect Service: UTP (New)\", \"subtotal_mrc\": 1000, \"subtotal_nrc\": 5000, \"discount_percent\": null, \"product_category\": \"\", \"spec_destination\": \"\", \"spec_request_type\": \"\", \"spec_source_rack_id\": \"\", \"product_sub_category\": \"\", \"spec_source_material\": \"\", \"spec_cross_connect_type\": \"\", \"spec_destination_rack_id\": \"\", \"spec_source_connector_type\": \"\", \"spec_destination_connector_type\": \"\"}','2026-03-27 10:04:11.540','2026-04-23 02:04:20.805'),
('cmncokwzz0002jfrnn6g97dot','cmncokwz20000jfrne1yrdhx9','cmkw4cq8m000cbtrno82k33h7',0,'{\"mrc\": 1000000, \"nrc\": 500000, \"qty\": 1, \"price\": 1000000, \"product_id\": \"prod_cross_connect\", \"subtotal_mrc\": 1000000, \"subtotal_nrc\": 500000, \"__childRecordId\": \"cmncokwzp0001jfrn2g1hlxdg\", \"term_of_payment\": \"One Time\", \"term_of_contract\": 0, \"product_sub_category\": \"connectivity_services\"}','2026-03-30 04:21:24.623','2026-03-30 04:21:24.623'),
('cmnfg74210005jfrnclvrj1d0','cmnfg73ym0003jfrn9aakdl00','cmkw4cq8m000cbtrno82k33h7',0,'{\"mrc\": 1000000, \"nrc\": 500000, \"qty\": 1, \"price\": 1000000, \"product_id\": \"prod_cross_connect\", \"subtotal_mrc\": 1000000, \"subtotal_nrc\": 500000, \"__childRecordId\": \"cmnfg740y0004jfrn6hdnrwsu\", \"term_of_payment\": \"One Time\", \"spec_destination\": \"Open IXP\", \"term_of_contract\": 0, \"spec_request_type\": \"New\", \"spec_source_rack_id\": \"cmnebgsqa00001grnunro35g1\", \"product_sub_category\": \"connectivity_services\", \"spec_source_material\": \"Dedicated Server\", \"spec_cross_connect_type\": \"UTP\", \"spec_destination_rack_id\": \"SC-1245\", \"spec_source_connector_type\": \"LC-SC\", \"spec_destination_connector_type\": \"SC-SC\"}','2026-04-01 02:50:02.183','2026-04-01 02:50:02.183'),
('cmnfgb8b70008jfrnt58yx7eh','cmnfgb8a90006jfrnyetfc9ak','cmkza5r6k0007csrnuqan4bpl',0,'{\"qty\": 1, \"price\": 1000000, \"product_id\": \"prod_cross_connect\", \"__childRecordId\": \"cmnfgb8ay0007jfrn356pdj9g\", \"spec_destination\": \"APJII\", \"spec_request_type\": \"New\", \"spec_source_rack_id\": \"cmnebgsqa00001grnunro35g1\", \"product_sub_category\": \"connectivity_services\", \"spec_source_material\": \"Dedicated Server\", \"spec_cross_connect_type\": \"Fiber Optic\", \"spec_destination_rack_id\": \"R-8857\", \"spec_source_connector_type\": \"SC-SC\", \"spec_destination_connector_type\": \"SC-SC\"}','2026-04-01 02:53:14.322','2026-04-01 02:53:14.322'),
('cmnfgflur000bjfrnwtbjd314','cmnfgfltz0009jfrnro4nml7h','cmkza5r6k0007csrnuqan4bpl',0,'{\"qty\": 1, \"price\": 1000000, \"product_id\": \"prod_cross_connect\", \"__childRecordId\": \"cmnfgfluk000ajfrnv72rdwa2\", \"spec_destination\": \"APJII\", \"spec_request_type\": \"New\", \"spec_source_rack_id\": \"cmnebgsqa00001grnunro35g1\", \"product_sub_category\": \"connectivity_services\", \"spec_source_material\": \"Dedicated Server\", \"spec_cross_connect_type\": \"UTP\", \"spec_destination_rack_id\": \"R-8948\", \"spec_source_connector_type\": \"SC-SC\", \"spec_destination_connector_type\": \"SC-SC\"}','2026-04-01 02:56:38.499','2026-04-01 02:56:38.499'),
('cmnfgi57v000djfrnwtgmw65m','cmnfgi57i000cjfrnemji25iu','cmkw4cq8m000cbtrno82k33h7',0,'{\"mrc\": 10000, \"nrc\": 5000, \"qty\": 1, \"product_id\": \"prod_cross_connect\", \"description\": \"\", \"subtotal_mrc\": 10000, \"subtotal_nrc\": 5000, \"product_category\": \"\", \"spec_destination\": \"APJII\", \"spec_request_type\": \"New\", \"spec_source_rack_id\": \"cmnebgsqa00001grnunro35g1\", \"product_sub_category\": \"connectivity_services\", \"spec_source_material\": \"Dedicated Server\", \"spec_cross_connect_type\": \"UTP\", \"spec_destination_rack_id\": \"R-8948\", \"spec_source_connector_type\": \"SC-SC\", \"spec_destination_connector_type\": \"SC-SC\"}','2026-04-01 02:58:36.907','2026-04-01 07:11:42.707'),
('cmnfpnq2r0004ycrn3ficci2c','cmnfpnq2h0003ycrntb7mrf5w','cmkw4cq8m000cbtrno82k33h7',0,'{\"mrc\": 10000, \"nrc\": 5000, \"qty\": 1, \"product_id\": \"cmla8cyen000gd7rnnuatcpsf\", \"description\": \"\", \"subtotal_mrc\": 10000, \"subtotal_nrc\": 5000, \"product_category\": \"cmkkwfq8400015grnyatwxk86\", \"product_sub_category\": \"cmkkwfq8400015grnyatwxk86\"}','2026-04-01 07:14:53.763','2026-04-01 07:15:30.544'),
('cmnfpnq2w0006ycrn9vsqpf81','cmnfpnq2h0003ycrntb7mrf5w','cmkw4cq8m000cbtrno82k33h7',1,'{\"mrc\": 20000, \"nrc\": 10000, \"qty\": 1, \"product_id\": \"cmkmewdod00f4vfrnxsh6m0ol\", \"description\": \"\", \"subtotal_mrc\": 20000, \"subtotal_nrc\": 10000, \"product_category\": \"cmkkyiztb0008vfrn4wpmx0ow\", \"spec_description\": \"asdad\", \"spec_select_rack\": \"cmnebgsqa00001grnunro35g1\", \"product_sub_category\": \"cmkkyos820009vfrnfm8s8avr\", \"spec_power_requirement\": \"240Vac\"}','2026-04-01 07:14:53.768','2026-04-01 07:15:58.235'),
('cmocaxzfr0004yl8o38j7ytcz','cmocaxzdd0002yl8og8ot4b2a','cmkw4cq8m000cbtrno82k33h7',0,'{\"mrc\": 0, \"nrc\": 100000, \"qty\": 1, \"product_id\": \"cmla86beq0009d7rnsosmsuk3\", \"subtotal_mrc\": 0, \"subtotal_nrc\": 100000, \"__childRecordId\": \"cmocaxzff0003yl8oj5blxpq6\", \"term_of_payment\": \"One Time\", \"product_category\": \"cmkkyiztb0008vfrn4wpmx0ow\", \"term_of_contract\": 0, \"product_sub_category\": \"cmkkyos820009vfrnfm8s8avr\"}','2026-04-24 02:39:22.022','2026-04-24 02:39:22.022'),
('cmocaxzgv0006yl8osre1bpqu','cmocaxzdd0002yl8og8ot4b2a','cmkw4cq8m000cbtrno82k33h7',1,'{\"mrc\": 0, \"nrc\": 1500000, \"qty\": 1, \"product_id\": \"cmla8cyen000gd7rnnuatcpsf\", \"subtotal_mrc\": 0, \"subtotal_nrc\": 1500000, \"__childRecordId\": \"cmocaxzgo0005yl8omct8sqdu\", \"term_of_payment\": \"One Time\", \"product_category\": \"cmkkyiztb0008vfrn4wpmx0ow\", \"term_of_contract\": 0, \"product_sub_category\": \"cmkkyos820009vfrnfm8s8avr\"}','2026-04-24 02:39:22.062','2026-04-24 02:39:22.062'),
('cmogo2w3g0003gk8o3qf1wvqj','cmogo2w2w0001gk8o9qmd7up5','cmkza5r6k0007csrnuqan4bpl',0,'{\"qty\": 1, \"product_id\": \"cmngyg1jc000fycrnhu6cblmt\", \"spec_power\": \"220Vac\", \"spec_rack_size\": \"4x40\", \"__childRecordId\": \"cmogo2w380002gk8o65exbo1g\", \"product_category\": \"cmkkyiztb0008vfrn4wpmx0ow\", \"spec_amount_rack\": 1, \"product_sub_category\": \"cmngyfai0000eycrnxzft9j1i\"}','2026-04-27 03:58:10.684','2026-04-27 03:58:10.684'),
('cmogo4ajp0005gk8om6usho1h','cmogo4ajg0004gk8oxrkfn3sk','cmkw4cq8m000cbtrno82k33h7',0,'{\"mrc\": 500000, \"nrc\": 200000, \"qty\": 1, \"product_id\": \"cmngyg1jc000fycrnhu6cblmt\", \"spec_power\": \"220Vac\", \"description\": \"\", \"subtotal_mrc\": 500000, \"subtotal_nrc\": 200000, \"spec_rack_size\": \"4x40\", \"product_category\": \"cmkkyiztb0008vfrn4wpmx0ow\", \"spec_amount_rack\": \"1\", \"product_sub_category\": \"cmngyfai0000eycrnxzft9j1i\"}','2026-04-27 03:59:16.069','2026-04-27 04:00:15.607'),
('cmotukcgu0000ef8on3wgkkcv','cmoclomh50000gk8ocibzkqmg',NULL,0,'{\"qty\": 1, \"price\": 500000, \"subtotal\": 450000, \"description\": \"Services pertama\", \"discount_percent\": 10}','2026-05-06 09:20:43.029','2026-05-06 09:58:26.746'),
('cmotwcv660002ef8o3oypy12g','cmotwcv2g0001ef8omzeqyj23',NULL,0,'{\"qty\": 1, \"price\": 1000000, \"subtotal\": 1000000, \"description\": \"Cross Connect - Full month(s): 1 month(s)\", \"discount_percent\": 0}','2026-05-06 10:10:53.258','2026-05-06 10:10:53.258'),
('cmotwcv660003ef8osc5iy8us','cmotwcv2g0001ef8omzeqyj23',NULL,1,'{\"qty\": 26, \"price\": 32258.06, \"subtotal\": 838710, \"description\": \"Cross Connect - Prorate (6 - 31 May) (26 hari @ Rp 32.258/hari)\", \"discount_percent\": 0}','2026-05-06 10:10:53.258','2026-05-06 10:10:53.258'),
('cmotwddgs0005ef8o1c4jcrsv','cmotwddfz0004ef8ov9njy43l',NULL,0,'{\"qty\": 1, \"price\": 1200000, \"subtotal\": 1200000, \"description\": \"Cross Connect - Full month(s): 1 month(s)\", \"discount_percent\": 0}','2026-05-06 10:11:16.971','2026-05-08 03:43:06.404'),
('cmotwddgs0006ef8o0y32i71l','cmotwddfz0004ef8ov9njy43l',NULL,1,'{\"qty\": 26, \"price\": 32258.06, \"subtotal\": 838710, \"description\": \"Cross Connect - Prorate (6 - 31 May) (26 hari @ Rp 32.258/hari)\", \"discount_percent\": 0}','2026-05-06 10:11:16.971','2026-05-06 10:11:16.971'),
('cmouws4of0008ef8o7cupju0c','cmouws4jj0007ef8onoag36j8',NULL,0,'{\"qty\": 1, \"price\": 500000, \"subtotal\": 500000, \"description\": \"Cross Connect - Setup Fee\", \"discount_percent\": 0}','2026-05-07 03:10:31.585','2026-05-07 03:10:31.585'),
('cmp25ojor00064s8orszliczp','cmp25ojm800054s8oic4v7q0q',NULL,0,'{\"qty\": 61, \"price\": 10958.9, \"subtotal\": 668493, \"description\": \"Cross Connect - Prorate: 30/04/2026 - 30/06/2026 (61 hari @ Rp 10.959/hari)\", \"discount_percent\": 0}','2026-05-12 04:54:04.200','2026-05-12 04:54:04.200'),
('cmp25p6yn00084s8ohlxl4bxp','cmp25p6x900074s8oxtiqc2cl',NULL,0,'{\"qty\": 1, \"price\": 500000, \"subtotal\": 500000, \"description\": \"Cross Connect - Setup Fee\", \"discount_percent\": 0}','2026-05-12 04:54:34.361','2026-05-12 04:54:34.361'),
('cmp3hzrd30004phrntnxm1uyb','cmp3hzrcl0003phrnjviifa03',NULL,0,'{\"qty\": 61, \"price\": 10958.9, \"subtotal\": 668493, \"description\": \"Cross Connect - Prorate: 30/04/2026 - 30/06/2026 (61 hari @ Rp 10.959/hari)\", \"discount_percent\": 0}','2026-05-13 03:26:28.934','2026-05-13 03:26:28.934'),
('cmp3i00x70006phrn4f8l9fl6','cmp3i00ww0005phrnkeqrci80',NULL,0,'{\"qty\": 1, \"price\": 2000000, \"subtotal\": 2000000, \"description\": \"Service - Full month(s): 2 month(s)\", \"discount_percent\": 0}','2026-05-13 03:26:41.320','2026-05-13 03:26:41.320'),
('cmp3i00x70007phrnlxsa9679','cmp3i00ww0005phrnkeqrci80',NULL,1,'{\"qty\": 19, \"price\": 32258.06, \"subtotal\": 612903, \"description\": \"Service - Prorate (13 - 31 May) (19 hari @ Rp 32.258/hari)\", \"discount_percent\": 0}','2026-05-13 03:26:41.320','2026-05-13 03:26:41.320'),
('cmpgdu9ln0001u1jl905d3275','cmpgdu9l90000u1jl4db1npkf',NULL,0,'{\"qty\": 1, \"price\": 2000000, \"subtotal\": 2000000, \"description\": \"Service - Full month(s): 2 month(s)\", \"discount_percent\": 0}','2026-05-22 03:51:14.458','2026-05-22 03:51:14.458'),
('cmpgdu9ln0002u1jl5mdrbzn0','cmpgdu9l90000u1jl4db1npkf',NULL,1,'{\"qty\": 10, \"price\": 32258.06, \"subtotal\": 322581, \"description\": \"Service - Prorate (22 - 31 May) (10 hari @ Rp 32.258/hari)\", \"discount_percent\": 0}','2026-05-22 03:51:14.458','2026-05-22 03:51:14.458');
/*!40000 ALTER TABLE `DocRow` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `DocType`
--

DROP TABLE IF EXISTS `DocType`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `DocType` (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `key` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `branchId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `config` json DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `icon` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hasPreview` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `DocType_key_key` (`key`),
  KEY `DocType_branchId_idx` (`branchId`),
  CONSTRAINT `DocType_branchId_fkey` FOREIGN KEY (`branchId`) REFERENCES `Branch` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DocType`
--

LOCK TABLES `DocType` WRITE;
/*!40000 ALTER TABLE `DocType` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `DocType` VALUES
('cmkmdaan300f0vfrnluov51ak','master_rack','Master Rack','Data master rack yang terdaftar di data center',NULL,'{\"naming\": {\"mode\": \"field\", \"field\": \"rack_name\"}, \"listFields\": [\"rack_name\", \"room_id\", \"company_id\", \"status\"], \"filterFields\": [\"branch_id\", \"building_id\", \"floor_id\", \"room_id\", \"status\", \"company_id\"], \"childDocTypes\": {\"hardware\": \"rack_hardware\", \"patch_panels\": \"rack_patch_panel\"}}','2026-01-20 09:03:48.056','2026-03-18 03:16:31.922','LayoutGrid',0),
('cmknoljb70000bjrnetv689gg','quotation','Quotation','Dokumen penawaran',NULL,'{\"naming\": {\"mode\": \"series\", \"field\": \"naming_series\", \"defaultPattern\": \"QUOT-#####\"}, \"compute\": {\"totalFromRows\": [{\"formula\": \"qty * nrc\", \"targetField\": \"subtotal_nrc\", \"childDocTypeKey\": \"quotation_item\"}, {\"formula\": \"qty * mrc\", \"targetField\": \"subtotal_mrc\", \"childDocTypeKey\": \"quotation_item\"}, {\"mrcKey\": \"mrc\", \"nrcKey\": \"nrc\", \"qtyKey\": \"qty\", \"targetField\": \"total_contract\", \"childDocTypeKey\": \"quotation_item\"}]}, \"listFields\": [\"quote_no\", \"quote_date\", \"customer_id\", \"term_of_contract\", \"term_of_payment\", \"total_contract\"], \"noticeGuide\": null, \"filterFields\": [\"quote_no\", \"quote_date\", \"customer_id\", \"term_of_contract\", \"term_of_payment\", \"total_contract\"], \"notifyConfig\": {\"adminEnabled\": true, \"toastEnabled\": true, \"customerEnabled\": true}, \"childDocTypes\": {\"items\": \"quotation_item\"}, \"childDocTypeKey\": \"quotation_item\", \"previewTemplate\": \"<div>\\r\\n  <div style=\\\"display:flex;align-items:center;gap:12px;margin-bottom:12px;\\\">\\r\\n    <img src=\\\"{{fromCompanyLogo}}\\\" style=\\\"height:40px;object-fit:contain;border-radius:4px;\\\" />\\r\\n    <div style=\\\"padding:10px;margin-left:10px;width:400px;font-size:12px;color:#6b7280;\\\">{{fromCompanyAddress}}</div>\\r\\n  </div>\\r\\n  \\r\\n  <div style=\\\"font-size:20px;font-weight:600;margin-bottom:4px;width:100%;padding:5px;color:#333;background: #efefef\\\">\\r\\n        {{docTypeName}}\\r\\n  </div>\\r\\n\\r\\n  <table style=\\\"width:100%;border-collapse:collapse;\\\">\\r\\n    <tr>\\r\\n      <td style=\\\"font-size:12px;padding:4px 6px;width:10%;color:#374151;\\\">Date</td>\\r\\n      <td style=\\\"font-size:12px;padding:4px 6px;width:40%;\\\">{{created_date_label}}</td>\\r\\n      <td style=\\\"font-size:12px;padding:4px 6px;width:10%;color:#374151;\\\">Sales Manager</td>\\r\\n      <td style=\\\"font-size:12px;padding:4px 6px;width:40%;\\\">{{creator_name_label}}</td>\\r\\n    </tr>\\r\\n    <tr>\\r\\n      <td style=\\\"font-size:12px;padding:4px 6px;width:10%;color:#374151;\\\">Quotation ID</td>\\r\\n      <td style=\\\"font-size:12px;padding:4px 6px;width:40%;\\\">{{series_name_label}}</td>\\r\\n      <td style=\\\"font-size:12px;padding:4px 6px;width:10%;color:#374151;\\\">Email Address</td>\\r\\n      <td style=\\\"font-size:12px;padding:4px 6px;width:40%;\\\">{{creator_email_label}}</td>\\r\\n    </tr>\\r\\n  </table>\\r\\n\\r\\n  <div style=\\\"font-size:12px;font-weight:600;margin-bottom:4px;width:100%;padding:5px;color:#fff;background: #da3036\\\">\\r\\n        CUSTOMER\\r\\n  </div>\\r\\n  \\r\\n  <table style=\\\"width:100%;border-collapse:collapse;\\\">\\r\\n    <tr>\\r\\n      <td style=\\\"font-size:12px;padding:4px 6px;width:30%;color:#374151;width:13%\\\">Customer Name</td>\\r\\n      <td style=\\\"width:2%\\\">:</td>\\r\\n      <td style=\\\"font-size:12px;padding:4px 6px;\\\">{{company_name_label}}</td>\\r\\n    </tr>\\r\\n    <tr>\\r\\n      <td style=\\\"font-size:12px;padding:4px 6px;width:30%;color:#374151;width:13%\\\">Email Address</td>\\r\\n      <td style=\\\"width:2%\\\">:</td>\\r\\n      <td style=\\\"font-size:12px;padding:4px 6px;\\\">{{company_email_label}}</td>\\r\\n    </tr>\\r\\n    <tr>\\r\\n      <td style=\\\"font-size:12px;padding:4px 6px;width:30%;color:#374151;width:13%\\\">Phone No.</td>\\r\\n      <td style=\\\"width:2%\\\">:</td>\\r\\n      <td style=\\\"font-size:12px;padding:4px 6px;\\\">{{company_phonenumber_label}}</td>\\r\\n    </tr>\\r\\n    <tr>\\r\\n      <td style=\\\"font-size:12px;padding:4px 6px;width:30%;color:#374151;width:13%\\\">Address</td>\\r\\n      <td style=\\\"width:2%\\\">:</td>\\r\\n      <td style=\\\"font-size:12px;padding:4px 6px;\\\">{{company_address_label}}</td>\\r\\n    </tr>\\r\\n  </table>\\r\\n\\r\\n  <div style=\\\"font-size:12px;font-weight:600;margin-bottom:4px;width:100%;padding:5px;color:#fff;background: #da3036\\\">\\r\\n        TERMS & PRICING\\r\\n  </div>\\r\\n\\r\\n  <div>\\r\\n    <table style=\\\"width:100%;border-collapse:collapse;\\\">\\r\\n      <tr>\\r\\n        <td style=\\\"font-size:12px;padding:4px 6px;width:30%;color:#374151;width:13%\\\">\\r\\n          Date\\r\\n        </td>\\r\\n        <td style=\\\"width:2%\\\">:</td>\\r\\n        <td style=\\\"font-size:12px;padding:4px 6px;\\\">\\r\\n          {{quote_date_label}}\\r\\n        </td>\\r\\n      </tr>\\r\\n      <tr>\\r\\n        <td style=\\\"font-size:12px;padding:4px 6px;width:30%;color:#374151;width:13%\\\">\\r\\n          Valid Until\\r\\n        </td>\\r\\n        <td style=\\\"width:2%\\\">:</td>\\r\\n        <td style=\\\"font-size:12px;padding:4px 6px;\\\">\\r\\n          {{valid_until_label}}\\r\\n        </td>\\r\\n      </tr>\\r\\n      <tr>\\r\\n        <td style=\\\"font-size:12px;padding:4px 6px;width:30%;color:#374151;width:13%\\\">\\r\\n          Term Of Contract ( Month )\\r\\n        </td>\\r\\n        <td style=\\\"width:2%\\\">:</td>\\r\\n        <td style=\\\"font-size:12px;padding:4px 6px;\\\">\\r\\n          {{term_of_contract_label}}\\r\\n        </td>\\r\\n      </tr>\\r\\n      <tr>\\r\\n        <td style=\\\"font-size:12px;padding:4px 6px;width:30%;color:#374151;width:13%\\\">\\r\\n          Term Of Payment\\r\\n        </td>\\r\\n        <td style=\\\"width:2%\\\">:</td>\\r\\n        <td style=\\\"font-size:12px;padding:4px 6px;\\\">\\r\\n          {{term_of_payment_label}}\\r\\n        </td>\\r\\n      </tr>\\r\\n      <tr>\\r\\n        <td style=\\\"font-size:12px;padding:4px 6px;width:30%;color:#374151;width:13%\\\">\\r\\n          Total Contract\\r\\n        </td>\\r\\n        <td style=\\\"width:2%\\\">:</td>\\r\\n        <td style=\\\"font-size:12px;padding:4px 6px;\\\">\\r\\n          {{total_contract_currency}}\\r\\n        </td>\\r\\n      </tr>\\r\\n      <tr>\\r\\n        <td style=\\\"font-size:12px;padding:4px 6px;width:30%;color:#374151;width:13%\\\">\\r\\n          Catatan\\r\\n        </td>\\r\\n        <td style=\\\"width:2%\\\">:</td>\\r\\n        <td style=\\\"font-size:12px;padding:4px 6px;\\\">\\r\\n          {{notes_label}}\\r\\n        </td>\\r\\n      </tr>\\r\\n    </table>\\r\\n  </div>\\r\\n</div>\\r\\n\\r\\n<div style=\\\"font-size:12px;font-weight:600;margin-bottom:4px;width:100%;padding:5px;color:#fff;background: #da3036\\\">\\r\\n        ITEMS\\r\\n</div>\\r\\n\\r\\n<div>\\r\\n  <table style=\\\"width:100%;border-collapse:collapse;\\\">\\r\\n    <thead>\\r\\n      <tr>\\r\\n        <th style=\\\"text-align:left;font-size:12px;padding:6px;border-bottom:1px solid #e5e7eb;\\\">\\r\\n          Produk\\r\\n        </th>\\r\\n        <th style=\\\"text-align:left;font-size:12px;padding:6px;border-bottom:1px solid #e5e7eb;\\\">\\r\\n          Qty\\r\\n        </th>\\r\\n        <th style=\\\"text-align:left;font-size:12px;padding:6px;border-bottom:1px solid #e5e7eb;\\\">\\r\\n          NRC\\r\\n        </th>\\r\\n        <th style=\\\"text-align:left;font-size:12px;padding:6px;border-bottom:1px solid #e5e7eb;\\\">\\r\\n          MRC\\r\\n        </th>\\r\\n        <th style=\\\"text-align:left;font-size:12px;padding:6px;border-bottom:1px solid #e5e7eb;\\\">\\r\\n          Subtotal NRC\\r\\n        </th>\\r\\n        <th style=\\\"text-align:left;font-size:12px;padding:6px;border-bottom:1px solid #e5e7eb;\\\">\\r\\n          Subtotal MRC\\r\\n        </th>\\r\\n      </tr>\\r\\n    </thead>\\r\\n    <tbody>\\r\\n      {{#rows}}\\r\\n      <tr>\\r\\n        <td style=\\\"font-size:12px;padding:6px;border-bottom:1px solid #f3f4f6;\\\">\\r\\n          <div style=\\\"font-weight:600;\\\">\\r\\n            {{row.product_id_label}}\\r\\n          </div>\\r\\n          <div style=\\\"color:#6b7280;font-size:11px;margin-top:4px;\\\">\\r\\n            {{row.specs}}\\r\\n          </div>\\r\\n        </td>\\r\\n        <td style=\\\"font-size:12px;padding:6px;border-bottom:1px solid #f3f4f6;\\\">\\r\\n          {{row.qty}}\\r\\n        </td>\\r\\n        <td style=\\\"font-size:12px;padding:6px;border-bottom:1px solid #f3f4f6;\\\">\\r\\n          {{row.nrc_currency}}\\r\\n        </td>\\r\\n        <td style=\\\"font-size:12px;padding:6px;border-bottom:1px solid #f3f4f6;\\\">\\r\\n          {{row.mrc_currency}}\\r\\n        </td>\\r\\n        <td style=\\\"font-size:12px;padding:6px;border-bottom:1px solid #f3f4f6;\\\">\\r\\n          {{row.subtotal_nrc_currency}}\\r\\n        </td>\\r\\n        <td style=\\\"font-size:12px;padding:6px;border-bottom:1px solid #f3f4f6;\\\">\\r\\n          {{row.subtotal_mrc_currency}}\\r\\n        </td>\\r\\n      </tr>\\r\\n      {{/rows}}\\r\\n      <tr>\\r\\n        <th colspan=\\\"4\\\" style=\\\"text-align:left;font-size:12px;padding:6px;border-bottom:1px solid #e5e7eb;\\\">\\r\\n          Sub Total (Exclude VAT)\\r\\n        </th>\\r\\n        <td style=\\\"font-size:12px;padding:6px;border-bottom:1px solid #f3f4f6;\\\">\\r\\n          {{sum_rows.subtotal_nrc_currency}}\\r\\n        </td>\\r\\n        <td style=\\\"font-size:12px;padding:6px;border-bottom:1px solid #f3f4f6;\\\">\\r\\n          {{sum_rows.subtotal_mrc_currency}}\\r\\n        </td>\\r\\n      </tr>\\r\\n      <tr>\\r\\n        <th colspan=\\\"4\\\" style=\\\"text-align:left;font-size:12px;padding:6px;border-bottom:1px solid #e5e7eb;\\\">\\r\\n          Discount (Exclude VAT)\\r\\n        </th>\\r\\n        <td colspan=\\\"2\\\" style=\\\"font-size:12px;padding:6px;border-bottom:1px solid #f3f4f6;\\\">\\r\\n          \\r\\n        </td>\\r\\n      </tr>\\r\\n      <tr>\\r\\n        <th colspan=\\\"4\\\" style=\\\"text-align:left;font-size:12px;padding:6px;border-bottom:1px solid #e5e7eb;\\\">\\r\\n          Grand Total (Exclude VAT)\\r\\n        </th>\\r\\n        <td colspan=\\\"2\\\" style=\\\"font-size:12px;padding:6px;border-bottom:1px solid #f3f4f6;\\\">\\r\\n          {{total_contract_currency}}\\r\\n        </td>\\r\\n      </tr>\\r\\n    </tbody>\\r\\n  </table>\\r\\n</div>\", \"assignmentEnabled\": true}','2026-01-21 07:08:14.461','2026-04-21 08:47:52.529','Plus',1),
('cmknoljcd0007bjrn7heczhpp','quotation_item','Quotation Item','Item penawaran',NULL,'{\"naming\": {\"mode\": \"series\", \"field\": \"naming_series\", \"defaultPattern\": \"QUOTITEM-#####\"}, \"compute\": {\"totalFromRows\": [{\"mrcKey\": \"mrc\", \"nrcKey\": \"nrc\", \"qtyKey\": \"qty\", \"formula\": \"qty * nrc\", \"targetField\": \"subtotal_nrc\", \"childDocTypeKey\": \"quotation_item\"}, {\"mrcKey\": \"mrc\", \"nrcKey\": \"nrc\", \"qtyKey\": \"qty\", \"formula\": \"qty * mrc\", \"targetField\": \"subtotal_mrc\", \"childDocTypeKey\": \"quotation_item\"}]}, \"listFields\": [\"product_category\", \"product_id\", \"qty\", \"nrc\", \"mrc\"], \"filterFields\": [\"product_category\", \"product_sub_category\", \"product_id\"], \"notifyConfig\": {\"adminEnabled\": false, \"toastEnabled\": false, \"customerEnabled\": false}}','2026-01-21 07:08:14.506','2026-02-02 08:47:00.072',NULL,0),
('cmkw4cq7u0005btrnhgh11cdg','sales_order','Sales Order','Dokumen pesanan penjualan',NULL,'{\"naming\": {\"mode\": \"series\", \"field\": \"naming_series\", \"defaultPattern\": \"SO-#####\"}, \"compute\": {\"totalFromRows\": [{\"formula\": \"qty * nrc\", \"targetField\": \"subtotal_nrc\", \"childDocTypeKey\": \"sales_order_item\"}, {\"formula\": \"qty * mrc\", \"targetField\": \"subtotal_mrc\", \"childDocTypeKey\": \"sales_order_item\"}, {\"mrcKey\": \"mrc\", \"nrcKey\": \"nrc\", \"qtyKey\": \"qty\", \"targetField\": \"total_contract\", \"childDocTypeKey\": \"sales_order_item\"}]}, \"listFields\": [\"order_no\", \"order_date\", \"customer_id\", \"term_of_contract\", \"term_of_payment\", \"total_contract\"], \"noticeGuide\": null, \"filterFields\": [\"order_no\", \"order_date\", \"customer_id\", \"term_of_contract\", \"term_of_payment\", \"total_contract\"], \"notifyConfig\": {\"adminEnabled\": true, \"toastEnabled\": true, \"customerEnabled\": true}, \"childDocTypes\": {\"items\": \"sales_order_item\"}, \"childDocTypeKey\": \"sales_order_item\", \"previewTemplate\": \"<div>\\r\\n  <div style=\\\"display:flex;align-items:center;gap:12px;margin-bottom:12px;\\\">\\r\\n    <img src=\\\"{{fromCompanyLogo}}\\\" style=\\\"height:40px;object-fit:contain;border-radius:4px;\\\" />\\r\\n    <div style=\\\"padding:10px;margin-left:10px;width:400px;font-size:12px;color:#6b7280;\\\">\\r\\n      {{fromCompanyAddress}}\\r\\n    </div>\\r\\n  </div>\\r\\n  <div style=\\\"font-size:20px;font-weight:600;margin-bottom:4px;width:100%;padding:5px;color:#333;background: #efefef\\\">\\r\\n    {{docTypeName}}\\r\\n  </div>\\r\\n  <table style=\\\"width:100%;border-collapse:collapse;\\\">\\r\\n    <tr>\\r\\n      <td style=\\\"font-size:12px;padding:4px 6px;width:10%;color:#374151;\\\">\\r\\n        Date :\\r\\n      </td>\\r\\n      <td style=\\\"font-size:12px;padding:4px 6px;width:40%;\\\">\\r\\n        {{order_date_label}}\\r\\n      </td>\\r\\n      <td style=\\\"font-size:12px;padding:4px 6px;width:17%;color:#374151;\\\">\\r\\n        Sales Manager :\\r\\n      </td>\\r\\n      <td style=\\\"font-size:12px;padding:4px 6px;width:40%;\\\">\\r\\n        {{salesManagerName}}\\r\\n      </td>\\r\\n    </tr>\\r\\n    <tr>\\r\\n      <td style=\\\"font-size:12px;padding:4px 6px;width:10%;color:#374151;\\\">\\r\\n        Order ID :\\r\\n      </td>\\r\\n      <td style=\\\"font-size:12px;padding:4px 6px;width:40%;\\\">\\r\\n        {{series_name_label}}\\r\\n      </td>\\r\\n      <td style=\\\"font-size:12px;padding:4px 6px;width:17%;color:#374151;\\\">\\r\\n        Email Address :\\r\\n      </td>\\r\\n      <td style=\\\"font-size:12px;padding:4px 6px;width:40%;\\\">\\r\\n        {{salesManagerEmail}}\\r\\n      </td>\\r\\n    </tr>\\r\\n  </table>\\r\\n  <div style=\\\"font-size:12px;font-weight:600;margin-bottom:4px;width:100%;padding:5px;color:#fff;background: #da3036\\\">\\r\\n    CUSTOMER\\r\\n  </div>\\r\\n  <table style=\\\"width:100%;border-collapse:collapse;\\\">\\r\\n    <tr>\\r\\n      <td style=\\\"font-size:12px;padding:4px 6px;width:25%;color:#374151;\\\">\\r\\n        Customer Name\\r\\n      </td>\\r\\n      <td style=\\\"width:2%\\\">\\r\\n        :\\r\\n      </td>\\r\\n      <td style=\\\"font-size:12px;padding:4px 6px;\\\">\\r\\n        {{company_name_label}}\\r\\n      </td>\\r\\n    </tr>\\r\\n    <tr>\\r\\n      <td style=\\\"font-size:12px;padding:4px 6px;width:25%;color:#374151;\\\">\\r\\n        Email Address\\r\\n      </td>\\r\\n      <td style=\\\"width:2%\\\">\\r\\n        :\\r\\n      </td>\\r\\n      <td style=\\\"font-size:12px;padding:4px 6px;\\\">\\r\\n        {{company_email_label}}\\r\\n      </td>\\r\\n    </tr>\\r\\n    <tr>\\r\\n      <td style=\\\"font-size:12px;padding:4px 6px;width:25%;color:#374151;\\\">\\r\\n        Phone No.\\r\\n      </td>\\r\\n      <td style=\\\"width:2%\\\">\\r\\n        :\\r\\n      </td>\\r\\n      <td style=\\\"font-size:12px;padding:4px 6px;\\\">\\r\\n        {{company_phonenumber_label}}\\r\\n      </td>\\r\\n    </tr>\\r\\n    <tr>\\r\\n      <td style=\\\"font-size:12px;padding:4px 6px;width:25%;color:#374151;\\\">\\r\\n        Address\\r\\n      </td>\\r\\n      <td style=\\\"width:2%\\\">\\r\\n        :\\r\\n      </td>\\r\\n      <td style=\\\"font-size:12px;padding:4px 6px;\\\">\\r\\n        {{company_address_label}}\\r\\n      </td>\\r\\n    </tr>\\r\\n  </table>\\r\\n  <div style=\\\"font-size:12px;font-weight:600;margin-bottom:4px;width:100%;padding:5px;color:#fff;background: #da3036\\\">\\r\\n    TERMS & PRICING\\r\\n  </div>\\r\\n  <div>\\r\\n    <table style=\\\"width:100%;border-collapse:collapse;\\\">\\r\\n      <tr>\\r\\n        <td style=\\\"font-size:12px;padding:4px 6px;width:25%;color:#374151;\\\">\\r\\n          Date\\r\\n        </td>\\r\\n        <td style=\\\"width:2%\\\">\\r\\n          :\\r\\n        </td>\\r\\n        <td style=\\\"font-size:12px;padding:4px 6px;\\\">\\r\\n          {{order_date_label}}\\r\\n        </td>\\r\\n      </tr>\\r\\n      <tr>\\r\\n        <td style=\\\"font-size:12px;padding:4px 6px;width:25%;color:#374151;\\\">\\r\\n          Commencement Date\\r\\n        </td>\\r\\n        <td style=\\\"width:2%\\\">\\r\\n          :\\r\\n        </td>\\r\\n        <td style=\\\"font-size:12px;padding:4px 6px;\\\">\\r\\n          {{commencement_date_label}}\\r\\n        </td>\\r\\n      </tr>\\r\\n      <tr>\\r\\n        <td style=\\\"font-size:12px;padding:4px 6px;width:25%;color:#374151;\\\">\\r\\n          Term Of Contract ( Month )\\r\\n        </td>\\r\\n        <td style=\\\"width:2%\\\">\\r\\n          :\\r\\n        </td>\\r\\n        <td style=\\\"font-size:12px;padding:4px 6px;\\\">\\r\\n          {{term_of_contract_label}}\\r\\n        </td>\\r\\n      </tr>\\r\\n      <tr>\\r\\n        <td style=\\\"font-size:12px;padding:4px 6px;width:25%;color:#374151;\\\">\\r\\n          Term Of Payment\\r\\n        </td>\\r\\n        <td style=\\\"width:2%\\\">\\r\\n          :\\r\\n        </td>\\r\\n        <td style=\\\"font-size:12px;padding:4px 6px;\\\">\\r\\n          {{term_of_payment_label}}\\r\\n        </td>\\r\\n      </tr>\\r\\n      <tr>\\r\\n        <td style=\\\"font-size:12px;padding:4px 6px;width:25%;color:#374151;\\\">\\r\\n          Total Contract\\r\\n        </td>\\r\\n        <td style=\\\"width:2%\\\">\\r\\n          :\\r\\n        </td>\\r\\n        <td style=\\\"font-size:12px;padding:4px 6px;\\\">\\r\\n          IDR. {{total_contract_currency}}\\r\\n        </td>\\r\\n      </tr>\\r\\n    </table>\\r\\n  </div>\\r\\n</div>\\r\\n<div style=\\\"font-size:12px;font-weight:600;margin-bottom:4px;width:100%;padding:5px;color:#fff;background: #da3036\\\">\\r\\n  ITEMS\\r\\n</div>\\r\\n<div>\\r\\n  <table style=\\\"width:100%;border-collapse:collapse;\\\">\\r\\n    <thead>\\r\\n      <tr>\\r\\n        <th style=\\\"text-align:left;font-size:12px;padding:6px;border-bottom:1px solid #e5e7eb;\\\">\\r\\n          Produk\\r\\n        </th>\\r\\n        <th style=\\\"text-align:left;font-size:12px;padding:6px;border-bottom:1px solid #e5e7eb;\\\">\\r\\n          Qty\\r\\n        </th>\\r\\n        <th style=\\\"text-align:left;font-size:12px;padding:6px;border-bottom:1px solid #e5e7eb;\\\">\\r\\n          NRC\\r\\n        </th>\\r\\n        <th style=\\\"text-align:left;font-size:12px;padding:6px;border-bottom:1px solid #e5e7eb;\\\">\\r\\n          MRC\\r\\n        </th>\\r\\n        <th style=\\\"text-align:left;font-size:12px;padding:6px;border-bottom:1px solid #e5e7eb;\\\">\\r\\n          Subtotal NRC\\r\\n        </th>\\r\\n        <th style=\\\"text-align:left;font-size:12px;padding:6px;border-bottom:1px solid #e5e7eb;\\\">\\r\\n          Subtotal MRC\\r\\n        </th>\\r\\n      </tr>\\r\\n    </thead>\\r\\n    <tbody>\\r\\n      {{#rows}}\\r\\n      <tr>\\r\\n        <td style=\\\"font-size:12px;padding:6px;border-bottom:1px solid #f3f4f6;\\\">\\r\\n          <div style=\\\"font-weight:600;\\\">\\r\\n            {{row.product_id_label}}\\r\\n          </div>\\r\\n          <div style=\\\"color:#6b7280;font-size:11px;margin-top:4px;\\\">\\r\\n            {{row.specs}}\\r\\n          </div>\\r\\n        </td>\\r\\n        <td style=\\\"font-size:12px;padding:6px;border-bottom:1px solid #f3f4f6;\\\">\\r\\n          {{row.qty}}\\r\\n        </td>\\r\\n        <td style=\\\"font-size:12px;padding:6px;border-bottom:1px solid #f3f4f6;\\\">\\r\\n          {{row.nrc_currency}}\\r\\n        </td>\\r\\n        <td style=\\\"font-size:12px;padding:6px;border-bottom:1px solid #f3f4f6;\\\">\\r\\n          {{row.mrc_currency}}\\r\\n        </td>\\r\\n        <td style=\\\"font-size:12px;padding:6px;border-bottom:1px solid #f3f4f6;\\\">\\r\\n          {{row.subtotal_nrc_currency}}\\r\\n        </td>\\r\\n        <td style=\\\"font-size:12px;padding:6px;border-bottom:1px solid #f3f4f6;\\\">\\r\\n          {{row.subtotal_mrc_currency}}\\r\\n        </td>\\r\\n      </tr>\\r\\n      {{/rows}}\\r\\n      <tr>\\r\\n        <th colspan=\\\"4\\\" style=\\\"text-align:left;font-size:12px;padding:6px;border-bottom:1px solid #e5e7eb;\\\">\\r\\n          Sub Total (Exclude VAT)\\r\\n        </th>\\r\\n        <td style=\\\"font-size:12px;padding:6px;border-bottom:1px solid #f3f4f6;\\\">\\r\\n          {{sum_rows.subtotal_nrc_currency}}\\r\\n        </td>\\r\\n        <td style=\\\"font-size:12px;padding:6px;border-bottom:1px solid #f3f4f6;\\\">\\r\\n          {{sum_rows.subtotal_mrc_currency}}\\r\\n        </td>\\r\\n      </tr>\\r\\n      <tr>\\r\\n        <th colspan=\\\"4\\\" style=\\\"text-align:left;font-size:12px;padding:6px;border-bottom:1px solid #e5e7eb;\\\">\\r\\n          Discount (Exclude VAT)\\r\\n        </th>\\r\\n        <td colspan=\\\"2\\\" style=\\\"font-size:12px;padding:6px;border-bottom:1px solid #f3f4f6;\\\">\\r\\n        </td>\\r\\n      </tr>\\r\\n      <tr>\\r\\n        <th colspan=\\\"4\\\" style=\\\"text-align:left;font-size:12px;padding:6px;border-bottom:1px solid #e5e7eb;\\\">\\r\\n          Grand Total (Exclude VAT)\\r\\n        </th>\\r\\n        <td colspan=\\\"2\\\" style=\\\"font-size:12px;padding:6px;border-bottom:1px solid #f3f4f6;\\\">\\r\\n          IDR. {{total_contract_currency}}\\r\\n        </td>\\r\\n      </tr>\\r\\n    </tbody>\\r\\n  </table>\\r\\n</div>\\r\\n<div style=\\\"font-size:12px;font-weight:600;margin-bottom:4px;width:100%;padding:5px;color:#fff;background: #da3036\\\">\\r\\n  TERMS & CONDITIONS\\r\\n</div>\\r\\n<br/>\\r\\n<p style=\\\"font-size:10px;font-weight:bold\\\">\\r\\n  1. Introduction\\r\\n  <p>\\r\\n    <p style=\\\"font-size:10px;\\\">\\r\\n      This Sales Order is between PT MettaDC Teknologi and the customer indentified above, who wishes to order the products and/or services set forth above (each a Service). This Order shall be of no force of effect unless:\\r\\n    </p>\\r\\n    <ul>\\r\\n      <li style=\\\"font-size:10px\\\">\\r\\n        It is excuted by both Parties\\r\\n      </li>\\r\\n      <li style=\\\"font-size:10px\\\">\\r\\n        The parties have entered into an Agreement (defined below) (under which this Order is executed) that is currently in effect as the Order Effective Date (defined below)\\r\\n      </li>\\r\\n      <li style=\\\"font-size:10px\\\">\\r\\n        This Order is governed by and incorporated by reference into the applicable Master Service Agreement entered into between the Parties (\\\"Agreement\\\")\\r\\n      </li>\\r\\n      <li style=\\\"font-size:10px\\\">\\r\\n        The Order Effective Date of this Order shall be the date this Order is signed by both Parties (\\\"Order Effective Date). Where this Order is signed on different dates by MettaDC and the Customer, the latter date of signature shall be the Order Effective Date.\\r\\n      </li>\\r\\n    </ul>\\r\\n    <br/>\\r\\n    <p style=\\\"font-size:10px;font-weight:bold\\\">\\r\\n      2. Specific for Section A (Space and Colocation Service) Unless otherwise stated herein, cabinets provided by MettaDC in a dedicated and shared cage are locking cabinets.\\r\\n    </p>\\r\\n    <p style=\\\"font-size:10px;\\\">\\r\\n      If Customer requests cabinet accessories (e.g., shelves, door, side panels, mounting rails, etc) which are not included with a cabinet as described in MettaDC\'s specification for such cabinet, Customer shall be charged MettaDC\'s list price for such accessories, unless otherwise stated herein.\\r\\n    </p>\\r\\n    <br/>\\r\\n    <p style=\\\"font-size:10px;font-weight:bold\\\">\\r\\n      3. Service Term\\r\\n    </p>\\r\\n    <p style=\\\"font-size:10px;\\\">\\r\\n      This Order shall commence on the Order Effective Date, and this Order shall remain in effect until the last Service Term in effect expires or is terminated pursuant to the Agreement. In the event the Customer uses the Services prior to the Order Effective Date,the Customer agrees that it shall be bound by the terms and conditions of the Agreement and this Order. The initial Service Term will commence on the Billing Commencement Date and will terminate on the last day on which the initial Service Term expires.\\r\\n    </p>\\r\\n    <br/>\\r\\n    <p style=\\\"font-size:10px;font-weight:bold\\\">\\r\\n      4. Billing\\r\\n    </p>\\r\\n    <p style=\\\"font-size:10px;\\\">\\r\\n      Customer\'s obligation to pay the monthly recurring charges (\\\"MRC\\\") and the non recurring charges (\\\"NRC\\\") for each Service set forth herein shall begin with the following terms of payment: For the initial payment: Customer shall pay one hundred precent (100%) of the NRC and three (3) months in advance of the MRC after Certification Completion signed (Commencement Date). MRC will invoiced quarterly in advance\\r\\n    </p>\\r\\n    <p style=\\\"font-size:10px;\\\">\\r\\n      Prices shown above do not include any Taxes, surcharge and shipping charges which are the responsibility of the Customer. Customer agrees to provide MettaDC access to its cage, cabinets, racks and/or equipment as necessary for the performance of the Services as set forth in this Order.\\r\\n    </p>\\r\\n    <p style=\\\"font-size:10px;\\\">\\r\\n      The Installation Date and the Billing Commencement Date shall be the date on which the Services set out in this Order are provisioned by MettaDC to Customer.\\r\\n    </p>\\r\\n    <br/>\\r\\n    <p style=\\\"font-size:10px;font-weight:bold\\\">\\r\\n      5. Changes in Fees During the service term, MettaDC may review and increase the Service Fees every fiscal year of the Billing Commencement Date.\\r\\n    </p>\\r\\n    <br/>\\r\\n    <p style=\\\"font-size:10px;font-weight:bold\\\">\\r\\n      6. Power Limitation\\r\\n    </p>\\r\\n    <p style=\\\"font-size:10px;\\\">\\r\\n      Customer may not draw more than the kVA or kW amount listed above corresponding to each cage or cabinet (as the case may be) ordered above (the \\\"Power Cap\\\"). If the power draw in such cage or cabinet exceeds the Power Cap, MettaDC may provide written notification to Customer and/or require Customer to reduce the power draw in such cage or cabinet to a rate within the Power Cap within seventy-two (72) hours of the notification. If Customer does not resolve the situation with a mutually agreeable plan, MettaDC may suspend Customer\'s power until the aggregate rated capacity of all power circuits equal the Power Cap.\\r\\n    </p>\\r\\n    <br/>\\r\\n    <p style=\\\"font-size:10px;font-weight:bold\\\">\\r\\n      7. Termination\\r\\n    </p>\\r\\n    <p style=\\\"font-size:10px;\\\">\\r\\n      If customer terminated the Contract within minimum contract period, the Customer shall be liable for charges of the remaining.\\r\\n    </p>\\r\\n    <br/>\\r\\n    <p style=\\\"font-size:10px;font-weight:bold\\\">\\r\\n      8. Other Terms and Conditions\\r\\n    </p>\\r\\n    <p style=\\\"font-size:10px;\\\">\\r\\n      Customer acknowledges and agrees that (i) any Services ordered by Customer in respect of data center space and/or facilities that are currently pending completion (the \\\"Ordered Services\\\") will be subject to availability of such data center space and/or facilities and the Billing commencement Date shall be determined by MettaDC in accordance with such availability, (ii) MettaDC does not guarantee the completion date of such data center space and/or facilities; (iii) Customer acknowledges that the commencement of provision of the Ordered Services requested by Customer may be delayed due to various reason including a delay in completion of Data Center space and/or facilities by MettaDC.\\r\\n    </p>\\r\\n    <div style=\\\"font-size:12px;font-weight:600;margin-bottom:4px;width:100%;padding:5px;color:#fff;background: #da3036\\\">\\r\\n      CONTACT INFORMATION ( filled by customer )\\r\\n    </div>\\r\\n    <table style=\\\"width:100%;border-collapse:collapse;\\\">\\r\\n      <tr>\\r\\n        <td style=\\\"font-size:12px;padding:4px 6px;width:18%;color:#374151;font-weight:bold\\\">\\r\\n          Technical Contact\\r\\n        </td>\\r\\n        <td style=\\\"font-size:12px;padding:4px 6px;width:30%;\\\">\\r\\n        </td>\\r\\n        <td style=\\\"font-size:12px;padding:4px 6px;width:17%;color:#374151;font-weight:bold\\\">\\r\\n          Billing Contact\\r\\n        </td>\\r\\n        <td style=\\\"font-size:12px;padding:4px 6px;width:30%;\\\">\\r\\n        </td>\\r\\n      </tr>\\r\\n      <tr>\\r\\n        <td style=\\\"font-size:12px;padding:4px 6px;width:10%;color:#374151;\\\">\\r\\n          Contact Name:\\r\\n        </td>\\r\\n        <td style=\\\"font-size:12px;padding:4px 6px;width:40%;\\\">\\r\\n          {{customer.pic.technicalContactName}}\\r\\n        </td>\\r\\n        <td style=\\\"font-size:12px;padding:4px 6px;width:17%;color:#374151;\\\">\\r\\n          Contact Name :\\r\\n        </td>\\r\\n        <td style=\\\"font-size:12px;padding:4px 6px;width:40%;\\\">\\r\\n          {{customer.pic.billingContactName}}\\r\\n        </td>\\r\\n      </tr>\\r\\n      <tr>\\r\\n        <td style=\\\"font-size:12px;padding:4px 6px;width:10%;color:#374151;\\\">\\r\\n          Phone Number :\\r\\n        </td>\\r\\n        <td style=\\\"font-size:12px;padding:4px 6px;width:40%;\\\">\\r\\n          {{customer.pic.technicalPhoneNumber}}\\r\\n        </td>\\r\\n        <td style=\\\"font-size:12px;padding:4px 6px;width:17%;color:#374151;\\\">\\r\\n          Phone Number :\\r\\n        </td>\\r\\n        <td style=\\\"font-size:12px;padding:4px 6px;width:40%;\\\">\\r\\n          {{customer.pic.billingPhoneNumber}}\\r\\n        </td>\\r\\n      </tr>\\r\\n      <tr>\\r\\n        <td style=\\\"font-size:12px;padding:4px 6px;width:10%;color:#374151;\\\">\\r\\n          Email Address :\\r\\n        </td>\\r\\n        <td style=\\\"font-size:12px;padding:4px 6px;width:40%;\\\">\\r\\n          {{customer.pic.technicalEmail}}\\r\\n        </td>\\r\\n        <td style=\\\"font-size:12px;padding:4px 6px;width:17%;color:#374151;\\\">\\r\\n          Email Address :\\r\\n        </td>\\r\\n        <td style=\\\"font-size:12px;padding:4px 6px;width:40%;\\\">\\r\\n          {{customer.pic.billingEmail}}\\r\\n        </td>\\r\\n      </tr>\\r\\n    </table>\\r\\n    <table style=\\\"width:100%;border-collapse:collapse;\\\">\\r\\n      <tr>\\r\\n        <td style=\\\"font-size:12px;padding:4px 6px;width:27%;padding:5px;background:#da3036;color:#fff;font-weight:bold\\\">\\r\\n          CUSTOMER SIGNATURE\\r\\n        </td>\\r\\n        <td style=\\\"font-size:12px;padding:4px 6px;width:30%;padding:5px;background:#da3036;color:#fff;\\\">\\r\\n        </td>\\r\\n        <td style=\\\"font-size:12px;padding:4px 6px;width:27%;padding:5px;background:#da3036;color:#fff;font-weight:bold\\\">\\r\\n          METTADC SIGNATURE\\r\\n        </td>\\r\\n        <td style=\\\"font-size:12px;padding:4px 6px;width:30%;padding:5px;background:#da3036;color:#fff;\\\">\\r\\n        </td>\\r\\n      </tr>\\r\\n    </table>\\r\\n    <table style=\\\"width:100%;border-collapse:collapse;\\\">\\r\\n      <tr>\\r\\n        <td style=\\\"font-size:12px;padding:4px 6px;width:17%;color:#374151;\\\">\\r\\n          Company Name:\\r\\n        </td>\\r\\n        <td style=\\\"font-size:12px;padding:4px 6px;width:40%;\\\">\\r\\n          {{company_name_label}}\\r\\n        </td>\\r\\n        <td style=\\\"font-size:12px;padding:4px 6px;width:17%;color:#374151;\\\">\\r\\n          Company Name :\\r\\n        </td>\\r\\n        <td style=\\\"font-size:12px;padding:4px 6px;width:40%;\\\">\\r\\n          PT. MettaDC Teknologi Indonesia\\r\\n        </td>\\r\\n      </tr>\\r\\n      <tr>\\r\\n        <td style=\\\"font-size:12px;padding:4px 6px;width:17%;color:#374151;\\\">\\r\\n          Name of Sign:\\r\\n        </td>\\r\\n        <td style=\\\"font-size:12px;padding:4px 6px;width:40%;\\\">\\r\\n          {{customer.pic.name}}\\r\\n        </td>\\r\\n        <td style=\\\"font-size:12px;padding:4px 6px;width:17%;color:#374151;\\\">\\r\\n          NPWP Number :\\r\\n        </td>\\r\\n        <td style=\\\"font-size:12px;padding:4px 6px;width:40%;\\\">\\r\\n          63.605.775.4-014.000\\r\\n        </td>\\r\\n      </tr>\\r\\n      <tr>\\r\\n        <td style=\\\"font-size:12px;padding:4px 6px;width:17%;color:#374151;\\\">\\r\\n          Title :\\r\\n        </td>\\r\\n        <td style=\\\"font-size:12px;padding:4px 6px;width:40%;\\\">\\r\\n          {{customer.jobTitle}}\\r\\n        </td>\\r\\n        <td style=\\\"font-size:12px;padding:4px 6px;width:17%;color:#374151;\\\">\\r\\n          Name of Sign:\\r\\n        </td>\\r\\n        <td style=\\\"font-size:12px;padding:4px 6px;width:40%;\\\">\\r\\n          {{salesManagerName}}\\r\\n        </td>\\r\\n      </tr>\\r\\n      <tr>\\r\\n        <td style=\\\"font-size:12px;padding:4px 6px;width:17%;color:#374151;\\\">\\r\\n        </td>\\r\\n        <td style=\\\"font-size:12px;padding:4px 6px;width:40%;\\\">\\r\\n        </td>\\r\\n        <td style=\\\"font-size:12px;padding:4px 6px;width:17%;color:#374151;\\\">\\r\\n          Title :\\r\\n        </td>\\r\\n        <td style=\\\"font-size:12px;padding:4px 6px;width:40%;\\\">\\r\\n          Sales Manager\\r\\n        </td>\\r\\n      </tr>\\r\\n    </table>\\r\\n    <br/>\\r\\n    <br/>\\r\\n    <table style=\\\"width:100%;border-collapse:collapse;\\\">\\r\\n      <tr>\\r\\n        <td style=\\\"font-size:12px;padding:4px 6px;width:17%;color:#374151;\\\">\\r\\n          Submited By:\\r\\n        </td>\\r\\n        <td style=\\\"font-size:12px;padding:4px 6px;width:40%;\\\">\\r\\n          {{customer.pic.name}}\\r\\n        </td>\\r\\n        <td style=\\\"font-size:12px;padding:4px 6px;width:17%;color:#374151;\\\">\\r\\n          Submited By :\\r\\n        </td>\\r\\n        <td style=\\\"font-size:12px;padding:4px 6px;width:40%;\\\">\\r\\n          {{salesManagerName}}\\r\\n        </td>\\r\\n      </tr>\\r\\n    </table>\\r\\n    <br/>\\r\\n    <br/>\\r\\n    <br/>\\r\\n    <br/>\\r\\n    <br/>\\r\\n    <table style=\\\"width:100%;border-collapse:collapse;\\\">\\r\\n      <tr>\\r\\n        <td style=\\\"font-size:12px;padding:4px 6px;width:27%;color:#374151;\\\">\\r\\n          (Authorized Signature & Company Stamp)\\r\\n        </td>\\r\\n        <td style=\\\"font-size:12px;padding:4px 6px;width:30%;\\\">\\r\\n        </td>\\r\\n        <td style=\\\"font-size:12px;padding:4px 6px;width:27%;color:#374151;\\\">\\r\\n          (Authorized Signature & Company Stamp)\\r\\n        </td>\\r\\n        <td style=\\\"font-size:12px;padding:4px 6px;width:30%;\\\">\\r\\n        </td>\\r\\n      </tr>\\r\\n    </table>\\r\\n    <br/>\\r\\n    <br/>\\r\\n    <p style=\\\"font-size:10px\\\">\\r\\n      Please sign and return all exhibit(s), addenda(um) and/or policies listed below with this Sales Order. Failure to do so may result in delay processing\\r\\n    </p>\\r\\n    <p style=\\\"font-size:10px\\\">\\r\\n      Internal Use only. Please send ONE set of duty signed contract to:\\r\\n    </p>\\r\\n    <p style=\\\"font-size:10px\\\">\\r\\n      PT. MettaDC Teknologi Indonesia (MettaDC)\\r\\n    </p>\", \"assignmentEnabled\": false}','2026-01-27 04:51:26.775','2026-04-22 04:39:30.292','Plus',1),
('cmkw4cq8m000cbtrno82k33h7','sales_order_item','Sales Order Item','Item pesanan penjualan',NULL,'{\"naming\": {\"mode\": \"series\", \"field\": \"naming_series\", \"defaultPattern\": \"SOITEM-#####\"}, \"compute\": {\"totalFromRows\": [{\"mrcKey\": \"mrc\", \"nrcKey\": \"nrc\", \"qtyKey\": \"qty\", \"formula\": \"qty * nrc\", \"targetField\": \"subtotal_nrc\", \"childDocTypeKey\": \"sales_order_item\"}, {\"mrcKey\": \"mrc\", \"nrcKey\": \"nrc\", \"qtyKey\": \"qty\", \"formula\": \"qty * mrc\", \"targetField\": \"subtotal_mrc\", \"childDocTypeKey\": \"sales_order_item\"}]}, \"listFields\": [\"product_id\", \"qty\", \"nrc\", \"mrc\"], \"filterFields\": [\"product_category\", \"product_sub_category\", \"product_id\", \"qty\", \"nrc\", \"mrc\"], \"notifyConfig\": {\"adminEnabled\": true, \"toastEnabled\": true, \"customerEnabled\": true}}','2026-01-27 04:51:26.804','2026-02-02 08:47:39.524',NULL,0),
('cmkz6vsv20008hornl8c3i9w4','work_order','Work Order','Dokumen perintah kerja',NULL,'{\"naming\": {\"mode\": \"series\", \"field\": \"naming_series\", \"defaultPattern\": \"WO-#####\"}, \"listFields\": [\"wo_date\", \"customer_id\"], \"noticeGuide\": \"Set \\\"Approved\\\" untuk mereview pekerjaan di level operational\\r\\nAssign task to engginer terkait work order\\r\\nSet \\\"In Progress\\\" sebelum melakukan pengerjaan\\r\\nSet \\\"Completed\\\" dan auto terbit COC berstatus \\\"Draft\\\"\", \"filterFields\": [\"wo_date\", \"customer_id\"], \"childDocTypes\": {\"coc\": \"coc\", \"items\": \"work_order_item\"}, \"childDocTypeKey\": \"work_order_item\", \"previewTemplate\": \"<div>\\r\\n  <div style=\\\"display:flex;align-items:center;gap:12px;margin-bottom:12px;\\\">\\r\\n    <img src=\\\"{{fromCompanyLogo}}\\\" style=\\\"height:40px;object-fit:contain;border-radius:4px;\\\" />\\r\\n    <div style=\\\"padding:10px;margin-left:10px;width:400px;font-size:12px;color:#6b7280;\\\">{{fromCompanyAddress}}</div>\\r\\n  </div>\\r\\n  \\r\\n  <div style=\\\"font-size:20px;font-weight:600;margin-bottom:4px;width:100%;padding:5px;color:#333;background: #efefef\\\">\\r\\n        {{docTypeName}}\\r\\n  </div>\\r\\n\\r\\n  <table style=\\\"width:100%;border-collapse:collapse;\\\">\\r\\n    <tr>\\r\\n      <td style=\\\"font-size:12px;padding:4px 6px;width:10%;color:#374151;\\\">Date</td>\\r\\n      <td style=\\\"font-size:12px;padding:4px 6px;width:40%;\\\">{{wo_date_label}}</td>\\r\\n      <td style=\\\"font-size:12px;padding:4px 6px;width:10%;color:#374151;\\\">Sales Manager</td>\\r\\n      <td style=\\\"font-size:12px;padding:4px 6px;width:40%;\\\">{{salesManagerName}}</td>\\r\\n    </tr>\\r\\n    <tr>\\r\\n      <td style=\\\"font-size:12px;padding:4px 6px;width:10%;color:#374151;\\\">Work Order ID</td>\\r\\n      <td style=\\\"font-size:12px;padding:4px 6px;width:40%;\\\">{{series_name_label}}</td>\\r\\n      <td style=\\\"font-size:12px;padding:4px 6px;width:10%;color:#374151;\\\">Email Address</td>\\r\\n      <td style=\\\"font-size:12px;padding:4px 6px;width:40%;\\\">{{salesManagerEmail}}</td>\\r\\n    </tr>\\r\\n    <tr>\\r\\n      <td style=\\\"font-size:12px;padding:4px 6px;width:10%;color:#374151;\\\">Reference No</td>\\r\\n      <td style=\\\"font-size:12px;padding:4px 6px;width:40%;\\\">{{parent.series_name}}</td>\\r\\n      <td style=\\\"font-size:12px;padding:4px 6px;width:10%;color:#374151;\\\"></td>\\r\\n      <td style=\\\"font-size:12px;padding:4px 6px;width:40%;\\\"></td>\\r\\n    </tr>\\r\\n  </table>\\r\\n\\r\\n  <div style=\\\"font-size:12px;font-weight:600;margin-bottom:4px;width:100%;padding:5px;color:#fff;background: #da3036\\\">\\r\\n        CUSTOMER\\r\\n  </div>\\r\\n  \\r\\n  <table style=\\\"width:100%;border-collapse:collapse;\\\">\\r\\n    <tr>\\r\\n      <td style=\\\"font-size:12px;padding:4px 6px;width:30%;color:#374151;width:13%\\\">Customer Name</td>\\r\\n      <td style=\\\"width:2%\\\">:</td>\\r\\n      <td style=\\\"font-size:12px;padding:4px 6px;\\\">{{company_name_label}}</td>\\r\\n    </tr>\\r\\n    <tr>\\r\\n      <td style=\\\"font-size:12px;padding:4px 6px;width:30%;color:#374151;width:13%\\\">Email Address</td>\\r\\n      <td style=\\\"width:2%\\\">:</td>\\r\\n      <td style=\\\"font-size:12px;padding:4px 6px;\\\">{{company_email_label}}</td>\\r\\n    </tr>\\r\\n    <tr>\\r\\n      <td style=\\\"font-size:12px;padding:4px 6px;width:30%;color:#374151;width:13%\\\">Phone No.</td>\\r\\n      <td style=\\\"width:2%\\\">:</td>\\r\\n      <td style=\\\"font-size:12px;padding:4px 6px;\\\">{{company_phonenumber_label}}</td>\\r\\n    </tr>\\r\\n    <tr>\\r\\n      <td style=\\\"font-size:12px;padding:4px 6px;width:30%;color:#374151;width:13%\\\">Address</td>\\r\\n      <td style=\\\"width:2%\\\">:</td>\\r\\n      <td style=\\\"font-size:12px;padding:4px 6px;\\\">{{company_address_label}}</td>\\r\\n    </tr>\\r\\n  </table>\\r\\n\\r\\n  \\r\\n</div>\\r\\n\\r\\n<div style=\\\"font-size:12px;font-weight:600;margin-bottom:4px;width:100%;padding:5px;color:#fff;background: #da3036\\\">\\r\\n       WORK ITEMS\\r\\n</div>\\r\\n\\r\\n<div>\\r\\n  <table style=\\\"width:100%;border-collapse:collapse;\\\">\\r\\n    <thead>\\r\\n      <tr>\\r\\n        <th style=\\\"text-align:left;font-size:12px;padding:6px;border-bottom:1px solid #e5e7eb;\\\">\\r\\n          Produk\\r\\n        </th>\\r\\n        <th style=\\\"text-align:left;font-size:12px;padding:6px;border-bottom:1px solid #e5e7eb;\\\">\\r\\n          Qty\\r\\n        </th>\\r\\n      </tr>\\r\\n    </thead>\\r\\n    <tbody>\\r\\n      {{#rows}}\\r\\n      <tr>\\r\\n        <td style=\\\"font-size:12px;padding:6px;border-bottom:1px solid #f3f4f6;\\\">\\r\\n          <div style=\\\"font-weight:600;\\\">\\r\\n            {{row.product_id_label}}\\r\\n          </div>\\r\\n          <div style=\\\"color:#6b7280;font-size:11px;margin-top:4px;\\\">\\r\\n            {{row.specs}}\\r\\n          </div>\\r\\n        </td>\\r\\n        <td style=\\\"font-size:12px;padding:6px;border-bottom:1px solid #f3f4f6;\\\">\\r\\n          {{row.qty}}\\r\\n        </td>\\r\\n      </tr>\\r\\n      {{/rows}}\\r\\n      \\r\\n      <div></div>\\r\\n      \\r\\n    </tbody>\\r\\n  </table>\\r\\n\\r\\n  <div style=\\\"display: flex; justify-content: space-between; margin-top: 32px; padding-top: 20px; text-align: center;\\\">\\r\\n    <div style=\\\"flex: 1; padding: 0 10px;\\\">\\r\\n      <div style=\\\"font-size: 12px; margin-bottom: 60px;\\\">Sales MettaDC</div>\\r\\n      <div style=\\\"font-size: 12px; font-weight: 600; border-top: 1px solid #333; padding-top: 4px;\\\"> {{creator_name_label}}</div>\\r\\n    </div>\\r\\n    <div style=\\\"flex: 1; padding: 0 10px;\\\">\\r\\n      <div style=\\\"font-size: 12px; margin-bottom: 60px;\\\">Operational</div>\\r\\n      <div style=\\\"font-size: 12px; font-weight: 600; border-top: 1px solid #333; padding-top: 4px;\\\">Purwahono</div>\\r\\n    </div>\\r\\n    <div style=\\\"flex: 1; padding: 0 10px;\\\">\\r\\n      <div style=\\\"font-size: 12px; margin-bottom: 60px;\\\">Engginer</div>\\r\\n      <div style=\\\"font-size: 12px; font-weight: 600; border-top: 1px solid #333; padding-top: 4px;\\\">{{assignedToName}}</div>\\r\\n    </div>\\r\\n  </div>\\r\\n</div>\", \"assignmentEnabled\": true}','2026-01-29 08:25:34.428','2026-03-11 07:44:29.662','Pickaxe',1),
('cmkz6vsvn000fhornnrk104c7','work_order_item','Work Order Item','Item perintah kerja',NULL,'{\"listFields\": [\"product_id\", \"qty\", \"price\", \"discount_percent\"]}','2026-01-29 08:25:34.450','2026-04-21 08:47:52.761',NULL,0),
('cmkza5r640000csrnn4eccui8','request','Request','Dokumen permintaan',NULL,'{\"naming\": {\"mode\": \"series\", \"field\": \"naming_series\", \"defaultPattern\": \"REQ-#####\"}, \"listFields\": [\"req_date\", \"customer_id\"], \"noticeGuide\": null, \"filterFields\": [\"req_date\", \"customer_id\"], \"childDocTypes\": {\"items\": \"request_item\", \"quotation\": \"quotation\", \"sales_order\": \"sales_order\"}, \"childDocTypeKey\": \"request_item\", \"previewTemplate\": \"<!DOCTYPE html><div><div>{{docTypeName}}</div><div>Kode: {{code}}</div><div>Status: {{status}}</div><div>Mata Uang: {{currency}}</div><div>Total: {{grandTotal_currency}}</div><table><thead><tr><th>Produk</th><th>Qty</th><th>Harga</th><th>Diskon (%)</th></tr></thead><tbody>{{#rows}}<tr><td>{{row.product_id_label}}</td><td>{{row.qty}}</td><td>{{row.price}}</td><td>{{row.discount_percent}}</td></tr>{{/rows}}</tbody></table></div>\", \"assignmentEnabled\": true}','2026-01-29 09:57:17.644','2026-04-01 02:59:02.908','Plus',0),
('cmkza5r6k0007csrnuqan4bpl','request_item','Request Item','Item permintaan',NULL,'{\"naming\": {\"mode\": \"series\", \"field\": \"naming_series\", \"defaultPattern\": \"REQITEM-#####\"}, \"listFields\": [\"product_category\", \"product_id\", \"qty\"], \"filterFields\": [\"product_category\", \"product_id\", \"qty\"]}','2026-01-29 09:57:17.660','2026-02-02 08:47:18.839',NULL,0),
('cml4xwl370000n7rnpzeigyq9','coc','Certificate of Completion','Dokumen Berita Acara Serah Terima / COC',NULL,'{\"naming\": {\"mode\": \"series\", \"field\": \"naming_series\", \"defaultPattern\": \"COC-#####\"}, \"listFields\": [\"coc_date\", \"completion_date\", \"customer_id\", \"notes\"], \"noticeGuide\": null, \"filterFields\": [\"coc_date\", \"completion_date\", \"customer_id\"], \"notifyConfig\": {\"adminEnabled\": true, \"toastEnabled\": true, \"customerEnabled\": true}, \"childDocTypes\": {\"items\": \"coc_item\"}, \"childDocTypeKey\": \"coc_item\", \"previewTemplate\": \"<div>\\r\\n  <div style=\\\"display:flex;align-items:center;gap:12px;margin-bottom:12px;\\\">\\r\\n    <img src=\\\"{{fromCompanyLogo}}\\\" style=\\\"height:40px;object-fit:contain;border-radius:4px;\\\" />\\r\\n    <div style=\\\"padding:25px;margin-left:10px;width:400px;font-size:12px;color:#6b7280;\\\">{{fromCompanyAddress}}</div>\\r\\n  </div>\\r\\n  \\r\\n  <div style=\\\"font-size:20px;font-weight:600;margin-bottom:4px;width:100%;padding:5px;color:#333;background: #fff;border-top:1px solid #da3036;border-bottom:3px solid #da3036;text-align:center\\\">\\r\\n        {{docTypeName}}\\r\\n  </div>\\r\\n\\r\\n  <table style=\\\"width:100%;border-collapse:collapse;\\\">\\r\\n    <tr>\\r\\n      <td style=\\\"font-size:12px;padding:4px 6px;width:10%;color:#374151;\\\">CoC no</td>\\r\\n      <td style=\\\"font-size:12px;padding:4px 6px;width:40%;\\\">{{series_name_label}}</td>\\r\\n      <td style=\\\"font-size:12px;padding:4px 6px;width:10%;color:#374151;\\\">CoC Date</td>\\r\\n      <td style=\\\"font-size:12px;padding:4px 6px;width:40%;\\\">{{coc_date_label}}</td>\\r\\n    </tr>\\r\\n    <tr>\\r\\n      <td style=\\\"font-size:12px;padding:4px 6px;width:10%;color:#374151;\\\">Reference no</td>\\r\\n      <td style=\\\"font-size:12px;padding:4px 6px;width:40%;\\\">{{parent.parent.series_name}}</td>\\r\\n      <td style=\\\"font-size:12px;padding:4px 6px;width:10%;color:#374151;\\\">Reference Date</td>\\r\\n      <td style=\\\"font-size:12px;padding:4px 6px;width:40%;\\\">{{parent.parent.created_at}}</td>\\r\\n    </tr>\\r\\n  </table>\\r\\n\\r\\n  <div style=\\\"font-size:12px;font-weight:600;margin-bottom:4px;width:100%;padding:5px;color:#fff;background: #da3036\\\">\\r\\n        CUSTOMER\\r\\n  </div>\\r\\n  \\r\\n  <table style=\\\"width:100%;border-collapse:collapse;\\\">\\r\\n    <tr>\\r\\n      <td style=\\\"font-size:12px;padding:4px 6px;width:30%;color:#374151;width:13%\\\">Customer Name</td>\\r\\n      <td style=\\\"width:2%\\\">:</td>\\r\\n      <td style=\\\"font-size:12px;padding:4px 6px;\\\">{{company_name_label}}</td>\\r\\n    </tr>\\r\\n    <tr>\\r\\n      <td style=\\\"font-size:12px;padding:4px 6px;width:30%;color:#374151;width:13%\\\">Email Address</td>\\r\\n      <td style=\\\"width:2%\\\">:</td>\\r\\n      <td style=\\\"font-size:12px;padding:4px 6px;\\\">{{company_email_label}}</td>\\r\\n    </tr>\\r\\n    <tr>\\r\\n      <td style=\\\"font-size:12px;padding:4px 6px;width:30%;color:#374151;width:13%\\\">Phone No.</td>\\r\\n      <td style=\\\"width:2%\\\">:</td>\\r\\n      <td style=\\\"font-size:12px;padding:4px 6px;\\\">{{company_phonenumber_label}}</td>\\r\\n    </tr>\\r\\n    <tr>\\r\\n      <td style=\\\"font-size:12px;padding:4px 6px;width:30%;color:#374151;width:13%\\\">Address</td>\\r\\n      <td style=\\\"width:2%\\\">:</td>\\r\\n      <td style=\\\"font-size:12px;padding:4px 6px;\\\">{{company_address_label}}</td>\\r\\n    </tr>\\r\\n  </table>\\r\\n\\r\\n  \\r\\n</div>\\r\\n\\r\\n<p style=\\\"font-size:12px;margin-top:10px;margin-bottom:0px;padding:15px;padding-left:0px;border-top:1px solid #da3036;font-weight:bold\\\">This is to notify that the Company has completed the provisioning and implementation below : </p>\\r\\n<p style=\\\"font-size:12px;margin-top:0px;margin-bottom:20px;\\\">{{sow}}</p>\\r\\n\\r\\n<p style=\\\"font-size:12px;font-weight:bold;margin-top:10px;margin-bottom:0px;\\\">Notes:</p>\\r\\n<p style=\\\"font-size:12px;margin-top:0px;margin-bottom:20px;\\\">{{notes}}</p>\\r\\n\\r\\n<table style=\\\"width:100%;border-collapse:collapse;border:1px solid #ccc;\\\">\\r\\n    <tr>\\r\\n      <td style=\\\"font-size:12px;padding:10px;width:10%;color:#374151;font-weight:bold;background:#efefef\\\">RFS Date :</td>\\r\\n      <td style=\\\"font-size:12px;padding:10px;width:40%;padding-top:10px;background:#efefef\\\">{{rfs_date}}</td>\\r\\n      <td style=\\\"font-size:12px;padding:10px;width:10%;color:#374151;font-weight:bold;background:#efefef\\\">Billing Date :</td>\\r\\n      <td style=\\\"font-size:12px;padding:10px;width:40%;padding-top:10px;background:#efefef\\\">{{billing_date}}</td>\\r\\n    </tr>\\r\\n  </table>\\r\\n  \\r\\n <p style=\\\"font-size:10px;font-style:italic;margin-top:10px;margin:bottom:10px;\\\">Customer must sign and return this Certification of Completion (\\\"CoC\\\") within seven (7) calendar days from the CoC date.\\r\\nIf company does not receive the signed Certification of Completion within the Customer is deemed to have approve this Certification of Completion</p>\\r\\n\\r\\n<div style=\\\"font-size:12px;font-weight:600;margin-top:20px;margin-bottom:4px;width:100%;padding:5px;color:#fff;background: #da3036\\\">\\r\\n       SERVICES ITEMS\\r\\n</div>\\r\\n\\r\\n<div>\\r\\n  <table style=\\\"width:100%;border-collapse:collapse;\\\">\\r\\n    <thead>\\r\\n      <tr>\\r\\n        <th style=\\\"text-align:left;font-size:12px;padding:6px;border-bottom:1px solid #e5e7eb;\\\">\\r\\n          Services\\r\\n        </th>\\r\\n        <th style=\\\"text-align:left;font-size:12px;padding:6px;border-bottom:1px solid #e5e7eb;\\\">\\r\\n          Qty\\r\\n        </th>\\r\\n      </tr>\\r\\n    </thead>\\r\\n    <tbody>\\r\\n      {{#rows}}\\r\\n      <tr>\\r\\n        <td style=\\\"font-size:12px;padding:6px;border-bottom:1px solid #f3f4f6;\\\">\\r\\n          <div style=\\\"font-weight:600;\\\">\\r\\n            {{row.product_id_label}}\\r\\n          </div>\\r\\n          <div style=\\\"color:#6b7280;font-size:11px;margin-top:4px;\\\">\\r\\n            {{row.specs}}\\r\\n          </div>\\r\\n        </td>\\r\\n        <td style=\\\"font-size:12px;padding:6px;border-bottom:1px solid #f3f4f6;\\\">\\r\\n          {{row.qty}}\\r\\n        </td>\\r\\n      </tr>\\r\\n      {{/rows}}\\r\\n      \\r\\n      <div></div>\\r\\n      \\r\\n    </tbody>\\r\\n  </table>\\r\\n\\r\\n  <div style=\\\"display: flex; justify-content: space-between; margin-top: 32px; padding-top: 20px; text-align: left;\\\">\\r\\n    <div style=\\\"flex: 1; padding: 0 10px;\\\">\\r\\n      <div style=\\\"font-size: 12px; margin-bottom: 130px;\\\">PT. MettaDC Teknologi Indonesia</div>\\r\\n      <div style=\\\"font-size: 10px; border-top: 1px solid #efefef; padding-top: 4px;text-align:right\\\">Signature & Company Stamp </div>\\r\\n      <div style=\\\"font-size: 12px; border-top: 1px solid #efefef; padding-top: 4px;\\\">Name : Purwahono Trisna Murti</div>\\r\\n      <div style=\\\"font-size: 12px; border-top: 1px solid #efefef; padding-top: 4px;\\\">Title : Manager Technical Operational</div>\\r\\n      <div style=\\\"font-size: 12px; border-top: 1px solid #efefef; padding-top: 4px;\\\">Date : </div>\\r\\n    </div>\\r\\n    <div style=\\\"flex: 1; padding: 0 10px;\\\">\\r\\n      <div style=\\\"font-size: 12px; margin-bottom:130px;\\\">{{company_name_label}}</div>\\r\\n      <div style=\\\"font-size: 10px; border-top: 1px solid #efefef; padding-top: 4px;text-align:right\\\">Signature & Company Stamp </div>\\r\\n      <div style=\\\"font-size: 12px; border-top: 1px solid #efefef; padding-top: 4px;\\\">Name : </div>\\r\\n      <div style=\\\"font-size: 12px; border-top: 1px solid #efefef; padding-top: 4px;\\\">Title : </div>\\r\\n      <div style=\\\"font-size: 12px; border-top: 1px solid #efefef; padding-top: 4px;\\\">Date : </div>\\r\\n    </div>\\r\\n    \\r\\n  </div>\\r\\n</div>\", \"assignmentEnabled\": false}','2026-02-02 09:00:51.499','2026-03-18 03:24:30.079','Plus',1),
('cml4xwl4q0007n7rnbwn4gr6n','coc_item','COC Item','Item COC',NULL,'{\"naming\": {\"mode\": \"series\", \"field\": \"naming_series\", \"defaultPattern\": \"COCITEM-#####\"}, \"listFields\": [\"product_id\", \"qty\", \"price\", \"discount_percent\"]}','2026-02-02 09:00:51.577','2026-02-03 03:19:54.530',NULL,0),
('cmlal9r6q0000olrni50y5m7t','goods_in_request','Goods In Request','Permintaan Barang Masuk',NULL,'{\"naming\": {\"mode\": \"series\", \"field\": \"naming_series\", \"defaultPattern\": \"GIN-#####\"}, \"listFields\": [\"request_date\", \"sender_name\", \"sender_contact\", \"status\"], \"noticeGuide\": null, \"filterFields\": [\"request_date\", \"sender_name\", \"recipient_name\", \"sender_contact\", \"notes\", \"status\"], \"childDocTypes\": {\"items\": \"goods_in_item\"}, \"childDocTypeKey\": \"goods_in_item\", \"previewTemplate\": \"<!DOCTYPE html><div><h1 class=\\\"text-xl font-bold\\\">Goods In Request</h1><div>Code: {{code}}</div><div>Date: {{request_date}}</div><div>Sender: {{sender_name}}</div><div>Status: {{status}}</div><br/><table><thead><tr><th>Item</th><th>Qty</th><th>Serial No</th><th>Desc</th></tr></thead><tbody>{{#rows}}<tr><td>{{row.item_name}}</td><td>{{row.quantity}}</td><td>{{row.serial_number}}</td><td>{{row.description}}</td></tr>{{/rows}}</tbody></table></div>\", \"assignmentEnabled\": false}','2026-02-06 07:53:47.994','2026-04-21 08:47:52.829','Plus',0),
('cmlal9r8c0007olrnfvow06tf','goods_in_item','Goods In Item','Item Barang Masuk',NULL,'{\"noticeGuide\": null, \"assignmentEnabled\": false}','2026-02-06 07:53:48.058','2026-02-06 10:22:36.013',NULL,0),
('cmlal9r8x000colrn693ih8dl','goods_out_request','Goods Out Request','Permintaan Barang Keluar',NULL,'{\"naming\": {\"mode\": \"series\", \"field\": \"naming_series\", \"defaultPattern\": \"GOUT-#####\"}, \"listFields\": [\"request_date\", \"recipient_name\", \"recipient_contact\", \"status\"], \"noticeGuide\": null, \"filterFields\": [\"request_date\", \"recipient_name\", \"recipient_contact\", \"status\"], \"childDocTypes\": {\"items\": \"goods_out_item\"}, \"childDocTypeKey\": \"goods_out_item\", \"previewTemplate\": \"<!DOCTYPE html><div><h1 class=\\\"text-xl font-bold\\\">Goods Out Request</h1><div>Code: {{code}}</div><div>Date: {{request_date}}</div><div>Recipient: {{recipient_name}}</div><div>Status: {{status}}</div><br/><table><thead><tr><th>Item</th><th>Qty</th><th>Serial No</th><th>Desc</th></tr></thead><tbody>{{#rows}}<tr><td>{{row.item_name}}</td><td>{{row.quantity}}</td><td>{{row.serial_number}}</td><td>{{row.description}}</td></tr>{{/rows}}</tbody></table></div>\", \"assignmentEnabled\": false}','2026-02-06 07:53:48.079','2026-04-21 08:47:52.858','Plus',0),
('cmlal9r9j000jolrneyqg4y3d','goods_out_item','Goods Out Item','Item Barang Keluar',NULL,'{\"noticeGuide\": null, \"assignmentEnabled\": false}','2026-02-06 07:53:48.102','2026-02-06 10:22:26.116',NULL,0),
('cmmli5oc70000k9rnyn8aw3a8','visitor_request_item','Visitor',NULL,NULL,'{\"listFields\": [\"visitor_name\", \"nik\", \"ktp_file\"], \"filterFields\": []}','2026-03-11 03:51:49.086','2026-03-11 04:41:22.840',NULL,0),
('cmmli5oe90007k9rnvwijkl1y','visitor_request','Visitor Request',NULL,NULL,'{\"naming\": {\"mode\": \"series\", \"field\": \"naming_series\", \"defaultPattern\": \"VR-####\"}, \"listFields\": [\"visit_date\", \"purpose\"], \"filterFields\": [\"visit_date\"], \"childDocTypeKey\": \"visitor_request_item\"}','2026-03-11 03:51:49.185','2026-03-11 04:41:22.998','Users',0),
('cmmlqe9jb0000narnjeujecw3','support_ticket','Support Ticket',NULL,NULL,'{\"naming\": {\"mode\": \"series\", \"field\": \"naming_series\", \"defaultPattern\": \"TIC-#####\"}, \"listFields\": [\"subject\", \"status\", \"priority\", \"category\"], \"noticeGuide\": null, \"filterFields\": [\"status\", \"priority\", \"category\"], \"childDocTypeKey\": \"ticket_message\", \"assignmentEnabled\": false}','2026-03-11 07:42:26.751','2026-03-12 03:33:32.875','LifeBuoy',0),
('cmmlqe9kq0005narny4j2r07n','ticket_message','Ticket Message',NULL,NULL,'{\"listFields\": [\"message\", \"sender_name\", \"createdAt\"], \"noticeGuide\": null, \"assignmentEnabled\": false}','2026-03-11 07:42:26.809','2026-03-18 03:25:57.617','Plus',0),
('cmmvg77os0001mlrn5ybkyq4t','rack_patch_panel','Rack Patch Panel',NULL,NULL,'{\"naming\": {\"mode\": \"field\", \"field\": \"patch_panel_number\"}, \"listFields\": [\"patch_panel_number\"]}','2026-03-18 02:54:43.370','2026-03-18 03:16:32.033',NULL,0),
('cmmvgowlt0001v3rn43hnbvx1','rack_hardware','Rack Hardware',NULL,NULL,'{\"listFields\": [\"name\", \"serial_number\", \"electricity\", \"weight\"]}','2026-03-18 03:08:28.816','2026-03-18 03:16:32.076',NULL,0),
('cmmvi3o4k0000lbrn2jnietzz','cross_connect','Cross Connect',NULL,NULL,'{\"naming\": {\"mode\": \"series\", \"pattern\": \"CC-.YYYY.-.####.\"}, \"listFields\": [\"branch_id\", \"activation_date\", \"cross_connect_type\", \"request_type\", \"status\"], \"filterFields\": [\"branch_id\", \"cross_connect_type\", \"request_type\", \"status\"]}','2026-03-18 03:47:57.272','2026-03-30 04:57:12.378','Share2',0),
('cmo84gup40007s58o77hm25oq','subscription_management','Subscription','Manajemen langganan recurring',NULL,'{\"listFields\": [\"service_name\", \"customer_id\", \"start_date\", \"end_date\", \"next_billing_date\"], \"noticeGuide\": null, \"filterFields\": [\"service_name\", \"customer_id\", \"start_date\", \"end_date\", \"next_billing_date\"], \"assignmentEnabled\": false}','2026-04-21 04:27:00.327','2026-04-24 07:54:39.844','LayoutGrid',0),
('cmockogfh00006s8od6x3z7hb','invoice','Invoices','Invoice billing untuk tagihan recurring',NULL,'{\"listFields\": [\"invoice_number\", \"subscription_id\", \"customer_id\", \"invoice_date\", \"due_date\", \"total_amount\", \"status\"], \"filterFields\": [\"invoice_number\", \"subscription_id\", \"customer_id\", \"invoice_date\", \"due_date\", \"status\"], \"previewTemplate\": \"<div style=\\\"font-family: ui-sans-serif, system-ui, -apple-system; color: #1f2937; line-height: 1.5;\\\">\\n  <table style=\\\"width: 100%; border-collapse: collapse; margin-bottom: 20px;\\\">\\n    <tr>\\n      <td style=\\\"vertical-align: top;\\\">\\n        <img src=\\\"{{fromCompanyLogo}}\\\" style=\\\"height: 50px; object-fit: contain;\\\" />\\n      </td>\\n      <td style=\\\"text-align: right; vertical-align: top;\\\">\\n        <h1 style=\\\"font-size: 24px; font-weight: 800; color: #da3036; margin: 0; letter-spacing: -0.025em;\\\">INVOICE</h1>\\n        <div style=\\\"font-size: 12px; color: #6b7280; margin-top: 4px;\\\">{{invoice_number}}</div>\\n      </td>\\n    </tr>\\n  </table>\\n\\n  <table style=\\\"width: 100%; border-collapse: collapse; margin-bottom: 25px;\\\">\\n    <tr>\\n      <td style=\\\"width: 50%; vertical-align: top; padding-right: 20px;\\\">\\n        <div style=\\\"font-size: 11px; font-weight: 700; color: #fff; background: #da3036; padding: 4px 8px; margin-bottom: 8px; display: inline-block;\\\">FROM</div>\\n        <div style=\\\"font-size: 12px;\\\">\\n          <div style=\\\"font-weight: 700; font-size: 13px; margin-bottom: 2px;\\\">{{fromCompanyName}}</div>\\n          <div style=\\\"color: #4b5563; font-size: 11px; line-height: 1.4;\\\">{{fromCompanyAddress}}</div>\\n          <div style=\\\"margin-top: 4px; font-size: 11px;\\\">\\n            <span style=\\\"color: #6b7280;\\\">Email:</span> {{fromCompanyEmail}}<br/>\\n            <span style=\\\"color: #6b7280;\\\">Phone:</span> {{fromCompanyPhone}}\\n          </div>\\n        </div>\\n      </td>\\n      <td style=\\\"width: 50%; vertical-align: top; padding-left: 20px;\\\">\\n        <div style=\\\"font-size: 11px; font-weight: 700; color: #fff; background: #da3036; padding: 4px 8px; margin-bottom: 8px; display: inline-block;\\\">BILL TO</div>\\n        <div style=\\\"font-size: 12px;\\\">\\n          <div style=\\\"font-weight: 700; font-size: 13px; margin-bottom: 2px;\\\">{{customer_id_label}}</div>\\n          <div style=\\\"color: #4b5563; font-size: 11px; line-height: 1.4;\\\">{{customerAddress}}</div>\\n          <div style=\\\"margin-top: 4px; font-size: 11px;\\\">\\n            <span style=\\\"color: #6b7280;\\\">Email:</span> {{customerEmail}}<br/>\\n            <span style=\\\"color: #6b7280;\\\">Phone:</span> {{customerPhoneNumber}}\\n          </div>\\n        </div>\\n      </td>\\n    </tr>\\n  </table>\\n\\n  <div style=\\\"font-size: 11px; font-weight: 700; color: #fff; background: #4b5563; padding: 4px 8px; margin-bottom: 10px;\\\">INVOICE DETAILS</div>\\n  <table style=\\\"width: 100%; border-collapse: collapse; margin-bottom: 25px; font-size: 11px;\\\">\\n    <tr>\\n      <td style=\\\"padding: 4px 0; color: #6b7280; width: 20%;\\\">Invoice Date</td>\\n      <td style=\\\"padding: 4px 0; font-weight: 600;\\\">: {{invoice_date}}</td>\\n      <td style=\\\"padding: 4px 0; color: #6b7280; width: 20%;\\\">Billing Period</td>\\n      <td style=\\\"padding: 4px 0; font-weight: 600;\\\">: {{billing_period_start}} - {{billing_period_end}}</td>\\n    </tr>\\n    <tr>\\n      <td style=\\\"padding: 4px 0; color: #6b7280;\\\">Due Date</td>\\n      <td style=\\\"padding: 4px 0; font-weight: 600; color: #da3036;\\\">: {{due_date}}</td>\\n      <td style=\\\"padding: 4px 0; color: #6b7280;\\\">Subscription</td>\\n      <td style=\\\"padding: 4px 0; font-weight: 600;\\\">: {{subscription_id_label}}</td>\\n    </tr>\\n  </table>\\n\\n  <table style=\\\"width: 100%; border-collapse: collapse; margin-bottom: 20px;\\\">\\n    <thead>\\n      <tr style=\\\"background: #f9fafb; border-top: 2px solid #da3036; border-bottom: 1px solid #e5e7eb;\\\">\\n        <th style=\\\"text-align: left; font-size: 11px; padding: 10px 8px; color: #374151; font-weight: 700;\\\">DESCRIPTION</th>\\n        <th style=\\\"text-align: right; font-size: 11px; padding: 10px 8px; color: #374151; font-weight: 700; width: 150px;\\\">AMOUNT</th>\\n      </tr>\\n    </thead>\\n    <tbody>\\n      <tr>\\n        <td style=\\\"font-size: 11px; padding: 12px 8px; border-bottom: 1px solid #f3f4f6; vertical-align: top;\\\">\\n          <div style=\\\"font-weight: 700; color: #111827; margin-bottom: 4px;\\\">Monthly Recurring Charge (MRC)</div>\\n          <div style=\\\"font-size: 10px; color: #6b7280; line-height: 1.4; white-space: pre-line;\\\">{{prorate_details}}</div>\\n        </td>\\n        <td style=\\\"text-align: right; font-size: 11px; padding: 12px 8px; border-bottom: 1px solid #f3f4f6; font-weight: 600; vertical-align: top;\\\">\\n          {{subtotal_currency}}\\n        </td>\\n      </tr>\\n    </tbody>\\n  </table>\\n\\n  <table style=\\\"width: 100%; border-collapse: collapse;\\\">\\n    <tr>\\n      <td style=\\\"width: 60%;\\\"></td>\\n      <td style=\\\"width: 40%;\\\">\\n        <table style=\\\"width: 100%; border-collapse: collapse; font-size: 11px;\\\">\\n          <tr>\\n            <td style=\\\"padding: 6px 8px; color: #6b7280;\\\">Subtotal</td>\\n            <td style=\\\"padding: 6px 8px; text-align: right; font-weight: 600;\\\">{{subtotal_currency}}</td>\\n          </tr>\\n          <tr>\\n            <td style=\\\"padding: 6px 8px; color: #6b7280;\\\">Tax (11%)</td>\\n            <td style=\\\"padding: 6px 8px; text-align: right; font-weight: 600;\\\">{{tax_currency}}</td>\\n          </tr>\\n          <tr style=\\\"background: #fef2f2; color: #da3036;\\\">\\n            <td style=\\\"padding: 10px 8px; font-weight: 800; border-top: 2px solid #da3036; font-size: 13px;\\\">TOTAL AMOUNT</td>\\n            <td style=\\\"padding: 10px 8px; text-align: right; font-weight: 800; border-top: 2px solid #da3036; font-size: 13px;\\\">{{total_amount_currency}}</td>\\n          </tr>\\n        </table>\\n      </td>\\n    </tr>\\n  </table>\\n\\n  <div style=\\\"margin-top: 40px; border-top: 1px dashed #e5e7eb; padding-top: 15px;\\\">\\n    <div style=\\\"font-size: 9px; color: #9ca3af; line-height: 1.4;\\\">\\n      <strong>Payment Note:</strong><br/>\\n      Please ensure payment is made before the due date to avoid service interruption. \\n      Kindly include the invoice number in your transfer description for faster verification.\\n    </div>\\n    \\n    <table style=\\\"width: 100%; border-collapse: collapse; margin-top: 40px;\\\">\\n      <tr>\\n        <td style=\\\"width: 50%; text-align: center; vertical-align: bottom;\\\">\\n          <div style=\\\"font-size: 11px; margin-bottom: 50px; color: #374151;\\\">Customer Acceptance</div>\\n          <div style=\\\"border-top: 1px solid #d1d5db; width: 140px; margin: 0 auto;\\\"></div>\\n          <div style=\\\"font-size: 9px; margin-top: 4px; color: #6b7280;\\\">(Authorized Signature & Stamp)</div>\\n        </td>\\n        <td style=\\\"width: 50%; text-align: center; vertical-align: bottom;\\\">\\n          <div style=\\\"font-size: 11px; margin-bottom: 50px; color: #374151;\\\">PT MettaDC Teknologi Indonesia</div>\\n          <div style=\\\"border-top: 1px solid #d1d5db; width: 140px; margin: 0 auto;\\\"></div>\\n          <div style=\\\"font-size: 9px; margin-top: 4px; color: #6b7280;\\\">Finance Department</div>\\n        </td>\\n      </tr>\\n    </table>\\n  </div>\\n</div>\"}','2026-04-24 07:11:53.636','2026-04-24 08:04:38.984','Receipt',1),
('cmp3jnkoj00004krncritdvs2','help_page','Help Page','Konten halaman bantuan',NULL,'{\"items\": [{\"id\": \"e4207294-83cc-4ae1-b1c3-f60e5459f120\", \"html\": \"\", \"slug\": \"cara-membayar-invoices\", \"title\": \"Cara membayar invoices\"}], \"helpHtml\": \"<h2>Bantuan</h2><p>Konten bantuan belum diatur.</p>\", \"noticeGuide\": null, \"assignmentEnabled\": false}','2026-05-13 04:12:59.458','2026-07-27 04:38:37.465','Plus',0);
/*!40000 ALTER TABLE `DocType` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `DocWorkflow`
--

DROP TABLE IF EXISTS `DocWorkflow`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `DocWorkflow` (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `docTypeId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `branchId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `config` json DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `dontOverrideStatus` tinyint(1) NOT NULL DEFAULT '0',
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `DocWorkflow_docTypeId_branchId_key` (`docTypeId`,`branchId`),
  KEY `DocWorkflow_branchId_idx` (`branchId`),
  CONSTRAINT `DocWorkflow_branchId_fkey` FOREIGN KEY (`branchId`) REFERENCES `Branch` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `DocWorkflow_docTypeId_fkey` FOREIGN KEY (`docTypeId`) REFERENCES `DocType` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `DocWorkflow`
--

LOCK TABLES `DocWorkflow` WRITE;
/*!40000 ALTER TABLE `DocWorkflow` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `DocWorkflow` VALUES
('cmkqlpn5w000i2urnetvr3u41','cmknoljb70000bjrnetv689gg','cmk6k26a1000cukrnkf8vku40','Default','{\"states\": [{\"name\": \"Draft\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 0}, {\"name\": \"Send Customer\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 1}, {\"name\": \"Approved\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 1}, {\"name\": \"Cancelled\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 2}, {\"name\": \"Deal\", \"actions\": [\"create:sales_order\"], \"updates\": {}, \"optional\": false, \"docStatus\": 1}], \"transitions\": [{\"to\": \"Send Customer\", \"from\": \"Draft\", \"roles\": [\"Sales\"]}, {\"to\": \"Approved\", \"from\": \"Send Customer\", \"roles\": [\"Customer\"]}, {\"to\": \"Approved\", \"from\": \"Send Customer\", \"roles\": [\"Sales\"]}, {\"to\": \"Deal\", \"from\": \"Approved\", \"roles\": [\"Sales\"]}, {\"to\": \"Approved\", \"from\": \"Deal\", \"roles\": [\"Sales\"]}, {\"to\": \"Cancelled\", \"from\": \"Draft\", \"roles\": [\"Sales\"]}]}','2026-01-23 08:10:45.756','2026-02-02 07:22:46.278',0,1),
('cmkwbjft8000fw5rn4357uhxm','cmkw4cq7u0005btrnhgh11cdg','cmk6k26a1000cukrnkf8vku40','Default','{\"states\": [{\"name\": \"Draft\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 0}, {\"name\": \"Pending Approval\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 1}, {\"name\": \"Approved\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 1}, {\"name\": \"Paid\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 1}, {\"name\": \"Completed\", \"actions\": [\"create:work_order\"], \"updates\": {}, \"optional\": false, \"docStatus\": 1}, {\"name\": \"Cancelled\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 2}], \"transitions\": [{\"to\": \"Pending Approval\", \"from\": \"Draft\", \"roles\": [\"Sales\"]}, {\"to\": \"Approved\", \"from\": \"Pending Approval\", \"roles\": [\"Customer\"]}, {\"to\": \"Approved\", \"from\": \"Pending Approval\", \"roles\": [\"Sales\"]}, {\"to\": \"Paid\", \"from\": \"Approved\", \"roles\": [\"Sales\"]}, {\"to\": \"Completed\", \"from\": \"Paid\", \"roles\": [\"Sales\"]}]}','2026-01-27 08:12:37.119','2026-04-22 09:33:57.740',0,1),
('cmkz8de9t000lswrnbeom6xin','cmkz6vsv20008hornl8c3i9w4','cmk6k26a1000cukrnkf8vku40','Default','{\"states\": [{\"name\": \"Pending Approval\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 0}, {\"name\": \"Approved\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 1}, {\"name\": \"In Progress\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 1}, {\"name\": \"Completed\", \"actions\": [\"create:coc\"], \"updates\": {}, \"optional\": false, \"docStatus\": 1}, {\"name\": \"Cancelled\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 2}, {\"name\": \"Rejected\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 2}], \"transitions\": [{\"to\": \"Approved\", \"from\": \"Pending Approval\", \"roles\": [\"Operational Manager\"]}, {\"to\": \"Rejected\", \"from\": \"Pending Approval\", \"roles\": [\"Operational Manager\"]}, {\"to\": \"In Progress\", \"from\": \"Approved\", \"roles\": [\"Operational Manager\"]}, {\"to\": \"In Progress\", \"from\": \"Approved\", \"roles\": [\"Engginer\"]}, {\"to\": \"Completed\", \"from\": \"In Progress\", \"roles\": [\"Operational Manager\"]}, {\"to\": \"Completed\", \"from\": \"In Progress\", \"roles\": [\"Engginer\"]}, {\"to\": \"In Progress\", \"from\": \"Completed\", \"roles\": [\"Engginer\"]}, {\"to\": \"Cancelled\", \"from\": \"Pending\", \"roles\": [\"Operational Manager\"]}]}','2026-01-29 09:07:14.933','2026-02-05 07:42:43.450',0,1),
('cmkz9g71v00002brnhlwscb77','cmkz6vsv20008hornl8c3i9w4',NULL,'workflow cyber pop 1','{\"states\": [{\"name\": \"Pending Approval\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 0}, {\"name\": \"Approved\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 1}, {\"name\": \"In Progress\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 1}, {\"name\": \"Completed\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 1}, {\"name\": \"Cancelled\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 2}], \"transitions\": [{\"to\": \"Approved\", \"from\": \"Pending Approval\", \"roles\": [\"Operational Manager\"]}, {\"to\": \"In Progress\", \"from\": \"Approved\", \"roles\": [\"Engginer\"]}, {\"to\": \"Completed\", \"from\": \"In Progress\", \"roles\": [\"Engginer\"]}, {\"to\": \"Cancelled\", \"from\": \"Pending\", \"roles\": [\"Operational Manager\"]}]}','2026-01-29 09:37:25.165','2026-02-05 07:42:43.481',0,0),
('cmkz9mu7400012brna8guhvdu','cmknoljb70000bjrnetv689gg',NULL,'Default','{\"states\": [{\"name\": \"Draft\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 0}, {\"name\": \"Publish\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 1}, {\"name\": \"Cancelled\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 2}, {\"name\": \"Set As Deal\", \"actions\": [\"create:sales_order\"], \"updates\": {}, \"optional\": false, \"docStatus\": 1}], \"transitions\": [{\"to\": \"Publish\", \"from\": \"Draft\", \"roles\": [\"Sales\"]}, {\"to\": \"Cancel\", \"from\": \"Draft\", \"roles\": [\"Sales\"]}, {\"to\": \"Cancel\", \"from\": \"Publish\", \"roles\": [\"Sales\"]}, {\"to\": \"Set As Deal\", \"from\": \"Publish\", \"roles\": [\"Sales\"]}, {\"to\": \"Publish\", \"from\": \"Set As Deal\", \"roles\": [\"Sales\"]}]}','2026-01-29 09:42:35.102','2026-02-02 07:22:46.288',0,0),
('cmkz9nd0r00022brnptw9oggh','cmknoljb70000bjrnetv689gg','cmkfbdazb0000airn2albkfd3','Default','{\"states\": [{\"name\": \"Draft\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 0}, {\"name\": \"Publish\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 1}, {\"name\": \"Cancelled\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 2}, {\"name\": \"Set As Deal\", \"actions\": [\"create:sales_order\"], \"updates\": {}, \"optional\": false, \"docStatus\": 1}], \"transitions\": [{\"to\": \"Publish\", \"from\": \"Draft\", \"roles\": [\"Sales\"]}, {\"to\": \"Cancel\", \"from\": \"Draft\", \"roles\": [\"Sales\"]}, {\"to\": \"Cancel\", \"from\": \"Publish\", \"roles\": [\"Sales\"]}, {\"to\": \"Set As Deal\", \"from\": \"Publish\", \"roles\": [\"Sales\"]}, {\"to\": \"Publish\", \"from\": \"Set As Deal\", \"roles\": [\"Sales\"]}]}','2026-01-29 09:42:59.493','2026-02-02 07:22:46.288',0,0),
('cml0at7np000a2brn8w087bsx','cmkza5r640000csrnn4eccui8','cmk6k26a1000cukrnkf8vku40','Default','{\"states\": [{\"name\": \"Draft\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 0}, {\"name\": \"Pending\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 0}, {\"name\": \"Send Quotation\", \"actions\": [\"create:quotation\"], \"updates\": {}, \"optional\": false, \"docStatus\": 1}, {\"name\": \"Send Sales Order\", \"actions\": [\"create:sales_order\"], \"updates\": {}, \"optional\": false, \"docStatus\": 1}, {\"name\": \"Sales Ordered\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 1}, {\"name\": \"Progress\", \"actions\": [\"create:work_order\"], \"updates\": {}, \"optional\": false, \"docStatus\": 1}, {\"name\": \"Work In Progress\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 1}, {\"name\": \"Ready for Acceptance\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 1}, {\"name\": \"Completed\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 1}], \"transitions\": [{\"to\": \"Pending\", \"from\": \"Draft\", \"roles\": [\"Customer\"]}, {\"to\": \"Pending\", \"from\": \"Draft\", \"roles\": [\"Sales\"]}, {\"to\": \"Send Quotation\", \"from\": \"Pending\", \"roles\": [\"Sales\"]}, {\"to\": \"Send Sales Order\", \"from\": \"Pending\", \"roles\": [\"Sales\"]}, {\"to\": \"Progress\", \"from\": \"Pending\", \"roles\": [\"Sales\"]}, {\"to\": \"Sales Ordered\", \"from\": \"Send Quotation\", \"roles\": [\"Sales\"]}, {\"to\": \"Sales Ordered\", \"from\": \"Send Sales Order\", \"roles\": [\"Sales\"]}, {\"to\": \"Work In Progress\", \"from\": \"Sales Ordered\", \"roles\": [\"Sales\"]}, {\"to\": \"Ready for Acceptance\", \"from\": \"Progress\", \"roles\": [\"Operation\"]}, {\"to\": \"Ready for Acceptance\", \"from\": \"Work In Progress\", \"roles\": [\"Operation\"]}, {\"to\": \"Ready for Acceptance\", \"from\": \"Work In Progress\", \"roles\": [\"Operation\"]}, {\"to\": \"Completed\", \"from\": \"Ready for Acceptance\", \"roles\": [\"Sales\"]}]}','2026-01-30 03:03:18.241','2026-04-01 02:55:03.000',0,1),
('cml4wtp8u0000airnq7q3rjaq','cmkz6vsv20008hornl8c3i9w4','cmkfbdazb0000airn2albkfd3','workflow cyber pop 1','{\"states\": [{\"name\": \"Pending Approval\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 0}, {\"name\": \"Approved\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 1}, {\"name\": \"In Progress\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 1}, {\"name\": \"Completed\", \"actions\": [\"create:coc\"], \"updates\": {}, \"optional\": false, \"docStatus\": 1}, {\"name\": \"Cancelled\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 2}], \"transitions\": [{\"to\": \"Approved\", \"from\": \"Pending Approval\", \"roles\": [\"Operational Manager\"]}, {\"to\": \"In Progress\", \"from\": \"Approved\", \"roles\": [\"Engginer\"]}, {\"to\": \"Completed\", \"from\": \"In Progress\", \"roles\": [\"Engginer\"]}, {\"to\": \"Cancelled\", \"from\": \"Pending\", \"roles\": [\"Operational Manager\"]}]}','2026-02-02 08:30:37.318','2026-02-05 07:42:43.481',0,0),
('cml4wxrwh0001airn6u3dr0vr','cmkmdaan300f0vfrnluov51ak','cmk6k26a1000cukrnkf8vku40','Default','{\"states\": [{\"name\": \"Available\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 0}, {\"name\": \"Maintenance\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 1}, {\"name\": \"Reserved\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 0}, {\"name\": \"Active\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 1}, {\"name\": \"Deactive\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 1}], \"transitions\": [{\"to\": \"Reserved\", \"from\": \"Available\", \"roles\": [\"Engginer\"]}, {\"to\": \"Active\", \"from\": \"Available\", \"roles\": [\"Engginer\"]}, {\"to\": \"Maintenance\", \"from\": \"Active\", \"roles\": [\"Engginer\"]}, {\"to\": \"Available\", \"from\": \"Active\", \"roles\": [\"Engginer\"]}, {\"to\": \"Deactive\", \"from\": \"Active\", \"roles\": [\"Engginer\"]}, {\"to\": \"Active\", \"from\": \"Available\", \"roles\": [\"Engginer\"]}]}','2026-02-02 08:33:47.391','2026-04-02 04:33:39.957',0,1),
('cml4wxvck0002airnzwriovgb','cmkmdaan300f0vfrnluov51ak','cmkfbdazb0000airn2albkfd3','Default','{\"states\": [{\"name\": \"Available\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 0}, {\"name\": \"Maintenance\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 1}, {\"name\": \"Reserved\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 0}, {\"name\": \"Active\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 1}, {\"name\": \"Deactive\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 1}], \"transitions\": [{\"to\": \"Reserved\", \"from\": \"Available\", \"roles\": [\"Engginer\"]}, {\"to\": \"Active\", \"from\": \"Available\", \"roles\": [\"Engginer\"]}, {\"to\": \"Maintenance\", \"from\": \"Active\", \"roles\": [\"Engginer\"]}, {\"to\": \"Available\", \"from\": \"Active\", \"roles\": [\"Engginer\"]}, {\"to\": \"Deactive\", \"from\": \"Active\", \"roles\": [\"Engginer\"]}, {\"to\": \"Active\", \"from\": \"Available\", \"roles\": [\"Engginer\"]}]}','2026-02-02 08:33:51.858','2026-04-02 04:33:40.076',0,0),
('cml4ybnsd000cairn3bswmmnj','cml4xwl370000n7rnpzeigyq9','cmkfbdazb0000airn2albkfd3','Default','{\"states\": [{\"name\": \"Draft\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 0}, {\"name\": \"Publish\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 1}, {\"name\": \"Cancelled\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 2}], \"transitions\": [{\"to\": \"Publish\", \"from\": \"Draft\", \"roles\": [\"Engginer\"]}, {\"to\": \"Publish\", \"from\": \"Draft\", \"roles\": [\"Operational Manager\"]}, {\"to\": \"Cancel\", \"from\": \"Draft\", \"roles\": [\"Engginer\"]}]}','2026-02-02 09:12:34.856','2026-02-04 09:17:27.943',0,0),
('cml513e8w000kairn16xnkho8','cml4xwl370000n7rnpzeigyq9','cmk6k26a1000cukrnkf8vku40','Default','{\"states\": [{\"name\": \"Draft\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 0}, {\"name\": \"Publish\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 1}, {\"name\": \"Cancelled\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 2}], \"transitions\": [{\"to\": \"Publish\", \"from\": \"Draft\", \"roles\": [\"Operational Manager\"]}, {\"to\": \"Publish\", \"from\": \"Draft\", \"roles\": [\"Engginer\"]}, {\"to\": \"Cancel\", \"from\": \"Publish\", \"roles\": [\"Operational Manager\"]}]}','2026-02-02 10:30:08.092','2026-02-04 09:17:27.909',0,1),
('cmlaq8z7x0000ztrn87ikdki9','cmlal9r8c0007olrnfvow06tf',NULL,'Default','{\"states\": [], \"transitions\": []}','2026-02-06 10:13:09.793','2026-02-06 10:14:47.785',0,1),
('cmlaqb5kr0001ztrnaulwu2ic','cmlal9r6q0000olrni50y5m7t',NULL,'Default','{\"states\": [{\"name\": \"Draft\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 0}, {\"name\": \"Submited\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 1}, {\"name\": \"Approved\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 1}, {\"name\": \"Rejected\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 2}, {\"name\": \"Completed\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 1}], \"transitions\": [{\"to\": \"Submited\", \"from\": \"Draft\", \"roles\": [\"Customer\"]}, {\"to\": \"Approved\", \"from\": \"Submited\", \"roles\": [\"Sales\"]}, {\"to\": \"Rejected\", \"from\": \"Submited\", \"roles\": [\"Sales\"]}, {\"to\": \"Completed\", \"from\": \"Approved\", \"roles\": [\"Sales\"]}]}','2026-02-06 10:14:51.382','2026-03-05 01:30:16.096',0,0),
('cmlaqduya0002ztrnur2vzdrn','cmlal9r8x000colrn693ih8dl',NULL,'Default','{\"states\": [{\"name\": \"Draft\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 0}, {\"name\": \"Submited\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 1}, {\"name\": \"Approved\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 1}, {\"name\": \"Rejected\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 2}, {\"name\": \"Completed\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 1}], \"transitions\": [{\"to\": \"Submited\", \"from\": \"Draft\", \"roles\": [\"Customer\"]}, {\"to\": \"Approved\", \"from\": \"Submited\", \"roles\": [\"Sales\"]}, {\"to\": \"Rejected\", \"from\": \"Submited\", \"roles\": [\"Sales\"]}, {\"to\": \"Completed\", \"from\": \"Approved\", \"roles\": [\"Sales\"]}]}','2026-02-06 10:16:57.581','2026-03-05 01:58:29.358',0,0),
('cmlaqj2iv0005ztrnv47zqgan','cmlal9r8x000colrn693ih8dl','cmk6k26a1000cukrnkf8vku40','Default','{\"states\": [{\"name\": \"Submited\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 1}, {\"name\": \"Approved\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 1}, {\"name\": \"Rejected\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 2}, {\"name\": \"Completed\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 1}], \"transitions\": [{\"to\": \"Approved\", \"from\": \"Submited\", \"roles\": [\"Finances\"]}, {\"to\": \"Rejected\", \"from\": \"Submited\", \"roles\": [\"Finances\"]}, {\"to\": \"Completed\", \"from\": \"Approved\", \"roles\": [\"Sales\"]}]}','2026-02-06 10:21:00.670','2026-03-05 01:58:29.358',0,0),
('cmlaqjnlo0006ztrntdrbb91l','cmlal9r6q0000olrni50y5m7t','cmk6k26a1000cukrnkf8vku40','Default','{\"states\": [{\"name\": \"Submited\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 1}, {\"name\": \"Approved\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 1}, {\"name\": \"Rejected\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 2}, {\"name\": \"Completed\", \"actions\": [\"create:goods_in_item\"], \"updates\": {}, \"optional\": false, \"docStatus\": 1}], \"transitions\": [{\"to\": \"Approved\", \"from\": \"Submited\", \"roles\": [\"Sales\"]}, {\"to\": \"Rejected\", \"from\": \"Submited\", \"roles\": [\"Sales\"]}, {\"to\": \"Completed\", \"from\": \"Approved\", \"roles\": [\"Sales\"]}]}','2026-02-06 10:21:27.985','2026-03-05 01:30:16.096',0,0),
('cmmbfllsl0005u9rn1y15xxoe','cmlal9r6q0000olrni50y5m7t','cmkfbdazb0000airn2albkfd3','Default','{\"states\": [{\"name\": \"Submited\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 1}, {\"name\": \"Approved\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 1}, {\"name\": \"Rejected\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 2}, {\"name\": \"Completed\", \"actions\": [\"create:goods_in_item\"], \"updates\": {}, \"optional\": false, \"docStatus\": 1}], \"transitions\": [{\"to\": \"Approved\", \"from\": \"Submited\", \"roles\": [\"Sales\"]}, {\"to\": \"Rejected\", \"from\": \"Submited\", \"roles\": [\"Sales\"]}, {\"to\": \"Completed\", \"from\": \"Approved\", \"roles\": [\"Security\"]}]}','2026-03-04 02:42:31.694','2026-03-05 01:30:16.082',0,1),
('cmmctgtlj000yu9rnjs2i5pzc','cmlal9r8x000colrn693ih8dl','cmkfbdazb0000airn2albkfd3','Default','{\"states\": [{\"name\": \"Submited\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 1}, {\"name\": \"Approved\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 1}, {\"name\": \"Rejected\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 2}, {\"name\": \"Completed\", \"actions\": [\"create:goods_in_item\"], \"updates\": {}, \"optional\": false, \"docStatus\": 1}], \"transitions\": [{\"to\": \"Approved\", \"from\": \"Submited\", \"roles\": [\"Sales\"]}, {\"to\": \"Rejected\", \"from\": \"Submited\", \"roles\": [\"Sales\"]}, {\"to\": \"Completed\", \"from\": \"Approved\", \"roles\": [\"Security\"]}]}','2026-03-05 01:58:29.329','2026-03-05 01:58:29.329',0,1),
('cmmlje2hj00002jrna6gajv78','cmmli5oe90007k9rnvwijkl1y','cmkfbdazb0000airn2albkfd3','Default','{\"states\": [{\"name\": \"Pending\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 0}, {\"name\": \"Approved\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 1}, {\"name\": \"Rejected\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 1}], \"transitions\": [{\"to\": \"Approved\", \"from\": \"Pending\", \"roles\": [\"Sales\"]}, {\"to\": \"Rejected\", \"from\": \"Pending\", \"roles\": [\"Sales\"]}]}','2026-03-11 04:26:20.307','2026-03-13 04:19:21.062',0,0),
('cmmlqepdu0000vyrns4iy22uz','cmmlqe9jb0000narnjeujecw3',NULL,'Support Ticket Workflow','{\"states\": [{\"name\": \"Open\", \"docStatus\": 0}, {\"name\": \"In Progress\", \"docStatus\": 0}, {\"name\": \"Customer Reply\", \"docStatus\": 0}, {\"name\": \"Admin Reply\", \"docStatus\": 0}, {\"name\": \"Resolved\", \"docStatus\": 1}, {\"name\": \"Closed\", \"docStatus\": 1}], \"transitions\": [{\"to\": \"In Progress\", \"from\": \"Open\", \"roles\": [\"Admin\"]}, {\"to\": \"Admin Reply\", \"from\": \"Open\", \"roles\": [\"Admin\"]}, {\"to\": \"Admin Reply\", \"from\": \"In Progress\", \"roles\": [\"Admin\"]}, {\"to\": \"Customer Reply\", \"from\": \"Admin Reply\", \"roles\": [\"Customer\"]}, {\"to\": \"Admin Reply\", \"from\": \"Customer Reply\", \"roles\": [\"Admin\"]}, {\"to\": \"Resolved\", \"from\": \"Admin Reply\", \"roles\": [\"Admin\"]}, {\"to\": \"Resolved\", \"from\": \"Customer Reply\", \"roles\": [\"Admin\"]}, {\"to\": \"Resolved\", \"from\": \"In Progress\", \"roles\": [\"Admin\"]}, {\"to\": \"Closed\", \"from\": \"Resolved\", \"roles\": [\"Admin\", \"Customer\"]}, {\"to\": \"Closed\", \"from\": \"Open\", \"roles\": [\"Customer\"]}]}','2026-03-11 07:42:47.298','2026-03-12 03:23:32.468',0,1),
('cmmoe0sbf000l2ernq8vz9r1n','cmmli5oe90007k9rnvwijkl1y','cmk6k26a1000cukrnkf8vku40','Default','{\"states\": [{\"name\": \"Pending\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 0}, {\"name\": \"Approved\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 1}, {\"name\": \"Rejected\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 1}], \"transitions\": [{\"to\": \"Approved\", \"from\": \"Pending\", \"roles\": [\"Sales\"]}, {\"to\": \"Rejected\", \"from\": \"Pending\", \"roles\": [\"Sales\"]}]}','2026-03-13 04:19:21.047','2026-03-13 04:19:21.047',0,1),
('cmn88gxfq00089mrn2fvguf02','cmmvi3o4k0000lbrn2jnietzz','cmkfbdazb0000airn2albkfd3','Default','{\"states\": [{\"name\": \"Pending\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 1}, {\"name\": \"Send Sales Order\", \"actions\": [\"create:sales_order\"], \"updates\": {}, \"optional\": false, \"docStatus\": 1}, {\"name\": \"Sales Ordered\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 1}, {\"name\": \"Progress\", \"actions\": [\"create:work_order\"], \"updates\": {}, \"optional\": false, \"docStatus\": 1}, {\"name\": \"Work In Progress\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 1}, {\"name\": \"Ready for Acceptance\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 1}, {\"name\": \"Completed\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 1}], \"transitions\": [{\"to\": \"Send Sales Order\", \"from\": \"Pending\", \"roles\": [\"Sales\"]}, {\"to\": \"Pending\", \"from\": \"Send Sales Order\", \"roles\": [\"Sales\"]}, {\"to\": \"Progress\", \"from\": \"Pending\", \"roles\": [\"Sales\"]}, {\"to\": \"Sales Ordered\", \"from\": \"Send Sales Order\", \"roles\": [\"Sales\"]}, {\"to\": \"Work In Progress\", \"from\": \"Sales Ordered\", \"roles\": [\"Sales\"]}, {\"to\": \"Ready for Acceptance\", \"from\": \"Progress\", \"roles\": [\"Engginer\"]}, {\"to\": \"Ready for Acceptance\", \"from\": \"Work In Progress\", \"roles\": [\"Engginer\"]}, {\"to\": \"Ready for Acceptance\", \"from\": \"Work In Progress\", \"roles\": [\"Engginer\"]}, {\"to\": \"Completed\", \"from\": \"Ready for Acceptance\", \"roles\": [\"Sales\"]}]}','2026-03-27 01:39:19.993','2026-03-27 06:56:12.204',0,1),
('cmn88jwrp000e9mrnf5jqryj9','cmkza5r640000csrnn4eccui8','cmkfbdazb0000airn2albkfd3','Default','{\"states\": [{\"name\": \"Draft\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 0}, {\"name\": \"Pending\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 1}, {\"name\": \"Send Quotation\", \"actions\": [\"create:quotation\"], \"updates\": {}, \"optional\": false, \"docStatus\": 1}, {\"name\": \"Send Sales Order\", \"actions\": [\"create:sales_order\"], \"updates\": {}, \"optional\": false, \"docStatus\": 1}, {\"name\": \"Sales Ordered\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 1}, {\"name\": \"Progress\", \"actions\": [\"create:work_order\"], \"updates\": {}, \"optional\": false, \"docStatus\": 1}, {\"name\": \"Work In Progress\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 1}, {\"name\": \"Ready for Acceptance\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 1}, {\"name\": \"Completed\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 1}], \"transitions\": [{\"to\": \"Pending\", \"from\": \"Draft\", \"roles\": [\"Customer\"]}, {\"to\": \"Pending\", \"from\": \"Draft\", \"roles\": [\"Sales\"]}, {\"to\": \"Send Quotation\", \"from\": \"Pending\", \"roles\": [\"Sales\"]}, {\"to\": \"Send Sales Order\", \"from\": \"Pending\", \"roles\": [\"Sales\"]}, {\"to\": \"Progress\", \"from\": \"Pending\", \"roles\": [\"Sales\"]}, {\"to\": \"Sales Ordered\", \"from\": \"Send Quotation\", \"roles\": [\"Sales\"]}, {\"to\": \"Sales Ordered\", \"from\": \"Send Sales Order\", \"roles\": [\"Sales\"]}, {\"to\": \"Work In Progress\", \"from\": \"Sales Ordered\", \"roles\": [\"Sales\"]}, {\"to\": \"Ready for Acceptance\", \"from\": \"Progress\", \"roles\": [\"Engginer\"]}, {\"to\": \"Ready for Acceptance\", \"from\": \"Work In Progress\", \"roles\": [\"Engginer\"]}, {\"to\": \"Ready for Acceptance\", \"from\": \"Work In Progress\", \"roles\": [\"Engginer\"]}, {\"to\": \"Completed\", \"from\": \"Ready for Acceptance\", \"roles\": [\"Sales\"]}]}','2026-03-27 01:41:39.102','2026-04-01 02:55:03.009',0,0),
('cmngxm640000dycrn10v87kps','cmkmdaan300f0vfrnluov51ak',NULL,'Default','{\"states\": [{\"name\": \"Available\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 0}, {\"name\": \"Maintenance\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 1}, {\"name\": \"Reserved\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 0}, {\"name\": \"In Use\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 1}], \"transitions\": [{\"to\": \"Reserved\", \"from\": \"Available\", \"roles\": [\"Engginer\"]}, {\"to\": \"In Use\", \"from\": \"Available\", \"roles\": [\"Engginer\"]}, {\"to\": \"Maintenance\", \"from\": \"In Use\", \"roles\": [\"Engginer\"]}, {\"to\": \"Available\", \"from\": \"In Use\", \"roles\": [\"Engginer\"]}, {\"to\": \"In Use\", \"from\": \"Available\", \"roles\": [\"Engginer\"]}]}','2026-04-02 03:45:24.328','2026-04-02 04:33:40.076',0,0),
('cmo9kcbla0000ed8ogvm426z0','cmkw4cq7u0005btrnhgh11cdg','cmkfbdazb0000airn2albkfd3','Default','{\"states\": [{\"name\": \"Draft\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 0}, {\"name\": \"Pending Approval\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 1}, {\"name\": \"Approved\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 1}, {\"name\": \"Paid\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 1}, {\"name\": \"Completed\", \"actions\": [\"create:work_order\"], \"updates\": {}, \"optional\": false, \"docStatus\": 1}, {\"name\": \"Cancelled\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 2}], \"transitions\": [{\"to\": \"Pending\", \"from\": \"Draft\", \"roles\": [\"Sales\"]}, {\"to\": \"Draft\", \"from\": \"Pending Approval\", \"roles\": [\"Sales\"]}, {\"to\": \"Approved\", \"from\": \"Pending Approval\", \"roles\": [\"Customer\"]}, {\"to\": \"Approved\", \"from\": \"Pending Approval\", \"roles\": [\"Sales\"]}, {\"to\": \"Paid\", \"from\": \"Approved\", \"roles\": [\"Sales\"]}, {\"to\": \"Completed\", \"from\": \"Paid\", \"roles\": [\"Sales\"]}]}','2026-04-22 04:39:08.960','2026-04-22 09:33:57.753',0,0),
('cmoatx34k0003tern0f0hlys9','cmo84gup40007s58o77hm25oq','cmkfbdazb0000airn2albkfd3','Default','{\"states\": [{\"name\": \"Deactive\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 0}, {\"name\": \"Active\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 0}, {\"name\": \"Suspend\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 0}, {\"name\": \"Terminated\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 0}, {\"name\": \"Cancelled\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 0}], \"transitions\": [{\"to\": \"Active\", \"from\": \"Deactive\", \"roles\": [\"Engginer\"]}, {\"to\": \"Cancelled\", \"from\": \"Deactive\", \"roles\": [\"Engginer\"]}, {\"to\": \"Deactive\", \"from\": \"Active\", \"roles\": [\"Engginer\"]}, {\"to\": \"Suspend\", \"from\": \"Active\", \"roles\": [\"Engginer\"]}, {\"to\": \"Terminated\", \"from\": \"Suspend\", \"roles\": [\"Engginer\"]}, {\"to\": \"Active\", \"from\": \"Suspend\", \"roles\": [\"Engginer\"]}, {\"to\": \"Active\", \"from\": \"Terminated\", \"roles\": [\"Engginer\"]}]}','2026-04-23 01:55:00.435','2026-05-07 03:23:16.802',0,1),
('cmoau2j2n0006tern8r457aiy','cmo84gup40007s58o77hm25oq','cmk6k26a1000cukrnkf8vku40','Default','{\"states\": [{\"name\": \"Deactive\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 0}, {\"name\": \"Active\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 0}, {\"name\": \"Suspend\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 0}, {\"name\": \"Terminated\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 0}, {\"name\": \"Cancelled\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 0}], \"transitions\": [{\"to\": \"Active\", \"from\": \"Deactive\", \"roles\": [\"Engginer\"]}, {\"to\": \"Cancelled\", \"from\": \"Deactive\", \"roles\": [\"Engginer\"]}, {\"to\": \"Deactive\", \"from\": \"Active\", \"roles\": [\"Engginer\"]}, {\"to\": \"Suspend\", \"from\": \"Active\", \"roles\": [\"Engginer\"]}, {\"to\": \"Terminated\", \"from\": \"Suspend\", \"roles\": [\"Engginer\"]}, {\"to\": \"Active\", \"from\": \"Suspend\", \"roles\": [\"Engginer\"]}, {\"to\": \"Active\", \"from\": \"Terminated\", \"roles\": [\"Engginer\"]}]}','2026-04-23 01:59:14.439','2026-05-07 03:23:16.816',0,0),
('cmouxwckb00004s8od3mrmu8z','cmockogfh00006s8od6x3z7hb','cmk6k26a1000cukrnkf8vku40','Default','{\"states\": [{\"name\": \"Draft\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 0}, {\"name\": \"Unpaid\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 1}, {\"name\": \"Paid\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 1}, {\"name\": \"Overdue\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 2}, {\"name\": \"Cancelled\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 2}], \"transitions\": [{\"to\": \"Unpaid\", \"from\": \"Draft\", \"roles\": [\"Finances\"]}, {\"to\": \"Draft\", \"from\": \"Unpaid\", \"roles\": [\"Finances\"]}, {\"to\": \"Paid\", \"from\": \"Unpaid\", \"roles\": [\"Finances\"]}, {\"to\": \"Cancelled\", \"from\": \"Unpaid\", \"roles\": [\"Finances\"]}, {\"to\": \"Overdue\", \"from\": \"Unpaid\", \"roles\": [\"Finances\"]}]}','2026-05-07 03:41:48.039','2026-05-07 03:42:00.991',0,0),
('cmouxwmj200014s8o0m0x9023','cmockogfh00006s8od6x3z7hb','cmkfbdazb0000airn2albkfd3','Default','{\"states\": [{\"name\": \"Draft\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 0}, {\"name\": \"Unpaid\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 1}, {\"name\": \"Paid\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 1}, {\"name\": \"Overdue\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 2}, {\"name\": \"Cancelled\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 2}], \"transitions\": [{\"to\": \"Unpaid\", \"from\": \"Draft\", \"roles\": [\"Finances\"]}, {\"to\": \"Draft\", \"from\": \"Unpaid\", \"roles\": [\"Finances\"]}, {\"to\": \"Paid\", \"from\": \"Unpaid\", \"roles\": [\"Finances\"]}, {\"to\": \"Cancelled\", \"from\": \"Unpaid\", \"roles\": [\"Finances\"]}, {\"to\": \"Overdue\", \"from\": \"Unpaid\", \"roles\": [\"Finances\"]}]}','2026-05-07 03:42:00.966','2026-05-07 03:42:00.966',0,1),
('cms2y4lbl0003f3jlnhv8cgvg','cmmli5oc70000k9rnyn8aw3a8','cmk6k26a1000cukrnkf8vku40','Default','{\"states\": [{\"name\": \"Pending\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 0}, {\"name\": \"Approve\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 1}, {\"name\": \"Reject\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 0}], \"transitions\": [{\"to\": \"Approve\", \"from\": \"Pending\", \"roles\": [\"Engginer\"]}, {\"to\": \"Reject\", \"from\": \"Pending\", \"roles\": [\"Engginer\"]}]}','2026-07-27 08:09:29.067','2026-07-27 08:10:35.530',0,0),
('cms2y60le0004f3jlk56poeoc','cmmli5oc70000k9rnyn8aw3a8','cmkfbdazb0000airn2albkfd3','Default','{\"states\": [{\"name\": \"Pending\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 0}, {\"name\": \"Approve\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 1}, {\"name\": \"Reject\", \"actions\": [], \"updates\": {}, \"optional\": false, \"docStatus\": 0}], \"transitions\": [{\"to\": \"Approve\", \"from\": \"Pending\", \"roles\": [\"Engginer\"]}, {\"to\": \"Reject\", \"from\": \"Pending\", \"roles\": [\"Engginer\"]}]}','2026-07-27 08:10:35.520','2026-07-27 08:10:35.520',0,1);
/*!40000 ALTER TABLE `DocWorkflow` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `Floor`
--

DROP TABLE IF EXISTS `Floor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `Floor` (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `level` int NOT NULL,
  `buildingId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Floor_buildingId_fkey` (`buildingId`),
  CONSTRAINT `Floor_buildingId_fkey` FOREIGN KEY (`buildingId`) REFERENCES `Building` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Floor`
--

LOCK TABLES `Floor` WRITE;
/*!40000 ALTER TABLE `Floor` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `Floor` VALUES
('cmmu1rnex0000x1rn8eu3fcbk',1,'cml5y5aj9000pairn0inrthyf','2026-03-17 03:22:56.454','2026-03-17 03:22:56.454'),
('cmnebejlu0000zorn14oe6m0y',1,'cml5y51p8000oairnbfuf1b0a','2026-03-31 07:48:04.671','2026-03-31 07:48:04.671');
/*!40000 ALTER TABLE `Floor` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `Inventory`
--

DROP TABLE IF EXISTS `Inventory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `Inventory` (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `productId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `branchId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantity` int NOT NULL DEFAULT '0',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Inventory_productId_branchId_key` (`productId`,`branchId`),
  KEY `Inventory_productId_idx` (`productId`),
  KEY `Inventory_branchId_idx` (`branchId`),
  CONSTRAINT `Inventory_branchId_fkey` FOREIGN KEY (`branchId`) REFERENCES `Branch` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Inventory_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Inventory`
--

LOCK TABLES `Inventory` WRITE;
/*!40000 ALTER TABLE `Inventory` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `Inventory` VALUES
('cmn89sb4y00005rrnjjsyhi3k','cmkkwgm0t00025grnhc95r349','cmk6k26a1000cukrnkf8vku40',10,'2026-03-27 02:16:10.582','2026-03-27 02:16:10.582'),
('cmn89sb5o00015rrngc642bbm','cmkkyfjsv0002vfrnhx4xbraa','cmk6k26a1000cukrnkf8vku40',10,'2026-03-27 02:16:10.616','2026-03-27 02:16:10.616'),
('cmn89sb5w00025rrn0qt0urib','cmkmewdod00f4vfrnxsh6m0ol','cmk6k26a1000cukrnkf8vku40',10,'2026-03-27 02:16:10.625','2026-03-27 02:16:10.625'),
('cmn89sb6300035rrngaxsdpz8','cmla86beq0009d7rnsosmsuk3','cmk6k26a1000cukrnkf8vku40',10,'2026-03-27 02:16:10.631','2026-03-27 02:16:10.631'),
('cmn89sb6a00045rrna1jym59z','cmla8alnd000cd7rnxzt683q2','cmk6k26a1000cukrnkf8vku40',10,'2026-03-27 02:16:10.639','2026-03-27 02:16:10.639'),
('cmn89sb6e00055rrnygnoayrw','cmkkwgm0t00025grnhc95r349','cmkf0a66u0002nwrnnmbpy5s8',10,'2026-03-27 02:16:10.646','2026-03-27 02:16:10.646'),
('cmn89sb6h00065rrn6vhcmuwm','cmkkyfjsv0002vfrnhx4xbraa','cmkf0a66u0002nwrnnmbpy5s8',10,'2026-03-27 02:16:10.649','2026-03-27 02:16:10.649'),
('cmn89sb6k00075rrnwc0irvu1','cmkmewdod00f4vfrnxsh6m0ol','cmkf0a66u0002nwrnnmbpy5s8',10,'2026-03-27 02:16:10.652','2026-03-27 02:16:10.652'),
('cmn89sb6n00085rrn26jt79pj','cmla86beq0009d7rnsosmsuk3','cmkf0a66u0002nwrnnmbpy5s8',10,'2026-03-27 02:16:10.655','2026-03-27 02:16:10.655'),
('cmn89sb6q00095rrnuh5sr8k5','cmla8alnd000cd7rnxzt683q2','cmkf0a66u0002nwrnnmbpy5s8',10,'2026-03-27 02:16:10.658','2026-03-27 02:16:10.658'),
('cmn89sb6t000a5rrn50pfh7lv','cmkkwgm0t00025grnhc95r349','cmkfbdazb0000airn2albkfd3',10,'2026-03-27 02:16:10.660','2026-03-27 02:16:10.660'),
('cmn89sb6x000b5rrnx062rat4','cmkkyfjsv0002vfrnhx4xbraa','cmkfbdazb0000airn2albkfd3',10,'2026-03-27 02:16:10.664','2026-03-27 02:16:10.664'),
('cmn89sb71000c5rrn5xzob5fc','cmkmewdod00f4vfrnxsh6m0ol','cmkfbdazb0000airn2albkfd3',10,'2026-03-27 02:16:10.668','2026-03-27 02:16:10.668'),
('cmn89sb76000d5rrnwnlaki9y','cmla86beq0009d7rnsosmsuk3','cmkfbdazb0000airn2albkfd3',10,'2026-03-27 02:16:10.673','2026-03-27 02:16:10.673'),
('cmn89sb78000e5rrn3ktqr43q','cmla8alnd000cd7rnxzt683q2','cmkfbdazb0000airn2albkfd3',10,'2026-03-27 02:16:10.675','2026-03-27 02:16:10.675');
/*!40000 ALTER TABLE `Inventory` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `InventoryMovement`
--

DROP TABLE IF EXISTS `InventoryMovement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `InventoryMovement` (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `inventoryId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantity` int NOT NULL,
  `reference` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `InventoryMovement_inventoryId_idx` (`inventoryId`),
  CONSTRAINT `InventoryMovement_inventoryId_fkey` FOREIGN KEY (`inventoryId`) REFERENCES `Inventory` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `InventoryMovement`
--

LOCK TABLES `InventoryMovement` WRITE;
/*!40000 ALTER TABLE `InventoryMovement` DISABLE KEYS */;
set autocommit=0;
/*!40000 ALTER TABLE `InventoryMovement` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `Permission`
--

DROP TABLE IF EXISTS `Permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `Permission` (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `key` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Permission_key_key` (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Permission`
--

LOCK TABLES `Permission` WRITE;
/*!40000 ALTER TABLE `Permission` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `Permission` VALUES
('cmk6k26750000ukrnvbz00pk7','ADMIN_PANEL_ACCESS','','2026-01-09 07:29:07.542','2026-01-09 07:29:07.542'),
('cmk6k267c0001ukrnzynkrxpq','BRANCH_MANAGEMENT','','2026-01-09 07:29:07.559','2026-01-09 07:29:07.559'),
('cmk6k267f0002ukrnjy6ko57h','BUILDING_MANAGEMENT','','2026-01-09 07:29:07.562','2026-01-09 07:29:07.562'),
('cmk6k267j0003ukrn5aae2k6d','FLOOR_MANAGEMENT','','2026-01-09 07:29:07.566','2026-01-09 07:29:07.566'),
('cmk6k267n0004ukrnanx1pfph','ROOM_MANAGEMENT','','2026-01-09 07:29:07.569','2026-01-09 07:29:07.569'),
('cmk6k267p0005ukrneu90b6av','ROLE_MANAGEMENT','','2026-01-09 07:29:07.573','2026-01-09 07:29:07.573'),
('cmk6k267t0006ukrnoyi39di2','ROLE_ACCESS_MANAGEMENT','','2026-01-09 07:29:07.576','2026-01-09 07:29:07.576'),
('cmk6k267w0007ukrnlryo40va','COMPANY_MANAGEMENT','','2026-01-09 07:29:07.579','2026-01-09 07:29:07.579'),
('cmk6k267y0008ukrn7lc1qasy','CUSTOMER_MANAGEMENT','','2026-01-09 07:29:07.582','2026-01-09 07:29:07.582'),
('cmkexir2u0000unrn17ss1maq','DC_COMPANY_MANAGEMENT','','2026-01-15 04:08:05.525','2026-01-15 04:08:05.525'),
('cmkmaiw4a0000ybrnjgjuba29','DOCTYPE_MANAGEMENT','','2026-01-20 07:46:30.296','2026-01-20 07:46:30.296'),
('cmkmaiw580001ybrn2i808ov2','DOCUMENTS_MANAGEMENT','','2026-01-20 07:46:30.331','2026-01-20 07:46:30.331');
/*!40000 ALTER TABLE `Permission` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `Product`
--

DROP TABLE IF EXISTS `Product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `Product` (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `branchId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `groupId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `classification` enum('FREE','ONETIME','RECURRING') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `description` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `orderMode` enum('DIRECT','REQUEST') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'DIRECT',
  PRIMARY KEY (`id`),
  KEY `Product_branchId_idx` (`branchId`),
  KEY `Product_groupId_fkey` (`groupId`),
  CONSTRAINT `Product_branchId_fkey` FOREIGN KEY (`branchId`) REFERENCES `Branch` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `Product_groupId_fkey` FOREIGN KEY (`groupId`) REFERENCES `ProductGroup` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Product`
--

LOCK TABLES `Product` WRITE;
/*!40000 ALTER TABLE `Product` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `Product` VALUES
('cmkkwgm0t00025grnhc95r349','Visual Inspection','cmk6k26a1000cukrnkf8vku40','cmkkwfq8400015grnyatwxk86','ONETIME',1,'2026-01-19 08:25:03.073','2026-02-04 10:22:58.382','1 Request = 1 Rack<div>Perform a visual inspection of the device (LED indicators, cables, and panels).</div><div>Send photos/videos of the device condition as requested by the customer.</div>','REQUEST'),
('cmkkyfjsv0002vfrnhx4xbraa','Soft Reboot','cmk6k26a1000cukrnkf8vku40','cmkkwfq8400015grnyatwxk86','ONETIME',1,'2026-01-19 09:20:12.774','2026-02-04 10:22:44.101','1 Request = 1 Device<div>Login and procedure are provided and reset after work completion by customer</div>','REQUEST'),
('cmkmewdod00f4vfrnxsh6m0ol','Additional Power','cmk6k26a1000cukrnkf8vku40','cmkmfjx6b00f8vfrnvwll83tg','ONETIME',1,'2026-01-20 09:48:57.993','2026-02-05 09:41:42.247','Increate power to rack selected','REQUEST'),
('cmla86beq0009d7rnsosmsuk3','Black Panel','cmk6k26a1000cukrnkf8vku40','cmkkyos820009vfrnfm8s8avr','ONETIME',1,'2026-02-06 01:47:12.541','2026-02-06 01:47:12.541','produk black panel','DIRECT'),
('cmla8alnd000cd7rnxzt683q2','rPDU','cmk6k26a1000cukrnkf8vku40','cmkkyos820009vfrnfm8s8avr','ONETIME',1,'2026-02-06 01:50:32.470','2026-02-06 01:51:25.443','produk rPDU','DIRECT'),
('cmla8bjx5000ed7rnfufd6skq','TakeOf Box','cmk6k26a1000cukrnkf8vku40','cmkkyos820009vfrnfm8s8avr','ONETIME',1,'2026-02-06 01:51:16.864','2026-02-06 01:51:16.864','produk','DIRECT'),
('cmla8cyen000gd7rnnuatcpsf','CCTV','cmk6k26a1000cukrnkf8vku40','cmkkyos820009vfrnfm8s8avr','ONETIME',1,'2026-02-06 01:52:22.314','2026-02-06 01:52:22.314','produk cctv','DIRECT'),
('cmla8dw59000id7rnx3i2mekt','Network Connector','cmk6k26a1000cukrnkf8vku40','cmkkyos820009vfrnfm8s8avr','ONETIME',1,'2026-02-06 01:53:06.043','2026-02-06 01:53:06.043','accessories network connector','DIRECT'),
('cmlabr7no000ftdrnf6vtm1z4','Product Recuring','cmk6k26a1000cukrnkf8vku40','cmkkyos820009vfrnfm8s8avr','RECURRING',1,'2026-02-06 03:27:26.315','2026-02-06 03:27:26.315','ini produk recuring','DIRECT'),
('cmngyg1jc000fycrnhu6cblmt','Additional Rack','cmk6k26a1000cukrnkf8vku40','cmngyfai0000eycrnxzft9j1i','RECURRING',1,'2026-04-02 04:08:38.079','2026-04-02 04:09:11.812','application for adding a new rack','REQUEST'),
('cmngyo8e3000jycrndoqdbn75','Component Replacement','cmk6k26a1000cukrnkf8vku40','cmkkwfq8400015grnyatwxk86','ONETIME',1,'2026-04-02 04:15:00.161','2026-04-02 04:15:00.161',NULL,'REQUEST'),
('cmngyu4px000lycrnson29ec6','Hard Reboot','cmk6k26a1000cukrnkf8vku40','cmkkwfq8400015grnyatwxk86','ONETIME',1,'2026-04-02 04:19:35.372','2026-04-02 04:20:19.324',NULL,'REQUEST'),
('cmngyvpx0000nycrnu0117bof','Remote Assistance','cmk6k26a1000cukrnkf8vku40','cmkkwfq8400015grnyatwxk86','ONETIME',1,'2026-04-02 04:20:49.517','2026-04-02 04:20:49.517',NULL,'REQUEST'),
('prod_cross_connect','Cross Connect','cmk6k26a1000cukrnkf8vku40','connectivity_services','RECURRING',1,'2026-03-27 09:09:39.855','2026-04-01 02:51:52.325',NULL,'REQUEST');
/*!40000 ALTER TABLE `Product` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `ProductGroup`
--

DROP TABLE IF EXISTS `ProductGroup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `ProductGroup` (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `branchId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `parentId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ProductGroup_branchId_idx` (`branchId`),
  KEY `ProductGroup_parentId_fkey` (`parentId`),
  CONSTRAINT `ProductGroup_branchId_fkey` FOREIGN KEY (`branchId`) REFERENCES `Branch` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `ProductGroup_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `ProductGroup` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ProductGroup`
--

LOCK TABLES `ProductGroup` WRITE;
/*!40000 ALTER TABLE `ProductGroup` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `ProductGroup` VALUES
('cmkkwfq8400015grnyatwxk86','Smart Hands','cmk6k26a1000cukrnkf8vku40',NULL,'Layanan pendukung untuk data center','2026-01-19 08:24:21.890','2026-01-19 08:24:21.890'),
('cmkkyiztb0008vfrn4wpmx0ow','Additional Services','cmk6k26a1000cukrnkf8vku40',NULL,'Layanan tambahan buat pelanggan data center','2026-01-19 09:22:53.518','2026-01-19 09:22:53.518'),
('cmkkyos820009vfrnfm8s8avr','Additional Accessories','cmk6k26a1000cukrnkf8vku40','cmkkyiztb0008vfrn4wpmx0ow','peralatan pelengkap dan penunjang','2026-01-19 09:27:23.616','2026-01-19 09:27:23.616'),
('cmkmfjx6b00f8vfrnvwll83tg','Additional Power','cmk6k26a1000cukrnkf8vku40','cmkkyiztb0008vfrn4wpmx0ow','Increate power to rack on datacenter','2026-01-20 10:07:16.394','2026-01-20 10:07:16.394'),
('cmngyfai0000eycrnxzft9j1i','Additional Rack','cmk6k26a1000cukrnkf8vku40','cmkkyiztb0008vfrn4wpmx0ow','Rack additional request','2026-04-02 04:08:02.975','2026-04-02 04:08:02.975'),
('connectivity_services','Connectivity Services','cmk6k26a1000cukrnkf8vku40',NULL,'Layanan pendukung konektivitas','2026-03-27 09:09:39.848','2026-04-01 02:52:30.953');
/*!40000 ALTER TABLE `ProductGroup` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `ProductPrice`
--

DROP TABLE IF EXISTS `ProductPrice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `ProductPrice` (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `productId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `currency` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'IDR',
  `basePrice` int NOT NULL DEFAULT '0',
  `setupFee` int NOT NULL DEFAULT '0',
  `pricingModel` enum('FIXED','DISCOUNT','TIERED') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `config` json DEFAULT NULL,
  `validFrom` datetime(3) DEFAULT NULL,
  `validTo` datetime(3) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `ProductPrice_productId_fkey` (`productId`),
  CONSTRAINT `ProductPrice_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ProductPrice`
--

LOCK TABLES `ProductPrice` WRITE;
/*!40000 ALTER TABLE `ProductPrice` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `ProductPrice` VALUES
('cmkkyebz70001vfrnzhjzm0g2','cmkkwgm0t00025grnhc95r349','IDR',0,75000,'FIXED','{\"mrcPeriod\": \"MONTHLY\", \"nrcPeriod\": \"HOUR\"}',NULL,NULL,'2026-01-19 09:19:15.995','2026-01-19 09:19:15.995'),
('cmkkyhuz00007vfrnt4w4szf7','cmkkyfjsv0002vfrnhx4xbraa','IDR',0,100000,'FIXED','{\"mrcPeriod\": \"MONTHLY\", \"nrcPeriod\": \"HOUR\"}',NULL,NULL,'2026-01-19 09:22:00.586','2026-01-19 09:22:00.586'),
('cmla8a39j000bd7rnhn53qe7d','cmla86beq0009d7rnsosmsuk3','IDR',0,100000,'FIXED','{\"mrcPeriod\": \"MONTHLY\", \"nrcPeriod\": \"DAY\"}',NULL,NULL,'2026-02-06 01:50:08.643','2026-02-06 01:50:08.643'),
('cmla8azu0000dd7rnkx6tx02w','cmla8alnd000cd7rnxzt683q2','IDR',0,5000000,'FIXED','{\"mrcPeriod\": \"MONTHLY\", \"nrcPeriod\": \"DAY\"}',NULL,NULL,'2026-02-06 01:50:50.829','2026-02-06 01:50:50.829'),
('cmla8c4fe000fd7rnzlmirt9h','cmla8bjx5000ed7rnfufd6skq','IDR',0,15000000,'FIXED','{\"mrcPeriod\": \"MONTHLY\", \"nrcPeriod\": \"DAY\"}',NULL,NULL,'2026-02-06 01:51:43.463','2026-02-06 01:51:43.463'),
('cmla8d7uw000hd7rn3wy40k7n','cmla8cyen000gd7rnnuatcpsf','IDR',0,1500000,'FIXED','{\"mrcPeriod\": \"MONTHLY\", \"nrcPeriod\": \"DAY\"}',NULL,NULL,'2026-02-06 01:52:34.559','2026-02-06 01:52:34.559'),
('cmlabs5fv000gtdrnfex03wbj','cmlabr7no000ftdrnf6vtm1z4','IDR',2000000,100000,'FIXED','{\"mrcPeriod\": \"MONTHLY\", \"nrcPeriod\": \"MONTH\"}',NULL,NULL,'2026-02-06 03:28:10.117','2026-02-06 03:28:10.117'),
('cmngyp5m6000kycrnittgvbo0','cmngyo8e3000jycrndoqdbn75','IDR',0,100000,'FIXED','{\"mrcPeriod\": \"MONTHLY\", \"nrcPeriod\": \"HOUR\"}',NULL,NULL,'2026-04-02 04:15:43.244','2026-04-02 04:15:43.244'),
('cmngyup64000mycrnb8b0g59n','cmngyu4px000lycrnson29ec6','IDR',0,100000,'FIXED','{\"mrcPeriod\": \"MONTHLY\", \"nrcPeriod\": \"HOUR\"}',NULL,NULL,'2026-04-02 04:20:01.888','2026-04-02 04:21:07.101'),
('cmngywcbd000oycrnv8i229rn','cmngyvpx0000nycrnu0117bof','IDR',0,75000,'FIXED','{\"mrcPeriod\": \"MONTHLY\", \"nrcPeriod\": \"HOUR\"}',NULL,NULL,'2026-04-02 04:21:18.546','2026-04-02 04:21:18.546'),
('price_cross_connect','prod_cross_connect','IDR',1000000,500000,'FIXED',NULL,NULL,NULL,'2026-03-27 09:09:39.862','2026-03-30 04:57:12.586');
/*!40000 ALTER TABLE `ProductPrice` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `ProductSpecField`
--

DROP TABLE IF EXISTS `ProductSpecField`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `ProductSpecField` (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `productId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `key` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `label` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` enum('TEXT','TEXTAREA','NUMBER','PRICE','DROPDOWN','CHECKBOX','DATE','DATETIME','LINK','TABLE','ATTACHMENT') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `required` tinyint(1) NOT NULL DEFAULT '0',
  `config` json DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ProductSpecField_productId_key_key` (`productId`,`key`),
  CONSTRAINT `ProductSpecField_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ProductSpecField`
--

LOCK TABLES `ProductSpecField` WRITE;
/*!40000 ALTER TABLE `ProductSpecField` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `ProductSpecField` VALUES
('cmkkxnwky0000wdrnfedgasw3','cmkkwgm0t00025grnhc95r349','server_room_id','Server Room ID','TEXT',1,NULL,'2026-01-19 08:58:42.968','2026-01-19 08:58:42.968'),
('cmkkxq1270001wdrn0xgbdmj6','cmkkwgm0t00025grnhc95r349','rack_id','Rack ID','TEXT',1,NULL,'2026-01-19 09:00:22.083','2026-01-19 09:00:22.083'),
('cmkkxrlye0002wdrnqxmy5gir','cmkkwgm0t00025grnhc95r349','server_id','Server ID','TEXT',1,NULL,'2026-01-19 09:01:35.804','2026-01-19 09:01:35.804'),
('cmkkxwg8w0000vfrnvoljkx4h','cmkkwgm0t00025grnhc95r349','description','Description','TEXTAREA',0,NULL,'2026-01-19 09:05:21.715','2026-01-19 09:05:21.715'),
('cmkkyga2o0003vfrnm9btmkj8','cmkkyfjsv0002vfrnhx4xbraa','server_room_id','Server Room ID','TEXT',1,NULL,'2026-01-19 09:20:46.845','2026-01-19 09:20:46.845'),
('cmkkygwf50004vfrnrh7fw7ug','cmkkyfjsv0002vfrnhx4xbraa','rack_id','Rack ID','TEXT',1,NULL,'2026-01-19 09:21:15.803','2026-01-19 09:21:15.803'),
('cmkkyh9el0005vfrnxkrw5xgy','cmkkyfjsv0002vfrnhx4xbraa','server_id','Server ID','TEXT',1,NULL,'2026-01-19 09:21:32.635','2026-01-19 09:21:32.635'),
('cmkkyhjd70006vfrnuk35whkp','cmkkyfjsv0002vfrnhx4xbraa','description','Descriptions','TEXT',0,NULL,'2026-01-19 09:21:45.544','2026-01-19 09:21:45.544'),
('cmkmex8fv00f5vfrnbpcc13lk','cmkmewdod00f4vfrnxsh6m0ol','select_rack','Select Rack','DROPDOWN',1,'{\"source\": {\"key\": \"master_rack\", \"filters\": [{\"op\": \"contains\", \"field\": \"company_id\", \"value\": \"ada\", \"valueKey\": \"userCompanyId\", \"valueSource\": \"session\"}], \"labelField\": \"rack_name\", \"valueField\": \"rack_name\"}}','2026-01-20 09:49:37.894','2026-04-02 03:20:29.439'),
('cmkmeyw3u00f6vfrns9f44nii','cmkmewdod00f4vfrnxsh6m0ol','power_requirement','Power Requirement','DROPDOWN',1,'{\"options\": [{\"label\": \"240Vac\", \"value\": \"240Vac\"}, {\"label\": \"220Vac\", \"value\": \"220Vac\"}, {\"label\": \"170Vac\", \"value\": \"170Vac\"}]}','2026-01-20 09:50:55.182','2026-01-20 09:50:55.182'),
('cmkmezjsc00f7vfrnw4gqx4fj','cmkmewdod00f4vfrnxsh6m0ol','description','Description','TEXTAREA',0,NULL,'2026-01-20 09:51:25.929','2026-01-20 09:51:25.929'),
('cmncpc7y70000vcrnw9i0n07g','prod_cross_connect','activation_date','Activation Date','DATE',1,NULL,'2026-03-30 04:42:38.525','2026-03-30 04:57:12.591'),
('cmncpc7ya0001vcrnr2fpjfz1','prod_cross_connect','cross_connect_type','Cross Connect Type','DROPDOWN',1,'{\"options\": [{\"label\": \"Fiber Optic\", \"value\": \"Fiber Optic\"}, {\"label\": \"UTP\", \"value\": \"UTP\"}]}','2026-03-30 04:42:38.529','2026-03-30 04:57:12.596'),
('cmncpc7yd0002vcrnebri13h0','prod_cross_connect','request_type','Request Type','DROPDOWN',1,'{\"options\": [{\"label\": \"New\", \"value\": \"New\"}, {\"label\": \"Terminate\", \"value\": \"Terminate\"}]}','2026-03-30 04:42:38.533','2026-03-30 04:57:12.604'),
('cmncpc7yl0004vcrn32g8mrn8','prod_cross_connect','source_rack_id','Rack ID (Source)','DROPDOWN',1,'{\"source\": {\"key\": \"master_rack\", \"labelField\": \"rack_name\", \"valueField\": \"id\"}}','2026-03-30 04:42:38.539','2026-03-30 04:57:12.612'),
('cmncpc7yn0005vcrnwabcvhqv','prod_cross_connect','source_material','Material (Source)','DROPDOWN',1,'{\"source\": {\"mode\": \"inventory\"}}','2026-03-30 04:42:38.543','2026-03-30 04:57:12.618'),
('cmncpc7yp0006vcrn1unuwzhi','prod_cross_connect','source_connector_type','Connector Type (Source)','DROPDOWN',1,'{\"source\": {\"mode\": \"static_dep\", \"filter\": {\"field\": \"cross_connect_type\", \"dependsOn\": \"cross_connect_type\"}}}','2026-03-30 04:42:38.545','2026-03-30 04:57:12.623'),
('cmncpc7yr0007vcrn7lrl8tgh','prod_cross_connect','destination','Destination','DROPDOWN',1,'{\"options\": [{\"label\": \"APJII\", \"value\": \"APJII\"}, {\"label\": \"Open IXP\", \"value\": \"Open IXP\"}]}','2026-03-30 04:42:38.547','2026-03-30 04:57:12.627'),
('cmncpc7yt0008vcrnl121eh9t','prod_cross_connect','destination_rack_id','Rack ID (Destination)','TEXT',1,NULL,'2026-03-30 04:42:38.549','2026-03-30 04:57:12.630'),
('cmncpc7yv0009vcrnlk22m9z6','prod_cross_connect','destination_connector_type','Connector Type (Destination)','DROPDOWN',1,'{\"source\": {\"mode\": \"static_dep\", \"filter\": {\"field\": \"cross_connect_type\", \"dependsOn\": \"cross_connect_type\"}}}','2026-03-30 04:42:38.551','2026-03-30 04:57:12.633'),
('cmngyia5g000gycrnb5kt7q0n','cmngyg1jc000fycrnhu6cblmt','amount_rack','Amount Rack','NUMBER',1,NULL,'2026-04-02 04:10:22.475','2026-04-02 04:10:22.475'),
('cmngyjla6000hycrn08vrid29','cmngyg1jc000fycrnhu6cblmt','rack_size','Rack Size','DROPDOWN',1,'{\"options\": [{\"label\": \"4x40\", \"value\": \"4x40\"}, {\"label\": \"2x20\", \"value\": \"2x20\"}, {\"label\": \"6x60\", \"value\": \"6x60\"}]}','2026-04-02 04:11:23.619','2026-04-02 04:11:23.619'),
('cmngyksk4000iycrny6fkzbve','cmngyg1jc000fycrnhu6cblmt','power','Power','DROPDOWN',1,'{\"options\": [{\"label\": \"240Vac\", \"value\": \"240Vac\"}, {\"label\": \"220Vac\", \"value\": \"220Vac\"}, {\"label\": \"170Vac\", \"value\": \"170Vac\"}]}','2026-04-02 04:12:19.703','2026-04-02 04:12:19.703'),
('cmngyzrwp000pycrn5mzdqf8t','cmngyo8e3000jycrndoqdbn75','server_room_id','Server Room ID','TEXT',1,NULL,'2026-04-02 04:23:58.655','2026-04-02 04:23:58.655'),
('cmngz03xm000qycrnbanqxhc6','cmngyo8e3000jycrndoqdbn75','rack_id','Rack ID','TEXT',1,NULL,'2026-04-02 04:24:14.302','2026-04-02 04:24:14.302'),
('cmngz0gd3000rycrn9yg2yh05','cmngyo8e3000jycrndoqdbn75','server_id','Server ID','TEXT',1,NULL,'2026-04-02 04:24:30.417','2026-04-02 04:24:30.417'),
('cmngz11d3000sycrn7ksf3f0n','cmngyo8e3000jycrndoqdbn75','description','Description','TEXTAREA',0,NULL,'2026-04-02 04:24:57.565','2026-04-02 04:24:57.565'),
('cmngz1mno000tycrn3pu6ryw6','cmngyu4px000lycrnson29ec6','server_room_id','Server Room ID','TEXT',1,NULL,'2026-04-02 04:25:25.228','2026-04-02 04:25:25.228'),
('cmngz29u7000uycrnwxajgf0q','cmngyu4px000lycrnson29ec6','rack_id','Rack ID','TEXT',1,NULL,'2026-04-02 04:25:55.270','2026-04-02 04:25:55.270'),
('cmngz2nnm000vycrna5ck9oxg','cmngyu4px000lycrnson29ec6','server_id','Server ID','TEXT',1,NULL,'2026-04-02 04:26:13.179','2026-04-02 04:26:13.179'),
('cmngz32si000wycrnk48ijxny','cmngyu4px000lycrnson29ec6','description','Description','TEXTAREA',0,NULL,'2026-04-02 04:26:32.659','2026-04-02 04:26:32.659'),
('cmngz3j52000xycrn9v848x4v','cmngyvpx0000nycrnu0117bof','server_room_id','Server Room ID','TEXT',1,NULL,'2026-04-02 04:26:53.984','2026-04-02 04:26:53.984'),
('cmngz433m000yycrn0nfwwrru','cmngyvpx0000nycrnu0117bof','rack_id','Rack ID','TEXT',1,NULL,'2026-04-02 04:27:19.847','2026-04-02 04:27:19.847'),
('cmngz4fbo000zycrns3s7fjvw','cmngyvpx0000nycrnu0117bof','server_id','Server ID','TEXT',1,NULL,'2026-04-02 04:27:35.692','2026-04-02 04:27:35.692'),
('cmngz4pdy0010ycrnpxy7hijb','cmngyvpx0000nycrnu0117bof','description','Description','TEXTAREA',0,NULL,'2026-04-02 04:27:48.734','2026-04-02 04:27:48.734');
/*!40000 ALTER TABLE `ProductSpecField` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `Role`
--

DROP TABLE IF EXISTS `Role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `Role` (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `branchId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Role_branchId_name_key` (`branchId`,`name`),
  CONSTRAINT `Role_branchId_fkey` FOREIGN KEY (`branchId`) REFERENCES `Branch` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Role`
--

LOCK TABLES `Role` WRITE;
/*!40000 ALTER TABLE `Role` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `Role` VALUES
('cmk6k26840009ukrnnw45u6fi','ADMIN',NULL,'2026-01-09 07:29:07.584','2026-01-09 07:29:07.584',NULL),
('cmk6o2hky00001drnvyhxfs4j','Moderator',NULL,'2026-01-09 09:21:20.766','2026-01-09 09:21:44.088','cmk6k26a1000cukrnkf8vku40'),
('cmkexir410002unrnfsg1x40j','Super Admin',NULL,'2026-01-15 04:08:05.568','2026-01-15 08:54:05.975','cmkf0a66u0002nwrnnmbpy5s8'),
('cmkexir460003unrnggeczxbh','Customer',NULL,'2026-01-15 04:08:05.573','2026-01-15 04:10:54.058','cmk6k26a1000cukrnkf8vku40'),
('cmkeyb3a600003crngd8squ82','Admin',NULL,'2026-01-15 04:30:07.708','2026-01-19 10:24:12.621','cmk6k26a1000cukrnkf8vku40'),
('cmkql5s4y000f2urnyg8pjk4j','Sales',NULL,'2026-01-23 07:55:19.075','2026-03-05 04:59:06.410','cmk6k26a1000cukrnkf8vku40'),
('cmkz8742x000hswrnkcrtxio5','Operational Manager',NULL,'2026-01-29 09:02:21.790','2026-02-02 07:29:15.978','cmk6k26a1000cukrnkf8vku40'),
('cml4nc06f0006ytrn5flvktxz','Engginer',NULL,'2026-02-02 04:04:55.138','2026-02-02 08:08:28.465','cmk6k26a1000cukrnkf8vku40'),
('cmlacb785000mtdrnmw82brql','Sales Manager',NULL,'2026-02-06 03:42:58.896','2026-02-06 03:42:58.896','cmk6k26a1000cukrnkf8vku40'),
('cmlaqg6wt0003ztrn58gpuvp6','Finances',NULL,'2026-02-06 10:18:46.389','2026-02-06 10:18:46.389','cmk6k26a1000cukrnkf8vku40'),
('cmmcsfbjf000su9rnbiwvc4h1','Security',NULL,'2026-03-05 01:29:19.657','2026-03-05 04:35:41.004','cmkfbdazb0000airn2albkfd3');
/*!40000 ALTER TABLE `Role` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `RolePermission`
--

DROP TABLE IF EXISTS `RolePermission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `RolePermission` (
  `roleId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `permissionId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`roleId`,`permissionId`),
  KEY `RolePermission_permissionId_fkey` (`permissionId`),
  CONSTRAINT `RolePermission_permissionId_fkey` FOREIGN KEY (`permissionId`) REFERENCES `Permission` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `RolePermission_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `RolePermission`
--

LOCK TABLES `RolePermission` WRITE;
/*!40000 ALTER TABLE `RolePermission` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `RolePermission` VALUES
('cmk6k26840009ukrnnw45u6fi','cmk6k26750000ukrnvbz00pk7'),
('cmk6o2hky00001drnvyhxfs4j','cmk6k26750000ukrnvbz00pk7'),
('cmkexir410002unrnfsg1x40j','cmk6k26750000ukrnvbz00pk7'),
('cmkeyb3a600003crngd8squ82','cmk6k26750000ukrnvbz00pk7'),
('cmkql5s4y000f2urnyg8pjk4j','cmk6k26750000ukrnvbz00pk7'),
('cmkz8742x000hswrnkcrtxio5','cmk6k26750000ukrnvbz00pk7'),
('cml4nc06f0006ytrn5flvktxz','cmk6k26750000ukrnvbz00pk7'),
('cmlacb785000mtdrnmw82brql','cmk6k26750000ukrnvbz00pk7'),
('cmlaqg6wt0003ztrn58gpuvp6','cmk6k26750000ukrnvbz00pk7'),
('cmmcsfbjf000su9rnbiwvc4h1','cmk6k26750000ukrnvbz00pk7'),
('cmk6k26840009ukrnnw45u6fi','cmk6k267c0001ukrnzynkrxpq'),
('cmk6o2hky00001drnvyhxfs4j','cmk6k267c0001ukrnzynkrxpq'),
('cmkexir410002unrnfsg1x40j','cmk6k267c0001ukrnzynkrxpq'),
('cmkeyb3a600003crngd8squ82','cmk6k267c0001ukrnzynkrxpq'),
('cmkz8742x000hswrnkcrtxio5','cmk6k267c0001ukrnzynkrxpq'),
('cmk6k26840009ukrnnw45u6fi','cmk6k267f0002ukrnjy6ko57h'),
('cmk6o2hky00001drnvyhxfs4j','cmk6k267f0002ukrnjy6ko57h'),
('cmkexir410002unrnfsg1x40j','cmk6k267f0002ukrnjy6ko57h'),
('cmkeyb3a600003crngd8squ82','cmk6k267f0002ukrnjy6ko57h'),
('cmkz8742x000hswrnkcrtxio5','cmk6k267f0002ukrnjy6ko57h'),
('cmk6k26840009ukrnnw45u6fi','cmk6k267j0003ukrn5aae2k6d'),
('cmk6o2hky00001drnvyhxfs4j','cmk6k267j0003ukrn5aae2k6d'),
('cmkexir410002unrnfsg1x40j','cmk6k267j0003ukrn5aae2k6d'),
('cmkeyb3a600003crngd8squ82','cmk6k267j0003ukrn5aae2k6d'),
('cmkz8742x000hswrnkcrtxio5','cmk6k267j0003ukrn5aae2k6d'),
('cml4nc06f0006ytrn5flvktxz','cmk6k267j0003ukrn5aae2k6d'),
('cmk6k26840009ukrnnw45u6fi','cmk6k267n0004ukrnanx1pfph'),
('cmk6o2hky00001drnvyhxfs4j','cmk6k267n0004ukrnanx1pfph'),
('cmkexir410002unrnfsg1x40j','cmk6k267n0004ukrnanx1pfph'),
('cmkeyb3a600003crngd8squ82','cmk6k267n0004ukrnanx1pfph'),
('cmkz8742x000hswrnkcrtxio5','cmk6k267n0004ukrnanx1pfph'),
('cml4nc06f0006ytrn5flvktxz','cmk6k267n0004ukrnanx1pfph'),
('cmk6k26840009ukrnnw45u6fi','cmk6k267p0005ukrneu90b6av'),
('cmk6o2hky00001drnvyhxfs4j','cmk6k267p0005ukrneu90b6av'),
('cmkexir410002unrnfsg1x40j','cmk6k267p0005ukrneu90b6av'),
('cmkeyb3a600003crngd8squ82','cmk6k267p0005ukrneu90b6av'),
('cmk6k26840009ukrnnw45u6fi','cmk6k267t0006ukrnoyi39di2'),
('cmk6o2hky00001drnvyhxfs4j','cmk6k267t0006ukrnoyi39di2'),
('cmkexir410002unrnfsg1x40j','cmk6k267t0006ukrnoyi39di2'),
('cmkeyb3a600003crngd8squ82','cmk6k267t0006ukrnoyi39di2'),
('cmk6k26840009ukrnnw45u6fi','cmk6k267w0007ukrnlryo40va'),
('cmk6o2hky00001drnvyhxfs4j','cmk6k267w0007ukrnlryo40va'),
('cmkexir410002unrnfsg1x40j','cmk6k267w0007ukrnlryo40va'),
('cmkeyb3a600003crngd8squ82','cmk6k267w0007ukrnlryo40va'),
('cmkql5s4y000f2urnyg8pjk4j','cmk6k267w0007ukrnlryo40va'),
('cmkz8742x000hswrnkcrtxio5','cmk6k267w0007ukrnlryo40va'),
('cmlacb785000mtdrnmw82brql','cmk6k267w0007ukrnlryo40va'),
('cmlaqg6wt0003ztrn58gpuvp6','cmk6k267w0007ukrnlryo40va'),
('cmk6k26840009ukrnnw45u6fi','cmk6k267y0008ukrn7lc1qasy'),
('cmk6o2hky00001drnvyhxfs4j','cmk6k267y0008ukrn7lc1qasy'),
('cmkexir410002unrnfsg1x40j','cmk6k267y0008ukrn7lc1qasy'),
('cmkeyb3a600003crngd8squ82','cmk6k267y0008ukrn7lc1qasy'),
('cmkql5s4y000f2urnyg8pjk4j','cmk6k267y0008ukrn7lc1qasy'),
('cmkz8742x000hswrnkcrtxio5','cmk6k267y0008ukrn7lc1qasy'),
('cmlacb785000mtdrnmw82brql','cmk6k267y0008ukrn7lc1qasy'),
('cmlaqg6wt0003ztrn58gpuvp6','cmk6k267y0008ukrn7lc1qasy'),
('cmkexir410002unrnfsg1x40j','cmkexir2u0000unrn17ss1maq'),
('cmkeyb3a600003crngd8squ82','cmkexir2u0000unrn17ss1maq'),
('cmkeyb3a600003crngd8squ82','cmkmaiw4a0000ybrnjgjuba29'),
('cmkeyb3a600003crngd8squ82','cmkmaiw580001ybrn2i808ov2'),
('cmlacb785000mtdrnmw82brql','cmkmaiw580001ybrn2i808ov2'),
('cmlaqg6wt0003ztrn58gpuvp6','cmkmaiw580001ybrn2i808ov2');
/*!40000 ALTER TABLE `RolePermission` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `Room`
--

DROP TABLE IF EXISTS `Room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `Room` (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `floorId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Room_floorId_fkey` (`floorId`),
  CONSTRAINT `Room_floorId_fkey` FOREIGN KEY (`floorId`) REFERENCES `Floor` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Room`
--

LOCK TABLES `Room` WRITE;
/*!40000 ALTER TABLE `Room` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `Room` VALUES
('cmmu1sbet0001x1rnvy2fi2pe','MMR','cmmu1rnex0000x1rn8eu3fcbk','2026-03-17 03:23:27.556','2026-03-17 03:23:27.556'),
('cmnebejmw0001zornlkqfib2e','Data Center Room A','cmnebejlu0000zorn14oe6m0y','2026-03-31 07:48:04.710','2026-03-31 07:48:04.710');
/*!40000 ALTER TABLE `Room` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `User` (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `passwordHash` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `roleId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `companyId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `address` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phoneNumber` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `billingContactName` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `billingEmail` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `billingPhoneNumber` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `partnerType` enum('RESELLER','END_USER') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `technicalContactName` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `technicalEmail` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `technicalPhoneNumber` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `jobTitle` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `resetToken` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `resetTokenExpiry` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `User_email_key` (`email`),
  UNIQUE KEY `User_resetToken_key` (`resetToken`),
  KEY `User_roleId_fkey` (`roleId`),
  KEY `User_companyId_fkey` (`companyId`),
  CONSTRAINT `User_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `User_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `User` VALUES
('cmk6k26c9000dukrneu6wxeyj','superadmin@example.com','Super Admin','$2b$10$mTVY2Lw.puhPC3pLC/Xp..M4zzsuHgod78xPcqHi02Up3ruIjR7MS','cmkeyb3a600003crngd8squ82','cmkexir3c0001unrnris7a5i1','2026-01-09 07:29:07.734','2026-01-29 09:57:17.459','Jl Merdeka','0892383292384',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
('cmk6k26ec000eukrn64t25jm4','customer@example.com','Customer','$2b$10$qIBXd7e/eps25nyx7tf8yuW/N4P1crWWtSL/klgGbAHaw1VIg/gpe','cmkexir460003unrnggeczxbh','cmk6se3ka000045rnz5t6qe9d','2026-01-09 07:29:07.811','2026-05-13 08:00:25.677','Jl Pegangsaan Timur','089238234324','Wanaya','billing@example.com','089238234324','Indonesia','RESELLER','Wanaya','technical@example.com','089238234324','Account Manager',NULL,NULL),
('cmkeyb3dd00013crn5j2s67gb','admin@example.com','Admin','$2b$10$bIHjjRYfugDNtpdjjkZND.UWEOHCZq3tKKFnitf7KcfJmv.A9eRbe','cmkeyb3a600003crngd8squ82','cmkewzoro0000hdrnmyii2gpp','2026-01-15 04:30:07.824','2026-01-29 09:57:17.383',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
('cmkf5dvvd0002h7rnbp61vjnw','rio@limputra.com','Rio Renaldi','$2b$10$cK5GB.M.BFbRxDcrRjsuU.YFKSL9ymAEACLHEDMSNAQP6vJ6Qg4wK','cmkexir410002unrnfsg1x40j','cmkezmo140000nwrn8b8lorev','2026-01-15 07:48:15.383','2026-01-15 07:59:17.881',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
('cmkf5ub5t0003h7rnwgyuqx2i','raka@limputra.com','Raka Renaldi','$2b$10$l2MLIng8kYzCxZ2vkPyL6eclUpwTFvC.FmAa.YY6RgO1FWeOD7w4a','cmkexir410002unrnfsg1x40j','cmkezmo140000nwrn8b8lorev','2026-01-15 08:01:01.694','2026-01-15 08:01:01.694',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
('cmkqlsl9w000j2urn9hglxen1','sales@example.com','sales metta','$2b$10$YIvT2alCtSBSUadfK5dsNeBIDg5kRUW0Yxkt362zhJrsUhX1iD.5m','cmkql5s4y000f2urnyg8pjk4j','cmkewzoro0000hdrnmyii2gpp','2026-01-23 08:13:03.280','2026-03-12 07:34:11.279',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
('cmkz88faa000iswrn6s3gpcgx','operation@example.com','operation','$2b$10$Is4bVb65oVXrFRME49L/2.vRZzcxHGbd6XTtGSitqd3HgXbJKeOAG','cmkz8742x000hswrnkcrtxio5','cmkewzoro0000hdrnmyii2gpp','2026-01-29 09:03:22.967','2026-01-29 09:03:22.967','jl pegangsaan timur','083493485353',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
('cml4ncnii0007ytrnoip1jd76','engginer@example.com','engginer','$2b$10$.PaiNmsKwjWaLceFkigBGOvR7cE/00mcOZ.dLenFh0Yl2vcrmglgu','cml4nc06f0006ytrn5flvktxz','cmkewzoro0000hdrnmyii2gpp','2026-02-02 04:05:25.385','2026-02-02 04:05:25.385','','',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
('cml6c9w0w0000k4rn8qg8t7wj','customer2@example.com','customer2','$2b$10$l901Kk.RlHeQ8f8YusRC.Oj3kMfLe31gzMhJ8vppvsCbgKdNyiwJm','cmkexir460003unrnggeczxbh','cmk6k269v000bukrn5hs6vlqq','2026-02-03 08:30:53.018','2026-04-30 04:29:46.608','Jl pegangsaan timur raya','0893483483834','customer dua','customer2@example.com','456455675757','Indonesia','RESELLER','customer dua','customer2@example.com','456455675757','Account Manager',NULL,NULL),
('cmlacmdtc000ntdrnriz81tq6','salesmanager@example.com','salesmanager','$2b$10$EcxDSlzPqDMctY.uNT3l5utZXEHHQmkhQi0jXxTs7qZnQAhO914tW','cmlacb785000mtdrnmw82brql','cmkewzoro0000hdrnmyii2gpp','2026-02-06 03:51:40.649','2026-02-06 03:51:40.649','','',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
('cmlaqhaak0004ztrnhhcnjlby','finance@example.com','finance','$2b$10$ewPl7J6MFRkb3nzCwOyNDeGuj3LhiKwczXiy0n7RlD.OJfMmhTJoW','cmlaqg6wt0003ztrn58gpuvp6','cmkewzoro0000hdrnmyii2gpp','2026-02-06 10:19:37.416','2026-02-06 10:19:37.416','','',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
('cmmcsg0v1000tu9rnxv2iruow','security@example.com','security Wanaya','$2b$10$64eF9wKSFtn4Xr4YFJqtgO11afzwI8OgHosxuBEDh025f.OTIXP2u','cmmcsfbjf000su9rnbiwvc4h1','cmkewzoro0000hdrnmyii2gpp','2026-03-05 01:29:52.476','2026-03-27 01:47:36.605','Jl Pegangsaan Timur','089238234324',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
('cmocappot0000yl8oz9felwuh','voxawo1583@hacknapp.com','Voka Rika','$2b$10$O4nH7i4HuFV5gmSumPkYV.Q.sM.gGpvkGg7QdxsfUBUG1OvDX2nTS','cmkexir460003unrnggeczxbh','cmocavd1n0001yl8ohp4nb4w2','2026-04-24 02:32:56.104','2026-04-24 02:37:59.150','Jl Pegangsaan','0823902394','Voka','voxawo1583@hacknapp.com','0823902394664','Indonesia','RESELLER','Voka','voxawo1583@hacknapp.com','0823902394664','Account Manager',NULL,NULL);
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `UserBranchAssignment`
--

DROP TABLE IF EXISTS `UserBranchAssignment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserBranchAssignment` (
  `userId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `branchId` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `assignedAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`userId`,`branchId`),
  KEY `UserBranchAssignment_branchId_fkey` (`branchId`),
  CONSTRAINT `UserBranchAssignment_branchId_fkey` FOREIGN KEY (`branchId`) REFERENCES `Branch` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `UserBranchAssignment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserBranchAssignment`
--

LOCK TABLES `UserBranchAssignment` WRITE;
/*!40000 ALTER TABLE `UserBranchAssignment` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `UserBranchAssignment` VALUES
('cmk6k26c9000dukrneu6wxeyj','cmk6k26a1000cukrnkf8vku40','2026-01-20 07:46:30.604'),
('cmk6k26c9000dukrneu6wxeyj','cmkf0a66u0002nwrnnmbpy5s8','2026-01-19 10:30:31.514'),
('cmkeyb3dd00013crn5j2s67gb','cmk6k26a1000cukrnkf8vku40','2026-01-15 10:36:26.184'),
('cmkeyb3dd00013crn5j2s67gb','cmkfbdazb0000airn2albkfd3','2026-01-15 10:36:26.197'),
('cmkqlsl9w000j2urn9hglxen1','cmk6k26a1000cukrnkf8vku40','2026-03-12 07:34:11.338'),
('cmkqlsl9w000j2urn9hglxen1','cmkfbdazb0000airn2albkfd3','2026-03-12 07:34:11.343'),
('cmkz88faa000iswrn6s3gpcgx','cmk6k26a1000cukrnkf8vku40','2026-01-29 09:03:23.024'),
('cmkz88faa000iswrn6s3gpcgx','cmkfbdazb0000airn2albkfd3','2026-01-29 09:03:23.041'),
('cml4ncnii0007ytrnoip1jd76','cmk6k26a1000cukrnkf8vku40','2026-02-02 04:05:25.398'),
('cml4ncnii0007ytrnoip1jd76','cmkfbdazb0000airn2albkfd3','2026-02-02 04:05:25.404'),
('cmlacmdtc000ntdrnriz81tq6','cmk6k26a1000cukrnkf8vku40','2026-02-06 03:51:40.695'),
('cmlacmdtc000ntdrnriz81tq6','cmkfbdazb0000airn2albkfd3','2026-02-06 03:51:40.707'),
('cmlaqhaak0004ztrnhhcnjlby','cmk6k26a1000cukrnkf8vku40','2026-02-06 10:19:37.478'),
('cmlaqhaak0004ztrnhhcnjlby','cmkfbdazb0000airn2albkfd3','2026-02-06 10:19:37.535'),
('cmmcsg0v1000tu9rnxv2iruow','cmkfbdazb0000airn2albkfd3','2026-03-27 01:47:36.632');
/*!40000 ALTER TABLE `UserBranchAssignment` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_prisma_migrations`
--

LOCK TABLES `_prisma_migrations` WRITE;
/*!40000 ALTER TABLE `_prisma_migrations` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `_prisma_migrations` VALUES
('09ff41bf-02c1-4277-af5a-1bb0eeac9ae4','0f95d054f1f982a9e3512d10c0dbee0a8bcfdf8d4f7112ffd9a456901d21ecee','2026-01-19 08:31:14.364','20260119083114_add_product_description',NULL,NULL,'2026-01-19 08:31:14.351',1),
('25e1340a-c4af-4188-9d6b-68e88bb5fac5','2c91d0e0811a9823c520844f733682cae9ec40856ee0e1d4cc9af50783149a32','2026-01-19 08:23:48.516','20260119082348_add_product_models',NULL,NULL,'2026-01-19 08:23:48.415',1),
('4328c5ee-de23-4834-abd9-81fc894e788d','ff61198f688a3edc423616fa2ad8efcde5bd9966ac2023d53d166a2e5b5e34e7','2026-01-19 09:02:55.869','20260119090255_add_textarea_field_type',NULL,NULL,'2026-01-19 09:02:55.854',1),
('51ba78c5-c1ee-49ed-841a-ed16a8dc52cc','8d5c5b60cf8e3a69ae12dce5b1e7e01f4061d5c16cfda62c085e7bf440588664','2026-01-09 10:52:58.638','20260109105258_extend_user_for_customers',NULL,NULL,'2026-01-09 10:52:58.616',1),
('9a9208ce-8eb3-454f-83a0-0768d2179316','8b18289e2be7049b81e06e417a20dd7ea1b76897f2707902e34ec667d62a17f3','2026-01-15 03:58:35.333','20260115035835_add_is_data_center',NULL,NULL,'2026-01-15 03:58:35.318',1),
('afa5af16-9d81-4937-b8fc-1d112c74036b','5df2d54613b3af4e74e0c3125d698a44b63d61c06af501eaa506f6deb3e20c7f','2026-01-09 08:56:35.725','20260109085635_add_role_branch_optional',NULL,NULL,'2026-01-09 08:56:35.476',1),
('b5b62392-8e1c-4374-a1fc-5eff50229822','901a23e2e261fdd9a2f8db185874a55c9a51335faaab4da52ad1e26da11835b0','2026-01-09 11:12:27.528','20260109111227_add_company_contact_fields',NULL,NULL,'2026-01-09 11:12:27.511',1),
('ca4b209f-50ba-4d86-bd95-2b8916846b42','022ddf1133f2ff047b856775ba95ff7e20cac94f0caa58b0a541e69137913a59','2026-01-09 10:36:06.276','20260109103606_add_user_contact_fields',NULL,NULL,'2026-01-09 10:36:06.262',1),
('da528e1b-4baa-4f43-bc52-937bf75faf84','bd4bf7c669a4b20ad8a7508f3b0f76c810c9d7963556c465d4be6ec344cc63c6','2026-01-15 07:29:49.766','20260115072949_add_company_logo_url',NULL,NULL,'2026-01-15 07:29:49.741',1),
('e0e76fac-8cf2-4b00-84c7-2f094e12e20a','80b2c9b41f2b5439e6c44b68afd7f6608748993508684350d25319bc22cf75b4','2026-01-09 07:29:05.145','20260109072904_init_mysql',NULL,NULL,'2026-01-09 07:29:04.564',1),
('f63f54ae-7574-41e1-b26d-66a91004a2e1','117d4f12a080e30d45167017f3f2f594e729100f738c8a069c8b271d8ca300ad','2026-01-15 07:15:07.336','20260115071507_add_parent_company',NULL,NULL,'2026-01-15 07:15:07.296',1);
/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Dumping routines for database 'metta-platform'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */;

-- Dump completed on 2026-07-28 12:00:27
