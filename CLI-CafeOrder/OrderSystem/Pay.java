package OrderSystem;
import java.util.Scanner;

public class Pay extends CafeMenu {
    public Pay(String name, double price) {
        super(name, price);
    }

    public void processPayment() {
        Scanner scanner = new Scanner(System.in);

        System.out.println("결제 방법을 선택하세요:");
        System.out.println("1. 카드");
        System.out.println("2. 현금");
        System.out.print("선택: ");
        int paymentMethod = scanner.nextInt();

        if (paymentMethod == 1) {
            System.out.println("총 " + getPrice() + "원 카드 결제가 완료되었습니다.");
        } else if (paymentMethod == 2) {
            System.out.println("총 " + getPrice() + "원 현금 결제가 완료되었습니다.");
        } else {
            System.out.println("올바른 결제 방법을 선택하지 않았습니다.");
        }
    }
}
