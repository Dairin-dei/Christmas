import { ANIMATION_TIME_500 } from "./definitions";

class Popup {
  message: string;
  coordX: number;
  coordY: number;
  constructor(message: string, coordX: number, coordY: number) {
    this.message = message;
    this.coordX = coordX;
    this.coordY = coordY;
  }

  showPopupWindow() {
    const domBlurPopup: HTMLElement = document.querySelector(
      ".blur-popup"
    ) as HTMLElement;
    const domPopup: HTMLElement = domBlurPopup.querySelector(
      ".popup"
    ) as HTMLElement;
    const domPopupText: HTMLElement = domPopup.querySelector(
      ".popup-text"
    ) as HTMLElement;

    domPopup.style.top = `${this.coordY}px`;
    domPopup.style.left = `${this.coordX}px`;

    domPopupText.textContent = this.message;
    domBlurPopup.classList.remove("hidden");

    setTimeout(() => {
      domPopup.classList.add("popup-opacity");
      setTimeout(() => {
        domPopup.classList.remove("popup-opacity");
        domBlurPopup.classList.add("hidden");
      }, ANIMATION_TIME_500);
    }, ANIMATION_TIME_500);
  }
}

export default Popup;
