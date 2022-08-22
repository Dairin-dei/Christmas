class LocalStorageToys {
  chosenToys: Array<string>;
  constructor() {
    this.chosenToys = [];
  }

  setSettingsForSaving(chosen_toys: Array<string>) {
    this.chosenToys = chosen_toys;
  }

  setToLocalStorage() {
    localStorage.setItem("dd_chosenToys", JSON.stringify(this.chosenToys));
  }

  getItemsFromLocalStorage() {
    const gotChosenToys: string = localStorage.getItem("dd_chosenToys") || "";
    if (gotChosenToys) {
      this.chosenToys = JSON.parse(gotChosenToys);
    } else {
      this.chosenToys = [];
    }
  }
}

export default LocalStorageToys;
