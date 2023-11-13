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

    const christmasDiscount = BenefitsCalculator.calculateChristMasDiscount(date);
    const weekdayDiscount = BenefitsCalculator.calculateWeekdayDiscount(date, order);
    const weekendDiscount = BenefitsCalculator.calculateWeekendDiscount(date, order);
    const specialDiscount = BenefitsCalculator.calculateSpecialDiscount(date);

    totalDiscount += christmasDiscount + weekdayDiscount + weekendDiscount + specialDiscount;

    if (christmasDiscount > 0) benefitDetails.push({ description: "크리스마스 디데이 할인", amount: christmasDiscount});
    if (weekdayDiscount > 0) benefitDetails.push({ description: "평일 할인", amount: weekdayDiscount});
    if (weekendDiscount > 0) benefitDetails.push({ description: "주말 할인", amount: weekendDiscount});
    if (specialDiscount > 0) benefitDetails.push({ description: "특별 할인", amount: specialDiscount});

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