import InputView from './InputView.js';
import OutputView from './OutputView.js';
import menuPrices from './MenuPrices.js';
import * as BenefitsCalculator from './BenefitsCalculator.js';

class App {
  constructor() {
    this.inputView = InputView;
    this.outputView = OutputView;
  }

  async run() {
    try {
      const date = await this.inputView.readDate();
      const order = await this.inputView.readOrder();

      const processedOrder = this.processOrder(date, order);
      const benefits = this.calculateBenefits(date, order, processedOrder.totalAmount);

      this.outputView.printIntroduction(date, order);
      this.outputView.printMenu(processedOrder.menu);
      this.outputView.printTotalOrderAmount(processedOrder.totalAmount);
      this.outputView.printGiftMenu(benefits.giftMenu);
      this.outputView.printBenefits(benefits.benefitDetails);
      this.outputView.printTotalBenefitsAmount(benefits.totalBenefitsAmount);
      this.outputView.printFinalAmount(benefits.finalAmount);
      this.outputView.printEventBadge(benefits.totalBenefitsAmount)
    } catch (error) {
      console.error(error);
    }
  }

  calculateTotalAmount(order) {
    return order.reduce((total, item) => {
      const price = menuPrices[item.name];
      return price ? total + price * item.quantity : total;
    }, 0);
  };

  processOrder(date, order) {
    const totalAmount = this.calculateTotalAmount(order);
    return { menu: order, totalAmount };
  }  

  calculateBenefits(date, order, totalAmount) {
    let totalDiscount = 0;
    let giftMenu = [];
    let benefitDetails = [];
    let weekdayDiscount = 0;
    let weekendDiscount = 0;

    if (date >= 1 && date <= 25) {
      const discount = 1000 + (date - 1) * 100;
      totalDiscount += discount;
      benefitDetails.push({ description: "크리스마스 디데이 할인", amount: discount});
    }

    const dayOfWeek = new Date(2023, 11, date).getDay();
    if (dayOfWeek >=0 && dayOfWeek <= 4) {
      weekdayDiscount = order.filter(item => ["초코케이크", "아이스크림"].includes(item.name))
      .reduce((sum, item) => sum + 2023 * item.quantity, 0);
    } else if (dayOfWeek === 5 || dayOfWeek === 6) {
      weekendDiscount = order.filter(item => ["티본스테이크", "바비큐립", "해산물파스타", "크리스마스파스타"].includes(item.name))
      .reduce((sum, item) => sum + 2023 * item.quantity, 0);
    }

    totalDiscount += weekdayDiscount + weekendDiscount;

    if (weekdayDiscount > 0) {
      benefitDetails.push({ description: "평일 할인", amount: weekdayDiscount});
    } 
      if (weekendDiscount > 0) {
        benefitDetails.push({ description: "주말 할인", amount: weekendDiscount});
      }

    const specialDiscountDays = [3, 10, 17, 24, 25, 31];
    if (specialDiscountDays.includes(date)) {
      totalDiscount += 1000;
      benefitDetails.push({ description: "특별 할인", amount: 1000});
    }

    let champagnePrice = 0;
    if (totalAmount >= 120000) {
      giftMenu.push({ name: "샴페인", quantity: 1 });
      champagnePrice = 25000;
      benefitDetails.push({ description: "증정 이벤트", amount: 25000 });
      totalDiscount += champagnePrice;
    }
  

    let finalAmount = totalAmount - totalDiscount + champagnePrice;

    return {
      giftMenu: giftMenu,
      benefitDetails: benefitDetails,
      totalBenefitsAmount: totalDiscount,
      finalAmount: finalAmount
    };
  }
}


export default App;