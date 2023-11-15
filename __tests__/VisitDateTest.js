import App from "../src/App";
import InputView from "../src/ui/InputView";

jest.mock('../src/ui/InputView.js', () => ({
    readDate: jest.fn()
}));

describe ('App', () => {
    describe ('isValidVisitDate', () => {
        it ('방문 날짜는 숫자만 입력 가능하다', async () =>{
            const app = new App();

            const inputDate = "4일";
            InputView.readDate.mockResolvedValue("[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.");

            const date = await app.inputView.readDate(inputDate);          
            expect(date).toBe("[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.");
        });

        it ('방문 날짜는 1 이상, 31 이하의 숫자만 입력 가능하다', async () => {
            const app = new App();

            const inputDate = 32;
            InputView.readDate.mockResolvedValue("[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.");

            const date = await app.inputView.readDate(inputDate);
            expect(date).toBe("[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.");
        });
    });
});