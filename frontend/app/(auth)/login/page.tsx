import { Metadata } from 'next';
import AuthForm from '@/components/AuthForm';

export const metadata: Metadata = {
    title: 'Вход в систему',
};

export default function LoginPage() {
    return (
        <>
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">Добро пожаловать</h1>
            <p className="text-gray-600 text-center mb-8">Войдите в свой аккаунт</p>

            <AuthForm type="login" />
        </>
    );
}