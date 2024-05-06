import { Send } from "../types";

export default function request(send: Send) {
  // 捕获 ajax 请求
  // 拦截原生API就是重写方法
  const originalOpen = XMLHttpRequest.prototype.open;
  const originalSend = XMLHttpRequest.prototype.send;
  XMLHttpRequest.prototype.open = function (method: string, url: string, async: boolean = true) {
    send({
      type: "ajax",
      text: "request",
      data: {
        method,
        url,
        async
      }
    });
    return originalOpen.call(this, method, url, async);
  }
  XMLHttpRequest.prototype.send = function (body: any) {
    send({
      type: "ajax",
      text: "response",
      data: {
        body
      },
    });
    return originalSend.call(this, body);
  }

  // 捕获 fetch 请求
  const originalFetch = window.fetch;
  window.fetch = function (...args: any[]) {
    send({
      type: "fetch",
      text: "request",
      data: {
        args
      }
    });
    return originalFetch.call(this, ...args);
  }
}