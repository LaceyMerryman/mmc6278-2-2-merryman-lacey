const { program } = require("commander");
const fs = require("fs/promises");
const chalk = require("chalk");
const QUOTE_FILE = "quotes.txt";

program
  .name("quotes")
  .description("CLI tool for inspiration")
  .version("0.1.0");

  // Get a random quote
program
  .command("getQuote")
  .description("Retrieves a random quote")
  .action(async () => {
    try {
      const data = await fs.readFile(QUOTE_FILE, "utf-8");

      // Split lines, trim, filter empty
      const lines = data.split("\n").map(l => l.trim()).filter(l => l.length > 0);

      if (!lines.length) {
        console.log(chalk.yellow("No quotes found."));
        return;
      }

      // Pick random line
      const randomLine = lines[Math.floor(Math.random() * lines.length)];
      const [quote, author] = randomLine.split("|");

      // Log quote and author
      console.log(`${quote}`);
      console.log(`${author || "Anonymous"}`);
    } catch (err) {
      console.error(err);
    }
  });

  // Add a quote
program
  .command("addQuote <quote> [author]")
  .description("Adds a quote to the quote file")
  .action(async (quote, author) => {
    if (!quote) throw new Error("Quote is required");

    author = author || "Anonymous";
    const lineToAdd = `${quote.trim()}|${author.trim()}\n`;

    await fs.appendFile(QUOTE_FILE, lineToAdd);
  });


program.parse();