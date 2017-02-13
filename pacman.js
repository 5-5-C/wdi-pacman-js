// Setup initial game stats
var score = 0;
var lives = 2;
var powerPellets = 4;
var hasPellets = true;

// Define your ghosts here
var Inky = {
  menu_option: '1',
  name: 'Inky',
  colour: 'Red',
  charater: 'Shadow',
  edible: false
};

var Blinky = {
  menu_option: '2',
  name: 'Blinky',
  colour: 'Cyan',
  charater: 'Speedy',
  edible: false
};

var Pinky = {
  menu_option: '3',
  name: 'Pinky',
  colour: 'Pink',
  charater: 'Shadow',
  edible: false
};

var Clyde = {
  menu_option: '4',
  name: 'Clyde',
  colour: 'Orange',
  charater: 'Pokey',
  edible: false
};


// replace this comment with your four ghosts setup as objects
var ghosts = [Inky, Blinky, Pinky, Clyde ]


// Draw the screen functionality
function drawScreen() {
  clearScreen();
  setTimeout(function() {
    displayStats();
    displayMenu(hasPellets);
    displayPrompt();
  }, 10);
}

function clearScreen() {
  console.log('\x1Bc');
}

function displayStats() {
  console.log('Score: ' + score + '     Lives: ' + lives +'    PowerPellets: '+ powerPellets);
}

function displayMenu(hasPellets = true) {


  if(hasPellets){
  console.log('\n\nSelect Option:\n');  // each \n creates a new line
  console.log('(d) Eat Dot');
  console.log('(p) Eat Power Pellet');
  console.log('(1) Eat Inky (' + isEdible(Inky.edible) + ')');
  console.log('(2) Eat Blinky (' + isEdible(Blinky.edible) + ')');
  console.log('(3) Eat Pinky (' + isEdible(Pinky.edible) + ')');
  console.log('(4) Eat Clyde (' + isEdible(Clyde.edible) + ')');
  console.log('(q) Quit');
}
else {
  console.log('\n\nSelect Option:\n');  // render new menu when out of power pellets
  console.log('(d) Eat Dot');
  console.log('(1) Eat Inky');
  console.log('(2) Eat Blinky');
  console.log('(3) Eat Pinky');
  console.log('(4) Eat Clyde');
  console.log('(q) Quit');
}
}

function isEdible(edible){
  switch(edible){
  case true:
    return "edible";
    break;
  case false:
  return "inedible";
  break;
  default:
  return "mmmm"
  break;
}

}

function displayPrompt() {
  // process.stdout.write is similar to console.log except it doesn't add a new line after the text
  process.stdout.write('\nWaka Waka :v '); // :v is the Pac-Man emoji.
}



// Menu Options
function eatDot() {
  console.log('\nChomp!');
  score += 10;
}

function eatInky() {
  console.log('\nChomp!');
  score += 5;
  Inky.edible = false;
}

function eatBlinky() {
  console.log('\nChomp!');
  score += 5;
  Blink.edible = false;
}

function eatPinky() {
  console.log('\nChomp!');
  score += 5;
  Pinky.edible = false;
}

function eatClyde() {
  console.log('\nChomp!');
  score += 5;
  Clyde.edible = false
}

function eatpowerPellet() {
  checkPowerPellets();
  console.log('\nChomp!');
  score += 50;
for (var i = 0; i < ghosts.length; i++) {
  ghosts[i].edible = true;
}
powerPellets-- ;
checkPowerPellets()
}

function checkPowerPellets() {
  if (powerPellets == 0) {
  console.log('\nYou have no Power Pellets Remaining');
  hasPellets = false;
  }
  else {
    hasPellets = true;
  }
}

function eatGhosts(ghosts) {
  if (!ghosts.edible) {
    console.log('\nkilled by' + ghosts.name + ghosts.colour);
  lives--;
}
else {
    console.log('\nYou Ate' + ghosts.name);
    score += 200;
    ghosts.edible = false;
  }
}

function checkGameOver() {
  if (lives < 0) {
    process.exit()
  console.log('\nYou lost');
}
}




// Process Player's Input
function processInput(key) {
  switch(key) {
    case '\u0003': // This makes it so CTRL-C will quit the program
    case 'q':
      process.exit();
      break;
    case 'd':
      eatDot();
      break;
    case 'p':
      eatpowerPellet();
      break;
    case '1':
      eatGhosts(ghosts[0]);
      break;
    case '2':
      eatGhosts(ghosts[1]);
      break;
    case '3':
      eatGhosts(ghosts[2]);
      break;
    case '4':
      eatGhosts(ghosts[3]);
      break;
    default:
      console.log('\nInvalid Command!');
  }
  checkGameOver();
}


//
// YOU PROBABLY DON'T WANT TO CHANGE CODE BELOW THIS LINE
//

// Setup Input and Output to work nicely in our Terminal
var stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

// Draw screen when game first starts
drawScreen();

// Process input and draw screen each time player enters a key
stdin.on('data', function(key) {
  process.stdout.write(key);
  processInput(key);
  setTimeout(drawScreen, 300); // The command prompt will flash a message for 300 milliseoncds before it re-draws the screen. You can adjust the 300 number to increase this.
});

// Player Quits
process.on('exit', function() {
  console.log('\n\nGame Over!\n');
});
