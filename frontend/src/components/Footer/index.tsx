import React from "react";
import { Building2, ShieldCheck, Github } from "lucide-react";
import { FooterSection } from "./FooterSection";
import { FooterLink } from "./FooterLink";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-200 rounded-lg blur opacity-75"></div>
                <div className="relative bg-white rounded-lg p-2">
                  <div className="relative">
                    <Building2 className="w-6 h-6 text-blue-600" />
                    <ShieldCheck className="absolute -bottom-1 -right-1 w-3 h-3 text-blue-500" />
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-gray-900 font-display text-lg font-bold">
                  TrustStay
                </h2>
                <p className="text-gray-500 text-xs">Verified Hotel Reviews</p>
              </div>
            </div>
            <p className="text-gray-500 text-sm">
              Bringing transparency and trust to hotel reviews through
              blockchain verification.
            </p>
          </div>

          {/* Product Section */}
          <FooterSection title="Product">
            <FooterLink href="#">How it Works</FooterLink>
            <FooterLink href="#">For Hotels</FooterLink>
            <FooterLink href="#">Pricing</FooterLink>
          </FooterSection>

          {/* Resources Section */}
          <FooterSection title="Resources">
            <FooterLink href="https://tlsnotary.org">TLSNotary</FooterLink>
            <FooterLink href="https://prove.email">ZKEmail</FooterLink>
            <FooterLink href="#">Documentation</FooterLink>
          </FooterSection>

          {/* Connect Section */}
          <FooterSection title="Connect">
            <div className="flex items-center space-x-4">
              <FooterLink href="https://github.com">
                <Github className="w-5 h-5" />
              </FooterLink>
              <span className="text-gray-300">|</span>
              <div className="bg-blue-50 px-4 py-2 rounded-lg">
                <p className="text-blue-600 text-xs font-mono">
                  Built with ❤️ at ETHIndia
                </p>
              </div>
            </div>
          </FooterSection>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-500 text-sm">
              © 2024 TrustStay. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <FooterLink href="#">Privacy Policy</FooterLink>
              <FooterLink href="#">Terms of Service</FooterLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
