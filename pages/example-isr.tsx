import { GetStaticProps } from "next";
import Router from "next/router";

const SECONDS_TO_REGENERATE_PAGE: number = 60;

export default function ExampleIsr({
  repositories,
  date,
}: {
  repositories: { name: string; id: string }[];
  date: string;
}) {
  const regeneratePage: any = async () => {
    fetch("/api/invalidator");
    setTimeout(() => {
      Router.reload();
    }, 1000);
  };

  return (
    <>
      <h2>INCREMENTAL STATIC REGENERATION (ISR)</h2>
      <p>
        Exemplo de server side render com ISR. <br />
        Quem é resposável por gerar o código da página é o servidor node
        embutido no nextjs. Em resumo, quando o cliente acessa a página ela já
        vem pronta (html, css e js). <br />
        Nesse exemplo a página é regerada após x segundos e um usuário acessar.{" "}
        <br />
        Também tem a opção de forçar a atualização
      </p>
      <p>
        Data de atualização da página: <b>{date}</b>
      </p>
      <ul>
        {repositories.map((repo: { name: string; id: string }) => (
          <li key={repo.id}>
            <a href={`/repositories/${repo.id}`}>{repo.name}</a>
          </li>
        ))}
      </ul>
      <button onClick={() => regeneratePage()}>Forçar Atualização</button>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch(
    "https://api.github.com/search/repositories?q=language:javascript&page=1&per_page=10",
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
      },
    }
  );

  let repositories = [];

  if (response) {
    const data = await response.json();
    if (data.items) {
      repositories = data.items.map((item: any) => ({
        name: item.full_name,
        id: item.id,
      }));
    }
  }

  return {
    props: {
      repositories,
      date: new Date().toISOString(),
    },
    revalidate: SECONDS_TO_REGENERATE_PAGE,
  };
};
