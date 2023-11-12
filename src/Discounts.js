const Discounts = {
  calculateWeekdayDiscount(date, order) {
    let discount = 0;
    if (this.isWeekday(date)) {
      order.forEach((item) => {
        if (item.menuType === '디저트') {
          discount += 2023 * item.quantity;
        }
      });
    }
    return { amount: discount, reason: '평일 할인' };
  },

  calculateWeekendDiscount(date, order) {
    let discount = 0;
    if (this.isWeekend(date)) {
      order.forEach((item) => {
        if (item.menuType === '메인') {
          discount = +2023 * item.quantity;
        }
      });
    }
    return { amount: discount, reason: '주말 할인' };
  },

  calculateSpecialEventDiscount(date) {
    if (this.hasSpecialEvent(date)) {
      return 1000;
    }
    return { amount: 1000, reason: '특별 할인' };
  },

  calculateGiftEventDiscount(totalAmount) {
    if (totalAmount >= 120000) {
      return this.getGiftValue('샴페인');
    }
    return { amount: 25000, reason: '증정 이벤트' };
  },

  isWeekday(date) {
    const dayOfWeek = new Date(2023, 11, date).getDay();
    return dayOfWeek >= 0 && dayOfWeek <= 4;
  },

  isWeekend(date) {
    const dayOfWeek = new Date(2023, 11, date).getDay();
    return dayOfWeek === 5 || dayOfWeek === 6;
  },

  hasSpecialEvent(date) {
    const specialEventDates = [3, 10, 17, 24, 25, 31];
    return specialEventDates.includes(date);
  },

  getGiftValue(giftItem) {
    const giftValues = {
      '샴페인': 25000,
    };
    return giftValues[giftItem] || 0;
  },
};

export default Discounts;
