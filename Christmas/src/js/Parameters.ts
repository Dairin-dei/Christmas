import {
  ANIMATION_TIME_500,
  MUSIC_PATH,
  IOrnament,
  IOrnamentSimple,
  IFilters,
  eSortingMethod,
  eShapes,
  eColors,
  eSizes,
  AMOUNT_MIN,
  AMOUNT_MAX,
  YEAR_MIN,
  YEAR_MAX,
  CHOSEN_TOYS,
  IS_SLIDER,
} from "./definitions";
import Ornaments from "./Ornaments";
import * as rangefilters from "./rangefilters";
import LoadedData from "./LoadedData";
import { target } from "nouislider";
import { setSliderValues } from "./slider";
import LocalStorageFilters from "./LocalStorageFilters";
import { App } from "../index";
import DecorationParameters from "./DecorationParameters";

class Parameters {
  dataArray: Array<IOrnament>;
  filters: IFilters;
  sortingMethod: eSortingMethod;
  ornaments!: Ornaments;
  searchFilter: string;
  localStorageFilters: LocalStorageFilters;
  isMusicOn: boolean;
  audio: HTMLAudioElement;

  constructor() {
    this.dataArray = [];

    this.filters = {
      filterShape: [],
      filterColor: [],
      filterSize: [],
      filterAmount: { min: 0, max: 100 },
      filterYear: { min: 0, max: 3000 },
      filterFavorite: false,
    };

    this.searchFilter = "";
    this.sortingMethod = eSortingMethod.NAME_AZ;
    this.isMusicOn = false;
    this.audio = new Audio();
    this.localStorageFilters = new LocalStorageFilters(
      this.filters,
      this.sortingMethod,
      this.isMusicOn
    );
  }

  async initializeParameters(app: App) {
    const loadedFile = new LoadedData();
    await loadedFile.createDataArray();
    this.dataArray = loadedFile.dataArray;
    this.initializeFilters();
    if (!IS_SLIDER[0]) {
      this.createRangeFilters();
      IS_SLIDER[0] = true;
    }
    this.initializeDecorationParameters(app);
    this.initializeSortingMethod();
    this.initializeAudio();

    this.getDataFromLocalStorage();

    this.ApplyParameters(true);

    this.addEventListeners(app);
  }

  initializeDecorationParameters(app: App): void {
    app.decorationParameters.dataArray = this.dataArray.map(function (
      item: IOrnament
    ): IOrnamentSimple {
      const ornamentSimple: IOrnamentSimple = {
        num: item.num,
        amount: item.amount,
      };
      return ornamentSimple;
    });
  }

  initializeFilters(): void {
    this.filters = {
      filterShape: [],
      filterColor: [],
      filterSize: [],
      filterAmount: { min: 0, max: 100 },
      filterYear: { min: 0, max: 3000 },
      filterFavorite: false,
    };

    this.searchFilter = "";
  }

  initializeSortingMethod(): void {
    this.setSortingMethod();
  }

  setSortingMethod(newSortingMethod = "По названию (а-я)"): void {
    const instanceSortingMethod: eSortingMethod = Object.entries(
      eSortingMethod
    ).find(([key, val]) => val === newSortingMethod)?.[0] as eSortingMethod;
    this.sortingMethod =
      eSortingMethod[
        instanceSortingMethod as unknown as keyof typeof eSortingMethod
      ];
  }

  ApplyParameters(loadFromStorage = false) {
    this.localStorageFilters.setSettingsForSaving(
      this.filters,
      this.sortingMethod,
      this.isMusicOn
    );
    const filteredDataArray: Array<IOrnament> = this.ApplyFilters();
    this.ApplySortingMethod(filteredDataArray);
    this.ornaments = new Ornaments(filteredDataArray);
    this.ornaments.placeAllCards(loadFromStorage);
  }

  ApplyFilters(): Array<IOrnament> {
    let filteredDataArray: Array<IOrnament> = this.ApplySearchFilters(
      this.dataArray
    );
    this.manageMessageNoByFilters("remove");
    filteredDataArray = this.ApplyShapeFilters(filteredDataArray);
    filteredDataArray = this.ApplyColorFilters(filteredDataArray);
    filteredDataArray = this.ApplySizeFilters(filteredDataArray);
    filteredDataArray = this.ApplyAmountFilters(filteredDataArray);
    filteredDataArray = this.ApplyYearFilters(filteredDataArray);
    filteredDataArray = this.ApplyFavoriteFilters(filteredDataArray);
    if (filteredDataArray.length === 0) {
      this.manageMessageNoByFilters("show");
    }

    return filteredDataArray;
  }

  ApplyShapeFilters(arrayOrnaments: Array<IOrnament>): Array<IOrnament> {
    if (this.filters.filterShape.length > 0) {
      return arrayOrnaments.filter((elem) =>
        this.filters.filterShape.includes(elem.shape)
      );
    } else {
      return arrayOrnaments;
    }
  }

  ApplyColorFilters(arrayOrnaments: Array<IOrnament>): Array<IOrnament> {
    if (this.filters.filterColor.length > 0) {
      return arrayOrnaments.filter((elem) =>
        this.filters.filterColor.includes(elem.color)
      );
    } else {
      return arrayOrnaments;
    }
  }

  ApplySizeFilters(arrayOrnaments: Array<IOrnament>): Array<IOrnament> {
    if (this.filters.filterSize.length > 0) {
      return arrayOrnaments.filter((elem) =>
        this.filters.filterSize.includes(elem.size)
      );
    } else {
      return arrayOrnaments;
    }
  }

  ApplyAmountFilters(arrayOrnaments: Array<IOrnament>): Array<IOrnament> {
    return arrayOrnaments.filter(
      (elem) =>
        elem.amount >= this.filters.filterAmount.min &&
        elem.amount <= this.filters.filterAmount.max
    );
  }

  ApplyYearFilters(arrayOrnaments: Array<IOrnament>): Array<IOrnament> {
    return arrayOrnaments.filter(
      (elem) =>
        elem.year >= this.filters.filterYear.min &&
        elem.year <= this.filters.filterYear.max
    );
  }

  ApplyFavoriteFilters(arrayOrnaments: Array<IOrnament>): Array<IOrnament> {
    if (this.filters.filterFavorite) {
      return arrayOrnaments.filter((elem) => elem.favorite);
    }
    return arrayOrnaments;
  }

  ApplySearchFilters(arrayOrnaments: Array<IOrnament>): Array<IOrnament> {
    if (this.searchFilter) {
      return arrayOrnaments.filter((elem) =>
        elem.name.toLowerCase().includes(this.searchFilter)
      );
    } else {
      return arrayOrnaments;
    }
  }

  ApplySortingMethod(filteredOrnaments: Array<IOrnament>) {
    filteredOrnaments.sort((a: IOrnament, b: IOrnament): number => {
      switch (this.sortingMethod) {
        case eSortingMethod.NAME_AZ:
          return a.name > b.name ? 1 : a.name === b.name ? 0 : -1;
        case eSortingMethod.NAME_ZA:
          return a.name < b.name ? 1 : a.name === b.name ? 0 : -1;
        case eSortingMethod.AMOUNT_MIN_MAX:
          return a.year > b.year ? 1 : a.year === b.year ? 0 : -1;
        case eSortingMethod.AMOUNT_MAX_MIN:
          return a.year < b.year ? 1 : a.year === b.year ? 0 : -1;
        default:
          return a.name > b.name ? 1 : a.name === b.name ? 0 : -1;
      }
    });
  }

  createRangeFilters(): void {
    rangefilters.createAmountRangeFilter(this.filters);
    rangefilters.createYearRangeFilter(this.filters);
  }

  addEventListeners(app: App): void {
    this.addEventListenerOnSorting();
    this.addEventListenersOnSearchFilter();
    this.addEventListenersOnShapeFilters();
    this.addEventListenersOnColorFilters();
    this.addEventListenersOnSizeFilters();
    this.addEventListenersOnAmountFilters();
    this.addEventListenersOnYearFilters();
    this.addEventListenersOnFavoriteFilters();
    this.addEventListenersOnMusicButton();

    this.addEventListenerOnResetFilters();
    this.addEventListenerOrResetLocalStorage(app);
    //    this.addEventListenerBeforeUnload();
    this.addEventListenerOnBody();
  }

  addEventListenerOnBody() {
    const body: HTMLElement = document.querySelector("body") as HTMLElement;
    body.addEventListener("click", () => {
      this.manageMusic();
    });
  }

  addEventListenersOnSearchFilter(): void {
    const domSearchFilter = document.querySelector(
      ".input-search"
    ) as HTMLInputElement;

    domSearchFilter.addEventListener("input", () => {
      this.searchFilter = domSearchFilter.value;
      this.ApplyParameters();
    });
  }

  addEventListenerOnSorting(): void {
    const domSortingMethod = document.querySelector(
      ".sorting"
    ) as HTMLSelectElement;
    domSortingMethod.addEventListener("change", () => {
      const selectedIndex: number = domSortingMethod.options.selectedIndex;
      const selectedValue = domSortingMethod.options[selectedIndex].text;
      this.setSortingMethod(selectedValue);
      this.ApplyParameters();
    });
  }

  addEventListenersOnShapeFilters(): void {
    const domFilters = document.querySelector(".filters-shape") as HTMLElement;
    const domShapeFilterButtons = domFilters.querySelectorAll(".button-shape");

    domShapeFilterButtons.forEach((domFilterButton) => {
      (domFilterButton as HTMLElement).addEventListener(
        "click",
        (event: Event) => {
          this.filters.filterShape = handleEvent(event);
          this.ApplyParameters();
        }
      );
    });

    function handleEvent(event: Event): Array<eShapes> {
      const currentDomElement = event.target as HTMLElement;
      currentDomElement.classList.toggle("filters-active-button");
      const tempFilterArray: Array<eShapes> = [];
      domShapeFilterButtons.forEach((button: Element) => {
        if (button.classList.contains("filters-active-button")) {
          const dataFilter: string = button.getAttribute(
            "data-filter"
          ) as string;
          const instanceEShape: eShapes = Object.entries(eShapes).find(
            ([key, val]) => val === dataFilter
          )?.[0] as eShapes;
          tempFilterArray.push(
            eShapes[instanceEShape as unknown as keyof typeof eShapes]
          );
        }
      });
      return tempFilterArray;
    }
  }

  addEventListenersOnColorFilters(): void {
    const domFilters = document.querySelector(".filters-color") as HTMLElement;
    const domColorFilterButtons = domFilters.querySelectorAll(".button-color");

    domColorFilterButtons.forEach((domFilterButton) => {
      (domFilterButton as HTMLElement).addEventListener(
        "click",
        (event: Event) => {
          this.filters.filterColor = handleEvent(event);
          this.ApplyParameters();
        }
      );
    });

    function handleEvent(event: Event): Array<eColors> {
      const currentDomElement = event.currentTarget as HTMLElement;
      currentDomElement.classList.toggle("filters-color-active-button");
      const domSpan = currentDomElement.querySelector(".span") as HTMLElement;
      domSpan.classList.toggle("span-color");
      const tempFilterArray: Array<eColors> = [];

      domColorFilterButtons.forEach((button: Element) => {
        if (button.classList.contains("filters-color-active-button")) {
          const dataFilter: string = button.getAttribute(
            "data-filter"
          ) as string;
          const instanceEColor: eColors = Object.entries(eColors).find(
            ([key, val]) => val === dataFilter
          )?.[0] as eColors;
          tempFilterArray.push(
            eColors[instanceEColor as unknown as keyof typeof eColors]
          );
        }
      });
      return tempFilterArray;
    }
  }

  addEventListenersOnSizeFilters(): void {
    const domFilters = document.querySelector(".filters-size") as HTMLElement;
    const domSizeFilterButtons = domFilters.querySelectorAll(".button-size");

    domSizeFilterButtons.forEach((domFilterButton) => {
      (domFilterButton as HTMLElement).addEventListener(
        "click",
        (event: Event) => {
          this.filters.filterSize = handleEvent(event);
          this.ApplyParameters();
        }
      );
    });

    function handleEvent(event: Event): Array<eSizes> {
      const currentDomElement = event.target as HTMLElement;
      currentDomElement.classList.toggle("filters-active-button");
      const tempFilterArray: Array<eSizes> = [];
      domSizeFilterButtons.forEach((button: Element) => {
        if (button.classList.contains("filters-active-button")) {
          const dataFilter: string = button.getAttribute(
            "data-filter"
          ) as string;
          const instanceESize: eSizes = Object.entries(eSizes).find(
            ([key, val]) => val === dataFilter
          )?.[0] as eSizes;
          tempFilterArray.push(
            eSizes[instanceESize as unknown as keyof typeof eSizes]
          );
        }
      });
      return tempFilterArray;
    }
  }

  addEventListenersOnAmountFilters(): void {
    const rangeSlider = <target>document.getElementById("range-slider-amount");
    if (rangeSlider.noUiSlider) {
      rangeSlider.noUiSlider.on(
        "update",
        (values: Array<string | number>, handle: number): void => {
          const value = Math.round(Number(values[handle]));
          handle == 0
            ? (this.filters.filterAmount.min = value)
            : (this.filters.filterAmount.max = value);
          this.ApplyParameters();
        }
      );
    }
  }

  addEventListenersOnYearFilters(): void {
    const rangeSlider = <target>document.getElementById("range-slider-year");
    if (rangeSlider.noUiSlider) {
      rangeSlider.noUiSlider.on(
        "update",
        (values: Array<string | number>, handle: number): void => {
          const value = Math.round(Number(values[handle]));
          handle == 0
            ? (this.filters.filterYear.min = value)
            : (this.filters.filterYear.max = value);
          this.ApplyParameters();
        }
      );
    }
  }

  addEventListenersOnFavoriteFilters(): void {
    const domFilterFavorite = document.querySelector(
      ".label-favorite"
    ) as HTMLElement;
    const domInputFavorite = document.querySelector(
      ".input-favorite"
    ) as HTMLInputElement;

    domFilterFavorite.addEventListener("click", (): void => {
      this.filters.filterFavorite = !domInputFavorite.checked;
      this.ApplyParameters();
    });
  }

  addEventListenersOnMusicButton(): void {
    const buttonAudio: HTMLElement = document.querySelector(
      ".button-sound"
    ) as HTMLElement;
    buttonAudio.addEventListener("click", () => {
      this.isMusicOn = !this.isMusicOn;
      buttonAudio.classList.toggle("sound-on");
      this.manageMusic();
      this.localStorageFilters.setSettingsForSaving(
        this.filters,
        this.sortingMethod,
        this.isMusicOn
      );
    });
  }

  addEventListenerOnResetFilters(): void {
    const domResetFilters = document.querySelector(
      ".filters-reset"
    ) as HTMLElement;
    domResetFilters.addEventListener("click", () => {
      domResetFilters.classList.add("reset-pressed");
      setTimeout(() => {
        domResetFilters.classList.remove("reset-pressed");
      }, ANIMATION_TIME_500);
      this.initializeFilters();
      this.clearActiveClasses();
      this.ApplyParameters();
    });
  }

  addEventListenerOrResetLocalStorage(app: App) {
    const domResetSettings = document.querySelector(
      ".settings-reset"
    ) as HTMLElement;
    domResetSettings.addEventListener("click", () => {
      domResetSettings.classList.add("reset-pressed");
      setTimeout(() => {
        domResetSettings.classList.remove("reset-pressed");
      }, ANIMATION_TIME_500);
      localStorage.clear();
      this.isMusicOn = false;
      this.initializeFilters();
      this.initializeSortingMethod();
      this.clearActiveClasses();
      app.decorationParameters = new DecorationParameters();

      CHOSEN_TOYS.length = 0;
      this.ApplyParameters();
      const chosenSpan = document.querySelector(".chosen-span") as HTMLElement;
      chosenSpan.textContent = String(CHOSEN_TOYS.length);
    });
  }

  /* addEventListenerBeforeUnload(): void {
    window.addEventListener("beforeunload", () => {
      this.localStorageFilters.setToLocalStorage();
      this.ornaments.localStorageToys.setToLocalStorage();
    });
  }*/

  clearActiveClasses() {
    const domfilterSettings = document.querySelector(
      ".filter-settings"
    ) as HTMLElement;
    const domFiltersShape = domfilterSettings.querySelectorAll(".button-shape");
    domFiltersShape.forEach((elem) => {
      const domCurrentFilter: HTMLElement = elem as HTMLElement;
      domCurrentFilter.classList.remove("filters-active-button");
    });
    const domFiltersColor = domfilterSettings.querySelectorAll(".button-color");
    domFiltersColor.forEach((elem) => {
      const domCurrentFilter: HTMLElement = elem as HTMLElement;
      domCurrentFilter.classList.remove("filters-color-active-button");
      const domSpan = domCurrentFilter.querySelector(".span") as HTMLElement;
      domSpan.classList.remove("span-color");
    });
    const domFiltersSize = domfilterSettings.querySelectorAll(".button-size");
    domFiltersSize.forEach((elem) => {
      const domCurrentFilter: HTMLElement = elem as HTMLElement;
      domCurrentFilter.classList.remove("filters-active-button");
    });
    const domFilterFavorite = document.querySelector(
      ".label-favorite"
    ) as HTMLLabelElement;
    const domInputFavorite = document.querySelector(
      ".input-favorite"
    ) as HTMLInputElement;
    domFilterFavorite.style.content = "";
    domInputFavorite.checked = false;
    setSliderValues(
      "range-slider-amount",
      "min-amount-mark",
      "max-amount-mark",
      AMOUNT_MIN,
      AMOUNT_MAX
    );
    setSliderValues(
      "range-slider-year",
      "min-year-mark",
      "max-year-mark",
      YEAR_MIN,
      YEAR_MAX
    );
  }

  manageMessageNoByFilters(param: string): void {
    const messageNoByFilters: HTMLElement = document.querySelector(
      ".no-by-filters"
    ) as HTMLElement;
    param === "show"
      ? messageNoByFilters.classList.remove("hidden")
      : messageNoByFilters.classList.add("hidden");
  }

  getDataFromLocalStorage(): void {
    this.localStorageFilters.getItemsFromLocalStorage();
    this.filters = this.localStorageFilters.filters;
    this.sortingMethod = this.localStorageFilters.sortingMethod;
    this.isMusicOn = this.localStorageFilters.isMusicOn;
    this.showFilters();
  }

  showFilters(): void {
    this.showShapeFilters();
    this.showColorFilters();
    this.showSizeFilters();
    this.showFavoriteFilter();
    this.setRangeSliders();
    this.showSortingMethod();
    this.showMusicSvg();
  }

  showShapeFilters(): void {
    const domShapeFilterButtons = document.querySelectorAll(".button-shape");
    domShapeFilterButtons.forEach((element) => {
      const domButton: HTMLElement = element as HTMLElement;
      const instanceEShape: eShapes = Object.entries(eShapes).find(
        ([key, val]) => val === domButton.getAttribute("data-filter")
      )?.[0] as eShapes;
      if (
        this.filters.filterShape.includes(
          eShapes[instanceEShape as unknown as keyof typeof eShapes]
        )
      ) {
        domButton.classList.toggle("filters-active-button");
      }
    });
  }

  showColorFilters(): void {
    const domColorFilterButtons = document.querySelectorAll(".button-color");
    domColorFilterButtons.forEach((element) => {
      const domButton: HTMLElement = element as HTMLElement;
      const domSpan = domButton.querySelector(".span") as HTMLElement;

      const instanceEColor: eColors = Object.entries(eColors).find(
        ([key, val]) => val === domButton.getAttribute("data-filter")
      )?.[0] as eColors;
      if (
        this.filters.filterColor.includes(
          eColors[instanceEColor as unknown as keyof typeof eColors]
        )
      ) {
        domButton.classList.toggle("filters-color-active-button");
        domSpan.classList.toggle("span-color");
      }
    });
  }

  showSizeFilters(): void {
    const domSizeFilterButtons = document.querySelectorAll(".button-size");
    domSizeFilterButtons.forEach((element) => {
      const domButton: HTMLElement = element as HTMLElement;
      const instanceESize: eSizes = Object.entries(eSizes).find(
        ([key, val]) => val === domButton.getAttribute("data-filter")
      )?.[0] as eSizes;
      if (
        this.filters.filterSize.includes(
          eSizes[instanceESize as unknown as keyof typeof eSizes]
        )
      ) {
        domButton.classList.toggle("filters-active-button");
      }
    });
  }

  showFavoriteFilter(): void {
    if (this.filters.filterFavorite) {
      const domInputFavorite = document.querySelector(
        ".input-favorite"
      ) as HTMLInputElement;
      domInputFavorite.checked = true;
    }
  }

  showSortingMethod() {
    const domSortingMethod = document.querySelector(
      ".sorting"
    ) as HTMLSelectElement;
    const instanceSortingMethod: eSortingMethod = Object.entries(
      eSortingMethod
    ).find(([key, val]) => val === this.sortingMethod)?.[0] as eSortingMethod;

    domSortingMethod.value = instanceSortingMethod;
  }

  showMusicSvg() {
    const buttonAudio: HTMLElement = document.querySelector(
      ".button-sound"
    ) as HTMLElement;

    if (this.isMusicOn) {
      buttonAudio.classList.add("sound-on");
    }
  }

  setRangeSliders() {
    setSliderValues(
      "range-slider-amount",
      "min-amount-mark",
      "max-amount-mark",
      this.filters.filterAmount.min,
      this.filters.filterAmount.max
    );
    setSliderValues(
      "range-slider-year",
      "min-year-mark",
      "max-year-mark",
      this.filters.filterYear.min,
      this.filters.filterYear.max
    );
  }

  initializeAudio() {
    this.audio.src = MUSIC_PATH;
    this.audio.loop = true;
  }

  manageMusic() {
    const buttonAudio: HTMLElement = document.querySelector(
      ".button-sound"
    ) as HTMLElement;

    if (this.isMusicOn) {
      this.audio.play();
      buttonAudio.classList.add("sound-on");
    } else {
      this.audio.pause();
      buttonAudio.classList.remove("sound-on");
    }
  }
}

export default Parameters;
