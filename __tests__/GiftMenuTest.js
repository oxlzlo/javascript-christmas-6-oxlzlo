import App from "../src/App";

describe ('App', () => {
    describe ('calculateGiftMenu', () => {
        it ('할인 전 총주문 금액이 120000원 이상일 경우 샴페인 증정', () => {
            const app = new App();

            const totalAmount = 121000;
            const giftMenu = app.calculateGiftMenu(totalAmount);
            
            expect(giftMenu).toEqual([{ name: "샴페인", quantity: 1 }]);
        });

        it ('할인 전 총주문 금액이 120000원이 미만일 경우 샴페인 증정 없음', () => {
            const app = new App();

            const totalAmount = 100000;
            const giftMenu = app.calculateGiftMenu(totalAmount);

            expect(giftMenu).toEqual([]);
        });
    });
});