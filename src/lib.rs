use wasm_bindgen::prelude::*;

mod shared {
    pub mod color;
    pub mod pos;
}

mod components {
    pub mod arrow;
    pub mod line;
    pub mod postit;
    pub mod round_rect;
    pub mod shape;
    pub mod text;
}

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}
