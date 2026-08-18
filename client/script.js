const unitsByDimension = {
  length: [
    "giraffes",
    "bananas",
    "credit cards",
    "human hairs",
    "blue whales",
    "eiffel towers",
    "lunar distances",
    "rice grains",
  ],
  area: ["football fields", "soccer pitches", "rhode islands", "texas areas"],
  volume: [
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
  if (units.length > 1) toUnitSelect.selectedIndex = 1;
}

dimensionSelect.addEventListener("change", populateUnits);
populateDimensions();
populateUnits();

const texts = [
  "who up convertin they units rn?",
  "thee unit converter ov... doom!!1!",
];
const randomSplash = texts[Math.floor(Math.random() * texts.length)];
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
