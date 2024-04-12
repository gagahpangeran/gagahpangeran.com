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
    },
    {
      type: "date",
      name: "date",
      message: "Date",
      initial: new Date()
    },
    {
      type: "list",
      name: "tags",
      message: "Tags",
      initial: "Story",
      separator: ","
    }
  ]);

async function main() {
  const response = await questions();
  console.log(response);
}

main();
