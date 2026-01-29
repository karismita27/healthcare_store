import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import SiteLayout from "./components/SiteLayout.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import ProtectedUserRoute from "./components/ProtectedUserRoute.jsx";

import Home from "./pages/Home.jsx";
import Products from "./pages/Products.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import AuthGateway from "./pages/AuthGateway.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import OrderSuccess from "./pages/OrderSuccess.jsx";
import Support from "./pages/Support.jsx";
import BulkOrders from "./pages/BulkOrders.jsx";
import Quality from "./pages/Quality.jsx";
import Account from "./pages/Account.jsx";
import Addresses from "./pages/Addresses.jsx";
import Orders from "./pages/Orders.jsx";
import Returns from "./pages/Returns.jsx";
import About from "./pages/About.jsx";
import BecomeSupplier from "./pages/BecomeSupplier.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  return (
    <SiteLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />

        <Route path="/auth" element={<AuthGateway />} />

        <Route
          path="/account"
          element={
            <ProtectedUserRoute>
              <Account />
            </ProtectedUserRoute>
          }
        />
        <Route
          path="/addresses"
          element={
            <ProtectedUserRoute>
              <Addresses />
            </ProtectedUserRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedUserRoute>
              <Orders />
            </ProtectedUserRoute>
          }
        />
        <Route
          path="/returns"
          element={
            <ProtectedUserRoute>
              <Returns />
            </ProtectedUserRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />

        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/support" element={<Support />} />
        <Route path="/bulk-orders" element={<BulkOrders />} />
        <Route path="/quality" element={<Quality />} />
        <Route path="/about" element={<About />} />
        <Route path="/become-supplier" element={<BecomeSupplier />} />

        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </SiteLayout>
  );
}
