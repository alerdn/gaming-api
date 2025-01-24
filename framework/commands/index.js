const List = require("./ListCommand");
const MakeController = require("./MakeControllerCommand");
const MakeModel = require("./MakeModelCommand");

function init() {
  const [, , command, value, option] = process.argv;

  switch (command) {
    case "list":
      List.run();
      break;
    case "make:controller":
      MakeController.run(value, option === "-m");
      break;
    case "make:model":
      MakeModel.run(value);
      break;
    default:
      console.log(
        "Comando não encontrado. Executa  \x1b[33mnode ace list\x1b[0m para ver a lista de comandos disponíveis."
      );
  }
}

module.exports = init;
