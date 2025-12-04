"use client";

import { useReducer } from "react";
import Link from "next/link";

function counterReducer(state, action) {
    switch (action.type) {
        case "increment":
            return { count: state.count + 1 };
        case "decrement":
            return { count: state.count - 1 };
        case "reset":
            return { count: 0 };
        default:
            return state;
    }
}

const initialState = { count: 0 };

export default function UseReducerPage() {
    const [state, dispatch] = useReducer(counterReducer, initialState);

    return (
        <main>
            <h1>useReducer</h1>

            <p>
                <strong>Hva er det?</strong> useReducer er en alternativ måte å
                håndtere state på, spesielt når logikken blir litt mer kompleks
                enn det <code>useState</code> egner seg for.
            </p>

            <p>
                <strong>I dette eksempelet:</strong> Vi styrer en teller ved å
                sende <em>actions</em> til en reducer.
            </p>

            <div className='demo-box flex flex-col gap-4'>
                <p className='text-lg font-semibold'>
                    Antall: <span className='text-blue-600'>{state.count}</span>
                </p>

                <div className='flex gap-3 flex-wrap'>
                    <button
                        className='btn-primary'
                        onClick={() => dispatch({ type: "increment" })}
                    >
                        Øk
                    </button>

                    <button
                        className='btn-secondary'
                        onClick={() => dispatch({ type: "decrement" })}
                    >
                        Reduser
                    </button>

                    <button
                        className='btn-secondary'
                        onClick={() => dispatch({ type: "reset" })}
                    >
                        Reset
                    </button>
                </div>
            </div>

            <p className='mt-6'>
                <strong>Hva skjer her?</strong>
                <br />– Vi kaller ikke <code>setState</code> direkte
                <br />– I stedet sender vi en <em>action</em> med{" "}
                <code>dispatch</code>
                <br />– <code>counterReducer</code> bestemmer hva ny state skal
                bli
            </p>

            <pre>
                <code>{`function counterReducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "reset":
      return { count: 0 };
    default:
      return state;
  }
}

const [state, dispatch] = useReducer(counterReducer, { count: 0 });`}</code>
            </pre>

            <p className='mt-4'>
                <strong>Forskjell fra useState:</strong>
                <br />– <code>useState</code>: du setter verdien direkte
                <br />– <code>useReducer</code>: du ber en funksjon bestemme
                hvordan verdien skal endres
                <br />
                Perfekt når logikken blir litt mer avansert.
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
