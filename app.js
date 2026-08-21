const unitsByDimension = {
  length: {
    giraffes: 5,
    "subway footlongs": 0.2921,
    "light-nanoseconds": 0.2998,
    "credit cards": 0.05398,
    bananas: 0.18,
    "hot dogs": 0.15,
    dachshunds: 0.6,
    "rice grains": 6e-3,
    "human hairs": 7.5e-5,
    marathons: 42195,
    "eiffel towers": 330,
    "statues of liberty": 93,
    "empire state buildings": 443.2,
    devitos: 1.47,
    wadlows: 2.72,
  },
  area: {
    walmarts: 16630,
    "football fields": 5350,
    "soccer pitches": 7140,
    vaticans: 4.9e5,
    "rhode islands": 3.144e9,
    frances: 6.32702e11,
    texases: 6.95662e11,
    "twin beds": 1.8387,
    "full beds": 2.6129,
    "queen beds": 3.0968,
    "king beds": 3.9226,
    "california king beds": 3.9019,
  },
  volume: {
    "grand canyons": 4.17e12,
    refrigerators: 0.85,
    "mini fridges": 0.15,
    "olympic swimming pools": 2500,
    "school buses": 95,
    "washing machines": 0.357,
    bathtubs: 0.302,
    microwaves: 0.074,
    toasters: 3.5e-3,
    pineapples: 265e-3,
    millibuckets: 1e-3,
    "soda cans": 3.55e-4,
    "starbucks shorts": 2.37e-4,
    "starbucks talls": 3.54e-4,
    "starbucks grandes": 4.73e-4,
    "starbucks ventis": 5.91e-4,
    "starbucks trentas": 9.16e-4,
    gerbils: 1e-4,
  },
  mass: {
    hamburgers: 0.22,
    paperclips: 1e-3,
    "house cats": 4.5,
    "baby elephants": 100,
    "gold bars": 12.4,
    "human adults": 70,
    "toyota corollas": 1250,
    "blue whales": 1.1e5,
    "great pyramids": 5.75e9,
  },
  time: {
    shreks: 5700,
    songs: 195,
    "decayed plastic bottles": 1.42006167e10,
  },
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

  document.getElementById("response").innerText = "= " + result.toLocaleString('en-US', {
    maximumFractionDigits: 11
  });
});

populateDimensions();
