import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export default function SellerPage() {
    const formik = useFormik({
        initialValues: {
            id: uuidv4(),
            sellerName: '',
            name: '',
            email: '',
            password: '',
            phoneNumber: '',
        },
        validationSchema: Yup.object({
            sellerName: Yup.string()
                .required('Mağaza adı zorunludur'),
            name: Yup.string()
                .required('Ad Soyad zorunludur'),
            email: Yup.string()
                .email('Geçersiz email')
                .required('Email zorunludur'),
            password: Yup.string()
                .min(6, 'Şifre en az 6 karakter olmalı')
                .required('Şifre zorunludur'),
            phoneNumber: Yup.string()
                .required('Telefon numarası zorunludur'),
        }),
        onSubmit: async (values, { setSubmitting, setErrors, resetForm }) => {
            try {
                const response = await axios.post('http://localhost:3000/sellers/', values);
                alert(response.data.message);
                resetForm();
            } catch (error) {
                console.error('API Error:', error);
                setErrors({ 
                    api: error.response?.data?.error || 'Satıcı oluşturulamadı!' 
                });
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
                <h2 className="text-2xl font-bold mb-4">Satıcı Oluştur</h2>
                
                {formik.errors.api && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                        {formik.errors.api}
                    </div>
                )}
                
                <form onSubmit={formik.handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <input
                                type="text"
                                name="sellerName"
                                placeholder="Mağaza Adı"
                                {...formik.getFieldProps('sellerName')}
                                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                            />
                            {formik.touched.sellerName && formik.errors.sellerName && (
                                <div className="text-red-500 text-sm mt-1">{formik.errors.sellerName}</div>
                            )}
                        </div>
                        
                        <div>
                            <input
                                type="text"
                                name="name"
                                placeholder="Ad Soyad"
                                {...formik.getFieldProps('name')}
                                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                            />
                            {formik.touched.name && formik.errors.name && (
                                <div className="text-red-500 text-sm mt-1">{formik.errors.name}</div>
                            )}
                        </div>
                        
                        <div>
                            <input
                                type="email"
                                name="email"
                                placeholder="E-posta"
                                {...formik.getFieldProps('email')}
                                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                            />
                            {formik.touched.email && formik.errors.email && (
                                <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
                            )}
                        </div>
                        
                        <div>
                            <input
                                type="password"
                                name="password"
                                placeholder="Şifre"
                                {...formik.getFieldProps('password')}
                                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                            />
                            {formik.touched.password && formik.errors.password && (
                                <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
                            )}
                        </div>
                        
                        <div>
                            <input
                                type="text"
                                name="phoneNumber"
                                placeholder="Telefon Numarası"
                                {...formik.getFieldProps('phoneNumber')}
                                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                            />
                            {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                                <div className="text-red-500 text-sm mt-1">{formik.errors.phoneNumber}</div>
                            )}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={formik.isSubmitting}
                        className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors"
                    >
                        {formik.isSubmitting ? "Oluşturuluyor..." : "Satıcıyı Kaydet"}
                    </button>
                </form>
            </div>
        </div>
    );
}