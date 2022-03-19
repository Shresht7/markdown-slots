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
            '(.*?)',            //  Extract props string (e.g. hello: world color: red)
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
        'im'
    )
}