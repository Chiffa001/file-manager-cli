import readline from "readline";
import { EOL } from "os";

import { getGreenMessage } from "../utils/message.js";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const QUESTION = "You are currently in path_to_working_directory: ";

rl.on("SIGINT", () => {
    rl.write(`CTRL + C ${EOL}`);
    process.emit("SIGINT");
});

export const ask = () =>
    new Promise((resolve) => {
        rl.question(getGreenMessage(QUESTION), (answer) => resolve(answer));
    });
