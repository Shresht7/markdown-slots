/**
 * Creates a regex to match the given slot
 * 
 * for example:
 * 
 * using a slot name of `text` will create a regex to match
 * ```md
 * <!-- slot: text (...slotProps) -->
 *  (...defaultContent)
 * <!-- /slot -->
 * ```
 * where, `slotProps` and `defaultContent` are capture-able groups
*/
export function createSlotRegex(slot: string) {
    //  Generate regular expression for the markdown slot
    return new RegExp(
        [
            '<!--',             //  Matches <!--
            '\\s*',             //  Matches zero or more spaces
            'slot:',            //  Matches slot:
            '\\s*',
            slot,               //  Matches the provided slot name
            '\\s*',
            '(.*?)',            //  Extract props string (e.g. {hello: world} {color: red} {bold})
            '\\s*',
            '-->',              //  Matches -->
            '\\s*',
            '([\\s\\S.]*?)',    //  Matches literally anything
            '\\s*',
            '<!--',             // Matches <!--
            '\\s*',
            '\\/slot',          //  Matches /slot
            '\\s*',
            '-->'               //  Matches -->
        ].join(''),
        'im'                    //  Flags
    )
}