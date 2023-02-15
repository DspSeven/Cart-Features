// Write your code here
import CartContext from '../../context/CartContext'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      let cashCal = 0
      cartList.forEach(cash => {
        cashCal += cash.price * cash.quantity
      })
      console.log(cashCal)
      return (
        <div>
          {cartList.length !== 0 && (
            <div>
              <h1>
                Order Total: Rs <span>{cashCal}</span>
              </h1>
              <p>
                <span>{cartList.length}</span> items in cart
              </p>
              <button type="button">Checkout</button>
            </div>
          )}
        </div>
      )
    }}
  </CartContext.Consumer>
)
export default CartSummary
