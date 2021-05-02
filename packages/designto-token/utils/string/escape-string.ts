export function escapeString(text: string, lang: "dart" | "js") {
  switch (lang) {
    case "dart":
      return escapeDartString(text);
      break;

    default:
      throw `lang ${lang} is not yet supported for escape string.`;
      break;
  }
}

function escapeDartString(text: string): string {
  console.log(text, text.replace("\n", "\\n"));

  // \ -> \\
  text = text.split("\\").join("\\\\");

  // \n -> \\n
  text = text.split("\n").join("\\n");

  // \r -> \\n
  text = text.split("\r").join("\\r");

  // \t -> \\t
  text = text.split("\t").join("\\t");

  // $ -> \$''"
  text = text.split("$").join("\\$");

  // " -> \"
  text = text.split('"').join('\\"');

  // ' -> \'
  text = text.split("'").join("\\'");

  return text;
}
