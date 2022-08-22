import {
  CHOSEN_AMOUNT,
  AMOUNT_OF_TREES,
  AMOUNT_OF_BACKGROUNDS,
  PATH_TO_TOYS,
  PATH_TO_TREES,
  PATH_TO_BACKGROUNDS,
  CHOSEN_TOYS,
  IOrnamentSimple,
  ANIMATION_TIME_200,
} from "./definitions";
import DecorationCard from "./DecorationCard";
import Tree from "./Tree";
import Lights from "./lights";
import runSnowflake from "./snowflakes";

export let snowInterval: NodeJS.Timer;

class DecorationParameters {
  dataArray: Array<IOrnamentSimple>;
  ornamentsData: Array<IOrnamentSimple>;
  ornaments: Array<DecorationCard>;
  trees: Array<DecorationCard>;
  backgrounds: Array<DecorationCard>;
  tree: Tree;

  constructor() {
    this.dataArray = [];
    this.ornamentsData = [];
    this.ornaments = [];
    this.trees = [];
    this.backgrounds = [];
    this.tree = new Tree();
  }

  showParameters() {
    this.showTrees();
    this.showBackgrounds();
    this.showLights();
    this.showChosenOrnaments();
    this.setInitialParameters();
    this.setLights(this.tree.lights.id);
    this.setEventListenerOnTreeOrnaments();
    this.setEventListenerOnButtonOnOffLights();
    this.setEventListenerOnButtonSnow();
  }

  showTrees(): void {
    const domTreeWrapper = document.querySelector(
      ".trees-wrapper"
    ) as HTMLElement;
    this.trees = [];

    for (let i = 1; i <= AMOUNT_OF_TREES; i++) {
      const newTree = new DecorationCard(
        i,
        `${PATH_TO_TREES}${i}.png`,
        "tree-card",
        "tree-card-image"
      );
      this.trees.push(newTree);
    }
    this.placeCards(domTreeWrapper, this.trees, false);
    this.setEventListenerOnTrees();
  }

  showBackgrounds(): void {
    const domBackgroundWrapper = document.querySelector(
      ".backgrounds-wrapper"
    ) as HTMLElement;
    this.backgrounds = [];

    for (let i = 1; i <= AMOUNT_OF_BACKGROUNDS; i++) {
      const newBackground = new DecorationCard(
        i,
        `${PATH_TO_BACKGROUNDS}${i}.jpg`,
        "background-card",
        "backgroung-image"
      );
      this.backgrounds.push(newBackground);
    }
    this.placeCards(domBackgroundWrapper, this.backgrounds, false);
    this.setEventListenerOnBackgrounds();
  }

  showLights() {
    this.setEventListenerOnLights();
  }

  showChosenOrnaments() {
    this.ornamentsData = [];
    this.ornaments = [];
    if (CHOSEN_TOYS.length > 0) {
      for (let i = 0; i < CHOSEN_TOYS.length; i++) {
        const ornament: IOrnamentSimple | undefined = this.dataArray.find(
          (item) => item.num === CHOSEN_TOYS[i]
        );
        if (ornament !== undefined) {
          this.ornamentsData.push(ornament);
        }
      }
      for (let i = CHOSEN_TOYS.length; i < CHOSEN_AMOUNT; i++) {
        const ornament: IOrnamentSimple = { num: "-1", amount: 0 };
        this.ornamentsData.push(ornament);
      }
    } else {
      for (let i = 0; i < CHOSEN_AMOUNT; i++) {
        const ornament: IOrnamentSimple = {
          num: this.dataArray[i].num,
          amount: this.dataArray[i].amount,
        };
        this.ornamentsData.push(ornament);
      }
    }
    const domOrnamentsWrapper = document.querySelector(
      ".ornaments-wrapper"
    ) as HTMLElement;

    domOrnamentsWrapper.innerHTML = "";

    this.ornamentsData.forEach((elem) => {
      const newOrnament = new DecorationCard(
        Number(elem.num),
        elem.num === "-1" ? "" : `${PATH_TO_TOYS}${elem.num}.png`,
        "toy-card",
        "toy-card-image",
        elem.amount
      );
      this.ornaments.push(newOrnament);
    });

    this.placeCards(domOrnamentsWrapper, this.ornaments, true);
    this.setEventListenerOnOrnaments();
  }

  placeCards(
    parent: HTMLElement,
    decorationArray: Array<DecorationCard>,
    isCountNeeded: boolean
  ): void {
    parent.innerHTML = "";

    const domFragment = document.createDocumentFragment();
    decorationArray.forEach((card, index) => {
      const domCard = card.createDecorationCard(index + 1, isCountNeeded);
      domFragment.append(domCard);
    });
    parent.appendChild(domFragment);
  }

  setEventListenerOnTrees(): void {
    const treesWrapper = document.querySelector(
      ".trees-wrapper"
    ) as HTMLElement;

    treesWrapper.onclick = (event: MouseEvent) => {
      this.tree.setTreePattern(event.target as HTMLElement);
      this.tree.localStorageTree.setSettingsForSaving(this.tree);
    };
  }
  setEventListenerOnBackgrounds(): void {
    const backgroundWrapper = document.querySelector(
      ".backgrounds-wrapper"
    ) as HTMLElement;

    backgroundWrapper.onclick = (event: MouseEvent) => {
      this.tree.setBackground(event.target as HTMLElement);
      this.tree.localStorageTree.setSettingsForSaving(this.tree);
    };
  }

  setEventListenerOnLights(): void {
    const whiteLight = document.querySelector(".white-btn") as HTMLElement;
    const buttonOnOff = document.querySelector(".on-off-lights") as HTMLElement;

    whiteLight.onclick = () => {
      this.tree.isLightsOn = true;
      whiteLight.classList.add("color-btn-active");
      setTimeout(() => {
        whiteLight.classList.remove("color-btn-active");
      }, ANIMATION_TIME_200);
      buttonOnOff.textContent = "Выкл";
      buttonOnOff.classList.remove("on-off-lights-off");
      this.setLights(0);
      this.tree.lights = new Lights(0);
      this.tree.localStorageTree.setSettingsForSaving(this.tree);
    };

    const yellowLight = document.querySelector(".yellow-btn") as HTMLElement;
    yellowLight.onclick = () => {
      this.tree.isLightsOn = true;
      yellowLight.classList.add("color-btn-active");
      setTimeout(() => {
        yellowLight.classList.remove("color-btn-active");
      }, ANIMATION_TIME_200);
      buttonOnOff.textContent = "Выкл";
      buttonOnOff.classList.remove("on-off-lights-off");
      this.setLights(1);
      this.tree.lights = new Lights(1);
      this.tree.localStorageTree.setSettingsForSaving(this.tree);
    };

    const redLight = document.querySelector(".red-btn") as HTMLElement;
    redLight.onclick = () => {
      this.tree.isLightsOn = true;
      redLight.classList.add("color-btn-active");
      setTimeout(() => {
        redLight.classList.remove("color-btn-active");
      }, ANIMATION_TIME_200);
      buttonOnOff.textContent = "Выкл";
      buttonOnOff.classList.remove("on-off-lights-off");
      this.setLights(2);
      this.tree.lights = new Lights(2);
      this.tree.localStorageTree.setSettingsForSaving(this.tree);
    };

    const greenLight = document.querySelector(".green-btn") as HTMLElement;
    greenLight.onclick = () => {
      this.tree.isLightsOn = true;
      greenLight.classList.add("color-btn-active");
      setTimeout(() => {
        greenLight.classList.remove("color-btn-active");
      }, ANIMATION_TIME_200);
      buttonOnOff.textContent = "Выкл";
      buttonOnOff.classList.remove("on-off-lights-off");
      this.setLights(3);
      this.tree.lights = new Lights(3);
      this.tree.localStorageTree.setSettingsForSaving(this.tree);
    };

    const blueLight = document.querySelector(".blue-btn") as HTMLElement;
    blueLight.onclick = () => {
      this.tree.isLightsOn = true;
      blueLight.classList.add("color-btn-active");
      setTimeout(() => {
        blueLight.classList.remove("color-btn-active");
      }, ANIMATION_TIME_200);
      buttonOnOff.textContent = "Выкл";
      buttonOnOff.classList.remove("on-off-lights-off");
      this.setLights(4);
      this.tree.lights = new Lights(4);
      this.tree.localStorageTree.setSettingsForSaving(this.tree);
    };

    const mltclrLight = document.querySelector(
      ".multicolor-btn"
    ) as HTMLElement;
    mltclrLight.onclick = () => {
      this.tree.isLightsOn = true;
      mltclrLight.classList.add("color-btn-active");
      setTimeout(() => {
        mltclrLight.classList.remove("color-btn-active");
      }, ANIMATION_TIME_200);
      buttonOnOff.textContent = "Выкл";
      buttonOnOff.classList.remove("on-off-lights-off");
      this.setLights(5);
      this.tree.lights = new Lights(5);
      this.tree.localStorageTree.setSettingsForSaving(this.tree);
    };

    this.tree.localStorageTree.setSettingsForSaving(this.tree);
  }

  setEventListenerOnButtonOnOffLights() {
    const buttonOnOff = document.querySelector(".on-off-lights") as HTMLElement;

    buttonOnOff.onclick = () => {
      buttonOnOff.classList.add("on-off-lights-active");
      setTimeout(() => {
        buttonOnOff.classList.remove("on-off-lights-active");
      }, ANIMATION_TIME_200);

      if (buttonOnOff.classList.contains("on-off-lights-off")) {
        buttonOnOff.textContent = "Выкл";
        buttonOnOff.classList.remove("on-off-lights-off");
        this.tree.isLightsOn = true;
        this.setLights(this.tree.lights.id);
      } else {
        buttonOnOff.textContent = "Вкл";
        buttonOnOff.classList.add("on-off-lights-off");
        this.tree.isLightsOn = false;
        this.setLights(-1);
      }
      this.tree.localStorageTree.setSettingsForSaving(this.tree);
    };
  }

  setLights(id: number) {
    this.tree.lights.createLights(id, this.tree.isLightsOn);
  }

  setEventListenerOnButtonSnow() {
    const buttonSnow = document.querySelector(".button-snow") as HTMLElement;

    buttonSnow.addEventListener("click", () => {
      buttonSnow.classList.add("button-snow-active");
      setTimeout(() => {
        buttonSnow.classList.remove("button-snow-active");
      }, ANIMATION_TIME_200);

      if (buttonSnow.classList.contains("active")) {
        buttonSnow.classList.remove("active");
        if (snowInterval) {
          clearInterval(snowInterval);
        }
      } else {
        snowInterval = setInterval(runSnowflake, 250);
        buttonSnow.classList.add("active");
        runSnowflake();
      }
    });
  }

  setEventListenerOnOrnaments(): void {
    const domArrayCards = document.querySelectorAll(".toy-card");
    domArrayCards.forEach((elem) => {
      (elem as HTMLElement).setAttribute("draggable", "true");
      (elem as HTMLElement).ondragstart = (event: DragEvent) =>
        this.drag(event, true);
    });
  }

  setEventListenerOnTreeOrnaments(): void {
    /*const domTreeBackgroundImage = document.querySelector(
      ".tree-background-image"
    ) as HTMLElement;*/

    const domTreeContainer = document.querySelector(
      ".tree-container"
    ) as HTMLElement;

    const map = domTreeContainer.querySelector(".treemap") as HTMLElement;
    /*domTreeBackgroundImage.ondrop = (event: DragEvent) => {
      this.dropOff(event);
    };*/
    domTreeContainer.ondrop = (event: DragEvent) => {
      this.drop(event);
    };
    map.ondragover = (event: DragEvent) => {
      const ornament = document.querySelector(".moving") as HTMLElement;
      ornament.style.cursor = "pointer";
      this.allowDrop(event);
    };
    const domArrayImages = domTreeContainer.querySelectorAll(".toy-card-image");
    domArrayImages.forEach((elem) => {
      (elem as HTMLElement).setAttribute("draggable", "true");
      (elem as HTMLElement).ondragstart = (event: DragEvent) =>
        this.drag(event, false);
    });
  }

  allowDrop(event: DragEvent) {
    event.preventDefault();
  }

  drag(event: DragEvent, isCloningNeed: boolean) {
    if (event.dataTransfer != null) {
      event.dataTransfer.setData("text", String(isCloningNeed));
    }
    const ornament = event.target as HTMLElement;
    ornament.classList.add("moving");
  }

  drop(event: DragEvent) {
    /*const tree = document.querySelector(
      ".tree-background-image"
    ) as HTMLElement;*/
    const tree = document.querySelector(".tree-container") as HTMLElement;
    const isCloningNeeded =
      (event.dataTransfer as DataTransfer).getData("text") === "true"
        ? true
        : false;

    event.preventDefault();
    const ornament = document.querySelector(".moving") as HTMLElement;
    const parent: HTMLElement = ornament.parentElement as HTMLElement;

    ornament.style.position = "absolute";

    const computedStyle = getComputedStyle(ornament);

    ornament.style.width = computedStyle.width;
    ornament.style.height = computedStyle.height;
    ornament.style.zIndex = "5";

    const coordTree = tree.getBoundingClientRect();
    const coord = ornament.getBoundingClientRect();

    tree.appendChild(ornament);
    ornament.setAttribute("draggable", "true");
    ornament.ondragstart = (event: DragEvent) => this.drag(event, false);

    ornament.style.left = event.clientX - coordTree.x - coord.width / 2 + "px";
    ornament.style.top = event.clientY - coordTree.y - coord.height / 2 + "px";
    ornament.classList.remove("moving");
    if (isCloningNeeded) {
      const cloneOrnament = ornament.cloneNode(true) as HTMLElement;
      cloneOrnament.style.position = "static";
      parent.append(cloneOrnament);
      this.tree.changeTreeState(cloneOrnament, "add");
    }
    this.tree.gatherOrnamentsOnTree();
    this.tree.localStorageTree.setSettingsForSaving(this.tree);
  }

  dropOff(event: DragEvent) {
    /*const tree = document.querySelector(
      ".tree-background-image"
    ) as HTMLElement;*/
    const tree = document.querySelector(".tree-container") as HTMLElement;
    const isCloningNeeded =
      (event.dataTransfer as DataTransfer).getData("text") === "true"
        ? true
        : false;

    event.preventDefault();
    const ornament = document.querySelector(".moving") as HTMLElement;
    const parent: HTMLElement = ornament.parentElement as HTMLElement;

    ornament.style.position = "absolute";

    const computedStyle = getComputedStyle(ornament);

    ornament.style.width = computedStyle.width;
    ornament.style.height = computedStyle.height;
    ornament.style.zIndex = "5";

    const coordTree = tree.getBoundingClientRect();
    const coord = ornament.getBoundingClientRect();

    tree.appendChild(ornament);
    ornament.setAttribute("draggable", "true");
    ornament.ondragstart = (event: DragEvent) => this.drag(event, false);

    ornament.style.left = event.clientX - coordTree.x - coord.width / 2 + "px";
    ornament.style.top = event.clientY - coordTree.y - coord.height / 2 + "px";
    ornament.classList.remove("moving");
    if (isCloningNeeded) {
      const cloneOrnament = ornament.cloneNode(true) as HTMLElement;
      cloneOrnament.style.position = "static";
      parent.append(cloneOrnament);
      this.tree.changeTreeState(cloneOrnament, "add");
    }
    this.tree.gatherOrnamentsOnTree();
    this.tree.localStorageTree.setSettingsForSaving(this.tree);
  }

  setInitialParameters() {
    this.tree.getDataFromLocalStorage();
    const buttonOnOff = document.querySelector(".on-off-lights") as HTMLElement;
    if (this.tree.isLightsOn) {
      buttonOnOff.textContent = "Выкл";
      buttonOnOff.classList.remove("on-off-lights-off");
    } else {
      buttonOnOff.textContent = "Вкл";
      buttonOnOff.classList.add("on-off-lights-off");
    }
  }
}

export default DecorationParameters;
