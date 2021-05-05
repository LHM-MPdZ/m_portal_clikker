export default class LanguageItem {
    constructor(language: string, abbreviation: string, rtl: boolean) {
        this.language = language;
        this.abbreviation = abbreviation;
        this.rtl = rtl;
    }

    language!: string
    abbreviation!: string
    rtl!: boolean
}