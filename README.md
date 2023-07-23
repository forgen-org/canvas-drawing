# canvas-drawing

A bunch of functions with css like arguments that make canvas drawing easier

## Example with React
```javascript
import React, { useEffect, useRef } from 'react'
import { drawRectangle } from '@constellation-org/canvas-drawing'

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (canvasRef.current) {
      const context = canvasRef.current.getContext('2d')
      if (context) {
        drawRectangle(context, {
          x: 20,
          y: 20,
          width: 50,
          height: 50,
          backgroundColor: 'red',
          borderColor: 'blue'
          opacity: 0.5 
        })
      }
    }
  }, [])
  return (
    <canvas ref={canvasRef} />
  )

}
```

## drawRectangle

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `x`       | `number` | **Required**. X position of the top left corner |
| `y`       | `number` | **Required**. Y position of the top left corner |
| `width`   | `number` | **Required**. Total width of the rectangle, borders included |
| `height`  | `number` | **Required**. Total height of the rectangle, borders included |
| `opacity`  | `number` | Between 0 and 1. Default: 1 |
| `backgroundColor`  | `string` | A string parsed as [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_colors) color or a [CanvasGradient](https://developer.mozilla.org/en-US/docs/Web/API/CanvasGradient) object |
| `borderStyle`  | `"solid"` \| `"dashed"` \| `"dotted"` | Default: solid |
| `borderColor`  | `string` | A string parsed as [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_colors) color or a [CanvasGradient](https://developer.mozilla.org/en-US/docs/Web/API/CanvasGradient) object |
| `borderWidth`  | `number` | Default: 4 |



