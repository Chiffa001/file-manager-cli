import {execute} from "./commands.js";
import {getArgs, getInputArgs} from "./utils/args.js";
import {ask} from "./services/interactive-cli.service.js";

const {username} = getArgs();

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

    const {command, props} = getInputArgs(answer);

    try {
        execute(command, props);
    } catch (e) {
        console.error(e.message);
    }
}
