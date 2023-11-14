import { MissionUtils } from "@woowacourse/mission-utils";
import { menuPrices, isFoodItem } from "./MenuPrices";

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
    let isValid = false;

    do {
      const input = await MissionUtils.Console.readLineAsync("주문할 메뉴를 입력해 주세요 (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)");
      order = this.parseOrderInput(input);

      isValid = this.isValidOrder(order);
      if (!isValid) {
        MissionUtils.Console.print("[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.");
      }
    } while (!isValid);

    return order;
  },

  parseOrderInput(input) {
    const parsedOrder =  input.split(',').map(item => {
      const parts = item.split('-');
      if (parseInt.length !== 2) {
        return null;
      }
      const [name, quantity] = parts;
      return { name, quantity: parseInt(quantity, 10) };
    });
    return parsedOrder.some(item => item === null) ? null : parsedOrder;
  },

  isValidOrder(order) {
    return this.isTotalItemsValid(order) && this.isNoDuplicateMenu(order) && this.containsFoodItem(order) && this.areAllItemsValid(order);
  },

  isTotalItemsValid(order) {
    const totalItems = order.reduce((sum, item) => sum + item.quantity, 0);
    return totalItems <= 20;
  },

  isNoDuplicateMenu(order) {
    const menuNames = order.map(item => item.name);
    const uniqueMenuNames = new Set(menuNames);
    return uniqueMenuNames.size === menuNames.length
  },

  containsFoodItem(order) {
    return order.some(item => isFoodItem[item.name]);
  },

  areAllItemsValid(order) {
    return order.every(item =>
      item.name && !isNaN(item.quantity) && item.quantity >=1 && menuPrices.hasOwnProperty(item.name)
      );
  }
};

export default InputView;