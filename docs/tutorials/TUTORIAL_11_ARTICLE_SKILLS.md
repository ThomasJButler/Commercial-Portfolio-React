# <img src="../assets/logo.png"> Tutorial 11 – ArticleSkills

## Preview

![alt preview](../assets/article-skills-preview.png)

The `ArticleSkills` component is used for displaying a list of skills or technologies.

## Basic Working Example

Just copy and paste this into a section's `articles` array and see the magic happen:

```json
{
    "id": 1,
    "component": "ArticleSkills",
    "locales": {
        "en": {"title": "{{Frontend}} Stack"}
    },
    "settings": {
        "max_items_per_row": 3,
        "max_rows_collapse_threshold": 6,
        "order_items_by": "percentage",
        "order_items_sort": "desc",
        "round_icons": false
    },
    "items": [
        {
            "id": 1,
            "img": "",
            "faIcon": "fa-brands fa-html5",
            "faIconColors": {"bg": "", "fill": "#E34F26"},
            "date": {"year": 2018, "month": 9},
            "percentage": 100,
            "locales": {
                "en": {
                    "title": "HTML 5",
                    "text": "I am proficient in HTML5 for building structured web pages.",
                    "level": ""
                }
            }
        },

        {
            "id": 2,
            "img": "",
            "faIcon": "fa-brands fa-css3-alt",
            "faIconColors": {"bg": "", "fill": "#1572B6"},
            "date": {"year": 2019, "month": 1},
            "percentage": 65,
            "locales": {
                "en": {
                    "title": "CSS 3",
                    "text": "I can create responsive and visually appealing designs using CSS3.",
                    "level": ""
                }
            }
        },

        {
            "id": 3,
            "img": "",
            "faIcon": "fa-brands fa-js",
            "faIconColors": {"bg": "", "fill": "#F7DF1E", "fillLight": "#a69617"},
            "date": {"year": 2020, "month": 3},
            "percentage": 90,
            "locales": {
                "en": {
                    "title": "JavaScript ES6+",
                    "text": "Mastered JavaScript ES6+ for dynamic and interactive web applications.",
                    "level": ""
                }
            }
        }
    ]
}
```

### Required Settings

| Property                                  | Type    | Description                                                                                                                   |
|-------------------------------------------|---------|-------------------------------------------------------------------------------------------------------------------------------|
| `max_items_per_row`                       | NUMBER  | Defines the maximum number of items per row. It can be `1`, `2` or `3`.                                                       |
| `max_rows_collapse_threshold`             | NUMBER  | Defines the maximum number of rows before collapsing. When collapsed, the app displays a "See more" button. Recommended: `6`. |
| `order_items_by`                          | STRING  | Defines the item key that will be used for ordering items.                                                                    |
| `order_items_sort`                        | STRING  | Defines the direction of the order. Use `"asc"` (ascending) or `"desc"` (descending).                                         |
| `round_icons`                             | BOOLEAN | Defines whether to use solid round icons with borders. Default: `false`.                                                      |

## Item Structure

Each item of `ArticleSkills` represents a skill or technology.

### Empty Item Model
```json
{
    "id": 0,
    "img": "",
    "faIcon": "",
    "faIconColors": {"bg": "", "bgLight": "", "fill": "", "fillLight": ""},
    "date": {"year": 1900, "month": 1},
    "percentage": 0,
    "locales": {
        "en": {
            "title": "",
            "text": "",
            "level": ""
        }
    }
}
```

### ⚡ Item Static Fields

| Property               | Type               | Required? | Description                                                                                                                                                                                      |
|------------------------|--------------------|-----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `id`                   | NUMBER             | REQUIRED  | A unique ID for the item within the article.                                                                                                                                                     |
| `img`                  | STRING (URL)       | OPTIONAL  | Path to the image shown in the avatar. Must be relative to `public/`. If not provided, the article falls back to the `faIcon`.                                                                   |
| `faIcon`               | STRING             | OPTIONAL  | A [Font Awesome](https://fontawesome.com/search?ic=free) icon used as a fallback if no image is specified (now supporting [PrimeIcons](https://www.primefaces.org/diamond/icons.xhtml) as well!) |
| `faIcon.bg`            | STRING (HEX COLOR) | OPTIONAL  | Custom background color for the `faIcon`. Defaults to the theme dark color.                                                                                                                      |
| `faIcon.bgLight`       | STRING (HEX COLOR) | OPTIONAL  | Custom background color for the `faIcon` in light themes. Defaults to theme dark color.                                                                                                          |
| `faIcon.fill`          | STRING (HEX COLOR) | OPTIONAL  | Custom `faIcon` fill color for dark themes. Defaults to the current theme's text color.                                                                                                          |
| `faIcon.fillLight`     | STRING (HEX COLOR) | OPTIONAL  | Custom `faIcon` fill color for light themes. Defaults to the current theme's text color.                                                                                                         |
| `date`                 | OBJECT             | OPTIONAL  | A date that represents when you started using this technology — used for calculating your experience time. Must contain `year` and `month`.                                                      | 
| `percentage`           | NUMBER             | OPTIONAL  | A number from `0` to `100` representing your proficiency in this skill. If not provided or equals to zero, the progress bar will not be displayed.                                               |                                                       

### 🌐 Item Locales Fields

| Property | Type   | Required?   | Description                                                                    |
|----------|--------|-------------|--------------------------------------------------------------------------------|
| `title`  | STRING | REQUIRED    | The skill name.                                                                |
| `text`   | STRING | OPTIONAL    | A short description explaining the skill.                                      |
| `level`  | STRING | OPTIONAL    | Something like 'Fluent' or 'Advanced' — shown next to the title. Not required. |

> **Note:** All fields in the locales object support the following custom formatting:
>- `{{Some text...}}` for highlighting a text.
>- `[[Some text...]]` for making a text bold.
>
> **Note 2:** Required and recommended fields must be present **at least** in the default language.

## Next Steps
Ready to keep going? Check out the next tutorial or revisit the previous one if you need a refresher:

⬅️ [Previous: ArticleCards](./TUTORIAL_10_ARTICLE_CARDS.md)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
[Next: ArticleTimeline](./TUTORIAL_12_ARTICLE_TIMELINE.md) ➡️ 
