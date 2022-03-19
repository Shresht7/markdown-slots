//  ================
//  TYPE DEFINITIONS
//  ================

/** Props available on the markdown slots tag */
export interface Props {
    propsString: string,
    prefix?: string,
    suffix?: string
}

/** Slot interface */
export interface Slot {
    slot: string,
    content: string,
    props: Props
}