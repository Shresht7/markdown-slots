export function createSlotRegex(slot: string) {
    //  Generate regular expression for the markdown slot
    return new RegExp('<!--\\s*slot:\\s*' + slot + '\\s*-->\\s*([\\s\\S.]*?)\\s*<!--\\s*\\/slot\\s*-->', 'gim')
}