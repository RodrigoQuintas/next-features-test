import { useEffect, useState } from "react";

export default function ExampleCsr() {
  const [repositories, setRepositories] = useState<string[]>([]);
  useEffect(() => {
    fetch(
      "https://api.github.com/search/repositories?q=language:javascript&order=stars&page=1&per_page=10",
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
        },
      }
    )
      .then((response) => {
        if (response) {
          return response.json();
        }
      })
      .then((data) => {
        if (data.items) {
          const repositoryNames = data.items.map((item: any) => item.name);
          setRepositories(repositoryNames);
        }
      });
  }, []);

  return (
    <>
      <h2>Exemplo de client side render </h2>
      <p>
        Após acesso do usuário na aplicação os dados são buscados na API. <br />
        Como a chamada http está ocorrendo via javascript pela parte do browser,
        caso desabilitar o javascript da página ela para de funcionar.
      </p>
      <ul>
        {repositories.map((repo: any) => (
          <li key={repo}>{repo}</li>
        ))}
      </ul>
    </>
  );
}
