$(document).ready(function() {
    let total = 0;
    let answer = 0;
    let wins = localStorage.getItem('wins') ? parseInt(localStorage.getItem('wins'), 10) : 0;
  
    function generateQuestion() {
        var a = Math.floor(Math.random() * 10);
        var b = Math.floor(Math.random() * 10);
        var sum = a + b;

        // Make sure the sum does not exceed 20
        if (sum > 25) {
            return generateQuestion();
        }

        $('#question').text(a + " + " + b + " = ?");
        answer = sum;
    }

    function make(cat, location) {
        var catType = cat === 'cat' ? 'cat' : 'kitten';
        // Create the div element with id and class
        var catDiv = $('<div>', {
            id: cat === 'cat' ? 'big-cat' : 'small-cat',
            class: catType,
        });

        // Create the image element with its source
        var catImg = $('<img>', {
            src: 'https://coderoo.com.au/projects/sarasoft/' + catType + '.png'
        });

        // Append the image to the div
        catDiv.append(catImg);
        catDiv.draggable({revert:'invalid'})

      switch(location) {
        case 'home':
          // Add the div to the #catContainer
          $('#' + catType + 'Container').prepend(catDiv);
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
    const catType = cat === 'big-cat' ? 'cat' : 'kitten';
    const catValue = cat === 'big-cat' ? 10 : 1;
    
    make(catType, 'bucket');
    make(catType, 'home');
    
    total += catValue;
    $('#total').text('').text(total);
  }
  
  function reset() {
      total = 0;
      $('#total').text('');
      $('#bucket').children().remove();
  }
  
  function setWins(wins) {
      $('#win-count').text(wins);
      localStorage.setItem('wins', wins);
  }
   
  function resetWins() {
      wins = 0;
      setWins(0);
  }
  
    $('.cat').draggable({revert: 'invalid'});
    $('.kitten').draggable({revert: 'invalid'});

    $('#bucket').droppable({
        drop: function(event, ui) {
          ui.draggable[0].remove();
          addToBucket(ui.draggable[0].id)
        }
    });

    $('#submit').click(function() {
        if (total === answer) {
          alert('Correct! You are amazing!');
          setWins(++wins);
          reset();
          generateQuestion();
        } else {
          alert('Whoah... That is not correct, let\'s try again.');
          reset();
        }
    });
  
    $('#reset').click(function() {
      reset();
    });
    
    $('#score').click(function() {
        const resetConfirmed = confirm("Are you sure you want to reset the score?");
        if (resetConfirmed) {
            resetWins();
        }
    });
  
    setWins(wins);
    generateQuestion();
});