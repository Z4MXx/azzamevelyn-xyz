"use client";
import { useState } from "react";
import { profile, skills, certificates, featuredProject } from "@/data/content";
import CertModal from "@/components/CertModal";

export default function Dashboard() {
  const [selectedCert, setSelectedCert] = useState<typeof certificates[number] | null>(null);

  return (
    <section className="min-h-screen bg-black/50 backdrop-blur-sm px-4 py-20">
      <div className="max-w-6xl mx-auto">
        {/* Bio Card */}
        <div className="mb-12 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-8">
          <p className="text-lg text-gray-300 leading-relaxed">{profile.bio}</p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Skills Column */}
          <div className="md:col-span-2 space-y-6">
            <h2 className="text-3xl font-bold text-white mb-6">Technical Skills</h2>
            <SkillGroup title="Cybersecurity" items={skills.cybersecurity} />
            <SkillGroup title="AI & Web Dev" items={skills.aiWebDev} />
            <SkillGroup title="IoT & Hardware" items={skills.iotHardware} />
          </div>

          {/* Featured Project */}
          <div>
            <a
              href={featuredProject.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-8 hover:border-[#00F0FF]/50 transition-colors h-full"
            >
              <h3 className="text-2xl font-bold text-white mb-3">
                {featuredProject.name}
              </h3>
              <p className="text-gray-400">{featuredProject.description}</p>
            </a>
          </div>
        </div>

        {/* Certificates Section */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-white mb-6">Certificates & Recognition</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certificates.map((cert, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedCert(cert)}
                className="rounded-lg bg-white/5 backdrop-blur-md border border-white/10 p-4 cursor-pointer hover:border-[#00F0FF]/50 transition-colors"
              >
                <p className="text-sm text-[#00F0FF] font-semibold">{cert.issuer}</p>
                <p className="text-white mt-1">{cert.title}</p>
              </div>
            ))}
          </div>
        </div>

        <CertModal cert={selectedCert} onClose={() => setSelectedCert(null)} />
      </div>
    </section>
  );
}

function SkillGroup({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-6">
      <h3 className="text-xl font-semibold text-white mb-4">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="px-4 py-2 rounded-full bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-[#00F0FF] text-sm"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}