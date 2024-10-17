import UpdatesPage from "@/components/forum/update";

interface PageProps {
  params: { id: string };
}

export default function Page({ params }: PageProps) {
  return (
    <>
      <UpdatesPage id={params.id} />
    </>
  );
}