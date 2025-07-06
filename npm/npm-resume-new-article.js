/**
 * @author Ryan Balieiro
 * @description Use this script to create new articles.
 *
 * @usage
 * npm run resume:make:article
 */
import {useNpmLogger} from "./snippets/_npm-log.js"
import {useNpmFileUtils} from "./snippets/_npm-files.js"
import makeArticleComponent from "./templates/article-component-builder.js"

import fs from "fs"
import path from "path"

const logger = useNpmLogger()
const fileUtils = useNpmFileUtils()

const args = process.argv.slice(2)
// No article name found...
if(args.length === 0) {
    logger.log(logger.LogTypes.ERROR, "Please provide a component name. Example: npm run resume:article ArticleTestimonials")
    process.exit(1)
}

const componentName = args[0]
const slug = componentName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
const articlesDir = path.resolve("src/components/articles")
const jsxPath = path.join(articlesDir, `${componentName}.jsx`)
const scssPath = path.join(articlesDir, `${componentName}.scss`)

// File exists...
if(fs.existsSync(jsxPath) || fs.existsSync(scssPath)) {
    logger.log(logger.LogTypes.ERROR,  "Article already exists.")
    process.exit(1)
}

// Name pattern checking...
if(!componentName.startsWith("Article")) {
    logger.log(logger.LogTypes.ERROR,  "Invalid article name. Articles should start with the word 'Article'. Eg: ArticleTestimonials or ArticleTimeline")
    process.exit(1)
}

// Create files...
const jsxContent = makeArticleComponent(componentName, slug)
fileUtils.createFile(articlesDir, jsxPath, jsxContent)
fileUtils.createFile(articlesDir, scssPath, `@import "/src/styles/extend.scss";`)
logger.log(logger.LogTypes.SUCCESS, `Successfully created article: ${componentName}`)

// Inject into SectionBody.jsx
const sectionBodyPath = path.resolve("src/components/sections/SectionBody.jsx")
let sectionBodyContent = fs.readFileSync(sectionBodyPath, "utf8")

// 1. Add import
const importStatement = `import ${componentName} from "/src/components/articles/${componentName}.jsx"`
if (!sectionBodyContent.includes(importStatement)) {
    const importRegex = /import ArticleNotFound from .+?\n/
    sectionBodyContent = sectionBodyContent.replace(importRegex, match => `${match}${importStatement}\n`)
}

// 2. Register component
const articlesRegex = /SectionBody\.ARTICLES\s*=\s*{([\s\S]*?)}/
sectionBodyContent = sectionBodyContent.replace(articlesRegex, (match, group) => {
    const entries = group.split(",").map(e => e.trim()).filter(Boolean)
    if (!entries.includes(componentName)) {
        entries.push(componentName)
    }
    return `SectionBody.ARTICLES = {\n    ${entries.join(",\n    ")}\n}`
})

// Save updated SectionBody.jsx
fs.writeFileSync(sectionBodyPath, sectionBodyContent)
logger.log(logger.LogTypes.SUCCESS, `Registered ${componentName} in SectionBody.jsx`)