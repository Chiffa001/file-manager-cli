import {EOL, cpus, userInfo, arch} from "os";
import {throwError} from "../utils/error.js";

export const getOsInfo = (infoType) => {
    switch (infoType) {
        case "--EOL":
            return JSON.stringify(EOL);
        case "--cpus":
            return {
                quantity: cpus().length,
                cpus: cpus().map(({model, speed}) => ({
                    model: model.trim(),
                    clockRate: `${(speed / 1000).toFixed(1)} GHz`,
                })),
            };
        case "--homedir":
            return userInfo().homedir;
        case "--username":
            return userInfo().username;
        case "--architecture":
            return arch();
        default:
            throwError();
    }
};
