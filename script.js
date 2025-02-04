document.addEventListener("keydown", handleKeyPress);
document.addEventListener("keyup", handleKeyPress);

let isRecording = false;
let recordedKeys = [];
let startRecordDate;
let isPlaying = false;

function handleKeyPress(event) {
  // Si l'event est declenché en boucle car la personne laisse la touche appuyer, on ne fait rien !
  if (event.repeat) {
    return;
  }

  const key = document.querySelector(`.key[data-key="${event.keyCode}"]`);
  // Directement après avoir essayé de récuperer la div associée à une touche, on vérifie
  // si on a bien réussi à avoir une touche
  if (!key) {
    return; // sinon on ne continue pas la fonction
  }

  if (event.type === "keydown") {
    key.classList.toggle("playing");
  }

  if (event.type === "keyup") {
    if (event.keyCode !== 82 && event.keyCode !== 80) {
      key.classList.toggle("playing");
      return;
    }

    if (event.keyCode === 82) {
      // 82 est la touche de record
      triggerRecord();
    }
    if (event.keyCode === 80) {
      playRecord();
    }
  }

  playSound(event);
}
console.log(isPlaying);

function playSound(event) {
  const audio = document.querySelector(`audio[data-key="${event.keyCode}"]`);

  // Directement après avoir essayé de récuperer l'audio associée à une touche, on vérifie
  // si on a bien réussi à avoir un audio
  if (!audio) {
    return; 
  }

  audio.currentTime = 0; // Remet le son au début
  audio.play();

  if (isRecording) {
    recordedKeys.push({
      keyCode: event.keyCode,
      timeCode: Date.now() - startRecordDate,
    });

    console.log(recordedKeys);
  }
}

function triggerRecord() {
  isRecording = !isRecording;

  if (isRecording) recordedKeys = [];

  startRecordDate = Date.now();
}

function playRecord() {
  isPlaying = !isPlaying;
  if (isPlaying) {
    recordedKeys.forEach((key) => {
      // console.log(key.keyCode);
      // console.log(key.timeCode);

      setTimeout(() => {
        const toucheClass = document.querySelector(
          `.key[data-key="${key.keyCode}"]`
        );
        toucheClass.classList.add("playing");
        playSound(key);
      }, key.timeCode);
      setTimeout(() => {
        const toucheClass = document.querySelector(
          `.key[data-key="${key.keyCode}"]`
        );
        toucheClass.classList.remove("playing");
      }, key.timeCode + 200);

    
    });
  
  }
}
