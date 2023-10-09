use wasm_bindgen::prelude::*;
use web_sys::CanvasRenderingContext2d;

use crate::components::line::Line;
use crate::shared::pos::Pos;

#[wasm_bindgen]
pub struct ArrowHead {
    color: String,
    width: f64,
    size: f64,
}

impl Default for ArrowHead {
    fn default() -> Self {
        Self {
            color: String::from("#000"),
            width: 4.0,
            size: 10.0,
        }
    }
}

#[wasm_bindgen]
impl ArrowHead {
    pub fn color(mut self, color: String) -> ArrowHead {
        self.color = color;
        self
    }

    pub fn width(mut self, width: f64) -> ArrowHead {
        self.width = width;
        self
    }

    pub fn size(mut self, size: f64) -> ArrowHead {
        self.size = size;
        self
    }
    fn draw(
        &self,
        pos: &Pos,
        angle: f64,
        ctx: CanvasRenderingContext2d,
    ) -> CanvasRenderingContext2d {
        ctx.save();

        ctx.set_stroke_style(&JsValue::from(&self.color));

        ctx.set_line_width(self.width.into());
        ctx.set_line_cap("round");
        ctx.begin_path();

        ctx.move_to(
            pos.x as f64 - (self.size as f64 * (angle - std::f64::consts::PI / 6.0).cos()),
            pos.y as f64 - (self.size as f64 * (angle - std::f64::consts::PI / 6.0).sin()),
        );

        ctx.line_to(pos.x.into(), pos.y.into());

        ctx.line_to(
            pos.x as f64 - (self.size as f64 * (angle + std::f64::consts::PI / 6.0).cos()),
            pos.y as f64 - (self.size as f64 * (angle + std::f64::consts::PI / 6.0).sin()),
        );

        ctx.stroke();

        ctx.restore();
        ctx
    }
}

#[wasm_bindgen]
pub struct Arrow {
    body: Line,
    head: ArrowHead,
}

#[wasm_bindgen]
impl Arrow {
    pub fn body(mut self, body: Line) -> Arrow {
        self.body = body;
        self
    }

    pub fn head(mut self, head: ArrowHead) -> Arrow {
        self.head = head;
        self
    }
    pub fn draw(&self, context: CanvasRenderingContext2d) -> CanvasRenderingContext2d {
        context.save();

        let context = self.body.draw(context);

        let angle = match &self.body.get_quadratic_curve() {
            Some(cp) => (self.body.get_to().y as f64 - cp.y as f64)
                .atan2(self.body.get_to().x as f64 - cp.x as f64),
            None => match &self.body.get_bezier_curve() {
                Some(cp) => (self.body.get_to().y as f64 - cp.1.y as f64)
                    .atan2(self.body.get_to().x as f64 - cp.1.x as f64),
                None => (self.body.get_to().y as f64 - self.body.get_from().y as f64)
                    .atan2(self.body.get_to().x as f64 - self.body.get_from().x as f64),
            },
        };

        let context = self.head.draw(self.body.get_to(), angle, context);

        context.restore();

        context
    }
}

impl Default for Arrow {
    fn default() -> Self {
        Self {
            body: Line::default(),
            head: ArrowHead::default(),
        }
    }
}

#[wasm_bindgen]
pub fn arrow() -> Arrow {
    Arrow::default()
}

#[wasm_bindgen(js_name = arrowHead)]
pub fn arrow_head() -> ArrowHead {
    ArrowHead::default()
}
