export const loop = (times: number, callback: (i?: number) => void) => {
    Array(times).fill(0).forEach((item, i) => callback(i));
};

export const mapLoop = <t = any>(times: number, callback: (i?: number) => t): t[] => {
    return Array(times).fill(0).map((item, i) => callback(i));
};