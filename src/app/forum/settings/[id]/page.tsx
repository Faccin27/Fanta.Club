import SettingPage from "@/components/forum/setting";

interface PageProps {
  params: { id: string };
}

export default function Page({ params }: PageProps) {
  return (
    <>
      <SettingPage id={params.id} />
    </>
  );
}