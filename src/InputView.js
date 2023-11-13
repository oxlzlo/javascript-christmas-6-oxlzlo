import { MissionUtils } from "@woowacourse/mission-utils";

const InputView = {
  async readDate() {
    let date;
    do {
      const input = await MissionUtils.Console.readLineAsync("12월 중 식당 예정 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)");
      date = parseInt(input, 10);
      if (isNaN(date) || date < 1 || date > 31) {
        MissionUtils.Console.print("[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.");
      }
    } while (isNaN(date) || date < 1 || date > 31);
    return date;
  },

  async readOrder() {
    let order;
    let isValidOrder = false;
    do {
      const input = await MissionUtils.Console.readLineAsync("주문할 메뉴를 입력해 주세요 (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)");
      order = input.split(',').map(item => {
        const [name, quantity] = item.split('-');
        return { name, quantity: parseInt(quantity, 10) };
      });

      isValidOrder = order.every(item => item.name && !isNaN(item.quantity));
      if (!isValidOrder) {
        MissionUtils.Console.print("[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.");
      }
    } while (!isValidOrder);

    return order;
  }
};

export default InputView;