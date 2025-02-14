import React, { useState } from 'react';
import { FaGoogle } from 'react-icons/fa'; // Google ikonu için
import { useSnackbar } from 'notistack'; // useSnackbar hook'u import edildi
import axios from 'axios';

const SignupForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const { enqueueSnackbar } = useSnackbar(); // Snackbar'ı kullanmak için
  
   const signupWithEmail = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3000/user/signup',
        { name, email, password },  // Ensure these fields are properly populated
        { withCredentials: true }    // Include credentials if needed (cookies, tokens, etc.)
      );
  
      if (response.status === 200) {
        enqueueSnackbar('Kayıt başarılı!', { variant: 'success' });
        console.log(response.data);
      } else {
        enqueueSnackbar('Kayıt başarısız!', { variant: 'error' });
      }
    } catch (error) {
      enqueueSnackbar('Kayıt sırasında bir hata oluştu.', { variant: 'error' });
      console.error(error.response ? error.response.data : error.message);
    }
  };
  

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault(); // Formun default submit davranışını engelle

    let hasError = false;

    const setNotVerified = () => { 
        hasError = true;
        setIsVerified(false);
    }

    // E-posta ve şifre boş olmamalıdır
    if (!name || !email || !password || !confirmPassword) {
      enqueueSnackbar('Tüm alanlar boş bırakılamaz.', { variant: 'error' });
      setNotVerified();
      return;
    }

    // Geçerli bir e-posta formatı
    if (!/\S+@\S+\.\S+/.test(email)) {
      enqueueSnackbar('Geçersiz e-posta formatı.', { variant: 'error' });
      setNotVerified();
      return;
    }

    // Şifre uzunluğu
    if (password.length < 6) {
      enqueueSnackbar('Şifre en az 6 karakter olmalıdır.', { variant: 'error' });
      setNotVerified();
      return;
    }

    // Şifrelerin eşleşmesi
    if (password !== confirmPassword) {
      enqueueSnackbar('Şifreler uyuşmuyor.', { variant: 'error' });
      setNotVerified();
      return;
    }

    // Eğer hata yoksa kayıt yapılır
    if (!hasError) {
      setIsVerified(true);
      signupWithEmail();
      // Başarılı işlem sonrası yönlendirme yapılabilir veya başka aksiyonlar eklenebilir
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
      {/* Responsive Container */}
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative">
        {/* Başlık */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Kayıt Ol</h2>

        {/* Form */}
        <form onSubmit={handleSignup}>
          {/* Name Input */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Ad
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Adınızı girin"
            />
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              E-posta
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="E-posta adresinizi girin"
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Şifre
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Şifrenizi girin"
            />
          </div>

          {/* Confirm Password Input */}
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Şifreyi Tekrar Girin
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Şifrenizi tekrar girin"
            />
          </div>

          {/* Kayıt Ol Butonu */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
          >
            Kayıt Ol
          </button>
        </form>

        {/* Google ile Kayıt Ol Butonu */}
        <div className="mt-6">
          <button
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-gray-300 text-gray-700 
                       bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 animate-gradient 
                       transition-transform duration-200 ease-in-out transform hover:scale-105"
          >
            <FaGoogle className="text-white" /> Google ile Kayıt Ol
          </button>
        </div>

        <br />

        {/* Giriş Linki */}
        <button
            type="button"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
          >
        <a href="/login" className="flex items-center justify-center">
            Zaten hesabınız var mı? Giriş yapın
        </a>
        </button>

      </div>
    </div>
  );
};

export default SignupForm;
