import React from "react";
import { Dropdown } from "flowbite-react";
import { useLanguage } from "../context/LanguageContext";

export default function LanguageSwitcher() {
  const { language, changeLanguage, t } = useLanguage();

  return (
    <Dropdown label={`${t("language.label")}: ${language.toUpperCase()}`} size="xs" inline>
      <Dropdown.Item onClick={() => changeLanguage("kn")}>
        {t("language.kannada")}
      </Dropdown.Item>
      <Dropdown.Item onClick={() => changeLanguage("en")}>
        {t("language.english")}
      </Dropdown.Item>
    </Dropdown>
  );
}
