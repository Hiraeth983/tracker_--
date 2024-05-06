import { Send } from "../types";

export default function promiseError(send: Send) {
  window.addEventListener("unhandledrejection", (event) => {
    // console.log(event);
    send({
      type: event.type,
      text: event.reason,
      data: {
        reason: event.reason,
        path: location.href
      }
    })
  })
}