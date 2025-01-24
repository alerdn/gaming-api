#!/usr/bin/env node
const fs = require("node:fs");
const path = require("node:path");
const MakeModel = require("./MakeModelCommand");

class MakeControllerCommand {
  name = "make:controller [-m]";
  description = "Cria um controller. Use -m para criar um model junto.";

  run(className, createModel = false) {
    if (!className) {
      console.error("Por favor, forneça o nome do controller.");
      process.exit(1);
    }

    let [name] = className.toLowerCase().split("controller");
    name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    className = `${name}Controller`;

    const classContent = `import { HttpContext } from "global";\n\nexport default class ${className} {\n\n}`;

    const filePath = path.join(
      process.cwd(),
      "app/controllers",
      `${className}.ts`
    );

    fs.writeFile(filePath, classContent, (err) => {
      if (err) {
        console.error("Erro ao criar o arquivo:", err);
        process.exit(1);
      }
      console.log(`Controller ${className} criado em ${filePath}`);
    });

    if (createModel) MakeModel.run(name);
  }
}

module.exports = new MakeControllerCommand();
