export default class Breadcrumb {
    constructor(text: string, href: string, disabled: boolean) {
        this.text = text
        this.href = href
        this.disabled = disabled
    }

    text!: string
    disabled!: boolean
    href!: string
}