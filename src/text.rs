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
    line_height: f64,
    max_width: Option<f64>,
    border_color: Option<String>,
}

impl Text {
    fn crop(text: &Text, ctx: &CanvasRenderingContext2d) -> Vec<String> {
        web_sys::console::log_1(&JsValue::from(text.max_width));
        match text.max_width {
            None => vec![text.value.clone()],
            Some(max_width) => {
                let mut lines: Vec<String> = vec![String::from("")];
                let words: Vec<&str> = text.value.split_whitespace().collect();
                for word in words {
                    let current_line = lines.last().unwrap();
                    let current_line_width = ctx.measure_text(current_line).unwrap().width();
                    let to_concat = if current_line.len() == 0 {
                        word.to_string()
                    } else {
                        " ".to_string() + word
                    };
                    let to_concat_width = ctx.measure_text(&to_concat).unwrap().width();
                    // Enough space on this line to concat the entire word
                    if current_line_width + to_concat_width <= max_width {
                        let current_line_index = &lines.len() - 1;
                        lines[current_line_index] = current_line.clone() + &to_concat;
                    }
                    // Enough space on the next (empty) line to draw the entire word
                    else if ctx.measure_text(word).unwrap().width() <= max_width {
                        lines.push(word.to_string())
                    }
                    // word is too long even on an empty line => crop it
                    else {
                        let mut cropped = String::from("");
                        for char in to_concat.chars() {
                            web_sys::console::log_1(&JsValue::from(char.to_string()));
                            let current_line = lines.last().unwrap();
                            let current_line_width = ctx.measure_text(current_line).unwrap().width();
                            if current_line_width
                                + ctx
                                    .measure_text((cropped.clone() + &char.to_string()).as_str())
                                    .unwrap()
                                    .width()
                                <= max_width
                            {
                                cropped.push(char)
                            } else {
                                let current_line_index = &lines.len() - 1;
                                lines[current_line_index] = current_line.clone() + &cropped;
                                lines.push(char.to_string());
                                cropped = String::from("");
                            }
                        }
                        let current_line = lines.last().unwrap();
                        let current_line_index = &lines.len() - 1;
                        lines[current_line_index] = current_line.clone() + &cropped;
                    }
                };
                lines
            }
        }
    }
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

    #[wasm_bindgen(js_name = maxWidth)]
    pub fn max_width(mut self, width: Option<f64>) -> Text {
        self.max_width = width;
        self
    }

    #[wasm_bindgen(js_name = lineHeight)]
    pub fn line_height(mut self, height: f64) -> Text {
        self.line_height = height;
        self
    }

    pub fn draw(&self, context: CanvasRenderingContext2d) -> CanvasRenderingContext2d {
        context.save();

        let font =
            self.font_size.to_string() + &String::from("px ") + &String::from(&self.font_family);
        context.set_font(&font);

        context.set_fill_style(&JsValue::from_str(&self.color));

        let lines = Text::crop(self, &context);
        web_sys::console::log_1(&JsValue::from(lines.len()));

        for (index, line) in lines.iter().enumerate() {
            context
                .fill_text(
                    line,
                    self.start.x.into(),
                    self.start.y + index as f64 * self.line_height * self.font_size,
                )
                .unwrap();
            match &self.border_color {
                Some(color) => {
                    context.set_stroke_style(&JsValue::from(color));
                    context
                        .stroke_text(
                            line,
                            self.start.x.into(),
                            self.start.y + index as f64 * self.line_height * self.font_size,
                        )
                        .unwrap();
                }
                None => {}
            };
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
            font_size: 18.0,
            line_height: 1.2,
            border_color: None,
            max_width: None,
        }
    }
}

#[wasm_bindgen]
pub fn text(value: String) -> Text {
    Text::default().value(value)
}
