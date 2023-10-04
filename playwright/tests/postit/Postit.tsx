import React from 'react'
import Canvas from '../Canvas'
import { postit } from '../../../pkg/canvas_drawing'

export const DefaultPostit = () => {
  const draw = (context: CanvasRenderingContext2D) => {
    postit(10, 10).draw(context)
  }
  return <Canvas width={300} height={300} draw={draw} />
}

export const PostitWithCustomDimensions = () => {
  const draw = (context: CanvasRenderingContext2D) => {
    postit(10, 10).width(200).height(200).draw(context)
  }
  return <Canvas width={300} height={300} draw={draw} />
}

export const PostitWithPortraitOrientation = () => {
  const draw = (context: CanvasRenderingContext2D) => {
    postit(10, 10).width(140).height(200).draw(context)
  }
  return <Canvas width={300} height={300} draw={draw} />
}

export const PostitWithLandscapeOrientation = () => {
  const draw = (context: CanvasRenderingContext2D) => {
    postit(10, 10).width(200).height(140).draw(context)
  }
  return <Canvas width={300} height={300} draw={draw} />
}

export const PostitWithCustomColor = () => {
  const draw = (context: CanvasRenderingContext2D) => {
    postit(10, 10).color("#73A8C9").draw(context)
  }
  return <Canvas width={300} height={300} draw={draw} />
}

export const PostitWithCustomAngle = () => {
  const draw = (context: CanvasRenderingContext2D) => {
    postit(10, 10).angle(-10).draw(context)
  }
  return <Canvas width={300} height={300} draw={draw} />
}
