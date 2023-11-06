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

        ctx.set_line_width(self.width);
        ctx.set_line_cap("round");
        ctx.begin_path();

        ctx.move_to(
            pos.x - (self.size * (angle - std::f64::consts::PI / 6.0).cos()),
            pos.y - (self.size * (angle - std::f64::consts::PI / 6.0).sin()),
        );

        ctx.line_to(pos.x, pos.y);

        ctx.line_to(
            pos.x - (self.size * (angle + std::f64::consts::PI / 6.0).cos()),
            pos.y - (self.size * (angle + std::f64::consts::PI / 6.0).sin()),
        );

        ctx.stroke();

        ctx.restore();
        ctx
    }
}

#[wasm_bindgen]
#[derive(Default)]
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
            Some(cp) => (self.body.get_to().y - cp.y).atan2(self.body.get_to().x - cp.x),
            None => match &self.body.get_bezier_curve() {
                Some(cp) => (self.body.get_to().y - cp.1.y).atan2(self.body.get_to().x - cp.1.x),
                None => (self.body.get_to().y - self.body.get_from().y)
                    .atan2(self.body.get_to().x - self.body.get_from().x),
            },
        };

        let context = self.head.draw(self.body.get_to(), angle, context);

        context.restore();

        context
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
