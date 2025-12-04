"use client";

import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import Link from "next/link";

const CustomInput = forwardRef(function CustomInput(props, ref) {
    const innerRef = useRef(null);
    const [value, setValue] = useState("");

    useImperativeHandle(ref, () => ({
        focus() {
            if (innerRef.current) {
                innerRef.current.focus();
            }
        },
        clear() {
            setValue("");
            if (innerRef.current) {
                innerRef.current.focus();
            }
        },
        getValue() {
            return value;
        },
    }));

    return (
        <input
            ref={innerRef}
            type='text'
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className='w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
            placeholder='Skriv noe her...'
        />
    );
});

export default function UseImperativeHandlePage() {
    const inputRef = useRef(null);

    const handleFocus = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const handleClear = () => {
        if (inputRef.current) {
            inputRef.current.clear();
        }
    };

    const handleAlert = () => {
        if (inputRef.current) {
            alert(`Verdien er: "${inputRef.current.getValue()}"`);
        }
    };

    return (
        <main>
            <h1>useImperativeHandle</h1>

            <p>
                <strong>Hva er det?</strong> useImperativeHandle lar en
                komponent selv bestemme <em>hva</em> som eksponeres via{" "}
                <code>ref</code> til forelderen. Du bygger ditt eget lille
                &quot;kontrollpanel&quot;.
            </p>

            <p>
                <strong>I dette eksempelet:</strong> Forelderen kan fokusere,
                tømme og lese verdien fra et input-felt ved å kalle metoder på{" "}
                <code>ref.current</code>.
            </p>

            <div className='demo-box bg-white flex flex-col gap-4'>
                <label className='flex flex-col gap-2 w-full'>
                    <span className='text-sm font-medium text-slate-700'>
                        CustomInput (styres via ref):
                    </span>
                    <CustomInput ref={inputRef} />
                </label>

                <div className='flex gap-3 flex-wrap'>
                    <button className='btn-primary' onClick={handleFocus}>
                        Fokuser feltet
                    </button>

                    <button className='btn-secondary' onClick={handleClear}>
                        Tøm feltet
                    </button>

                    <button className='btn-secondary' onClick={handleAlert}>
                        Vis verdi i alert
                    </button>
                </div>

                <p className='text-sm text-slate-600'>
                    Legg merke til at forelderen ikke vet noe om{" "}
                    <code>useState</code> inni <code>CustomInput</code> – den
                    snakker kun med de metodene vi har valgt å eksponere via{" "}
                    <code>useImperativeHandle</code>.
                </p>
            </div>

            <p className='mt-6'>
                <strong>Teknisk:</strong>
                <br />– <code>forwardRef</code> lar oss ta imot en{" "}
                <code>ref</code> i en funksjonskomponent
                <br />–{" "}
                <code>
                    useImperativeHandle(ref, () =&gt; (&#123; ... &#125;))
                </code>{" "}
                sier: &quot;Dette er API-et du får på <code>ref.current</code>
                &quot;
            </p>

            <pre>
                <code>{`useImperativeHandle(ref, () => ({
  focus() {
    innerRef.current.focus();
  },
  clear() {
    setValue("");
  },
  getValue() {
    return value;
  },
}));`}</code>
            </pre>

            <p className='mt-4'>
                <strong>Når bruker du dette?</strong>
                <br />– Når du lager <em>komponenter</em> som trenger et lite
                &quot;imperativt API&quot;
                <br />
                – F.eks. custom input-komponenter, modaler, step-wizards osv.
                <br />– Dette er en litt avansert hook – du vil ikke bruke den
                ofte, men den er veldig nyttig når du først trenger den.
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
