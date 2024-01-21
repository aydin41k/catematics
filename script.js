/* splash screen */
const splash = document.querySelector('.splash')

document.addEventListener('DOMContentLoaded', (e) => {
  setTimeout(() => {
    splash.classList.add('display-none')
  }, 2000)
})

/* Log Activity */
let logQueue = [];

function addToLog(question, answer, correctness, timestamp) {
  const currentDate = new Date(timestamp);

  logQueue = localStorage.getItem("logActivity") ?
    JSON.parse(localStorage.getItem("logActivity")) :
    []; //get the array from LS
  if (logQueue.length == 100)
    logQueue.shift()             //remove the oldest value
  logQueue.push({
    Q: question,
    A: answer,
    correctness: correctness,
    timestamp: currentDate.toUTCString()
  });  //insert new value
  localStorage.setItem("logActivity", JSON.stringify(logQueue));
}

/* Show Log */
const showLogButton = document.querySelector('#showLog');
const logContainer = document.querySelector('#logContainer');
const closeButton = document.querySelector('#closeButton');
const clearButton = document.querySelector('#clearLogButton');


logQueue = localStorage.getItem("logActivity") ?
  JSON.parse(localStorage.getItem("logActivity")) :
  [];


showLogButton.addEventListener("click", () => {
  logContainer.innerHTML = "My last 100 tries"; // Clear previous content
  logQueue.map((object) => {
    const active = document.createElement('ul');
    active.classList.add('active');
    active.innerHTML = `
      <li>Question: ${object.Q}</li>
      <li>Answer: ${object.A}</li>
      <li>Correctness: ${object.correctness}</li>
      <li>Timestamp: ${object.timestamp}</li>
    `;
    logContainer.appendChild(active);
  });
  logContainer.style.display = "flex";
  closeButton.style.display = "block";
  clearButton.style.display = "block";
});

closeButton.addEventListener('click', () => {
  logContainer.style.display = 'none';
  closeButton.style.display = "none";
  clearButton.style.display = "none";
});

clearButton.addEventListener('click', () => {
  logContainer.innerHTML = "";
  localStorage.removeItem("logActivity");
  logContainer.style.display = 'none';
  closeButton.style.display = "none";
  clearButton.style.display = "none";
});


// // Add an event listener to hide the close and clear buttons when logContainer is hidden
// logContainer.addEventListener('transitionend', () => {
//   if (!logContainerIsVisible) {
//     document.querySelector('#closeButton').style.display = 'none';
//     document.querySelector('button').style.display = 'none'; // Assuming there's only one button
//   } else {
//     document.querySelector('#closeButton').style.display = 'block';
//     document.querySelector('button').style.display = 'block'; // Assuming there's only one button
//   }
// });




/* Cats */
const cats = [
  {
    id: 'cat_1',
    value: 1,
    image: 'images/kitten.png',
    class: 'kitten',
    enabled: true,
  },
  {
    id: 'cat_2',
    value: 5,
    image: 'images/cat_five_sm.png',
    class: 'cat',
    enabled: true,
  },
  {
    id: 'cat_3',
    value: 10,
    image: 'images/cat.png',
    class: 'cat',
    enabled: true,
  },
];

const config = {
  maxAddend: { title: 'Max addend', type: 'number', value: 15 },
  maxMinuend: { title: 'Max minuend', type: 'number', value: 21 },
  maxMultiplier: { title: 'Max multiplier', type: 'number', value: 10 },
  generateAddition: { title: 'Additions', type: 'checkbox', value: true },
  generateSubtraction: { title: 'Subtractions', type: 'checkbox', value: true },
  generateMultiplication: { title: 'Multiplications', type: 'checkbox', value: true },
  generateSquare: { title: 'Squares', type: 'checkbox', value: true },
  generateSquareRoot: { title: 'Square roots', type: 'checkbox', value: true },
  generateSimpleEquation: { title: 'Equations', type: 'checkbox', value: true },
}

/* Question logic*/

/**
 * @returns array [string question, int answer]
 */
function generateQuestion() {
  const questionTypes = [
    generateAddition,
    generateSubtraction,
    generateMultiplication,
    generateSquare,
    generateSquareRoot,
    generateSimpleEquation
  ];

  // Filter out disabled question types
  const enabledQuestionTypes = questionTypes.filter(questionType => {
    return config[questionType.name].value;
  });

  // Randomly select a question type
  const generate = enabledQuestionTypes[Math.floor(Math.random() * enabledQuestionTypes.length)];

  return generate();
}

function generateAddition() {
  const maxAddendCeil = config.maxAddend.value + 1;
  const a = Math.floor(Math.random() * maxAddendCeil); // 0 to maxAddend
  const b = Math.floor(Math.random() * maxAddendCeil); // 0 to maxAddend
  return [a + " + " + b + " = ?", a + b];
}

function generateSubtraction() {
  const maxMinuendCeil = config.maxMinuend.value + 1;
  const a = Math.floor(Math.random() * maxMinuendCeil); // 0 to maxMinuend
  const b = Math.floor(Math.random() * (a + 1)); // Ensures result is non-negative
  return [a + " - " + b + " = ?", a - b];
}

function generateMultiplication() {
  const maxMultiplierCeil = config.maxMultiplier.value + 1;
  const a = Math.floor(Math.random() * maxMultiplierCeil); // 0 to maxMultiplier
  const b = Math.floor(Math.random() * maxMultiplierCeil); // 0 to maxMultiplier
  return [a + " × " + b + " = ?", a * b];
}

function generateSquare() {
  const a = Math.floor(Math.random() * config.maxMultiplier.value); // 0 to maxMultiplier - 1
  return [a + "<small>²</small> = ?", a * a];
}

function generateSquareRoot() {
  const a = Math.floor(Math.random() * config.maxMultiplier.value); // 0 to maxMultiplier - 1
  return ["√" + (a * a) + " = ?", a];
}

function generateSimpleEquation() {
  // Randomly choose between addition and subtraction
  const equation = Math.random() > 0.5 ? generateAddition() : generateSubtraction();

  // equation is in the form of ["a +/- b", c]
  const operands = equation[0].split(' ');
  const result = equation[1];
  const replaceIndex = Math.random() > 0.5 ? 0 : 2; // Randomly choose to replace a (index 0) or b (index 2)

  // Store the chosen operand in a variable - that is our answer
  const answer = parseInt(operands[replaceIndex]);

  // Replace chosen operand with 'x'
  operands[replaceIndex] = 'x';
  const question = operands.slice(0, 3).join(' ') + " = " + result + "<br>What is x?";

  return [question, answer];
}

/* DOM manipulation */

$(document).ready(function () {
  let total = 0;
  let wins = localStorage.getItem('wins') ? parseInt(localStorage.getItem('wins'), 10) : 0;
  let question, answer;

  function newQuestion() {
    [question, answer] = generateQuestion();
    while (answer === 0) {
      [question, answer] = generateQuestion();
    }

    $('#question').html(question);
  }

  function make(cat, location) {
    const { id, value, image } = cat;

    // Create the div element with id and class
    var catDiv = $('<div>', {
      id,
    });

    // Create the image element with its source
    var catImg = $('<img>', {
      src: image,
    });

    catDiv.append(catImg);
    catDiv.draggable({ revert: 'invalid' })

    switch (location) {
      case 'home':
        // Add the div to the #catContainer
        // if there is $('#' + cat.id), then append catDiv to it; otherwise create it and append
        if ($('#' + cat.id + '_container').length) {
          $('#' + cat.id + '_container').append(catDiv);
        } else {
          const catContainer = $('<div>', { id: cat.id + '_container', class: 'cat-container' });
          catContainer.append(catDiv);
          $('#cats').append(catContainer);
        }
        break;
      case 'bucket':
        // Add the div to the #catContainer
        $('#bucket').append(catDiv);
        break;
      default:
        return;
    }
  }

  function addToBucket(cat) {
    make(cat, 'bucket');
    make(cat, 'home');

    total += cat.value;
    $('#total').text('').text(total);
  }

  function findCatById(id) {
    return cats.find(cat => cat.id === id);
  }

  function reset() {
    total = 0;
    $('#total').text('');
    $('#bucket').children().remove();
  }

  function skip() {
    addToLog(question, answer, "Skipped", Date.now());
    reset();
    newQuestion();
  }

  function setWins(wins) {
    let result = '0'
    if (wins > 0) {
      result = wins
    }

    // If we are generating multiplication questions, then display the wins mathematically
    if (config.generateMultiplication.value) {

      if (wins > 10) {
        const extraWins = wins - 10;
        result = `10 + ${extraWins}`
      }

      if (wins >= 20) {
        const winsString = wins.toString()
        const winsNumberLength = winsString.length;
        const roundNumber = wins.toString().slice(0, winsNumberLength - 1)
        const extraNumber = wins % 10
        console.log(extraNumber)
        result = `${roundNumber} x 10` + (extraNumber !== 0 ? ' + ' + extraNumber : '')
      }
    }

    $('#win-count').text(result);
    localStorage.setItem('wins', wins);
  }

  function resetWins() {
    wins = 0;
    setWins(0);
  }

  function alertCorrect() {
    $('#yes').show(100).delay(2000).hide(100).delay(500);
  }

  function alertIncorrect() {
    $('#no').show();
  }

  function genConfig(config) {
    Object.keys(config).forEach(key => {
      const configRow = $('<div>', { class: 'config-row' });
      const configName = $('<div>', { class: 'config-name' });
      const configValue = $('<input>', { name: key, class: 'config-value', type: config[key].type, attr: { disabled: 'disabled' } });
      configName.text(config[key].title);
      configRow.append(configName);
      configRow.append(configValue);
      $('#config-modal #config-modal-body').append(configRow);
    });
  }

  function syncConfig(config) {
    // For each config, set the value of the input with the name of the config
    Object.keys(config).forEach(key => {
      const value = config[key].value;
      console.log(key, value)
      const inputField = $(`input[name=${key}]`);
      console.log(inputField)
      if (inputField.attr('type') === 'checkbox') {
        inputField.prop('checked', value);
      } else if (inputField.attr('type') === 'text' || inputField.attr('type') === 'number') {
        inputField.val(value);
      }

      inputField.change(function () {
        const value = inputField.val();
        config[key].value = value;
      });
    });
  }

  $('#bucket').droppable({
    drop: function (event, ui) {
      $('.instructions').remove();
      ui.draggable[0].remove();
      addToBucket(findCatById(ui.draggable[0].id))
    }
  });

  $('#submit').click(function () {
    if (total === answer) {
      {
        alertCorrect();
        addToLog(question, answer, true, Date.now());
      }

      $('#yes').promise().then(function () {
        setWins(++wins);
        reset();
        newQuestion();
      });
    } else {
      addToLog(question, answer, false, Date.now());
      alertIncorrect();
      reset();
    }
  });

  $('#reset').click(function () {
    reset();
  });

  $('#skip').click(function () {
    skip();
  });

  $('#try-again').click(function () {
    $('#no').hide();
  });

  $('#confirm-reset #sure').click(function () {
    resetWins();
    $('#confirm-reset').hide();
  });

  $('#confirm-reset #not-sure').click(function () {
    $('#confirm-reset').hide();
  });

  $('#score').click(function () {
    $('#confirm-reset').show();
  });

  $('#config').click(function () {
    $('#config-modal').show();
  });

  $('#close-config').click(function () {
    $('#config-modal').hide();
  });

  setWins(wins);
  genConfig(config);
  syncConfig(config);
  newQuestion();

  cats.sort((a, b) => b.value - a.value).forEach(cat => make(cat, 'home'));
});