export function placeSlotContent(slot: string, props: string, content: string, removeSlots: boolean = false): string {
    if (!removeSlots) {
        return `<!-- slot: ${slot} ${props} -->\n\n${content}\n\n<!-- /slot -->`
    } else {
        return content
    }
}