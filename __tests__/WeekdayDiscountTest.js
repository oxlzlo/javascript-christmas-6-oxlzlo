import App from "../src/App";

describe ('App', () => {
    describe('calculateWeekdayDiscount', () => {
        it ('평일 할인은 디저트가 1개일 경우 2023원', () => {
            const app = new App();

            const testDates = [5, 13, 27];
            const expectedDiscount = 2023;
            const order = [{ name: "초코케이크", quantity: 1 }];

            testDates.forEach((date) => {
                const discount = app.calculateWeekdayDiscount(date, order);
                expect(discount.amount).toBe(expectedDiscount);
            });
        });

        it('평일 할인은 디저트가 2개일 경우 4046원', () => {
            const app = new App();

            const testDates = [6, 14, 19];
            const expectedDiscount = 4046;
            const order = [{ name: "초코케이크", quantity: 2 }];

            testDates.forEach((date) => {
                const discount = app.calculateWeekdayDiscount(date, order);
                expect(discount.amount).toBe(expectedDiscount);
            });
        });

        it('평일에 메인 메뉴는 할인 적용 없음', () => {
            const app = new App();

            const testDates = [8, 16, 23];
            const expectedDiscount = 0;
            const order = [{ name: "티본스테이크", quantity: 1 }];

            testDates.forEach((date) => {
                const discount = app.calculateWeekdayDiscount(date, order);
                expect(discount.amount).toBe(expectedDiscount);
            });
        });
    });
});