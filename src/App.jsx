import { useEffect, useState, Fragment } from "react";

import Accueil from "./components/accueil";
import Footer from "./components/footer";
import NavBar from "./components/navbar";
import Gestion from "./components/admin/gestion";
import Cart from "./components/cart";
import GetOrders from "./components/admin/orders/getOrders";
import Admin from "./components/admin";
import OrderDetail from "./components/admin/orders/getOrders/orderDetail";
import GetServedOrders from "./components/admin/orders/getServedOrders";
import Loader from "./components/loader";

import apiUrl from "./utils/apiUrl";
import { UserProvider } from "./utils/context";

import { Routes, Route } from "react-router-dom";

function App() {
  const [meals, setMeals] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch(apiUrl + `/miam/meals`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setMeals(data.meals);
        setIsLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="App">
      <NavBar />

      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Routes>
            <Route
              path="/accueil"
              element={<Accueil meals={meals} setCart={setCart} cart={cart} />}
            />
            <Route
              path="/cart"
              element={<Cart cart={cart} setCart={setCart} />}
            />

            <Route path="/admin" element={<Admin />} />

            <Route path="/admin/gestion" element={<Gestion meals={meals} />} />
          </Routes>

          <UserProvider>
            <Routes>
              <Route path="/admin/get_orders" element={<GetOrders />} />
              <Route
                path="/admin/order_detail/:orderId"
                element={<OrderDetail meals={meals} />}
              />

              <Route
                path="/admin/served_orders"
                element={<GetServedOrders />}
              />
            </Routes>
          </UserProvider>
        </>
      )}

      <Footer />
    </div>
  );
}

export default App;
