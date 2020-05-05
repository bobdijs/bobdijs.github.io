'use strict'

/*
defining all keys that come from the html
split them based on type to do logical checks
code formatted with standard
 */

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
const operators = ['+', '-', '*', '/', '.']
const specialOperators = ['=', '*-1', 'clear', 'backspace']
const keys = [].concat(numbers, operators, specialOperators)

let buffer = ''

document.querySelectorAll('button').forEach((elem) => {
  elem.addEventListener('click', (e) => {
    handleEvent(e.target.value)
  })
})

function handleEvent (key) {
  if (keys.includes(key)) {
    switch (key) {
      case 'clear':
        buffer = ''
        break
      case 'backspace':
        buffer = buffer.slice(0, -1)
        break
      case '=':
        /*
        make sure to remove any trailing operator before eval
        TODO: include some sort of rounding
        */
        if (operators.includes(buffer.slice(-1))) {
          buffer = buffer.slice(0, -1)
        }
        buffer = eval(buffer).toString()
        break
      case '*-1':
        if (buffer !== '' && !isNaN(buffer)) {
          buffer = eval(buffer + key).toString()
        }
    }

    if (numbers.includes(key)) {
      buffer = buffer + key
    } else if (operators.includes(key)) {
      /*
      check if key is an operator
      make sure buffer does not contain two operators next to each other
      TODO: this disables multiplication with negative numbers, fix this
       */
      if (numbers.includes(buffer.slice(-1))) {
        buffer = buffer + key
      } else {
        buffer = buffer.slice(0, -1)
        buffer = buffer + key
      }
    }
  }

  updateOutput()
}

function updateOutput () {
  if (buffer.length === 0) {
    document.querySelector('.output').innerHTML = '0'
  } else {
    document.querySelector('.output').innerHTML = buffer
  }
}
