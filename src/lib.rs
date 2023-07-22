use wasm_bindgen::prelude::*;

//mod canvas;
mod pos;
mod text;
mod line;
mod arrow;
mod shape;

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}
