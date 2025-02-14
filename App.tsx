import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SnackbarProvider } from 'notistack'; // SnackbarProvider import edildi
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Products from './pages/Products';
import ProductForm from './pages/admin/ProductForm';
import SellerPage from './pages/Seller';

function App() {
  return (
    <SnackbarProvider maxSnack={3}> {/* SnackbarProvider'ı ekledik */}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/products" element={<Products />} />
          <Route path="/admin-product" element={<ProductForm />} />
          <Route path="/become-seller" element={<SellerPage />} />
        </Routes>
      </Router>
    </SnackbarProvider>
  );
}

export default App;
