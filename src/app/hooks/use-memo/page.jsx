"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

const bigList = Array.from({ length: 10000 }, (_, i) => i + 1);

function slowFilter(list, search) {
    console.log("🔁 TUNG filtrering kjører...");
    for (let i = 0; i < 200_000_000; i++) {}
    return list.filter((n) => n.toString().includes(search));
}

export default function UseMemoPage() {
    const [search, setSearch] = useState("");
    const [darkMode, setDarkMode] = useState(false);

    const filteredList = useMemo(() => {
        return slowFilter(bigList, search);
    }, [search]);

    return (
        <main className={darkMode ? "bg-slate-900 text-white" : ""}>
            <h1>useMemo</h1>

            <p>
                <strong>Hva er det?</strong> useMemo brukes for å{" "}
                <em>huske resultatet</em> av en tung beregning, slik at den ikke
                kjøres på nytt hver gang komponenten rendres.
            </p>

            <p>
                <strong>I dette eksempelet:</strong> Vi filtrerer en stor liste
                med <code>10 000</code> tall. Filtreringen er gjort kunstig
                treg.
            </p>

            <div className='demo-box bg-white flex flex-col gap-4'>
                <label className='flex flex-col gap-2'>
                    <span className='text-sm text-slate-700'>
                        Søk i tall (tung operasjon):
                    </span>
                    <input
                        type='text'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className='w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900'
                        placeholder='Skriv f.eks. 12'
                    />
                </label>

                <button
                    className='btn-secondary self-start'
                    onClick={() => setDarkMode((d) => !d)}
                >
                    Toggle dark mode (skal IKKE trigge ny filtrering)
                </button>

                <p className='text-sm text-slate-600'>
                    Treffer i listen: <strong>{filteredList.length}</strong>
                </p>
            </div>

            <p className='mt-6'>
                <strong>Viktig observasjon:</strong>
                <br />– Når du <strong>skriver i søket</strong> → tung
                filtrering kjøres
                <br />– Når du <strong>toggle dark mode</strong> → komponenten
                rendres på nytt, men den tunge filtreringen kjøres{" "}
                <strong>ikke på nytt</strong>
            </p>

            <pre>
                <code>{`const filteredList = useMemo(() => {
  return slowFilter(bigList, search);
}, [search]);`}</code>
            </pre>

            <p className='mt-4'>
                <strong>Uten useMemo:</strong>
                <br />
                Da ville <code>slowFilter</code> kjørt hver gang du trykket på
                dark mode-knappen – helt unødvendig.
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
