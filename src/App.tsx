import React from "react";
import { Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";

import "./scss/app.scss";

const Cart = React.lazy(() => import("./pages/Cart"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/cart"
              element={
                <React.Suspense fallback={<div>Загрузка корзины...</div>}>
                  <Cart />
                </React.Suspense>
              }
            />
            <Route
              path="*"
              element={
                <React.Suspense fallback={<div>Загрузка...</div>}>
                  <NotFound />
                </React.Suspense>
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
