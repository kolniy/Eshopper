import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/layouts/Header"
import Footer from "./components/layouts/Footer"
import Landing from "./components/home/Landing"
import Product from "./components/product/Product"
import Cart from "./components/cart/CartComponent"
import Products from "./components/product/Products"
import ProductsCategory from "./components/product/ProductsCategory"
import RegisterOrLogin from "./components/auth/RegisterOrLogin"
import Alert from "./components/layouts/Alert"
import PrivateRoute from "./components/routing/PrivateRoute"
import Checkout from "./components/checkout/Checkout"
import Order from "./components/order/Order"
import PaymentSuccessPage from "./components/order/PaymentSuccessPage"
import ResetPassword from "./components/auth/ResetPassword"

// action to authenticate a user if a token exists.
import { loadUser } from "./actions/auth"

import setAuthToken from "./utils/setAuthToken"

// REDUX STOTE CONFIG
import { Provider } from "react-redux";
import store from "./store";

setAuthToken(localStorage.getItem('token'))
store.dispatch(loadUser())

function App() {
  return (
    <Provider store={store}>
    <Router>
      <Header />
        <Alert />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/products" component={Products} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/login/" component={RegisterOrLogin} />
        <Route exact path="/product/:productId" component={Product} />
        <Route exact path="/products/category/:categoryName" component={ProductsCategory} />
        <Route exact path="/checkout" component={Checkout} />
        <Route exact path="/resetpassword" component={ResetPassword} />
        <PrivateRoute exact path="/order/:orderId" component={Order} />
        <Route exact path="/order/paymentstatus/:orderId" component={PaymentSuccessPage} />
      </Switch>
      <Footer />
    </Router>
    </Provider>
  );
}

export default App;
