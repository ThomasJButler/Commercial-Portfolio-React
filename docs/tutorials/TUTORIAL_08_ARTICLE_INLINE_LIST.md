# <img src="../assets/logo.png"> Tutorial 8 – ArticleInlineList

## Preview

![alt preview](../assets/article-inline-list-preview.png)

The `ArticleInlineList` component is used to display a compact list of items with links (e.g. city, email, website). It's recommended to put it as the first article of a section, so it can show right below the title.

## Basic Working Example

Just copy and paste this into a section's `articles` array and see the magic happen:

```json
{
    "id": 1,
    "component": "ArticleInlineList",
    "locales": {},
    "settings": {
        "order_items_by": "id",
        "order_items_sort": "asc",
        "display_as_list_if_width_is_lower_than": 380
    },
    "items": [
        {
            "id": 1,
            "label": "Cupertino – CA",
            "link": {"href": "", "tooltipString": ""},
            "faIcon": "fa-regular fa-address-book"
        },
        {
            "id": 2,
            "label": "email@dev.com",
            "link": {"href": "mailto:email@dev.com", "tooltipString": "email_me"},
            "faIcon": "fa-regular fa-envelope"
        }
    ]
}
```

### Required Settings

| Property                                 | Type    | Description                                                                           |
|------------------------------------------|---------|---------------------------------------------------------------------------------------|
| `order_items_by`                         | STRING  | Defines the item key that will be used for ordering items. Default: `"id"`.           |
| `order_items_sort`                       | STRING  | Defines the direction of the order. Use `"asc"` (ascending) or `"desc"` (descending). |
| `display_as_list_if_width_is_lower_than` | NUMBER  | Defines the screen width (in pixels) for switching to a vertical list layout.         | 

## Item Structure

Each item of the `ArticleInlineList` article represents a list item that can be clickable or not. You can use it to display things like your city, email, personal website, or any other quick info.

### Empty Item Model
```json
{
    "id": 0,
    "label": "",
    "link": {"href": "", "tooltipString": ""},
    "faIcon": ""
}
```

### ⚡ Item Static Fields

| Property             | Type   | Required?   | Description                                                                                                                                                                           |
|----------------------|--------|-------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `id`                 | NUMBER | REQUIRED    | A unique ID for the item within the article.                                                                                                                                          |
| `label`              | STRING | REQUIRED    | The value shown for the item (e.g. "email@email.com"). If you need to localize this value, you can also place the label field inside the locales object.                              |
| `link.href`          | STRING | OPTIONAL    | The destination URL if the item is clickable.                                                                                                                                         |
| `link.tooltipString` | STRING | OPTIONAL    | A key from `strings.json` to show as a tooltip when hovering the item.                                                                                                                |
| `faIcon`             | STRING | OPTIONAL    | A [Font Awesome](https://fontawesome.com/search?ic=free) icon code to display before the label (now supporting [PrimeIcons](https://www.primefaces.org/diamond/icons.xhtml) as well!) |


## Next Steps
Ready to keep going? Check out the next tutorial or revisit the previous one if you need a refresher:

⬅️ [Previous: Section Articles](./TUTORIAL_07_SECTION_ARTICLES.md)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
[Next: ArticleText](./TUTORIAL_09_ARTICLE_TEXTS.md) ➡️ 
