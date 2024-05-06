import { getUserInfo } from "./user";
import { button } from "./button";
import error from "./error/window";
import promiseError from "./error/promise";
import request from "./request";
import pageView from "./page_view/page";
import onePage from "./one_page";
import { Types } from "./types";

export class Tracker {
  events: Record<string, Function>;

  constructor() {
    this.events = {
      button,
      error,
      promiseError,
      request,
      pageView,
      onePage
    };
    this.init();
  }

  private init() {
    Object.keys(this.events).forEach((event) => {
      this.events[event](this.sendRequest);
    });
  }

  public sendRequest(params: Types) {
    const userInfo = getUserInfo();
    const body = Object.assign({}, params, userInfo);
    // 发送请求
    // 此处不可以使用 axios fetch ajax
    // 原因为当点击页面时会出现关闭页面、刷新页面等操作，此时请求可能会被取消（丢失）
    // navigator.sendBeacon() 方法可用于通过HTTP将少量数据异步传输到Web服务器，即使浏览器关闭也能保证数据传输
    // 1. 默认发送POST请求，且数据格式为字符串
    // 2. 请求为ping类型的请求，所以传递的参数和返回的数据都是简短的数据
    // 3. 不可以传递json数据 可以利用Blob对象传递，设置type为application/json
    // 4. 设置type为application/json时会导致跨域 (复杂请求)
    // 5. 默认携带cookie
    let blob = new Blob([JSON.stringify(body)], { type: "application/json" });
    navigator.sendBeacon("http://localhost:3000/tracker", blob);
  }
}