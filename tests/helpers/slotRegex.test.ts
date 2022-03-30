//  Library
import { createSlotRegex } from '../../src/helpers/createSlotRegex'

describe('Slot Regex', () => {

    const regex = createSlotRegex('test')

    it('should create a regular expression', () => {
        expect(regex).toBeInstanceOf(RegExp)
    })

    it('should match a slot with the given slot-name', () => {
        const str = `
            <!-- slot: test -->
            <!-- /slot -->
        `
        expect(str).toMatch(regex)
    })

    it('should not match a slot with a different slot-name', () => {
        const str = `
            <!-- slot: jest -->
            <!-- /slot -->
        `
        expect(str).not.toMatch(regex)
    })

    it('should match a slot with default content', () => {
        const str = `
            <!-- slot: test -->
                Default Text
            <!-- /slot -->
        `
        expect(str).toMatch(regex)
    })

    it('should match inline slots', () => {
        const str = '<!-- slot: test --><!-- /slot -->'
        expect(str).toMatch(regex)
    })

    it('should match inline slots with default content', () => {
        const str = '<!-- slot: test -->Default Text<!-- /slot -->'
        expect(str).toMatch(regex)
    })

    it('should match slots without spaces', () => {
        const str = `<!--slot:test--><!--/slot-->`
        expect(str).toMatch(regex)
    })

    it('should match slots with additional attributes', () => {
        const str = `
            <!-- slot: test, prepend: "<p align='center'>", append: </p> -->
            <!-- /slot -->
        `
        expect(str).toMatch(regex)
    })

    it('should match multiline definitions', () => {
        const str = `
            <!--
                slot: test,
                prepend: "<p align='center'>",
                append: </p>
            -->
                Default Text
            <!-- /slot -->
        `
        expect(str).toMatch(regex)
    })

    it('should not match if there is no closing slot tag', () => {
        const str = `
            <!-- slot: test -->
                Default Text
            <!-- Done -->
        `
        expect(str).not.toMatch(regex)
    })

})