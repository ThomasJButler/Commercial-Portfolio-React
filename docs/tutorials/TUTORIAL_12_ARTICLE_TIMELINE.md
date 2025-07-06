# <img src="../assets/logo.png"> Tutorial 12 – ArticleTimeline

## Preview

![alt preview](../assets/article-timeline-preview.png)

The `ArticleTimeline` component is used for displaying a timeline of events or items in a structured format. It allows you to present a series of items in chronological order, making it ideal for showcasing historical events, project milestones, or any sequence of related activities.

## Basic Working Example

Just copy and paste this into a section's `articles` array and see the magic happen:

```json
{
    "id": 1,
    "component": "ArticleTimeline",
    "locales": {
        "en": {
            "title": "My {{timeline}}"
        }
    },
    "settings": {
        "order_items_by": "dateStart",
        "order_items_sort": "desc"
    },
    "items": [
        {
            "id": 1,
            "img": "",
            "faIcon": "fa-brands fa-apple",
            "faIconColors": {"bg": "#000", "bgLight": "#000", "fill": "#FFF", "fillLight": "#FFF"},
            "dateStart": {"year": 2020, "month": 1},
            "dateEnd": {"now": true},
            "locales": {
                "en": {
                    "title": "Senior {{Backend}} Developer",
                    "province": "California",
                    "country": "US",
                    "institution": "Apple Inc.",
                    "text": "Currently working as a Senior Backend Developer at Apple Inc. I do stuff like:",
                    "list": [
                        "Designing and implementing scalable backend systems",
                        "Optimizing database performance",
                        "Collaborating with cross-functional teams to deliver high-quality software solutions"
                    ],
                    "tags": [
                        "Tag 1",
                        "Tag 2",
                        "Tag 3"
                    ]
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

Each item of the `ArticleTimeline` article represents a single event or milestone in the timeline.

### Empty Item Model
```json
{
    "id": 0,
    "img": "",
    "faIcon": "",
    "faIconColors": {"bg": "", "bgLight": "", "fill": "", "fillLight": ""},
    "dateStart": {"year": 1900, "month": 1},
    "dateEnd": {"year": 1900, "month": 1},
    "locales": {
        "en": {
            "title": "",
            "province": "",
            "country": "",
            "institution": "",
            "text": "",
            "list": [],
            "tags": []
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
| `dateStart`            | OBJECT             | REQUIRED  | Start date of the item. Must contain `year` and `month`.                                                                                                                                         |
| `dateEnd`              | OBJECT             | REQUIRED  | End date of the item. Must contain `year` and `month`. You can also use `{ "now": true }` for ongoing items.                                                                                     |

### 🌐 Item Locales Fields

| Property      | Type     | Required?      | Description                                                                                       |
|---------------|----------|----------------|---------------------------------------------------------------------------------------------------|
| `title`       | STRING   | RECOMMENDED    | The title of the item.                                                                            |
| `province`    | STRING   | OPTIONAL       | The state/city related to the item.                                                               |
| `country`     | STRING   | OPTIONAL       | The country related to the item.                                                                  |
| `institution` | STRING   | OPTIONAL       | The institution or organization related to the item.                                              |
| `text`        | STRING   | RECOMMENDED    | The description of the item.                                                                      |
| `list`        | STRING[] | OPTIONAL       | A list of strings related to the item. Each item in the list will be displayed as a bullet point. |        
| `tags`        | STRING[] | OPTIONAL       | A list of tags related to the item. Each tag will be displayed as a badge.                        |

> **Note:** All fields in the locales object support the following custom formatting:
>- `{{Some text...}}` for highlighting a text.
>- `[[Some text...]]` for making a text bold.
>
> **Note 2:** Required and recommended fields must be present **at least** in the default language.

## Next Steps
Ready to keep going? Check out the next tutorial or revisit the previous one if you need a refresher:

⬅️ [Previous: ArticleSkills](./TUTORIAL_11_ARTICLE_SKILLS.md)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
[Next: ArticleStack](./TUTORIAL_13_ARTICLE_STACK.md) ➡️ 
