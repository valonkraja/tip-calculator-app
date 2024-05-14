let bill = document.querySelector(".bill-amount");
let people = document.querySelector(".num-people");
let tipPerc = document.querySelector(".tip-perc");
let tipAmount = document.querySelector(".tip-amount");
let totalAmount = document.querySelector(".total-amount");
let resetBtn = document.querySelector(".reset");
let customInput = document.querySelector(".custom-pct");

//function to clear the active button
const clearActive = () => {
  document
    .querySelectorAll(".pct")
    .forEach((el) => el.classList.remove("active"));
};

//function to calculate tip per person
const tipPerPerson = (bill, pct, people) => (bill * (pct / 100)) / people;

//function to calculate total per person
const totalPerPerson = (bill, tip, people) => (bill + tip) / people;

//function to update data
const updateData = (tip, total) => {
  tipAmount.innerHTML = `$${tip}`;
  totalAmount.innerHTML = `$${total}`;
};

//function to reset the data
const reset = () => {
  clearActive();
  tipAmount.innerHTML = "$0.00";
  totalAmount.innerHTML = "$0.00";
  bill.value = 0;
  people.value = 0;
};

const handleInput = function (tip) {
  clearActive();

  if (tip > 0 && +bill.value > 0 && +people.value > 0) {
    const tipA = parseFloat(
      tipPerPerson(+bill.value, tip, +people.value).toFixed(2)
    );

    const totalA = totalPerPerson(+bill.value, tipA, +people.value).toFixed(2);

    updateData(tipA, totalA);
  }
};

//Event listeners
tipPerc.addEventListener("click", function (e) {
  let tip = +e.target.value;
  if (!e.target.classList.contains("pct")) return false;

  e.target.classList.add("active");

  handleInput(tip);
});

customInput.addEventListener("keyup", function (e) {
  let tip = +e.target.value;
  if (e.target.value === "") {
    updateData("0.00", "0.00");
    return false;
  }
  if (tip === 0)
    updateData(0, totalPerPerson(+bill.value, 0, +people.value).toFixed(2));

  handleInput(tip);
});

resetBtn.addEventListener("click", reset);
