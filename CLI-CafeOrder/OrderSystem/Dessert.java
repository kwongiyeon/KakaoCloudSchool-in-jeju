package OrderSystem;

//디저트(자식) 클래스가 카페메뉴(부모) 클래스로 상속된다
public class Dessert extends CafeMenu {
    private boolean sliced;  // 'true'면 잘라서 제공, 'false'면 그대로 제공

    public Dessert(String name, double price) {
        super(name, price);
        this.sliced = false;  // 기본값으로 '그대로 제공' 설정
    }

    // sliced 속성에 대한 설정자
    public void setSliced(boolean sliced) {
        this.sliced = sliced;
    }

    // sliced 속성에 대한 접근자
    public boolean isSliced() {
        return sliced;
    }

    @Override
    public void display() {
        super.display();
        System.out.println("서빙 방식: " + (sliced ? "잘라서 제공" : "그대로 제공"));
    }
}
