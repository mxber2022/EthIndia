import React from "react";
import { CheckCircle } from "lucide-react";

export const SuccessOverlay: React.FC = () => {
  return (
    <div className="absolute inset-0 bg-white bg-opacity-90 flex flex-col items-center justify-center z-10 animate-fade-in">
      <div className="bg-green-100 rounded-full p-3 mb-4">
        <CheckCircle className="w-12 h-12 text-green-500 animate-bounce" />
      </div>
      <h3 className="text-xl font-semibold text-green-800 mb-2">
        Review Submitted!
      </h3>
      <p className="text-green-600">Thank you for sharing your experience</p>
    </div>
  );
};
