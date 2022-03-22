//  Type Definitions
import type { Props } from '../types'

/**
 * Regex to match props
 * 
 * matches
 *  - key: value
 *  - key
*/
const propsRegex = /\s*(\w+)\s*:?\s*([\s\S.]+)?\s*/i

/** Extract props from the propsString */
export function getProps(propsString: string): Props {

    //  Initialize default props object
    const props: Props = { propsString }

    //  Iterate over the props and extract key-value pairs
    for (const str of propsString.split(',')) {   //  Split propsString on ,

        //  Extract key and value
        const match = str.match(propsRegex) || []

        const key = match?.[1] as keyof Props
        if (!key) { continue }

        const value: string | boolean | number = match?.[2] || true        //  Default to true if no match value was found

        const val = value.toString().toLowerCase()
        if (value === 'true' || value === 'false') {
            props[key] = Boolean(value)
        } else if (!Number.isNaN(parseInt(val))) {
            props[key] = parseInt(val)
        } else {
            props[key] = value
        }

    }

    return props

}

