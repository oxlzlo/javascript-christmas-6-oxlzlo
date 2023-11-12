import { MissionUtils } from '@woowacourse/mission-utils';
import { ErrorMessages } from './Errors';

const InputView = {
  async readDate() {
    return this.getDateInput();
  },

  async getDateInput() {
    const input = await MissionUtils.Console.readLineAsync(
      '12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!',
    );
    const parsedDate = parseInt(input, 10);
    if (Number.isNaN(parsedDate) || parsedDate < 1 || parsedDate > 31) {
      MissionUtils.Console.print(ErrorMessages.INVALID_DATE_MESSAGE);
      return this.getDateInput();
    }
    return parsedDate;
  },

  async readOrder() {
    return this.getOrderInput();
  },

  async getOrderInput() {
    const input = await MissionUtils.Console.readLineAsync(
      '주문하실 메뉴를 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)',
    );
    if (/^([a-zA-Z가-힣]+-\d+,)*([a-zA-Z가-힣]+-\d+)$/.test(input)) {
      MissionUtils.Console.print(ErrorMessages.INVALID_ORDER_FORMAT);
      return this.getOrderInput();
    }
    return input;
  },
};

export default InputView;
