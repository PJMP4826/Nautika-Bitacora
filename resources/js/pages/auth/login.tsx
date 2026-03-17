import { Form, Head, Link } from '@inertiajs/react';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';
import { useState } from 'react';

type Props = {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
};

export default function Login({
                                  status,
                                  canResetPassword,
                                  canRegister,
                              }: Props) {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
            <Head title="Iniciar Sesión" />

            {/* IMAGEN DE FONDO (Con efecto borroso) */}
            <div className="absolute inset-0">
                <img
                    src="./img/hero-img.jpg"
                    alt="Ocean Background"
                    className="h-full w-full object-cover blur-sm scale-105"
                />
                {/* Capa extra de oscuridad para mejor contraste si es necesario */}
                <div className="absolute inset-0 bg-black/20"></div>
            </div>

            {/* CONTENEDOR DE CONTENIDO (Layout de dos columnas) */}
            <div className="relative z-10 w-full max-w-7xl px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-12">

                {/* IZQUIERDA: Textos de Bienvenida */}
                <div className="w-full lg:w-1/2 text-white text-center lg:text-left ml-7">
                    <h2 className="mb-6 text-5xl leading-tight font-bold tracking-tight text-white md:text-7xl">
                        Bienvenido
                    </h2>
                    <h3 className="mt-2 text-2xl font-light tracking-[0.2em] opacity-90">
                        Nautika-Bitacora
                    </h3>
                    <div className="mt-6 h-1 w-20 bg-blue-400 mx-auto lg:mx-0"></div>
                    <p className="mt-8 text-lg text-blue-50 max-w-lg leading-relaxed font-medium">
                        Accede a nuestra plataforma para gestionar tus proyectos y conectar con tu equipo de manera eficiente.
                    </p>
                </div>

                {/* DERECHA: Card del Formulario */}
                <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 md:p-10 mr-5">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Iniciar sesión</h1>
                        <p className="text-gray-500 mt-2 text-sm">Ingresa tus datos para continuar.</p>
                    </div>

                    {status && (
                        <div className="mb-4 text-sm font-medium text-green-600 bg-green-50 p-3 rounded-lg">
                            {status}
                        </div>
                    )}

                    <Form
                        {...store.form()}
                        resetOnSuccess={['password']}
                        className="space-y-5"
                    >
                        {({ processing, errors }) => (
                            <>
                                <div>
                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        required
                                        autoFocus
                                        placeholder="Correo electrónico"
                                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-4 text-sm focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                                    />
                                    {errors.email && (
                                        <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                                    )}
                                </div>

                                <div className="relative">
                                    <input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        required
                                        placeholder="Contraseña"
                                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-4 text-sm focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                                    />
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-blue-600 uppercase tracking-widest"
                                    >
                                        {showPassword ? 'Ocultar' : 'Mostrar'}
                                    </button>
                                    {errors.password && (
                                        <p className="mt-1 text-xs text-red-600">{errors.password}</p>
                                    )}
                                </div>

                                <div className="flex items-center justify-between text-xs px-1">
                                    <label className="flex items-center gap-2 cursor-pointer text-gray-600">
                                        <input type="checkbox" name="remember" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                        Recordarme
                                    </label>
                                    {canResetPassword && (
                                        <Link href={request()} className="text-gray-400 hover:text-blue-600 transition-colors">
                                            ¿Olvidaste tu contraseña?
                                        </Link>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full rounded-xl bg-blue-600 py-4 text-sm font-bold text-white shadow-lg shadow-blue-200 hover:bg-blue-700 active:scale-[0.98] transition-all disabled:opacity-50"
                                >
                                    {processing ? 'Cargando...' : 'Entrar'}
                                </button>

                                {canRegister && (
                                    <p className="text-center text-sm text-gray-500 pt-4">
                                        ¿No tienes cuenta?{' '}
                                        <Link href={register()} className="font-bold text-blue-600 hover:underline">
                                            Regístrate
                                        </Link>
                                    </p>
                                )}
                            </>
                        )}
                    </Form>
                </div>
            </div>
        </div>
    );
}
