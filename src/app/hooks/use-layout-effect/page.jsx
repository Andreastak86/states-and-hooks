"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";

export default function UseLayoutEffectPage() {
    const boxRef = useRef(null);

    const [widthWithEffect, setWidthWithEffect] = useState(0);
    const [widthWithLayoutEffect, setWidthWithLayoutEffect] = useState(0);

    useEffect(() => {
        if (boxRef.current) {
            setWidthWithEffect(boxRef.current.offsetWidth);
        }
    });

    useLayoutEffect(() => {
        if (boxRef.current) {
            setWidthWithLayoutEffect(boxRef.current.offsetWidth);
        }
    });

    return (
        <main>
            <h1>useLayoutEffect</h1>

            <p>
                <strong>Hva er det?</strong> useLayoutEffect er som useEffect,
                men den kjører <em>før</em> nettleseren får tegne skjermen.
            </p>

            <p>
                <strong>I dette eksempelet:</strong> Vi måler bredden på en boks
                på to måter – én gang med <code>useEffect</code> og én gang med{" "}
                <code>useLayoutEffect</code>.
            </p>

            <div className='demo-box bg-white flex flex-col gap-4 mt-6'>
                <div
                    ref={boxRef}
                    className='bg-blue-200 text-blue-900 p-4 rounded-md text-center font-semibold'
                >
                    Denne boksen måles i JS
                </div>

                <p>
                    Målt med <code>useEffect</code>:{" "}
                    <strong className='text-orange-600'>
                        {widthWithEffect}px
                    </strong>
                </p>

                <p>
                    Målt med <code>useLayoutEffect</code>:{" "}
                    <strong className='text-green-600'>
                        {widthWithLayoutEffect}px
                    </strong>
                </p>
            </div>

            <p className='mt-6'>
                <strong>Hva er forskjellen her egentlig?</strong>
                <br />– <code>useEffect</code> kjører etter at skjermen er malt
                <br />– <code>useLayoutEffect</code> kjører før skjermen vises
                <br />– For målinger og layout betyr dette at{" "}
                <code>useLayoutEffect</code> gir
                <em> flimmerfri og presis</em> oppførsel
            </p>

            <pre>
                <code>{`useLayoutEffect(() => {
  const width = boxRef.current.offsetWidth;
  setWidth(width);
});`}</code>
            </pre>

            <p className='mt-4'>
                <strong>Viktig:</strong> Du bruker nesten alltid{" "}
                <code>useEffect</code>. Du bruker <code>useLayoutEffect</code>{" "}
                kun når:
                <br />
                – du må lese layout (bredde, høyde, posisjon)
                <br />– og endre noe før brukeren ser skjermen
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
