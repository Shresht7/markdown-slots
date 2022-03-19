//  Type Definitions
import type { Props } from '../types'

/** Place the provided content in the slot and handle props */
export function placeSlotContent(slot: string, props: Props, content: string, removeSlots: boolean = false): string {
    const contents: string[] = [content]

    //  Attach prefix and suffix
    if (props.prefix) { contents.unshift(`${props.prefix}`) }
    if (props.suffix) { contents.push(`${props.suffix}`) }

    //  Attach slots if removeSlots is false
    if (!removeSlots) {
        contents.unshift(`<!-- slot: ${slot} ${props.propsString} -->`)
        contents.push(`<!-- /slot -->`)
    }

    return contents.join('\n')
}