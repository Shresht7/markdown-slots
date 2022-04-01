//  Type Definitions
import type { Props } from '../types'

/** Place the provided content in the slot and handle props */
export function placeSlotContent(slot: string, content: string, props?: Props): string {
    const contents: string[] = [content]

    //  Attach prepend and append
    if (props?.prepend) { contents.unshift(`${props.prepend}`) }
    if (props?.append) { contents.push(`${props.append}`) }

    //  If removeSlots is false, keep the slot tags
    if (!props?.removeSlots) {
        if (props?.str) {
            contents.unshift(`<!-- slot: ${slot}, ${props.str} -->`)
        } else {
            contents.unshift(`<!-- slot: ${slot} -->`)
        }
        contents.push(`<!-- /slot -->`)
    }

    return contents.join('\n')
}