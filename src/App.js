import { MissionUtils } from '@woowacourse/mission-utils';
import InputView from './InputView';
import OutputView from './OutputView';
import menuPrices from './MenuPrices';
import Discounts from './Discounts';

class App {
  async run() {
    try {
      const date = await InputView.readDate();
      const orderString = await InputView.readOrder();

      const orderDetails = this.processOrder(date, orderString);
      this.displayResults(orderDetails);
    } catch (error) {
      MissionUtils.Console.print(error);
    }
  }

  processOrder(date, orderString) {
    const order = this.parseOrder(orderString);
    const totalAmount = this.calculateTotalAmount(order);
    const discounts = this.calculateDiscounts(date, order, totalAmount);
    const finalAmount = totalAmount - discounts.totalDiscount;
    const badge = this.calculateBadge(discounts.totalAmount);

    return { date, order, totalAmount, discounts, finalAmount, badge };
  }

  static parseOrder(orderString) {
    return orderString.split(',').map((item) => {
      const [menu, quantity] = item.split('-');
      return { menu, quantity: parseInt(quantity, 10) };
    });
  }

  static processDiscountCalculations(discountFunctions, date, order, totalAmount) {
    let totalDiscount = 0;
    const discounts = [];

    discountFunctions.forEach(func => {
      const { amount, reason } = func(date, order, totalAmount);
      if (amount > 0) {
        totalDiscount += amount;
        discounts.push(`${reason}: -${amount}원`);
      }
    });

    return { totalDiscount, discounts };
  }

  calculateDiscounts(date, order, totalAmount) {
    const discountFunctions = [
      Discounts.calculateWeekdayDiscount,
      Discounts.calculateWeekendDiscount,
      Discounts.calculateSpecialEventDiscount,
      Discounts.calculateGiftEventDiscount,
    ];

    return this.processDiscountCalculations(discountFunctions, date, order, totalAmount);
  }


  
  
}

export default App;
