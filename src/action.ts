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

//  ======
//  ACTION
//  ======

async function action() {

    //  Read file-contents with markdown-slots
    let contents = await fs.promises.readFile(srcPath, { encoding: 'utf-8' })

    //  Place content in markdown-slots
    core.startGroup('Placing contents in slots')
    for (const [slotName, content] of Object.entries(slots)) {

        //  Generate regular expression for the markdown slot
        const regex = new RegExp('<!--\\s*slot:\\s*' + slotName + '\\s*-->\\s*([\\s\\S.]*?)\\s*<!--\\s*\\/slot\\s*-->', 'gim')

        if (!regex.test(contents)) { break }    //  Break if no match is found

        //  Substitute content
        core.info(`\t - ${slotName}`)
        contents = contents.replace(
            regex,
            removeSlots
                ? content
                : `<!-- slot: ${slotName} -->\n\n${content}\n\n<!-- /slot -->`
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