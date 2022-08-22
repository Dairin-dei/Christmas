export const PATH_TO_TOYS = "./assets/toys/";
export const PATH_TO_TREES = "./assets/tree/";
export const PATH_TO_BACKGROUNDS = "./assets/bg/";

export const CHOSEN_TOYS: Array<string> = [];

export const ANIMATION_TIME_500 = 500;
export const ANIMATION_TIME_200 = 200;

export const CHOSEN_AMOUNT = 20;
export const AMOUNT_MIN = 1;
export const AMOUNT_MAX = 12;
export const AMOUNT_STEP = 1;
export const YEAR_MIN = 1940;
export const YEAR_MAX = 2020;
export const YEAR_STEP = 10;
export const MUSIC_PATH = "./assets/audio/JingleBells.mp3";
export const AMOUNT_OF_CARDS = 60;
export const AMOUNT_OF_TREES = 6;
export const AMOUNT_OF_BACKGROUNDS = 10;
export const IS_SLIDER: Array<boolean> = [false];

export const LONG_TREE_COORD =
  "231,663,134,662,84,635,18,603,22,569,47,532,58,495,66,459,84,438,108,414,106,385,116,360,119,326,135,294,147,256,159,223,168,205,179,179,178,150,186,125,197,116,201,96,211,72,219,43,253,12,265,36,277,52,297,72,314,102,317,130,323,151,323,174,323,188,347,203,344,235,359,226,370,249,366,292,380,289,382,323,395,350,399,373,419,409,409,443,439,450,440,471,446,484,451,499,452,522,472,525,468,550,441,568,488,581,483,605,430,623,460,647,426,663,359,671,284,667";
export const USUAL_TREE_COORD =
  "174,687,152,671,83,669,33,639,21,600,32,565,46,549,48,525,68,491,66,453,86,422,104,386,109,369,110,349,126,313,142,276,154,240,157,210,173,182,181,149,192,118,205,98,212,72,226,38,240,6,254,38,269,50,283,70,297,101,317,127,332,167,349,198,344,233,361,253,371,281,391,310,373,330,402,346,416,363,415,390,432,408,424,428,447,452,449,481,451,507,465,528,472,546,484,568,486,596,456,611,466,633,470,655,429,671,348,675,312,690,232,680";

export enum eShapes {
  BALL = "шар",
  BELL = "колокольчик",
  CONE = "шишка",
  SNOWFLAKE = "снежинка",
  TOY = "фигурка",
}

export enum eColors {
  WHITE = "белый",
  YELLOW = "желтый",
  RED = "красный",
  BLUE = "синий",
  GREEN = "зелёный",
}

export enum eSizes {
  BIG = "большой",
  MEDIUM = "средний",
  SMALL = "малый",
}

export enum eSortingMethod {
  NAME_AZ = "По названию (а-я)",
  NAME_ZA = "По названию (я-а)",
  AMOUNT_MIN_MAX = "По году (возрастанию)",
  AMOUNT_MAX_MIN = "По году (убыванию)",
}

export interface IOrnament {
  num: string;
  name: string;
  amount: number;
  year: number;
  shape: eShapes;
  color: eColors;
  size: eSizes;
  favorite: boolean;
}

export interface IOrnamentSimple {
  num: string;
  amount: number;
}

export interface ITreeOrnaments {
  num: string;
  coordX: number;
  coordY: number;
}

export interface IRange {
  min: number;
  max: number;
}

export interface IFilters {
  filterShape: Array<eShapes>;
  filterColor: Array<eColors>;
  filterSize: Array<eSizes>;
  filterAmount: IRange;
  filterYear: IRange;
  filterFavorite: boolean;
}
