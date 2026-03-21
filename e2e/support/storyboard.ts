import { test } from '@playwright/test'
import { PlaywrightStoryboard } from 'visual-storyboard/integrations/playwright'
import { FileTransport } from 'visual-storyboard/transports/file'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const outDir = join(dirname(fileURLToPath(import.meta.url)), '../../e2e-results/storyboards')

export const storyboard = new PlaywrightStoryboard({
  transport: (testInfo) => {
    const slug = testInfo.title
      .toLowerCase()
      .replace(/\W+/g, ' ')
      .trim()
      .replace(/\s+/g, '-')
    return new FileTransport({ outputFile: join(outDir, `${slug}.ndjson`) })
  },
}).install(test)
