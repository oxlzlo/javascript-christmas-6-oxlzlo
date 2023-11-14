import App from "../src/App";

describe ('App', () => {
    describe ('calculateWeekendDiscount', () => {
        it ('주말 할인은 메인 메뉴가 1개일 경우 2023원', () => {
            const app = new App();
            
            const testDates = [2, 8, 9];
            const expectedDiscount = 2023;
            const order = [{ name: "티본스테이크", quantity: 1 }];

            testDates.forEach((date) => {
                const discount = app.calculateWeekendDiscount(date, order);
                expect(discount.amount).toBe(expectedDiscount);
            });
        });

        it ('주말 할인은 메인 메뉴가 3개일 경우 6069원', () => {
            const app = new App();

            const testDates = [15, 16, 22];
            const expectedDiscount = 6069;
            const order = [{ name: "티본스테이크", quantity: 3 }];

            testDates.forEach((date) => {
                const discount = app.calculateWeekendDiscount(date, order);
                expect(discount.amount).toBe(expectedDiscount);
            });
        });

        it ('주말에 디저트 메뉴는 할인 적용 없음', () => {
            const app = new App();

            const testDates = [29, 30];
            const expectedDiscount = 0;
            const order = [{ name: "초코케이크", quantity: 1 }];

            testDates.forEach((date) => {
                const discount = app.calculateWeekendDiscount(date, order);
                expect(discount.amount).toBe(expectedDiscount);
            });
        });
    });
});