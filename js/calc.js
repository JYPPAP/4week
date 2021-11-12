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
  const allClear = () => result.textContent = "";
  // allClear();

  /* backspace 동작 */
  const backSpace = () => result.textContent = result.textContent.slice(0, -1);

  /* 계산 */
  function calculate(result) {
    // let numResult = (new Function(`return + ${result.textContent}`))();
    // result.textContent = numResult;

    let calcArray = result.textContent.match(/[\*\/\+\-]|(\d+\.\d+)|\d+/g);
    
    console.log(calcArray);
    calcArray.map(value => {
      // 가장 앞에 있는게 연산자일 경우 그 앞에 0 추가하기?

      /* 곱하기와 나누기를 작업. 값이 * 또는 /일 때 인덱스값이 낮은 것부터 작업
      계산의 결과값이 나오면 그 값을 calcIndex-1. calcIndex. calcIndex+1을 제거하고 calcIndex-1의 위치에 저장하기. 이런 방법으로 앞에서부터 뒤로가면서 계산할 수 있도록 하기.
      그런데 이게 .map 으로 해야하는 일 인지 아니면 하지 않고 해결할 수 있는 일 인지 체크 필요.
       */
      if (value === "*" || value === "/") {
        
      }
    });
  }

  /*******************
   * 키보드 이벤트
   *******************/
  document.addEventListener('keydown', (e) => {
    if (e.keyCode === 8)  backSpace();
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
      },1000)
    });
    /* 키보드 입력 */
    if (typeof Target === "undefined") {
      return true;
    } else if (!isNaN(Target)) {
      oFlag = false;
      result.textContent += Target;
    } else if(isNaN(Target)) {
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
    if(isNaN(this.textContent)) {
      if(oFlag) backSpace();
      result.textContent += this.textContent;
      oFlag = true;
    } else {
      oFlag = false;
      result.textContent += this.textContent;
    }
  }

});