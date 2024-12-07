import React from "react";
import { Lock, Loader2 } from "lucide-react";

interface ProofGenerationOverlayProps {
  method: "zktls" | "zkemail" | null;
}

export const ProofGenerationOverlay: React.FC<ProofGenerationOverlayProps> = ({
  method,
}) => {
  const title =
    method === "zktls" ? "Generating ZKTLS Proof" : "Generating ZKEmail Proof";
  const logoUrl =
    method === "zktls"
      ? "https://tlsnotary.org/favicon.ico"
      : "https://prove.email/assets/Logo.svg";

  return (
    <div className="absolute inset-0 bg-white bg-opacity-90 flex flex-col items-center justify-center z-10 animate-fade-in">
      <div className="bg-blue-100 rounded-full p-3 mb-4 relative">
        <img
          src={logoUrl}
          alt={`${method} logo`}
          className="w-12 h-12 object-contain animate-pulse"
        />
        <div className="absolute -bottom-2 -right-2 bg-blue-500 rounded-full p-1">
          <Lock className="w-4 h-4 text-white" />
        </div>
      </div>
      <h3 className="text-xl font-semibold text-blue-800 mb-2">{title}</h3>
      <p className="text-blue-600">Please wait while we verify your proof...</p>
      <div className="mt-4">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    </div>
  );
};
