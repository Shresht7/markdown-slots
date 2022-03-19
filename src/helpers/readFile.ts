//  Library
import * as fs from 'node:fs'
import * as path from 'node:path'
import isUrl from 'is-url-superb'
import { workspace } from '../config'

/** Read file from the given path or url */
export async function readFile(src: string) {
    return isUrl(src)
        ? readFromURL(src)
        : readFromFile(src)
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

/** Read from the given path */
function readFromFile(src: string): Promise<string> {
    const srcPath = path.join(workspace, src)
    return fs.promises.readFile(srcPath, { encoding: 'utf-8' })
}