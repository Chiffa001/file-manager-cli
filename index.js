import { getArgs } from "./utils/args.js";

const { username } = getArgs();

console.log(`Welcome to the File Manager, ${username}!`);
