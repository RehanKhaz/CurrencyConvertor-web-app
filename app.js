const BASE_URL =
  "https://v6.exchangerate-api.com/v6/1fd3380b29869097e5a1d796/latest/USD";
let select = document.querySelectorAll(".container select");
let opt = document.querySelectorAll(".container option");
let button = document.querySelector("button");
let input = document.querySelector(".amount input");
let from = document.querySelector(".from select");
let to = document.querySelector(".to select");
let convertedAmount = document.querySelector(".convertedAmount");

select.forEach((val) => {
  for (let countryCode in countryList) {
    let newOption = document.createElement("option");
    newOption.value = countryCode;

    if (val.name === "from" && countryCode === "PKR") {
      newOption.selected = "selected";
    } else if (val.name === "to" && countryCode === "INR") {
      newOption.selected = "selected";
    }

    newOption.innerText = countryCode;
    val.append(newOption);
  }
  val.addEventListener("change", (event) => {
    changeFlag(event.target);
  });
});

function changeFlag(element) {
  let code = element.value;
  let countryCode = countryList[code];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
}

const updateExchangeRate = async () => {
  let amount = input.value;
  if (amount === 0 || amount < 1) {
    alert("Please enter appropriate amount.");
  }
  try {
    convertedAmount.innerText = "Getting Exchange amount...";
    let promise = await fetch(BASE_URL);
    let data = await promise.json();
    let fromExchangeAmount = data.conversion_rates[from.value];
    console.log(data.conversion_rates);
    let toExchangeAmount = data.conversion_rates[to.value];
    let ExchangedAmount = (amount / fromExchangeAmount) * toExchangeAmount;

    convertedAmount.innerText = `${amount}${from.value} = ${ExchangedAmount.toFixed(2)}${to.value}`;
  } catch (error) {
    alert(error);
  }
};

button.addEventListener("click", (event) => {
  event.preventDefault();
  updateExchangeRate();
});
