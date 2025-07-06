# <img src="../assets/logo.png"> Tutorial 18 – ArticleThreads

## Preview

![alt preview](../assets/article-threads-preview.png)

The `ArticleThreads` component is used for displaying a collection of items, such as events, blog posts, or any other content that can be organized in a thread-like structure.

## Basic Working Example

Just copy and paste this into a section's `articles` array and see the magic happen:

```json
{
    "id": 1,
    "component": "ArticleThread",
    "locales": {
        "en": { "title": "Quick {{Facts}}" }
    },
    "settings": {
        "max_rows_collapse_threshold": 3,
        "order_items_by": "dateStart",
        "order_items_sort": "desc"
    },
    "items": [
        {
            "id": 1,
            "date": {"year": 2022, "month": 9},
            "preview": {
                "links": [
                    {"href": "https://github.com", "tooltipString": "open_link", "faIcon": "fa-brands fa-github"}
                ],
                "screenshots": [],
                "screenshotsAspectRatio": "1:1",
                "youtubeVideo": "https://www.youtube.com/watch?v=RGTfS-48Gf0"
            },
            "locales": {
                "en": {
                    "title": "Got {{promoted!}}",
                    "province": "Ontario",
                    "country": "Canada",
                    "institution": "Tech Company",
                    "text": "Promoted to Senior Software Engineer at my current company! Excited for the new challenges and responsibilities ahead."
                }
            }
        }
    ]
}
```

### Required Settings

| Property                                   | Type    | Description                                                                                                                                                |
|--------------------------------------------|---------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `max_rows_collapse_threshold`              | NUMBER  | Sets the maximum number of items to display before the article is collapsed. If the number of items exceeds this limit, a 'See More' button will be shown. |
| `order_items_by`                           | STRING  | Defines the item key that will be used for ordering items.                                                                                                 |
| `order_items_sort`                         | STRING  | Defines the direction of the order. Use `"asc"` (ascending) or `"desc"` (descending).                                                                      |

## Item Structure

Each item of the `ArticleThreads` article represents a thread item, which can be an event, blog post, or any other content that fits the thread structure.

### Empty Item Model
```json
{
    "id": 0,
    "date": {"year": 1900, "month": 1},
    "preview": {
        "links": [
            {"href": "", "tooltipString": "", "faIcon": ""}
        ],
        "screenshots": [],
        "screenshotsAspectRatio": "1:1",
        "youtubeVideo": ""
    },
    "locales": {
        "en": {
            "title": "",
            "province": "",
            "country": "",
            "institution": "",
            "text": ""
        }
    }
}
```

### ⚡ Item Static Fields

| Property  | Type   | Required?   | Description                                                                                       |
|-----------|--------|-------------|---------------------------------------------------------------------------------------------------|
| `id`      | NUMBER | REQUIRED    | A unique ID for the item within the article.                                                      |
| `date`    | OBJECT | REQUIRED    | An object containing `year` and `month` properties to represent the date of the item.             |

### 👁️ Item Preview Fields

| Property                   | Type           | Required?   | Description                                                                                                                                                       |
|----------------------------|----------------|-------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `links`                    | OBJECT[]       | RECOMMENDED | A list of links related to the item. Each link will be displayed as a button. All links can contain a `href` field, a `tooltipString` field and a `faIcon` field. |
| `screenshots`              | STRING (URL)[] | OPTIONAL    | A list of urls of screenshots related to the item. Each url must be relative to the `public/` folder (e.g. `images/pictures/screenshot-0.png`)                    |
| `screenshotsAspectRatio`   | STRING         | OPTIONAL    | The aspect ratio of the screenshots. The supported values are `16:9` (landscape), `1:1` (square) and `9:16` (portrait).                                           |
| `youtubeVideo`             | STRING (URL)   | OPTIONAL    | A YouTube video URL to be displayed in the item preview.                                                                                                          |

### 🌐 Item Locales Fields

| Property      | Type     | Required?      | Description                                                                                       |
|---------------|----------|----------------|---------------------------------------------------------------------------------------------------|
| `title`       | STRING   | RECOMMENDED    | The title of the item.                                                                            |
| `province`    | STRING   | OPTIONAL       | The state/city related to the item.                                                               |
| `country`     | STRING   | OPTIONAL       | The country related to the item.                                                                  |
| `institution` | STRING   | OPTIONAL       | The institution or organization related to the item.                                              |
| `text`        | STRING   | RECOMMENDED    | The description of the item.                                                                      |

> **Note:** All fields in the locales object support the following custom formatting:
>- `{{Some text...}}` for highlighting a text.
>- `[[Some text...]]` for making a text bold.
>
> **Note 2:** Required and recommended fields must be present **at least** in the default language.

## Next Steps
Ready to keep going? Check out the next tutorial or revisit the previous one if you need a refresher:

⬅️ [Previous: ArticleFacts](./TUTORIAL_17_ARTICLE_FACTS.md)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
[Next: ArticleContactForm](./TUTORIAL_19_ARTICLE_CONTACT_FORM.md) ➡️ 
