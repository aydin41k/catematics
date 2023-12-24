$(document).ready(function() {
    let total = 0;
    let answer = 0;
    let wins = localStorage.getItem('wins') ? parseInt(localStorage.getItem('wins'), 10) : 0;

    const cats = [
      {
        id: 'cat_1',
        value: 1,
        image: 'images/kitten.png',
        class: 'kitten',
      },
      {
        id: 'cat_2',
        value: 5,
        image: 'images/cat_five_sm.png',
        class: 'cat',
      },
      {
        id: 'cat_3',
        value: 10,
        image: 'images/cat.png',
        class: 'cat',
      },
    ];
  
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
      const {id, value, image} = cat;

        // Create the div element with id and class
        var catDiv = $('<div>', {
            id,
        });

        // Create the image element with its source
        var catImg = $('<img>', {
            src: image,
        });

        catDiv.append(catImg);
        catDiv.draggable({revert:'invalid'})

      switch(location) {
        case 'home':
          // Add the div to the #catContainer
          // if there is $('#' + cat.id), then append catDiv to it; otherwise create it and append
          if ($('#' + cat.id + '_container').length) {
            $('#' + cat.id + '_container').append(catDiv);
          } else {
            const catContainer = $('<div>', {id: cat.id + '_container', class: 'cat-container'});
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
  
  function setWins(wins) {
      $('#win-count').text(wins);
      localStorage.setItem('wins', wins);
  }
   
  function resetWins() {
      wins = 0;
      setWins(0);
  }

    $('#bucket').droppable({
        drop: function(event, ui) {
            $('.instructions').remove();
            ui.draggable[0].remove();
            addToBucket(findCatById(ui.draggable[0].id))
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

    cats.sort((a, b) => b.value - a.value).forEach(cat => make(cat, 'home'));
});