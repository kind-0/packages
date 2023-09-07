import { writable } from "svelte/store";

export const teststore = writable<boolean>(true);
export * from "./ndk";