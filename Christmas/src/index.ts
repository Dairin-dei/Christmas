import Parameters from "./js/Parameters";
import DecorationParameters from "./js/DecorationParameters";
//import { IOrnament, IOrnamentSimple } from "./js/definitions";
//import selfestimation from "./js/selfesrimation";
import { snowInterval } from "./js/DecorationParameters";

export class App {
  parameters: Parameters;
  decorationParameters: DecorationParameters;

  constructor() {
    this.parameters = new Parameters();
    this.decorationParameters = new DecorationParameters();
  }

  start() {
    this.addEventListeners();
  }

  addEventListeners(): void {
    const buttonHome: HTMLElement = document.querySelector(
      ".button-home"
    ) as HTMLElement;
    const buttonOrnaments: HTMLElement = document.querySelector(
      ".button-ornaments"
    ) as HTMLElement;
    const buttonTree: HTMLElement = document.querySelector(
      ".button-tree"
    ) as HTMLElement;
    const buttonStart: HTMLElement = document.querySelector(
      ".button-start"
    ) as HTMLElement;

    buttonHome.addEventListener("click", () => {
      this.switchPages("start-page", "button-home");
    });
    buttonOrnaments.addEventListener("click", () => {
      this.switchPages("ornaments-page", "button-ornaments");
    });
    buttonTree.addEventListener("click", () => {
      this.switchPages("tree-page", "button-tree");
    });

    buttonStart.addEventListener("click", () => {
      this.launchApp();
    });

    this.addEventListenerBeforeUnload();
  }

  launchApp() {
    this.switchPages("ornaments-page", "button-ornaments");

    this.parameters.initializeParameters(this);
  }

  switchPages(pageName: string, buttonName: string): void {
    const domMainPages: NodeList = document.querySelectorAll(".section");
    const domHeader: HTMLElement = document.querySelector(
      "header"
    ) as HTMLElement;
    const domHeaderButtons: NodeList = domHeader.querySelectorAll(".button");

    let currentPage = document.querySelector(".start-page") as HTMLElement;
    domMainPages.forEach((elem: Node) => {
      const elemHtml: HTMLElement = elem as HTMLElement;
      if (!elemHtml.classList.contains("hidden")) {
        currentPage = elemHtml;
      }
      elemHtml.classList.add("hidden");
    });

    domHeaderButtons.forEach((elem: Node) => {
      const elemHtml: HTMLElement = elem as HTMLElement;
      elemHtml.classList.remove("active-page");
    });

    const page = document.querySelector(`.${pageName}`) as HTMLElement;
    page.classList.remove("hidden");
    if (pageName !== "start-page") {
      domHeader.classList.remove("hidden");
      const domButton: HTMLElement = domHeader.querySelector(
        `.${buttonName}`
      ) as HTMLElement;
      domButton.classList.add("active-page");
    }
    if (pageName === "tree-page") {
      this.decorationParameters.showParameters();
      const buttonSnow = document.querySelector(".button-snow") as HTMLElement;
      buttonSnow.classList.remove("hidden");
    } else {
      const buttonSnow = document.querySelector(".button-snow") as HTMLElement;
      buttonSnow.classList.add("hidden");
      if (snowInterval) {
        clearInterval(snowInterval);
      }
    }

    if (!currentPage.classList.contains("start-page")) {
      this.decorationParameters.tree.localStorageTree.setToLocalStorage();
    }
  }

  addEventListenerBeforeUnload(): void {
    window.addEventListener("beforeunload", () => {
      this.decorationParameters.tree.localStorageTree.setToLocalStorage();
      this.parameters.localStorageFilters.setToLocalStorage();
      this.parameters.ornaments.localStorageToys.setToLocalStorage();
    });
  }
}
//selfestimation();

const app = new App();

app.start();
