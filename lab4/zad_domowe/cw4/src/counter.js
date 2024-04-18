import {
  existsSync,
  writeFileSync,
  readFile,
  writeFile,
  readFileSync,
} from "node:fs";
import { argv } from "node:process";
import { exec, spawn } from "node:child_process";
import readline from "node:readline";

const file = "counter.txt";

if (!existsSync(file)) {
  writeFileSync(file, "0");
}
function updateSync() {
  let data = readFileSync("counter.txt");
  let counter = parseInt(data);
  counter++;
  writeFileSync(file, counter.toString());
  console.log(`Licznik uruchomień: ${counter}`);
}

function updateAsync() {
  readFile(file, (err, data) => {
    if (!err) {
      let count = parseInt(data);
      count++;
      writeFile(file, count.toString(), (err) => {
        if (err) {
          console.error("Błąd podczas zapisu pliku:", err);
        } else {
          console.log(`Licznik uruchomień: ${count}`);
        }
      });
    } else {
      console.error("Błąd podczas odczytu pliku:", err);
    }
  });
}
function executeCommand() {
  console.log(
    "Wprowadź komendy — naciśnięcie Ctrl+D kończy wprowadzanie danych"
  );
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.prompt();

  rl.on("line", (line) => {
    console.log(line);
    exec(line, (err, output) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(output);
    });
    rl.prompt();
  }).on("close", () => {
    console.log("Koniec");
    process.exit(0);
  });
}

if (argv.includes("--sync")) {
  updateSync();
} else if (argv.includes("--async")) {
  updateAsync();
} else {
  executeCommand();
}
