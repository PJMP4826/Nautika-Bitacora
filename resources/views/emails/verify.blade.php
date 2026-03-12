<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Verifica tu cuenta</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0f172a; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #f8fafc;">
<table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
    <tr>
        <td align="center" style="padding: 40px 0;">
            <!-- Contenedor Principal -->
            <table border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: #1e293b; border-radius: 16px; overflow: hidden; border: 1px solid #334155;">

                <!-- Header con Gradiente -->
                <tr>
                    <td align="center" style="background: linear-gradient(to bottom, #1e3a8a, #1e293b); padding: 40px 20px;">
                            <span style="display: inline-block; padding: 4px 12px; background-color: rgba(59, 130, 246, 0.2); border: 1px solid rgba(96, 165, 250, 0.3); border-radius: 9999px; color: #93c5fd; font-size: 12px; font-weight: bold; letter-spacing: 1px; margin-bottom: 16px;">
                                NUEVA AVENTURA 2026
                            </span>
                        <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 800; letter-spacing: -0.5px;">
                            ¡Casi listo para <span style="color: #60a5fa;">navegar</span>!
                        </h1>
                    </td>
                </tr>

                <!-- Cuerpo del Mensaje -->
                <tr>
                    <td style="padding: 40px; text-align: center;">
                        <p style="margin: 0 0 20px; font-size: 18px; color: #cbd5e1; line-height: 1.6;">
                            Gracias por unirte a nuestra comunidad de pesca. Para acceder a las mejores zonas y detalles de especies, necesitamos confirmar tu correo.
                        </p>

                        <p style="margin: 0 0 30px; font-size: 14px; color: #94a3b8;">
                            Haz clic en el botón de abajo para verificar tu dirección de correo electrónico.
                        </p>

                        <!-- Botón Estilo Tailwind -->
                        <table border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto;">
                            <tr>
                                <td align="center" bgcolor="#2563eb" style="border-radius: 8px;">
                                    <a href="{{ $url }}" target="_blank" style="display: inline-block; padding: 14px 32px; font-size: 16px; font-weight: bold; color: #ffffff; text-decoration: none; border-radius: 8px;">
                                        Verificar mi cuenta
                                    </a>
                                </td>
                            </tr>
                        </table>

                        <p style="margin: 30px 0 0; font-size: 12px; color: #64748b;">
                            Si no creaste esta cuenta, puedes ignorar este mensaje de forma segura.
                        </p>
                    </td>
                </tr>

                <!-- Footer -->
                <tr>
                    <td style="padding: 20px; background-color: #0f172a; text-align: center; border-top: 1px solid #334155;">
                        <p style="margin: 0; font-size: 12px; color: #475569;">
                            &copy; {{ date('Y') }} Tu App de Pesca. Sin reservas, solo información pura.
                        </p>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>
</body>
</html>
