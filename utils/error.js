import {getRedMessage} from "./message.js";

export const throwInputError = () => {
    throw new Error(getRedMessage("Invalid input"));
};

export const throwOperationError = () => {
    throw new Error(getRedMessage("Operation failed"));
}
