create database egg_house;

use egg_house;

create table `user`(
  `id` int not null auto_increment,
  `username` varchar(20) default null comment '用户名',
  `password` varchar(64) default null comment '密码',
  `phone` varchar(20) default null comment '电话',
  `sign` varchar(300) default null comment '用户签名',
  `createTime` timestamp comment '创新时间',
  `updateTime` timestamp default '1970-01-01 10:00:00' comment '更新时间',
  `avatar` text comment '头像',
  primary key(`id`)
)engine=InnoDB auto_increment=1 default charset=utf8 comment='用户表';