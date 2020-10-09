export function toNumber(str) {
    return Number(str.replace(/\D/g, ''));
}
export function compare(a, b) {
    if (typeof a !== typeof b)
        throw TypeError(`both arguments must be of the same type`);

    if (a < b)
        return -1;
    if (a > b)
        return 1;
    return 0;
}
export function numToStrWithComma(num) {
    return num.toLocaleString();
}
export function random(min, max) {
    return Math.floor(min + Math.random() * (max - min));
}
export function shuffle(arr) {
    arr.sort(() => Math.random() - 0.5);
}
export function readableJSON(json) {
    return JSON.stringify(json, null, 4);
}
