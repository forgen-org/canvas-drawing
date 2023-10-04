import React from 'react'
import { test, expect } from '@playwright/experimental-ct-react'
import { DefaultPostit, PostitWithCustomAngle, PostitWithCustomColor, PostitWithCustomDimensions, PostitWithLandscapeOrientation, PostitWithPortraitOrientation } from './Postit'

test('Default postit', async ({ mount }) => {
  const component = await mount(<DefaultPostit />)
  await expect(component).toHaveScreenshot()
})

test('Postit with custom dimensions', async ({ mount }) => {
  const component = await mount(<PostitWithCustomDimensions />)
  await expect(component).toHaveScreenshot()
})

test('Postit with portait orientation', async ({ mount }) => {
  const component = await mount(<PostitWithPortraitOrientation />)
  await expect(component).toHaveScreenshot()
})

test('Postit with landscape orientation', async ({ mount }) => {
  const component = await mount(<PostitWithLandscapeOrientation />)
  await expect(component).toHaveScreenshot()
})

test('Postit with custom color', async ({ mount }) => {
  const component = await mount(<PostitWithCustomColor />)
  await expect(component).toHaveScreenshot()
})

test('Postit with custom angle', async ({ mount }) => {
  const component = await mount(<PostitWithCustomAngle />)
  await expect(component).toHaveScreenshot()
})
