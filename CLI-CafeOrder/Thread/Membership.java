package OrderSystem.Thread;
import OrderSystem.Member;
import java.util.Map;
import java.util.Scanner;

public class Membership extends Thread {
    private double totalAmount;
    private int totalItems;
    private Scanner scanner;
    private Map<Integer, Member> members;

    public Membership(Scanner scanner, double totalAmount, int totalItems, Map<Integer, Member> members) {
        this.scanner = scanner;
        this.totalAmount = totalAmount;
        this.totalItems = totalItems;
        this.members = members;
    }

    @Override
    public void run() {
        System.out.println("--------------------------------------------");
        System.out.println("회원으로 등록하시겠습니까?");
        System.out.println("1. 네");
        System.out.println("2. 아니요");
        int registerChoice = scanner.nextInt();

        if (registerChoice == 1) {
            scanner.nextLine(); // 버퍼 비우기
            System.out.print("회원 닉네임을 입력해주세요: ");
            String nickName = scanner.nextLine();
            System.out.print("회원 번호를 입력해주세요 (4자리 숫자): ");
            int number;
            while (true) {
                number = scanner.nextInt();
                if (String.valueOf(number).length() == 4) {
                    break;
                } else {
                    System.out.print("4자리 숫자를 입력해주세요: ");
                }
            }
            System.out.println("--------------------------------------------");
            System.out.println("회원으로 등록하는 중입니다. 잠시만 기다려 주세요...");
            Member member;
            if (members.containsKey(number)) {
                member = members.get(number);
            } else {
                member = new Member(nickName, number);
                members.put(number, member);
            }
            System.out.println("회원 등록이 완료되었습니다! 닉네임: " + member.getNickName() + ", 회원 번호: " + member.getNumber());
        }
    }
}