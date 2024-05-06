import { Send } from "../types";

export default function pageView(send: Send) {  
  // hash 的监听
  window.addEventListener("hashchange", (event) => {
    send({
      type: "pageView",
      text: "hash",
      data: {
        newURL: event.newURL,
        oldURL: event.oldURL
      }
    });
  });
  // history 的监听 popState pushState
  window.addEventListener("popstate", (event) => {
    send({
      type: "pageView",
      text: "history",
      data: {
        state: event.state,
        title: document.title,
        url: location.href
      }
    });
  });
  const originalPushState = history.pushState;
  window.history.pushState = function (state: any, title: string, url?: string | null) {
    // 自定义事件 发布订阅
    const e = new Event("pushState");
    window.dispatchEvent(e);
    return originalPushState.call(this, state, title, url);
  }
  window.addEventListener("pushState", (event) => {
    send({
      type: "pageView",
      text: event.type,
      data: {
        url: location.href
      }
    });
  });
}