import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

const About = () => {
  const { t, language } = useLanguage();

  const points =
    language === "kn"
      ? [
          "🌱 ಮಣ್ಣಿನ ಪ್ರಕಾರಕ್ಕೆ ತಕ್ಕ ಬೆಳೆ ಶಿಫಾರಸು",
          "💧 ಬೆಳೆ ಆಧಾರಿತ ರಸಗೊಬ್ಬರ ಮಾರ್ಗದರ್ಶನ",
          "🚜 ಟ್ರಾಕ್ಟರ್ ಮತ್ತು ಕೃಷಿ ಸೇವೆಗಳ ನಿರ್ವಹಣೆ",
          "🛡️ ರೋಗಗಳು ಮತ್ತು ಕೀಟನಾಶಕ ಮಾಹಿತಿ"
        ]
      : [
          "🌱 Soil-aware crop recommendations",
          "💧 Crop-specific fertilizer guidance",
          "🚜 Tractor and agri-services management",
          "🛡️ Disease and pesticide information"
        ];

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-white text-[#283618] dark:bg-[#283618] dark:text-[#fefae0]">
      <div className="relative z-10 max-w-5xl mx-auto p-10 text-center">
        <motion.h1
          className="text-4xl font-bold text-green-800 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {t("about.title")}
        </motion.h1>

        <motion.p
          className="text-lg leading-relaxed mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        >
          {t("about.intro")}
        </motion.p>

        <h2 className="text-2xl font-semibold text-green-700 mb-3">
          {t("about.missionTitle")}
        </h2>
        <p className="text-lg leading-relaxed mb-8">{t("about.mission")}</p>

        <div className="grid gap-3 text-left max-w-2xl mx-auto">
          {points.map((item) => (
            <div key={item} className="bg-white/70 dark:bg-[#424242] p-4 rounded-lg shadow">
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
