create database egg_house;

use egg_house;

-- 用户表
create table `user`(
  `id` int not null auto_increment,
  `username` varchar(20) default null comment '用户名',
  `password` varchar(64) default null comment '密码',
  `avatar` text comment '头像',
  `e-mail` varchar(20) detault null comment '电话',
  `sign` varchar(300) default null comment '用户签名',
  `createTime` timestamp default null comment '创新时间',
  `updateTime` timestamp default null comment '更新时间',
  primary key(`id`) 
)engine=InnoDB auto_increment=1 default charset=utf-8 comment='用户表'