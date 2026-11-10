"use client";

import Link from "next/link";
import { useLanguage } from "./LanguageProvider";

export default function Navbar() {
  const { language, toggleLanguage } = useLanguage();
  const isArabic = language === "ar";

  return (
    <nav className="navbar">
      <Link href="/" className="brand">
        <span className="brand-icon">✦</span>
        {isArabic ? "مستكشف الفضاء" : "SPACE EXPLORER"}
      </Link>

      <div className="nav-links">
        <Link href="/">{isArabic ? "الرئيسية" : "Home"}</Link>
        <Link href="/#planets">{isArabic ? "الكواكب" : "Planets"}</Link>
        <Link href="/quiz">{isArabic ? "الاختبار" : "Quiz"}</Link>
      </div>

      <button
        className="language-button"
        onClick={toggleLanguage}
        aria-label="Change language"
      >
        <span>◎</span>
        {isArabic ? "English" : "العربية"}
      </button>
    </nav>
  );
}
