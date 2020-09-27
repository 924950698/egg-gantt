1. Egg.js中的渐进式开发

通用组件 -》 框架扩展 -》 内置插件 -》 独立插件 -》 抽象框架 <br/>
这个逐渐独立、完善的过程称为渐进式开发。<br/>

需求：在各个页面获取本机设备信息<br/>

各种做法：<br/>
通用组件：在app/utils下封装一个获取本机信息的通用方法。 <br/>
框架扩展：在app下新增extend文件夹，新增context.js文件，将 获取本机器的info()方法封装到里面<br/>
内置插件：在根目录下创建lib/plugin/egg-info/app/extend; egg的内置插件用egg开头 ，将 获取本机器的info()方法封装到extend的context.js文件下。<br/>
并导出package.json（ ⚠️注意：插件需要导出）。并在config/plugin.js中倒导入该插件。path: path.join(__dirname, '../lib/plugin/egg-info') 生成该插件的相对路径。

2. Controller、 Service 和 test 单元测试

（M）Service：就是在复杂业务场景下用于做业务逻辑封装的一个抽象层<br/>
（V）View：视图模版展示<br/>
（C）Controller：负责处理业务逻辑；比如根据用户访问不同的 URL，渲染不同的模板得到 HTML 返回给用户<br/>

3. mysql数据库常用命令

-- 查看数据库<br>
show databases;

-- 删除数据库 <br>
drop database egg;

-- 创建数据库<br>
create database egg;

-- 在数据库中创建表<br>
use egg;<br>

```

create table user(
  id int(10) not null auto_increment, 
  name varchar(20) not null default 'admin' comment '用户名',
  pwd varchar(50) not null comment '密码',
  primary key(id)
)engine=InnoDB charset=utf8;

```

tips: <br>
int、varchar 前者为基本数据类型、后者为string类型<br>
auto_increment 自动递增<br>
default 'admin' 默认名称<br>
primary key(id) 以id为主键<br>
engine=InnoDB 存储引擎 （ InnoDB 的设计目标是处理大容量数据时最大化性能，它的 CPU 利用率是其他所有基于磁盘的关系数据库引擎中最有效率的。）<br>


-- 查看表
show tables;<br>

-- 查看表结构
desc user;<br>

-- 删除表
drop table user;<br>

-- 插入表数据
insert into user(name, pwd) values('user1', '123');<br>
insert into user values(2, 'user2', '123');<br>
insert into user values(3, 'user3', '123');<br>

tips: 
可以指定字段顺序，否则按照表结构中的字段顺序执行<br>

-- 查询表数据
select * from user;<br>
select id,name from user;            // 查询指定字段<br>
select id,name from user where id=1; // 数据筛选<br>

-- 修改表数据
update user set pwd='123456' where id = 1;<br>

-- 删除表数据
delete from user where id = 2;<br>