import {join} from "path";
import {cwd} from "process";
import {stat} from "fs/promises";

const sort = (a, b) => a.toLowerCase() - b.toLowerCase();

export const getDirectories = async (list) => {
    const directories = [];
    for (const name of list) {
        if (!(await stat(join(cwd(), name))).isDirectory()) {
            continue;
        }
        directories.push(name);
    }

    return directories.sort(sort).map((name) => ({name, type: 'directory'}));
};
export const getFiles = async (list) => {
    const files = [];
    for (const name of list) {
        if (!(await stat(join(cwd(), name))).isFile()) {
            continue;
        }
        files.push(name);
    }

    return files.sort(sort).map((name) => ({name, type: 'file'}));
};
