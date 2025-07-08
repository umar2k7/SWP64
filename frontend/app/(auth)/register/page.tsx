import { Metadata } from 'next';
import AuthForm from '@/components/AuthForm';

export const metadata: Metadata = {
    title: 'Регистрация',
};

export default function RegisterPage() {
    return (
        <>
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">Добро пожаловать</h1>
            <p className="text-gray-600 text-center mb-8">Зарегистрироваться</p>

            <AuthForm type="register" />
        </>
    );
}
