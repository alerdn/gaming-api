#!/usr/bin/env node
const fs = require("node:fs");
const path = require("node:path");

class MakeModelCommand {
  name = "make:model";
  description = "Cria um model";

  run(modelName) {
    if (!modelName) {
      console.error("Por favor, forneça o nome do model.");
      process.exit(1);
    }

    modelName =
      modelName.charAt(0).toUpperCase() + modelName.slice(1).toLowerCase();

    const classContent = `import ModelBase from "framework/ModelBase";\n\nexport default class ${modelName} extends ModelBase {\n\n}`;

    const filePath = path.join(process.cwd(), "app/models", `${modelName}.ts`);

    fs.writeFile(filePath, classContent, (err) => {
      if (err) {
        console.error("Erro ao criar o arquivo:", err);
        process.exit(1);
      }
      console.log(`Model ${modelName} criado em ${filePath}`);
    });
  }
}

module.exports = new MakeModelCommand();
