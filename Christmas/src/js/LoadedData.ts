import {
  IOrnament,
  AMOUNT_OF_CARDS,
  eColors,
  eShapes,
  eSizes,
} from "./definitions";

class LoadedData {
  dataArray: Array<IOrnament>;
  id: number;
  constructor() {
    this.id = 1;
    this.dataArray = [];
  }

  async createDataArray() {
    const dataFile = await this.loadDataFile();
    for (let i = 0; i < AMOUNT_OF_CARDS; i++) {
      const ornament: IOrnament = {
        num: String(dataFile[i].num),
        name: String(dataFile[i].name),
        amount: Number(dataFile[i].count),
        year: Number(dataFile[i].year),
        shape: this.defineShape(dataFile[i].shape),
        color: this.defineColor(dataFile[i].color),
        size: this.defineSize(dataFile[i].size),
        favorite: dataFile[i].favorite ? true : false,
      };

      this.dataArray.push(ornament);
    }
  }

  defineShape(shape: string): eShapes {
    switch (shape) {
      case "шар":
        return eShapes.BALL;
      case "колокольчик":
        return eShapes.BELL;
      case "шишка":
        return eShapes.CONE;
      case "снежинка":
        return eShapes.SNOWFLAKE;
      case "фигурка":
        return eShapes.TOY;
      default:
        return eShapes.BALL;
    }
  }

  defineColor(color: string): eColors {
    switch (color) {
      case "белый":
        return eColors.WHITE;
      case "желтый":
        return eColors.YELLOW;
      case "красный":
        return eColors.RED;
      case "синий":
        return eColors.BLUE;
      case "зелёный":
        return eColors.GREEN;
      default:
        return eColors.WHITE;
    }
  }

  defineSize(size: string): eSizes {
    switch (size) {
      case "большой":
        return eSizes.BIG;
      case "средний":
        return eSizes.MEDIUM;
      case "малый":
        return eSizes.SMALL;
      default:
        return eSizes.BIG;
    }
  }

  async loadDataFile() {
    try {
      const url = "../assets/data.json";
      const res = await fetch(url);
      const data = await res.json();
      return Promise.resolve(data);
    } catch (error) {
      alert(error);
    }
  }
}

export default LoadedData;
