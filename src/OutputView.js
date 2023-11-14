import { MissionUtils } from "@woowacourse/mission-utils";

function formatAmount(amount) {
  return new Intl.NumberFormat('ko-KR').format(amount);
}

const OutputView = {
  printIntroduction(date, order) {
    MissionUtils.Console.print(`안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.\n12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)\n${date}\n주문하실 메뉴를 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)\n`);
    const orderString = order.map(item => `${item.name}-${item.quantity}`).join(',');
    MissionUtils.Console.print(orderString);
    MissionUtils.Console.print(`\n12월 ${date}일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!\n`)

  },


  printMenu(menu) {
    MissionUtils.Console.print("\n<주문 메뉴>\n");
    menu.forEach(item => {
      MissionUtils.Console.print(`${item.name} ${item.quantity}개`);
    });
  },

  printTotalOrderAmount(totalAmount) {
    MissionUtils.Console.print("\n<할인 전 총주문 금액>\n");
    MissionUtils.Console.print(`${formatAmount(totalAmount)}원`);
  },

  printGiftMenu(giftMenu) {
    MissionUtils.Console.print("\n<증정 메뉴>\n");
    if (giftMenu.length === 0) {
      MissionUtils.Console.print("없음");
      return;
    } 
      giftMenu.forEach(item => {
      MissionUtils.Console.print(`${item.name} ${item.quantity}개`);
    });
  },

  printBenefits(benefitsDetails) {
    MissionUtils.Console.print("<혜택 내역>");
    if (benefitsDetails.length === 0) {
      MissionUtils.Console.print("없음");
      return;
    } 
      benefitsDetails.forEach(benefit => {
        MissionUtils.Console.print(`${benefit.description}: -${formatAmount(benefit.amount)}원`);
    });
  },

  printTotalBenefitsAmount(totalBenefitsAmount) {
    MissionUtils.Console.print("\n<총혜택 금액>\n");
    const formattedAmount = totalBenefitsAmount === 0 ? "0원" : `-${formatAmount(totalBenefitsAmount)}원`;
    MissionUtils.Console.print(formattedAmount)
    
  },

  printFinalAmount(finalAmount) {
    MissionUtils.Console.print("\n<할인 후 예상 결제 금액>\n");
    MissionUtils.Console.print(`${formatAmount(finalAmount)}원`);
  },

  printEventBadge(totalBenefitAmount) {
    MissionUtils.Console.print("\n<12월 이벤트 배지>\n");
    let badgeName = "없음";
    
    if (totalBenefitAmount >= 20000) {
      badgeName = "산타";
    } else if (totalBenefitAmount >= 10000) {
      badgeName = "트리";
    } else if (totalBenefitAmount >= 5000) {
      badgeName = "별";
    }

    MissionUtils.Console.print(badgeName);
  }

};

export default OutputView;