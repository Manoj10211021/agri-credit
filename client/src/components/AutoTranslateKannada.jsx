import { useEffect, useState } from "react";

const LANGUAGE_OPTIONS = [
  { value: "kn", label: "ಕನ್ನಡ" },
  { value: "en", label: "English" },
];

const STORAGE_KEY = "agricredit-language";

export default function AutoTranslateKannada() {
  const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.getItem(STORAGE_KEY) || "kn"
  );

  const updateGoogleSelect = (lang) => {
    const select = document.querySelector(".goog-te-combo");
    if (!select) return;

    select.value = lang;
    select.dispatchEvent(new Event("change"));
  };

  const applyLanguage = (lang) => {
    document.cookie = `googtrans=/en/${lang};path=/`;
    document.cookie = `googtrans=/en/${lang};domain=${window.location.hostname};path=/`;
    updateGoogleSelect(lang);
  };

  useEffect(() => {
    const ensureGoogleTranslateElement = () => {
      if (!document.getElementById("google_translate_element")) {
        const element = document.createElement("div");
        element.id = "google_translate_element";
        element.style.display = "none";
        document.body.appendChild(element);
      }
    };

    const initTranslate = () => {
      ensureGoogleTranslateElement();
      if (window.google?.translate?.TranslateElement) {
        // eslint-disable-next-line no-new
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,kn",
            autoDisplay: false,
          },
          "google_translate_element"
        );

        window.setTimeout(() => applyLanguage(selectedLanguage), 400);
      }
    };

    window.googleTranslateElementInit = initTranslate;

    if (window.google?.translate?.TranslateElement) {
      initTranslate();
      return;
    }

    const script = document.createElement("script");
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      delete window.googleTranslateElementInit;
    };
  }, []);

  const handleLanguageChange = (event) => {
    const lang = event.target.value;
    setSelectedLanguage(lang);
    localStorage.setItem(STORAGE_KEY, lang);
    applyLanguage(lang);
  };

  return (
    <div className="fixed bottom-4 right-4 z-[60] bg-white/90 shadow-md border border-green-200 rounded-lg px-3 py-2 backdrop-blur-sm">
      <label htmlFor="language" className="text-xs text-green-800 font-semibold mr-2">
        ಭಾಷೆ:
      </label>
      <select
        id="language"
        value={selectedLanguage}
        onChange={handleLanguageChange}
        className="text-sm border border-green-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-400"
      >
        {LANGUAGE_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
