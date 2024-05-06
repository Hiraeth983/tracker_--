import { Send } from "../types";

export const button = (send: Send) => {
  document.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    const tracker = target.getAttribute("data-tracker");
    const position = target.getBoundingClientRect();
    if (tracker) {
      send({
        type: "button_event",
        text: tracker,
        data: {
          x: position.x,
          y: position.y,
          width: position.width,
          height: position.height
        },
      });
    }
  })
}