/**
 * 
 * Code co-authored with Camillodo and Vde-guil 
 */
 const app = {
    // just a utility var to remember all the colors
    colors: ['red', 'green', 'blue', 'yellow'],
  
    // this var will contain the sequence said by Simon
    sequence: [],
    cellTab: [],
    startBtn: undefined,
    messageElem: undefined,
    indice: 0,
    timeOutId: undefined,
    
    drawCells: function () {
      const playground = document.getElementById('playground');
      for (const color of app.colors) {
        let cell = document.createElement('div');
        cell.className = 'cell';
        cell.classList.add('noClick');
        cell.id = color;
        cell.style.backgroundColor = color;
        playground.appendChild(cell);
        app.cellTab.push(cell);
      }
    },
  
    bumpCell: function (color) {
      // let's modify the style directly
      document.getElementById(color).style.borderWidth = '45px';
      // and reset the same style, after a small pause (150 ms)
      setTimeout(() => {
        document.getElementById(color).style.borderWidth = '0';
      }, 150);
  
    },
  
    toggleClick: function() {
      for (cell of app.cellTab){
        cell.classList.toggle('noClick');
      }
    },
  
    newGame: function () {
      app.showMessage("a vous de jouer");
      // start by resetting the sequence 
      app.sequence = [];
      // make it 3 times :
      for (let index = 0; index < 3; index++) {
        // get a random number between 0 and 3
        let random = Math.floor(Math.random() * 4);
        // add the corresponding color to the sequence
        app.sequence.push(app.colors[random]);
      }
  
      // start the "Simon Says" sequence
      app.simonSays(app.sequence);
      setTimeout(app.playerRepeat, 500 + 850 * app.sequence.length);
      setTimeout(() => {app.toggleClick();}, 500 + 850 * app.sequence.length);
      app.timeOutId = setTimeout(app.endGame, 5000 + 500 + 850 * app.sequence.length);
    },
  
    simonSays: function (sequence) {
      app.showMessage('Memorize the sequence');
      if (sequence && sequence.length) {
        // after 500ms, bump the first cell
        setTimeout(app.bumpCell, 500, sequence[0]);
        // plays the rest of the sequence after a longer pause
        setTimeout(app.simonSays, 850, sequence.slice(1));
      }
    },
  
    init: function () {
      console.log('init');
      app.drawCells();
  
      // init
      app.startBtn = document.getElementById('go');
      app.messageElem = document.getElementById('message');
  
      // listen click on the "go" button
      app.startBtn.addEventListener('click', app.newGame);
    },
  
    playerRepeatEvent: function (e) {
      clearTimeout(app.timeOutId);
      app.timeOutId = setTimeout(app.endGame, 5000);
      app.bumpCell(e.target.id);
      //Check if response currently is a good answer
      if (e.target.id === app.sequence[app.indice]) {
        app.indice++;
        if (app.indice === app.sequence.length) {
          
          app.nextMove();
        }
      } else {
         app.endGame();
         
      }
    },
  
    playerRepeat: function () {
      const cells = document.querySelectorAll('.cell');
      cells.forEach((currentCell) => {
        currentCell.addEventListener('click', app.playerRepeatEvent);
      });
      app.showMessage('Repeat the sequence');
      
    },
  
    nextMove: function () {
      app.indice = 0;
      // get a random number between 0 and 3
      let random = Math.floor(Math.random() * 4);
      // add the corresponding color to the sequence
      app.sequence.push(app.colors[random]);
      clearTimeout(app.timeOutId);
      app.toggleClick();
      app.simonSays(app.sequence);
      setTimeout(app.toggleClick, 500 + 850 * app.sequence.length,);
  
      app.timeOutId = setTimeout(app.endGame, 5000 + 500 + 850 * app.sequence.length);
      setTimeout(() => {
        app.showMessage('Repeat the sequence')
      }
        ,500 + 850 * app.sequence.length);
    },
  
    showMessage: function (message) {
      app.messageElem.textContent = message;
      if (!app.startBtn.classList.contains('hidden'))
        app.startBtn.classList.add('hidden');
    },
  
    hideMessage: function () {
      app.messageElem.textContent = "";
      app.startBtn.classList.remove('hidden');
    },
  
    endGame: function () {
      app.toggleClick();
      alert(`Your score is : ${(app.sequence.length === 3) ? 0 : app.sequence.length - 1}`);
      clearTimeout(app.timeOutId);
      app.hideMessage();
      app.sequence = [];
      app.scoreTab = [];
      app.indice = 0;
      app.timeOutId = undefined;
    },
  
  };
  
// initialize app
document.addEventListener('DOMContentLoaded', app.init);