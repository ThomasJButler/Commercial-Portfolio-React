# <img src="../assets/logo.png"> Tutorial 10 – ArticleCards

## Preview

![alt preview](../assets/article-cards-preview.png)

The `ArticleCards` component is used for displaying a collection of items in a card format. 
## Basic Working Example

Just copy and paste this into a section's `articles` array and see the magic happen:

```json
{
    "id": 1,
    "component": "ArticleCards",
    "locales": {},
    "settings": {
        "order_items_by": "id",
        "order_items_sort": "asc"
    },
    "items": [
        {
            "id": 1,
            "img": "",
            "faIcon": "fa-brands fa-apple",
            "faIconColors": {"bg": "#000", "bgLight": "#000", "fill": "#FFF", "fillLight": "#FFF"},
            "date": {"year": 2024, "month": 6},
            "link": {"href": "https://apple.com", "tooltipString": "open_website"},
            "locales": {
                "en": {
                    "title": "{{Apple}} Certification",
                    "text": "I am a certified Apple developer with expertise in iOS and macOS development."
                }
            }
        },

        {
            "id": 2,
            "img": "",
            "faIcon": "fa-brands fa-google",
            "faIconColors": {"bg": "red", "bgLight": "red", "fill": "white", "fillLight": "white"},
            "date": {"year": 2024, "month": 12},
            "link": {"href": "", "tooltipString": ""},
            "locales": {
                "en": {
                    "title": "{{Google}} Certification",
                    "text": "I am a certified Google developer with expertise in Android development."
                }
            }
        }
    ]
}
```

### Required Settings

| Property                                 | Type    | Description                                                                           |
|------------------------------------------|---------|---------------------------------------------------------------------------------------|
| `order_items_by`                         | STRING  | Defines the item key that will be used for ordering items. Default: `"id"`.           |
| `order_items_sort`                       | STRING  | Defines the direction of the order. Use `"asc"` (ascending) or `"desc"` (descending). |

## Item Structure

Each item of the `ArticleCards` article represents a single card in the collection. 

### Empty Item Model
```json
{
    "id": 0,
    "img": "",
    "faIcon": "",
    "faIconColors": {"bg": "", "bgLight": "", "fill": "", "fillLight": ""},
    "date": {"year": 1900, "month": 1},
    "link": {"href": "", "tooltipString": ""},
    "locales": {
        "en": {
            "title": "",
            "text": ""
        }
    }
}
```

### ⚡ Item Static Fields

| Property             | Type               | Required?     | Description                                                                                                                                                                                       |
|----------------------|--------------------|---------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `id`                 | NUMBER             | REQUIRED      | A unique ID for the item within the article.                                                                                                                                                      |
| `img`                | STRING (URL)       | OPTIONAL      | Path to the image shown in the avatar. Must be relative to `public/`. If not provided, the article falls back to the `faIcon`.                                                                    |
| `faIcon`             | STRING             | OPTIONAL      | A [Font Awesome](https://fontawesome.com/search?ic=free) icon used as a fallback if no image is specified (now supporting [PrimeIcons](https://www.primefaces.org/diamond/icons.xhtml) as well!)  |
| `faIcon.bg`          | STRING (HEX COLOR) | OPTIONAL      | Custom background color for the `faIcon`. Defaults to the theme dark color.                                                                                                                       |
| `faIcon.bgLight`     | STRING (HEX COLOR) | OPTIONAL      | Custom background color for the `faIcon` in light themes. Defaults to theme dark color.                                                                                                           |
| `faIcon.fill`        | STRING (HEX COLOR) | OPTIONAL      | Custom `faIcon` fill color for dark themes. Defaults to the current theme's text color.                                                                                                           |
| `faIcon.fillLight`   | STRING (HEX COLOR) | OPTIONAL      | Custom `faIcon` fill color for light themes. Defaults to the current theme's text color.                                                                                                          |
| `date`               | OBJECT             | OPTIONAL      | Start date of the item. Must contain `year` and `month`.                                                                                                                                          |
| `link.href`          | STRING             | OPTIONAL      | The destination URL if the item is clickable.                                                                                                                                                     |
| `link.tooltipString` | STRING             | OPTIONAL      | A key from `strings.json` to show as a tooltip when hovering the item.                                                                                                                            |

### 🌐 Item Locales Fields

| Property | Type   | Required?   | Description                  |
|----------|--------|-------------|------------------------------|
| `title`  | STRING | REQUIRED    | The title of the item.       |
| `text`   | STRING | OPTIONAL    | The description of the item. |

> **Note:** All fields in the locales object support the following custom formatting:
>- `{{Some text...}}` for highlighting a text.
>- `[[Some text...]]` for making a text bold.
>
> **Note 2:** Required and recommended fields must be present **at least** in the default language.

## Next Steps
Ready to keep going? Check out the next tutorial or revisit the previous one if you need a refresher:

⬅️ [Previous: ArticleTexts](./TUTORIAL_09_ARTICLE_TEXTS.md)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
[Next: ArticleSkills](./TUTORIAL_11_ARTICLE_SKILLS.md) ➡️ 
