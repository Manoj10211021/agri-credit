import { useEffect } from "react";

export default function AutoTranslateKannada() {
  useEffect(() => {
    const ensureGoogleTranslateElement = () => {
      if (!document.getElementById("google_translate_element")) {
        const element = document.createElement("div");
        element.id = "google_translate_element";
        element.style.display = "none";
        document.body.appendChild(element);
      }
    };

    const triggerKannadaSelection = () => {
      const interval = window.setInterval(() => {
        const select = document.querySelector(".goog-te-combo");
        if (select) {
          select.value = "kn";
          select.dispatchEvent(new Event("change"));
          window.clearInterval(interval);
        }
      }, 400);

      window.setTimeout(() => window.clearInterval(interval), 8000);
    };

    const initTranslate = () => {
      ensureGoogleTranslateElement();
      if (window.google?.translate?.TranslateElement) {
        // eslint-disable-next-line no-new
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "kn",
            autoDisplay: false,
          },
          "google_translate_element"
        );
        triggerKannadaSelection();
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

  return null;
}
