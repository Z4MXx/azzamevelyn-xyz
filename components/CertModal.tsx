"use client";
import { useEffect } from "react";

type Cert = { issuer: string; title: string; image: string };

export default function CertModal({
  cert,
  onClose,
}: {
  cert: Cert | null;
  onClose: () => void;
}) {
  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!cert) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="max-w-md w-full rounded-2xl bg-[#030712] border border-white/10 p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-white transition-colors"
        >
          ×
        </button>
        <img
          src={cert.image}
          alt={cert.issuer}
          className="w-full rounded-lg mb-4"
        />
        <h3 className="text-xl font-semibold text-[#F9FAFB] mb-2">
          {cert.issuer}
        </h3>
        <p className="text-sm text-[#9CA3AF]">{cert.title}</p>
      </div>
    </div>
  );
}