// theme
const themeToggle = document.querySelector(".themes__toggle");
const darkTheme = () => {
  themeToggle.classList.remove("themes__toggle--isActive");
};
const lightTheme = () => {
  themeToggle.classList.add("themes__toggle--isActive");
};
const themeChanger = () => {
  themeToggle.classList.contains("themes__toggle--isActive")
    ? darkTheme()
    : lightTheme();
};
themeToggle.addEventListener("click", themeChanger);
themeToggle.addEventListener("keydown", (event) => {
  event.key === "Enter" && themeChanger();
});
// end theme

// logic of keys

let storedValue = "";
let currentValue = "0";
let operatorValue = "";
const resultField = document.querySelector(".calc__result");
const keyElements = document.querySelectorAll("[data-type]");

// Update the current value with the given value

const updateCurrentValue = (value) => {
  if (currentValue === "0" || currentValue === "Error") {
    currentValue = value;
  } else {
    currentValue += value;
  }
  resultField.textContent = currentValue;
};

// Handle number input based on the key element value
const handleNumberInput = (keyElement) => {
  const value = keyElement.dataset.value;
  if (value === "0" && currentValue !== "0") {
    updateCurrentValue("0");
  } else if (value === "." && !currentValue.includes(".")) {
    updateCurrentValue(".");
  } else if (value !== "." && !(currentValue.endsWith(".") && value === ".")) {
    updateCurrentValue(value);
  }
};

// Perform addition operation
const handleAddition = () => {
  let firstValue = Number(storedValue);
  let secondValue = Number(currentValue);
  return firstValue + secondValue;
};

// Perform subtraction operation
const handleSubtraction = () => {
  let firstValue = Number(storedValue);
  let secondValue = Number(currentValue);
  return firstValue - secondValue;
};

// Perform multiplication operation
const handleMultiplication = () => {
  let firstValue = Number(storedValue);
  let secondValue = Number(currentValue);
  return firstValue * secondValue;
};

// Perform division operation
const handleDivision = () => {
  let firstValue = Number(storedValue);
  let secondValue = Number(currentValue);
  return firstValue / secondValue;
};

// Handle different types of operations based on the key element value
const handleOperationInput = (keyElement) => {
  const value = keyElement.dataset.value;
  switch (value) {
    case "+":
    case "-":
    case "*":
    case "/":
      operatorValue = value;
      storedValue = currentValue;
      currentValue = "0";
      break;
    case "c":
      storedValue = "";
      currentValue = "0";
      operatorValue = "";
      resultField.textContent = "0";
      break;
    case "Enter":
      let resultValue;
      switch (operatorValue) {
        case "+":
          resultValue = handleAddition();
          break;
        case "-":
          resultValue = handleSubtraction();
          break;
        case "*":
          resultValue = handleMultiplication();
          break;
        case "/":
          resultValue = handleDivision();
          break;
      }
      resultField.textContent = resultValue;
      console.log(resultValue);
      storedValue = "";
      currentValue = resultValue;
      break;
    case "Backspace":
      if (currentValue.length > 1) {
        currentValue = currentValue.slice(0, -1);
      } else {
        currentValue = "0";
      }
      resultField.textContent = currentValue;
      break;
    default:
      break;
  }
};

// Handle key events and call the appropriate handler
const keyHandler = (keyElement) => {
  if (keyElement.dataset.type === "number") {
    handleNumberInput(keyElement);
  } else if (keyElement.dataset.type === "operation") {
    handleOperationInput(keyElement);
  }
};

// Attach click event listeners to key elements
keyElements.forEach((keyElement) => {
  keyElement.addEventListener("click", () => {
    keyHandler(keyElement);
  });
});

// Attach keydown event listeners to key elements
document.addEventListener("keydown", (event) => {
  keyElements.forEach((keyElement) => {
    if (keyElement.dataset.value === event.key) {
      keyHandler(keyElement);
    }
  });
});
