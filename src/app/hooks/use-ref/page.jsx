"use client";

import { useRef } from "react";
import Link from "next/link";

export default function UseRefPage() {
    const inputRef = useRef(null);

    const handleFocusClick = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const handleSelectClick = () => {
        if (inputRef.current) {
            inputRef.current.select();
        }
    };

    return (
        <main>
            <h1>useRef</h1>

            <p>
                <strong>Hva er det?</strong> useRef brukes til å lagre en
                <em> referanse</em> til noe – ofte et DOM-element – uten at
                komponenten rendres på nytt når verdien endrer seg.
            </p>

            <p>
                <strong>I dette eksempelet:</strong> Vi bruker useRef for å få
                tak i et input-felt, slik at vi kan fokusere og markere teksten
                ved å trykke på knapper.
            </p>

            <div className='demo-box flex flex-col gap-4'>
                <label className='w-full flex flex-col gap-2'>
                    <span className='text-sm font-medium text-slate-700'>
                        Skriv noe her:
                    </span>
                    <input
                        ref={inputRef}
                        type='text'
                        className='w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                        placeholder='Prøv å skrive litt tekst...'
                    />
                </label>

                <div className='flex gap-3'>
                    <button className='btn-primary' onClick={handleFocusClick}>
                        Fokuser på feltet
                    </button>

                    <button
                        className='btn-secondary'
                        onClick={handleSelectClick}
                    >
                        Marker teksten
                    </button>
                </div>

                <p className='text-sm text-slate-600'>
                    Når du trykker på knappene, bruker vi{" "}
                    <code>inputRef.current</code> til å styre input-feltet
                    direkte.
                </p>
            </div>

            <p className='mt-6'>
                <strong>Teknisk forklart:</strong>
                <br />– <code>useRef(null)</code> lager en boks som kan holde på
                en verdi.
                <br />– Vi gir denne boksen til <code>ref</code>-propen på{" "}
                <code>{`<input />`}</code>.
                <br />– Etter at komponenten er tegnet, peker{" "}
                <code>inputRef.current</code> på selve input-elementet.
            </p>

            <pre>
                <code>{`const inputRef = useRef(null);

<input ref={inputRef} />

<button onClick={() => inputRef.current.focus()}>
  Fokuser på feltet
</button>`}</code>
            </pre>

            <p className='mt-4'>
                Forskjellen fra <code>useState</code> er at når{" "}
                <code>inputRef.current</code> endrer seg, så
                <em> rendres ikke</em> komponenten på nytt. Det er perfekt når
                vi bare vil snakke direkte med DOM-en.
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
