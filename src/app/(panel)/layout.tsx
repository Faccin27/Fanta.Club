import Main from "@/components/Main";

interface MainComponentProps {
  pageProps: any; // Defina o tipo correto para 'pageProps', se disponível.
}

export default function MainComponent({ pageProps }: MainComponentProps) {
  return (
    <>
      <Main {...pageProps} />
    </>
  );
}
