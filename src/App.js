import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  addCartItem = product => {
    const {cartList} = this.state

    const status = cartList.find(cart => cart.id === product.id)
    console.log(status)
    if (status) {
      const newCartList = cartList.map(cart => {
        if (cart.id === product.id) {
          return {
            availability: cart.availability,
            brand: cart.brand,
            description: cart.description,
            id: cart.id,
            imageUrl: cart.imageUrl,
            price: cart.price + product.price,
            rating: cart.rating,
            title: cart.title,
            totalReviews: cart.totalReviews,
            quantity: cart.quantity,
          }
        }
        return cart
      })
      this.setState({cartList: newCartList})
    } else {
      this.setState(prevState => ({
        cartList: [...prevState.cartList, product],
      }))
    }
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const newIncrement = cartList.map(cart => {
      if (cart.id === id) {
        return {
          availability: cart.availability,
          brand: cart.brand,
          description: cart.description,
          id: cart.id,
          imageUrl: cart.imageUrl,
          price: cart.price,
          rating: cart.rating,
          title: cart.title,
          totalReviews: cart.totalReviews,
          quantity: cart.quantity + 1,
        }
      }
      return cart
    })
    this.setState({cartList: newIncrement})
    console.log(newIncrement)
  }

  removeCartItem = id => {
    const {cartList} = this.state
    console.log(id)
    const newCart = cartList.filter(cash => cash.id !== id)
    console.log(newCart)
    this.setState({cartList: newCart})
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    /*
    const newIncrement = cartList.map(cart => {
      if (cart.id === id) {
        if (cart.quantity > 1) {
          return {
            availability: cart.availability,
            brand: cart.brand,
            description: cart.description,
            id: cart.id,
            imageUrl: cart.imageUrl,
            price: cart.price,
            rating: cart.rating,
            title: cart.title,
            totalReviews: cart.totalReviews,
            quantity: cart.quantity - 1,
          }
        }
        this.removeCartItem(id)
      }
      return cart
    })
   
    this.setState({cartList: newIncrement})
    */
    this.setState(prevState => ({
      cartList: prevState.cartList.map(cart => {
        if (cart.id === id) {
          if (cart.quantity > 1) {
            return {
              availability: cart.availability,
              brand: cart.brand,
              description: cart.description,
              id: cart.id,
              imageUrl: cart.imageUrl,
              price: cart.price,
              rating: cart.rating,
              title: cart.title,
              totalReviews: cart.totalReviews,
              quantity: cart.quantity - 1,
            }
          }
          this.removeCartItem(id)
        }
        return cart
      }),
    }))
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  render() {
    const {cartList} = this.state
    console.log(cartList)

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
