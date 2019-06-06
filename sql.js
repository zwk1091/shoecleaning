CREATE TABLE IF NOT EXISTS `myorders`(
   `id` INT UNSIGNED AUTO_INCREMENT,
   `user_name` VARCHAR(100) NOT NULL,
   `user_phone` VARCHAR(25) NOT NULL,
   `address` VARCHAR(100) NOT NULL,
   `order_date` DATE,
   `state` INT,
   PRIMARY KEY ( `id` )
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

//插入新的数据
insert into myorders(user_name,user_phone,address,order_date,state) 
	values('于海','110','慎思园6号',NOW(),1);



