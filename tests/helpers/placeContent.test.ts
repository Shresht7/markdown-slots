//  Library
import { placeSlotContent } from '../../src/helpers/placeSlotContent'

// TODO: Add Tests for Place Slot Contents
describe('Place Slot Contents', () => {

    it('should place content in markdown-slots', () => {
        const content = 'Hello World!'
        const result = placeSlotContent('test', content)
        expect(result).toBe([
            '<!-- slot: test  -->',
            'Hello World!',
            '<!-- /slot -->'
        ].join('\n'))
    })

    it('should prepend the provided text', () => {
        const code = 'console.log(x)'
        const result = placeSlotContent('test', code, { str: 'prepend: ```js', prepend: '```js' })
        expect(result).toBe([
            '<!-- slot: test | prepend: ```js -->',
            '```js',
            'console.log(x)',
            '<!-- /slot -->'
        ].join('\n'))
    })

    it('should append the provided text', () => {
        const code = 'console.log(x)'
        const result = placeSlotContent('test', code, { str: 'append: ```', append: '```' })
        expect(result).toBe([
            '<!-- slot: test | append: ``` -->',
            'console.log(x)',
            '```',
            '<!-- /slot -->'
        ].join('\n'))
    })

})