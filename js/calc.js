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

  sell_price.onkeydown = (e) => priceDown(e);
  sell_price.onkeypress = (e) => pricePress(e);

  const priceDown = (e) => {
    e.stopPropagation();
    if (e.keyCode === 27) {
      sell_price.value = "";
      fee_price.textContent = "원";
      mile_price.textContent = "원";
    }
  }
  const pricePress = (e) => {
    /* 이벤트 중복 동작 방지 */
    e.stopPropagation();
    let numPrice = Number(sell_price.value.replace(/,/g, ""));
    console.log(numPrice);
    if (e.keyCode === 13) {
      sell_price.value = numPrice.toLocaleString('ko-KR');
      fee_price.textContent = (numPrice * 0.05).toLocaleString() + " 원";
      mile_price.textContent = (numPrice * 0.95).toLocaleString() + " 원";
    }
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
  const keys = Array.from(document.getElementsByClassName("key"));

  /* 초기화 AC */
  const allClear = () => {
    result.textContent = "";
  }
  allClear();

  /* backspace 동작 */
  const backSpace = () => {
    result.textContent = result.textContent.slice(0, -1);
  }

  /* 계산 */
  function calculate(result) {
    let calcArray = result.textContent.match(/[\*\/\+\-]|(\d+\.\d+)|\d+/g);
    let calc1Count = calcArray.filter(ele => ele === "*" || ele === "/").length;
    let calc2Count = calcArray.filter(ele => ele === "+" || ele === "-").length;
    console.log(calcArray);

    /* 값 삽입 */
    let resultInput = (calcIndex, calcResult) => {
      calcArray[calcIndex - 1] = calcResult;
      calcArray.splice(calcIndex, 2);
    }

    /* 연산 1 */
    function calc1() {
      let calcIndex = calcArray.findIndex((e) => e === "*" || e === "/");
      if (calcArray[calcIndex] === "*") {
        let calcResult = parseFloat(calcArray[calcIndex - 1]) * parseFloat(calcArray[calcIndex + 1]);
        resultInput(calcIndex, calcResult);
        console.log(calcArray);
      }
      if (calcArray[calcIndex] === "/") {
        let calcResult = parseFloat(calcArray[calcIndex - 1]) / parseFloat(calcArray[calcIndex + 1]);
        resultInput(calcIndex, calcResult);
        console.log(calcArray);
      }
      result.textContent = calcArray;
    }

    /* 연산 2 */
    function calc2() {
      let calcIndex = calcArray.findIndex((e) => e === "+" || e === "-");
      if (calcArray[calcIndex] === "+") {
        let calcResult = parseFloat(calcArray[calcIndex - 1]) + parseFloat(calcArray[calcIndex + 1]);
        resultInput(calcIndex, calcResult);
        console.log(calcArray);
      }
      if (calcArray[calcIndex] === "-") {
        let calcResult = parseFloat(calcArray[calcIndex - 1]) - parseFloat(calcArray[calcIndex + 1]);
        resultInput(calcIndex, calcResult);
        console.log(calcArray);
      }
      result.textContent = calcArray;
    }
    for (let i = 0; i < calc1Count; i++) calc1();
    for (let j = 0; j < calc2Count; j++) calc2();
  }

  /*******************
   * 키보드 이벤트
   *******************/
  document.addEventListener('keydown', (e) => {
    if (e.keyCode === 8) backSpace();
    if (e.keyCode === 13) calculate(result);
    if (e.keyCode === 27) allClear();

  });

  document.addEventListener('keypress', (e) => {
    let Target = keyHash[e.keyCode];
    /* 키보드 입력 애니메이션 */
    keys.map(key => {
      Target === key.textContent ? key.classList.add("pressed") : key.classList.remove("pressed");
      setTimeout(() => {
        key.classList.remove("pressed");
      }, 1000)
    });
    /* 키보드 입력 */
    if (typeof Target === "undefined") {
      return true;
    } else if (!isNaN(Target)) {
      oFlag = false;
      result.textContent += Target;
    } else if (isNaN(Target)) {
      if (oFlag) backSpace();
      result.textContent += Target;
      oFlag = true;
    }
  });

  /*******************
   * 클릭 이벤트
   *******************/
  clear.onclick = e => allClear();
  back.onclick = e => backSpace();
  enter.onclick = e => calculate(result);
  /* 마우스 값 입력 */
  keys.map(key => {
    key.addEventListener('click', setNum);
  });

  function setNum() {
    if (isNaN(this.textContent)) {
      if (oFlag) backSpace();
      result.textContent += this.textContent;
      oFlag = true;
    } else {
      oFlag = false;
      result.textContent += this.textContent;
    }
  }

});