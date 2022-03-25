//  Library
import * as core from '@actions/core'
import * as jsYaml from 'js-yaml'
import { inputs } from './metadata'
import type { Slot } from './types'

//  ======
//  CONFIG
//  ======

// FILE PATHS
// ==========

/** Path to the source file with markdown-slots */
export const src = core.getInput(inputs.src, { required: true })

/** Path to output generated file-contents */
export const dest = core.getInput(inputs.dest, { required: true })

// SLOTS
// =====

/** YAML configuration mapping slotNames and slotContents */
export const slots = jsYaml.load(core.getMultilineInput(inputs.slots).join('\n')) as Slot[]

/** Boolean to determine if this action should remove slot tags upon replacement */
const removeSlots = core.getBooleanInput(inputs.removeSlots)

/** Global Props */
export const globalProps = {
    removeSlots
}

// MISCELLANEOUS
// =============

/** Boolean to determine if this is a dry-run */
export const isDryRun = core.getBooleanInput(inputs.isDryRun)