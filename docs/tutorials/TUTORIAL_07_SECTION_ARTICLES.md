# <img src="../assets/logo.png"> Tutorial 7 – Section Articles

Each section in the app is made up of a set of **articles**, which are reusable components used to display blocks of content. These components render inside the section you configure and are defined in the `articles` array of each section JSON.

Here's a basic example of a section containing two articles: a skills list and a testimonials list.

```json
{
    "articles": [
        {
            "id": 1,
            "component": "ArticleSkills",
            "locales": {
                "en": {
                    "title": "My {{Skills}}"
                }
            },
            "settings": {},
            "items": []
        },
    
        {
            "id": 2,
            "component": "ArticleTestimonials",
            "locales": {
                "en": {
                    "title": "Client {{Testimonials}}"
                }
            },
            "settings": {},
            "items": []
        }
    ]
}
```

## Article Structure

Each article object contains the following properties:

| Property    | Type      | Description                                                                                             |
|-------------|-----------|---------------------------------------------------------------------------------------------------------|
| `id`        | NUMBER    | A unique identifier for the article (within the section).                                               |
| `component` | STRING    | The name of the JSX component that will render the article (e.g. `ArticleSkills`).                      |
| `locales`   | OBJECT    | This can be used to **localize the article title** and other parameters we're going to explore further. |
| `settings`  | OBJECT    | A list of flags and configurations for the article.                                                     |
| `items`     | ARRAY     | The list of items within the article.                                                                   |

Don't stress about the `settings` and `items` field at the moment — these fields are specific to each article, and we will have tutorial steps where we will discuss the structure of these items for each article type.

## Available Article Components

The `component` field can be one of the following:

| Component Name        | Description                                                                         |
|-----------------------|-------------------------------------------------------------------------------------|
| `ArticleCards`        | Renders a slider with informational cards – perfect for things like certifications. |
| `ArticleContactForm`  | Renders a contact form that allows users to send emails to you.                     |
| `ArticleFacts`        | Renders fun fact widgets with icons, values, and descriptions.                      |
| `ArticleInfoList`     | Renders a list of information (e.g. contact options, interests).                    |
| `ArticleInlineList`   | Renders a compact list with links (e.g. city, email, website).                      |
| `ArticlePortfolio`    | Renders a gallery of projects.                                                      |
| `ArticleSkills`       | Renders a list of skills.                                                           |
| `ArticleStack`        | Renders a stack of technologies.                                                    |
| `ArticleTestimonials` | Renders a list of testimonials.                                                     |
| `ArticleText`         | Renders text content with images, good for introductions or stories.                |
| `ArticleThread`       | Renders a mini-timeline with key events.                                            |
| `ArticleTimeline`     | Renders a full-featured timeline.                                                   |

In the next tutorial steps, we're going to learn how to configure each of these articles.

## Next Steps
Ready to keep going? Check out the next tutorial or revisit the previous one if you need a refresher:

⬅️ [Previous: Section Titles](./TUTORIAL_06_SECTION_TITLES.md)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
[Next: ArticleInlineList](./TUTORIAL_08_ARTICLE_INLINE_LIST.md) ➡️ 