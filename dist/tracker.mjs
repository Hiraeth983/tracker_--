const s = (o = {}) => ({
  userId: 1,
  name: "Leo",
  date: (/* @__PURE__ */ new Date()).getTime(),
  userAgent: navigator.userAgent
}), c = (o) => {
  document.addEventListener("click", (t) => {
    const e = t.target, r = e.getAttribute("data-tracker"), n = e.getBoundingClientRect();
    r && o({
      type: "button_event",
      text: r,
      data: {
        x: n.x,
        y: n.y,
        width: n.width,
        height: n.height
      }
    });
  });
};
function d(o) {
  window.addEventListener("error", (t) => {
    o({
      type: "error",
      text: t.message,
      data: {
        filename: t.filename,
        lineno: t.lineno,
        colno: t.colno,
        error: t.error
      }
    });
  });
}
function u(o) {
  window.addEventListener("unhandledrejection", (t) => {
    o({
      type: t.type,
      text: t.reason,
      data: {
        reason: t.reason,
        path: location.href
      }
    });
  });
}
function p(o) {
  const t = XMLHttpRequest.prototype.open, e = XMLHttpRequest.prototype.send;
  XMLHttpRequest.prototype.open = function(n, i, a = !0) {
    return o({
      type: "ajax",
      text: "request",
      data: {
        method: n,
        url: i,
        async: a
      }
    }), t.call(this, n, i, a);
  }, XMLHttpRequest.prototype.send = function(n) {
    return o({
      type: "ajax",
      text: "response",
      data: {
        body: n
      }
    }), e.call(this, n);
  };
  const r = window.fetch;
  window.fetch = function(...n) {
    return o({
      type: "fetch",
      text: "request",
      data: {
        args: n
      }
    }), r.call(this, ...n);
  };
}
function h(o) {
  window.addEventListener("hashchange", (e) => {
    o({
      type: "pageView",
      text: "hash",
      data: {
        newURL: e.newURL,
        oldURL: e.oldURL
      }
    });
  }), window.addEventListener("popstate", (e) => {
    o({
      type: "pageView",
      text: "history",
      data: {
        state: e.state,
        title: document.title,
        url: location.href
      }
    });
  });
  const t = history.pushState;
  window.history.pushState = function(e, r, n) {
    const i = new Event("pushState");
    return window.dispatchEvent(i), t.call(this, e, r, n);
  }, window.addEventListener("pushState", (e) => {
    o({
      type: "pageView",
      text: e.type,
      data: {
        url: location.href
      }
    });
  });
}
function l(o) {
  let t = 0;
  const e = new MutationObserver((r) => {
    console.log(r), r.forEach((n) => {
      t = performance.now();
    }), t > 0 && (o({
      type: "onePage",
      text: "firstScreenTime",
      data: {
        firstScreenTime: t
      }
    }), e.disconnect());
  });
  e.observe(document.body, { childList: !0, subtree: !0 });
}
class w {
  constructor() {
    this.events = {
      button: c,
      error: d,
      promiseError: u,
      request: p,
      pageView: h,
      onePage: l
    }, this.init();
  }
  init() {
    Object.keys(this.events).forEach((t) => {
      this.events[t](this.sendRequest);
    });
  }
  sendRequest(t) {
    const e = s(), r = Object.assign({}, t, e);
    let n = new Blob([JSON.stringify(r)], { type: "application/json" });
    navigator.sendBeacon("http://localhost:3000/tracker", n);
  }
}
export {
  w as Tracker
};
