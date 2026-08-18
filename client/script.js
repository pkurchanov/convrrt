const unitsByDimension = {
  length: [
    "meters",
    "giraffes",
    "bananas",
    "credit cards",
    "human hairs",
    "blue whales",
    "eiffel towers",
    "lunar distances",
    "rice grains",
  ],
  area: [
    "square meters",
    "football fields",
    "soccer pitches",
    "rhode islands",
    "texas areas",
  ],
  volume: [
    "cubic meters",
    "millibuckets",
    "olympic swimming pools",
    "bathtubs",
    "soda cans",
    "refrigerators",
    "mini fridges",
    "microwaves",
    "washing machines",
  ],
};

const formElement = document.getElementById("form");
const dimensionSelect = document.getElementById("dimension");
const fromUnitSelect = document.getElementById("from");
const toUnitSelect = document.getElementById("to");

function populateDimensions() {
  dimensionSelect.innerHTML = "";
  Object.keys(unitsByDimension).forEach((dimension) => {
    const option = document.createElement("option");
    option.value = dimension;
    option.textContent = dimension;
    dimensionSelect.appendChild(option);
  });
}

function populateUnits() {
  const selectedDimension = dimensionSelect.value;
  const units = unitsByDimension[selectedDimension] || [];

  fromUnitSelect.innerHTML = "";
  toUnitSelect.innerHTML = "";

  units.forEach((unit) => {
    const optionFrom = document.createElement("option");
    optionFrom.value = unit;
    optionFrom.textContent = unit;
    fromUnitSelect.appendChild(optionFrom);

    const optionTo = document.createElement("option");
    optionTo.value = unit;
    optionTo.textContent = unit;
    toUnitSelect.appendChild(optionTo);
  });
}

dimensionSelect.addEventListener("change", populateUnits);

populateDimensions();
populateUnits();

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
      body: JSON.stringify({ dimension, value: Number(value), from, to }),
    });
    const result = await response.json();
    document.getElementById("response").innerText = result.message;
  } catch (error) {
    console.error("submission failed:", error);
    document.getElementById("response").innerText = error;
  }
});
