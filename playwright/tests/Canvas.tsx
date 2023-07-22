import React, { useRef, useEffect } from 'react'

export default ({ width, height, draw }) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (canvasRef.current) {
      const context = canvasRef.current.getContext(
        '2d'
      ) as CanvasRenderingContext2D
      if (context) {
        draw(context)
      }
    }
  }, [canvasRef])

  const canvasStyle = {
    width: `${width}px`,
    height: `${height}px`,
  }
  return (
    <canvas
      width={width}
      height={height}
      style={canvasStyle}
      ref={canvasRef}
    ></canvas>
  )
}
