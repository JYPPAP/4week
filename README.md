## 21.11.08 -2
1. html 구조 변경 및 기본적인 HTML 완성
 - 수수료와 계산기를 분리.
2. 기본적인 CSS 스타일 완성
 - 전체적인 위치잡기 완료
 - 기본적인 버튼 완료
 - 눌렀을 때와 호버시 적용할 클래스 생성 완료.
3. README.md 파일 생성
4. TEST용 html, css, js 파일 생성
5. calc.css 파일 무시 (gitignore)

해야 할 일
1. 레이아웃용 크기지정 부분과 스타일 지정용 세부 구간이 섞이지 않았는지 확인
2. JS로 키보드 눌렀을 때 클래스가 적용될 수 있도록 만들기 (독립적)
---------제작 순서------------
0. 초기화가 필요한 값들 전부 초기화하기
1. 버튼을 클릭 = 값을 읽어오기
  1-1 숫자일 때는 정상적으로 입력
  1-2 연산자일 때는 입력 안됌 
  - flag 이용하기 기본값 false 숫자 입력시 true
2. 읽어온 값을 #result에 출력하고 연산용 배열이나 어딘가에 저장.
3. 연산자가 한 번 입력되면 flag(위에서 사용한)를 false로 바꾸기
4. 사용자가 엔터를 누르면 결과값 출력하기
 - 마지막으로 입력된 값이 연산자일 경우 (flag가 false 일 경우) 동작하지 않기.
 - 마지막으로 입력된 값이 숫자일 경우 (flag가 true일 경우) 실행
5. AC 가 입력될경우 배열?과 #result의 값 전부 초기화하기
6. back 가 입력될 경우 배열과 #result의 값 중에서 뒤에 있는 값 지우기.
7. 
## 21.11.08 -1

* html, css, js 파일 생성