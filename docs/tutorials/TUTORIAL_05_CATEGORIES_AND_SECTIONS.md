# <img src="../assets/logo.png"> Tutorial 5 – Categories and Sections

Each page of the resume is called a `section`.  
Each section belongs to a `category`. Categories are used to group sections into **tabs** in the mobile navigation variant.

For example, in the live demo you’ll find the following category/section structure:
- **Home** (1 section) ➔ [About]
- **Background** (2 sections) ➔ [Education, Experience]
- **Showcase** (3 sections) ➔ [Skills, Portfolio, Achievements]
- **More** (2 sections) ➔ [Updates, Contact]

This structure can be observed on the mobile version of the app, where each category is represented as a tab.

If you have reset your portfolio, you’ll start with four **preset categories** and four **preset sections**.  
Let’s look at how to configure them properly.

## Sections

Open `public/data/sections.json` and locate the `sections` array.  
Each item in this array is an object with the following properties:

| Property     | Type   | Description                                                                                                                       |
|--------------|--------|-----------------------------------------------------------------------------------------------------------------------------------|
| `id`         | STRING | A unique ID for the section                                                                                                       |
| `categoryId` | STRING | The ID of the category this section belongs to                                                                                    |
| `jsonPath`   | STRING | The relative path to the JSON file containing the section content. It's recommended to keep them inside `public/data/sections/`   |
| `faIcon`     | STRING | A [Font Awesome](https://fontawesome.com/icons) icon code for the section (eg. `fa-solid fa-home`)                                |

The **order** of sections in this array determines how they appear in the navigation bar.  
You can freely create, edit, and delete sections, but **every section must belong to a valid category**, or an error will occur.


## Categories

Open `categories.json` and locate the `categories` array.  
Each item should include the following properties:

| Property   | Type   | Description                                                                                                  |
|------------|--------|--------------------------------------------------------------------------------------------------------------|
| `id`       | STRING | A unique ID for the category                                                                                 |
| `faIcon`   | STRING | A [Font Awesome](https://fontawesome.com/icons) icon code representing the category (eg. `fa-solid fa-home`) |
| `locales`  | OBJECT | An object containing translations for the category title in different languages.                             |                                                                         

**Important:** Keep your categories and sections well-aligned to avoid navigation errors.
If a category has **no sections** assigned to it, the app will **throw an error**.  
Make sure that **every category** has at least **one section** associated with it in `sections.json`.

## Next Steps
Ready to keep going? Check out the next tutorial or revisit the previous one if you need a refresher:

⬅️ [Previous: Profile and Strings](./TUTORIAL_04_PROFILE_AND_STRINGS.md)
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
[Next: Section Titles](./TUTORIAL_06_SECTION_TITLES.md) ➡️ 
