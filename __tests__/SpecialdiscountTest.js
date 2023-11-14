import App from "../src/App";

describe ('App', () => {
    describe ('calculateSpecialDiscount', () => {
        it ('달력에 별이 있는 날은 특별 할인 1000원', () => {
            const app = new App();

            const testDates = [3, 10, 17];
            
            testDates.forEach((date) => {
                const discount = app.calculateSpecialDiscount(date);
                expect(discount.amount).toBe(1000);
            });
        });

        it ('달력에 별이 없으면 할인 적용 없음', () => {
            const app = new App();

            const testDates = [5, 9, 20, 23];

            testDates.forEach((date) => {
                const discount = app.calculateSpecialDiscount(date);
                expect(discount.amount).toBe(0);
            });
        });
    });
});