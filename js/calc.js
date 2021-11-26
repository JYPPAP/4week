const keyHash = {
  42: "*",
  43: "+",
  45: "-",
  46: ".",
  47: "/",
  48: "0",
  49: "1",
  50: "2",
  51: "3",
  52: "4",
  53: "5",
  54: "6",
  55: "7",
  56: "8",
  57: "9"
};

document.addEventListener("DOMContentLoaded", () => {
  /*************
   * 수수료
   *************/
  const sell_price = document.getElementById("sell_price");
  const fee_price = document.getElementById("fee_price");
  const mile_price = document.getElementById("mile_price");

  sell_price.onkeypress = (e) => e.stopPropagation();
  sell_price.onkeyup = (e) => checkKeyCode(e);

  function checkKeyCode(e) {
    e.stopPropagation();
    if (!isNaN(e.key)) {
      return makeMoneyFormat();
    } else if (e.keyCode === 8) {
      backSpace();
      return makeMoneyFormat();
    } else if (e.keyCode === 27) {
      sell_price.value = "";
      fee_price.textContent = " 원";
      mile_price.textContent = " 원";
    } else {
      window.alert(
        " 숫자 : 0-9 \n BackSpace : 이전 숫자 지우기 \n ESC : 전부 지우기 \n 만 입력하실 수 있습니다.");
      sell_price.value = "";
      fee_price.textContent = " 원";
      mile_price.textContent = " 원";
    }
  }

  function makeMoneyFormat() {
    let numPrice = Number(sell_price.value.replace(/,/g, ""));

    sell_price.value = (numPrice).toString()
      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    fee_price.textContent = (Math.floor(numPrice * 0.05 / 10) * 10).toString()
      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + " 원";
    mile_price.textContent = (Math.floor(numPrice * 0.95 / 10) * 10).toString()
      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") + " 원";
  }
  /*************
   * 계산기
   *************/
  const result = document.getElementById("result");

  /* 입력 변수 */
  let oFlag = true;
  const clear = document.getElementById("AC");
  const back = document.getElementById("back");
  const enter = document.getElementById("enter");
  const keys = Array.prototype.slice.call(document.getElementsByClassName("key"));

  /* 초기화 AC */
  const allClear = () => {
    result.textContent = "";
  }

  /* backspace 동작 */
  const backSpace = () => {
    result.textContent = result.textContent.slice(0, -1);
    oFlag = true;
  }

  /*******************
   * 키보드 입력
   *******************/
  document.addEventListener('keyup', (e) => {
    if (e.keyCode === 8) backSpace();
    if (e.keyCode === 13) calculate(result);
    if (e.keyCode === 27) allClear();
  });

  document.addEventListener('keypress', (e) => {
    let target = keyHash[e.keyCode];

    keyAnimation(target);
    checkInput(target);
  });

  function keyAnimation(target) {
    keys.map(key => {
      target === key.textContent ? key.classList.add("pressed") : key.classList.remove("pressed");
      setTimeout(() => {
        key.classList.remove("pressed");
      }, 1000)
    });
  }

  /*******************
   * 마우스 입력
   *******************/
  clear.onclick = e => allClear();
  back.onclick = e => backSpace();
  enter.onclick = e => calculate(result);

  keys.map(key => {
    key.addEventListener('click', setValue);
  });

  function setValue() {
    target = this.textContent;
    checkInput(target);
  }

  /*******************
   * 입력값 체크
   *******************/
  function checkInput(target) {
    let beforeInput;

    if (typeof target === "undefined") {
      return true;
    }

    if (!isNaN(target)) {
      oFlag = false;
      result.textContent += target;
    } else if (target === "*" || target === "/" || target === "+" || target === "-" ) {
      if (oFlag) backSpace();
      result.textContent += target;
      oFlag = true;
    } else if ( target === ".") {
      // if(typeof(result.textContent.pop()))
      if ( isNaN(beforeInput)) {
        result.textContent += "0";
      }
      result.textContent += target;
    }
    
    beforeInput = target;
    return beforeInput, oFlag;
  }

  /*******************
   *      계산
   *******************/
  function calculate(result) {
    let calcArray = result.textContent.match(/[\*\/\+\-]|(\d+\.\d+)|\d+/g);
    let calc1Count = calcArray.filter(ele => ele === "*" || ele === "/").length;
    let calc2Count = calcArray.filter(ele => ele === "+" || ele === "-").length;
    console.log(calcArray);

    for (let i = 0; i < calc1Count; i++) calc1(calcArray);
    for (let j = 0; j < calc2Count; j++) calc2(calcArray);
  }

  function calc1(calcArray) {
    let calcIndex = calcArray.findIndex((ele) => ele === "*" || ele === "/");
    const prevIndex = parseFloat(calcArray[calcIndex - 1]);
    const nextIndex = parseFloat(calcArray[calcIndex + 1]);

    if (calcArray[calcIndex] === "*") {
      let calcResult = prevIndex * nextIndex;
      resultInput(calcArray, calcIndex, calcResult);
    }
    if (calcArray[calcIndex] === "/") {
      let calcResult = prevIndex / nextIndex;
      resultInput(calcArray, calcIndex, calcResult);
    }
    result.textContent = calcArray;
  }

  function calc2(calcArray) {
    let calcIndex = calcArray.findIndex((ele) => ele === "+" || ele === "-");
    const prevIndex = parseFloat(calcArray[calcIndex - 1]);
    const nextIndex = parseFloat(calcArray[calcIndex + 1]);

    if (calcArray[calcIndex] === "+") {
      let calcResult = prevIndex + nextIndex;
      resultInput(calcArray, calcIndex, calcResult);
    }
    if (calcArray[calcIndex] === "-") {
      let calcResult = prevIndex - nextIndex;
      resultInput(calcArray, calcIndex, calcResult);
    }
    result.textContent = calcArray;
  }

  function resultInput(calcArray, calcIndex, calcResult) {
    calcArray[calcIndex - 1] = calcResult;
    calcArray.splice(calcIndex, 2);
  }



});