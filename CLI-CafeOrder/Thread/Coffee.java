package OrderSystem.Thread;
import java.util.Scanner;

public class Coffee implements Runnable {
    private double coffeeTotal;
    private Scanner scanner;

    public Coffee(Scanner scanner) {
        this.scanner = scanner;
    }

    public double getCoffeeTotal() {
        return coffeeTotal;
    }

    @Override
    public void run() {
        OrderSystem.Coffee[] coffees = {
                new OrderSystem.Coffee("아메리카노", 2500),
                new OrderSystem.Coffee("카페 라떼", 3000),
                new OrderSystem.Coffee("바닐라 라떼", 3000),
                new OrderSystem.Coffee("카페 모카", 3000),
                new OrderSystem.Coffee("헤이즐넛 라떼", 3500),
                new OrderSystem.Coffee("카라멜 마끼아또", 3500),
                new OrderSystem.Coffee("비엔나", 3500),
                new OrderSystem.Coffee("밀크티", 3500),
                new OrderSystem.Coffee("초코 라떼", 3500),
                new OrderSystem.Coffee("플랫화이트", 4000),
                new OrderSystem.Coffee("아인슈페너", 4000)
        };

        synchronized (scanner) {
            for (int i = 0; i < coffees.length; i++) {
                System.out.println((i + 1) + ". " + coffees[i].name);
            }
            System.out.print("커피를 고르시고 말씀해주세요. (번호): ");
            int coffeeIndex = scanner.nextInt() - 1;
            System.out.println("뜨겁게 드시겠습니까? 차갑게 드시겠습니까?");
            System.out.println("1. 뜨겁게");
            System.out.println("2. 차갑게");
            System.out.print("선택: ");
            int tempChoice = scanner.nextInt();
            boolean isHot = tempChoice == 1;
            System.out.print("수량을 입력하세요: ");
            int coffeeQuantity = scanner.nextInt();
            coffeeTotal = coffees[coffeeIndex].getPrice() * coffeeQuantity; //커피 총 개수 x 금액
            String tempString = isHot ? "뜨겁게" : "차갑게";
            System.out.println("커피" + coffeeQuantity + "개의 " + coffees[coffeeIndex].name + " (" + tempString + ") 주문이 완료되었습니다.");
            System.out.println("--------------------------------------------");
            System.out.println("주문하신 커피 만드는 중입니다...");
        }

        try {
            Thread.sleep(3000);
            System.out.println("주문하신 커피 나왔습니다.");
        } catch (InterruptedException e) {
            System.out.println("죄송합니다. 커피 다시 만들어 드리겠습니다.");
        }
        System.out.println("--------------------------------------------");
    }
}