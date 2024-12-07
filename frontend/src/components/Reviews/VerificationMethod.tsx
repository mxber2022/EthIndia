import React from "react";
import { Lock } from "lucide-react";

interface VerificationMethodProps {
  method: "zktls" | "zkemail";
  isSelected: boolean;
  onClick: () => void;
  disabled?: boolean;
}

export const VerificationMethod: React.FC<VerificationMethodProps> = ({
  method,
  isSelected,
  onClick,
  disabled,
}) => {
  const isTLS = method === "zktls";
  const colorScheme = isTLS ? "blue" : "green";
  const title = isTLS ? "ZKTLS Proof" : "ZKEmail Proof";
  const description = isTLS
    ? "Verify with zero-knowledge TLS proof"
    : "Verify with zero-knowledge email proof";
  const logoUrl = isTLS ? "/tls.png" : "/zkemail.png";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex-1 p-4 rounded-lg border-2 transition-all duration-300 ${
        isSelected
          ? `border-${colorScheme}-500 bg-${colorScheme}-50`
          : `border-gray-200 hover:border-${colorScheme}-200`
      } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      <div className="flex flex-col items-center">
        <div
          className={`bg-${colorScheme}-100 p-3 rounded-full mb-2 relative group`}
        >
          <img
            src={logoUrl}
            alt={`${method} logo`}
            className="w-6 h-6 object-contain"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 rounded-full transition-all duration-300" />
        </div>
        <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
        <p className="text-sm text-gray-500 text-center">{description}</p>
      </div>
    </button>
  );
};
