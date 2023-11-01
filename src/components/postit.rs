use crate::shared::pos::*;
use wasm_bindgen::prelude::*;
use web_sys::CanvasRenderingContext2d;

#[wasm_bindgen]
pub struct Postit {
    pos: Pos,
    color: String,
    width: f64,
    height: f64,
    angle: f64,
}

#[wasm_bindgen]
impl Postit {
    pub fn x(mut self, x: f64) -> Postit {
        self.pos = pos(x, self.pos.y);
        self
    }

    pub fn y(mut self, y: f64) -> Postit {
        self.pos = pos(self.pos.x, y);
        self
    }

    pub fn width(mut self, width: f64) -> Postit {
        self.width = width;
        self
    }

    pub fn height(mut self, height: f64) -> Postit {
        self.height = height;
        self
    }

    pub fn angle(mut self, angle: f64) -> Postit {
        self.angle = angle;
        self
    }

    pub fn color(mut self, color: String) -> Postit {
        self.color = color;
        self
    }

    pub fn draw(&self, context: CanvasRenderingContext2d) -> CanvasRenderingContext2d {
        context.save();
        context.begin_path();
        context.set_shadow_color("#05050555");
        context.set_shadow_offset_x(self.width / 30.0);
        context.set_shadow_offset_y(self.width / 20.0);
        context
            .translate(
                self.pos.x + self.width / 2.0,
                self.pos.y + self.height / 2.0,
            )
            .unwrap();
        context
            .rotate(self.angle * std::f64::consts::PI / 180.0)
            .unwrap();
        let x = -1.0 * self.width / 2.0;
        let y = -1.0 * self.height / 2.0;
        context.move_to(x, y);
        context.line_to(x + self.width, y);
        context.line_to(x + self.width * 1.0, y + self.height * 0.7);
        context.bezier_curve_to(
            x + self.width * 1.0,
            y + self.height * 0.75,
            x + self.width * 1.0,
            y + self.height * 0.75,
            x + self.width * 0.97,
            y + 0.7875 * self.height,
        );
        context.line_to(x + self.width * 0.83, y + self.height * 0.9625);
        context.bezier_curve_to(
            x + self.width * 0.8,
            y + self.height * 1.0,
            x + self.width * 0.8,
            y + self.height * 1.0,
            x + self.width * 0.7,
            y + self.height * 1.0,
        );
        context.line_to(x + self.width * 0.0, y + self.height);
        context.bezier_curve_to(
            x + self.width * 0.03,
            y + self.height * 0.7,
            x - self.width * 0.03,
            y + self.height * 0.7,
            x + self.width * 0.0,
            y + self.height * 0.18,
        );
        context.close_path();
        let gradient = context.create_linear_gradient(x, y, x + self.width, y + self.height);
        let c1 = crate::shared::color::Color::from_hexa(&self.color).unwrap();
        let c2 = c1.get_darker_color(0.1);
        let c3 = c1.get_lighter_color(0.1);
        gradient.add_color_stop(0.0, &c2.to_hexa()).unwrap();
        gradient.add_color_stop(0.6, &c1.to_hexa()).unwrap();
        gradient.add_color_stop(1.0, &c3.to_hexa()).unwrap();
        context.set_fill_style(&gradient);
        context.fill();
        context.set_shadow_color("rgba(0,0,0,0)");
        context.set_fill_style(&(c1.get_darker_color(0.4).to_hexa() + "20").into());
        context.fill_rect(x, y, self.width, self.height * 0.18);
        context.set_shadow_color("rgba(0,0,0,0)");
        context.begin_path();
        context.set_line_width(1.0);
        context.move_to(x + 0.77 * self.width, y + self.height * 1.0);
        context.bezier_curve_to(
            x + self.width * 0.8,
            y + self.height * 1.0,
            x + self.width * 0.87,
            y + self.height * 0.96,
            x + self.width * 0.86,
            y + self.height * 0.79,
        );
        context.bezier_curve_to(
            x + self.width * 0.88,
            y + self.height * 0.8,
            x + self.width * 1.0,
            y + self.height * 0.8,
            x + self.width * 1.0,
            y + self.height * 0.72,
        );
        context.line_to(x + self.width * 1.0, y + self.height * 0.7);
        context.bezier_curve_to(
            x + self.width * 1.0,
            y + self.height * 0.75,
            x + self.width * 1.0,
            y + self.height * 0.75,
            x + self.width * 0.97,
            y + self.height * 0.7875,
        );
        context.line_to(x + 0.83 * self.width, y + self.height * 0.9625);
        context.bezier_curve_to(
            x + self.width * 0.8,
            y + self.height * 1.0,
            x + self.width * 0.8,
            y + self.height * 1.0,
            x + self.width * 0.7,
            y + self.height * 1.0,
        );
        context.close_path();
        let gradient = context.create_linear_gradient(x + self.width, y + self.height, x, y);
        let c5 = c1.get_darker_color(0.2);
        let c6 = c1.get_darker_color(0.6);
        gradient.add_color_stop(0.0, &c6.to_hexa()).unwrap();
        gradient.add_color_stop(0.58, &c6.to_hexa()).unwrap();
        gradient.add_color_stop(1.0, &c5.to_hexa()).unwrap();
        context.set_fill_style(&c5.to_hexa().into());
        context.fill();

        context.restore();
        context
    }
}

impl Default for Postit {
    fn default() -> Self {
        Self {
            pos: Pos::default(),
            color: String::from("#f2e2ba"),
            width: 100.0,
            height: 100.0,
            angle: 3.0,
        }
    }
}

#[wasm_bindgen]
pub fn postit(x: f64, y: f64) -> Postit {
    Postit::default().x(x).y(y)
}
