import React, { useState } from 'react';
import { FaGoogle } from 'react-icons/fa'; // Google ikonu için
import { useSnackbar } from 'notistack'; // useSnackbar hook'u import edildi

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { enqueueSnackbar } = useSnackbar(); // Snackbar'ı kullanmak için

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault(); // Formun default submit davranışını engelle

    let hasError = false;

    // E-posta ve şifre boş olmamalıdır
    if (!email || !password) {
      enqueueSnackbar('E-posta ve şifre alanları boş bırakılamaz.', { variant: 'error' });
      hasError = true;
      return;
    }

    // Geçerli bir e-posta formatı
    if (!/\S+@\S+\.\S+/.test(email)) {
      enqueueSnackbar('Geçersiz e-posta formatı.', { variant: 'error' });
      hasError = true;
      return;
    }

    // Şifre uzunluğu
    if (password.length < 6) {
      enqueueSnackbar('Şifre en az 6 karakter olmalıdır.', { variant: 'error' });
      hasError = true;
      return;
    }

    // Eğer hata yoksa giriş yapılır
    if (!hasError) {
      console.log('Giriş yapıldı');


      return;
      // Başarılı işlem sonrası yönlendirme yapılabilir veya başka aksiyonlar eklenebilir
    }
  };

  const handleForgotPassword = () => {
    console.log('Şifremi Unuttum? tıklandı');
    // Burada şifre sıfırlama işlemi için yönlendirme veya modal açma yapılabilir.
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
      {/* Responsive Container */}
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative">
        {/* Başlık */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Giriş Yap</h2>

        {/* Form */}
        <form onSubmit={handleLogin}>
          {/* Email Input */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              E-posta
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="E-posta adresinizi girin"
            />
          </div>

          {/* Password Input */}
          <div className="mb-6">
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

          {/* Şifremi Unuttum */}
          <div className="flex justify-end mb-6">
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-sm text-indigo-600 hover:text-indigo-500 cursor-pointer underline"
            >
              Şifremi Unuttum?
            </button>
          </div>

          {/* Giriş Butonu */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
          >
            Giriş Yap
          </button>
        </form>

        {/* Google ile Giriş Butonu */}
        <div className="mt-6">
          <button
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-gray-300 text-gray-700 
                       bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 animate-gradient 
                       transition-transform duration-200 ease-in-out transform hover:scale-105"
          >
            <FaGoogle className="text-white" /> Google ile Giriş Yap
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
