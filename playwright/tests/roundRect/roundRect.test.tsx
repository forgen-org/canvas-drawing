import React from 'react'
import { test, expect } from '@playwright/experimental-ct-react'
import {DefaultRoundRect, RoundRectWithBackground, RoundRectWithBorderColor, RoundRectWithBorderStyle, RoundRectWithBorderWidth, RoundRectWithHeight, RoundRectWithOpacity, RoundRectWithRadius, RoundRectWithWidth, RoundRectWithX, RoundRectWithY} from './RoundRect'

test('Default roundRect', async ({ mount }) => {
  const component = await mount(<DefaultRoundRect />)
  await expect(component).toHaveScreenshot()
})

test('roundRect with radius', async ({ mount }) => {
  const component = await mount(<RoundRectWithRadius />)
  await expect(component).toHaveScreenshot()
})

test('roundRect with background', async ({ mount }) => {
  const component = await mount(<RoundRectWithBackground />)
  await expect(component).toHaveScreenshot()
})

test('roundRect with width', async ({ mount }) => {
  const component = await mount(<RoundRectWithWidth />)
  await expect(component).toHaveScreenshot()
})

test('roundRect with height', async ({ mount }) => {
  const component = await mount(<RoundRectWithHeight />)
  await expect(component).toHaveScreenshot()
})

test('roundRect with x', async ({ mount }) => {
  const component = await mount(<RoundRectWithX />)
  await expect(component).toHaveScreenshot()
})

test('roundRect with y', async ({ mount }) => {
  const component = await mount(<RoundRectWithY />)
  await expect(component).toHaveScreenshot()
})

test('roundRect with borderWidth', async ({ mount }) => {
  const component = await mount(<RoundRectWithBorderWidth />)
  await expect(component).toHaveScreenshot()
})

test('roundRect with borderStyle', async ({ mount }) => {
  const component = await mount(<RoundRectWithBorderStyle />)
  await expect(component).toHaveScreenshot()
})

test('roundRect with borderColor', async ({ mount }) => {
  const component = await mount(<RoundRectWithBorderColor />)
  await expect(component).toHaveScreenshot()
})

test.only('roundRect with opacity', async ({ mount }) => {
  const component = await mount(<RoundRectWithOpacity />)
  await expect(component).toHaveScreenshot()
})
