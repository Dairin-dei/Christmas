import {
  PATH_TO_TOYS,
  eShapes,
  eColors,
  eSizes,
  IOrnament,
} from "./definitions";

class Card {
  num: string;
  name: string;
  amount: number;
  year: number;
  shape: eShapes;
  color: eColors;
  size: eSizes;
  favorite: boolean;

  constructor(ornament: IOrnament) {
    this.num = ornament.num;
    this.name = ornament.name;
    this.amount = ornament.amount;
    this.year = ornament.year;
    this.shape = ornament.shape;
    this.color = ornament.color;
    this.size = ornament.size;
    this.favorite = ornament.favorite;
  }

  createDomCard(): HTMLElement {
    const templateCard = document.querySelector(
      ".template-card"
    ) as HTMLTemplateElement;
    const domCard = templateCard.content.cloneNode(true) as HTMLElement;
    const domCardImage = domCard.querySelector(
      ".card-image"
    ) as HTMLImageElement;
    const domCardNum = domCard.querySelector(".card-num") as HTMLElement;
    const domCardName = domCard.querySelector(".card-name") as HTMLElement;
    const domCardAmount = domCard.querySelector(".card-amount") as HTMLElement;
    const domCardYear = domCard.querySelector(".card-year") as HTMLElement;
    const domCardShape = domCard.querySelector(".card-shape") as HTMLElement;
    const domCardColor = domCard.querySelector(".card-color") as HTMLElement;
    const domCardSize = domCard.querySelector(".card-size") as HTMLElement;
    const domCardFavorite = domCard.querySelector(
      ".card-favorite"
    ) as HTMLElement;
    domCardNum.textContent = this.num;
    const img = new Image();
    img.src = `${PATH_TO_TOYS}${Number(this.num)}.png`;
    img.onload = () => {
      domCardImage.src = img.src;
    };
    domCardName.textContent = this.name;
    domCardAmount.textContent = `Количество: ${String(this.amount)}`;
    domCardYear.textContent = `Год покупки: ${String(this.year)}`;
    domCardShape.textContent = `Форма: ${this.shape}`;
    domCardColor.textContent = `Цвет: ${this.color}`;
    domCardSize.textContent = `Размер: ${this.size}`;
    domCardFavorite.textContent = `Любимая: ${this.favorite ? "да" : "нет"}`;

    return domCard;
  }
}

export default Card;
