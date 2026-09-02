import ParticleBackground from "@/components/ParticleBackground";
import Typewriter from "@/components/Typewriter";
import { profile } from "@/data/content";

export default function Home() {
  return (
    <main className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      <ParticleBackground />
      <div className="relative z-10 text-center px-4">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
          {profile.name}
        </h1>
        <p className="text-xl md:text-2xl text-cyan-400">
          <Typewriter text={profile.tagline} speed={80} />
        </p>
      </div>
    </main>
  );
}