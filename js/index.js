$(document).ready(function() {
  
var inputLimit = 8;

var input1 = "";
var input2 = "";
var operator = "";
var result = 0;
var prevResult = 0;
var decimalEnabled = true;
var state = 0;
// Initial State:   0

$(".button").click(function() {
  var buttonType = $(this).data("type");
  var buttonValue = $(this).attr("value");
  var display = $("#display");

  switch (buttonType) {

    case "digit":
      if (state === 0) { // input1: left of decimal //
        state++;
        if (input1.length < inputLimit) {
          input1 += buttonValue;
          updateDisplay(input1);
        }
        break;
      }
      if (state === 1) { // input1: remaining digits //
        if (input1.length < inputLimit) {
          input1 += buttonValue;
          updateDisplay(input1);
        }
        break;

      }
      if (state === 2) { // input2:  left of decimal //
        state++;
        if (input2.length < inputLimit) {
          input2 += buttonValue;
          updateDisplay(input2);
        }
        break;
      }
      if (state === 3) { // input3:  remaining digits //
        if (input2.length < inputLimit) {
          input2 += buttonValue;
          updateDisplay(input2);
        }
        break;
      }
      if (state === 4) { // Chain or not? //
        state = 1;
        input1 = "";
        input2 = "";
        operator = "";
        input1 += buttonValue;
        updateDisplay(input1);
        break;

      }

    case "point":
      if (state === 0) {
        if (decimalEnabled) {
          decimalEnabled = false;
          input1 += "0" + buttonValue;
          updateDisplay(input1);
        }
        break;
      }
      if (state === 1) {
        if (decimalEnabled) {
          decimalEnabled = false;
          input1 += buttonValue;
          updateDisplay(input1);
        }
        break;
      }
      if (state === 2) {
        if (decimalEnabled) {
          decimalEnabled = false;
          input2 += "0" + buttonValue;
          updateDisplay(input2);
        }
        break;
      }
      if (state === 3) {
        if (decimalEnabled) {
          decimalEnabled = false;
          input2 += buttonValue;
          updateDisplay(input2);
        }
        break;
      }
      if (state === 4) {
        state = 1;
        input1 = "";
        input2 = "";
        operator = "";
        decimalEnabled = false;
        input1 += "0" + buttonValue;
        updateDisplay(input1);
        break;
      }

    case "operator":
      if (state === 0 || state === 2) {
        blinkDisplay();
        break;
      }
      if (state === 1) {
        $(this).addClass("active-operator");
        operator = buttonValue;
        state = 2;
        decimalEnabled = true;
        break;
      }
      
      if (state === 4) {
        $(this).addClass("active-operator");
        operator = buttonValue;
        input1 = result;
        input2 = ""
        decimalEnabled = true;
        state = 2;
        break;
        
      }

    case "calculate":
      if (state === 0 || state === 1 || state === 2) {
        blinkDisplay();
        break;
      }
      if (state === 3) {
        $(".button").removeClass("active-operator");
        result = calculate(input1, input2, operator);
        updateDisplay(result);
        decimalEnabled = true;
        state = 4;
        break;
      }
      if (state === 4) {
        $(".button").removeClass("active-operator");
        result = calculate(result, input2, operator);
        updateDisplay(result);
        break;
      }

    case "reset":
      reset();
      break;

    case "clear":
        break;
      
  }
  //debug();

});
  


////////////////////////////////////////////////////////
function debug() {

  $("#debug").html("<p>input1: " + input1 + "</p>" +
    "<p>operator: " + operator + "</p>" +
    "<p>input2: " + input2 + "</p>" +
    "<p>result: " + result + "</p>" +
    "<p>prevResult: " + prevResult + "</p>" +
    "<p>decimalEnabled: " + decimalEnabled + "</p>" +
    "<p>state: " + state + "</p>"
  );
}

function reset() {
  state = 0;
  input1 = "";
  input2 = "";
  result = 0;
  prevResult = 0;
  operator = "";
  decimalEnabled = true;
  updateDisplay("Welcome", "", "");
  $(".button").removeClass("active-operator");
}

function updateDisplay(d, h, s) {
  var display = $("#display");
  var history = $("#history");
  var status = $("#status");

  if (arguments[0]) {
    display.html(d);
  }
  if (arguments[1]) {
    history.html(h);
  }
  if (arguments[2]) {
    status.html(s);
  }
}

function calculate(input1, input2, operator) {

  var a = parseFloat(input1);
  var b = parseFloat(input2);

  switch (operator) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      return a / b;
  }

}

function blinkDisplay() {
  var display = $("#display");
  display.fadeTo('fast', 0.3).fadeTo('fast', 1.0);

}
  
  
  });