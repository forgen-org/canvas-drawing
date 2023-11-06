use crate::components::line::Line;
use crate::components::line::LineStyle;
use crate::shared::pos::*;
use wasm_bindgen::prelude::*;
use web_sys::CanvasRenderingContext2d;
use web_sys::Path2d;

#[wasm_bindgen]
pub struct RoundRect {
    pos: Pos,
    width: f64,
    height: f64,
    radius: f64,
    background_color: Option<String>,
    border_style: LineStyle,
    border_color: String,
    border_width: f64,
    opacity: f64,
}

#[wasm_bindgen]
impl RoundRect {
    pub fn x(mut self, x: f64) -> RoundRect {
        self.pos = pos(x, self.pos.y);
        self
    }

    pub fn y(mut self, y: f64) -> RoundRect {
        self.pos = pos(self.pos.x, y);
        self
    }

    pub fn width(mut self, width: f64) -> RoundRect {
        self.width = width;
        self
    }

    pub fn height(mut self, height: f64) -> RoundRect {
        self.height = height;
        self
    }

    pub fn radius(mut self, radius: f64) -> RoundRect {
        self.radius = radius;
        self
    }

    #[wasm_bindgen(js_name = backgroundColor)]
    pub fn background_color(mut self, background_color: Option<String>) -> RoundRect {
        self.background_color = background_color;
        self
    }

    #[wasm_bindgen(js_name = borderStyle)]
    pub fn border_style(mut self, border_style: LineStyle) -> RoundRect {
        self.border_style = border_style;
        self
    }

    #[wasm_bindgen(js_name = borderColor)]
    pub fn border_color(mut self, border_color: String) -> RoundRect {
        self.border_color = border_color;
        self
    }

    #[wasm_bindgen(js_name = borderWidth)]
    pub fn border_width(mut self, border_width: f64) -> RoundRect {
        self.border_width = border_width;
        self
    }

    pub fn opacity(mut self, opacity: f64) -> RoundRect {
        self.opacity = opacity;
        self
    }

    pub fn draw(&self, context: CanvasRenderingContext2d) -> CanvasRenderingContext2d {
        let r = self.pos.x + self.width;
        let b = self.pos.y + self.height;
        context.save();
        let path = Path2d::new().unwrap();
        path.move_to(self.pos.x + self.radius, self.pos.y);
        path.line_to(r - self.radius, self.pos.y);
        path.quadratic_curve_to(r, self.pos.y, r, self.pos.y + self.radius);
        path.line_to(r, self.pos.y + self.height - self.radius);
        path.quadratic_curve_to(r, b, r - self.radius, b);
        path.line_to(self.pos.x + self.radius, b);
        path.quadratic_curve_to(self.pos.x, b, self.pos.x, b - self.radius);
        path.line_to(self.pos.x, self.pos.y + self.radius);
        path.quadratic_curve_to(self.pos.x, self.pos.y, self.pos.x + self.radius, self.pos.y);

        // Clip because stroke is centered
        // so shape (border included)
        // can overflow the given width and height
        // if borderWidth > 1
        context.clip_with_path_2d(&path);

        context.set_global_alpha(self.opacity);

        match &self.background_color {
            Some(color) => {
                context.set_fill_style(&JsValue::from_str(color));
                context.fill_with_path_2d(&path);
            }
            None => {}
        }
        context.set_stroke_style(&JsValue::from_str(&self.border_color));

        // lineWidth first set to borderWidth
        // because setLineStyle use lineWidth to
        // conpute dashes and dotted spaces
        context.set_line_width(self.border_width);
        Line::set_line_style(&context, &self.border_style);

        // Default stroke is centered and cannot be changed to inner
        // so clip + multiplying by 2 do the job
        context.set_line_width(self.border_width * 2.0);

        context.stroke_with_path(&path);

        context.restore();
        context
    }
}

impl Default for RoundRect {
    fn default() -> Self {
        Self {
            pos: Pos::default(),
            radius: 20.0,
            width: 200.0,
            height: 200.0,
            background_color: None,
            border_style: LineStyle::default(),
            border_color: "#000".into(),
            border_width: 4.0,
            opacity: 1.0,
        }
    }
}

#[wasm_bindgen(js_name = roundRect)]
pub fn round_rect() -> RoundRect {
    RoundRect::default()
}
