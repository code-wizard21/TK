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

 Date: 01/03/2024 00:58:35
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
-- Sequence structure for dropdowns_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."dropdowns_id_seq";
CREATE SEQUENCE "public"."dropdowns_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for pickups_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."pickups_id_seq";
CREATE SEQUENCE "public"."pickups_id_seq" 
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
-- Table structure for companies
-- ----------------------------
DROP TABLE IF EXISTS "public"."companies";
CREATE TABLE "public"."companies" (
  "id" int4 NOT NULL DEFAULT nextval('customers_id_seq'::regclass),
  "Company" varchar(255) COLLATE "pg_catalog"."default",
  "LeadNumber" varchar(32) COLLATE "pg_catalog"."default",
  "Detail" varchar(255) COLLATE "pg_catalog"."default",
  "Date" date,
  "State" varchar(255) COLLATE "pg_catalog"."default",
  "createdAt" date,
  "updatedAt" date,
  "Pickup" varchar(255) COLLATE "pg_catalog"."default",
  "DropsName" varchar(255) COLLATE "pg_catalog"."default"
)
;

-- ----------------------------
-- Records of companies
-- ----------------------------
INSERT INTO "public"."companies" VALUES (211, 'A & K Enns Trucking Ltd.', '2304-2305', 'wash truck', '2024-02-29', 'request', '2024-02-29', '2024-02-29', NULL, NULL);
INSERT INTO "public"."companies" VALUES (212, 'A & K Enns Trucking Ltd.', '2916-2917', 'wash truck', '2024-02-29', 'request', '2024-02-29', '2024-02-29', NULL, NULL);
INSERT INTO "public"."companies" VALUES (213, 'A & K Enns Trucking Ltd.', '2306-2307', 'wash truck', '2024-02-29', 'request', '2024-02-29', '2024-02-29', NULL, NULL);
INSERT INTO "public"."companies" VALUES (214, 'A & K Enns Trucking Ltd.', '2306-2307', 'dsadasd', '2024-03-01', 'requested', '2024-03-01', '2024-03-01', NULL, NULL);
INSERT INTO "public"."companies" VALUES (210, 'customer', 'fwefwe', 'fwefqewf', '2024-02-26', 'accepted', '2024-02-26', '2024-02-26', NULL, NULL);
INSERT INTO "public"."companies" VALUES (215, 'A & K Enns Trucking Ltd.', '2406-2407', 'wash truck', '2024-03-01', 'requested', '2024-03-01', '2024-03-01', NULL, NULL);
INSERT INTO "public"."companies" VALUES (216, 'A & K Enns Trucking Ltd.', '2404-2405', 'wash truck', '2024-03-01', 'requested', '2024-03-01', '2024-03-01', 'pick2', 'drop1');

-- ----------------------------
-- Table structure for dropdowns
-- ----------------------------
DROP TABLE IF EXISTS "public"."dropdowns";
CREATE TABLE "public"."dropdowns" (
  "id" int4 NOT NULL DEFAULT nextval('dropdowns_id_seq'::regclass),
  "Name" varchar(255) COLLATE "pg_catalog"."default",
  "createdAt" date,
  "updatedAt" date
)
;

-- ----------------------------
-- Records of dropdowns
-- ----------------------------
INSERT INTO "public"."dropdowns" VALUES (1, 'drop1', '2024-02-29', '2024-02-29');
INSERT INTO "public"."dropdowns" VALUES (2, 'drop2', '2024-02-29', '2024-02-29');
INSERT INTO "public"."dropdowns" VALUES (3, 'drop3', '2024-02-29', '2024-02-29');

-- ----------------------------
-- Table structure for pickups
-- ----------------------------
DROP TABLE IF EXISTS "public"."pickups";
CREATE TABLE "public"."pickups" (
  "id" int4 NOT NULL DEFAULT nextval('pickups_id_seq'::regclass),
  "Name" varchar(255) COLLATE "pg_catalog"."default",
  "createdAt" date,
  "updatedAt" date
)
;

-- ----------------------------
-- Records of pickups
-- ----------------------------
INSERT INTO "public"."pickups" VALUES (1, 'pick1', '2024-02-29', '2024-02-29');
INSERT INTO "public"."pickups" VALUES (2, 'pick2', '2024-02-29', '2024-02-29');
INSERT INTO "public"."pickups" VALUES (3, 'pick3', '2024-02-29', '2024-02-29');

-- ----------------------------
-- Table structure for trucklists
-- ----------------------------
DROP TABLE IF EXISTS "public"."trucklists";
CREATE TABLE "public"."trucklists" (
  "id" int4 NOT NULL DEFAULT nextval('trucklists_id_seq'::regclass),
  "LeadNumber" varchar COLLATE "pg_catalog"."default",
  "PupNumber" varchar COLLATE "pg_catalog"."default",
  "Company" varchar(255) COLLATE "pg_catalog"."default",
  "Type" varchar(255) COLLATE "pg_catalog"."default",
  "createdAt" date,
  "updatedAt" date
)
;

-- ----------------------------
-- Records of trucklists
-- ----------------------------
INSERT INTO "public"."trucklists" VALUES (1, '2304', '2305', 'A & K Enns Trucking Ltd. ', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (2, '2306', '2307', 'A & K Enns Trucking Ltd. ', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (3, '2404', '2405', 'A & K Enns Trucking Ltd. ', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (4, '2406', '2407', 'A & K Enns Trucking Ltd. ', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (5, '2811', '2812', 'A & K Enns Trucking Ltd. ', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (6, '2916', '2917', 'Abramson Enterprises', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (7, '2944', '2945', 'Abramson Enterprises', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (8, '2952', '2953', 'Abramson Enterprises', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (9, '2603', '2604', 'Abramson Enterprises Ltd-CTI', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (10, '2326', '2327', 'AKJ Lowbedding', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (11, '2332', '2333', 'AKJ Lowbedding', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (12, '2466', '2467', 'Boulder Bottom Transport', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (13, '2476', '2477', 'Boulder Bottom Transport', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (14, '2850', '2851', 'Boulder Bottom Transport', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (15, '2920', '2921', 'Boulder Bottom Transport', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (16, '2124', '2125', 'Brian Anderson', 'Edmonton', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (17, '2010', '2011', 'Bucky"s Transport Dbl', 'Winnipeg', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (18, '2302', '2303', 'C.S. Day Transport Ltd.', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (19, '2374', '2375', 'C.S. Day Transport Ltd.', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (20, '2378', '2379', 'C.S. Day Transport Ltd.', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (21, '2380', '2381', 'C.S. Day Transport Ltd.', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (22, '2392', '2393', 'C.S. Day Transport Ltd.', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (23, '2400', '2401', 'C.S. Day Transport Ltd.', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (24, '2402', '2403', 'C.S. Day Transport Ltd.', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (25, '2661', '2662', 'C.S. Day Transport Ltd.', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (26, '2858', '2859', 'C.S. Day Transport Ltd.', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (27, '2904', '2905', 'C.S. Day Transport Ltd.', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (28, '2910', '2911', 'C.S. Day Transport Ltd.', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (29, '2934', '2935', 'C.S. Day Transport Ltd.', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (30, '2936', '2937', 'C.S. Day Transport Ltd.', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (31, '2938', '2939', 'C.S. Day Transport Ltd.', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (32, '2946', '2947', 'C.S. Day Transport Ltd.', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (33, '2856', '2857', 'C.S. Day Transport Ltd. Triple', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (34, '2870', '2871', 'C.S. Day Transport Ltd. Triple', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (35, '2689', '2690', 'C.S. Day Transport Ltd.-CTI', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (36, '2868', '2869', 'C.S. Day Transport Ltd.-CTI', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (37, '2820', '2822', 'C.S. Day Transport Ltd.-CTI-spare', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (38, '2100', '2101', 'Camil Cloutier', 'Edmonton', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (39, '2110', '2111', 'Camil Cloutier', 'Edmonton', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (40, '2122', '2123', 'Camil Cloutier', 'Edmonton', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (41, '2130', '2131', 'Chris Hansen', 'Prince George', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (42, '2442', '2443', 'Chris Hansen', 'Prince George', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (43, '2134', '2135', 'Claudio', 'Edmonton', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (44, '2132', '2133', 'Consumer', 'Edmonton', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (45, '2496', '2497', 'Creative Truck Performance ', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (46, '2683', '2684', 'Creative Truck Performance ', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (47, '2663', '2664', 'Creative Truck Performance-CTI ', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (48, '2864', '2865', 'Creative Truck Performance-CTI ', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (49, '2655', '2656', 'Creative Truck Performance-CTI not cti ', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (50, '2328', '2329', 'Croissant''s Transport Ltd. ', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (51, '2330', '2331', 'Croissant''s Transport Ltd. ', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (52, '2376', '2377', 'Croissant''s Transport Ltd. ', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (53, '2394', '2395', 'Croissant''s Transport Ltd. ', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (54, '2695', '2696', 'Croissant''s Transport Ltd. ', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (55, '2687', '2688', 'Csday Transport CTI 9 axle ', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (56, '2342', '2343', 'Darren James Trucking ', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (57, '2384', '2385', 'Darren James Trucking ', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (58, '2950', '2951', 'Darren James Trucking ', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (59, '2962', '2963', 'Darren James Trucking ', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (60, '2136', '2137', 'Dennis Mathews', 'Prince George', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (61, '2358', '2359', 'E.B. Hart Trucking Ltd.', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (62, '2874', '2875', 'E.B. Hart Trucking Ltd.', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (63, '2966', '2967', 'E.B. Hart Trucking Ltd.', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (64, '2016', '2017', 'FCL Spare Trailer', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (65, '2018', '2019', 'FCL Spare Trailer', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (66, '2160', '2161', 'FCL Spare Trailer', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (67, '2346', '2347', 'FCL Spare Trailer', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (68, '2388', '2389', 'FCL Spare Trailer', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (69, '2410', '2411', 'FCL Spare Trailer', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (70, '2412', '2413', 'FCL Spare Trailer', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (71, '2414', '2415', 'FCL Spare Trailer', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (72, '2416', '2417', 'FCL Spare Trailer', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (73, '2418', '2419', 'FCL Spare Trailer', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (74, '2420', '2421', 'FCL Spare Trailer', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (75, '2422', '2423', 'FCL Spare Trailer', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (76, '2424', '2425', 'FCL Spare Trailer', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (77, '2426', '2427', 'FCL Spare Trailer', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (78, '2428', '2429', 'FCL Spare Trailer', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (79, '2430', '2431', 'FCL Spare Trailer', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (80, '2432', '2433', 'FCL Spare Trailer', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (81, '2438', '2439', 'FCL Spare Trailer', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (82, '2450', '2451', 'FCL Spare Trailer', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (83, '2453', '2454', 'FCL Spare Trailer', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (84, '2455', '2456', 'FCL Spare Trailer', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (85, '2457', '', 'FCL Spare Trailer', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (86, '2468', '2469', 'FCL Spare Trailer', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (87, '2491', '2492', 'FCL Spare Trailer', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (88, '2493', '', 'FCL Spare Trailer', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (89, '2498', '2499', 'FCL Spare Trailer', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (90, '2601', '2602', 'FCL Spare Trailer', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (91, '2605', '2606', 'FCL Spare Trailer', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (92, '2607', '2608', 'FCL Spare Trailer', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (93, '2609', '2610', 'FCL Spare Trailer', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (94, '2611', '2612', 'FCL Spare Trailer', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (95, '2613', '2614', 'FCL Spare Trailer', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (96, '2617', '2618', 'FCL Spare Trailer', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (97, '2623', '2624', 'FCL Spare Trailer', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (98, '2627', '2628', 'FCL Spare Trailer', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (99, '2629', '2630', 'FCL Spare Trailer', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (100, '2631', '2632', 'FCL Spare Trailer', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (101, '2633', '2634', 'FCL Spare Trailer', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (102, '2635', '2636', 'FCL Spare Trailer', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (103, '2637', '2638', 'FCL Spare Trailer', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (104, '2639', '2640', 'FCL Spare Trailer', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (105, '2641', '2642', 'FCL Spare Trailer', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (106, '2643', '2644', 'FCL Spare Trailer', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (107, '2645', '2646', 'FCL Spare Trailer', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (108, '2653', '2654', 'FCL Spare Trailer', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (109, '2801', '2802', 'FCL Spare Trailer', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (110, '2809', '', 'FCL Spare Trailer', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (111, '2813', '2814', 'FCL Spare Trailer', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (112, '2815', '', 'FCL Spare Trailer', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (113, '2852', '2853', 'FCL Spare Trailer', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (114, '2854', '2855', 'FCL Spare Trailer', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (115, '2862', '2863', 'FCL Spare Trailer', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (116, '2893', '2894', 'FCL Spare Trailer', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (117, '2914', '2915', 'FCL Spare Trailer', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (118, '2922', '', 'FCL Spare Trailer', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (119, '2948', '2949', 'FCL Spare Trailer', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (120, '2954', '2955', 'FCL Spare Trailer', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (121, '2970', '2971', 'FCL Spare Trailer', 'Winnipeg', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (122, '2972', '2973', 'FCL Spare Trailer', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (123, '2974', '2975', 'FCL Spare Trailer', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (124, '2998', '', 'FCL Spare Trailer', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (125, '11096', '', 'FCL Spare Trailer', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (126, '110961', '', 'FCL Spare Trailer', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (127, '2088', '2089', 'FCL Spare Trailer DBL', 'Winnipeg', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (128, '2092', '2093', 'FCL Spare Trailer DBL', 'Winnipeg', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (129, '2490', '', 'FCL Spare Trailer900', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (130, '2144', '2145', 'Fenton', 'Edmonton', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (131, '2166', '2167', 'Fenton', 'Edmonton', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (132, '2621', '2622', 'Fenton', 'Edmonton', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (133, '2102', '2103', 'Fleet Spare', 'Edmonton', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (134, '2106', '2107', 'Fleet Spare', 'Edmonton', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (135, '2114', '2115', 'Fleet Spare', 'Edmonton', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (136, '2172', '2173', 'Fleet Spare', 'Edmonton', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (137, '2174', '2175', 'Fleet Spare', 'Edmonton', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (138, '2178', '2179', 'Fleet Spare', 'Edmonton', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (139, '4000', '', 'Ft Sask Lumber Hub', 'Fort SK', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (140, '2140', '2141', 'Glen Spender', 'Prince George', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (141, '2120', '2121', 'GNZ', 'Edmonton', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (142, '2126', '2127', 'GNZ', 'Edmonton', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (143, '2146', '2147', 'GNZ', 'Edmonton', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (144, '2170', '2171', 'GNZ', 'Edmonton', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (145, '2310', '2311', 'Grainger Transport Ltd.', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (146, '2340', '2341', 'Grainger Transport Ltd.', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (147, '2448', '2449', 'Grainger Transport Ltd.', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (148, '2679', '2680', 'Grainger Transport Ltd.', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (149, '2300', '2301', 'Heibein''s Trucking Ltd.', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (150, '2334', '2335', 'Heibein''s Trucking Ltd.', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (151, '2338', '2339', 'Heibein''s Trucking Ltd.', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (152, '2356', '2357', 'Heibein''s Trucking Ltd.', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (153, '2458', '2459', 'Heibein''s Trucking Ltd.', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (154, '2460', '2461', 'Heibein''s Trucking Ltd.', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (155, '2659', '2660', 'Heibein''s Trucking Ltd.', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (156, '2667', '2668', 'Heibein''s Trucking Ltd.', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (157, '2805', '2806', 'Heibein''s Trucking Ltd.', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (158, '2838', '2839', 'Heibein''s Trucking Ltd.', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (159, '2908', '2909', 'Heibein''s Trucking Ltd.', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (160, '2958', '2959', 'Heibein''s Trucking Ltd.', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (161, '2978', '2979', 'Heibein''s Trucking Ltd.', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (162, '2104', '2105', 'IRK', 'Edmonton', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (163, '2128', '2129', 'Jest N Time', 'Edmonton', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (164, '2320', '2321', 'K & M Transport Ltd.', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (165, '2348', '2349', 'K & M Transport Ltd.', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (166, '2350', '2351', 'K & M Transport Ltd.', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (167, '2398', '2399', 'K & M Transport Ltd.', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (168, '2462', '2463', 'K & M Transport Ltd.', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (169, '2647', '2648', 'K & M Transport Ltd.', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (170, '2649', '2650', 'K & M Transport Ltd.', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (171, '2651', '2652', 'K & M Transport Ltd.', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (172, '2816', '2817', 'K & M Transport Ltd.', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (173, '2900', '2901', 'K & M Transport Ltd.', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (174, '2928', '2929', 'K & M Transport Ltd.', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (175, '2930', '2931', 'K & M Transport Ltd.', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (176, '2932', '2933', 'K & M Transport Ltd.', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (177, '2980', '2981', 'K & M Transport Ltd.', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (178, '2176', '2177', 'Ken Kerlak', 'Edmonton', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (179, '2940', '2941', 'Kreutzer Transport', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (180, '2396', '2397', 'Kreutzer Transport', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (181, '2691', '2692', 'Kreutzer Transport', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (182, '2408', '2409', 'Lurch`s Winchin', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (183, '2464', '2465', 'Lurch`s Winchin', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (184, '2878', '2879', 'Lurch`s Winchin', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (185, '2968', '2969', 'Lurch`s Winchin', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (186, '2982', '', 'Lurch`s Winchin', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (187, '2360', '2361', 'M & L Trucking', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (188, '2364', '2365', 'Madden Cartage', 'Winnipeg', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (189, '2472', '2473', 'Madden Cartage', 'Winnipeg', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (190, '2896', '2897', 'Madden Cartage', 'Winnipeg', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (191, '2164', '2165', 'Manteis', 'Edmonton', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (192, '2474', '2475', 'Manteis', 'Edmonton', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (193, '2352', '2353', 'Momentum Transport Ltd.', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (194, '2370', '2371', 'Momentum Transport Ltd.', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (195, '2669', '2670', 'Momentum Transport Ltd.', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (196, '2860', '2861', 'Momentum Transport Ltd.', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (197, '2906', '2907', 'Momentum Transport Ltd.', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (198, '2012', '2013', 'Peters Transport Dbl', 'Winnipeg', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (199, '2318', '2319', 'Pro Fuel Hauling Ltd.', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (200, '2382', '2383', 'Pro Fuel Hauling Ltd.', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (201, '2488', '2489', 'Pro Fuel Hauling Ltd.', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (202, '2494', '2495', 'Pro Fuel Hauling Ltd.', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (203, '2697', '2698', 'Pro Fuel Hauling Ltd.', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (204, '2807', '2808', 'Pro Fuel Hauling Ltd.', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (205, '2846', '2847', 'Pro Fuel Hauling Ltd.', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (206, '2902', '2903', 'Pro Fuel Hauling Ltd.', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (207, '2918', '2919', 'Pro Fuel Hauling Ltd.', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (208, '2926', '2927', 'Pro Fuel Hauling Ltd.', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (209, '2960', '2961', 'Pro Fuel Hauling Ltd.', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (210, '2312', '2313', 'R & G Transport', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (211, '2366', '2367', 'R & G Transport', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (212, '2484', '2485', 'R & G Transport', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (213, '2486', '2487', 'R & G Transport', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (214, '2834', '2835', 'R & G Transport', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (215, '2876', '2877', 'R & G Transport', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (216, '2880', '2881', 'R & G Transport', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (217, '3691', '3692', 'Regina Lumber Hub', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (218, '2138', '2139', 'Richard Lupul', 'Prince George', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (219, '2314', '2315', 'Regina', 'Prince George', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (220, '2390', '2391', 'Rockridge Express', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (221, '2681', '2682', 'Rockridge Express', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (222, '2308', '2309', 'Sali Transport', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (223, '2657', '2658', 'Sali Transport', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (224, '2665', '2666', 'Sali Transport', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (225, '2673', '2674', 'Sali Transport', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (226, '2823', '2824', 'Sali Transport', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (227, '2108', '2109', 'Spare PG', 'Prince George', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (228, '2112', '2113', 'Spare PG', 'Prince George', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (229, '2444', '2445', 'Spare PG', 'Prince George', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (230, '2000', '2001', 'Spiers Transport', 'Winnipeg', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (231, '2008', '2009', 'Spiers Transport', 'Winnipeg', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (232, '2898', '2899', 'Spiers Transport', 'Winnipeg', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (233, '2006', '2007', 'Summers Transport', 'Winnipeg', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (234, '2685', '2686', 'Summers Transport', 'Winnipeg', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (235, '2014', '2015', 'Summers Transport Dbl', 'Winnipeg', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (236, '2004', '2005', 'TNP Transport', 'Winnipeg', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (237, '2322', '2323', 'TNP Transport', 'Winnipeg', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (238, '2470', '2471', 'TNP Transport', 'Winnipeg', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (239, '2619', '2620', 'Uwe Asche', 'Edmonton', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (240, '2324', '2325', 'Vann Transport', 'Winnipeg', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (241, '2344', '2345', 'Wagoneer`s X-Press', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (242, '2386', '2387', 'Wagoneer`s X-Press', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (243, '2478', '2479', 'Wagoneer`s X-Press', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (244, '2677', '2678', 'Wagoneer`s X-Press', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (245, '2848', '2849', 'Wagoneer`s X-Press', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (246, '2964', '2965', 'Wagoneer`s X-Press', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (247, '2372', '2373', 'Warlock Transport', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (248, '2956', '2957', 'Warlock Transport', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (249, '2116', '2117', 'Warren Bonnell', 'Edmonton', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (250, '2118', '2119', 'Warren Bonnell', 'Edmonton', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (251, '2142', '2143', 'Warren Bonnell', 'Edmonton', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (252, '2336', '2337', 'Warren Bonnell', 'Edmonton', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (253, '2625', '2626', 'Warren Bonnell', 'Edmonton', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (254, '2693', '2694', 'Wilford Transport', 'Winnipeg', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (255, '2942', '2943', 'Wilford Transport', 'Winnipeg', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (256, '2002', '2003', 'Wilford Transport Dbl', 'Winnipeg', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (257, '2094', '2095', 'Wilford Transport Dbl', 'Winnipeg', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (258, '2354', '2355', 'ZAD Enterprises Ltd.', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (259, '2368', '2369', 'ZAD Enterprises Ltd.', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (260, '2434', '2435', 'ZAD Enterprises Ltd.', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (261, '2440', '2441', 'ZAD Enterprises Ltd.', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (262, '2671', '2672', 'ZAD Enterprises Ltd.', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (263, '2675', '2676', 'ZAD Enterprises Ltd.', 'Regina', '2024-02-28', '2024-02-28');
INSERT INTO "public"."trucklists" VALUES (264, '2976', '2677', 'ZAD Enterprises Ltd.', 'Regina', '2024-02-28', '2024-02-28');

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
INSERT INTO "public"."userlists" VALUES (58, 'A & K Enns Trucking Ltd.', 'company@gmail.com', 'company', '$2b$10$2S2mEzWZ364BgQnbJSmctey3./xKLANtNyuwNZcLpWF/Bn.6oiSoC', '2024-02-29', '2024-02-29', NULL);
INSERT INTO "public"."userlists" VALUES (59, 'Abramson Enterprises', 'company2@gmail.com', 'company', '$2b$10$arzHw.6maLGtDj/l/JFSr.X6kbAk425Ao46Nyj8Kj5iWyg1PVepva', '2024-02-29', '2024-02-29', NULL);
INSERT INTO "public"."userlists" VALUES (60, 'driver', 'driver@gmail.com', 'driver', '$2b$10$Z5voN3itE7rTTVK7AyZnveaYzkHnIwAOUV2nPFHXQb3ySXalCbWhi', '2024-02-29', '2024-02-29', '43543564654634');
INSERT INTO "public"."userlists" VALUES (61, 'washer', 'washer@gmail.com', 'washer', '$2b$10$Gl/qT6s2VX7uSvJdeIiHdeo7g3xcp6d3HCXiQF/EHBiozqoZLtBlu', '2024-02-29', '2024-02-29', '232324324');
INSERT INTO "public"."userlists" VALUES (62, 'Boulder Bottom Transport', 'company3@gmail.com', 'company', '$2b$10$aVO0AnYwktRY9BG35LUSyeFFCSu2krIgdCZPA1ZW1GfahxXJeY.sO', '2024-03-01', '2024-03-01', NULL);
INSERT INTO "public"."userlists" VALUES (63, 'Brian Anderson', 'company4@gmail.com', 'company', '$2b$10$pGTH6DI/UBu8i34dOMcIauwOnROxJa51JPwrHg6Iz3eiewFTUISvS', '2024-03-01', '2024-03-01', NULL);
INSERT INTO "public"."userlists" VALUES (49, 'customer', 'customer@gmail.com', 'customer', '$2b$10$mBWlX482us0dlnukWrHqXO8Ye9/AqQ1xuiEUC98lbQC8NGKB4B9ne', '2024-02-26', '2024-02-26', '34324-231-4543');
INSERT INTO "public"."userlists" VALUES (64, 'Bucky"s Transport Dbl', 'company5@gmail.com', 'company', '$2b$10$qVich/z01D3WqXuUiHT7E.AHrjuUUWDofpgel.pEOb860fRsxp8DW', '2024-03-01', '2024-03-01', NULL);
INSERT INTO "public"."userlists" VALUES (65, 'C.S. Day Transport Ltd.', 'company6@gmail.com', 'company', '$2b$10$LUeKRDVhTvv452FHezuc1u24SYF5JywlIl3KVdpRThnVB/nF.JnKy', '2024-03-01', '2024-03-01', NULL);
INSERT INTO "public"."userlists" VALUES (66, 'C.S. Day Transport Ltd. Triple', 'company7@gmail.com', 'company', '$2b$10$DQdoBAFcOptdkE7x3DcMoeMVDE8tiqEjJwaThlgg3itHgoh68dEhy', '2024-03-01', '2024-03-01', NULL);
INSERT INTO "public"."userlists" VALUES (67, 'C.S. Day Transport Ltd.-CTI-spare', 'company8@gmail.com', 'company', '$2b$10$hbuHb52ZPqGvC3NqEDKCgeLz/WufB6ye/e0B45uHnCFHSpnfHAHN6', '2024-03-01', '2024-03-01', NULL);
INSERT INTO "public"."userlists" VALUES (68, 'Camil Cloutier', 'company9@gmail.com', 'company', '$2b$10$jCVIiBJ5F9emzZoAigEfWeg2trDQIhyEGbBcDWiEE3mNV1c3lESe2', '2024-03-01', '2024-03-01', NULL);
INSERT INTO "public"."userlists" VALUES (69, 'Chris Hansen', 'company10@gmail.com', 'company', '$2b$10$o2UXlVQLhFxiRCZTszWs/ejbyx4uZuP0uOVi3RLSEvKGj0UHoWf7a', '2024-03-01', '2024-03-01', NULL);
INSERT INTO "public"."userlists" VALUES (70, 'Claudio', 'company11@gmail.com', 'company', '$2b$10$8/Wb117sE991rhVFutHkhOr5AXfEk9WdwXWTLRLAdjjQNeYvdOgG.', '2024-03-01', '2024-03-01', NULL);
INSERT INTO "public"."userlists" VALUES (71, 'Consumer', 'company12@gmail.com', 'company', '$2b$10$gxE87SwGx/tu0Crhhv59M.8K2Ja0iLl7AmXXCGmwLpgNPgabG9sZ6', '2024-03-01', '2024-03-01', NULL);
INSERT INTO "public"."userlists" VALUES (72, 'Creative Truck Performance ', 'company13@gmail.com', 'company', '$2b$10$HVfyuNaC4Uwqux3KHLJXPumJeO4haoYTqjgBB1lDdwOdalUA4qlv.', '2024-03-01', '2024-03-01', NULL);
INSERT INTO "public"."userlists" VALUES (73, 'Creative Truck Performance-CTI', 'company14@gmail.com', 'company', '$2b$10$82wxZwqwgszNxCI/lzaTceHltyLQlWTkCVhPEFmWD3uSFB4zDyX5a', '2024-03-01', '2024-03-01', NULL);
INSERT INTO "public"."userlists" VALUES (74, 'Creative Truck Performance-CTI not cti', 'company15@gmail.com', 'company', '$2b$10$UELrZOUADz058iffE64STegnMZJ5PIpXHdcy37tcpDum9V9uumMRG', '2024-03-01', '2024-03-01', NULL);
INSERT INTO "public"."userlists" VALUES (75, 'Croissant''s Transport Ltd.', 'company16@gmail.com', 'company', '$2b$10$c4dmmoJAvpr/xjsTwBeK1.ymljE6mTqfOirYvHMPy8OZKax4fo0je', '2024-03-01', '2024-03-01', NULL);
INSERT INTO "public"."userlists" VALUES (76, 'Csday Transport CTI 9 axle', 'company17@gmail.com', 'company', '$2b$10$J.u.JO7VvRGnQuTzy1PSh.PK5c2yXAMqpQPgriOgY8Hqoahm3FpeC', '2024-03-01', '2024-03-01', NULL);
INSERT INTO "public"."userlists" VALUES (98, 'Manteis', 'company39@gmail.com', 'company', '$2b$10$2pfhpr8Jl85cIfRoMC5uteMSg1/y160ZjQx.M/kukqZAeuspT83i.', '2024-03-01', '2024-03-01', NULL);
INSERT INTO "public"."userlists" VALUES (77, 'Darren James Trucking', 'company18@gmail.com', 'company', '$2b$10$8DT0FSz4EXptu8rw1KiM3eZ1FCat.Zb8d78U0CLjZQB7uoI20JWZ6', '2024-03-01', '2024-03-01', NULL);
INSERT INTO "public"."userlists" VALUES (78, 'Dennis Mathews', 'company19@gmail.com', 'company', '$2b$10$qTjXWyo8qDPplHMUtXUjrOrNuT6WEyux2rdraquaVExIppBUOMtUy', '2024-03-01', '2024-03-01', NULL);
INSERT INTO "public"."userlists" VALUES (79, 'E.B. Hart Trucking Ltd.', 'company20@gmail.com', 'company', '$2b$10$IQuA27T72RGgXsmmjoDD/urbW/rSO2gK4clHIuu0jhM08wof03dBi', '2024-03-01', '2024-03-01', NULL);
INSERT INTO "public"."userlists" VALUES (80, 'FCL Spare Trailer', 'company21@gmail.com', 'company', '$2b$10$W3zAy1PLNNQnroo6MSU.0Oij9AiTN34/b9W39gfQJL26qkUj1nytG', '2024-03-01', '2024-03-01', NULL);
INSERT INTO "public"."userlists" VALUES (81, 'FCL Spare Trailer DBL', 'company22@gmail.com', 'company', '$2b$10$mVTMmZEgcsTX1YHXRniW2eHy85est4YU9BktrtDvqXhiAD33TNRBm', '2024-03-01', '2024-03-01', NULL);
INSERT INTO "public"."userlists" VALUES (82, 'FCL Spare Trailer900', 'company23@gmail.com', 'company', '$2b$10$IoTvpnjG74SAJQTSdDmtjuytMkGAlQCFWcykfk39GdLtzGF28AiNm', '2024-03-01', '2024-03-01', NULL);
INSERT INTO "public"."userlists" VALUES (83, 'Fenton', 'company24@gmail.com', 'company', '$2b$10$7ZSrZgb61a4dUU90aI2gMuv4aiirqsZfWW/8IZJBBW/plfszl4kiu', '2024-03-01', '2024-03-01', NULL);
INSERT INTO "public"."userlists" VALUES (84, 'Fleet Spare', 'company25@gmail.com', 'company', '$2b$10$BFmm5OKICa6dTGCeqdKYGe5jJlMZHhOiOb9a5OczGqmTkQNP0g9Gi', '2024-03-01', '2024-03-01', NULL);
INSERT INTO "public"."userlists" VALUES (85, 'Ft Sask Lumber Hub', 'company26@gmail.com', 'company', '$2b$10$0nIn.jY/YZBZv7JR/fxCLO6zCLL7Uy7TR8M5FlfrLZNgI4XWPLAsi', '2024-03-01', '2024-03-01', NULL);
INSERT INTO "public"."userlists" VALUES (86, 'Glen Spender', 'company27@gmail.com', 'company', '$2b$10$qDZJ78ZmB4drPCQMl2qzEOrG9i769RAc3j3NKzQajl4TYmDIpugPO', '2024-03-01', '2024-03-01', NULL);
INSERT INTO "public"."userlists" VALUES (87, 'GNZ', 'company28@gmail.com', 'company', '$2b$10$.PGU8xzLkIpCfGX7NbKoL.PZH4fASRIIeVSPual5KD0ogmA2gGOcm', '2024-03-01', '2024-03-01', NULL);
INSERT INTO "public"."userlists" VALUES (88, 'Grainger Transport Ltd.', 'company29@gmail.com', 'company', '$2b$10$L6qMgWIe72KP1zKaE6tGuuGPemyxZdwSMO0o9tVTBWP3UdT.ZZXgO', '2024-03-01', '2024-03-01', NULL);
INSERT INTO "public"."userlists" VALUES (89, 'Heibein''s Trucking Ltd.', 'company30@gmail.com', 'company', '$2b$10$kmVcnBhaURHmIMgz5BuMe.lOaaJ3qvBVCbWgrC5JN8tp6tXy9Gccm', '2024-03-01', '2024-03-01', NULL);
INSERT INTO "public"."userlists" VALUES (90, 'IRK', 'company31@gmail.com', 'company', '$2b$10$0vKGzxOMOfmDAgpMN7LW7.Hiq89Pe/IIWqKGSRiLCDCK2vBoTYr12', '2024-03-01', '2024-03-01', NULL);
INSERT INTO "public"."userlists" VALUES (91, 'Jest N Time', 'company32@gmail.com', 'company', '$2b$10$elMfIdcLgigd2CRYBOM.TufP8bhm1Tgp0LyBm4phfRpoX6N0mKzGq', '2024-03-01', '2024-03-01', NULL);
INSERT INTO "public"."userlists" VALUES (92, 'K & M Transport Ltd.', 'company33@gmail.com', 'company', '$2b$10$0cI.7wiMFENvBzlzB6x8ru5P89HPspbI4G2Jia02DujEM8qWAMlYS', '2024-03-01', '2024-03-01', NULL);
INSERT INTO "public"."userlists" VALUES (34, 'admin', 'admin@gmail.com', 'admin', '$2b$10$KQshERy1ODkHJR0kRpV0du9C9nSxz4Ywxbvq5C7XHLtg/p8TXO7PG', '2024-02-24', '2024-02-24', '4546546456546');
INSERT INTO "public"."userlists" VALUES (93, 'Ken Kerlak', 'company34@gmail.com', 'company', '$2b$10$iwQ7UMNpNk3HrwDM6PW0BeVGNeUKVufr6vOHVc7v3kBJlG9Pdt4yK', '2024-03-01', '2024-03-01', NULL);
INSERT INTO "public"."userlists" VALUES (94, 'Kreutzer Transport', 'company35@gmail.com', 'company', '$2b$10$l68/rQz4MiTjBsSOPMFfDOjIJ6fY8pZN8G.JJXZoXG1XMNTA0ZiRK', '2024-03-01', '2024-03-01', NULL);
INSERT INTO "public"."userlists" VALUES (95, 'Lurch`s Winchin', 'company36@gmail.com', 'company', '$2b$10$KYEUjMhJCjhMeGByuCBicuRuqexdSrv1ySJP0L.ngNRU6Z1rdqp3u', '2024-03-01', '2024-03-01', NULL);
INSERT INTO "public"."userlists" VALUES (96, 'M & L Trucking', 'company37@gmail.com', 'company', '$2b$10$Jkmnvk8.Y/IAriecGjhW1e7jda8yhrNg3GceD/3KF0zN0RI66MjZm', '2024-03-01', '2024-03-01', NULL);
INSERT INTO "public"."userlists" VALUES (97, 'Madden Cartage', 'company38@gmail.com', 'company', '$2b$10$9r3ss0qfmATjc2hItzS0qeKZAyUq818mxxN0c.xr9ilECpSzUEHBG', '2024-03-01', '2024-03-01', NULL);
INSERT INTO "public"."userlists" VALUES (99, 'Momentum Transport Ltd. ', 'company40@gmail.com', 'company', '$2b$10$DpHyjITGuLs0HgvkhPbqr.oTc78hXAVrGhNTeoxcwN1tCIkZ/iMuu', '2024-03-01', '2024-03-01', NULL);
INSERT INTO "public"."userlists" VALUES (100, 'Peters Transport Dbl', 'company41@gmail.com', 'company', '$2b$10$JWPID2UKgNQuaHOo03cwGuQ5xuV1ZUgNjecbVPwunNfRq608LEkQW', '2024-03-01', '2024-03-01', NULL);
INSERT INTO "public"."userlists" VALUES (101, 'Pro Fuel Hauling Ltd.', 'company42@gmail.com', 'company', '$2b$10$jhgMWNPf9VfTn/3r6wf1bujxa31N31Jwpm9b.cRHTp2CmPws2pis6', '2024-03-01', '2024-03-01', NULL);
INSERT INTO "public"."userlists" VALUES (102, 'R & G Transport', 'company43@gmail.com', 'company', '$2b$10$XU9QXhM8w6fpzoq/YVeavOx1rw.jB9ZHl1uqK6rI/tEVn8B6heJtS', '2024-03-01', '2024-03-01', NULL);
INSERT INTO "public"."userlists" VALUES (103, 'Regina Lumber Hub', 'company44@gmail.com', 'company', '$2b$10$NpCBz2jSNChZR1wgKuSGgezIoV1Vg2T1fRd7Vfs4p/MxLC1ZcCDy2', '2024-03-01', '2024-03-01', NULL);
INSERT INTO "public"."userlists" VALUES (104, 'Richard Lupul', 'company45@gmail.com', 'company', '$2b$10$w6/aiJ45INHscO5IX8YMhuZAcJ72Ub69qoCwUu7PVHT.W664tSSMa', '2024-03-01', '2024-03-01', NULL);
INSERT INTO "public"."userlists" VALUES (105, 'Rockridge Express', 'company46@gmail.com', 'company', '$2b$10$WB5JTmvPsRKzt7GsDe0T..Wm0dxTuFfXpL4shgKk1OQ0.RTXL7Ary', '2024-03-01', '2024-03-01', NULL);
INSERT INTO "public"."userlists" VALUES (106, 'Sali Transport', 'company47@gmail.com', 'company', '$2b$10$zuq5cDSLzE/JcQaRiKoEZOOGsBnxpeXS9/jqiE/EtZPpMRamzr./e', '2024-03-01', '2024-03-01', NULL);
INSERT INTO "public"."userlists" VALUES (107, 'Spare PG', 'company48@gmail.com', 'company', '$2b$10$g4eOwDqVIeuD/NVCK2wu6O0fdyyQBhDlHsyKeYGKYHxM5W1vzXnnG', '2024-03-01', '2024-03-01', NULL);
INSERT INTO "public"."userlists" VALUES (108, 'Spiers Transport', 'company49@gmail.com', 'company', '$2b$10$quomUKt0GfCXdQ61WJaSTuQ/6AcH/BeQ7mzCrUtvISvqdcuuRGyLe', '2024-03-01', '2024-03-01', NULL);
INSERT INTO "public"."userlists" VALUES (109, 'Summers Transport', 'company50@gmail.com', 'company', '$2b$10$N.6WKv4fT2rmUNX76PqQk.mt8zO8r8xsCtI5GdbC3fb3DuyTQcwYq', '2024-03-01', '2024-03-01', NULL);
INSERT INTO "public"."userlists" VALUES (110, 'Summers Transport Dbl', 'company51@gmail.com', 'company', '$2b$10$VrthbKL9CxLJkKS2gVEn9uUYyQpklo0dSIbX8TSRFEj2XhR.mOOga', '2024-03-01', '2024-03-01', NULL);
INSERT INTO "public"."userlists" VALUES (111, 'TNP Transport ', 'company52@gmail.com', 'company', '$2b$10$72Mc.1h7Z0Tso.mJrhiAL.pwj8WDMLm2uvz0i3kJziljSOGNR6xya', '2024-03-01', '2024-03-01', NULL);
INSERT INTO "public"."userlists" VALUES (112, 'Uwe Asche', 'company53@gmail.com', 'company', '$2b$10$pshzJSvEYU.PcKYejOw2pOGrvoxa7xlt4J0wPaij3EG4lIKinZEq2', '2024-03-01', '2024-03-01', NULL);
INSERT INTO "public"."userlists" VALUES (113, 'Vann Transport', 'company54@gmail.com', 'company', '$2b$10$zWOQAb4cw6AcAZUdXLaDbO2ZU5D1iyaX.jvB9QURPsiT2261.j0/6', '2024-03-01', '2024-03-01', NULL);
INSERT INTO "public"."userlists" VALUES (114, 'Wagoneer`s X-Press', 'company55@gmail.com', 'company', '$2b$10$zQK3dcWarYfTGzxk1YsDdeKiKYP5Pz06gICPn43AtO7UPY8jg.GCS', '2024-03-01', '2024-03-01', NULL);
INSERT INTO "public"."userlists" VALUES (115, 'Warlock Transport', 'company56@gmail.com', 'company', '$2b$10$NCt/xd2DqPKknvBHryqC9OrirjGjQ37Cx76pkSU7DPkib.jEv4nne', '2024-03-01', '2024-03-01', NULL);
INSERT INTO "public"."userlists" VALUES (116, 'Warren Bonnell', 'company57@gmail.com', 'company', '$2b$10$j1weh/kV0f90ePUMeqc9quWsdEyYw8iRW7GwVnIy1HANgXKnnUfGS', '2024-03-01', '2024-03-01', NULL);
INSERT INTO "public"."userlists" VALUES (117, 'Wilford Transport', 'company58@gmail.com', 'company', '$2b$10$nK8qowy4PnRTaeEVhZS5/.aS.tmyGsjzs6HS5mEV9nV3nG0aZDeoG', '2024-03-01', '2024-03-01', NULL);
INSERT INTO "public"."userlists" VALUES (118, 'Wilford Transport Dbl', 'company59@gmail.com', 'company', '$2b$10$2SK1mR9nclvcOO4QDihwROOjd4hxqiKzigUso3oj1.3aIHRe56gkO', '2024-03-01', '2024-03-01', NULL);
INSERT INTO "public"."userlists" VALUES (119, 'ZAD Enterprises Ltd.', 'company60@gmail.com', 'company', '$2b$10$UlCZ7AuGVT4Kycw91gu1e.eeX2utIWcd3GsYNKYo/qpNkiEl21Eei', '2024-03-01', '2024-03-01', NULL);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."customers_id_seq"
OWNED BY "public"."companies"."id";
SELECT setval('"public"."customers_id_seq"', 216, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."dropdowns_id_seq"
OWNED BY "public"."dropdowns"."id";
SELECT setval('"public"."dropdowns_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."pickups_id_seq"
OWNED BY "public"."pickups"."id";
SELECT setval('"public"."pickups_id_seq"', 1, false);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."trucklists_id_seq"
OWNED BY "public"."trucklists"."id";
SELECT setval('"public"."trucklists_id_seq"', 264, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."userlists_id_seq"
OWNED BY "public"."userlists"."id";
SELECT setval('"public"."userlists_id_seq"', 119, true);

-- ----------------------------
-- Primary Key structure for table companies
-- ----------------------------
ALTER TABLE "public"."companies" ADD CONSTRAINT "customers_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table dropdowns
-- ----------------------------
ALTER TABLE "public"."dropdowns" ADD CONSTRAINT "dropdowns_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table pickups
-- ----------------------------
ALTER TABLE "public"."pickups" ADD CONSTRAINT "pickups_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table trucklists
-- ----------------------------
ALTER TABLE "public"."trucklists" ADD CONSTRAINT "trucklists_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table userlists
-- ----------------------------
ALTER TABLE "public"."userlists" ADD CONSTRAINT "userlists_pkey" PRIMARY KEY ("id");
