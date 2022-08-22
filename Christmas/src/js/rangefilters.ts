import {
  IFilters,
  AMOUNT_MIN,
  AMOUNT_MAX,
  AMOUNT_STEP,
  YEAR_MIN,
  YEAR_MAX,
  YEAR_STEP,
} from "./definitions";
import { initializeSlider } from "./slider";

export function createAmountRangeFilter(filters: IFilters): void {
  const rangeSlider = document.getElementById("range-slider-amount");
  const lowMark = document.querySelector(".min-amount-mark") as HTMLElement;
  const highMark = document.querySelector(".max-amount-mark") as HTMLElement;
  if (rangeSlider) {
    initializeSlider(
      "range-slider-amount",
      lowMark,
      highMark,
      AMOUNT_MIN,
      AMOUNT_MAX,
      AMOUNT_STEP
    );
  }
}

export function createYearRangeFilter(filters: IFilters): void {
  const rangeSlider = document.getElementById("range-slider-year");
  const lowMark = document.querySelector(".min-year-mark") as HTMLElement;
  const highMark = document.querySelector(".max-year-mark") as HTMLElement;
  if (rangeSlider) {
    initializeSlider(
      "range-slider-year",
      lowMark,
      highMark,
      YEAR_MIN,
      YEAR_MAX,
      YEAR_STEP
    );
  }
}
