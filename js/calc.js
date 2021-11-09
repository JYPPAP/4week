const keyHash = {
  8: "",
  48: "0",
  49: "1",
  50: "2",
  51: "3",
  52: "4",
  53: "5",
  54: "6",
  55: "7",
  56: "8",
  57: "9",
  // ∇(Num Lock)
  96: "0",
  97: "1",
  98: "2",
  99: "3",
  100: "4",
  101: "5",
  102: "6",
  103: "7",
  104: "8",
  105: "9",
  106: "*",
  107: "+",
  109: "-",
  110: ".",
  111: "/",
  // ∆(Num Lock)
  187: "+",
  189: "-",
  190: ".",
  191: "/"
};

document.addEventListener("DOMContentLoaded", () => {
  /* 출력 변수 */
  const sell_price = document.getElementById("sell_price");
  const fee_price = document.getElementById("fee_price");
  const mile_price = document.getElementById("mile_price");
  const result = document.getElementById("result");
  
  /* 입력 변수 */
  let operatorFlag = false;
  const clear = document.getElementById("AC");
  const back = document.getElementById("back");
  const enter = document.getElementById("enter");
  const keys = Array.from(document.getElementsByClassName("key"));

 /* 기본 값 초기화 */
  // sell_price.textContent = "";
  // fee_price.textContent = "";
  // mile_price.textContent = "";
  // result.textContent = "";

  /* AC 버튼 클릭시 */
  clear.onclick = e => {
    sell_price.textContent = "";
    fee_price.textContent = "";
    mile_price.textContent = "";
    result.textContent = "";
  };
  /* backspace가 입력되었을 때 */
  const backSpace = () => {
    result.textContent = result.textContent.slice(0, -1);
  }
  

  /* 키보드 입력. */
  document.addEventListener('keydown', (e) =>{
    let target = keyHash[e.keyCode];
    if(target === "") { backSpace();}
    /* Shift + 8 로 *를 입력하는 경우에 대해서 추가하기. */
    if(target) { result.textContent += target;}
    console.log(target);
  });

  /* 마우스 입력 */
  keys.map(key => { key.addEventListener('click', setNum);
  });
  function setNum() {
    result.textContent += this.textContent;
  }

  /* backspace 클릭 */
  back.onclick = e => { backSpace();}
  /**************
   * 출력 및 계산
  **************/
});