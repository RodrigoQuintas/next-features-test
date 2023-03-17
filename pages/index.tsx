import Router from "next/router";

export default function Home() {
  return (
    <>
      <div>
        <h1>Exemplo Client Side Render (CSR)</h1>
        <p>Exemplo de como utilizamos hoje na solidos</p>
        <button onClick={() => Router.push("/example-csr")}>
          Abrir exemplo CSR
        </button>
      </div>

      <div>
        <h1>Exemplo Server Side Render (SSR)</h1>
        <p>
          Exemplo de SSR básico, sem cache, somente gerando a página no server
        </p>
        <button onClick={() => Router.push("/example-ssr")}>
          Abrir exemplo SSR
        </button>
      </div>

      <div>
        <h1> Exemplo Incremental Static Regeneration (ISR)</h1>
        <p>
          Exemplo de ISR básico utilizando cache. Esse é o modelo mais legal.
        </p>
        <button onClick={() => Router.push("/example-isr")}>
          Abrir exemplo ISR
        </button>
      </div>
    </>
  );
}
