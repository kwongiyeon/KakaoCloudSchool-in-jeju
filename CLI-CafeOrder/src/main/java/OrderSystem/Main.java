package OrderSystem;
//입력 받는
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

        double coffeeTotal = 0; //주문 전 커피 개수 누적=0
        double dessertTotal = 0; //주문 전 디저트 개수 누적=0
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
            coffeeTotal = coffees[coffeeIndex].getPrice() * coffeeQuantity; //커피 총 개수
            String tempString = isHot ? "뜨겁게" : "차갑게";
            System.out.println("커피" + coffeeQuantity + "개의 " + coffees[coffeeIndex].name + " (" + tempString + ") 주문이 완료되었습니다.");

            // 디저트 주문
            System.out.println("디저트도 추가 하시겠습니까?");
            System.out.println("1. 네! 같이 주문 할게요.");
            System.out.println("2. 아니요, 괜찮아요.");
            System.out.print("선택: ");
            int dessertYesNo = scanner.nextInt();   //디저트도 같이 주문할 건지 아닌지 선택
            int dessertQuantity = 0;
            if (dessertYesNo == 1) {
                // 디저트 선택
                for (int j = 0; j < desserts.length; j++) {
                    System.out.println((j + 1) + ". " + desserts[j].name);
                }   //디저트 변수=j
                System.out.print("디저트를 고르시고 말씀해주세요. (번호): ");
                int dessertIndex = scanner.nextInt() - 1;   //디저트 번호 입력
                System.out.print("몇 개 드릴까요? ");
                dessertQuantity = scanner.nextInt();    //주문할 디저트 개수 입력
                dessertTotal += desserts[dessertIndex].getPrice() * dessertQuantity;    //디저트 총 개수
                System.out.println("디저트" + dessertQuantity + "개의 " + desserts[dessertIndex].name + " 주문이 완료되었습니다.");
            }
            // 주문 확인 및 총액 계산
            double totalAmount = coffeeTotal + dessertTotal;
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
                        System.out.print("디저트를 고르시고 말씀해주세요. (번호): ");
                        int dessertIndex = scanner.nextInt() - 1;   //디저트 번호 입력
                        System.out.print("몇 개 드릴까요? ");
                        dessertQuantity = scanner.nextInt();    //주문할 디저트 개수 입력
                        dessertTotal += desserts[dessertIndex].getPrice() * dessertQuantity;    //디저트 총 개수
                        System.out.println(dessertQuantity + "개의 " + desserts[dessertIndex].name + " 주문이 완료되었습니다.");
                    }
                    // 각 주문 후 총액 다시 계산
                    totalAmount = coffeeTotal + dessertTotal;   //기존 주문 메뉴 개수 + 추가 주문 메뉴 개수
                }   //추가 주문 완료
            } while (true);  // 조건이 true이므로 무한 루프, 주문 확정이나 추가 주문을 통해 루프를 탈출 -> 주문 확인 완료
        }   //ordering 종료
    }
}