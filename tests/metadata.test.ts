//  Library
import * as fs from 'node:fs'
import * as jsYaml from 'js-yaml'
import { inputs, outputs } from '../src/metadata'

type ActionMetadata = {
    name: string,
    author: string,
    description: string,
    runs: {
        using: string,
        main: string,
    }
    branding: {
        icon: string,
        color: string,
    },
    inputs: Record<string, { description: string, default?: string, required: boolean }>,
    outputs: Record<string, { description: string }>
}

type PackageJSON = {
    name: string,
    description: string,
    main: string,
    scripts: Record<string, string>
}

const metadata: ActionMetadata = jsYaml.load(fs.readFileSync('./action.yml', { encoding: 'utf-8' })) as ActionMetadata
const packageJSON = JSON.parse(fs.readFileSync('./package.json', { encoding: 'utf-8' })) as PackageJSON

describe('Action Metadata', () => {

    test('name should be the same as in package.json', () => {
        expect(metadata.name).toBe(packageJSON.name)
    })

    test('description should be the same as in package.json', () => {
        expect(metadata.description).toBe(packageJSON.description)
    })

    // TODO: Add Version Check for package.json. Match with latest released tag.

    test('package.json main should point to the main entrypoint of the action', () => {
        expect(metadata.runs.main).toBe(packageJSON.main)
    })

    test('package.json should have the correct build script', () => {
        expect(packageJSON.scripts.build).toBe("ncc build src/index.ts --license licenses.txt")
    })

    test('inputs used in the code should match those defined in action metadata file', () => {
        const metadataInputs = Object.keys(metadata.inputs)
        const codeInputs = Object.values(inputs)
        expect(metadataInputs).toStrictEqual(codeInputs)
    })

    test('outputs used in the code should match those defined in the action metadata file', () => {
        const metadataOutputs = Object.keys(metadata.outputs)
        const codeOutputs = Object.values(outputs)
        expect(metadataOutputs).toStrictEqual(codeOutputs)
    })

})