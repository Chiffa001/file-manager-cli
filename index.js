import {EOL} from "os";
import {cwd} from "process";
import readline from "readline";

import {execute} from "./commands.js";
import {getGreenMessage} from "./utils/message.js";
import {setDefaultDir} from "./utils/default-dir.js";
import {getArgs, getInputArgs} from "./utils/args.js";

const {username} = getArgs();

console.log(`Welcome to the File Manager, ${username}!`);

process.on("SIGINT", () => {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
    process.exit();
});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

setDefaultDir();

rl.on("SIGINT", () => {
    rl.write(`CTRL + C ${EOL}`);
    process.emit("SIGINT");
});

rl.on("line", async (answer) => {
    if (answer === ".exit") {
        process.emit("SIGINT");
    }

    const {command, props} = getInputArgs(answer);

    try {
        await execute(command, props);
    } catch (e) {
        console.error(e.message);
    } finally {
        console.log(getGreenMessage(`You are currently in ${cwd()}`));
    }
});
