# <img src="../assets/logo.png"> Tutorial 6 – Section Titles

As you’ve gathered from the previous step, each **section** has its own separate JSON file.  
Each section JSON file contains **two root fields**: `title` and `articles`.  
Let’s focus on the `title` field in this step.

Open a section file (e.g., `data/sections/experience.json`) and locate the `title` object:
```json
{
    "title": {
        "locales": {
            "en": {
                "title_short": "Experience",
                "title_short_nav": "Experience",
                "title_long_prefix": "Summary of my",
                "title_long": "{{Work}} Experience"
            },
            "es": {
                "title_short": "Experiencia",
                "title_short_nav": "Experiencia",
                "title_long_prefix": "Resumen de mi",
                "title_long": "Experiencia {{Laboral}}"
            }
        }
    }
}
```
Inside it, you'll find a **locales hash** with the following properties for each supported language:

| Property             | Type    | Description                                                     |
|----------------------|---------|-----------------------------------------------------------------|
| `title_short`        | STRING  | Short title used for **mobile layout**.                         |
| `title_short_nav`    | STRING  | Label used in **navigation components** (like the sidebar).     |
| `title_long_prefix`  | STRING  | A text displayed **above the full title** (ignored on mobile).  |
| `title_long`         | STRING  | Full section title used in the **desktop layout**.              |

To make certain words **highlighted with the primary color**, you can wrap them with `{{ }}` in the JSON text.

For example: `"{{Education}} Background"` will render the word **Education** in your theme's primary color.

Make sure you **translate all entries** under the `title` object for **each language** you support. If a title is missing in a specific language, the app will **fallback to the default language**.

## Next Steps
Ready to keep going? Check out the next tutorial or revisit the previous one if you need a refresher:

⬅️ [Previous: Categories and Sections](./TUTORIAL_05_CATEGORIES_AND_SECTIONS.md)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
[Next: Section Articles](./TUTORIAL_07_SECTION_ARTICLES.md) ➡️ 
