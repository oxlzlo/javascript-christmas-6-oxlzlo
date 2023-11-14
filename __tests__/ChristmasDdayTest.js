import App from "../src/App";

describe ('App', () => {
    describe('calculateChristmasDiscount', () => {
        it('크리스마스 디데이 할인이 100원 단위로 증가해야한다', () => {
            const app = new App();

            const testDates = [3, 17, 22];
            const expectedDiscounts = [1200, 2600, 3100];

            testDates.forEach((date, index) => {
                const discount = app.calculateChristMasDiscount(date);
                expect(discount.amount).toBe(expectedDiscounts[index]);
            });
        });
    });
});