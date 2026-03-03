# Kannada Localization Plan (Start to End)

This guide gives a practical, incremental path to convert the Farmer's Assistant project into a complete Kannada-first product.

## 1) Product and language decisions

- Primary language: Kannada (`kn`).
- Secondary language fallback: English (`en`) for missing strings.
- Translation style: farmer-friendly Kannada (simple words, short UI labels).
- Font strategy: use system fonts that render Kannada correctly.

## 2) Frontend localization architecture

Create one translation source per language:

```text
client/src/locales/kn/common.json
client/src/locales/en/common.json
```

Use app-level language context:

```jsx
// client/src/context/LanguageContext.jsx
const { language, changeLanguage, t } = useLanguage();
```

Example usage:

```jsx
<h1>{t("home.featuresTitle")}</h1>
<button>{t("home.subscribe")}</button>
```

## 3) Backend localization (API + validation)

1. Return message keys from API (`error.invalidPhone`) instead of hardcoded English.
2. Resolve keys in frontend via `t(key)`.
3. Keep data fields language-neutral (`cropName`, `soilType`) and localize labels only.

## 4) Database and content strategy

For user-visible master data (crops, diseases, fertilizers), store multilingual fields:

```json
{
  "name": {
    "en": "Sugarcane",
    "kn": "ಕಬ್ಬು"
  },
  "description": {
    "en": "High water requirement",
    "kn": "ಹೆಚ್ಚು ನೀರಿನ ಅವಶ್ಯಕತೆ"
  }
}
```

## 5) QA checklist

- Kannada text visible on: Header, Home, About, AgriHelp, Services, Dashboard.
- No clipped Kannada text on mobile.
- Forms, alerts, toasts localized.
- Fallback language works when key missing.
- Date/number/currency formats are localized.

## 6) Rollout plan

- Phase 1: Navigation + landing pages.
- Phase 2: AgriHelp and Services modules.
- Phase 3: Dashboard/profile/admin pages.
- Phase 4: API response keys + seed data localization.
- Phase 5: QA + farmer UAT + production release.

## 7) Developer workflow

1. Add new key in `common.json`.
2. Use `t("...")` in component.
3. Add same key in both `kn` and `en` files.
4. Validate in UI and mobile breakpoint.

This keeps the project maintainable while moving steadily toward complete Kannada coverage.
