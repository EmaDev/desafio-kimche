import { Theme } from "../interfaces/themeInterface";

const themeDark:Theme = {
    type: 'Dark',
    textPrimary: '#F2F2F2',
    textSecondary: '#DEDEDE',
    bgPrimary: '#272E43',
    bgSecondary: '#1F2535',
    btNormal: '#2D3446',
    btActive: '#1E73C8',
    switch: { bg: '#181A1B', ball: '#E8E7A3'}
}
const themeLight:Theme = {
    type: 'Light',
    textPrimary: '#0F1216',
    textSecondary: '#1E2329',
    bgPrimary: '#EFEFEF',
    bgSecondary: '#DBDBDB',
    btNormal: '#CBD0D5',
    btActive: '#1E73C8',
    switch: { bg: '#5EB4C1', ball: '#ECB216'}
}

interface Themes{
    dark: Theme;
    light: Theme;
}
export const themes:Themes  = {
    dark: themeDark,
    light: themeLight
};