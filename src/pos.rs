use wasm_bindgen::prelude::*;

#[wasm_bindgen]
#[derive(Clone)]
#[derive(Default)]
pub struct Pos {
    pub x: f64,
    pub y: f64,
}

#[wasm_bindgen]
pub fn pos(x: f64, y: f64) -> Pos {
    Pos { x, y }
}
