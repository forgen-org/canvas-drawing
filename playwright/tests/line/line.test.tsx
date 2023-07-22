import React from 'react'
import { test, expect } from '@playwright/experimental-ct-react'
import { BezierCurvedLine, DefaultLine, LineFromXToY, LineWithCap, LineWithColor, LineWithStyle, LineWithWidth, QuadraticCurvedLine } from './Line'

test('Default line', async ({ mount }) => {
  const component = await mount(<DefaultLine />)
  await expect(component).toHaveScreenshot()
})

test('Line from X to Y', async ({ mount }) => {
  const component = await mount(<LineFromXToY />)
  await expect(component).toHaveScreenshot()
})

test('Line with style', async ({ mount }) => {
  const component = await mount(<LineWithStyle />)
  await expect(component).toHaveScreenshot()
})

test('Line with cap', async ({ mount }) => {
  const component = await mount(<LineWithCap />)
  await expect(component).toHaveScreenshot()
})

test('Line with color', async ({ mount }) => {
  const component = await mount(<LineWithColor />)
  await expect(component).toHaveScreenshot()
})

test('Line with width', async ({ mount }) => {
  const component = await mount(<LineWithWidth />)
  await expect(component).toHaveScreenshot()
})

test('QuadraticCurvedLine', async ({ mount }) => {
  const component = await mount(<QuadraticCurvedLine />)
  await expect(component).toHaveScreenshot()
})

test('BezierCurvedLine', async ({ mount }) => {
  const component = await mount(<BezierCurvedLine />)
  await expect(component).toHaveScreenshot()
})
