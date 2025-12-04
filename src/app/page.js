"use client";

import Link from "next/link";

const hooks = [
    {
        href: "/hooks/use-state",
        label: "useState",
        description: "Lagrer verdier som kan endre seg over tid.",
    },
    {
        href: "/hooks/use-effect",
        label: "useEffect",
        description: "Kjører kode som en reaksjon på endringer.",
    },
    {
        href: "/hooks/use-ref",
        label: "useRef",
        description: "Holder på referanser uten å trigge re-render.",
    },
    {
        href: "/hooks/use-context",
        label: "useContext",
        description: "Deler data globalt uten å sende props.",
    },
    {
        href: "/hooks/use-reducer",
        label: "useReducer",
        description: "Mer strukturert state-håndtering (mini-Redux).",
    },
    {
        href: "/hooks/use-memo",
        label: "useMemo",
        description: "Husker resultatet av tunge beregninger.",
    },
    {
        href: "/hooks/use-callback",
        label: "useCallback",
        description: "Husker funksjoner mellom re-renders.",
    },
    {
        href: "/hooks/use-layout-effect",
        label: "useLayoutEffect",
        description: "Som useEffect, men kjører synkront etter layout.",
    },
    {
        href: "/hooks/use-imperative-handle",
        label: "useImperativeHandle",
        description: "Tilpasser hva refs eksponerer til foreldre.",
    },
    {
        href: "/hooks/use-transition",
        label: "useTransition",
        description: "Markerer oppdateringer som mindre viktige.",
    },
];

export default function HomePage() {
    return (
        <main>
            <h1>React Hooks – lekeplass</h1>

            <p>
                Velg en hook for å se en kort forklaring og et lite, praktisk
                eksempel. Perfekt for å øve, forklare videre – eller bare nerde.
            </p>

            <div className='mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                {hooks.map((hook) => (
                    <Link key={hook.href} href={hook.href} className='block'>
                        <div className='h-full demo-box bg-white hover:shadow-md transition flex flex-col justify-between w-full'>
                            <div>
                                <h2 className='text-base font-semibold mb-1 tracking-tight text-slate-900 wrap-break-word'>
                                    {hook.label}
                                </h2>
                                <p className='text-sm text-slate-600 leading-snug'>
                                    {hook.description}
                                </p>
                            </div>

                            <span className='mt-4 text-xs text-blue-600 font-medium'>
                                Åpne →
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </main>
    );
}
