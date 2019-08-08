import { version as v } from "../../../package.json";

export function warn(msg: any) {
    console.warn(`[Hello Week Warn]: ${msg}`);
}

export function log(msg: any) {
    console.group(`[Hello Week Log]`);
    console.log(msg);
    console.groupEnd();
}

export function error(msg: any) {
    throw new Error(`[Hello Week Error]: ${msg}`);
}

export function version() {
    console.log(`%c[Hello Week (${v})]`, "color: #42a298");
}
