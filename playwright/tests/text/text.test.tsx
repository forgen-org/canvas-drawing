import React from 'react'
import { test, expect } from '@playwright/experimental-ct-react'
import {DefaultText, TextWithBorderColor, TextWithColor, TextWithFontFamily, TextWithFontSize, TextWithLineHeight, TextWithMaxWidth} from './Text'

test('Default text', async ({ mount }) => {
  const component = await mount(<DefaultText />)
  await expect(component).toHaveScreenshot()
})

test('Text with font size', async ({ mount }) => {
  const component = await mount(<TextWithFontSize />)
  await expect(component).toHaveScreenshot()
})

test('Text with color', async ({ mount }) => {
  const component = await mount(<TextWithColor />)
  await expect(component).toHaveScreenshot()
})

test('Text with font family', async ({ mount }) => {
  const component = await mount(<TextWithFontFamily />)
  await expect(component).toHaveScreenshot()
})

test('Text with border color', async ({ mount }) => {
  const component = await mount(<TextWithBorderColor />)
  await expect(component).toHaveScreenshot()
})

test('Text with line height', async ({ mount }) => {
  const component = await mount(<TextWithLineHeight />)
  await expect(component).toHaveScreenshot()
})

test('Text with max-width', async ({ mount }) => {
  const component = await mount(<TextWithMaxWidth />)
  await expect(component).toHaveScreenshot()
})
