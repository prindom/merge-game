let $game = $("#game");
let coins = 0;
let fieldCount = 4;
let maxCoins = Math.pow(2, fieldCount) - 1;
let progress = 0;
let gameInterval = setInterval(addOneToken, 5000);

$(document).ready(function() {
  addFields(fieldCount);

  $(".makeDraggable").draggable();

  $(".makeDroppable").droppable({
      accept: function(thing) {
        if(this.childElementCount == 0) {
          return  true;
        } else {
          // console.log($($(this).children()[0]).data().id);
          return  true;
        }

    },
      drop: function(ev, ui) {
          if($(this)[0].childElementCount > 0 && $($(this).children()[0]).data().id == $(ui.draggable).data().id) {
              let val = $(ui.draggable).data().id * 2;
              $(ui.draggable).detach().remove();
              $(this).html("");
              $(this).append($("<span class='makeDraggable level-"+val+"' data-id='"+val+"'>"+val+"</span>").draggable());
          } else {
              $(ui.draggable).detach().css({top: 0,left: 0}).appendTo(this);
          }
      }
  });
})



function addFields(number) {
  if($(".one-game-field").length % 3 == 0) {
    // console.log($(".one-game-field").length % 3,true);
    // make new row
    if(number % 3 == 0) {
      for(let i = 0; i < number / 3; i++) {
        let $row = $('<div class="one-game-row d-flex flex-row justify-content-start"></div>');
        for(let j = 0; j < 3; j++) {
          $row.append($('<div class="one-game-field border border-white makeDroppable"></div>'));
        }
        $game.append($row);
      }
    } else {
      let val = Math.floor(number / 3);
      for(let i = 0; i < val; i++) {
        let $row = $('<div class="one-game-row d-flex flex-row justify-content-start"></div>');
        for(let j = 0; j < 3; j++) {
          $row.append($('<div class="one-game-field border border-white makeDroppable"></div>'));
        }
        $game.append($row);
      }
      let $row = $('<div class="one-game-row d-flex flex-row justify-content-start"></div>');
      val = (number % 3);
      for(let k = 0; k < val; k++) {
        $row.append($('<div class="one-game-field border border-white makeDroppable"></div>'));
      }
      $game.append($row);
    }
  } else {
    // console.log($(".one-game-field").length % 3, false);
    // add to last row
  }
}

function addToken(number, value = 1) {
  addCoins(number);
  let min = 0;
  let max = $(".one-game-field").length-1;

  for(let i = 0; i < number; i++) {
    let pos = getRandomInt(min, max);
    let $token = $(`<span class="makeDraggable level-1" data-id="${value}">${value}</span>`);
    // console.log($(".one-game-field")[pos]);
    // console.log($(".one-game-field")[pos].childElementCount);
    if($(".one-game-field")[pos].childElementCount == 0) {
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
  progress = (coins/maxCoins) * 100;

  $("#coinsDisplay > span").text(coins);
  $("#progressDisplay > span").text(progress+"%");
}

function addOneToken() {
  console.log("Gametick++, Progress" + progress);
  if(progress == 100) {
    clearInterval(gameInterval);
    alert("Winner Winner Chicken Dinner");
  }
  // console.log($(".one-game-field > span").length);
  if($(".one-game-field > span").length < fieldCount) {
    addToken(1);
  }
}
