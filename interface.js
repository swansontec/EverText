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
    output.scrollTop = output.scrollHeight - 500;
  }
}

/**
 * Display a welcome message.
 */
function interfaceWelcome() {
  textOut('<img alt="Welcome to EverText" src="welcome.png">');
  doGame(['look']);
  textOut('Type <em>help</em> if you need instructions.');
}
window.onload = interfaceWelcome;

/**
 * Handle when the user presses "enter"
 */
function interfaceSubmit()
{
  //Get the text they entered:
  var inputBox = document.getElementById("input");
  var input = inputBox.value;
  inputBox.value = "";

  //Write a copy of the text to the screen:
  textOut('<kbd>&gt; ' + input + '</kbd>');

  //Tokenize the input string:
  var tokens = input.toLowerCase().split(" ");
  if (!tokens.length) {
    textOut('You must enter some command.');
  }

  //Do some game stuff here:
  doGame(tokens);

  //All done:
  return false;
}

