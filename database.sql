/*
 Navicat Premium Data Transfer

 Source Server         : mydatabase
 Source Server Type    : PostgreSQL
 Source Server Version : 160002 (160002)
 Source Host           : localhost:5432
 Source Catalog        : truck
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 160002 (160002)
 File Encoding         : 65001

 Date: 28/02/2024 04:01:07
*/


-- ----------------------------
-- Sequence structure for customers_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."customers_id_seq";
CREATE SEQUENCE "public"."customers_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for trucklists_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."trucklists_id_seq";
CREATE SEQUENCE "public"."trucklists_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for userlists_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."userlists_id_seq";
CREATE SEQUENCE "public"."userlists_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Table structure for customers
-- ----------------------------
DROP TABLE IF EXISTS "public"."customers";
CREATE TABLE "public"."customers" (
  "id" int4 NOT NULL DEFAULT nextval('customers_id_seq'::regclass),
  "CustomerName" varchar(255) COLLATE "pg_catalog"."default",
  "CarNumber" varchar(32) COLLATE "pg_catalog"."default",
  "Detail" varchar(255) COLLATE "pg_catalog"."default",
  "Date" date,
  "State" varchar(255) COLLATE "pg_catalog"."default",
  "createdAt" date,
  "updatedAt" date
)
;

-- ----------------------------
-- Records of customers
-- ----------------------------
INSERT INTO "public"."customers" VALUES (210, 'customer', 'fwefwe', 'fwefqewf', '2024-02-26', 'accepted', '2024-02-26', '2024-02-26');

-- ----------------------------
-- Table structure for trucklists
-- ----------------------------
DROP TABLE IF EXISTS "public"."trucklists";
CREATE TABLE "public"."trucklists" (
  "id" int4 NOT NULL DEFAULT nextval('trucklists_id_seq'::regclass),
  "FirstNumber" varchar COLLATE "pg_catalog"."default",
  "SecondNumber" varchar COLLATE "pg_catalog"."default",
  "Company" varchar(255) COLLATE "pg_catalog"."default",
  "Type" varchar(255) COLLATE "pg_catalog"."default",
  "createdAt" date,
  "updatedAt" date
)
;

-- ----------------------------
-- Records of trucklists
-- ----------------------------
INSERT INTO "public"."trucklists" VALUES (3, '2404', '2405', 'A & K Enns Trucking Ltd. ', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (4, '2406', '2407', 'A & K Enns Trucking Ltd. ', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (2, '111', '111', '11111', '11111', '2024-02-28', '2024-02-28');

-- ----------------------------
-- Table structure for userlists
-- ----------------------------
DROP TABLE IF EXISTS "public"."userlists";
CREATE TABLE "public"."userlists" (
  "id" int4 NOT NULL DEFAULT nextval('userlists_id_seq'::regclass),
  "Name" varchar(255) COLLATE "pg_catalog"."default",
  "Email" varchar(255) COLLATE "pg_catalog"."default",
  "Job" varchar(255) COLLATE "pg_catalog"."default",
  "Password" varchar(255) COLLATE "pg_catalog"."default",
  "createdAt" date,
  "updatedAt" date,
  "PhoneNumber" varchar COLLATE "pg_catalog"."default"
)
;

-- ----------------------------
-- Records of userlists
-- ----------------------------
INSERT INTO "public"."userlists" VALUES (49, 'customer', 'customer@gmail.com', 'customer', '$2b$10$mBWlX482us0dlnukWrHqXO8Ye9/AqQ1xuiEUC98lbQC8NGKB4B9ne', '2024-02-26', '2024-02-26', '34324-231-4543');
INSERT INTO "public"."userlists" VALUES (50, 'driver', 'driver@gmail.com', 'driver', '$2b$10$gwLrCar.UMfuxWJMmvXU1.rXZUe0rU9KM5AFZKLahO0nuvlnVjmgO', '2024-02-26', '2024-02-26', '123-34-4546');
INSERT INTO "public"."userlists" VALUES (51, 'washer', 'washer@gmail.com', 'washer', '$2b$10$NqHlegOekWcPj1eCcqD8H.pgNR6nsS2AvOBBOdGwEieCYfYv5YTyO', '2024-02-26', '2024-02-26', '345-565-234');
INSERT INTO "public"."userlists" VALUES (34, 'admin', 'admin@gmail.com', 'admin', '$2b$10$KQshERy1ODkHJR0kRpV0du9C9nSxz4Ywxbvq5C7XHLtg/p8TXO7PG', '2024-02-24', '2024-02-24', '4546546456546');

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."customers_id_seq"
OWNED BY "public"."customers"."id";
SELECT setval('"public"."customers_id_seq"', 210, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."trucklists_id_seq"
OWNED BY "public"."trucklists"."id";
SELECT setval('"public"."trucklists_id_seq"', 4, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."userlists_id_seq"
OWNED BY "public"."userlists"."id";
SELECT setval('"public"."userlists_id_seq"', 51, true);

-- ----------------------------
-- Primary Key structure for table customers
-- ----------------------------
ALTER TABLE "public"."customers" ADD CONSTRAINT "customers_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table trucklists
-- ----------------------------
ALTER TABLE "public"."trucklists" ADD CONSTRAINT "trucklists_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table userlists
-- ----------------------------
ALTER TABLE "public"."userlists" ADD CONSTRAINT "userlists_pkey" PRIMARY KEY ("id");
