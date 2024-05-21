package OrderSystem;

//카페가 커피를 상속함
public class Coffee extends Cafe {
    private boolean isHot;

    public Coffee(String name, double price) {
        super(name, price);
        this.isHot = false; //차갑게
    }

    @Override
    public void display() {
        super.display();
        System.out.println("온도: " + (isHot ? "뜨겁게" : "차갑게"));
    }
}