import express from "express";
import nodemailer from "nodemailer";

// 创建一个SMTP客户端配置
const transporter = nodemailer.createTransport({
  service: "qq",
  port: 465, // SMTP 端口
  host: "smtp.qq.com",
  auth: {
    user: "2670428853@qq.com",
    pass: "", // 自行前往 qq邮箱 账号与安全 安全设置 POP3/IMAP/SMTP/Exchange/CardDAV 服务
  },
});

const app = express();

// 支持post请求 接收参数
app.use(express.json());

app.use((req, res, next) => {
  // 允许跨域 指定为 * 或者 IP:port
  // 携带cookie时不能使用 *
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  // 允许携带cookie
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Content-Type"); // 允许请求头中携带的字段
  next();
});


app.post("/tracker", (req, res) => {
  console.log(req.body);
  const body = req.body;
  if (body.type === "error" || body.type === "unhandledrejection") {
    // 发送邮件
    transporter.sendMail({
      from: "2670428853@qq.com",
      to: "2670428853@qq.com",
      subject: "错误信息",
      text: JSON.stringify(body),
    });
  }
  res.send("success"); // 一定要返回简短的响应
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});