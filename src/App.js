import InputView from './InputView.js';
import OutputView from './OutputView.js';
import { menuPrices } from './MenuPrices.js';
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

      this.displayOutput(date, order, processedOrder, benefits);
    } catch (error) {
      console.error(error);
    }
  }

  displayOutput(date, order, processedOrder, benefits) {
    this.outputView.printIntroduction(date, order);
    this.outputView.printMenu(processedOrder.menu);
    this.outputView.printTotalOrderAmount(processedOrder.totalAmount);
    this.outputView.printGiftMenu(benefits.giftMenu);
    this.outputView.printBenefits(benefits.benefitDetails);
    this.outputView.printTotalBenefitsAmount(benefits.totalBenefitsAmount);
    this.outputView.printFinalAmount(benefits.finalAmount);
    this.outputView.printEventBadge(benefits.totalBenefitsAmount)
  };

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
    if (!this.isEligibleForBenefits(totalAmount)) {
      return this.noBenefits(totalAmount);
    }

    return this.applyDiscountsAndBenefits(date, order, totalAmount);
  }

  isEligibleForBenefits(totalAmount) {
    return totalAmount >= 10000;
  }

  noBenefits(totalAmount) {
    return {
      giftMenu: [],
      benefitDetails: [],
      totalBenefitsAmount: 0,
      finalAmount: totalAmount
    };
  }
  
  applyDiscountsAndBenefits(date, order, totalAmount) {
    const discounts = this.calculateAllDiscounts(date, order);
    let totalDiscount = discounts.reduce((total, discount) => total + discount.amount, 0);
    const champagneDiscount = this.calculateChampagneDiscount(totalAmount, discounts);
    totalDiscount += champagneDiscount;
    
    const finalAmount = this.calculateFinalAmount(totalAmount, totalDiscount, champagneDiscount);

    return {
      giftMenu: this.calculateGiftMenu(totalAmount),
      benefitDetails: discounts,
      totalBenefitsAmount: totalDiscount,
      finalAmount: finalAmount
    };
  }

  calculateAllDiscounts(date, order) {
    let discounts = [];

    discounts.push(this.calculateChristMasDiscount(date));
    discounts.push(this.calculateWeekdayDiscount(date, order));
    discounts.push(this.calculateWeekendDiscount(date, order));
    discounts.push(this.calculateSpecialDiscount(date));

    return discounts.filter(discount => discount.amount > 0);
  }

  calculateChristMasDiscount(date) {
    const discount = BenefitsCalculator.calculateChristMasDiscount(date);
    return { description: "크리스마스 디데이 할인", amount: discount };
  }

  calculateWeekdayDiscount(date, order) {
    const discount = BenefitsCalculator.calculateWeekdayDiscount(date, order);
    return { description: "평일 할인", amount: discount };
  }

  calculateWeekendDiscount(date, order) {
    const discount = BenefitsCalculator.calculateWeekendDiscount(date, order);
    return { description: "주말 할인", amount: discount };
  }

  calculateSpecialDiscount(date) {
    const discount = BenefitsCalculator.calculateSpecialDiscount(date);
    return { description: "특별 할인", amount: discount };
  }

  calculateGiftMenu(totalAmount) {
    let giftMenu = [];
    if (totalAmount >= 120000) {
      giftMenu.push({ name: "샴페인", quantity: 1 });
    }
    return giftMenu;
  }

  calculateChampagneDiscount(totalAmount, discounts) {
    if (totalAmount >= 120000) {
      const champagneDiscount = menuPrices["샴페인"];
      discounts.push({ description: "샴페인 증정", amount: champagneDiscount });
      return champagneDiscount
    }
    return 0;
  }

  calculateFinalAmount(totalAmount, totalDiscount, champagneDiscount) {
    if (champagneDiscount > 0) {
      return totalAmount - (totalDiscount - champagneDiscount);
    }
    return totalAmount - totalDiscount;
  }

}

export default App;