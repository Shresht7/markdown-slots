//  Library
import * as fs from 'node:fs'
import isUrl from 'is-url-superb'

/** Read file from the given path or url */
export async function readFile(src: string) {
    return isUrl(src)
        ? readFromURL(src)
        : fs.promises.readFile(src, { encoding: 'utf-8' })
}

/** Read from the given URL */
function readFromURL(url: string): Promise<string> {
    return fetch(url)
        .then(res => {
            if (res.ok) {
                return res.text()
            } else {
                throw new Error(`Failed to read from ${url}`)
            }
        })
}