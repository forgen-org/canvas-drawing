use crate::pos::*;
use wasm_bindgen::prelude::*;
use web_sys::CanvasRenderingContext2d;

#[wasm_bindgen]
pub struct Text {
    value: String,
    start: Pos,
    color: String,
    font_size: f64,
    font_family: String,
    border_color: Option<String>,
}

#[wasm_bindgen]
impl Text {
    pub fn value(mut self, value: String) -> Text {
        self.value = value;
        self
    }

    pub fn start(mut self, x: f64, y: f64) -> Text {
        self.start = pos(x, y);
        self
    }

    pub fn color(mut self, color: String) -> Text {
        self.color = color;
        self
    }

    #[wasm_bindgen(js_name = fontSize)]
    pub fn font_size(mut self, size: f64) -> Text {
        self.font_size = size;
        self
    }

    #[wasm_bindgen(js_name = fontFamily)]
    pub fn font_family(mut self, family: String) -> Text {
        self.font_family = family;
        self
    }

    #[wasm_bindgen(js_name = borderColor)]
    pub fn border_color(mut self, color: Option<String>) -> Text {
        self.border_color = color;
        self
    }

    pub fn draw(&self, context: CanvasRenderingContext2d) -> CanvasRenderingContext2d {
        context.save();

        let font =
            self.font_size.to_string() + &String::from("px ") + &String::from(&self.font_family);
        //web_sys::console::log_1(&JsValue::from(&font));
        context.set_fill_style(&JsValue::from_str(&self.color));
        context.set_font(&font);
        context
            .fill_text(&self.value, self.start.x.into(), self.start.y.into())
            .unwrap();
        match &self.border_color {
            Some(color) => {
                context.set_stroke_style(&JsValue::from(color));
                context
                    .stroke_text(&self.value, self.start.x.into(), self.start.y.into())
                    .unwrap();
            },
            None => {}
        }
        context.restore();
        context
    }
}

impl Default for Text {
    fn default() -> Self {
        Self {
            start: Pos::default(),
            value: String::from("Hello world"),
            color: String::from("#000"),
            font_family: String::from("Arial"),
            font_size: 12.0,
            border_color: None,
        }
    }
}

#[wasm_bindgen]
pub fn text(value: String) -> Text {
    Text::default().value(value)
}
