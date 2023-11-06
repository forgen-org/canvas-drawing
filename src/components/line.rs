use crate::shared::pos::*;
use wasm_bindgen::prelude::*;
use web_sys::CanvasRenderingContext2d;

#[wasm_bindgen]
#[derive(Default)]
pub enum LineStyle {
    #[default]
    Solid,
    Dashed,
    Dotted,
}

#[wasm_bindgen]
#[derive(Default)]
pub enum LineCap {
    #[default]
    Butt,
    Round,
    Square,
}

impl std::string::ToString for LineCap {
    fn to_string(&self) -> String {
        match self {
            LineCap::Butt => String::from("butt"),
            LineCap::Round => String::from("round"),
            LineCap::Square => String::from("square"),
        }
    }
}

#[wasm_bindgen]
pub struct Line {
    from: Pos,
    to: Pos,
    color: String,
    width: f64,
    style: LineStyle,
    cap: LineCap,
    quadratic_curve: Option<Pos>,
    bezier_curve: Option<(Pos, Pos)>,
}

#[wasm_bindgen]
impl Line {
    pub fn from(mut self, x: f64, y: f64) -> Line {
        self.from = pos(x, y);
        self
    }

    pub fn to(mut self, x: f64, y: f64) -> Line {
        self.to = pos(x, y);
        self
    }

    pub fn width(mut self, width: f64) -> Line {
        self.width = width;
        self
    }

    pub fn color(mut self, color: String) -> Line {
        self.color = color;
        self
    }

    pub fn style(mut self, style: LineStyle) -> Line {
        self.style = style;
        self
    }

    pub fn cap(mut self, cap: LineCap) -> Line {
        self.cap = cap;
        self
    }

    #[wasm_bindgen(js_name = quadraticCurve)]
    pub fn quadratic_curve(mut self, x: f64, y: f64) -> Line {
        self.quadratic_curve = pos(x, y).into();
        self
    }

    #[wasm_bindgen(js_name = bezierCurve)]
    pub fn bezier_curve(mut self, x1: f64, y1: f64, x2: f64, y2: f64) -> Line {
        self.bezier_curve = (pos(x1, y1), pos(x2, y2)).into();
        self
    }

    pub fn draw(&self, context: CanvasRenderingContext2d) -> CanvasRenderingContext2d {
        context.save();

        context.begin_path();

        context.set_line_cap(&self.cap.to_string());
        context.set_line_width(self.width);
        context.set_stroke_style(&JsValue::from(&self.color));
        Line::set_line_style(&context, &self.style);

        context.move_to(self.from.x, self.from.y);

        match &self.quadratic_curve {
            Some(cp) => {
                context.quadratic_curve_to(cp.x, cp.y, self.to.x, self.to.y);
            }
            None => match &self.bezier_curve {
                Some(cp) => {
                    context.bezier_curve_to(cp.0.x, cp.0.y, cp.1.x, cp.1.y, self.to.x, self.to.y);
                }
                None => {
                    context.line_to(self.to.x, self.to.y);
                }
            },
        }
        context.stroke();
        context
    }
}

impl Line {
    pub fn get_from(&self) -> &Pos {
        &self.from
    }

    pub fn get_to(&self) -> &Pos {
        &self.to
    }

    pub fn get_quadratic_curve(&self) -> &Option<Pos> {
        &self.quadratic_curve
    }

    pub fn get_bezier_curve(&self) -> &Option<(Pos, Pos)> {
        &self.bezier_curve
    }
    pub fn set_line_style(context: &CanvasRenderingContext2d, line_style: &LineStyle) {
        match line_style {
            LineStyle::Solid => {
                context.set_line_dash(&js_sys::Array::new()).unwrap();
            }
            LineStyle::Dashed => {
                context
                    .set_line_dash(&js_sys::Float64Array::from(
                        [2.4 * context.line_width(), context.line_width()].as_ref(),
                    ))
                    .unwrap();
            }
            LineStyle::Dotted => {
                context
                    .set_line_dash(&js_sys::Float64Array::from(
                        [context.line_width(), context.line_width()].as_ref(),
                    ))
                    .unwrap();
            }
        }
    }
}

impl Default for Line {
    fn default() -> Self {
        Self {
            from: Pos::default(),
            to: pos(100.0, 100.0),
            color: String::from("#000"),
            width: 4.0,
            style: LineStyle::default(),
            cap: LineCap::default(),
            quadratic_curve: None,
            bezier_curve: None,
        }
    }
}

#[wasm_bindgen]
pub fn line() -> Line {
    Line::default()
}
