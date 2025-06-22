function userMarkdownSetup(md) {
  // The md parameter stands for the markdown-it instance used throughout the site generator.
  // Feel free to add any plugin you want here instead of /.eleventy.js
}
function userEleventySetup(eleventyConfig) {
  // The eleventyConfig parameter stands for the the config instantiated in /.eleventy.js.
  // Feel free to add any plugin you want here instead of /.eleventy.js
 
    eleventyConfig.addPassthroughCopy ("sw.js");
eleventyConfig.addPassthroughCopy("src/site/books.json");
  eleventyConfig.addPassthroughCopy("app");
  eleventyConfig.addPassthroughCopy("manifest.webmanifest");
}
exports.userMarkdownSetup = userMarkdownSetup;
exports.userEleventySetup = userEleventySetup;
