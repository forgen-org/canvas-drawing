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
    pub mod round_rect;
}

/*
mod backgrounds {
    pub mod shapy_moves;
    mod shapes {
        pub mod shape;
        pub mod round_rect;
    }

}
*/


#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}
