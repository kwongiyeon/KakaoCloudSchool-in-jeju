package OrderSystem.Thread;
import java.util.Scanner;

public class DiningOption implements Runnable {
    private Scanner scanner;
    private boolean isTakeout;

    public DiningOption(Scanner scanner) {
        this.scanner = scanner;
    }

    public boolean isTakeout() {
        return isTakeout;
    }

    @Override
    public void run() {
        synchronized (scanner) {
            System.out.println("--------------------------------------------");
            System.out.println("매장 식사 또는 포장을 선택해 주세요.");
            System.out.println("1. 매장 식사");
            System.out.println("2. 포장");
            System.out.print("선택: ");
            int choice = scanner.nextInt();
            isTakeout = (choice == 2);

            if (isTakeout) {
                System.out.println("--------------------------------------------");
                System.out.println("포장 준비 중입니다...");
                try {
                    Thread.sleep(3000);
                    System.out.println("주문하신 메뉴 포장이 완료되었습니다.");
                } catch (InterruptedException e) {
                    System.out.println("죄송합니다. 다시 포장해드리겠습니다.");
                }
            } else {
                System.out.println("주문하신 메뉴 나왔습니다. 매장에서 식사하시기 바랍니다.");
            }
        }
    }
}