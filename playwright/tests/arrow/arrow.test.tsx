import React from 'react'
import { test, expect } from '@playwright/experimental-ct-react'
import {ArrowFromXToY, ArrowWithCurvedBody, ArrowWithHeadColor, ArrowWithHeadWidth, ArrowWithSize, DefaultArrow} from './Arrow'

test('Default arrow', async ({ mount }) => {
  const component = await mount(<DefaultArrow />)
  await expect(component).toHaveScreenshot()
})

test('Arrow from X to Y', async ({ mount }) => {
  const component = await mount(<ArrowFromXToY />)
  await expect(component).toHaveScreenshot()
})

test('Arrow with head color', async ({ mount }) => {
  const component = await mount(<ArrowWithHeadColor />)
  await expect(component).toHaveScreenshot()
})

test('Arrow with head width', async ({ mount }) => {
  const component = await mount(<ArrowWithHeadWidth />)
  await expect(component).toHaveScreenshot()
})

test('Arrow with head size', async ({ mount }) => {
  const component = await mount(<ArrowWithSize />)
  await expect(component).toHaveScreenshot()
})

test('Arrow with curved body', async ({ mount }) => {
  const component = await mount(<ArrowWithCurvedBody />)
  await expect(component).toHaveScreenshot()
})
