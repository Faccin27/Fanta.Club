import AnnouncementDetail from "@/components/forum/announcement";

interface PageProps {
  params: { id: string };
}

export default function Page({ params }: PageProps) {
  return (
    <>
      <AnnouncementDetail id={params.id} />
    </>
  );
}