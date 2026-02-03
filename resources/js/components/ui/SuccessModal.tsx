import { CheckCircle2, X } from 'lucide-react';
import React from 'react';

interface SuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const SuccessModal = ({ isOpen, onClose }: SuccessModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Overlay (Fondo oscuro con desenfoque) */}
            <div
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Contenido del Modal */}
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-sm w-full p-8 text-center border border-gray-100 transform transition-all animate-in fade-in zoom-in duration-300">

                {/* Botón cerrar X */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <X size={20} />
                </button>

                {/* Icono de Éxito */}
                <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-50 mb-6">
                    <CheckCircle2 className="h-12 w-12 text-green-500" />
                </div>

                {/* Texto */}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    ¡Mensaje enviado!
                </h3>
                <p className="text-gray-600 mb-8">
                    Gracias por contactar a <span className="font-semibold text-gray-800">Nautika Bitacora</span>.
                    Hemos recibido tu información correctamente y te responderemos muy pronto.
                </p>

                {/* Botón de acción */}
                <button
                    onClick={onClose}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl transition-all duration-200 shadow-lg shadow-blue-200 active:scale-95"
                >
                    Entendido
                </button>
            </div>
        </div>
    );
};

export default SuccessModal;
