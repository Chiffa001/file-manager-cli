import {throwInputError} from "./utils/error.js";
import {showOsInfo} from "./services/os.service.js";
import {compress, decompress} from "./services/archive.service.js";
import {add, cat, cd, copy, hash, ls, move, remove, rename, up} from "./services/fs.service.js";

export const execute = async (command, props) => {
    switch (command) {
        case "os":
            showOsInfo(...props)
            break;
        case "up":
            up();
            break;
        case "ls":
            await ls();
            break;
        case "cd":
            cd(...props);
            break;
        case "cat":
            await cat(...props);
            break;
        case "add":
            await add(...props);
            break;
        case "rn":
            await rename(...props);
            break;
        case "cp":
            await copy(...props);
            break;
        case "rm":
            await remove(...props);
            break;
        case "mv":
            await move(...props);
            break;
        case "hash":
            await hash(...props);
            break;
        case "compress":
            await compress(...props);
            break;
        case "decompress":
            await decompress(...props);
            break;
        default:
            throwInputError();
    }
};
