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

        it('12월 25일 이후에 크리스마스 디데이 할인이 적용되지 않는다', () => {
            const app = new App();

            const postChristmasDates = [26, 30, 31];
            postChristmasDates.forEach(date => {
                const discount = app.calculateChristMasDiscount(date);
                expect(discount.amount).toBe(0);
            });
        });
    });
});