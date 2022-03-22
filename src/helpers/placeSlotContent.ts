//  Type Definitions
import type { Props } from '../types'

/** Place the provided content in the slot and handle props */
export function placeSlotContent(slot: string, content: string, props: Props): string {
    const contents: string[] = [content]

    //  Attach prefix and suffix
    if (props.prefix) { contents.unshift(`${props.prefix}`) }
    if (props.suffix) { contents.push(`${props.suffix}`) }

    //  If removeSlots is false, keep the slot tags
    if (!props.removeSlots) {
        contents.unshift(`<!-- slot: ${slot} ${props.propsString} -->`)
        contents.push(`<!-- /slot -->`)
    }

    return contents.join('\n')
}