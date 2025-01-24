const commands = [
  require("./MakeControllerCommand"),
  require("./MakeModelCommand"),
];

class ListCommand {
  run() {
    let text = `\x1b[33mComandos disponíveis:\x1b[0m`;
    commands.forEach((command) => {
      text += `\n \x1b[32mnode ace ${command.name.padEnd(50, " ")}\x1b[0m \x1b[30m${command.description}\x1b[0m`;
    });

    console.log(text);
  }
}

module.exports = new ListCommand();
