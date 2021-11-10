const numHash = {
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
const operHash = {
  42: "*",
  43: "+",
  45: "-",
  46: ".",
  47: "/"
}

document.addEventListener("DOMContentLoaded", () => {
  /* 출력 변수 */
  const sell_price = document.getElementById("sell_price");
  const fee_price = document.getElementById("fee_price");
  const mile_price = document.getElementById("mile_price");
  const result = document.getElementById("result");

  /* 입력 변수 */
  let operFlag = true;
  const clear = document.getElementById("AC");
  const back = document.getElementById("back");
  const enter = document.getElementById("enter");
  const keys = Array.from(document.getElementsByClassName("key"));

  /* 초기화 AC */
  const allClear = () => {
    sell_price.textContent = "";
    fee_price.textContent = "";
    mile_price.textContent = "";
    result.textContent = "";
  }
  allClear();

  /* backspace 동작 */
  const backSpace = () => {
    result.textContent = result.textContent.slice(0, -1);
  }

  /* 계산 */
  function calculate(result) {
    let numResult = (new Function(`return + ${result.textContent}`))();

    sell_price.textContent = numResult;
    fee_price.textContent = numResult * 0.05;
    mile_price.textContent = numResult * 0.95;
  }

  /*******************
   * 키보드 이벤트
   *******************/
  document.addEventListener('keydown', (e) => {
    if (e.keyCode === 8) { backSpace();}
    if (e.keyCode === 13) { calculate(result);}
    if (e.keyCode === 27) { allClear();}
  });
  document.addEventListener('keypress', (e) => {
    /* 키보드 숫자 입력. */
    let numTarget = numHash[e.keyCode];
    if (numTarget) {
      operFlag = false;
      result.textContent += numTarget;
    }
    /* 키보드 연산자 입력 */
    let operTarget = operHash[e.keyCode];
    if (operTarget) {
      if (operFlag) { backSpace();}
      result.textContent += operTarget;
      operFlag = true;
    }
    return operFlag, result;
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
    /* 여기에 연산자 관련 내용 추가. */

    result.textContent += this.textContent;
  }

});