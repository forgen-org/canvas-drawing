import React from 'react'
import { test, expect } from '@playwright/experimental-ct-react'
import {DefaultDiamond, DefaultEllipse, DefaultRectangle, ShapeWithBackground, ShapeWithBorderColor, ShapeWithBorderStyle, ShapeWithBorderWidth, ShapeWithHeight, ShapeWithOpacity, ShapeWithWidth, ShapeWithX, ShapeWithY} from './Shape'

test('Default rectangle', async ({ mount }) => {
  const component = await mount(<DefaultRectangle />)
  await expect(component).toHaveScreenshot()
})
test('Default ellipse', async ({ mount }) => {
  const component = await mount(<DefaultEllipse />)
  await expect(component).toHaveScreenshot()
})
test('Default diamond', async ({ mount }) => {
  const component = await mount(<DefaultDiamond />)
  await expect(component).toHaveScreenshot()
})
test('Shape with background', async ({ mount }) => {
  const component = await mount(<ShapeWithBackground />)
  await expect(component).toHaveScreenshot()
})
test('Shape with width', async ({ mount }) => {
  const component = await mount(<ShapeWithWidth />)
  await expect(component).toHaveScreenshot()
})
test('Shape with height', async ({ mount }) => {
  const component = await mount(<ShapeWithHeight />)
  await expect(component).toHaveScreenshot()
})
test('Shape with x', async ({ mount }) => {
  const component = await mount(<ShapeWithX />)
  await expect(component).toHaveScreenshot()
})
test('Shape with y', async ({ mount }) => {
  const component = await mount(<ShapeWithY />)
  await expect(component).toHaveScreenshot()
})
test('Shape with border width', async ({ mount }) => {
  const component = await mount(<ShapeWithBorderWidth />)
  await expect(component).toHaveScreenshot()
})
test('Shape with border style', async ({ mount }) => {
  const component = await mount(<ShapeWithBorderStyle />)
  await expect(component).toHaveScreenshot()
})
test('Shape with border color', async ({ mount }) => {
  const component = await mount(<ShapeWithBorderColor />)
  await expect(component).toHaveScreenshot()
})
test('Shape with opacity', async ({ mount }) => {
  const component = await mount(<ShapeWithOpacity />)
  await expect(component).toHaveScreenshot()
})
