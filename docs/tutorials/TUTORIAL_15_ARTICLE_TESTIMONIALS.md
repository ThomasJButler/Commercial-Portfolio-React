# <img src="../assets/logo.png"> Tutorial 15 – ArticleTestimonials

## Preview

![alt preview](../assets/article-testimonials-preview.png)

The `ArticleTestimonials` component is used for displaying testimonials in a structured format. It allows you to showcase customer feedback or endorsements in a visually appealing way.

## Basic Working Example

Just copy and paste this into a section's `articles` array and see the magic happen:

```json
{
    "id": 1,
    "component": "ArticleTestimonials",
    "locales": {
        "en": {"title": "Client {{testimonials}}"}
    },
    "settings": {
        "order_items_by": "id",
        "order_items_sort": "asc"
    },
    "items": [
        {
            "id": 1,
            "label": "Anita Bath",
            "link": {"href": "https://linkedin.com", "tooltipString": "open_website"},
            "img": "",
            "faIcon": "fa-solid fa-user",
            "faIconColors": {"bg": "", "bgLight": "", "fill": "", "fillLight": ""},
            "locales": {
                "en": {
                    "title": "CEO at [[Somewhere]]",
                    "text": "This guy is a genius. [[Hire]] him yourself or I will instead!"
                }
            }
        },

        {
            "id": 2,
            "label": "Lou Natic",
            "link": {"href": "https://github.com", "tooltipString": "open_website"},
            "img": "",
            "faIcon": "fa-solid fa-user",
            "faIconColors": {"bg": "", "bgLight": "", "fill": "", "fillLight": ""},
            "locales": {
                "en": {
                    "title": "Lead Developer at [[Somewhere]]",
                    "text": "You're not going to find a better developer than this guy. He is [[the best]] in the business!"
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

Each item of the `ArticleTestimonials` article represents a testimonial that can include a person's name, an image or icon, and their testimonial text.

### Empty Item Model
```json
{
    "id": 0,
    "label": "",
    "link": {"href": "", "tooltipString": ""},
    "img": "",
    "faIcon": "",
    "faIconColors": {"bg": "", "bgLight": "", "fill": "", "fillLight": ""},
    "locales": {
        "en": {
            "title": "",
            "text": ""
        }
    }
}
```

### ⚡ Item Static Fields

| Property              | Type               | Required?     | Description                                                                                                                                                                                      |
|-----------------------|--------------------|---------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `id`                  | NUMBER             | REQUIRED      | A unique ID for the item within the article.                                                                                                                                                     | 
| `label`               | STRING             | REQUIRED      | The name of the person who provided the testimonial. If you need to localize this value, you can also place the label field inside the locales object.                                           |  
| `link.href`           | STRING             | OPTIONAL      | The destination URL if the name is clickable.                                                                                                                                                    |
| `link.tooltipString`  | STRING             | OPTIONAL      | A key from `strings.json` to show as a tooltip when hovering the item.                                                                                                                           |
| `img`                 | STRING (URL)       | RECOMMENDED   | Path to the image shown in the avatar. Must be relative to `public/`. If not provided, the article falls back to the `faIcon`.                                                                   |
| `faIcon`              | STRING             | OPTIONAL      | A [Font Awesome](https://fontawesome.com/search?ic=free) icon used as a fallback if no image is specified (now supporting [PrimeIcons](https://www.primefaces.org/diamond/icons.xhtml) as well!) |
| `faIcon.bg`           | STRING (HEX COLOR) | OPTIONAL      | Custom background color for the `faIcon`. Defaults to the theme dark color.                                                                                                                      |
| `faIcon.bgLight`      | STRING (HEX COLOR) | OPTIONAL      | Custom background color for the `faIcon` in light themes. Defaults to theme dark color.                                                                                                          |
| `faIcon.fill`         | STRING (HEX COLOR) | OPTIONAL      | Custom `faIcon` fill color for dark themes. Defaults to the current theme's text color.                                                                                                          |
| `faIcon.fillLight`    | STRING (HEX COLOR) | OPTIONAL      | Custom `faIcon` fill color for light themes. Defaults to the current theme's text color.                                                                                                         |

### 🌐 Item Locales Fields

| Property | Type   | Required?     | Description                                       |
|----------|--------|---------------|---------------------------------------------------|
| `title`  | STRING | RECOMMENDED   | The role of the person who gave the testimonial.  |
| `text`   | STRING | RECOMMENDED   | The testimonial text that will be shown.          |

> **Note:** All fields in the locales object support the following custom formatting:
>- `{{Some text...}}` for highlighting a text.
>- `[[Some text...]]` for making a text bold.
>
> **Note 2:** Required and recommended fields must be present **at least** in the default language.

## Next Steps
Ready to keep going? Check out the next tutorial or revisit the previous one if you need a refresher:

⬅️ [Previous: ArticlePortfolio](./TUTORIAL_14_ARTICLE_PORTFOLIO.md)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
[Next: ArticleInfoList](./TUTORIAL_16_ARTICLE_INFO_LIST.md) ➡️ 
