import { Form, Head, Link } from '@inertiajs/react';
import { register } from '@/routes';
import { request } from '@/routes/password';
import { store } from '@/routes/login';

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
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <Head title="Log in" />

            <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
                <h1 className="text-2xl font-semibold text-gray-900">
                    Log in to your account
                </h1>
                <p className="mt-2 text-sm text-gray-600">
                    Enter your email and password below to log in
                </p>

                {status && (
                    <div className="mt-4 text-sm font-medium text-green-600">
                        {status}
                    </div>
                )}

                <Form
                    {...store.form()}
                    resetOnSuccess={['password']}
                    className="mt-6 space-y-6"
                >
                    {({ processing, errors }) => (
                        <>
                            {/* Email */}
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    required
                                    autoFocus
                                    autoComplete="email"
                                    placeholder="email@example.com"
                                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                                />
                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            {/* Password */}
                            <div>
                                <div className="flex items-center justify-between">
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        Password
                                    </label>
                                    {canResetPassword && (
                                        <Link
                                            href={request()}
                                            className="text-sm text-gray-600 hover:text-black"
                                        >
                                            Forgot password?
                                        </Link>
                                    )}
                                </div>

                                <input
                                    id="password"
                                    type="password"
                                    name="password"
                                    required
                                    autoComplete="current-password"
                                    placeholder="Password"
                                    className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                                />

                                {errors.password && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            {/* Remember Me */}
                            <div className="flex items-center">
                                <input
                                    id="remember"
                                    type="checkbox"
                                    name="remember"
                                    className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                                />
                                <label
                                    htmlFor="remember"
                                    className="ml-2 text-sm text-gray-700"
                                >
                                    Remember me
                                </label>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {processing ? 'Logging in...' : 'Log in'}
                            </button>

                            {/* Register */}
                            {canRegister && (
                                <div className="text-center text-sm text-gray-600">
                                    Don’t have an account?{' '}
                                    <Link
                                        href={register()}
                                        className="font-medium text-black hover:underline"
                                    >
                                        Sign up
                                    </Link>
                                </div>
                            )}
                        </>
                    )}
                </Form>
            </div>
        </div>
    );
}
