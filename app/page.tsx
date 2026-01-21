import Feed from "@/components/Feed";
import HeroStory from "@/components/stories/HeroStory";
import MemoriesStory from "@/components/stories/MemoriesStory";
import ReasonsStory from "@/components/stories/ReasonsStory";
import SurpriseStory from "@/components/stories/SurpriseStory";
import FinalStory from "@/components/stories/FinalStory";
import AudioPlayer from "@/components/AudioPlayer";

export default function Home() {
  return (
    <>
      <AudioPlayer />
      <Feed>
        <HeroStory />
        <MemoriesStory />
        <ReasonsStory />
        <SurpriseStory />
        <FinalStory />
      </Feed>
    </>
  );
}
