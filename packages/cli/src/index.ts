#!/usr/bin/env node
// @possible-cms/cli — init, export, import, doctor.
// Implementation: Epic 10.

import { initCommand } from './commands/init'
import { exportCommand } from './commands/export'
import { importCommand } from './commands/import'
import { doctorCommand } from './commands/doctor'

const [, , command, ...args] = process.argv

const commands: Record<string, (args: string[]) => Promise<void>> = {
  init: initCommand,
  export: exportCommand,
  import: importCommand,
  doctor: doctorCommand,
}

async function main() {
  if (!command || !commands[command]) {
    console.log(`Usage: possible-cms <command> [args]

Commands:
  init <project>           Scaffold a new project schema bundle
  export --site <slug>     Export content as JSON for static builds
  import <source>          Import from a static content tree (migration helper)
  doctor                   Check local deployment health (Phase B)
`)
    process.exit(command ? 1 : 0)
  }
  await commands[command](args)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
