const { program } = require("commander");
const fs = require("fs/promises");
const chalk = require("chalk");
const QUOTE_FILE = "quotes.txt";

program
  .name("quotes")
  .description("CLI tool for inspiration")
  .version("0.1.0");

program
  .command("getQuote")
  .description("Retrieves a random quote")
  .action(async () => {
    try {
      const data = await fs.readFile(QUOTE_FILE, "utf-8");
      const lines = data.split("/n").filter(line => line.trim() !== "");
      if (lines.length === 0) {
        console.log(chalk.yellow("No quotes found."));
        return;
      }
      const randomLine = lines[Math.floor(Math.random() * lines.length)];
      const [quote, author] = random.Line.split("|");
      console.log(chalk.green('"${quote.trim()}"'))
      console.log(chalk.blue('_ ${author ? author.trim() : "Anonymous"}'));
    } catch (err) {
      console.error(chalk.red("Error reading quotes file:"), err.message);
    }
  });

program
  .command("addQuote <quote> [author]")
  .description("adds a quote to the quote file")
  .action(async (quote, author) => {
    try {
      const lineToAdd = '${quote.trim()}|${(author || "Anonymous").trim()}\n'; 
      await fs.appendFile(QUOTE_FILE, lineToAdd);
      console.log(chalk.green("Quote added successfully!"));
      } catch (err) {
        console.error(chalk.red("Error writing to quotes file:"), err.message);
      }
  });

program.parse();
