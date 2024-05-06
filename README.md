## 埋点

PV UV

PV 页面的访问量 Page View 就是用户每次对网站访问的记录
UV 指的就是独立访问用户 Unique View 一个IP 算一次

JD TB PDD

1. 用户行为数据 收集 页面的浏览量
2. 用户性能评估 页面的加载时间，API调用延迟的时间，错误的日志
3. 设备和环境 用户操作设备 操作系统 浏览器版本
4. 用户属性数据 用户的ID 地理位置 用户的角色

收集用户的隐私

## 跨域

域名不同 协议不同 端口不同
CORS协议

请求分为普通请求 和 复杂请求
默认支持的普通请求头部 默认支持请求的类型 get post head options
1. Content-type: application/x-www-form-urlencoded
2. multipart/form-data
3. text/plain
默认支持请求头的字段
Accept
Accept-Language
Content-Language
Contet-type
Origin
Referer
User-Agent

application/json 不在里面这个属于复杂的请求

1. 排除普通请求
2. 自定义请求头
3. 必须是Post 并且为 application/json

发送预检请求 浏览器自己发的（发送两次请求）

## 存储

一般是存入Redis 不存mysql
因为Redis 是内存存储
redis支持很多数据结构 hash set list 地图 字符串
内存会丢失 重启了宕机了就会丢失数据
redis持久化 RDB AOF
他的速度比mysql快很多

而Mysql 是硬盘存储
底层结构是B+树 红黑树 二叉树 b树
insert into(insert语句)