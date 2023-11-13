const calculateChristMasDiscount = (date) => {
    return date >= 1 && date <= 25 ? 1000 + (date -1) * 100 : 0;
};

const calculateWeekdayDiscount = (date, order) => {
    const dayOfWeek = new Date(2023, 11, date).getDay();
    return dayOfWeek >= 0 && dayOfWeek <= 4
        ? order.filter (item =>["초코케이크", "아이스크림"].includes(item.name))
               .reduce((sum, item) => sum + 2023 * item.quantity, 0)
        : 0;
};

const calculateWeekendDiscount = (date, order) => {
    const dayOfWeek = new Date(2023, 11, date).getDay();
    return dayOfWeek === 5 || dayOfWeek === 6
        ? order.filter(item => ["티본스테이크", "바비큐립", "해산물파스타", "크리스마스파스타"].includes(item.name))
              .reduce((sum, item) => sum + 2023 * item.quantity, 0)
        : 0;
};

const calculateSpecialDiscount = (date) => {
    const specialDiscountDays = [3, 10, 17, 24, 25, 31];
    return specialDiscountDays.includes(date) ? 1000 : 0;
};

export {
    calculateChristMasDiscount,
    calculateWeekdayDiscount,
    calculateWeekendDiscount,
    calculateSpecialDiscount
}