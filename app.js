let unitsByDimension = {};

const formElement = document.getElementById("form");
const dimensionSelect = document.getElementById("dimension");
const fromUnitSelect = document.getElementById("from");
const toUnitSelect = document.getElementById("to");

async function loadUnits() {
  try {
    const response = await fetch("./units.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    unitsByDimension = await response.json();
    populateDimensions();
  } catch (error) {
    document.getElementById("response").innerText = "failed to load units :/";
  }
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
  "she convert on my unit till I guesstimate",
  "all your unit are convert to us",
  "what the FUCK is a kilometer!!!!!🦅🦅🦅🦅",
  "t3h Un1t c0nv3rTr oF d00m!!!!!!!! lol...",
];
const randomSplash = splashes[Math.floor(Math.random() * splashes.length)];
document.getElementById("splash").textContent = randomSplash;

formElement.addEventListener("submit", (event) => {
  event.preventDefault();

  const dimension = dimensionSelect.value;
  const value = Number(document.getElementById("value").value);
  const from = fromUnitSelect.value;
  const to = toUnitSelect.value;

  const dimensionUnits = unitsByDimension[dimension];
  if (!dimensionUnits || !(from in dimensionUnits) || !(to in dimensionUnits)) {
    document.getElementById("response").innerText = "conversion failed :(";
    return;
  }

  const normalizedFrom = dimensionUnits[from];
  const normalizedTo = dimensionUnits[to];
  const result = (value * normalizedFrom) / normalizedTo;

  document.getElementById("response").innerText = "= " + result.toPrecision(6);
});
