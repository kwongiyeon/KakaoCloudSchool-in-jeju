package OrderSystem;
//입력 받는 클래스 호출
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Coffee[] coffees = {
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
                new Coffee("아인슈페너", 4000)
        };
        Dessert[] desserts = {
                new Dessert("딸기 케이크", 6000),
                new Dessert("초코 케이크", 6000),
                new Dessert("당근 케이크", 6000),
                new Dessert("초코 쿠키", 2000),
                new Dessert("라즈베리 쿠키", 2000),
                new Dessert("휘낭시에", 2500),
                new Dessert("소금빵", 3000),
                new Dessert("에그타르트", 3500),
                new Dessert("아이스크림 크로플", 4000)
        };

        double coffeeTotal = 0; //주문 전 커피 금액 누적=0
        double dessertTotal = 0; //주문 전 디저트 금액 누적=0
        boolean ordering = true; //while문 매개변수=ordering, 기본값=참

        while (ordering) {
            System.out.println("어서오세요! ‘내가 제일 좋아하는 카페’에 오신 걸 환영합니다^^ 주문하시겠습니까?");
            // 커피 주문
            for (int i = 0; i < coffees.length; i++) {
                System.out.println((i + 1) + ". " + coffees[i].name);
            }   //커피 변수=i
            System.out.print("커피를 고르시고 말씀해주세요. (번호): ");
            int coffeeIndex = scanner.nextInt() - 1;    //커피 번호 입력
            System.out.println("뜨겁게 드시겠습니까? 차갑게 드시겠습니까?");
            System.out.println("1. 뜨겁게");
            System.out.println("2. 차갑게");
            System.out.print("선택: ");
            int tempChoice = scanner.nextInt(); //커피 온도 입력
            boolean isHot = tempChoice == 1;    //뜨겁게=1
            System.out.print("수량을 입력하세요: ");
            int coffeeQuantity = scanner.nextInt(); //주문할 커피 개수 입력
            coffeeTotal = coffees[coffeeIndex].getPrice() * coffeeQuantity; //커피 총 개수 x 금액
            String tempString = isHot ? "뜨겁게" : "차갑게";
            System.out.println("커피" + coffeeQuantity + "개의 " + coffees[coffeeIndex].name + " (" + tempString + ") 주문이 완료되었습니다.");

            // 디저트 주문
            System.out.println("디저트도 추가 하시겠습니까?");
            System.out.println("1. 네! 같이 주문 할게요.");
            System.out.println("2. 아니요, 괜찮아요.");
            System.out.print("선택: ");
            int dessertYesNo = scanner.nextInt();   //디저트도 같이 주문할 건지 아닌지 선택
            int dessertQuantity = 0;
                // 디저트 주문
                if (dessertYesNo == 1) {
                    for (int j = 0; j < desserts.length; j++) {
                        System.out.println((j + 1) + ". " + desserts[j].name);
                    }
                    System.out.print("디저트를 고르시고 말씀해주세요. (번호): ");
                    int dessertIndex = scanner.nextInt() - 1;
                    System.out.print("몇 개 드릴까요? ");
                    dessertQuantity = scanner.nextInt();
                    dessertTotal = desserts[dessertIndex].getPrice() * dessertQuantity;   //디저트 총 개수 x 금액
                    System.out.println("디저트를 어떻게 준비해 드릴까요?");
                    System.out.println("1. 잘라서 주세요.");
                    System.out.println("2. 그대로 주세요.");
                    System.out.print("선택: ");
                    int servingOption = scanner.nextInt();
                    boolean isSliced = servingOption == 1;
                    desserts[dessertIndex].setSliced(isSliced);
                    System.out.println("디저트" + dessertQuantity + "개의 " + desserts[dessertIndex].name +
                            " (" + (isSliced ? "잘라서 제공" : "그대로 제공") + ") 주문이 완료되었습니다.");
                }

                // 주문 확인 및 총액 계산
                double totalAmount = coffeeTotal + dessertTotal;    //총 주문 금액
                int totalItems = coffeeQuantity + dessertQuantity; //총 주문한 커피+디저트 갯수
                do {
                    System.out.println("총 " + (coffeeQuantity + (dessertYesNo == 1 ? dessertQuantity : 0)) + "개 맞으실까요?");
                    System.out.println("1. 네 맞아요.");
                    System.out.println("2. 아니요. 추가할게요!");
                    int confirm = scanner.nextInt();    //추가할 건지 아닌지 확인
                    //주문 끝낼 경우
                    if (confirm == 1) {
                        System.out.println("네, 총 금액은 " + totalAmount + "원입니다~ 결제는 어떻게 하시겠습니까?");
                        Pay payment = new Pay("총 주문", totalAmount);
                        payment.processPayment();  // 결제 과정 실행
                        System.out.println("주문해주셔서 감사합니다! 맛있게 드세요^^");

                        //쿠폰 회원 등록 여부
                        System.out.println("회원으로 등록하시겠습니까?");
                        System.out.println("1. 네");
                        System.out.println("2. 아니요");
                        int registerChoice = scanner.nextInt(); //쿠폰 적립하기 위해 회원으로 등록할 건지 아닌지 결정
                        if (registerChoice == 1) {
                            scanner.nextLine(); // 버퍼 비우기
                            System.out.print("회원 닉네임을 입력해주세요: ");
                            String nickName = scanner.nextLine();
                            System.out.print("회원 번호를 입력해주세요 (4자리 숫자): ");
                            String number;
                            while (true) {
                                number = String.valueOf(scanner.nextInt());
                                if (String.valueOf(number).length() == 4) {
                                    break;
                                } else {
                                    System.out.print("4자리 숫자를 입력해주세요: ");
                                }
                            }
                            Member member = new Member(nickName, number);
                            member.addCoupon(totalItems);  // 총 주문한 메뉴 개수만큼 쿠폰 추가
                            System.out.println("회원 등록이 완료되었습니다! 닉네임: " + member.getNickName() + ", 회원 번호: " + member.getNumber());
                            System.out.println("총 " + totalItems + "개의 쿠폰이 추가되었습니다.");

                            // 쿠폰이 10장 이상일 때 아메리카노 1잔 무료 제공
                            if (member.getCouponCount() >= 10) {
                                member.useCoupon(10);  // 쿠폰 10장 차감
                                System.out.println("축하합니다! 쿠폰 10장이 모여 아메리카노 한 잔이 무료로 제공됩니다!");
                            }
                        }
                        break;  // 주문이 확정되면 루프 탈출
                    } else {    //추가로 주문할 경우
                        System.out.println("어떤 걸 추가하시겠습니까? 1. 커피 2. 디저트");
                        int addOrder = scanner.nextInt();
                        if (addOrder == 1) {
                            // 커피 추가 주문 로직
                            for (int i = 0; i < coffees.length; i++) {
                                System.out.println((i + 1) + ". " + coffees[i].name);
                            }
                            System.out.print("커피를 고르시고 말씀해주세요. (번호): ");
                            coffeeIndex = scanner.nextInt() - 1;    //커피 번호 입력
                            System.out.println("뜨겁게 드시겠습니까? 차갑게 드시겠습니까?");
                            System.out.println("1. 뜨겁게");
                            System.out.println("2. 차갑게");
                            System.out.print("선택: ");
                            tempChoice = scanner.nextInt(); //커피 온도 입력
                            isHot = tempChoice == 1;    //뜨겁게=1
                            System.out.print("수량을 입력하세요: ");
                            coffeeQuantity = scanner.nextInt(); //주문할 커피 개수 입력
                            coffeeTotal += coffees[coffeeIndex].getPrice() * coffeeQuantity;    //커피 총 개수
                            tempString = isHot ? "뜨겁게" : "차갑게";
                            System.out.println(coffeeQuantity + "개의 " + coffees[coffeeIndex].name + " (" + tempString + ") 주문이 완료되었습니다.");
                        } else if (addOrder == 2) {
                            // 디저트 추가 주문 로직
                            for (int j = 0; j < desserts.length; j++) {
                                System.out.println((j + 1) + ". " + desserts[j].name);
                            }
                            // 디저트 주문 및 서빙 방식 설정
                            if (dessertYesNo == 1) {
                                for (int j = 0; j < desserts.length; j++) {
                                    System.out.println((j + 1) + ". " + desserts[j].name);
                                }
                                System.out.print("디저트를 고르시고 말씀해주세요. (번호): ");
                                int dessertIndex = scanner.nextInt() - 1;
                                System.out.print("몇 개 드릴까요? ");
                                dessertQuantity = scanner.nextInt();
                                desserts[dessertIndex].setPrice(desserts[dessertIndex].getPrice() * dessertQuantity);

                                System.out.println("디저트를 어떻게 준비해 드릴까요?");
                                System.out.println("1. 잘라서 주세요.");
                                System.out.println("2. 그대로 주세요.");
                                System.out.print("선택: ");
                                int servingOption = scanner.nextInt();
                                boolean isSliced = servingOption == 1;
                                desserts[dessertIndex].setSliced(isSliced);
                                System.out.println("디저트" + dessertQuantity + "개의 " + desserts[dessertIndex].name +
                                        " (" + (isSliced ? "잘라서 제공" : "그대로 제공") + ") 주문이 완료되었습니다.");
                            }
                            // 각 주문 후 총액 다시 계산
                            totalAmount = coffeeTotal + dessertTotal;   //기존 주문 메뉴 개수 + 추가 주문 메뉴 개수
                        }
                    }   //추가 주문 완료
                }while (true);  // 조건이 true이므로 무한 루프, 주문 확정이나 추가 주문을 통해 루프를 탈출 -> 주문 확인 완료
        }   //ordering 종료
    }
}