import { Send } from "../types";

// 统计首屏加载时间
export default function onePage(send: Send) {
  let firstScreenTime = 0;
  const mutationObserver = new MutationObserver((mutations) => {
    console.log(mutations);
    mutations.forEach((mutation) => {
      firstScreenTime = performance.now();
    });
    if (firstScreenTime > 0) {
      send({
        type: "onePage",
        text: "firstScreenTime",
        data: {
          firstScreenTime
        }
      });
      // 停止观察
      mutationObserver.disconnect();
    }
  });
  // childList: true 表示监听目标节点或子节点的变化
  // subtree: true 表示监听目标节点或子节点的所有后代节点的变化
  mutationObserver.observe(document.body, { childList: true, subtree: true });
}