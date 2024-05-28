package OrderSystem;

public class Customer {
    private int coupons = 0;  // 현재 쿠폰 개수

    public void addCoupon(int count) {
        this.coupons += count;
        System.out.println("쿠폰 " + count + "장이 추가되었습니다. 현재 쿠폰 수: " + coupons);
        checkCoupons();
    }

    private void checkCoupons() {
        while (coupons >= 10) {
            FreeCoffee();
        }
    }

    private void FreeCoffee() {
        coupons -= 10;  // 10장의 쿠폰을 사용
        System.out.println("무료 커피를 제공합니다. 남은 쿠폰 수: " + coupons);
    }
}