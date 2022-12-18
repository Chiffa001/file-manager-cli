export const getArgs = () =>
    process.argv.slice(2).reduce((acc, arg) => {
        if (arg.slice(0, 2) !== "--") {
            return acc;
        }

        const [key, value] = arg.slice(2).split("=");

        return { ...acc, [key]: value };
    }, {});

export const getInputArgs = (input) => {
    const [command, ...props] = input.split(" ");
    return { command, props };
};
