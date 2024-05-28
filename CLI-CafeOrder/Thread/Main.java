package OrderSystem.Thread;

import OrderSystem.Member;

import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

public class Main {
    private static Map<String, Member> members = new HashMap<>(); // 키 타입을 String으로 변경

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        double coffeeTotal = 0;     // 커피 누적 개수 0으로 초기화
        double dessertTotal = 0;    // 디저트 누적 개수 0으로 초기화
        System.out.println("어서오세요! ‘내가 제일 좋아하는 카페’에 오신 걸 환영합니다^^ 주문하시겠습니까?");

        // 커피 주문 스레드 실행
        System.out.println("싼 가격으로 오늘의 커피(랜덤)를 드시겠습니까?");
        Coffee coffeeOrderTask = new Coffee(scanner);
        Thread coffeeThread = new Thread(coffeeOrderTask);
        coffeeThread.start();
        try {
            coffeeThread.join();
        } catch (InterruptedException e) {
            System.out.println(e.getMessage());
        }
        coffeeTotal = coffeeOrderTask.getCoffeeTotal();

        System.out.println("디저트도 추가 하시겠습니까?");
        System.out.println("1. 네! 같이 주문 할게요.");
        System.out.println("2. 아니요, 괜찮아요.");
        System.out.print("선택: ");
        int dessertYesNo = scanner.nextInt();   // 디저트도 같이 주문할 건지 아닌지 선택

        // 디저트 주문 스레드 실행
        if (dessertYesNo == 1) {
            Dessert dessertOrderTask = new Dessert(scanner, true);
            Thread dessertThread = new Thread(dessertOrderTask);
            dessertThread.start();
            try {
                dessertThread.join();
            } catch (InterruptedException e) {
                System.out.println(e.getMessage());
            }
            dessertTotal = dessertOrderTask.getDessertTotal();
        }

        double totalAmount = coffeeTotal + dessertTotal;
        int totalItems = 0;  // 총 주문한 메뉴 개수 계산 로직 생략

        // 식사/포장 선택 스레드 실행
        DiningOption diningOptionTask = new DiningOption(scanner);
        Thread diningOptionThread = new Thread(diningOptionTask);
        diningOptionThread.start();
        try {
            diningOptionThread.join();
        } catch (InterruptedException e) {
            System.out.println(e.getMessage());
        }

        // 결제 프로세스 스레드 실행
        Payment paymentTask = new Payment(scanner, totalAmount);
        Thread paymentThread = new Thread(paymentTask);
        paymentThread.start();
        try {
            paymentThread.join();
        } catch (InterruptedException e) {
            System.out.println(e.getMessage());
        }

        // 멤버십 등록 스레드 실행
        Membership membershipTask = new Membership(scanner, totalAmount, totalItems, members);
        Thread membershipThread = new Thread(membershipTask);
        membershipThread.start();
        try {
            membershipThread.join();
        } catch (InterruptedException e) {
            System.out.println("멤버십 생성 중 오류가 발생하였습니다. 다시 생성합니다.");
        }

        // 주문 완료 멘트
        try {
            Thread.sleep(5000);
            System.out.println("--------------------------------------------");
            System.out.println("이용해 주셔서 감사합니다! 안녕히 가세요.");
        } catch (InterruptedException e) {
            System.out.println("프로그램 종료 중 예기치 않은 오류가 발생하였습니다.");
        }
        scanner.close();
    }
}