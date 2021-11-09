keyHash = {
  8: ".back",
  13: ".enter",
  187: '.add',
  189: '.sub',
  222: ".comma",
  219: ".openbracket",
  221: ".closebracket",
  220: ".pipe",
  188: ".openangular",
  190: ".closeangular",
  191: ".slash",
  91: '.win'
};


const cap = document.querySelector('.cap');

function checkCaps() {
  if (event.getModifierState("CapsLock")) {
    cap.classList.add('on')
  } else {
    cap.classList.remove('on')
  }
}

const handleKeyDown = (e) => {
  checkCaps()
  let target = keyHash[e.keyCode];
  if (!target) target = `.key[data-key="${String.fromCharCode(e.keyCode)}"]`;
  const key = document.querySelector(target);
  key && key.classList.toggle("pressed");
};

function unPress(e) {
  if (e.propertyName === "transform") this.classList.remove("pressed");
}


window.addEventListener("keydown", handleKeyDown);
const keys = document.querySelectorAll(".key");
keys.forEach((k) => k.addEventListener("transitionend", unPress));