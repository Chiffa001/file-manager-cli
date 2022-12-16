import { ask } from "./services/interactive-cli.js";
import { getArgs } from "./utils/args.js";

const { username } = getArgs();

console.log(`Welcome to the File Manager, ${username}!`);

process.on("SIGINT", () => {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
    process.exit();
});

while (true) {
    const answer = await ask();

    if (answer === ".exit") {
        process.emit("SIGINT");
    }

    console.log(answer);
}
