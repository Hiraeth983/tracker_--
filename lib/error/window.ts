import { Send } from "../types";

export default function error(send: Send) {
  // 无法捕获 Promise 中的错误
  window.addEventListener("error", (event) => {
    // console.log(event);
    send({
      type: "error",
      text: event.message,
      data: {
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        error: event.error
      }
    })
  });
}