export function getProps(propsString: string): Record<string, string | number | boolean> {
    const props: Record<string, string | number | boolean> = {}

    for (const str of propsString.split(/\|/i)) {
        const match = str.match(/\{\s*(\w+)\s*:?\s*([\s\S.]+?)\s*}/i) || []
        const key = match?.[1]
        if (!key) { continue }
        const value = match?.[2] || true
        props[key] = value
    }

    console.log(props)

    return props
}