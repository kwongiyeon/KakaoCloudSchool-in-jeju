package OrderSystem;

//부모 클래스=카페
public class Cafe {
    protected String name;
    protected double price;

    public Cafe(String name, double price) {
        this.name = name;
        this.price = price;
    }

//    // 이름 설정자
//    public void setName(String name) {
//        this.name = name;
//    }
//
//    // 이름 불러오기
//    public String getName() {
//        return name;
//    }

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