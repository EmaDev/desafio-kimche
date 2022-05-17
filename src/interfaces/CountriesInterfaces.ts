export interface Country {
    code: string;
    name: string;
    native: string;
    phone: string;
    continent: Continent;
    capital: String;
    currency: String;
    languages: Language[];
    emoji: string;
    emojiU: string;
    states: State
}

export interface State {
    code: String;
    name: string;
}
export interface Continent {
    code: string
    name: string
    countries: Country[]
}
export interface Language {
    code: string;
    name: string;
    native: string;
}


