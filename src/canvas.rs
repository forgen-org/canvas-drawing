use wasm_bindgen::prelude::*;
use web_sys::CanvasRenderingContext2d;
use web_sys::HtmlCanvasElement;


#[wasm_bindgen]
pub struct Canvas {
     #[wasm_bindgen(skip)]
    pub canvas: HtmlCanvasElement,
     #[wasm_bindgen(skip)]
    pub context: CanvasRenderingContext2d,
}

impl Canvas {
}

#[wasm_bindgen]
pub fn canvas(id: &str) -> Canvas {
    let document = web_sys::window().unwrap().document().unwrap();
    let canvas = document
        .get_element_by_id(id)
        .unwrap()
        .dyn_into::<HtmlCanvasElement>()
        .unwrap();

    let context = canvas
        .get_context("2d")
        .unwrap()
        .unwrap()
        .dyn_into::<CanvasRenderingContext2d>()
        .unwrap();

    Canvas {
        canvas,
        context,
    }
}
