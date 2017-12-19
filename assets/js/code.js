let $game = $("#game");
let coins = 0;
let fieldCount = 9;
let maxCoins = Math.pow(2, fieldCount) - 1;
let progress = 0;
let gameInterval = setInterval(addOneToken, 1000);

$(document).ready(function() {
  addFields(fieldCount);

  $(".makeDraggable").draggable({
    revert: function(event, ui) {
      // on older version of jQuery use "draggable"
      // $(this).data("draggable")
      // on 2.x versions of jQuery use "ui-draggable"
      // $(this).data("ui-draggable")
      $(this).data("uiDraggable").originalPosition = {
        top: 0,
        left: 0
      };
      // return boolean
      return !event;
      // that evaluate like this:
      // return event !== false ? false : true;
    },
    start: function(event, ui) {
      // console.log(event);
      // console.log(ui);
    }
  });

  $(".makeDroppable").droppable({
    accept: function(thing) {
      if (this.childElementCount == 0) {
        return true;
      } else if(this.childElementCount == 1 && getLevel(thing) == getLevel($(this).children()[0])) {
        return true;
      } else {
        return false;
      }

    },
    drop: function(ev, ui) {
      // console.log("source: " , $(ui.draggable).data().source);
      // console.log("this: ", $(this)[0].id);
      if ($(this)[0].childElementCount > 0 && $($(this).children()[0]).data().id == $(ui.draggable).data().id && $(ui.draggable).data().source != $(this)[0].id) {
        let val = $(ui.draggable).data().id * 2;
        $(ui.draggable).detach().remove();
        $(this).html("");
        $(this).append($("<span class='makeDraggable level-" + val + "' data-level='"+val+"' data-source='"+$(this)[0].id+"' data-id='" + val + "'>" + val + "</span>").draggable());
      } else if($(this)[0].childElementCount  == 0){
        $(ui.draggable).detach().css({top: 0, left: 0}).appendTo(this);
      } else {
        // $(ui.draggable).revert();
      }
      }
    });
  })

  function addFields(number) {
    if ($(".one-game-field").length % 3 == 0) {
      // // console.log($(".one-game-field").length % 3,true);
      // make new row
      if (number % 3 == 0) {
        for (let i = 0; i < number / 3; i++) {
          let $row = $('<div class="one-game-row d-flex flex-row justify-content-start"></div>');
          for (let j = 0; j < 3; j++) {
            $row.append($('<div class="one-game-field border border-white makeDroppable" id="' + getID() + '"></div>'));
          }
          $game.append($row);
        }
      } else {
        let val = Math.floor(number / 3);
        for (let i = 0; i < val; i++) {
          let $row = $('<div class="one-game-row d-flex flex-row justify-content-start"></div>');
          for (let j = 0; j < 3; j++) {
            $row.append($('<div class="one-game-field border border-white makeDroppable" id="' + getID() + '"></div>'));
          }
          $game.append($row);
        }
        let $row = $('<div class="one-game-row d-flex flex-row justify-content-start"></div>');
        val = (number % 3);
        for (let k = 0; k < val; k++) {
          $row.append($('<div class="one-game-field border border-white makeDroppable" id="' + getID() + '"></div>'));
        }
        $game.append($row);
      }
    } else {
      // // console.log($(".one-game-field").length % 3, false);
      // add to last row
    }
  }

  function addToken(number, value = 1) {
    addCoins(number);
    let min = 0;
    let max = $(".one-game-field").length - 1;

    for (let i = 0; i < number; i++) {
      let pos = getRandomInt(min, max);
      let $token = $(`<span class="makeDraggable level-1" data-level="${value}" data-source="${$(".one-game-field")[pos].id}" data-id="${value}">${value}</span>`);
      // // console.log($(".one-game-field")[pos]);
      // // console.log($(".one-game-field")[pos].childElementCount);
      if ($(".one-game-field")[pos].childElementCount == 0) {
        $($(".one-game-field")[pos]).append($token);
      } else {
        i--;
      }
    }
    $(".makeDraggable").draggable();
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function addCoins(number) {
    coins += number;
    progress = (coins / maxCoins) * 100;

    $("#coinsDisplay > span").text(coins);
    $("#progressDisplay > span").text(Math.floor(progress) + "%");
    if (progress == 100) {
      clearInterval(gameInterval);
      alert("Winner Winner Chicken Dinner");
    }
  }

  function addOneToken() {
    // console.log("Gametick++, Progress" + progress);
    // // console.log($(".one-game-field > span").length);
    if ($(".one-game-field > span").length < fieldCount) {
      addToken(1);
    }
  }

  function getID() {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
  };

  function getLevel(element) {
    return $(element).data().level;
  }
