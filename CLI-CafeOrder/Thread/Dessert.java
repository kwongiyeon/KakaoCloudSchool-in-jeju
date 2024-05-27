package OrderSystem.Thread;

import java.util.Scanner;

public class Dessert implements Runnable {
    private double dessertTotal;
    private Scanner scanner;
    private boolean addDessert;

    public Dessert(Scanner scanner, boolean addDessert) {
        this.scanner = scanner;
        this.addDessert = addDessert;
    }

    public double getDessertTotal() {
        return dessertTotal;
    }

    @Override
    public void run() {
        OrderSystem.Dessert[] desserts = {
                new OrderSystem.Dessert("딸기 케이크", 6000),
                new OrderSystem.Dessert("초코 케이크", 6000),
                new OrderSystem.Dessert("당근 케이크", 6000),
                new OrderSystem.Dessert("초코 쿠키", 2000),
                new OrderSystem.Dessert("라즈베리 쿠키", 2000),
                new OrderSystem.Dessert("휘낭시에", 2500),
                new OrderSystem.Dessert("소금빵", 3000),
                new OrderSystem.Dessert("에그타르트", 3500),
                new OrderSystem.Dessert("아이스크림 크로플", 4000)
        };

        if (addDessert) {
            synchronized (scanner) {
                for (int j = 0; j < desserts.length; j++) {
                    System.out.println((j + 1) + ". " + desserts[j].name);
                }
                System.out.print("디저트를 고르시고 말씀해주세요. (번호): ");
                int dessertIndex = scanner.nextInt() - 1;
                System.out.print("몇 개 드릴까요? ");
                int dessertQuantity = scanner.nextInt();
                dessertTotal = desserts[dessertIndex].getPrice() * dessertQuantity;
                System.out.println("디저트를 어떻게 준비해 드릴까요?");
                System.out.println("1. 잘라서 주세요.");
                System.out.println("2. 그대로 주세요.");
                System.out.print("선택: ");
                int servingOption = scanner.nextInt();
                dessertTotal = desserts[dessertIndex].getPrice() * dessertQuantity;   //디저트 총 개수 x 금액
                boolean isSliced = servingOption == 1;
                desserts[dessertIndex].setSliced(isSliced);
                System.out.println("디저트" + dessertQuantity + "개의 " + desserts[dessertIndex].name +
                        " (" + (isSliced ? "잘라서 제공" : "그대로 제공") + ") 주문이 완료되었습니다.");
                System.out.println("--------------------------------------------");
                System.out.println("주문하신 디저트 만드는 중입니다...");
            }

            try {
                Thread.sleep(3000);
                System.out.println("주문하신 디저트 나왔습니다.");
            } catch (InterruptedException e) {
                e.printStackTrace();
                System.out.println("죄송합니다. 디저트 다시 만들어 드리겠습니다.");
            }
        }
    }
}