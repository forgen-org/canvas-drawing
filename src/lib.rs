use wasm_bindgen::prelude::*;

//mod canvas;
mod pos;
mod text;
mod line;
mod arrow;
mod shape;
mod color;

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}
