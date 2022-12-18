import {getOsInfo} from "./services/os.service.js";
import {throwError} from "./utils/error.js";

export const execute = (command, props) => {
    switch (command) {
        case "os":
            console.log(getOsInfo(props[0]));
            break;
        default:
            throwError();
    }
};
