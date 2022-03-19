export function placeSlotContent(slot: string, props: Record<string, string | number | boolean>, content: string, removeSlots: boolean = false): string {
    const contents: string[] = [content]

    //  Attach prefix and suffix
    if (props.prefix) { contents.unshift(props.prefix.toString()) }
    if (props.suffix) { contents.push(props.suffix.toString()) }

    //  Attach slots if removeSlots is false
    if (!removeSlots) {
        contents.unshift(`<!-- slot: ${slot} ${props.propsString}`)
        contents.push(`<!-- /slot -->`)
    }

    return contents.join('\n')
}