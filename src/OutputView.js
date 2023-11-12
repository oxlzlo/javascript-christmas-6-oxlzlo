import { MissionUtils } from '@woowacourse/mission-utils';

const OutputView = {
  printMenu(menuItems) {
    MissionUtils.Console.print('<주문 메뉴>');
    menuItems.forEach((item) => {
      MissionUtils.Console.print(`${item.name}-${item.quantity}`);
    });
  },

  printTotalAmount(amount) {
    MissionUtils.Console.print(`<할인 전 총주문 금액>\n${amount}원`);
  },

  printGifts(totalAmount) {
    const gift = totalAmount >= 120000 ? '샴페인 1개' : '없음';
    MissionUtils.Console.print(`<증정 메뉴?\n${gift}`);
  },

  printBenefits(benefits) {
    const display = benefits.length > 0 ? benefits.join(', ') : '없음';
    MissionUtils.Console.print(`<혜택 내역>\n${display}`);
  },

  printTotalDiscount(discountAmount) {
    MissionUtils.Console.print(`<총헤택 금액>\n-${discountAmount}`);
  },

  printFinalAmount(finalAmount) {
    MissionUtils.Console.print(`<할인 후 예상 결제 금액>\n${finalAmount}`);
  },

  printBadge(badge) {
    const display = badge || '없음';
    MissionUtils.Console.print(`<12월 이벤트 배지>\n${display}`);
  },
};

export default OutputView;
