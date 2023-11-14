import App from "../src/App";

describe ('App', () => {
    describe('isValidOrder', () => {
        it ('음료만 주문 할 경우 주문 불가능', () => {
            const app = new App();

            const order = [{ name: "제로콜라", quantity: 1 }];
            const isValid = app.inputView.isValidOrder(order);

            expect(isValid).toBe(false);
        });

        it ('주문 메뉴는 최대 20개까지만 가능', () => {
            const app = new App();

            const order = [{ name: "양송이수프", quantity: 21 }];
            const isValid = app.inputView.isValidOrder(order);

            expect(isValid).toBe(false);
        });
    }); 
});