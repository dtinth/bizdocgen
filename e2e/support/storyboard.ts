import { test } from '@playwright/test'
import { PlaywrightStoryboard } from 'visual-storyboard/integrations/playwright'

export const storyboard = new PlaywrightStoryboard({ test }).install()
