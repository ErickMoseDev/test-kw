const baseUrl = "http://localhost:8080";
const form = document.querySelector("form");
const input = document.querySelector("#drug-box");
const button = document.querySelector("form button");
const drugResult = document.querySelector(".results");
const dName = document.querySelector(".drugName");
const dosage = document.querySelector(".drugDosage");
const effectsList = document.querySelector("#sideEffectsList");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const form = event.target;
  const value = form.drug.value;

  fetchDrug(value);
  form.reset();
});

async function fetchDrug(drugName) {
  const response = await fetch(`${baseUrl}/drugs`);
  const json = await response.json();

  drugResult.classList.remove("hidden");

  const result = json.find((drug) => {
    return drug.name === drugName;
  });

  let sideEffects = result.side_effects;

  dName.innerText = result.name;
  dosage.innerText = result.dosage;
  effectsList.innerHTML = "";
  sideEffects.map((effect) => {
    let li = document.createElement("li");
    li.innerText = effect;
    effectsList.appendChild(li);
  });
}
