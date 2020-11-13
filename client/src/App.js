import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/layouts/Header"
import Footer from "./components/layouts/Footer"
import Landing from "./components/home/Landing"
import Product from "./components/product/Product"
import Cart from "./components/cart/CartComponent"


// REDUX STOTE CONFIG
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/product/:productId" component={Product} />
      </Switch>
      <Footer />
    </Router>
    </Provider>
  );
}

export default App;
