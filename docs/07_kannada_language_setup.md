# Kannada Language Setup (AgriCredit)

This project now includes an in-app language switcher that uses Google Translate and starts in **Kannada** by default.

## What was added

- Auto-translation component with a visible language selector (`ಕನ್ನಡ` / `English`).
- Kannada is selected by default for first-time users.
- User language choice is saved in browser `localStorage` (`agricredit-language`).

## How to run

1. Start backend:

```bash
npm run dev
```

2. Start frontend:

```bash
cd client
npm run dev
```

3. Open app in browser. You should see a language selector at the bottom-right.

## Notes

- Machine translation is used for dynamic language conversion.
- For production-grade Kannada quality, replace key UI labels with manual Kannada strings in each page/component.
- If translation does not appear immediately, refresh once after the page loads.
