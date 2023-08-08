'use strict';
// The elements selected from document
const display = document.querySelector('.display-box');
const numbers = document.querySelectorAll('.btn-num');
const operators = document.querySelectorAll('.btn-operator');
const del = document.querySelector('#delete');
const reset = document.querySelector('#reset');
const compute = document.querySelector('#compute');
const decimal = document.querySelector('#decimal');

// Other variables required
let final_str, temp_str, operator_list, num_list;
const init = () => {
  temp_str = '';
  final_str = '';
  operator_list = [];
  num_list = [];
  display.innerHTML = 0;
}
init();

//Add arrays
const computeNum = () => {
  let sum = num_list[0];
  for (let i = 1; i < num_list.length; i++){
      if (operator_list[i-1] === "add") {
        sum += num_list[i];
      } else if (operator_list[i - 1] === "multiply") {
        sum *= num_list[i];
      } else if (operator_list[i - 1] === 'divide') {
        sum /= num_list[i];
      } else {
        sum -= num_list[i];
      }
  }
  return sum;
}

// Event listeners
numbers.forEach((item) => item.addEventListener('click', () => {
  temp_str += item.id;
  final_str += item.id;
  display.innerHTML = final_str;
}))

operators.forEach((item) => item.addEventListener('click', () => {
  console.log(temp_str);
  console.log(num_list, operator_list);
  if (temp_str.length > 0) {
    num_list.push(Number(temp_str));
    operator_list.push(item.id);
    final_str += ` ${item.innerHTML} `;
    display.innerHTML = final_str;
    temp_str = '';
    console.log(num_list);
    console.log(operator_list);
  }
}))

decimal.addEventListener('click', () => {
  if (!temp_str.includes('.')) {
    temp_str += '.';
    final_str += `.`;
    display.innerHTML = final_str;
  }
})

del.addEventListener('click', () => {
  console.log(final_str);
  const temp = final_str.split(" ");
  console.log(temp);
  temp.pop();
  console.log(temp);
  final_str = temp.join(" ");
  display.innerHTML = final_str;
})

compute.addEventListener("click", () => {
  if (temp_str !== "") {
    num_list.push(Number(temp_str));
  }

  if (num_list.length > 0 && operator_list.length > 0) {
    const final_num = computeNum();
    final_str = `${final_num}`;
    display.innerHTML = final_str;
    temp_str = final_str;
    operator_list = [];
    num_list = [];
  }
})

reset.addEventListener('click', init)