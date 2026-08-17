const unitsByDimension = {
  length: ["meters", "kilometers", "miles"],
  area: ["sq. meters", "sq. kilometers", "sq. miles"],
  volume: ["cu. meters", "cu. kilometers", "cu. miles"],
};

const dimensionSelect = document.getElementById("dimension");
const fromUnitSelect = document.getElementById("fromUnit");
const toUnitSelect = document.getElementById("toUnit");

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
document.addEventListener("DOMContentLoaded", () => {
  populateDimensions();
  populateUnits();
});
