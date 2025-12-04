"use client";

import { createContext, useContext, useState } from "react";
import Link from "next/link";

const ThemeContext = createContext();

function ThemeProvider({ children }) {
    const [theme, setTheme] = useState("light");

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

function ThemeBox() {
    const { theme, toggleTheme } = useContext(ThemeContext);

    const boxClasses =
        theme === "light"
            ? "demo-box bg-white text-slate-900"
            : "demo-box bg-slate-800 text-white";

    return (
        <div className={boxClasses}>
            <p className='text-lg font-semibold'>
                Nåværende tema: <span className='text-blue-500'>{theme}</span>
            </p>

            <button className='btn-primary mt-4' onClick={toggleTheme}>
                Bytt tema
            </button>
        </div>
    );
}

export default function UseContextPage() {
    return (
        <ThemeProvider>
            <main>
                <h1>useContext</h1>

                <p>
                    <strong>Hva er det?</strong> useContext lar oss dele data
                    globalt mellom komponenter, uten å sende props manuelt
                    nedover.
                </p>

                <p>
                    <strong>I dette eksempelet:</strong> Vi deler et tema
                    (light/dark) mellom komponenter helt uten props.
                </p>

                <ThemeBox />

                <p className='mt-6'>
                    <strong>Hva skjer her?</strong>
                    <br />– <code>ThemeProvider</code> holder på state
                    <br />
                    – Alle barn får tilgang til verdien
                    <br />– <code>useContext</code> henter verdien direkte der
                    den trengs
                </p>

                <pre>
                    <code>{`const ThemeContext = createContext();

const { theme, toggleTheme } = useContext(ThemeContext);`}</code>
                </pre>

                <p className='mt-4'>
                    Dette er ekstremt nyttig for:
                    <br />– innlogging
                    <br />– tema (lys/mørk)
                    <br />– språk
                    <br />– brukerroller
                </p>

                <Link
                    href='/'
                    className='mt-6 py-4 px-4 inline-block btn-secondary rounded-2xl'
                >
                    Tilbake til oversikten
                </Link>
            </main>
        </ThemeProvider>
    );
}
