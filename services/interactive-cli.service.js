import readline from "readline";
import {EOL, homedir} from "os";
import {chdir} from "process";

import {getGreenMessage} from "../utils/message.js";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

chdir(homedir());

const QUESTION = `You are currently in ${homedir()}: `;

rl.on("SIGINT", () => {
    rl.write(`CTRL + C ${EOL}`);
    process.emit("SIGINT");
});

export const ask = () =>
    new Promise((resolve) => {
        rl.question(getGreenMessage(QUESTION), (answer) => resolve(answer));
    });
