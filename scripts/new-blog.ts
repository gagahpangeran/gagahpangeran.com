import prompts from "prompts";

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^0-9a-z ]/gi, "")
    .replace(/ /gi, "-");
}

const questions = () =>
  prompts([
    {
      type: "text",
      name: "title",
      message: "Title",
      initial: "New Blog"
    },
    {
      type: "text",
      name: "slug",
      message: "Slug",
      initial: slugify
    }
  ]);

async function main() {
  const response = await questions();
  console.log(response);
}

main();
