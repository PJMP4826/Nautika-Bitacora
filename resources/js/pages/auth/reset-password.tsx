import { Form, Head } from '@inertiajs/react';
import { Fish, KeyRound } from 'lucide-react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { store } from '@/routes/password';

type Props = {
    token: string;
    email: string;
};

export default function ResetPassword({ token, email }: Props) {
    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-900">
            <Head title="Restablecer contraseña" />

            {/* Background imagen */}
            <img
                src="/img/hero-img.jpg"
                alt="Ocean Background"
                className="absolute inset-0 h-full w-full object-cover opacity-40"
            />

            {/* Overlay gradiente */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/30 to-blue-950" />

            {/* Card */}
            <div className="animate-fade-in relative z-10 w-full max-w-md px-4">
                <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-8 shadow-2xl backdrop-blur-md">

                    {/* Logo / Brand */}
                    <div className="mb-8 flex flex-col items-center gap-3">
                        <div className="rounded-full border border-blue-400/30 bg-blue-500/20 p-4 backdrop-blur-sm">
                            <Fish className="h-8 w-8 text-blue-300" />
                        </div>
                        <span className="rounded-full border border-blue-400/30 bg-blue-500/20 px-3 py-1 text-xs font-bold tracking-wide text-blue-300 backdrop-blur-sm">
                            PESCA MX · 2026
                        </span>
                    </div>

                    {/* Título */}
                    <div className="mb-6 text-center">
                        <h1 className="mb-2 text-3xl font-bold tracking-tight text-white">
                            Restablecer contraseña
                        </h1>
                        <p className="text-sm leading-relaxed font-light text-slate-300">
                            Ingresa tu nueva contraseña para recuperar el acceso a tu cuenta.
                        </p>
                    </div>

                    {/* Form */}
                    <Form
                        {...store.form()}
                        transform={(data) => ({ ...data, token, email })}
                        resetOnSuccess={['password', 'password_confirmation']}
                        className="space-y-4"
                    >
                        {({ processing, errors }) => (
                            <>
                                <div className="grid gap-2">
                                    <Label htmlFor="email" className="text-slate-300">
                                        Correo electrónico
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        autoComplete="email"
                                        value={email}
                                        readOnly
                                        className="border-white/10 bg-white/5 text-slate-400 placeholder:text-slate-500 focus:border-blue-500 cursor-not-allowed"
                                    />
                                    <InputError message={errors.email} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="password" className="text-slate-300">
                                        Nueva contraseña
                                    </Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        name="password"
                                        autoComplete="new-password"
                                        autoFocus
                                        placeholder="Nueva contraseña"
                                        className="border-white/10 bg-white/5 text-white placeholder:text-slate-500 focus:border-blue-500"
                                    />
                                    <InputError message={errors.password} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="password_confirmation" className="text-slate-300">
                                        Confirmar contraseña
                                    </Label>
                                    <Input
                                        id="password_confirmation"
                                        type="password"
                                        name="password_confirmation"
                                        autoComplete="new-password"
                                        placeholder="Confirmar contraseña"
                                        className="border-white/10 bg-white/5 text-white placeholder:text-slate-500 focus:border-blue-500"
                                    />
                                    <InputError message={errors.password_confirmation} />
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full gap-2 bg-blue-600 text-white shadow-lg shadow-blue-900/30 transition-all hover:bg-blue-700 active:scale-95 disabled:opacity-60"
                                    disabled={processing}
                                    data-test="reset-password-button"
                                >
                                    {processing && <Spinner className="h-4 w-4" />}
                                    <KeyRound className="h-4 w-4" />
                                    Restablecer contraseña
                                </Button>
                            </>
                        )}
                    </Form>
                </div>
            </div>
        </div>
    );
}
