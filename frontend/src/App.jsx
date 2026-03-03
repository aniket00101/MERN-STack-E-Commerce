import { BrowserRouter, Route, Routes } from "react-router-dom"
import UserLayout from "./components/layout/UserLayout"
import Home from "./pages/Home"
import { Toaster } from "sonner"
import Login from "./pages/login"
import Register from "./pages/Register"
import Profile from "./pages/Profile"
import CollectionPage from "./pages/CollectionPage"
import ProductDetail from "./components/products/ProductDetail"
import Checkout from "./components/cart/Checkout"
import OrderConfirmationPage from "./pages/OrderConfirmationPage"
import OrderDetails from "./pages/OrderDetails"
import MyOrderPage from "./pages/MyOrderPage"
import AdminLayout from "./components/Admin/AdminLayout"
import AdminHomePage from "./pages/AdminHomePage"
import UserManagment from "./components/Admin/UserManagment"
import ProductManagment from "./components/Admin/ProductManagment"
import EditProductPage from "./components/Admin/EditProductPage"
import OrderManagment from "./components/Admin/OrderManagment"

import { Provider } from "react-redux"
import store from "./redux/store"
import ProtectedRoute from "./components/common/ProtectedRoute"
function App() {

  return (
    <Provider store={store}>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="profile" element={<Profile />} />
            <Route path="collections/:collection" element={<CollectionPage />} />
            <Route path="product/:id" element={<ProductDetail />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="order-confirmation" element={<OrderConfirmationPage />} />
            <Route path="order/:id" element={<OrderDetails />} />
            <Route path="my-orders" element={<MyOrderPage />} />
          </Route>
          <Route path="/admin" element={
            <ProtectedRoute role="admin">
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route index element={<AdminHomePage />} />
            <Route path="users" element={<UserManagment />} />
            <Route path="products" element={<ProductManagment />} />
            <Route path="products/:id/edit" element={<EditProductPage />} />
            <Route path="orders" element={<OrderManagment />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App

