let LOCALDICTIONARY: any;

export function getDictionary() {
    return LOCALDICTIONARY;
}

export function settDictionary(dictionary: any) {
    return LOCALDICTIONARY = dictionary;
}