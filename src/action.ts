//  Library
import * as core from '@actions/core'
import * as fs from 'node:fs'
import {
    src,
    dest,
    slots,
    isDryRun,
    globalProps
} from './config'

//  Helpers
import { outputs } from './metadata'
import {
    readFile,
    getProps,
    createSlotRegex,
    placeSlotContent
} from './helpers'

//  ======
//  ACTION
//  ======

/** Markdown-Slots GitHub Action */
async function action() {

    //  Read file-contents with markdown-slots
    let contents = await readFile(src)

    //  Place content in markdown-slots
    core.startGroup('Placing contents in slots')
    for (let { slot, content, props } of slots) {

        //  Create regex for the markdown slot
        const regex = createSlotRegex(slot)

        //  Match regex contents
        const match = contents.match(regex)
        if (!match) { continue }    //  Continue if no match is found

        //  Get props
        const str = match?.at(1) || ''
        props = { ...globalProps, ...props, ...getProps(str) }

        //  Place content
        core.info(`\t - ${slot}`)
        contents = contents.replace(
            regex,
            placeSlotContent(slot, content, props)
        )

    }
    core.endGroup()

    //  Log the generated contents
    core.startGroup('Generated File Contents')
    core.info(contents)
    core.endGroup()

    //  Set Output
    core.setOutput(outputs.contents, contents)

    //  Return early if this was a dry-run
    if (isDryRun) {
        core.warning('Note: This is a dry-run!')
        return
    }

    //  Write generated content back to file
    await fs.promises.writeFile(dest, contents, { encoding: 'utf-8' })
    core.notice(`Content written to ${dest}`)
}

//  -----------------
export default action
//  -----------------