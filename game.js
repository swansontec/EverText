/**
 * This is the player's inventory:
 */
var game = {
  "have_key": false,
  "have_amulet": false,
  "have_muffin": false,
  "have_torch": false,
  "key_exists": true,
  "torch_exists": true,
  "amulet_exists": true,
  "box_locked": true,
  "muffin_exists": true,
  "location": 0
};

/**
 * These are the places the player can go:
 */
var places = [
  { /* 0 */
    "text": "You find yourself on an island. A cool breeze is blowing from the ocean, and palm trees dot the landscape. A sandy beach stretches from <em>east</em> to <em>west</em>, and rocky cliffs tower over you to the north.",
    "go": {"east": 1, "west": 3}
  }, { /* 1 */
    "text": "The sandy beach gradually gives way to a swampy swamp. As you look to the <em>north</em>, you see a small cabin in the far distance. To the <em>east</em>, the path continues deeper into the swamp, where croaking frogs make a mournful sound. The beach continues to the <em>west</em>.",
    "go": {"west": 0, "east": 20, "north": 2}
  }, { /* 2 */
    "text": "You find yourself mired in the swamp, unable to make any further progress northward towards the cabin. A solitary turtle stares at you with sad and ancient eyes. You have no choice but to turn back to the <em>south</em>.",
    "go": {"south": 1}
  }, { /* 3 */
    "text": "The sandy beach continues from <em>east</em> to <em>west</em>, and a small, steep path heads <em>up</em> the rocky cliffs to the <em>north</em>.",
    "go": {"west": 12, "north": 4, "up": 4, "east": 0}
  }, { /* 4 */
    "text": "You stand at the edge of a rocky cliff. As you look <em>south</em>, you see a small, steep path winding <em>down</em> to a sandy beach. A mountain towers over you to the <em>north</em>, and the cliffs stretch to the <em>east</em>. It seems possible to walk along the edge.",
    "go": {"south": 3, "down": 3, "north": 5, "up": 5, "east": 10}
  }, { /* 5 */
    "text": "As you stop to catch your breath, you take a look at your surroundings. You are making your way along the southern slope of an ancient volcano. The terrain is rocky, and you have already removed quite a few pebbles from shoes. The summit towers over you to the <em>north</em> and a beach lies far beneath you to the <em>south</em>.",
    "go": {"down": 4, "south": 4, "up": 6, "north": 6}
  }, { /* 6 */
    "text": "You are standing at the summit of an ancient volcano. As you look in all directions, your worst suspicions are confirmed: this is definitely an island, and a small one too. There are signs of a long-abandoned campsite near a clump of bushes to the <em>east</em>, and the path to the beach stretches down to the <em>south</em>.",
    "go": {"down": 5, "south": 5, "east": 7}
  }, { /* 7 */
    "text": "You stand in the middle of an abandoned campsite. A rusted-out kettle sits over a stone fire pit, and the few mouldering remains of a tent cling to the rocky ground. There are bushes here, and a path leading <em>west</em> to the summit.",
    "go": {"west": 6}
  }, { /* 8 */
    "text": "The sound of strange birds fills your ears, and warm, humid scent of a thousand tropical plants lingers in the air. As you walk through the dense tropical rainforest, you notice the trail slowly changing direction. The foilage seems to clear towards the <em>west</em>, but only becomes denser to the <em>south</em>.",
    "go": {"west": 13, "south": 9}
  }, { /* 9 */
    "text": "You are standing at the heart of a dense tropical rainforest. A waterfall cascades down the side of the mountain and flows under a crude log bridge. The trail continues to the <em>south</em> and <em>north</em>.",
    "go": {"south": 17, "north": 8}
  }, { /* 10 */
    "text": "As you edge along the top of the cliff, you notice the opening of a cave to the <em>east</em>. You could go <em>in</em>, or you could work your <em>west</em> to more solid ground.",
    "go": {"west": 4, "east": 11, "in": 11}
  }, { /* 11 */
    "text": "You stand just inside the mouth of a dim and damp cave. Looking <em>out</em> to the <em>west</em>, you see blue sky and a rocky mountain path.",
    "go": {"west": 10, "out": 10}
  }, { /* 12 */
    "text": "You stand a the southwest corner of the island. Water washes over your feet as your stare out at the infinite ocean. The sandy beach stretches both to the <em>north</em> and to the <em>east</em>.",
    "go": {"east": 3, "north": 13}
  }, { /* 13 */
    "text": "You find yourself standing on a rocky crag at the northen tip of the island. A small peninsula juts out to the <em>west</em>, and a thick jungle spreads to the <em>east</em>. To the <em>south</em>, the rocky shore gives way to a smooth sandy beach.",
    "go": {"south": 12, "west": 14, "east": 8}
  }, { /* 14 */
    "text": "As you walk along the peninsula, you notice a mysterious stone pillar standing to the <em>north</em>. You feel drawn to investigate this strange artifact. The peninsula continues to the <em>west</em>, and the main island lies to the <em>east</em>.",
    "go": {"east": 13, "north": 16, "west": 15}
  }, { /* 15 */
    "text": "You reach the end of the peninsula, but there is nothing here. You begin to long for home as you stare out across the endless ocean. How did you come to this strange place? You slowly turn back to the <em>east</em> to retrace your steps.",
    "go": {"east": 14}
  }, { /* 16 */
    "text": "The stone pillar appears to be natural, planted there by some ancient volcanic cataclysm. As you turn to the <em>south</em> to leave, something strange catches your eye. You find a small stone slab with the numbers 1-9-3-6 engraved on the surface. Is this some sort of code?",
    "go": {"south": 14}
  }, { /* 17 */
    "text": "You are standing at the door of a wood cabin. The rainforest to the <em>north</em> has given way to a swampy swamp at this point, and the cabin seems to stand on the last patch of solid ground. The door cabin door is unlocked, and you are tempted to go <em>in</em>.",
    "go": {"north": 9, "in": 18, "south": 18}
  }, { /* 18 */
    "text": "You find yourself in the main room of the cabin. The furnishings are simple, and an old man is sleeping on a rocking chair near the still-glowing fireplace. It seems like you should be able to <em>talk</em> to him. A doorway leads <em>in</em> to a kitchen, and another door leads <em>out</em> to the path.",
    "go": {"north": 17, "south": 19, "in": 19, "out": 17}
  }, { /* 19 */
    "text": "The small kitchen has a single door leading back <em>out</em> to the cabin's main room.",
    "go": {"north": 18, "out": 18}
  }, { /* 20 */
    "text": 'As the sounds of the swamp surround you, you begin to wonder, "Why must frogs live such short lives? They croak so soon!" Leaving to the <em>west</em> seems like a good idea.',
    "go": {"west": 1}
  }, { /* 21 */
    "text": "You are standing in the dim light of your torch, from what you can see all there is is a path leading to the <em>east</em>.",
    "go": {"east": 22}
  }, { /* 22 */
    "text": "You are in the middle of a cold damp room leading off into four different caverns, One to the <em>east</em>, the  <em>west</em>, the, <em>south</em>, and to the <em>north</em>.",
    "go": {"north": 28, "south": 23, "east": 25, "west": 21}
  }, { /* 23 */
    "text": "Cold damp air is rushing out the entrance of the cave, you can go through the <em>door</em> to leave, or go deeper into the cave by heading to the <em>north</em> or the <em>east</em>.",
    "go": {"north": 22, "east": 24, "door": 11, "out": 11}
  }, { /* 24 */
    "text": "The cavern ceiling is glowing with worms above a lake filled with mermaids making strange  'whup!' sounds and manatees making odd 'Ohhoohhohoh!' sounds as well as playful gestures. To paths branch out to the <em>north</em>  and to the <em>west</em>.",
    "go": {"north": 25, "west": 23}
  }, { /* 25 */
    "text": "You have descended into a cave with magic glowing green a purple glowing crystals, you may go to the  <em>west</em>, <em>south</em>, or to the <em>east</em>.",
    "go": {"south": 24, "east": 26, "west": 22}
  }, { /* 26 */
    "text": "You have entered a barren cave room, the tunnel heading <em>east</em> is blocked by a large troll. The troll had a big nose, buck teeth, enormous feet with overgrown nails, bright puke green eyes, and ginger hair flowing in front of his face and down his back. He wore a shirt that read 'Hi, my name is Karl.' Going past the troll seems like a realy bad idea, so it's probably best to just back out the <em>west</em> corridor.",
    "go": {"west": 25}
  }, { /* 27 */
    "text": "You are home in the real world. You have escaped the nightmare.",
    "go": {"home": 27}
  }, { /* 28 */
    "text": "Bats cover the ceiling, screeching every so often and beating their wings victoriously. Two paths leave the bats, heading <em>south</em> and <em>east</em>.",
    "go": {"south": 22, "east": 29}
  }, { /* 29 */
    "text": "The cavern comes to a dead end. In the misty shadows, you notice a large iron chest. Perhaps this warrants a closer <em>look</em>? Otherwise, you could just leave to the <em>west</em>.",
    "go": {"west": 28}
  }
];

/**
 * Handles the typed game command.
 */
function doGame(tokens)
{
  var here = places[game.location];

  switch (game.location) {
  case 2:
    if (tokens.length == 1 && tokens[0] == 'talk') {
        textOut('As you begin to say something, the turtle blinks and slides into the water. "This is super retarded," you think, as you turn to leave, "Taking to a turtle is basically the dumbest idea ever." Suddenly, a voice calls out from the deep, "Bewaaaare the troll! Only the one who <em>wields</em> the ancient purple <em>amulet</em> may defeat him." When you wake up, you find yourself covered in mud. "Ok," you think, "I\'m either tripping on swamp gas, or I\'m trapped in some really stupid alternate reality. Hopefully it\'s the swamp gas thing."');
        return;
    }

  case 7:
    if (tokens.length == 1 && tokens[0] == 'look' && game.key_exists) {
        textOut('You spy a small golden <em>key</em> under the bush.');
        return;
    }
    if (tokens.length == 2 && tokens[0] == 'get' && tokens[1] == 'key' && game.key_exists) {
        textOut('You reach under the bush and grab the key.');
        game.key_exists = false;
        game.have_key = true;
        return;
    }
    break;

  case 11:
    if (tokens.length == 2 && tokens[0] == 'go' && tokens[1] == 'in' &&
        game.have_key && game.have_torch) {
      showLocation(game.location, 23);
      game.location = 23;
      return;    
    }
    break;

  case 9:
    if (tokens.length == 2 && tokens[0] == 'get' && tokens[1] == 'torch' && game.torch_exists) {
        textOut('You reach up and grab the torch.');
        game.torch_exists = false;
        game.have_torch = true;
        return;
    }
    break;
   
  case 18:
    if (tokens.length == 1 && tokens[0] == 'talk') {
        textOut('"Hello," says the old man, "I almost never get visitors. Well, mostly because I live on an island in the middle of nowhere, with no way on or off. Speaking of which, how did you get here? I\'m still asleep, aren\'t I? Yeah, that\'s it. At least this is better than that other dream with the stupid talking turtle. He keeps going on about some sort of adventurer or something. Hey, are you an adventurer? I think you are supposed to talk to him or something. Maybe then he will go away and leave me alone. I can\'t tell what\'s real and what\'s a figment of my imagination anymore."');
        return;
    }
    
  case 19:
    if (tokens.length == 2 && tokens[0] == 'get' && tokens[1] == 'muffin' && game.muffin_exists) {
        textOut('You grab the muffin off the countertop. It looks good to <em>eat</em>.');
        game.muffin_exists = false;
        game.have_muffin = true;
        return;
    }
    
  case 26:
    if (tokens.length == 2 && tokens[0] == 'wield' && tokens[1] == 'amulet' && game.have_amulet)
    {
        textOut('You wield the amulet, and it\'s magical purple power slays the troll. As you walk past the fallen creature, you find yourself surrounded by a faint purple haze and notice a throbbing "wob wob wob" sound. Everything swirls around you, and you find youself back in the real world. Congratulations, you have won the game!');
        game.location = 27;
        return;
    }
    
  case 29:
    if (game.box_locked && (
        (tokens.length == 2 && tokens[0] == 'enter' && tokens[1] == '1936') ||
        (tokens.length == 5 && tokens[0] == 'enter' && tokens[1] == '1' &&
         tokens[2] == '9' && tokens[3] == '3' && tokens[4] == '6'))) {
        textOut("The chest flies open! Why don't you <em>look</em> inside?");
        game.box_locked = false;
        return;
    }
    if (tokens.length == 1 && tokens[0] == 'look') {
        if (game.box_locked)
            textOut('The chest is locked, but there are four mysterious dials on its lid. It seems like you could <em>enter</em> a combination here.');
        else if (game.amulet_exists)
            textOut('You spy a purple <em>amulet</em> within the chest.');
        else
            textOut('There is nothing in the chest! Nothing! Leaving to the <em>west</em> is the only option.');
        return;              
    }
    if (!game.box_locked && game.amulet_exists &&
        tokens.length == 2 && tokens[0] == 'get' && tokens[1] == 'amulet') {
        textOut('You grab the purple amulet! The power is yours! MUWAHAHA!');
        game.amulet_exists = false;
        game.have_amulet = true;
        return;              
    }
    break;
  }

  standardCommand(tokens);
}

/**
 * Handles default command behavior.
 */
function standardCommand(tokens)
{
  var here = places[game.location];

  //Handle common commands:
  switch (tokens[0]) {
  case 'look':
    if (tokens.length != 1) {
      return textOut('What is this "' + tokens[1] + '" of which you speak?');
    }
    showLocation(null, game.location);
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
    if (to === undefined)
      return textOut('"' + tokens[1] + '" is not a place you can go.');
    showLocation(game.location, to);
    game.location = to;
    return;

  case 'get':
    textOut('Sorry, but there is nothing to get here.');
    return;

  case 'eat':
    if (tokens.length < 2)
    return textOut('If you want to eat something, you must say what.');
    if (tokens.length > 2)
    return textOut('You can only eat one thing at a time.');
    if (tokens[1] == 'muffin') {
      if (game.have_muffin) {
        game.have_muffin = false;
        textOut('You eat the muffin, and it turns your hair blue. The day is not going well.');
        return;
      } else {
        textOut("You don't have a muffin to eat.");
        return;
      }
    }
    textOut("You don't have any " + tokens[1] + " to eat.");
    return;

  case 'items':
  case 'inventory':
    textOut('You have the following items:');
    textOut('Compass');
    if (game.have_key) {
      textOut('Key');
    }
    if (game.have_amulet) {
      textOut('Amulet');
    }
    if (game.have_muffin) {
      textOut('Muffin');
    }
    if (game.have_torch) {
      textOut('Torch');
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
 * Displays a location's description.
 */
function showLocation(from, where)
{
  if ((where == 13 && from == 12) || (where == 12 && from == 13))
    textOut("You walk along the sandy beach for a long time. It is peaceful here.");

  if (where == 11 && from == 23)
    textOut("You unlock the door and pass through.");

  textOut(places[where].text);

  if (where == 7 && game.key_exists) {
    textOut("As you glance around, you notice something shiney under one of the bushes. Perhaps you should lean down to take a better <em>look</em>.");
  }
  
  if (where == 9 && game.torch_exists) {
    textOut("There is a <em>torch</em> attached to one of the trees. You may be able to <em>get</em> it if you reach.");
  }

  if (where == 11 && !game.have_key)
    textOut("A strong iron door with a tiny keyhole blocks your path inward.");

  if (where == 11 && game.have_key && !game.have_torch)
    textOut("Your key unlocks the door, but it is too dark to proceed without a <em>torch</em>.");
  
  if (where == 11 && game.have_key && game.have_torch)
    textOut("Your key unlocks the door, and your torch lights the way. You may go <em>in</em>.");
    
  if (where == 19 && game.muffin_exists)
    textOut("There is a <em>muffin</em> on the countertop.");
}

