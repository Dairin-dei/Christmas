import { ITreeOrnaments } from "./definitions";
import Tree from "./Tree";

class LocalStorageTree {
  ornaments: Array<ITreeOrnaments>;
  tree: number;
  background: number;
  lights: number;
  isLightsOn: boolean;

  constructor() {
    this.ornaments = [];
    this.tree = -1;
    this.background = -1;
    this.lights = -1;
    this.isLightsOn = false;
  }

  setSettingsForSaving(tree: Tree) {
    this.ornaments = tree.ornaments;
    this.tree = tree.treePattern;
    this.background = tree.background;
    this.lights = tree.lights.id;
    this.isLightsOn = tree.isLightsOn;
  }

  setToLocalStorage() {
    localStorage.setItem("dd_treeOrnaments", JSON.stringify(this.ornaments));
    localStorage.setItem("dd_tree", String(this.tree));
    localStorage.setItem("dd_background", String(this.background));
    localStorage.setItem("dd_lights", String(this.lights));
    localStorage.setItem("dd_isLightsOn", String(this.isLightsOn));
  }

  getItemsFromLocalStorage() {
    const gotOrnaments: string = localStorage.getItem("dd_treeOrnaments") || "";
    if (gotOrnaments) {
      this.ornaments = JSON.parse(gotOrnaments);
    } else {
      this.ornaments = [];
    }

    const gotTree: string = localStorage.getItem("dd_tree") || "";
    this.tree = gotTree === "" ? 0 : Number(gotTree);

    const gotBackground: string = localStorage.getItem("dd_background") || "";
    this.background = gotBackground === "" ? 0 : Number(gotBackground);

    const gotLights: string = localStorage.getItem("dd_lights") || "";
    this.lights = gotLights === "" ? 0 : Number(gotLights);

    const gotIsLightsOn: string = localStorage.getItem("dd_isLightsOn") || "";
    this.isLightsOn = gotIsLightsOn === "true" ? true : false;
  }
}

export default LocalStorageTree;
