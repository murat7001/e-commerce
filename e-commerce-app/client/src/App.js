import './App.css';
import { Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar/index';
import Signin from './pages/Auth/Signin';
import Signup from './pages/Auth/Signup';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Profile from './pages/Profile';
import ProtectedRoute from './pages/ProtectedRoute';
import Basket from './pages/Basket';
import Error404 from './pages/Error404';
import ProtectedAdmin from './pages/Admin/ProtectedAdmin';
import AdminProductDetail from './pages/Admin/AdminProductDetail';
import AdminHome from './pages/Admin/AdminHome';
import AdminOrders from './pages/Admin/AdminOrders';
import AdminProducts from './pages/Admin/AdminProducts';



function App() {
  return (
    <>
      <Navbar />

      <div id="content">
        <Routes>
          <Route path="/" exact element={<Products />} />
          <Route path="/product/:product_id" element={<ProductDetail />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/basket" element={<Basket />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route element={<ProtectedAdmin />}>
						{/* https://www.robinwieruch.de/react-router-nested-routes/ */}
						<Route exact path="/admin" element={<AdminHome />} />
						<Route path="/admin/orders" element={<AdminOrders />} />
						<Route path="/admin/products" element={<AdminProducts />} />
						<Route
							path="/admin/products/:product_id"
							element={<AdminProductDetail />}
						/>
						
					</Route>

          <Route path="*" element={<Error404 />} />

        </Routes>
      </div>



    </>

  );
}

export default App;
