package OrderSystem;

public class Coffee extends Cafe {
    private boolean isHot;

    public Coffee(String name, double price, boolean isHot) {
        super(name, price);
        this.isHot = isHot;
    }

    public Coffee(String name, double price) {
        super(name, price); //부모 클래스(카페)로 값 넘기기
    }

    @Override
    public void display() {
        super.display();
        System.out.println("온도: " + (isHot ? "뜨겁게" : "차갑게"));
    }
}