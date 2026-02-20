import {BrowserRouter, Route, Routes} from "react-router-dom"
import Userlayout from "./components/layout/userlayout"
import Home from "./pages/Home"
import {Toaster} from "sonner"
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
function App() {
  
  return (
    <BrowserRouter future={{v7_startTransition: true, v7_relativeSplatPath: true}}>
    <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={ <Userlayout /> }>
          <Route index element={<Home />}/>
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
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminHomePage />} />
          <Route path="users" element={<UserManagment />} />
          <Route path="products" element={<ProductManagment />} />
          <Route path="products/:id/edit" element={<EditProductPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App


// rabbir-red : #ea2e0e