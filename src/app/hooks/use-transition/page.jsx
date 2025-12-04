"use client";

import { useState, useTransition } from "react";
import Link from "next/link";

const bigList = Array.from({ length: 20000 }, (_, i) => `Element ${i + 1}`);

export default function UseTransitionPage() {
    const [search, setSearch] = useState("");
    const [results, setResults] = useState(bigList);
    const [isPending, startTransition] = useTransition();

    const handleChange = (e) => {
        const value = e.target.value;

        setSearch(value);

        startTransition(() => {
            const filtered = bigList.filter((item) =>
                item.toLowerCase().includes(value.toLowerCase())
            );
            setResults(filtered);
        });
    };

    return (
        <main>
            <h1>useTransition</h1>

            <p>
                <strong>Hva er det?</strong> useTransition lar oss merke noen
                state-oppdateringer som <em>mindre viktige</em>. Da kan React
                holde UI raskt, selv når det skjer tunge beregninger i
                bakgrunnen.
            </p>

            <p>
                <strong>I dette eksempelet:</strong> Søket i input-feltet er
                viktig og skal alltid være raskt. Filtreringen av en stor liste
                er mindre viktig og kjøres som en “transition”.
            </p>

            <div className='demo-box bg-white flex flex-col gap-4'>
                <label className='flex flex-col gap-2'>
                    <span className='text-sm text-slate-700'>
                        Søk i stor liste:
                    </span>
                    <input
                        type='text'
                        value={search}
                        onChange={handleChange}
                        className='w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900'
                        placeholder='Skriv noe raskt her...'
                    />
                </label>

                {isPending && (
                    <p className='text-sm text-orange-600'>
                        Oppdaterer listen i bakgrunnen...
                    </p>
                )}

                <p className='text-sm text-slate-600'>
                    Treff: <strong>{results.length}</strong>
                </p>
            </div>

            <div className='demo-box bg-white mt-4 max-h-64 overflow-auto text-sm'>
                {results.slice(0, 200).map((item) => (
                    <div key={item}>{item}</div>
                ))}
            </div>

            <p className='mt-6'>
                <strong>Hva skjer her?</strong>
                <br />– <code>setSearch</code> oppdaterer input umiddelbart (høy
                prioritet)
                <br />– <code>startTransition</code> sier til React: “Denne
                oppdateringen kan vente litt”
                <br />– React holder UI responsivt mens listen filtreres
            </p>

            <pre>
                <code>{`const [isPending, startTransition] = useTransition();

startTransition(() => {
  setResults(filteredList);
});`}</code>
            </pre>

            <p className='mt-4'>
                <strong>Når bruker du useTransition?</strong>
                <br />
                – Søk i store lister
                <br />
                – Filtrering
                <br />
                – Navigasjon med mye data
                <br />– Alle steder der UI må føles raskt selv om noe er tungt i
                bakgrunnen
            </p>

            <Link
                href='/'
                className='mt-6 py-4 px-4 inline-block btn-secondary rounded-2xl'
            >
                Tilbake til oversikten
            </Link>
        </main>
    );
}
