function runSnowflake(): void {
  const snow_flake = document.createElement("span");
  snow_flake.textContent = "❆";
  snow_flake.classList.add("fa-snowflake");
  snow_flake.style.left = Math.random() * window.innerWidth + "px";
  snow_flake.style.animationDuration = Math.random() * 3 + 2 + "s"; // between 2 - 5 seconds
  snow_flake.style.opacity = String(Math.random());
  snow_flake.style.fontSize = Math.random() * 10 + 10 + "px";

  document.body.appendChild(snow_flake);

  setTimeout(() => {
    snow_flake.remove();
  }, 5000);
}

export default runSnowflake;
