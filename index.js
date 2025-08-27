const { program } = require("commander");
const fs = require("fs/promises");
const chalk = require("chalk");
const QUOTE_FILE = "quotes.txt";

// CLI setup
program
  .name("quotes")
  .description("CLI tool for inspiration")
  .version("0.1.0");

// Retrieve a random quote
program
  .command("getQuote")
  .description("Retrieves a random quote")
  .action(async () => {
    try {
      const data = await fs.readFile(QUOTE_FILE, "utf-8");
      const lines = data.split("\n").map(line => line.trim()).filter(Boolean);

      if (lines.length === 0) throw new Error("No quotes found");

      const randomLine = lines[Math.floor(Math.random() * lines.length)];
      const [quote, author] = randomLine.split("|");

      console.log(chalk.green(quote));
      console.log(chalk.blue(author || "Anonymous"));
    } catch (err) {
      console.error("Error reading quotes file:", err.message);
      process.exit(1);
    }
  });

// Add a quote
program
  .command("addQuote <quote> [author]")
  .description("Adds a quote to the quote file")
  .action(async (quote, author) => {
    if (!quote) {
      console.error("Error: Quote is required");
      process.exit(1);
    }

    const line = `${quote.trim()}|${(author || "Anonymous").trim()}\n`;

    try {
      await fs.appendFile(QUOTE_FILE, line);
      console.log(chalk.yellow(`Quote added: "${quote}"`));
    } catch (err) {
      console.error("Error writing to quotes file:", err.message);
      process.exit(1);
    }
  });

// Use parseAsync to handle async actions properly
program.parseAsync(process.argv).catch(err => {
  console.error(err);
  process.exit(1);
});
