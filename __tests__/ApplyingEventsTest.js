import App from "../src/App";

describe ('App', () => {
    describe ('applyingEventTest', () => {
        it ('총주문 금액 10,000원 미만은 이벤트 적용되지 않음', () => {
            const app = new App();

            const totalAmount = 9000;

            const benefits = app.calculateBenefits(totalAmount);
            expect(benefits.totalBenefitsAmount).toBe(0)
        });

        it ('총주문 금액 10,000 이상일 경우 이벤트 적용', () => {
            const app = new App();

            const testDate = 5;
            const order = [{ name: "티본스테이크", quantity: 1 }];

            const totalAmount = app.calculateTotalAmount(order);
            const benefits = app.calculateBenefits(testDate, order, totalAmount);

            expect(benefits.totalBenefitsAmount).toBeGreaterThan(0);
        });
    });
});