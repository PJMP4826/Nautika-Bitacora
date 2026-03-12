import { Form, Head } from '@inertiajs/react';
import { Fish, Mail } from 'lucide-react';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { login } from '@/routes';
import { email } from '@/routes/password';

export default function ForgotPassword({ status }: { status?: string }) {
    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-900">
            <Head title="Recuperar contraseña" />

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
                            Recuperar contraseña
                        </h1>
                        <p className="text-sm leading-relaxed font-light text-slate-300">
                            Ingresa tu correo y te enviaremos un enlace para restablecer tu contraseña.
                        </p>
                    </div>

                    {/* Banner de éxito */}
                    {status && (
                        <div className="animate-fade-in mb-6 flex items-start gap-3 rounded-lg border border-blue-500/30 bg-blue-500/10 p-4 text-sm text-blue-300 backdrop-blur-sm">
                            <Mail className="mt-0.5 h-4 w-4 shrink-0" />
                            <span>{status}</span>
                        </div>
                    )}

                    {/* Form */}
                    <Form {...email.form()} className="space-y-4">
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
                                        autoComplete="off"
                                        autoFocus
                                        placeholder="correo@ejemplo.com"
                                        className="border-white/10 bg-white/5 text-white placeholder:text-slate-500 focus:border-blue-500"
                                    />
                                    <InputError message={errors.email} />
                                </div>

                                <Button
                                    className="w-full gap-2 bg-blue-600 text-white shadow-lg shadow-blue-900/30 transition-all hover:bg-blue-700 active:scale-95 disabled:opacity-60"
                                    disabled={processing}
                                    data-test="email-password-reset-link-button"
                                >
                                    {processing && <Spinner className="h-4 w-4" />}
                                    Enviar enlace de recuperación
                                </Button>

                                <div className="pt-2 text-center">
                                    <TextLink
                                        href={login()}
                                        className="text-sm text-slate-400 transition-colors hover:text-slate-200"
                                    >
                                        Volver al inicio de sesión
                                    </TextLink>
                                </div>
                            </>
                        )}
                    </Form>
                </div>
            </div>
        </div>
    );
}
