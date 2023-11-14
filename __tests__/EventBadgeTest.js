import App from "../src/App";
import { MissionUtils } from "@woowacourse/mission-utils";

jest.mock("@woowacourse/mission-utils", () => ({
    MissionUtils: {
        Console: {
            print: jest.fn()
        }
    }
}));

describe ('App', () => {
    describe ('printEventBadge', () => {
        it ('총혜택 금액이 5천원 이상일 때 이벤트 배지는 별', () => {
            const app = new App();
            const totalBenefitAmount = 5500;

            app.outputView.printEventBadge(totalBenefitAmount);

            expect(MissionUtils.Console.print).toHaveBeenCalledWith("\n<12월 이벤트 배지>\n");
            expect(MissionUtils.Console.print).toHaveBeenCalledWith("별");
        });

        it ('총혜택 금액이 1만원 이상일 때 이벤트 배지는 트리', () => {
            const app = new App();
            const totalBenefitAmount = 11000;

            app.outputView.printEventBadge(totalBenefitAmount);

            expect(MissionUtils.Console.print).toHaveBeenCalledWith("\n<12월 이벤트 배지>\n");
            expect(MissionUtils.Console.print).toHaveBeenCalledWith("트리");
        });

        it ('총혜택 금액이 2만원 이상일 때 이벤트 배지는 산타', () => {
            const app = new App();
            const totalBenefitAmount = 22000;

            app.outputView.printEventBadge(totalBenefitAmount);

            expect(MissionUtils.Console.print).toHaveBeenCalledWith("\n<12월 이벤트 배지>\n");
            expect(MissionUtils.Console.print).toHaveBeenCalledWith("산타");
        });

        it ('총혜택 금액이 5천원 미만일 때 이벤트 배지는 없음', () => {
            const app = new App();
            const totalBenefitAmount = 4500;

            app.outputView.printEventBadge(totalBenefitAmount);

            expect(MissionUtils.Console.print).toHaveBeenCalledWith("\n<12월 이벤트 배지>\n");
            expect(MissionUtils.Console.print).toHaveBeenCalledWith("없음");
        });
    });
});