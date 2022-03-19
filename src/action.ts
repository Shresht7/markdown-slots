//  Library
import * as core from '@actions/core'
import * as fs from 'node:fs'
import {
    dest,
    srcPath,
    destPath,
    slots,
    removeSlots,
    isDryRun
} from './config'

//  Helpers
import { createSlotRegex, placeSlotContent, readFile } from './helpers'

//  ======
//  ACTION
//  ======

async function action() {

    //  Read file-contents with markdown-slots
    let contents = await readFile(srcPath)

    //  Place content in markdown-slots
    core.startGroup('Placing contents in slots')
    for (const [slot, content] of Object.entries(slots)) {

        //  Create regex for the markdown slot
        const regex = createSlotRegex(slot)

        if (!regex.test(contents)) { break }    //  Break if no match is found

        //  Substitute content
        core.info(`\t - ${slot}`)
        contents = contents.replace(
            regex,
            placeSlotContent(slot, content, removeSlots)
        )

    }
    core.endGroup()

    //  Log the generated contents
    core.startGroup('Generated File Contents')
    core.info(contents)
    core.endGroup()

    //  Return early if this was a dry-run
    if (isDryRun) {
        core.warning('Note: This is a dry-run!')
        return
    }

    //  Write generated content back to file
    await fs.promises.writeFile(destPath, contents, { encoding: 'utf-8' })
    core.notice(`Content written to ${dest}`)
}

//  -----------------
export default action
//  -----------------