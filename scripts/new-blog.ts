import prompts from "prompts";

type Response = {
  title: string;
  slug: string;
  date: Date;
  tags: string[];
  lang: "id" | "en";
  confirm: boolean;
};

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^0-9a-z ]/gi, "")
    .replace(/ /gi, "-");
}

const questions: Parameters<typeof prompts>[0] = [
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
  },
  {
    type: "select",
    name: "lang",
    message: "Language",
    choices: [
      {
        title: "Bahasa Indonesia",
        value: "id"
      },
      {
        title: "English",
        value: "en"
      }
    ]
  },
  {
    type: "confirm",
    name: "confirm",
    message: "Create new blog?",
    initial: true
  }
];

function onCancel() {
  console.log("Canceling process...");
  process.exit(0);
}

async function main() {
  const response = await prompts(questions, { onCancel });
  console.log(response);
}

main();
