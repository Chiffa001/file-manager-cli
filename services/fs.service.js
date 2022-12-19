import {createHash} from 'crypto';
import {chdir, cwd} from "process";
import {resolve, join, parse} from "path";
import {pipeline} from "stream/promises";
import {createReadStream, createWriteStream} from "fs";
import {readdir, readFile, appendFile, rename as renameFile, rm} from "fs/promises";

import {getGreenMessage} from "../utils/message.js";
import {getDirectories, getFiles} from "../utils/fs.js";
import {throwInputError, throwOperationError} from "../utils/error.js";

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
        const dist = resolve(cwd(), newPath, parse(src).base);

        const readStream = createReadStream(src)
        const writeStream = createWriteStream(dist);

        await pipeline(readStream, writeStream);

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
