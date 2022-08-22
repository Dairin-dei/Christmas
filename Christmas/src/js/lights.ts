class Lights {
  id: number;
  constructor(id: number) {
    this.id = id;
  }

  createLights(id: number, isLightsOn: boolean) {
    let color = "white";
    switch (id) {
      case 0: {
        color = "white";
        break;
      }
      case 1: {
        color = "yellow";
        break;
      }
      case 2: {
        color = "red";
        break;
      }
      case 3: {
        color = "green";
        break;
      }
      case 4: {
        color = "blue";
        break;
      }
      case 5: {
        color = "mltclr";
        break;
      }
    }

    const lightsContainer = document.querySelector(".lights") as HTMLElement;
    lightsContainer.innerHTML = "";
    lightsContainer.classList.remove("hidden");
    if (isLightsOn) {
      for (let i = 0; i < 8; i++) {
        const lightsLevel = document.createElement("div");
        lightsLevel.classList.add("lights-level");
        for (let j = 0; j < i * 2 + 5; j++) {
          const li = document.createElement("li");
          li.classList.add("bulb");
          li.classList.add(`bulb-${color}`);
          const translate = (1 - i / 10) * j ** 2;
          li.style.transform = `translateY(${-translate}px)`;
          lightsLevel.appendChild(li);
        }
        lightsContainer.append(lightsLevel);
      }
    }
  }
}

export default Lights;
