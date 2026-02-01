import { Link } from '@inertiajs/react';

type Breadcrumb = {
    label: string
    url?: string | null
}

export function Breadcrumbs({ items = []}: { items?: Breadcrumb[] }) {
    if (!items.length) return null

    return (
        <nav aria-label="breadcrumb">
            <ol className="flex gap-2 text-sm">
                {items.map((item, i) => (
                    <li key={i} className="flex gap-2">
                        {item.url ? (
                            <Link href={item.url} className="text-black-600 hover:underline">
                                {item.label}
                            </Link>
                        ) : (
                            <span className="font-semibold">{item.label}</span>
                        )}
                        {i < items.length - 1 && <span>/</span>}
                    </li>
                ))}
            </ol>
        </nav>
    )
}
