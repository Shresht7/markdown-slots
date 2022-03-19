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

        console.log(slot)
        console.log(content)

        //  Create regex for the markdown slot
        const regex = createSlotRegex(slot)

        if (!regex.test(contents)) { break }    //  Break if no match is found

        //  Get props
        const [props, propsString] = getProps(content, regex)

        //  Attach prefix
        if (props.prefix) { contents = props.prefix + contents }

        //  Substitute content
        core.info(`\t - ${slot}`)
        contents = contents.replace(
            regex,
            placeSlotContent(slot, propsString, content, removeSlots)
        )

        if (props.suffix) { contents = contents + props.suffix }

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