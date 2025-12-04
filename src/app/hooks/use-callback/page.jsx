"use client";

import { memo, useCallback, useState } from "react";
import Link from "next/link";

function PlainChild({ onClick }) {
    console.log("🔴 PlainChild rendret");

    return (
        <div className='demo-box bg-white flex flex-col gap-2'>
            <h2 className='font-semibold text-red-600'>Uten useCallback</h2>
            <p className='text-sm text-slate-600'>
                Sjekk konsollen for å se hvor ofte denne rendres.
            </p>
            <button className='btn-secondary' onClick={onClick}>
                Kjør callback
            </button>
            <p className='text-xs text-slate-500'>
                Får <code>onClick</code> som vanlig funksjon–prop.
            </p>
        </div>
    );
}

const MemoChild = memo(function MemoChild({ onClick }) {
    console.log("🟢 MemoChild rendret");

    return (
        <div className='demo-box bg-white flex flex-col gap-2'>
            <h2 className='font-semibold text-green-600'>
                Med useCallback + React.memo
            </h2>
            <p className='text-sm text-slate-600'>
                Sjekk konsollen for å se hvor ofte denne rendres.
            </p>
            <button className='btn-secondary' onClick={onClick}>
                Kjør callback
            </button>
            <p className='text-xs text-slate-500'>
                Rendres kun når props faktisk endrer seg.
            </p>
        </div>
    );
});

export default function UseCallbackPage() {
    const [count, setCount] = useState(0);
    const [unrelated, setUnrelated] = useState(0);

    const normalHandler = () => {
        alert("PlainChild callback ble trigget!");
    };

    const memoHandler = useCallback(() => {
        alert("MemoChild callback ble trigget!");
    }, []);

    return (
        <main>
            <h1>useCallback</h1>

            <p>
                <strong>Hva er det?</strong> useCallback brukes til å{" "}
                <em>huske en funksjon</em> mellom renders, slik at den ikke får
                ny referanse hver gang komponenten rendres.
            </p>

            <p>
                <strong>Hvorfor bryr vi oss?</strong> Når vi sender funksjoner
                som props til memoiserte barnekomponenter (
                <code>React.memo</code>), vil en ny funksjon hver gang føre til
                unødvendige re-renders. useCallback holder funksjonsreferansen
                stabil.
            </p>

            <div className='demo-box bg-white flex flex-col gap-3 mt-4'>
                <p>
                    <strong>Parent-state:</strong>
                </p>
                <p>
                    Telleren <code>count</code>:{" "}
                    <span className='font-bold text-blue-600'>{count}</span>
                </p>
                <p>
                    Urelatert verdi <code>unrelated</code>:{" "}
                    <span className='font-bold text-purple-600'>
                        {unrelated}
                    </span>
                </p>

                <div className='flex gap-3 flex-wrap'>
                    <button
                        className='btn-primary'
                        onClick={() => setCount((c) => c + 1)}
                    >
                        Øk count
                    </button>
                    <button
                        className='btn-secondary'
                        onClick={() => setUnrelated((u) => u + 1)}
                    >
                        Oppdater noe urelatert
                    </button>
                </div>

                <p className='text-xs text-slate-500'>
                    Begge knappene får parent til å rendre. Følg med i{" "}
                    <strong>konsollen</strong> på hvor ofte de to barne-
                    komponentene rendres.
                </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
                <PlainChild onClick={normalHandler} />
                <MemoChild onClick={memoHandler} />
            </div>

            <p className='mt-6'>
                <strong>Hva ser du i konsollen?</strong>
                <br />– Hver gang parent rendres, vil <code>
                    PlainChild
                </code>{" "}
                logge <code>&quot;🔴 PlainChild rendret&quot;</code>
                <br />– <code>MemoChild</code> logger{" "}
                <code>&quot;🟢 MemoChild rendret&quot;</code> kun når{" "}
                <code>memoHandler</code>-funksjonen faktisk endres (som den{" "}
                <em>ikke</em> gjør pga <code>useCallback</code>).
            </p>

            <pre className='mt-4'>
                <code>{`const memoHandler = useCallback(() => {
  alert("MemoChild callback ble trigget!");
}, []);`}</code>
            </pre>

            <p className='mt-4'>
                <strong>Kort sagt:</strong> useCallback er nyttig når du:
                <br />
                – sender funksjoner som props til memoiserte komponenter
                <br />– vil unngå unødvendige re-renders
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
