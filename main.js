const { argv } = require("process");
const { crawlPage } = require("./crawl.js");

async function main() {
    if (argv.length < 3) {
      return console.log("Please provide a URL to crawl");
    }
    if (argv.length > 3) {
      return console.log("Please provide only one URL to crawl");
    }
} 