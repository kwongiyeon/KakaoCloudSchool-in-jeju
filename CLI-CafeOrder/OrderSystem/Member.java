package OrderSystem;

public class Member extends Customer {
    private String nickName;
    private String number;
    private int couponCount;

    public Member(String nickName, String number) {
        this.nickName = nickName;
        this.number = number;
        this.couponCount = 0;
    }

    public String getNickName() {
        return nickName;
    }

    public void setNickName(String nickName) {
        this.nickName = nickName;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public int getCouponCount() {
        return couponCount;
    }

    public void addCoupon(int count) {
        this.couponCount += count;
    }

    public void useCoupon(int count) {
        if (this.couponCount >= count) {
            this.couponCount -= count;
        } else {
            System.out.println("쿠폰이 부족합니다.");
        }
    }
}