//  Library
import { getProps } from '../../src/helpers/getProps'

describe('Get Props', () => {

    it('should parse a props-string', () => {
        const str = 'name: john, age: 45, male'
        const props = getProps(str)
        expect(props).toStrictEqual({ str, name: 'john', age: 45, male: true })
    })

    it('should match a single property', () => {
        const str = 'removeSlots: true'
        expect(getProps(str)).toStrictEqual({ str, removeSlots: true })
    })

    it('should match multiple properties', () => {
        const str = 'name: jane, age: 37, female'
        expect(getProps(str)).toStrictEqual({ str, name: 'jane', age: 37, female: true })
    })

    it('should extract string', () => {
        const str = 'prepend: text'
        expect(getProps(str)).toStrictEqual({ str, prepend: 'text' })
    })

    it('should extract numbers', () => {
        const str = 'age: 45'
        expect(getProps(str)).toStrictEqual({ str, age: 45 })
    })

    it('should extract booleans', () => {
        const str = 'removeSlots: true'
        expect(getProps(str)).toStrictEqual({ str, removeSlots: true })
    })

})