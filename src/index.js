import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const numbers = ["0","1","2","3","4","5","6","7","8","9"];
const operators = [".","*","/","+","-"];

const App = () => {
  
  const[formula,setFormula] = React.useState("");
  const[input,setInput] = React.useState("0");
  const[current,setCurrent] = React.useState("");
  
  const handleNumber = (e) => {
    let num = e.target.value;
    let cont = formula;
    if (cont.includes("=")) {
      cont = "";
    }
    if (current === "" && num === "0") {
    } else {
      setInput(current + num);
      setFormula(cont + num);
      setCurrent(current + num);
    }
  }
  const handleOperator = (e) => {
    let op = e.target.value;
    let cont = formula;
    if (cont.includes("=")) {
      cont = input;
    }
    if (input === "0") {
    } else if (!operators.includes(input)) {
      setInput(op);
      setFormula(cont + op);
      setCurrent("");
    } else if (operators.includes(formula.charAt(formula.length -1)) && operators.includes(formula.charAt(formula.length -2))){
      setInput(op);
      setFormula(formula.slice(0,-2) + op);
      setCurrent("");
    } else if (operators.includes(input)) {
      setInput(op);
      setFormula(formula.replace(/.$/,op));
      setCurrent("");
    }
  }
  const handleNegative = () => {
      if (operators.includes(formula.charAt(formula.length -1)) && operators.includes(formula.charAt(formula.length -2))){
      setInput("-");
      setFormula(formula.slice(0,-2) + "-");
      setCurrent("");
    } else {
      setInput("-");
      setFormula(formula + "-");
      setCurrent("");
    }
  }
  const handleDot = () => {
    if (current === "") {
      setInput(current + "0.");
      setFormula(formula + "0.");
      setCurrent(current + "0.");
    } else if (!current.includes(".")) {
      setInput(current + ".");
      setFormula(formula + ".");
      setCurrent(current + ".")
    }
  }
  const handleEquals = () => {
    let resultado = eval(formula)
    if (numbers.includes(formula.charAt(formula.length -1))) {
      setInput(resultado);
      setFormula(formula + "=" + resultado);
      setCurrent("");
    }
  }
  const handleClear = () => {
    setInput("0");
    setFormula('');
    setCurrent("");
  }
  
  return (
    <div className="container">
      <div className="calculator">
        <div className="display">
          <div className="formula">{formula}</div>
          <div className="input" id="display">{input}</div>
        </div>
        <div className="keyboard">
          <button id="clear" onClick ={handleClear}>AC</button>
          <button id="divide" value="/" onClick ={handleOperator}>/</button>
          <button id="multiply" value="*" onClick ={handleOperator}>x</button>
          <button id="nine" value="9" onClick ={handleNumber}>9</button>
          <button id="eight" value="8" onClick ={handleNumber}>8</button>
          <button id="seven" value="7" onClick ={handleNumber}>7</button>
          <button id="subtract" value="-" onClick ={handleNegative}>-</button>
          <button id="six" value="6" onClick ={handleNumber}>6</button>
          <button id="five" value="5" onClick ={handleNumber}>5</button>
          <button id="four" value="4" onClick ={handleNumber}>4</button>
          <button id="add" value="+" onClick ={handleOperator}>+</button>
          <button id="three" value="3" onClick ={handleNumber}>3</button>
          <button id="two" value="2" onClick ={handleNumber}>2</button>
          <button id="one" value="1" onClick ={handleNumber}>1</button>
          <button id="equals" onClick ={handleEquals}>=</button>
          <button id="zero" value="0" onClick ={handleNumber}>0</button>
          <button id="decimal" onClick ={handleDot}>.</button>
        </div>
      </div>
    </div>
    
  )
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);