1. Egg.js中的渐进式开发

通用组件 -》 框架扩展 -》 内置插件 -》 独立插件 -》 抽象框架 <br/>
这个逐渐独立、完善的过程称为渐进式开发。<br/>

需求：在各个页面获取本机设备信息<br/>

各种做法：<br/>
通用组件：在app/utils下封装一个获取本机信息的通用方法。 <br/>
框架扩展：在app下新增extend文件夹，新增context.js文件，将 获取本机器的info()方法封装到里面<br/>
内置插件：在根目录下创建lib/plugin/egg-info/app/extend; egg的内置插件用egg开头 ，将 获取本机器的info()方法封装到extend的context.js文件下。<br/>
并导出package.json（ ⚠️注意：插件需要导出）。并在config/plugin.js中倒导入该插件。path: path.join(__dirname, '../lib/plugin/egg-info') 生成该插件的相对路径。


