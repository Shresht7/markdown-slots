export function placeSlotContent(slot: string, content: string, removeSlots: boolean = false): string {
    if (!removeSlots) {
        return `<!-- slot: ${slot} -->\n\n${content}\n\n<!-- /slot -->`
    } else {
        return content
    }
}