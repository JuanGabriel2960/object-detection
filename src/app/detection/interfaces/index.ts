export interface DictionaryResp {
    word: string;
    phonetic: string;
    phonetics: Phonetic[];
    meanings: Meaning[];
    license: License;
    sourceUrls: string[];
}

export interface License {
    name: string;
    url: string;
}

export interface Meaning {
    partOfSpeech: string;
    definitions: Definition[];
    synonyms: any[];
    antonyms: any[];
}

export interface Definition {
    definition: string;
    synonyms: any[];
    antonyms: any[];
}

export interface Phonetic {
    text: string;
    audio: string;
    sourceUrl?: string;
    license?: License;
}
