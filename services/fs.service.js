import {chdir, cwd} from "process";
import {createHash} from 'crypto';
import {readdir, readFile, appendFile, rename as renameFile, rm} from "fs/promises";
import {createReadStream, createWriteStream} from "fs";
import {pipeline} from "stream/promises";
import {resolve, join} from "path";
import {EOL} from "os";

import {throwInputError, throwOperationError} from "../utils/error.js";
import {getDirectories, getFiles} from "../utils/fs.js";
import {getGreenMessage} from "../utils/message.js";

export const up = () => {
    chdir('..');
}

export const cd = (path) => {
    if (!path) {
        throwInputError();
    }

    try {
        chdir(resolve(cwd(), path));
    } catch {
        throwOperationError();
    }
};

export const ls = async () => {
    const list = await readdir(cwd());

    const result = await Promise.all([
        ...(await getDirectories(list)),
        ...((await getFiles(list))),
    ]);

    console.log(EOL);
    console.table(result);
};

export const cat = async (path, needLog = true) => {
    if (!path) {
        throwInputError();
    }

    try {
        const filePath = resolve(cwd(), path);
        const content = await readFile(filePath, {encoding: "utf8"});

        if (needLog) {
            console.log(content);
        }

        return content;
    } catch {
        throwOperationError();
    }
};

export const add = async (name) => {
    if (!name) {
        throwInputError();
    }

    try {
        await appendFile(join(cwd(), name), '');
        console.log(getGreenMessage("done!"));
    } catch {
        throwOperationError();
    }
}

export const rename = async (oldName, newName) => {
    if (!oldName || !newName) {
        throwInputError();
    }

    try {
        await renameFile(oldName, newName);
        console.log(getGreenMessage("done!"));
    } catch {
        throwOperationError();
    }
};

export const copy = async (oldPath, newPath, needLog = true) => {
    if (!oldPath || !newPath) {
        throwInputError();
    }

    try {
        const src = resolve(cwd(), oldPath);
        const dist = resolve(cwd(), newPath);

        await pipeline(createReadStream(src), createWriteStream(dist));

        if (needLog) {
            console.log(getGreenMessage("done!"));
        }
    } catch {
        throwOperationError();
    }
};

export const remove = async (path, needLog = true) => {
    if (!path) {
        throwInputError();
    }

    try {
        await rm(resolve(cwd(), path))

        if (needLog) {
            console.log(getGreenMessage("done!"));
        }
    } catch {
        throwOperationError();
    }
};

export const move = async (oldPath, newPath) => {
    await copy(oldPath, newPath, false);
    await remove(oldPath, false);
    console.log(getGreenMessage("done!"));
}

export const hash = async (path) => {
    const content = await cat(path, false);
    const hash = createHash('sha256').update(content).digest('hex');
    console.log(hash);
}
