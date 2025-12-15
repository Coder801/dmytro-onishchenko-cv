import type { GetServerSideProps } from "next";
import Head from "next/head";
import { Typography } from "@/ui/Typography";
import { Title } from "@/components/Title";
import { fetchVacancy } from "@/server/routes/fetchVacancy";

type PageProps = {
  slug: string;
  data: Record<string, unknown> | null;
  error?: string;
};

export const getServerSideProps: GetServerSideProps<PageProps> = async (ctx) => {
  const slug = String(ctx.params?.slug ?? "");

  try {
    const data = await fetchVacancy({ slug });
    return { props: { slug, data } };
  } catch (err) {
    return {
      props: {
        slug,
        data: null,
        error: err instanceof Error ? err.message : String(err),
      },
    };
  }
};

export default function VacancyPage({ slug, data, error }: PageProps) {
  return (
    <>
      <Head>
        <title>Vacancy: {slug}</title>
        <meta name="robots" content="noindex" />
      </Head>
      <main style={{ padding: "24px" }}>
        <Title tag="h1">Vacancy: {slug}</Title>
        {error ? (
          <Typography variant="secondary" size="m">
            {error}
          </Typography>
        ) : (
          <>
            <Typography size="m">
              Ниже загружены данные вакансии (JSON). В dev они читаются из
              `src/data/vacancies/{slug}.json`, в production — из JSONBin.
            </Typography>
            <pre
              style={{
                marginTop: 16,
                padding: 16,
                background: "#f6f8fa",
                overflowX: "auto",
                borderRadius: 8,
              }}
            >
              {JSON.stringify(data, null, 2)}
            </pre>
          </>
        )}
      </main>
    </>
  );
}


