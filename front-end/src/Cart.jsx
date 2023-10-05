// Cart.jsx
import { useCart } from './CartContext';

function Cart() {
  const { cart } = useCart();

  return (
    <div className="offcanvas" id="offcanvas">
      <div className="offcanvas_header">
        <p>SHOPPING CART</p>
        <button type="button">X</button>
      </div>
      <div className="offcanvas_body">
        {cart.length === 0 ? (
          <p>Your cart is empty!</p>
        ) : (
          cart.map((item, index) => (
            <div key={index}>
              <p>{item.name}</p>
              <p>Quantity: {item.quantity}</p>
            </div>
          ))
        )}
      </div>
      <div className="offcanvas_bottom">
        {/* 其他底部信息 */}
      </div>
    </div>
  );
}

export default Cart;
