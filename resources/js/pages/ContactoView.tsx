import { useForm } from '@inertiajs/react';
import { Building2, MapPin, Phone } from 'lucide-react';
import React, { useState } from 'react';
import { NavigationBar } from '@/components/layout/Navbar';
import SuccessModal from '@/components/ui/SuccessModal';
import type { ViewType } from '@/types';

const ContactView = () => {
    const [currentView, setCurrentView] = useState<ViewType>('contact');
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Configuración del formulario de Inertia
    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        message: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Envío por POST a la ruta /contact
        post('/contact', {
            preserveScroll: true,
            onSuccess: () => {
                setIsModalOpen(true);
                reset(); // Limpia los campos tras éxito
            },
        });
    };

    return (
        <div className="min-h-screen bg-slate-900">
            <NavigationBar setCurrentView={setCurrentView} currentView={currentView} />
            <div className="bg-white min-h-screen text-gray-900 py-16 px-4 sm:px-6 lg:px-8 pt-30">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-extrabold mb-4 text-gray-900">Contáctanos</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Utilizamos un enfoque ágil para probar hipótesis y conectar con las necesidades
                            de tu audiencia de manera temprana y frecuente.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-2">
                            {/* Formulario vinculado a handleSubmit */}
                            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold mb-2 text-gray-700">Nombre</label>
                                    <input
                                        type="text"
                                        value={data.first_name}
                                        onChange={e => setData('first_name', e.target.value)}
                                        placeholder="Bonnie"
                                        className={`w-full bg-gray-50 border ${errors.first_name ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-blue-600 outline-none transition shadow-sm`}
                                    />
                                    {errors.first_name && <div className="text-red-500 text-xs mt-1">{errors.first_name}</div>}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold mb-2 text-gray-700">Apellido</label>
                                    <input
                                        type="text"
                                        value={data.last_name}
                                        onChange={e => setData('last_name', e.target.value)}
                                        placeholder="Green"
                                        className={`w-full bg-gray-50 border ${errors.last_name ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-blue-600 outline-none transition shadow-sm`}
                                    />
                                    {errors.last_name && <div className="text-red-500 text-xs mt-1">{errors.last_name}</div>}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold mb-2 text-gray-700">Tu email</label>
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={e => setData('email', e.target.value)}
                                        placeholder="nombre@flowbite.com"
                                        className={`w-full bg-gray-50 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-blue-600 outline-none transition shadow-sm`}
                                    />
                                    {errors.email && <div className="text-red-500 text-xs mt-1">{errors.email}</div>}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold mb-2 text-gray-700">Número de teléfono</label>
                                    <input
                                        type="text"
                                        value={data.phone}
                                        onChange={e => setData('phone', e.target.value)}
                                        placeholder="+52 993..."
                                        className={`w-full bg-gray-50 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-blue-600 outline-none transition shadow-sm`}
                                    />
                                    {errors.phone && <div className="text-red-500 text-xs mt-1">{errors.phone}</div>}
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold mb-2 text-gray-700">Tu mensaje</label>
                                    <textarea
                                        rows={6}
                                        value={data.message}
                                        onChange={e => setData('message', e.target.value)}
                                        placeholder="Deja un comentario..."
                                        className={`w-full bg-gray-50 border ${errors.message ? 'border-red-500' : 'border-gray-300'} rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-blue-600 outline-none transition resize-none shadow-sm`}
                                    ></textarea>
                                    {errors.message && <div className="text-red-500 text-xs mt-1">{errors.message}</div>}
                                </div>

                                <div className="md:col-span-2 text-sm text-gray-600">
                                    Al enviar este formulario, aceptas nuestros{' '}
                                    <a href="#" className="text-blue-600 hover:underline font-medium">términos y condiciones</a>.
                                </div>

                                <div className="md:col-span-2">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-3 px-8 rounded-lg transition duration-300 shadow-lg shadow-blue-200"
                                    >
                                        {processing ? 'Enviando...' : 'Enviar mensaje'}
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Información Lateral */}
                        <div className="space-y-12">
                            <div className="flex flex-col items-start text-left">
                                <div className="bg-blue-50 p-3 rounded-lg mb-4 text-blue-600">
                                    <Building2 className="w-6 h-6" />
                                </div>
                                <h3 className="font-bold text-lg mb-1 uppercase tracking-wider text-gray-900">Información de la empresa:</h3>
                                <p className="text-gray-600">Nautika Bitacora</p>
                            </div>

                            <div className="flex flex-col items-start text-left">
                                <div className="bg-blue-50 p-3 rounded-lg mb-4 text-blue-600">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <h3 className="font-bold text-lg mb-1 uppercase tracking-wider text-gray-900">Dirección:</h3>
                                <p className="text-gray-600">Villahermosa, Tabasco, México</p>
                            </div>

                            <div className="flex flex-col items-start text-left">
                                <div className="bg-blue-50 p-3 rounded-lg mb-4 text-blue-600">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <h3 className="font-bold text-lg mb-1 uppercase tracking-wider text-gray-900">Llámanos:</h3>
                                <a href="tel:+529932215164" className="text-blue-600 font-bold hover:text-blue-700 transition-colors">
                                    +52 9932215164
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal de éxito */}
            <SuccessModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
};

export default ContactView;
