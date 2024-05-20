package OrderSystem;

//부모 클래스=카페
public class Cafe {
    protected String name;
    protected double price;

    public Cafe(String name, double price) {
        this.name = name;
        this.price = price;
    }

    public void display() {
        System.out.println(name + ": " + price + "원");
    }

    public double getPrice() {
        return price;
    }
}