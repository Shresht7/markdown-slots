//  Library
import * as core from '@actions/core'
import * as fs from 'node:fs'
import * as path from 'node:path'
import {
    src,
    dest,
    workspace,
    slots,
    removeSlots,
    isDryRun
} from './config'

//  Helpers
import {
    readFile,
    getProps,
    createSlotRegex,
    placeSlotContent
} from './helpers'

//  ======
//  ACTION
//  ======

async function action() {

    //  Read file-contents with markdown-slots
    let contents = await readFile(src)

    //  Place content in markdown-slots
    core.startGroup('Placing contents in slots')
    for (const [slot, content] of Object.entries(slots)) {

        //  Create regex for the markdown slot
        const regex = createSlotRegex(slot)

        //  Match regex contents
        const match = contents.match(regex)
        if (!match) { continue }    //  Continue if no match is found

        //  Get props
        const propsString = match?.at(1) || ''
        const props = getProps(propsString)

        //  Place content
        core.info(`\t - ${slot}`)
        contents = contents.replace(
            regex,
            placeSlotContent(slot, props, content, removeSlots)
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
    const destPath = path.join(workspace, dest)
    await fs.promises.writeFile(destPath, contents, { encoding: 'utf-8' })
    core.notice(`Content written to ${dest}`)
}

//  -----------------
export default action
//  -----------------