<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Restablece tu contraseña</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background-color: #0f172a;
            color: #e2e8f0;
            padding: 40px 16px;
        }

        .wrapper {
            max-width: 520px;
            margin: 0 auto;
        }

        /* Header */
        .header {
            text-align: center;
            margin-bottom: 32px;
        }

        .logo-circle {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 64px;
            height: 64px;
            border-radius: 50%;
            background-color: rgba(59, 130, 246, 0.2);
            border: 1px solid rgba(96, 165, 250, 0.3);
            margin-bottom: 12px;
        }

        .logo-circle svg {
            width: 32px;
            height: 32px;
            color: #93c5fd;
        }

        .badge {
            display: inline-block;
            background-color: rgba(59, 130, 246, 0.2);
            border: 1px solid rgba(96, 165, 250, 0.3);
            color: #93c5fd;
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 0.1em;
            padding: 4px 12px;
            border-radius: 9999px;
        }

        /* Card */
        .card {
            background-color: rgba(15, 23, 42, 0.85);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 16px;
            padding: 40px 36px;
        }

        .card-title {
            font-size: 24px;
            font-weight: 700;
            color: #ffffff;
            margin-bottom: 8px;
            text-align: center;
        }

        .card-description {
            font-size: 14px;
            color: #94a3b8;
            font-weight: 300;
            line-height: 1.6;
            text-align: center;
            margin-bottom: 32px;
        }

        /* Divider */
        .divider {
            border: none;
            border-top: 1px solid rgba(255, 255, 255, 0.08);
            margin: 28px 0;
        }

        /* Info block */
        .info-block {
            background-color: rgba(59, 130, 246, 0.08);
            border: 1px solid rgba(59, 130, 246, 0.25);
            border-radius: 10px;
            padding: 16px;
            margin-bottom: 28px;
            font-size: 13px;
            color: #93c5fd;
            line-height: 1.6;
        }

        /* Button */
        .btn-wrapper {
            text-align: center;
            margin-bottom: 28px;
        }

        .btn {
            display: inline-block;
            background-color: #2563eb;
            color: #ffffff !important;
            text-decoration: none;
            font-size: 15px;
            font-weight: 600;
            padding: 14px 36px;
            border-radius: 10px;
            letter-spacing: 0.01em;
        }

        /* URL fallback */
        .url-fallback {
            font-size: 12px;
            color: #64748b;
            line-height: 1.6;
            margin-bottom: 24px;
        }

        .url-fallback a {
            color: #60a5fa;
            word-break: break-all;
        }

        /* Warning */
        .warning {
            font-size: 12px;
            color: #64748b;
            line-height: 1.6;
            text-align: center;
        }

        /* Footer */
        .footer {
            text-align: center;
            margin-top: 28px;
            font-size: 12px;
            color: #475569;
        }
    </style>
</head>
<body>
<div class="wrapper">

    {{-- Header --}}
    <div class="header">
        <div class="logo-circle">
            {{-- Fish icon inline SVG --}}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                 stroke="#93c5fd" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M6.5 12c.94-3.46 4.94-6 8.5-6 3.56 0 6.06 2.54 7 6-.94 3.46-3.44 6-7 6s-7.56-2.54-8.5-6z" />
                <path d="M18 12v.5" />
                <path d="M16 17.93a9.77 9.77 0 0 1 0-11.86" />
                <path d="M7 10.67C7 8 5.58 5.97 2.73 5.5c-1 3.98-.43 7.14.88 9.5H6c2.34 0 4-1.7 4-4 0 0-2 0-3 .17" />
                <path d="M10.46 7.26C10.2 5.88 9.17 4.24 8 3h5.8a2 2 0 0 1 1.98 1.67l.23 1.4" />
            </svg>
        </div>
        <br />
        <span class="badge">PESCA MX · 2026</span>
    </div>

    {{-- Card --}}
    <div class="card">
        <h1 class="card-title">Restablece tu contraseña</h1>
        <p class="card-description">
            Recibimos una solicitud para restablecer la contraseña de tu cuenta.<br />
            Haz clic en el botón para continuar.
        </p>

        {{-- Info: expiración --}}
        <div class="info-block">
            ⏱ Este enlace expirará en
            <strong>{{ config('auth.passwords.'.config('auth.defaults.passwords').'.expire') }} minutos</strong>.
            Si no lo solicitaste, puedes ignorar este correo.
        </div>

        {{-- Botón CTA --}}
        <div class="btn-wrapper">
            <a href="{{ $url }}" class="btn">
                Restablecer contraseña
            </a>
        </div>

        <hr class="divider" />

        {{-- URL fallback --}}
        <div class="url-fallback">
            Si el botón no funciona, copia y pega este enlace en tu navegador:<br />
            <a href="{{ $url }}">{{ $url }}</a>
        </div>

        {{-- Warning --}}
        <p class="warning">
            Si no solicitaste restablecer tu contraseña,<br />
            no es necesario realizar ninguna acción.
        </p>
    </div>

    {{-- Footer --}}
    <div class="footer">
        © {{ date('Y') }} Pesca MX · Todos los derechos reservados
    </div>

</div>
</body>
</html>
