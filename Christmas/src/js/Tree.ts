import {
  ITreeOrnaments,
  PATH_TO_TOYS,
  PATH_TO_TREES,
  PATH_TO_BACKGROUNDS,
} from "./definitions";

import LocalStorageTree from "./LocalStorageTree";
import Lights from "./lights";

class Tree {
  ornaments: Array<ITreeOrnaments>;
  treePattern: number;
  background: number;
  lights: Lights;
  localStorageTree: LocalStorageTree;
  isLightsOn: boolean;

  constructor() {
    this.ornaments = [];
    this.treePattern = 0;
    this.background = 0;
    this.lights = new Lights(-1);
    this.localStorageTree = new LocalStorageTree();
    this.isLightsOn = false;
  }

  setBackground(pattern: HTMLElement) {
    if (pattern !== null) {
      const parent: HTMLElement = pattern.closest(
        ".decoration-card"
      ) as HTMLElement;
      const domNumCard: HTMLElement = parent.querySelector(
        ".decoration-card-num"
      ) as HTMLElement;
      this.background = Number(domNumCard.textContent);
      this.applyBackground();
    }
  }

  setTreePattern(pattern: HTMLElement) {
    if (pattern !== null) {
      const parent: HTMLElement = pattern.closest(
        ".decoration-card"
      ) as HTMLElement;
      const domNumCard: HTMLElement = parent.querySelector(
        ".decoration-card-num"
      ) as HTMLElement;
      this.treePattern = Number(domNumCard.textContent);
      this.applyTreePattern();
    }
  }

  applyParameters() {
    this.localStorageTree.setSettingsForSaving(this);
    this.applyBackground();
    this.applyTreePattern();
    this.applyOrnaments();
  }

  applyBackground() {
    const domTreeBackground: HTMLElement = document.querySelector(
      ".tree-background-image"
    ) as HTMLElement;
    domTreeBackground.style.backgroundImage = `url(${PATH_TO_BACKGROUNDS}${this.background}.jpg)`;
  }

  applyTreePattern() {
    /*const domTreeBackgroundImage = document.querySelector(
      ".tree-background-image"
    ) as HTMLElement;*/
    const domTreeBackgroundImage = document.querySelector(
      ".tree-container"
    ) as HTMLElement;
    const domTreeImage: HTMLImageElement = domTreeBackgroundImage.querySelector(
      ".tree-pattern"
    ) as HTMLImageElement;
    domTreeImage.src = `${PATH_TO_TREES}${this.treePattern}.png`;
  }

  applyOrnaments() {
    /*const domTreeWrapper = document.querySelector(
      ".tree-background-image"
    ) as HTMLElement;*/
    const domTreeWrapper = document.querySelector(
      ".tree-container"
    ) as HTMLElement;
    const ornamentsArray = domTreeWrapper.querySelectorAll(".toy-card-image");
    ornamentsArray.forEach((elem) => {
      elem.remove();
    });

    this.ornaments.forEach((elem) => {
      const domDecorationCardPattern = this.findOrnamentByNum(elem.num);
      if (domDecorationCardPattern !== null) {
        const domCardImg: HTMLImageElement =
          domDecorationCardPattern.querySelector(
            ".decoration-card-image"
          ) as HTMLImageElement;

        this.cloneOrnament(domCardImg, elem.coordX, elem.coordY);
      }
    });
    this.gatherOrnamentsOnTree();
    this.localStorageTree.setSettingsForSaving(this);
  }

  cloneOrnament(domElement: HTMLElement, coordX: number, coordY: number) {
    const domCloneOrnament = domElement.cloneNode(true) as HTMLImageElement;
    domCloneOrnament.src = `${PATH_TO_TOYS}${String(
      domCloneOrnament.getAttribute("data-num")
    )}.png`;

    const computedStyle = getComputedStyle(domElement);

    domCloneOrnament.style.width =
      computedStyle.width === "0px" ? "62px" : computedStyle.width;
    domCloneOrnament.style.height =
      computedStyle.height === "0px" ? "62px" : computedStyle.height;

    this.addOrnament(domCloneOrnament, coordX, coordY);
    domCloneOrnament.style.position = "absolute";
    domCloneOrnament.style.zIndex = "10";
    domCloneOrnament.classList.remove("hidden");
  }

  addOrnament(ornament: HTMLElement, coordX: number, coordY: number) {
    /*const domTreeBackgroundImage = document.querySelector(
      ".tree-background-image"
    ) as HTMLElement;*/
    const domTreeBackgroundImage = document.querySelector(
      ".tree-container"
    ) as HTMLElement;
    domTreeBackgroundImage.append(ornament);
    ornament.style.left = `${coordX}px`;
    ornament.style.top = `${coordY}px`;
    this.changeTreeState(ornament, "add");
  }

  changeTreeState(ornamentPattern: HTMLElement, action: string) {
    const num: string = ornamentPattern.getAttribute("data-num") || "0";

    const domCard = this.findOrnamentByNum(num);
    if (domCard !== null) {
      const domCardImg: HTMLImageElement = domCard.querySelector(
        ".decoration-card-image"
      ) as HTMLImageElement;

      const domCardCountWrapper = domCard.querySelector(
        ".decoration-card-count-wrapper"
      ) as HTMLImageElement;

      const domCardCount = domCardCountWrapper.querySelector(
        ".decoration-card-count"
      ) as HTMLElement;
      const currentNum = Number(domCardCount.textContent);
      if (action === "add") {
        domCardCount.textContent = String(currentNum - 1);
        if (currentNum === 1) {
          domCardImg.classList.add("hidden");
          domCardCountWrapper.classList.add("hidden");
        }
      } else if (action === "remove") {
        domCardCount.textContent = String(currentNum + 1);
        if (currentNum === 0) {
          domCardImg.classList.remove("hidden");
          domCardCountWrapper.classList.remove("hidden");
          domCardCount.textContent = "1";
        }
      }
    }
  }

  findOrnamentByNum(num: string): HTMLElement | null {
    const domOrnamentsWrapper = document.querySelector(
      ".ornaments-wrapper"
    ) as HTMLElement;

    const cardArray = domOrnamentsWrapper.querySelectorAll(".decoration-card");
    let domCard: HTMLElement = cardArray[0] as HTMLElement;

    for (let i = 0; i < cardArray.length; i++) {
      if ((cardArray[i] as HTMLElement).hasAttribute("data-num")) {
        if (cardArray[i].getAttribute("data-num") === num) {
          domCard = cardArray[i] as HTMLElement;
          return domCard;
        }
      }
    }
    return null;
  }

  gatherOrnamentsOnTree() {
    /*const domTreeWrapper = document.querySelector(
      ".tree-background-image"
    ) as HTMLElement;*/
    const domTreeWrapper = document.querySelector(
      ".tree-container"
    ) as HTMLElement;
    const ornamentsArray = domTreeWrapper.querySelectorAll(".toy-card-image");

    const coordTree = domTreeWrapper.getBoundingClientRect();
    this.ornaments = [];
    ornamentsArray.forEach((elem) => {
      const coord = elem.getBoundingClientRect();
      const num = elem.getAttribute("data-num") || "0";
      this.ornaments.push({
        num: num,
        coordX: coord.left - coordTree.x,
        coordY: coord.top - coordTree.y,
      });
    });
  }

  getDataFromLocalStorage(): void {
    this.localStorageTree.getItemsFromLocalStorage();
    this.background =
      this.localStorageTree.background > 0
        ? this.localStorageTree.background
        : 1;
    this.ornaments = this.localStorageTree.ornaments;
    this.treePattern =
      this.localStorageTree.tree > 0 ? this.localStorageTree.tree : 1;
    this.lights =
      this.localStorageTree.lights > 0
        ? new Lights(this.localStorageTree.lights)
        : new Lights(-1);
    this.isLightsOn = this.localStorageTree.isLightsOn;
    this.applyParameters();
  }
}

export default Tree;
