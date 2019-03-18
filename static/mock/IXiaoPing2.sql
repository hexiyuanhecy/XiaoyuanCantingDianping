SET NAMES UTF8;
DROP DATABASE IF EXISTS IXiaoPing;
CREATE DATABASE IXiaoPing CHARSET=utf8;
USE IXiaoPing;

CREATE TABLE school(
	sc_id INT PRIMARY KEY AUTO_INCREMENT,	#学校编号
	sc_name VARCHAR(64)	,					#学校名称
	sc_address VARCHAR(32),					#学校地址
)

INSERT INTO school VALUES(NULL,'浙江理工大学','杭州');

CREATE TABLE dining_hall(
	dh_id INT PRIMARY KEY AUTO_INCREMENT, #餐厅编号
	sc_id INT,					#学校编号
	FOREIGN KEY(sc_id) REFERENCES school(sc_id),

	dh_name VARCHAR(32),          #餐厅名
	dh_address VARCHAR(32),       #餐厅地址
	dh_info VARCHAR(128),         #餐厅信息
	dh_kind VARCHAR(32),          #餐厅种类
	dh_star INT(),    						#餐厅点赞数
	dh_score INT(),								#餐厅评分
	dh_main_img VARCHAR(128)			#餐厅主图
)

INSERT INTO dining_hall VALUES(NULL,1,'韩式烤肉拌饭','玫瑰园二楼','给你最正宗的韩式烤肉拌饭，让你的味蕾为了我们的拌饭驻足！','热门餐厅', 108, 4.8, "/api/images/hanshikaorou.jpg");


CREATE TABLE dining_hall_img(
	dh_img_id INT PRIMARY KEY AUTO_INCREMENT, #餐厅图片编号
	dh_id INT,   															#餐厅编号
	FOREIGN KEY(dh_id) REFERENCES dining_hall(dh_id),
	dh_img_path VARCHAR(128),   							#图片路径
)

INSERT INTO dining_hall_img VALUES(NULL,1,'/api/images/hanshikaorou.jpg');


CREATE TABLE dish(
	ds_id INT PRIMARY KEY AUTO_INCREMENT,     #菜品编号
	dh_id INT,   															#餐厅编号
	FOREIGN KEY(dh_id) REFERENCES dining_hall(dh_id),
	ds_name VARCHAR(64)												#菜品名
	ds_img_path VARCHAR(128),   							#图片路径
)

INSERT INTO dining_hall_img VALUES(NULL, 1, "韩式海苔烤肉拌饭", '/api/images/hanshikaorou.jpg');

CREATE TABLE user_info(
	user_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,  #用户编号
	dh_id INT,																		 		#用户的店
	user_ph VARCHAR(11),                          		#手机号
	user_name VARCHAR(32),                           	#用户名
	user_pwd  VARCHAR(32),                           	#用户密码
	user_pic VARCHAR(128),                         		#用户图像
	user_sign TINYINT DEFAULT 1,                    	#用户签名
	birth BIGINT,                                			#用户生日
	email VARCHAR(32)                            			#用户邮箱
)

INSERT INTO user_info VALUES(NULL,'1','18177310581','Admin',"Admin", "/api/images/mypic.jpg",null,null,'153769507@qq.com');


CREATE TABLE estimate(
	es_id INT PRIMARY KEY AUTO_INCREMENT,#用户地址编号
	dh_id INT,													 #店铺编号
	FOREIGN KEY(dh_id) REFERENCES dining_hall(dh_id),
	user_id INT,                         #评价用户编号
	FOREIGN KEY(user_id) REFERENCES user(user_id),
	es_content VARCHAR(1024),            #评价内容
	es_date DATE,            						 #评价时间
	es_score VARCHAR(32),                #评价评分
	es_star VARCHAR(32),                 #评价点赞数
	es_main_img VARCHAR(64),						 #评价主图
)


CREATE TABLE estimate_img(
	es_img_id INT PRIMARY KEY AUTO_INCREMENT, #评价图编号
	es_id INT,                                #评价编号
	FOREIGN KEY(es_id) REFERENCES estimate(es_id),
	es_img_path VARCHAR(64),                   #商品购买数量
)

