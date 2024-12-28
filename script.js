const displayElement = document.querySelector(".calculator__output");
const clearBtn = document.querySelector("[data-clear]");
const backspaceBtn = document.querySelector("[data-backspace]");
const calculateBtn = document.querySelector("[data-calculate]");
const keys = document.querySelectorAll(".calculator__grid button");

class Calculator {
  constructor(displayElement) {
    this.displayElement = displayElement;
    this.LOCAL_STORAGE_KEY = "calculated_value"
    this.syncValue()
  }

  syncValue () {
    const cachedValue = localStorage.getItem(this.LOCAL_STORAGE_KEY)
    if (cachedValue) {
        this.displayElement.textContent = JSON.parse(cachedValue) || ""
    }
  }

  addValue(number) {
    const operators = ["+", "-", "*", "/", "."]
    const lastChar = this.displayElement.textContent.slice(-1)
    
    // check if operators show up twice straight
    if (operators.includes(number) && operators.includes(lastChar)) return;
    this.displayElement.textContent += number.toString();

    this.saveOnLocalStorage()
  }

  clearValue() {
    this.displayElement.textContent = ""
    this.saveOnLocalStorage()
  }

  backspaceValue() {
    this.displayElement.textContent = this.displayElement.textContent.slice(0, -1)
    this.saveOnLocalStorage()
  }

  calculateValue() {
    try {
        const result = eval(this.displayElement.textContent)
        console.log(result)
        this.displayElement.textContent = result
        this.saveOnLocalStorage()
    } catch (error) {
        console.log(error)
        this.displayElement.textContent = "⚠️Invalid Equation!"
        setTimeout(() => this.displayElement.textContent = "", 500)
    }
  }

  saveOnLocalStorage () {
    const value = this.displayElement.textContent;
    localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(value))
  }
}

const calculator = new Calculator(displayElement);

keys.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.hasAttribute("data-calculate")) {
      calculator.calculateValue();
    } else if (btn.hasAttribute("data-clear")) {
      calculator.clearValue();
    } else if (btn.hasAttribute("data-backspace")) {
      calculator.backspaceValue();
    } else {
      calculator.addValue(btn.textContent);
    }
  })
})


// adding keyboard suport

document.addEventListener("keydown", (event) => {
    const key = event.key;

    console.log(key)

    if (key >= "0" && key <= "9" || ["+", "-", "*", "/"].includes(key)) {
        calculator.addValue(key)
    }
    if (key === "Escape") {
        calculator.clearValue()
    }
    if (key === "Backspace") {
        calculator.backspaceValue()
    }
    if (key === "Enter") {
        calculator.calculateValue()
    }
})


// Bugs:
// the calculate trigger twice on pressing Enter (not sure)