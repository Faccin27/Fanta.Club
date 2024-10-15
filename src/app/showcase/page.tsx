import Showcase from "@/components/Showcase";
import showcaseData from "@/data/showcase.json";

export default function MainComponent() {
  return (
    <>
      <Showcase videos={showcaseData.videos}/>
    </>
  );
}
