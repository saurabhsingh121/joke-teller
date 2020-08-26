const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

//Disable/Enable button
function toggleButton() {
  button.disabled = !button.disabled;
}
// Passing Joke to VoiceRSS APi
function tellMe(joke) {
  VoiceRSS.speech({
    key: "411d5e9141f84237ab5637f61d7d493a",
    src: joke,
    hl: "en-us",
    v: "Linda",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

// Get Jokes from Joke API
async function getJokes() {
  try {
    let joke = "";

    const response = await fetch(
      "https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist"
    );
    const data = await response.json();
    joke = data.setup ? `${data.setup} ... ${data.delivery}` : data.joke;
    // Text-to-speech
    tellMe(joke);
    // Disable the button
    toggleButton();
  } catch (error) {
    console.log("Error occurred ", error);
  }
}

// Event Listeners
button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleButton);
