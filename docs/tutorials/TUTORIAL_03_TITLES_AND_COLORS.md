# <img src="../assets/logo.png"> Tutorial 3 – Titles and Colors

## Title and Meta Tags

The page title, favicon, and meta tags can be customized directly in the `index.html` file. You may want to personalize these to better reflect your portfolio.

Here’s an example:

```html
<link rel="icon" type="image/svg+xml" href="/images/svg/logo.svg" />
<title>John Doe's Portfolio</title>

<meta name="description" content="Get to know more about John Doe."/>
<meta name="keywords" content="john,doe,portfolio,programmer,react"/>
```

## Preloader Colors

If you want to change the colors of the preloading screen, open the `src/styles/_constants.scss` file and update the following variables:

```scss
$loader-background: #1b2226; // making the loader background dark blue
$loader-contrast: #FFFFFF; // text and pacman animation color
$primary: #51a0c2; // the base primary color (used to color the pacman beans)
```

For a smoother visual transition, you can also match the splash screen background in `index.html` by setting the same background color:


```html
<body style="background-color: #1b2226">
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
</body>
```

The logo shown in the **preloader** is a static svg file located at `public/images/svg/logo.svg`. If you're customizing your theme's color scheme, it's a good idea to use a logo that visually matches your new colors for better consistency and aesthetics. 

If you want to create a **variation of the default template logo** with a different color, you can easily edit and export it as an SVG **for free** [here](https://www.svgrepo.com/svg/411136/code?edit=true).

## Theme Colors

Each theme has its own separate color schema file. The two default themes (dark and light) can be configured by editing the files `_variables-theme-dark.scss` and `_variables-theme-light.scss`, located inside the `src/styles/themes` folder.

### Customizing the Dark Theme

If you'd like the dark theme to use black and **blue** instead of black and **green**, open `_variables-theme-dark.scss` and update the following variable:

```scss
$primary: #8bdbf8; // making the dark theme primary color blue!
```

It's simple like that! You can also play around with other colors in the dark theme file to create a unique look.

### Customizing the Light Theme

To switch the light theme from green-based to **blue-based**, you can replace the green shades with blue ones like this:

```scss
$primary: #266c93;
$secondary: darken(#798ca0, 10%);
$dark: #bfd2e0;
$danger: #932626;
$muted: #7c879d;

$base-bg: #91b7d7;
$base-bg-light: #a6c9e3;
$base-bg-dark: #7ea6cb;

$texts: #20242a;
$texts-inverted: #EEE;

$base-container-bg: #d9e7f5;
$base-container-bg-accent: #c2d8e9;
$base-popover-bg: #cad4e1;
$base-boards: #d2dfee;
$base-info-badges: #c3d5e3;
$empty: #e8f1f8;

$borders: #d9e0ef;
$borders-nav-mobile: rgba(white, 0.15);
$borders-nav-mobile-accent: rgba(white, 0.2);
$scrollbar-track: #dae4f5;
$scrollbar-thumb: #5591bd;
```

And that’s it! Your theme will now have a clean, blue-toned look instead of the default green.

## Adding more themes

If you want your app to support a **third theme** (or more), follow these steps:

1. **Add the new theme to the `supportedThemes` array** in `settings.json`. Make sure to give it a unique `id`, an icon, and name translations.

2. **Create a new SCSS file** for the theme:  
   Name it `_variables-theme-{id}.scss` and place it inside the `src/styles/themes` folder.  
   (Replace `{id}` with the ID of your new theme.)

3. **Define the theme’s color schema** in the new SCSS file, and wrap the `@include build-theme` call with the `[data-theme="{id}"]` attribute. You can refer to the light theme file for a working example.

4. **Import the new theme SCSS file** inside `_constants.scss` so it gets compiled.

Once these steps are complete, your new theme will show up in the theme selector and be fully usable.

## Next Steps
Ready to keep going? Check out the next tutorial or revisit the previous one if you need a refresher:

⬅️ [Previous: Configuring settings.json](./TUTORIAL_02_CONFIGURING_SETTINGS_JSON.md)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
[Next: Profile and Strings](./TUTORIAL_04_PROFILE_AND_STRINGS.md) ➡️ 