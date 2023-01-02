import {cwd} from "process";
import {resolve, parse} from "path";
import {pipeline} from 'stream/promises';
import {createReadStream, createWriteStream} from "fs";
import {createBrotliCompress, createBrotliDecompress} from 'zlib';

import {getDirectories, getFiles} from "../utils/fs.js";
import {throwInputError, throwOperationError} from "../utils/error.js";

const checkArchiveOperation = async (srcPath, distPath) => {
    if (!srcPath || !distPath) {
        throwInputError();
    }

    const [isFile] = await getFiles([srcPath]);
    const [isDirectory] = await getDirectories([distPath]);

    if (!isFile || !isDirectory) {
        throwInputError();
    }
}

export const compress = async (srcPath, distPath) => {
    await checkArchiveOperation(srcPath, distPath);

    try {
        const src = resolve(cwd(), srcPath);
        const dist = resolve(cwd(), distPath, `${parse(src).base}.br`);

        await pipeline(createReadStream(src), createBrotliCompress(), createWriteStream(dist));
    } catch {
        throwOperationError();
    }
};

export const decompress = async (srcPath, distPath) => {
    await checkArchiveOperation(srcPath, distPath);

    try {
        const src = resolve(cwd(), srcPath);
        const dist = resolve(cwd(), distPath, parse(src).base);

        await pipeline(createReadStream(src), createBrotliDecompress(), createWriteStream(dist));
    } catch {
        throwOperationError();
    }
}
