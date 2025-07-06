# <img src="../assets/logo.png"> Tutorial 2 – Configuring settings.json

All the app's data is stored in two folders inside the `public` directory:
- `public/data/` ➔ This is where your portfolio’s content is stored.
- `public/images/` ➔ This folder holds all the images used in your portfolio.

The first file we’ll set up is `settings.json`, which contains your portfolio’s main settings. You’ll find it in the root of the `public/data/` folder. Go ahead and open this file in your code editor, so we can walk through its structure and settings.

## Developer settings

At the root of the `settings.json` file, you're going to find a section called `developerSettings`. This is where you can enable or disable certain debug features of the template. Here’s what each setting does:

| Field                      | Type   | Description                                                                                                                                                                                               |
|----------------------------|--------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `debugMode`                | BOOL   | When enabled, the app skips preload animations, transitions, and other effects that can slow down development. You can turn this on to hide the preloading screen while you tweak the theme, for example. |
| `fakeEmailRequests`        | BOOL   | When enabled, the app will simulate email requests instead of sending real emails.                                                                                                                        |
| `stayOnThePreloaderScreen` | BOOL   | When enabled, the app will stay on the preloader screen indefinitely, allowing you to test the preloader layout without having to reload the app multiple times.                                          |
| `version`                  | STRING | A string containing a version number for your portfolio (e.g., "1.0.0").                                                                                                                                  |

## Preloader Settings

The `preloaderSettings` section customizes the preloading screen that appears when you first load your portfolio. Here’s what you can configure:

| Field          | Type   | Description                                                                                                                                                              |
|----------------|--------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `enabled`      | BOOL   | When enabled (recommended), the preloader screen will be displayed when the app is loading.                                                                              |
| `title`        | STRING | The title displayed on the preloader screen. This is usually your name or the name of your portfolio.                                                                    |
| `subtitle`     | STRING | A subtitle that appears below the title on the preloader screen. This can be a short description or tagline about you or your portfolio.                                 |
| `logoOffset`   | OBJECT | An object containing three numeric properties `top`, `right` and `bottom`, allowing you to determine the offset between the logo and the titles on the preloader screen. |

## Template Settings

The `templateSettings` section contains various settings that control the overall appearance and behavior of your portfolio. Here’s what you can configure:

| Field                      | Type   | Description                                                                                                                                                                                |
|----------------------------|--------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `animatedBackground`       | BOOL   | When enabled, the background of the portfolio will have an animated effect.                                                                                                                |
| `animatedCursorEnabled`    | BOOL   | When enabled, the mouse cursor will have an animated effect. This setting has no impact on touch devices.                                                                                  |     
| `defaultLanguageId`        | STRING | The ID for the language that will be used by default in the portfolio. This should match one of the language IDs defined in the `supportedLanguages` section.                              |
| `defaultThemeId`           | STRING | The ID for the theme that will be used by default in the portfolio. This should match one of the theme IDs defined in the `supportedThemes` section.                                       |
| `fullscreenEnabled`        | BOOL   | When enabled, a fullscreen button will be displayed in the top right (when available), allowing users to toggle fullscreen mode.                                                           |
| `showSpinnerOnThemeChange` | BOOL   | When enabled, a spinner will be displayed when changing themes, providing visual feedback during the transition. This is useful if you have many images that change during a theme switch. |               

## Supported Languages
The `supportedLanguages` section lists all the languages your portfolio supports. Each language includes an ID, a name, and a URL for its flag icon. You **need to define at least one** language here. 

The `public/images/flags/` folder already contains a collection of flags for commonly used languages. If you require a specific flag icon that isn't there, you can download it [here](https://www.flaticon.com/packs/countrys-flags) for free.

To **deactivate support** for multiple languages, keep only a single language within the array. This will automatically hide the language picker menu.

## Supported Themes

The `supportedThemes` section defines the themes your portfolio can use. Each theme includes:

- A unique `id` to identify it (e.g., `"dark"` or `"light"`).
- An `icon` class for displaying a representative FontAwesome icon (e.g., `"fa-solid fa-moon"` for dark mode).
- A `dark` boolean indicating if it’s a dark theme (`true`) or light theme (`false`).
- A `locales` object with the theme’s name translated into various languages.

**Note**: You must also define at least one theme here. If you want to use only one theme, keep only that theme in the array, and the theme picker will be automatically hidden.

## Next Steps
Ready to keep going? Check out the next tutorial or revisit the previous one if you need a refresher:

⬅️ [Previous: Setting up the project](./TUTORIAL_01_SETTING_UP_THE_PROJECT.md)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
[Next: Title and Colors](./TUTORIAL_03_TITLES_AND_COLORS.md) ➡️ 