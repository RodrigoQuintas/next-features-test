import { GetServerSideProps } from "next";

export default function ExampleSsr({
  repositories,
  date,
}: {
  repositories: string[];
  date: string;
}) {
  return (
    <>
      <h2>SERVER SIDE RENDER (SSR)</h2>
      <p>
        Exemplo de server side render básico. <br />
        Quem é resposável por gerar o código da página é o servidor node
        embutido no nextjs. Em resumo, quando o cliente acessa a página ela já
        vem pronta (html, css e js). <br /> Nesse exemplo, uma nova página é
        gerada a cada acesso, pois ainda não estou utilizando Incremental Static
        Regeneration (ISR)
      </p>
      <p>
        Data de atualização da página: <b>{date}</b>
      </p>
      <ul>
        {repositories?.map((repo: string) => (
          <li key={repo}>{repo}</li>
        ))}
      </ul>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch(
    "https://api.github.com/search/repositories?q=language:javascript&page=1&per_page=10",
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
      },
    }
  );

  let repositoryNames = [];

  if (response) {
    const data = await response.json();
    if (data.items) {
      repositoryNames = data.items.map((item: any) => item.name);
    }
  }

  return {
    props: {
      repositories: repositoryNames,
      date: new Date().toISOString(),
    },
  };
};
