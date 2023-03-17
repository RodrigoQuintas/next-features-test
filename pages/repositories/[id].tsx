import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";

export default function RepositoryDetail({ repository }: any) {
  const { isFallback } = useRouter();

  if (isFallback) {
    return <p>Carregando...</p>;
  }

  return (
    <>
      <h1>{repository?.name}</h1>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  /**
   * paths deixa páginas provisionadas
   * Ex.: adicionar produto mais comprados em um Ecomerce
   */
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params as any;

  const response = await fetch(`https://api.github.com/repositories/${id}`, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
    },
  });
  let repository = {};
  const data = await response.json();
  if (data) {
    repository = data;
  }
  return {
    props: {
      repository,
    },
    revalidate: 10,
  };
};
