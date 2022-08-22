import noUiSlider, { target } from "nouislider";
import "nouislider/dist/nouislider.css";
import "../css/slider.css";

export function initializeSlider(
  rangeSliderId: string,
  lowMark: HTMLElement,
  highMark: HTMLElement,
  lowValue: number,
  highValue: number,
  step: number
) {
  const rangeSlider = <target>document.getElementById(rangeSliderId);

  if (rangeSlider) {
    noUiSlider.create(rangeSlider, {
      start: [lowValue, highValue],
      connect: true,
      step: step,
      range: {
        min: [lowValue],
        max: [highValue],
      },
    });

    lowMark.textContent = String(lowValue);
    highMark.textContent = String(highValue);
    const marks: Array<HTMLElement> = [lowMark, highMark];

    if (rangeSlider.noUiSlider) {
      rangeSlider.noUiSlider.on(
        "update",
        function (values: Array<string | number>, handle: number): void {
          const value = Math.round(Number(values[handle]));
          marks[handle].textContent = String(value);
        }
      );
    }
  }
}

export function setSliderValues(
  rangeSliderId: string,
  minMark: string,
  maxMark: string,
  min: number,
  max: number
) {
  const rangeSlider = <target>document.getElementById(rangeSliderId);
  const lowMark = document.querySelector(`.${minMark}`) as HTMLElement;
  const highMark = document.querySelector(`.${maxMark}`) as HTMLElement;

  if (rangeSlider.noUiSlider) {
    rangeSlider.noUiSlider.set([min, max]);
    lowMark.textContent = String(Math.round(min));
    highMark.textContent = String(Math.round(max));
  }
}
