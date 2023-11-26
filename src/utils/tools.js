export const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 *  In honor of my girlfriend
 */
export const drugHippos = (element, ...conditions) => {
    if (conditions.every(condition => condition)) {
        return element;
    }

    return null;
}

export const shuffle = (array) => {
    return array
        .map((value) => [Math.random(), value])
        .sort((a, b) => a[0] - b[0])
        .map((value) => value[1]);
}
