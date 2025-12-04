"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function UseEffectPage() {
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        console.log("Hover-status endret:", isHovering);
    }, [isHovering]);

    return (
        <main>
            <h1>useEffect</h1>

            <p>
                <strong>Hva er det?</strong> useEffect lar oss kjøre kode som en
                reaksjon på at noe endrer seg.
            </p>

            <p>
                <strong>Her:</strong> useEffect reagerer når musepekeren går inn
                og ut av boksen.
            </p>

            <div className='demo-box flex flex-col items-start gap-4'>
                <div
                    className={`w-48 h-32 rounded-xl transition-colors duration-300 ${
                        isHovering ? "bg-green-300" : "bg-slate-200"
                    }`}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                />

                <p className='text-sm text-slate-600'>
                    Status:{" "}
                    <strong>
                        {isHovering
                            ? "Musen er over boksen"
                            : "Musen er ikke over boksen"}
                    </strong>
                </p>
            </div>

            <p className='mt-6'>
                👉 <code>useState</code> lagrer om vi hoovrer.
                <br />
                👉 <code>useEffect</code> reagerer når verdien endrer seg.
                <br />
                👉 Fargen styres direkte av state.
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
