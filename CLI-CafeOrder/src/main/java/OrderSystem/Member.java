package OrderSystem;

public class Member extends Customer {
    private String nickName;
    private int number;

    public Member(String nickName, int number) {
        this.nickName = nickName;
        this.number = number;
    }

    public String getNickName() {
        return nickName;
    }

    public void setNickName(String nickName) {
        this.nickName = nickName;
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }
}