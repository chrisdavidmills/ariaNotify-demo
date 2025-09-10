const form = document.querySelector("form");
const item = document.querySelector("input[type='text']");
const price = document.querySelector("input[type='number']");
const priceList = document.querySelector("ul");
const totalOutput = document.querySelector("p");

let total = 0;

function numberToSpokenPrice(numStr) {
  const num2dp = String(Number(numStr).toFixed(2));
  const arr = num2dp.split(".");
  const poundNoun = Number(arr[0]) === 1 ? "pound" : "pounds";
  if (arr[1] && Number(arr[1]) !== 0) {
    return `${arr[0]} ${poundNoun} and ${Number(arr[1])} pence`;
  } else {
    return `${arr[0]} ${poundNoun}`;
  }
}

function addItemToList(item, price) {
  const listItem = document.createElement("li");
  listItem.setAttribute("data-item", item);
  listItem.setAttribute("data-price", price);
  listItem.textContent = `${item}: £${Number(price).toFixed(2)}`;
  const btn = document.createElement("button");
  btn.textContent = `Remove ${item}`;

  btn.addEventListener("click", (e) => {
    const listItem = e.target.parentNode;
    total -= Number(listItem.getAttribute("data-price"));
    totalOutput.ariaNotify(`${listItem.getAttribute("data-item")} removed`, {
      priority: "high",
    });
    updateTotal();
    listItem.remove();
  });

  priceList.appendChild(listItem);
  listItem.appendChild(btn);
}

function updateTotal() {
  totalOutput.textContent = `Total: £${Number(total).toFixed(2)}`;
  totalOutput.ariaNotify(`Total is now ${numberToSpokenPrice(total)}`, {
    priority: "high",
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  addItemToList(item.value, price.value);
  total += Number(price.value);
  updateTotal();

  totalOutput.ariaNotify(
    `Item ${item.value}, price ${numberToSpokenPrice(
      price.value
    )}, added to list`,
    {
      priority: "high",
    }
  );

  item.value = "";
  price.value = "";
});
