"use client";

import Link from "next/link";
import { useState } from "react";

export default function UseStatePage() {
    const [count, setCount] = useState(0);

    return (
        <main>
            <h1>useState</h1>

            <p>
                <strong>Hva er det?</strong> useState lar en komponent huske en
                verdi som kan endre seg over tid.
            </p>

            <p>
                <strong>Eksempel:</strong> En enkel teller:
            </p>

            <div className='demo-box flex flex-col items-start gap-4'>
                <p className='text-lg font-semibold'>
                    Antall klikk: <span className='text-blue-600'>{count}</span>
                </p>

                <div className='flex gap-3'>
                    <button
                        className='btn-primary'
                        onClick={() => setCount(count + 1)}
                    >
                        Øk
                    </button>

                    <button
                        className='btn-secondary'
                        onClick={() => setCount(0)}
                    >
                        Reset
                    </button>
                </div>
            </div>

            <p className='mt-6'>
                Når vi klikker på knappen, kaller vi <code>setCount</code>.
                React oppdaterer verdien og tegner denne komponenten på nytt med
                den nye verdien av <code>count</code>.
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
