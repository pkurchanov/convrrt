let unitsByDimension = {};

const formElement = document.getElementById("form");
const dimensionSelect = document.getElementById("dimension");
const fromUnitSelect = document.getElementById("from");
const toUnitSelect = document.getElementById("to");

async function loadUnits() {
  const response = await fetch("/units");
  unitsByDimension = await response.json();
  populateDimensions();
}

function populateDimensions() {
  dimensionSelect.innerHTML = "";
  Object.keys(unitsByDimension).forEach((dimension) => {
    const option = document.createElement("option");
    option.value = dimension;
    option.textContent = dimension;
    dimensionSelect.appendChild(option);
  });
  populateUnits();
}

function populateUnits() {
  const selectedDimension = dimensionSelect.value;
  const units = unitsByDimension[selectedDimension] || {};
  const unitNames = Object.keys(units);

  fromUnitSelect.innerHTML = "";
  toUnitSelect.innerHTML = "";

  unitNames.forEach((unit) => {
    const optionFrom = document.createElement("option");
    optionFrom.value = unit;
    optionFrom.textContent = unit;
    fromUnitSelect.appendChild(optionFrom);

    const optionTo = document.createElement("option");
    optionTo.value = unit;
    optionTo.textContent = unit;
    toUnitSelect.appendChild(optionTo);
  });

  if (unitNames.length > 1) toUnitSelect.selectedIndex = 1;
}

dimensionSelect.addEventListener("change", populateUnits);

loadUnits();

const splashes = [
  "who up converting they units rn",
  "Straight up “convorting it”. and by “it”, haha, well. let’s justr say. My units",
  "thee unit converter ov thee enlightened ones",
  "t3h Un1t c0nv3rTr oF d00m!!!!!!!!!!!! lol...",
];
const randomSplash = splashes[Math.floor(Math.random() * splashes.length)];
document.getElementById("splash").textContent = randomSplash;

formElement.addEventListener("submit", async (event) => {
  event.preventDefault();
  const dimension = dimensionSelect.value;
  const value = document.getElementById("value").value;
  const from = fromUnitSelect.value;
  const to = toUnitSelect.value;
  try {
    const response = await fetch("/convert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        dimension,
        value: Number(value),
        from,
        to,
      }),
    });
    const result = await response.text();
    document.getElementById("response").innerText = result;
  } catch (error) {
    document.getElementById("response").innerText = "conversion failed :(";
  }
});
