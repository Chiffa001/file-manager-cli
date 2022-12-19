import {EOL, cpus, userInfo, arch} from "os";
import {throwOperationError} from "../utils/error.js";

export const showOsInfo = (infoType) => {
    switch (infoType) {
        case "--EOL":
            console.log(JSON.stringify(EOL));
            break;
        case "--cpus":
            console.log({
                quantity: cpus().length,
                cpus: cpus().map(({model, speed}) => ({
                    model: model.trim(),
                    clockRate: `${(speed / 1000).toFixed(1)} GHz`,
                })),
            });
            break;
        case "--homedir":
            console.log(userInfo().homedir);
            break;
        case "--username":
            console.log(userInfo().username);
            break;
        case "--architecture":
            console.log(arch());
            break;
        default:
            throwOperationError();
    }
};
