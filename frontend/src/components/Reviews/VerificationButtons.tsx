import React from "react";
import { VerificationMethod } from "./VerificationMethod";

interface VerificationButtonsProps {
  onSelectMethod: (method: "zktls" | "zkemail") => void;
  selectedMethod: "zktls" | "zkemail" | null;
  disabled?: boolean;
}

export const VerificationButtons: React.FC<VerificationButtonsProps> = ({
  onSelectMethod,
  selectedMethod,
  disabled,
}) => {
  return (
    <div className="flex gap-4">
      <VerificationMethod
        method="zktls"
        isSelected={selectedMethod === "zktls"}
        onClick={() => onSelectMethod("zktls")}
        disabled={disabled}
      />
      <VerificationMethod
        method="zkemail"
        isSelected={selectedMethod === "zkemail"}
        onClick={() => onSelectMethod("zkemail")}
        disabled={disabled}
      />
    </div>
  );
};
