package OrderSystem;

//부모 클래스=카페메뉴
public class CafeMenu {
    public String name;
    protected double price;

    public CafeMenu(String name, double price) {
        this.name = name;
        this.price = price;
    }

    // 가격 설정자(변경 가능)
    public void setPrice(double price) {
        this.price = price;
    }

    //가격 불러오기
    public double getPrice() {
        return price;
    }

    public void display() {
        System.out.println(name + ": " + price + "원");
    }
}