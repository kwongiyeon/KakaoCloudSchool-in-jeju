package OrderSystem.Thread;
import java.util.Scanner;

public class Payment implements Runnable {
    private double totalAmount;
    private Scanner scanner;

    public Payment(Scanner scanner, double totalAmount) {
        this.scanner = scanner;
        this.totalAmount = totalAmount;
    }

    @Override
    public void run() {
        synchronized (scanner) {
            System.out.println("--------------------------------------------");
            System.out.println("결제 방법을 선택하세요:");
            System.out.println("1. 카드");
            System.out.println("2. 현금");
            System.out.print("선택: ");
            int paymentMethod = scanner.nextInt();
            System.out.println("결제 도와드리겠습니다 잠시만 기다려 주세요...");

            if (paymentMethod == 1) {
                try {
                    Thread.sleep(3000);
                    System.out.println("총 " + totalAmount + "원 카드 결제가 완료되었습니다.");
                } catch (InterruptedException e) {
                    System.out.println("결제 중에 오류가 발생하였습니다. 다시 결제하겠습니다.");
                }
            } else if (paymentMethod == 2) {
                try {
                    Thread.sleep(3000);
                    System.out.println("총 " + totalAmount + "원 현금 결제가 완료되었습니다.");
                } catch (InterruptedException e) {
                    System.out.println("결제 중에 오류가 발생하였습니다. 다시 결제하겠습니다.");
                }
            } else {
                System.out.println("올바른 결제 방법을 선택하지 않았습니다.");
            }
        }
    }
}