class DecorationCard {
  id: number;
  path: string;
  className: string;
  imageClassName: string;
  count?: number;

  constructor(
    id: number,
    path: string,
    className: string,
    imageClassName: string,
    count?: number
  ) {
    this.id = id;
    this.path = path !== "" ? path : "";
    this.className = className;
    this.imageClassName = imageClassName;
    this.count = count;
  }

  createDecorationCard(num: number, isCountNeeded = false): HTMLElement {
    const templateCard = document.querySelector(
      ".template-decoration-card"
    ) as HTMLTemplateElement;
    const domWrapper = templateCard.content.cloneNode(true) as HTMLElement;

    const domCard = domWrapper.querySelector(".decoration-card") as HTMLElement;

    const domCardImg: HTMLImageElement = domCard.querySelector(
      ".decoration-card-image"
    ) as HTMLImageElement;

    const domCardNum = domCard.querySelector(
      ".decoration-card-num"
    ) as HTMLElement;

    domCard.classList.add(this.className);
    domCard.setAttribute("data-num", String(this.id));
    domCardImg.classList.add(this.imageClassName);
    domCardNum.textContent = String(this.id);
    if (this.path) {
      const img = new Image();
      img.src = this.path;
      img.onload = () => {
        domCardImg.src = this.path;
      };
      domCardImg.setAttribute("data-num", String(this.id));
    }

    if (isCountNeeded && this.path && this.count) {
      const domCardCountWrapper = domCard.querySelector(
        ".decoration-card-count-wrapper"
      ) as HTMLImageElement;
      const domCardCount = domCardCountWrapper.querySelector(
        ".decoration-card-count"
      ) as HTMLElement;

      domCardCountWrapper.classList.remove("hidden");
      domCardCount.textContent = String(this.count);
    }

    return domCard;
  }
}

export default DecorationCard;
