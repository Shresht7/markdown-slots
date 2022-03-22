//  ================
//  TYPE DEFINITIONS
//  ================

/** Props available on the markdown slots tag */
export interface Props extends Record<string, string | number | boolean | undefined> {
    str: string,
    prepend?: string,
    append?: string,
    removeSlots?: boolean
}

/** Slot interface */
export interface Slot {
    slot: string,
    content: string,
    props: Props
}