// Copyright (c) Gagah Pangeran Rosfatiputra (GPR) <gpr@gagahpangeran.com>.
// Licensed under The MIT License.
// Read the LICENSE file in the repository root for full license text

export function stripInlineMarkdown(str: string) {
  return str
    .replace(/\*\*(.*?)\*\*/g, "$1") // **text**
    .replace(/_(.*?)_/g, "$1") // _text_
    .replace(/~~(.*?)~~/g, "$1") // ~~text~~
    .replace(/`{1,2}(.*?)`{1,2}/g, "$1") // `text` or ``text``
    .replace(/\[(.*?)\]\(.*?\)/g, "$1") // [text](url)
    .replace(/\[(.*?)\]\[.*?\]/g, "$1"); // [text][ref]
}
