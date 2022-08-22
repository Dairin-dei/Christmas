import {
  eColors,
  eShapes,
  eSizes,
  eSortingMethod,
  IFilters,
  IRange,
} from "./definitions";

class LocalStorageFilters {
  filters: IFilters;
  sortingMethod: eSortingMethod;
  isMusicOn: boolean;

  constructor(
    filters: IFilters,
    sortingMethod: eSortingMethod,
    isMusicOn: boolean
  ) {
    this.filters = filters;
    this.sortingMethod = sortingMethod;
    this.isMusicOn = isMusicOn;
  }

  setSettingsForSaving(
    filters: IFilters,
    sortingMethod: eSortingMethod,
    isMusicOn: boolean
  ) {
    this.filters = filters;
    this.sortingMethod = sortingMethod;
    this.isMusicOn = isMusicOn;
  }

  setToLocalStorage() {
    localStorage.setItem(
      "dd_filterShape",
      JSON.stringify(this.filters.filterShape)
    );
    localStorage.setItem(
      "dd_filterColor",
      JSON.stringify(this.filters.filterColor)
    );
    localStorage.setItem(
      "dd_filterSize",
      JSON.stringify(this.filters.filterSize)
    );
    localStorage.setItem(
      "dd_filterFavorite",
      JSON.stringify(this.filters.filterFavorite)
    );
    localStorage.setItem(
      "dd_filterAmount",
      JSON.stringify(this.filters.filterAmount)
    );
    localStorage.setItem(
      "dd_filterYear",
      JSON.stringify(this.filters.filterYear)
    );
    localStorage.setItem("dd_sortingMethod", this.sortingMethod);
    localStorage.setItem("dd_isMusicOn", String(this.isMusicOn));
  }

  getItemsFromLocalStorage(): void {
    const gotFilterShape: string = localStorage.getItem("dd_filterShape") || "";
    if (gotFilterShape) {
      const tempArray: Array<eShapes> = [];
      const tempConvert: Array<string> = JSON.parse(gotFilterShape);
      tempConvert.forEach((elem) => {
        const instanceEShape: eShapes = Object.entries(eShapes).find(
          ([key, val]) => val === elem
        )?.[0] as eShapes;

        tempArray.push(
          eShapes[instanceEShape as unknown as keyof typeof eShapes]
        );
      });

      this.filters.filterShape = tempArray;
    }
    const gotFilterColor: string = localStorage.getItem("dd_filterColor") || "";
    if (gotFilterColor) {
      const tempArray: Array<eColors> = [];
      const tempConvert: Array<string> = JSON.parse(gotFilterColor);
      tempConvert.forEach((elem) => {
        const instanceEColor: eColors = Object.entries(eColors).find(
          ([key, val]) => val === elem
        )?.[0] as eColors;

        tempArray.push(
          eColors[instanceEColor as unknown as keyof typeof eColors]
        );
      });
      this.filters.filterColor = tempArray;
    }
    const gotFilterSize: string = localStorage.getItem("dd_filterSize") || "";
    if (gotFilterSize) {
      const tempArray: Array<eSizes> = [];
      const tempConvert: Array<string> = JSON.parse(gotFilterSize);
      tempConvert.forEach((elem) => {
        const instanceESize: eSizes = Object.entries(eSizes).find(
          ([key, val]) => val === elem
        )?.[0] as eSizes;

        tempArray.push(eSizes[instanceESize as unknown as keyof typeof eSizes]);
      });
      this.filters.filterSize = tempArray;
    }
    const gotFilterFavorite: string =
      localStorage.getItem("dd_filterFavorite") || "";
    if (gotFilterFavorite) {
      this.filters.filterFavorite = gotFilterFavorite === "true" ? true : false;
    }
    const gotFilterAmount: string =
      localStorage.getItem("dd_filterAmount") || "";
    if (gotFilterAmount) {
      const tempConvert: IRange = JSON.parse(gotFilterAmount);
      this.filters.filterAmount = tempConvert;
    }
    const gotFilterYear: string = localStorage.getItem("dd_filterYear") || "";
    if (gotFilterYear) {
      const tempConvert: IRange = JSON.parse(gotFilterYear);
      this.filters.filterYear = tempConvert;
    }
    const gotSortingMethod: string =
      localStorage.getItem("dd_sortingMethod") || "";
    if (gotSortingMethod) {
      const instanceSortingMethod: eSortingMethod = Object.entries(
        eSortingMethod
      ).find(([key, val]) => val === gotSortingMethod)?.[0] as eSortingMethod;

      this.sortingMethod =
        eSortingMethod[
          instanceSortingMethod as unknown as keyof typeof eSortingMethod
        ];
    }

    const gotIsMusicOn: string = localStorage.getItem("dd_isMusicOn") || "";
    this.isMusicOn = gotIsMusicOn == "true" ? true : false;
  }
}

export default LocalStorageFilters;
