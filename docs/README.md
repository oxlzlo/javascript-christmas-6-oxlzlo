# 미션 - 크리스마스 프로모션

## 🔍 기능 구현 목록
  ### 1. 할인률 적용하기
    - [] 크리스마스 디데이 할인
      - 이벤트 기간 : 2023.12.1 ~ 2023.12.25
      - 1,000원으로 시작하여 크리스마스가 다가올수록 할인 금액 100원씩 증가
      - 총주문 금액에서 해당 금액만큼 할인
    - [] 2023.12.25 이후엔 크리스마스 디데이 할인 적용 x
    - [] 평일 할인(일~목) : 디저트 메뉴를 1개당 2,023원 할인
    - [] 주말 할인(금, 토) : 메인 메뉴를 1개당 2,023원 할인
    - [] 특별 할인 : 이벤트 달력에 별이 있으면 총주문 금액에서 1,000원 할인
    - [] 할인 전 총주문 금액이 12만원 이상일 때, 샴페인 1개 증정
    - [] '크리스마스 디데이 할인' 제외 다른 이벤트는 2023.12.2 ~ 2023.12.31 동안 적용
  
  ### 2. 이벤트 배지 부여
    - [] 5천원 이상 : 별
    - [] 1만원 이상 : 트리
    - [] 2만원 이상 : 산타

  ### 3. 고객 안내 이벤트 주의 사항
    - [] 총주문 금액 10,000원 이상부터 이벤트 적용
    - [] 음료만 주문 시, 주문 불가능
    - [] 메뉴는 한 번에 최대 20개까지만 주문 가능 (메인, 디저트, 음료 포함)

  ### 4. 개발 요청 사항
    - [] 12월 중 식당 예상 방문 날짜 입력 받기 (숫자만 가능)
      - [] 1 이상 31 이하의 숫자가 아닌 경우, 에러 메시지 출력
    - [] 주문하실 메뉴와 개수 입력 받기 (eg. 메뉴-갯수)
      - [] 메뉴판에 없는 금액일 경우 에러 메시지 출력
      - [] 메뉴위 개수는 1 이상의 숫자만 입력. 이외의 값은 에러 메시지 출력
      - [] 메뉴 형식이 예시와 다른 경우 에러 메시지 출력
      - [] 중복 메뉴를 입력한 경우 에러 메시지 출력
    - [] 총혜택 금액 = 할인 금액의 합계 + 증정 메뉴의 가격
    - [] 할인 후 예상 결제 금액 = 할인 전 총주문 금액 - 할인 금액
    - [] 증정 메뉴 출력
      - [] 증정 이벤트에 해당하지 않는 경우, 증정 메뉴 "없음" 출력
    - [] 혜택 내역 출력
      - [] 고객에게 적용된 이벤트 내역만 출력
      - [] 적용된 이벤트가 하나도 없다면 혜택 내역 "없음" 출력
      - [] 혜택 내역 여러 개일 경우, 출력 순서는 자유롭게 출력
    - [] 이벤트 배지 출력
      - [] 이벤트 배지가 부여되지 않는 경우, "없음" 출력
  
  ### ApplicationTest
    - [] 기능 테스트
      - [] 모든 타이틀 출력
      - [] 혜택 내역 타이틀과 없음 출력
    - [] 예외 테스트
      - [] 날짜 예외 테스트
      - [] 주문 예외 테스트

  ### 단위 테스트 구현


 <!-- #### 커밋 컨벤션
  feat (feature) : 기능 추가
  fix (bug fix) : 버그 픽스
  docs (documentation) : 문서 변경
  style (formatting, missing semi colons, …) : 스타일 (eg. 서식, 세미콜론 추가)
  refactor : 리팩터링
  test (when adding missing tests) : 테스트 추가
  chore (maintain) : 유지보수 -->