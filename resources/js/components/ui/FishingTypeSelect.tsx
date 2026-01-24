import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

type FishingType = {
    id: string
    name: string
}

type FishingTypeSelectProps = {
    value: string
    fishingTypes: FishingType[]
    onChange: (value: string) => void
}

export function FishingTypeSelect({ value, fishingTypes, onChange, }: FishingTypeSelectProps) {
    return (
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger className="w-full font-bold text-slate-900">
                <SelectValue placeholder="Seleccionar..." />
            </SelectTrigger>

            <SelectContent position={'popper'}>
                {fishingTypes.map((t) => (
                    <SelectItem key={t.id} value={t.id}>
                        {t.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}
