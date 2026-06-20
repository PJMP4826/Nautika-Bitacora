import type { WeatherDay, ZoneWeather } from '@/types/models';
import type { LucideIcon } from 'lucide-react';
import { Cloud, CloudFog, CloudLightning, CloudRain, CloudSnow, CloudSun, Sun, Thermometer, Waves, Wind } from 'lucide-react';

interface WeatherPanelProps {
    weather: ZoneWeather | null;
}

export default function WeatherPanel({ weather }: WeatherPanelProps) {
    if (!weather) {
        return (
            <div>
                <span className="mb-2 block text-xs font-bold tracking-wider text-slate-400 uppercase">Clima</span>
                <p className="text-sm text-slate-500">No se pudo obtener el clima para esta zona en este momento.</p>
            </div>
        );
    }

    const { current, daily } = weather;

    return (
        <div>
            <span className="mb-3 block text-xs font-bold tracking-wider text-slate-400 uppercase">Condiciones actuales</span>

            <div className="space-y-2">
                <WeatherStatRow icon={Thermometer} label="Temperatura" value={current.temperature} unit="°C" />
                <WeatherStatRow icon={Wind} label="Viento" value={current.windSpeed} unit="km/h" />
                <WeatherStatRow icon={Waves} label="Oleaje" value={current.waveHeight} unit="m" />
                <WeatherStatRow icon={Thermometer} label="Temp. del mar" value={current.seaSurfaceTemperature} unit="°C" />
            </div>

            <span className="mt-5 mb-2 block text-xs font-bold tracking-wider text-slate-400 uppercase">Próximos días</span>

            <div className="-mx-1 flex snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-2">
                {daily.map((day) => (
                    <DayCard key={day.date} day={day} />
                ))}
            </div>
        </div>
    );
}

function WeatherStatRow({ icon: Icon, label, value, unit }: { icon: LucideIcon; label: string; value: number | null; unit: string }) {
    return (
        <div className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2.5">
            <span className="flex items-center gap-2 text-sm text-slate-600">
                <Icon className="h-4 w-4 text-blue-600" />
                {label}
            </span>
            <span className="text-sm font-bold text-slate-900">{value !== null ? `${value} ${unit}` : '—'}</span>
        </div>
    );
}

function DayCard({ day }: { day: WeatherDay }) {
    const Icon = getWeatherIcon(day.weatherCode);

    return (
        <div className="min-w-28 flex-shrink-0 snap-start rounded-xl border border-slate-100 bg-slate-50 p-3 text-center">
            <p className="text-xs font-bold text-slate-500 capitalize">{formatDate(day.date)}</p>
            <Icon className="mx-auto my-2 h-5 w-5 text-blue-600" />
            <p className="text-sm font-semibold text-slate-900">
                {day.tempMax ?? '—'}° <span className="font-normal text-slate-400">/ {day.tempMin ?? '—'}°</span>
            </p>
            <p className="mt-1 text-[11px] text-slate-500">Oleaje {day.waveHeightMax ?? '—'} m</p>
        </div>
    );
}


function getWeatherIcon(code: number | null): LucideIcon {
    if (code === null) return Cloud;
    if (code === 0 || code === 1) return Sun;
    if (code === 2) return CloudSun;
    if (code === 3) return Cloud;
    if (code === 45 || code === 48) return CloudFog;
    if (code >= 95) return CloudLightning;
    if (code >= 71 && code <= 77) return CloudSnow;
    if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) return CloudRain;
    return Cloud;
}

function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString('es-MX', {
        weekday: 'short',
        day: 'numeric',
    });
}
