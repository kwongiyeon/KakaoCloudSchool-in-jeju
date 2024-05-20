package OrderSystem;

//디저트(자식) 클래스가 카페(부모) 클래스로 상속된다
public class Dessert extends Cafe {
    public Dessert(String name, double price) {
        super(name, price);
    }

    //메뉴 이름과 가격 표시
    @Override
    public void display() {
        System.out.println(name + ": " + price + "원");
    }
}
