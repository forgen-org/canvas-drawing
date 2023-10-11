use wasm_bindgen::prelude::*;

mod shared {
    pub mod pos;
    pub mod color;
}

mod components {
    pub mod text;
    pub mod line;
    pub mod arrow;
    pub mod shape;
    pub mod postit;
}

mod backgrounds {
    pub mod shapy_moves;
}


#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}
