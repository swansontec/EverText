/**
 * EverText (Now with lie-free cake!)
 */

/**
 * Call this function to put HTML into the output box:
 */
function textOut(text)
{
  var p = document.createElement("p");
  p.innerHTML = text;
  var output = document.getElementById("output");
  output.appendChild(p);
  if (output.scrollHeight) {
    output.scrollTop = output.scrollHeight - 400;
  }
}

/**
 * Display a welcome message.
 */
function gameWelcome() {
  textOut('<img alt="Welcome to EverText" src="welcome.png">');
  gameCommand('look');
}
window.onload = gameWelcome;

/**
 * Handle when the user presses "enter"
 */
function gameSubmit()
{
  //Get the text they entered:
  var inputBox = document.getElementById("input");
  var input = inputBox.value;
  inputBox.value = "";

  //Write a copy of the text to the screen:
  textOut('<kbd>&gt; ' + input + '</kbd>');

  //Do some game stuff here:
  doGame(input);

  //All done:
  return false;
}

/**
 * Handles default command behavior.
 */
function gameCommand(input)
{
  var here = places[game.location];

  //Tokenize the input string:
  var tokens = input.toLowerCase().split(" ");
  if (!tokens.length) {
    textOut('You must enter some command.');
  }

  //Handle common commands:
  switch (tokens[0]) {
  case 'look':
    if (tokens.length != 1) {
      return textOut('What is this "' + tokens[1] + '" of which you speak?');
    }
    textOut(here.text);
    return;

  case 'walk':

  case 'go':
    if (tokens.length < 2)
    return textOut('If you want to go somewhere, you must say were.');
    if (tokens.length > 2) {
      if (tokens.length == 3 && (tokens[1] == 'to' || tokens[1] == 'in'))
      tokens[1] = tokens[2];
      else
      return textOut('Sorry, you can only go one place at a time');
    }
    var to = here.go[tokens[1]];
    if (!to)
    return textOut('"' + tokens[1] + '" is not a place you can go.');
    game.location = to;
    textOut(places[to].text);
    return;

  case 'get':
    textOut('Sorry, but there is nothing to get here.');
    return;

  case 'eat':
    if (tokens.length < 2)
    return textOut('If you want to eat something, you must say what.');
    if (tokens.length > 2)
    return textOut('You can only eat one thing at a time.');
    if (tokens[1] == 'shovel') {
      if (game.shovel) {
        game.shovel = false;
        textOut('You force the shovel down your throat, and choke and slowly die.');
        alert('Game Over');
        return;
      } else {
        textOut("You don't have a shovel to eat.");
        return;
      }
    }
    if (tokens[1] == 'gold') {
      if (game.gold) {
        game.gold = false;
        textOut('You force the gold down your throat, and get cramps...');
        return;
      } else {
        textOut("You don't have gold to eat.");
        return;
      }
    }
    return;

  case 'dig':
    if (game.shovel) {
      textOut('You dig, but find nothing.');
    } else {
      textOut('You have nothing to dig with.');
    }
    return;

  case 'items':
  case 'inventory':
    textOut('You have the following items:');
    if (game.shovel) {
      textOut('Shovel');
    }
    if (game.gold) {
      textOut('<img src="coin2.gif">Gold');
    }
    if (game.map) {
      textOut('Map');
    }
    return;

  case 'help':
    textOut('To go somewhere, type "<em>go</em>" and the name of the place.');
    textOut('To pick things up, type "<em>get</em>" and the name of the item.');
    textOut('To see what you have, type "<em>items</em>".');
    textOut('You can do other things as well. Look for <em>highlighted</em> clues.');
    return;

  default:
    textOut('I do not understand what you mean. Would you like some <em>help</em>?');
    return;
  }
  return;
}

/**
 * This is the player's inventory:
 */
var game = {
  "location": "start",
  "score": 0,
  "gold": false,
  "shovel": false,
  "lantern": false,
  "map": false,
  "shackman": false
  /*Add similar stuff here*/
};

/**
 * These are the places the player can go:
 */
var places = {
  "start": {
    "text": "You find yourself on an island. A cool breeze is blowing from the ocean, and palm trees line a sandy road heading from <em>east</em> to <em>west</em>.",
    "go": {"east":"docks", "west":"grove"}
  },
  "grove": {
    "text": "You are now in a grove of palm trees. The road splits, heading <em>north</em>, <em>south</em>, and <em>east</em>.",
    "go": {"east":"start", "north":"mountain", "south":"beach"}
  },
  "docks": {
    "text": "You are now at the docks. The ocean is on the east, a shack stands to the <em>north</em>, and to the <em>west</em> is a road.",
    "go": {"west":"start", "north":"shack"}
  },
  "mountain": {
    "text": "You are at the foot of a mountain. There is a small <em>cave</em> heading underground. A road heads to the <em>south</em>.",
    "go": {"south":"grove", "cave":"cave"}
  },
  "cave": {
    "text": "The cave is a dead end; the only way to go is <em>out</em>. But <em>look</em>! There is an overhang that may have something under it.",
    "go": {"out":"mountain"}
  },
  "beach": {
    "text": "You are on a beautiful beach of soft, white sand. A road heads to the <em>north</em>. This seems like a good place to <em>dig</em> for treasure.",
    "go": {"north":"grove"}
  },
  "shack": {
    "text": "You arrive at the shack where you find a sleeping man inside.",
    "go": {"south":"docks"}
  }
};

/**
 * Custom game logic.
 */
function doGame(input)
{
  //Handle special actions at certain locations:
  switch (game.location) {
  case 'cave':
    if (input == 'look') {
      if (game.shovel) {
        textOut('There is nothing under the overhang.');
      } else {
        textOut('There is a shovel in the shadows. If you reach, you may just be able to <em>get</em> it.');
      }
      return;
    }
    if (input == 'get shovel' && !game.shovel) {
      game.shovel = true;
      textOut('You now have a shovel');
      return;
    }
    break;

  case 'beach':
    if (input == 'dig' && game.shovel && !game.gold) {
      game.gold = true;
      textOut('You dig, and find a small chest of gold.');
      return;
    }
    break;

  case 'shack':
    if (input == 'wake up man' && !game.shackman) {
      game.shackman = true;
      textOut('The man wakes up and asks if you would like to trade your gold for a  map, maybe you should <em>trade</em> with him.');
      return;
    }
    if (input == 'trade gold') {
      if (game.gold) {
        game.gold = false;
        game.map = true;
        textOut('The man took your gold and gave you his map.');
        return;
      } else if (!game.gold) {
        textOut('You have no gold to trade with!');
        return;
      }
    }
    break;
  }

  //We aren't any of those places, so just do the default:
  gameCommand(input);
}
