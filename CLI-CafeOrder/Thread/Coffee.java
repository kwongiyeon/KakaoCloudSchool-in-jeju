package OrderSystem.Thread;

import java.util.Random;
import java.util.Scanner;

public class Coffee implements Runnable {
    private String name;
    private double price;
    private double coffeeTotal;
    private Scanner scanner;
    private static Coffee[] coffees = {
            new Coffee("아메리카노", 2500),
            new Coffee("카페 라떼", 3000),
            new Coffee("바닐라 라떼", 3000),
            new Coffee("카페 모카", 3000),
            new Coffee("헤이즐넛 라떼", 3500),
            new Coffee("카라멜 마끼아또", 3500),
            new Coffee("비엔나", 3500),
            new Coffee("밀크티", 3500),
            new Coffee("초코 라떼", 3500),
            new Coffee("플랫화이트", 4000),
            new Coffee("아인슈페너", 4000),
            new Coffee("오늘의 커피", 2500)
    };
    private static Coffee todaysCoffee;

    public Coffee(String name, double price) {
        this.name = name;
        this.price = price;
    }

    public Coffee(Scanner scanner) {
        this.scanner = scanner;
    }

    public String getName() {
        return name;
    }

    public double getPrice() {
        return price;
    }

    public double getCoffeeTotal() {
        return coffeeTotal;
    }

    public static Coffee[] getCoffees() {
        return coffees;
    }

    public static Coffee getTodaysCoffee() {
        return todaysCoffee;
    }

    @Override
    public void run() {
        synchronized (scanner) {
            for (int i = 0; i < coffees.length; i++) {
                System.out.println((i + 1) + ". " + coffees[i].getName());
            }
            System.out.print("커피를 고르시고 말씀해주세요. (번호): ");
            int coffeeIndex = scanner.nextInt() - 1;
            if (coffeeIndex == 11) { // "오늘의 커피" 선택
                System.out.println("오늘의 커피를 선택하셨습니다. 잠시만 기다려주세요...");
                selectTodaysCoffee();
            } else {
                processOrder(coffeeIndex);
            }
        }
    }

    private void processOrder(int coffeeIndex) {
        System.out.println("뜨겁게 드시겠습니까? 차갑게 드시겠습니까?");
        System.out.println("1. 뜨겁게");
        System.out.println("2. 차갑게");
        System.out.print("선택: ");
        int tempChoice = scanner.nextInt();
        boolean isHot = tempChoice == 1;
        System.out.print("수량을 입력하세요: ");
        int coffeeQuantity = scanner.nextInt();
        coffeeTotal = coffees[coffeeIndex].getPrice() * coffeeQuantity; // 커피 총 개수 x 금액
        String tempString = isHot ? "뜨겁게" : "차갑게";
        System.out.println("커피" + coffeeQuantity + "개의 " + coffees[coffeeIndex].getName() + " (" + tempString + ") 주문이 완료되었습니다.");
        System.out.println("--------------------------------------------");
        System.out.println("주문하신 커피 만드는 중입니다...");

        try {
            Thread.sleep(3000);
            System.out.println("주문하신 커피 나왔습니다.");
        } catch (InterruptedException e) {
            System.out.println("죄송합니다. 커피 다시 만들어 드리겠습니다.");
        }
        System.out.println("--------------------------------------------");
    }

    // 오늘의 커피 골랐을 때 랜덤으로 커피 선택
    private synchronized void selectTodaysCoffee() {
        try {
            Thread.sleep(3000); // 3초 대기
        } catch (InterruptedException e) {
            System.out.println("랜덤 커피 선택 중 오류 발생");
        }

        Random random = new Random();
        int index = random.nextInt(coffees.length - 1); // "오늘의 커피" 제외하고 랜덤 선택
        todaysCoffee = coffees[index];
        System.out.println("오늘의 커피는 " + todaysCoffee.getName() + "입니다.");
        processOrder(index); // 랜덤으로 선택된 커피로 주문 처리
    }
}