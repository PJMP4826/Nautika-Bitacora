import { Form, Head } from '@inertiajs/react';
import { Mail, Fish } from 'lucide-react';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { logout } from '@/routes';
import { send } from '@/routes/verification';

export default function VerifyEmail({ status }: { status?: string }) {
    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-900">
            <Head title="Verificación de correo" />

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
                            Verifica tu correo
                        </h1>
                        <p className="text-sm leading-relaxed font-light text-slate-300">
                            ¡Casi listos para zarpar! Verifica tu dirección haciendo clic en
                            el enlace que acabamos de enviarte.
                        </p>
                    </div>

                    {/* Banner de éxito */}
                    {status === 'verification-link-sent' && (
                        <div className="animate-fade-in mb-6 flex items-start gap-3 rounded-lg border border-blue-500/30 bg-blue-500/10 p-4 text-sm text-blue-300 backdrop-blur-sm">
                            <Mail className="mt-0.5 h-4 w-4 shrink-0" />
                            <span>
                                Se ha enviado un nuevo enlace de verificación a tu correo registrado.
                            </span>
                        </div>
                    )}

                    {/* Form */}
                    <Form {...send.form()} className="space-y-4">
                        {({ processing }) => (
                            <>
                                <Button
                                    disabled={processing}
                                    className="w-full gap-2 bg-blue-600 text-white shadow-lg shadow-blue-900/30 transition-all hover:bg-blue-700 active:scale-95 disabled:opacity-60"
                                >
                                    {processing && <Spinner className="h-4 w-4" />}
                                    Reenviar correo de verificación
                                </Button>

                                <div className="pt-2 text-center">
                                    <TextLink
                                        href={logout()}
                                        className="text-sm text-slate-400 transition-colors hover:text-slate-200"
                                    >
                                        Cerrar sesión
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
