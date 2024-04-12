import prompts from "prompts";

const questions = () =>
  prompts([
    {
      type: "text",
      name: "title",
      message: "Title",
      initial: "New Blog"
    }
  ]);

async function main() {
  const response = await questions();
  console.log(response);
}

main();
