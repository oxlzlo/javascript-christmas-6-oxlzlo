import App from "../src/App";
import InputView from "../src/ui/InputView";

jest.mock('../src/ui/InputView.js', () => ({
    readOrder: jest.fn()
}));

describe ('App', () => {
    describe('isValidOrder', () => {
        it ('음료만 주문 할 경우 주문 불가능', async () => {
            const app = new App();

            const inputOrder = "제로콜라-1"
            InputView.readOrder.mockResolvedValue("[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.");

            const order = await app.inputView.readOrder(inputOrder);
            expect(order).toBe("[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.");
        });

        it ('주문 메뉴는 최대 20개까지만 가능', async () => {
            const app = new App();

            const inputOrder = "양송이수프-21"
            InputView.readOrder.mockResolvedValue("[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.");

            const order = await app.inputView.readOrder(inputOrder);
            expect(order).toBe("[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.");
        });

        it ('메뉴판에 없는 메뉴 주문 시 에러 발생', async () => {
            const app = new App();

            const inputOrder = "신호등치킨-1"
            InputView.readOrder.mockResolvedValue("[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.");

            const order = await app.inputView.readOrder(inputOrder);
            expect(order).toBe("[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.");
        });

        it ('주문 메뉴 형식이 예시와 다른 경우 에러 발생', async () => {
            const app = new App();

            const inputOrder = "바비큐립2";
            InputView.readOrder.mockResolvedValue("[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.");

            const order = await app.inputView.readOrder(inputOrder);
            expect(order).toBe("[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.");
        });

        it ('중복 메뉴를 입력한 경우 에러 발생', async () => {
            const app = new App();

            const inputOrder = ["시저샐러드-1", "시저샐러드-2"];
            InputView.readOrder.mockResolvedValue("[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.");

            const order = await app.inputView.readOrder(inputOrder);
            expect(order).toBe("[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.");
        });

        it ('주문 수량을 입력하지 않은 경우 에러 발생', async () => {
            const app = new App();

            const inputOrder = ["바비큐립-1", "제로콜라"];
            InputView.readOrder.mockResolvedValue("[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.");

            const order = await app.inputView.readOrder(inputOrder);
            expect(order).toBe("[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.");
        });
    }); 
});