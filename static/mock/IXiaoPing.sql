SET NAMES UTF8;
DROP DATABASE IF EXISTS IXiaoPing;
CREATE DATABASE IXiaoPing CHARSET=utf8;
USE IXiaoPing;

/*学校表格表*/
CREATE TABLE school(
	sc_id INT PRIMARY KEY AUTO_INCREMENT,	#学校编号
	sc_name VARCHAR(64)	,					#学校名称
	sc_address VARCHAR(32),					#学校地址
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*插入商品家族表数据*/
INSERT INTO school VALUES(NULL,'浙江理工大学','杭州');

/*餐厅表*/
CREATE TABLE dining_hall(
	dh_id INT PRIMARY KEY AUTO_INCREMENT, #餐厅编号
	sc_id INT,					#学校编号
	FOREIGN KEY(sc_id) REFERENCES school(sc_id),

	dh_name VARCHAR(32),          #主标题
	dh_address VARCHAR(32),       #副标题
	dh_info VARCHAR(128),            #商品标签
	dh_kind VARCHAR(32),         #商品价格
	dh_star VARCHAR(32),     #商品配送时间
	dh_score VARCHAR(32),			#上架时间
)ENGINE=InnoDB DEFAULT CHARSET=UTF8;
/*插入餐厅表数据*/
INSERT INTO dining_hall VALUES(NULL,1,'盛夏·彩虹千层蛋糕',	NULL,'HOT',318.00,'最早明天10:00配送','1539532800000',10,'鲜果口味','1.0磅','2','约13.5×13.5cm','img/products/details/spec (1).png','适合3-5人分享','含5套餐具','0-4℃保藏10小时，5℃食用为佳','无盐黄油,稀奶油','新西兰,法国/德国','<div><img src="img/products/details/1_1_1 (2).jpg" alt=""></div><div><img src="img/products/details/1_1_1 (1).jpg" alt=""></div><div class="fruit-details"><div class="fruitImg-details"><img src="img/products/details/mango.jpg" class="img-md"></div><div class="fruitTxt-details"><p>金黄色的芒果</p><p>蕴藏着敦厚的果肉</p><p>香滑甜蜜的口感</p><p>让人想起阳光的滋味</p></div></div><div class="fruit-details"><div class="fruitTxt-details"><p>草莓薰红的季节</p><p>带来满口的酸甜</p><p>原汁原味</p><p>鲜丽诱人</p></div><div class="fruitImg-details"><img src="img/products/details/strawberry (1).jpg" class="img-md"></div></div><div class="fruit-details"><div class="fruitImg-details"><img src="img/products/details/cantaloupe.jpg" class="img-md"></div><div class="fruitTxt-details"><p>淡青色的甜瓜</p><p>每一口都清香柔嫩</p><p>甜蜜无孔不入</p><p>充盈在唇齿间</p></div></div><div class="fruit-details"><div class="fruitTxt-details"><p>新鲜的蓝莓</p><p>与蛋糕的精心配比</p><p>酸甜清爽</p><p>回味无穷</p></div><div class="fruitImg-details"><img src="img/products/details/blueberries.jpg" class="img-md"></div></div><div class="fruit-details"><div class="fruitImg-details"><img src="img/products/details/banana.jpg" class="img-md"></div><div class="fruitTxt-details"><p>黄澄澄的香蕉</p><p>人见人爱的微笑水果</p><p>饱满的果肉 甜甜的香气</p><p>让人一吃就停不下来</p></div></div><div class="fruit-details"><div class="fruitTxt-details"><p>黄金奶源地高品质奶源</p><p>香浓又健康</p><p>让你与大自然更亲近</p></div><div class="fruitImg-details"><img src="img/products/details/milk.jpg" class="img-md"></div></div>',1);

/*商品图片表*/
CREATE TABLE product_img_info(
	product_img_id INT PRIMARY KEY AUTO_INCREMENT, #商品图片编号
	pid INT,   #商品编号
	FOREIGN KEY(pid) REFERENCES dining_hall(product_id),
	md VARCHAR(128),   #商品中图片路径
	lg VARCHAR(128)   #商品大图片路径
)ENGINE=InnoDB DEFAULT CHARSET=UTF8;
/*插入商品图片表数据*/
INSERT INTO product_img_info VALUES(NULL,1,'img/products/md/1_1_1.jpg','img/products/lg/1_1_1.jpg');

/*用户信息表*/
CREATE TABLE user_info(
	uid INT NOT NULL PRIMARY KEY AUTO_INCREMENT, #用户编号
	uname VARCHAR(32),                           #用户名称9**
	upwd  VARCHAR(32),                           #用户密码
	user_name VARCHAR(32),                       #用户真实姓名
	avatar VARCHAR(128),                         #用户图像
	gender TINYINT DEFAULT 1,                    #用户性别
	birth BIGINT,                                #用户生日
	phone VARCHAR(11),                           #手机号
	email VARCHAR(32)                            #邮箱
)ENGINE=InnoDB DEFAULT CHARSET=UTF8;
/*插入用户信息表数据*/
INSERT INTO user_info VALUES(NULL,'dingding','123456','丁丁',null,0,0,'13576245310','1225431879@qq.com');

/*地址信息表*/
CREATE TABLE user_address_info(
	aid INT PRIMARY KEY AUTO_INCREMENT,  #用户地址编号
	user_id INT,                         #用户编号
	FOREIGN KEY(user_id) REFERENCES user_info(uid),
	recevier VARCHAR(32),                #收件人姓名
	phone VARCHAR(11) UNIQUE,            #手机号
	province VARCHAR(32),                #省
	city VARCHAR(32),                    #市
	county VARCHAR(32),                  #县
	address VARCHAR(128),                #详细地址
	postcode CHAR(6),                    #邮编
	is_default BOOLEAN DEFAULT 0         #是否为当前用户的默认收货地址
)ENGINE=InnoDB DEFAULT CHARSET=UTF8;

/*购物车表*/
CREATE TABLE shopping_cart(
	cart_id INT PRIMARY KEY AUTO_INCREMENT, #购物车栏目编号
	user_id INT,                            #用户编号
	FOREIGN KEY(user_id) REFERENCES user_info(uid),
	pid INT,                         #商品编号
	FOREIGN KEY(pid) REFERENCES dining_hall(product_id),
	product_count INT                      #商品购买数量
)ENGINE=InnoDB DEFAULT CHARSET=UTF8;

/*订单表*/
CREATE TABLE order_info(
	order_id INT PRIMARY KEY AUTO_INCREMENT,  #订单编号
	user_id INT,                              #用户编号
	FOREIGN KEY(user_id) REFERENCES user_info(uid),
	aid INT,                           #地址编号
	FOREIGN KEY(aid) REFERENCES user_address_info(aid),
	status INT,                               #订单状态 1-等待付款  2-等待发货  3-运输中  4-已签收  5-已取消  
	order_time BIGINT,                        #下单时间
	pay_time BIGINT,                          #付款时间
	deliver_time BIGINT,                      #发货时间
	recevied_time BIGINT                      #签收时间
)AUTO_INCREMENT=10000000 ENGINE=InnoDB DEFAULT CHARSET=UTF8;

/*订单详情表*/
CREATE TABLE order_detail_info(
	order_did INT PRIMARY KEY AUTO_INCREMENT, #订单栏目编号
	order_id INT,                             #订单编号
	FOREIGN KEY(order_id) REFERENCES order_info(order_id),
	pid INT,                           #商品编号
	FOREIGN KEY(pid) REFERENCES dining_hall(product_id),
	count INT                                #商品购买数量
)ENGINE=InnoDB DEFAULT CHARSET=UTF8;

/*首页轮播图表*/
CREATE TABLE index_carousel(
	carousel_id INT PRIMARY KEY AUTO_INCREMENT,  #轮播图编号
	img VARCHAR(128),                            #图片路径
	title VARCHAR(64),                           #图片描述
	href VARCHAR(128)                            #图片链接
)ENGINE=InnoDB DEFAULT CHARSET=UTF8;
INSERT INTO index_carousel VALUES(NULL,'img/index/banner_1.jpg','中秋月饼礼盒','product_details.html?product_id=49');


/*首页产品表*/
CREATE TABLE index_product(
	index_product_id INT PRIMARY KEY AUTO_INCREMENT,  #主页商品编号
	pid INT,                                    #商品编号
	FOREIGN KEY(pid) REFERENCES dining_hall(product_id), 
	title VARCHAR(32),                          #商品标题
	subtitle VARCHAR(64),                       #商品副标题
	tag VARCHAR(64),                            #商品标签
	spec VARCHAR(32),                           #商品规格
	img VARCHAR(64),                            #商品图片路径
	price DECIMAL(10,2),                        #商品价格
	href VARCHAR(64)                            #商品链接
)ENGINE=InnoDB DEFAULT CHARSET=UTF8;
INSERT INTO index_product VALUES(NULL,28,'雪域牛乳芝士蛋糕','特浓牛乳和新西兰上等芝士用独特的工艺','人气爆款','1.0磅','img/index/index_cake1.jpg',198.00,'product_details.html?product_id=28');

/*首页广告图表*/
CREATE TABLE index_ad(
	ad_id INT PRIMARY KEY AUTO_INCREMENT,      #广告图片编号
	img VARCHAR(128),                          #广告图片路径
	title VARCHAR(32),                         #广告图片描述
	href VARCHAR(128)                          #广告图片链接
)ENGINE=InnoDB DEFAULT CHARSET=UTF8;
/*插入首页广告图表数据*/
INSERT INTO index_ad VALUES(NULL,'img/index/promote_1.jpg','蛋糕促销','product_details.html?product_id=23');
