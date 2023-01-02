import {homedir} from "os";
import {chdir, cwd} from "process";

import {getGreenMessage} from "./message.js";

export const setDefaultDir = () => {
    chdir(homedir());
    console.log(getGreenMessage(`You are currently in ${cwd()}`))
};
