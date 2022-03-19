export function getProps(propsString: string): Record<string, string | number | boolean> {
    const props: Record<string, string | number | boolean> = {}

    const matches = propsString?.match(/(\w+):?\s*([\w\d]+)?/gi)?.shift() || []

    console.log(matches)

    for (let i = 0; i < matches.length; i = i + 2) {

        const key = matches[i]
        const value = matches?.[i + 1] || true
        props[key] = value

    }

    console.log(props)

    return props
}