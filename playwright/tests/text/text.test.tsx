import React from 'react'
import { test, expect } from '@playwright/experimental-ct-react'
import {DefaultText, TextWithBorderColor, TextWithColor, TextWithFontFamily, TextWithFontSize, TextWithFontStyle, TextWithFontWeight, TextWithLineHeight, TextWithMaxWidth, TextWithUnderline} from './Text'

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

test('Text with font-style', async ({ mount }) => {
  const component = await mount(<TextWithFontStyle />)
  await expect(component).toHaveScreenshot()
})

test('Text with font-weight', async ({ mount }) => {
  const component = await mount(<TextWithFontWeight />)
  await expect(component).toHaveScreenshot()
})

test('Text with underline', async ({ mount }) => {
  const component = await mount(<TextWithUnderline />)
  await expect(component).toHaveScreenshot()
})
