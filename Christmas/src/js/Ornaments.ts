import { CHOSEN_TOYS, CHOSEN_AMOUNT, IOrnament } from "./definitions";
import Card from "./Card";
import Popup from "./Popup";
import LocalStorageToys from "./LocalStorageToys";

class Ornaments {
  cards: Array<Card>;
  localStorageToys: LocalStorageToys;

  constructor(ornamentsArray: Array<IOrnament>) {
    this.cards = this.convertArrayToCards(ornamentsArray);
    this.localStorageToys = new LocalStorageToys();
  }

  convertArrayToCards(ornamentsArray: Array<IOrnament>): Array<Card> {
    const tempCards: Array<Card> = [];
    ornamentsArray.forEach((element) => {
      tempCards.push(new Card(element));
    });
    return tempCards;
  }

  placeAllCards(loadFromStorage: boolean) {
    if (loadFromStorage) {
      this.getDataFromLocalStorage();
    }
    this.localStorageToys.setSettingsForSaving(CHOSEN_TOYS);

    const domCards = document.querySelector(".cards") as HTMLElement;

    const cardsArray = domCards.querySelectorAll(".card");
    cardsArray.forEach((elem) => {
      domCards.removeChild(elem);
    });
    const domFragment = document.createDocumentFragment();
    this.cards.forEach((card) => {
      const domCard = card.createDomCard();
      domFragment.append(domCard);
    });
    domCards.appendChild(domFragment);

    const domCardElements = domCards.querySelectorAll(".card");
    domCardElements.forEach((elem) => {
      const dataNum: string = (elem.querySelector(".card-num") as HTMLElement)
        .textContent as string;

      elem.setAttribute("data-num", dataNum);
      if (CHOSEN_TOYS.includes(dataNum)) {
        this.changeChoosingOrnament(elem as HTMLElement);
      }
    });

    this.setEventListener();
  }

  setEventListener() {
    const domCards = document.querySelector(".cards") as HTMLElement;
    domCards.onclick = (event: MouseEvent) => {
      const card = (event.target as HTMLElement).closest(
        ".card"
      ) as HTMLElement;
      const dataNum = card.getAttribute("data-num") as string;

      const index: number = CHOSEN_TOYS.indexOf(dataNum);
      if (index >= 0) {
        CHOSEN_TOYS.splice(index, 1);
        this.changeChoosingOrnament(card);
        this.localStorageToys.setSettingsForSaving(CHOSEN_TOYS);
      } else {
        if (CHOSEN_TOYS.length == CHOSEN_AMOUNT) {
          const popupWindow: Popup = new Popup(
            "Извините, все слоты заполнены",
            event.clientX,
            event.clientY
          );
          popupWindow.showPopupWindow();
        } else {
          CHOSEN_TOYS.push(dataNum);
          this.changeChoosingOrnament(card);
          this.localStorageToys.setSettingsForSaving(CHOSEN_TOYS);
        }
      }

      const chosenSpan = document.querySelector(".chosen-span") as HTMLElement;
      chosenSpan.textContent = String(CHOSEN_TOYS.length);
    };
  }

  changeChoosingOrnament(domElement: HTMLElement): void {
    domElement.classList.toggle("card-active");
    const domCardRibbon = domElement.querySelector(
      ".card-ribbon"
    ) as HTMLElement;
    domCardRibbon.classList.toggle("ribbon-active");
  }

  getDataFromLocalStorage(): void {
    this.localStorageToys.getItemsFromLocalStorage();
    if (this.localStorageToys.chosenToys.length > 0) {
      CHOSEN_TOYS.length = 0;
      this.localStorageToys.chosenToys.forEach((elem) => {
        CHOSEN_TOYS.push(elem);
      });
      const chosenSpan = document.querySelector(".chosen-span") as HTMLElement;
      chosenSpan.textContent = String(CHOSEN_TOYS.length);
    }
  }
}
export default Ornaments;
