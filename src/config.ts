//  Library
import * as core from '@actions/core'
import * as path from 'node:path'
import * as jsYaml from 'js-yaml'

//  ======
//  CONFIG
//  ======

const workspace = process.env.GITHUB_WORKSPACE || ''

// FILE PATHS
// ==========

/** Path to the source file with markdown-slots */
export const src = core.getInput('src')
/** Workspace resolved source path */
export const srcPath = path.join(workspace, src)

/** Path to output generated file-contents */
export const dest = core.getInput('dest')
/** Workspace resolved source path */
export const destPath = path.join(workspace, dest)

// SLOTS
// =====

/** YAML configuration mapping slotNames and slotContents */
export const slots = jsYaml.load(core.getMultilineInput('slots').join('\n')) as Record<string, string>

/** Boolean to determine if this action should remove slot tags upon replacement */
export const removeSlots = core.getBooleanInput('remove-slots')

// MISCELLANEOUS
// =============

/** Boolean to determine if this is a dry-run */
export const isDryRun = core.getBooleanInput('dry-run')