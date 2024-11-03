import cookie, { type CookieSerializeOptions } from 'cookie';
import Cookies from 'js-cookie';
import { writable } from 'svelte/store';

export const THEME_COOKIE_NAME: string = 'colorscheme';
export const THEME_COOKIE_OPTS = {
    path: '/',
    maxAge: 604800,
    httpOnly: false,
    sameSite: true
};

export type ThemeColor = 'dark' | 'light' | 'contrast';
export const theme = writable<ThemeColor>();

export function isMode(color: ThemeColor): boolean {
    return Cookies.get(THEME_COOKIE_NAME) === color;
}

export function setCookieTheme(color: ThemeColor) {
    document.cookie = cookie.serialize(THEME_COOKIE_NAME, color, THEME_COOKIE_OPTS);
}
