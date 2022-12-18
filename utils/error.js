import {getRedMessage} from "./message.js";

export const throwError = () => {
    throw new Error(getRedMessage("Invalid input"));
};
