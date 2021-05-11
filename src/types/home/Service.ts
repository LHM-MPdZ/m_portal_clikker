export default class Service {
    constructor(text: string, title: string, icon: string, link: string, image: string, word: string) {
        this.text = text;
        this.title = title;
        this.icon = icon;
        this.link = link;
        this.image = image
        this.word = word

        this.id = Math.floor(Math.random() * 10000)
    }

    id!: number
    text!: string
    title!: string
    icon!: string
    link!: string
    image!: string
    word!: string
}