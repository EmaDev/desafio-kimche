export interface Theme {
    type: 'Dark' | 'Light';
    textPrimary: string;
    textSecondary: string;
    bgPrimary:string;
    bgSecondary:string;
    btActive: string;
    btNormal:string;
    switch: { bg: string; ball: string}
}