"use client";

import { useLanguage } from "./LanguageProvider";

export default function Footer() {
  const { language } = useLanguage();

  return (
    <footer className="footer">
      <div className="footer-brand">✦ SPACE EXPLORER</div>
      <p>
        {language === "ar"
          ? "رحلتك التعليمية لاكتشاف أسرار الكون."
          : "Your educational journey through the wonders of the universe."}
      </p>
      <span>© 2026 Space Explorer. All rights reserved.</span>
    </footer>
  );
}
