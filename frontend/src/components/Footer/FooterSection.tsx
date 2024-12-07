import React from "react";

interface FooterSectionProps {
  title: string;
  children: React.ReactNode;
}

export const FooterSection: React.FC<FooterSectionProps> = ({
  title,
  children,
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
        {title}
      </h3>
      <div className="flex flex-col space-y-2">{children}</div>
    </div>
  );
};
