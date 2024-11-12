import Verify from "@/components/verify";

interface PageProps {
  params: { id: string };
}

export default function Page({ params }: PageProps) {
  return <Verify id={params.id} />;
}