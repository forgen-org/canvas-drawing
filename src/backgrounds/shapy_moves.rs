use rand::Rng;
use std::f64::consts::PI;
use std::{cell::RefCell, rc::Rc};
use wasm_bindgen::prelude::*;
use web_sys::{
    console::log_1, CanvasRenderingContext2d, Event, EventTarget, HtmlCanvasElement, MouseEvent,
};

use crate::shared::color::Color;

fn window() -> web_sys::Window {
    web_sys::window().expect("no global `window` exists")
}

fn request_animation_frame(f: &Closure<dyn FnMut()>) -> i32 {
    window()
        .request_animation_frame(f.as_ref().unchecked_ref())
        .expect("should register `requestAnimationFrame` OK")
}

fn cancel_animation_frame(id: i32) {
    window()
        .cancel_animation_frame(id)
        .expect("should register `requestAnimationFrame` OK")
}

const MIN_SHAPE_SIZE: f64 = 16.0;

#[derive(Clone, Copy)]
pub struct Shape {
    x: f64,
    y: f64,
    width: f64,
    height: f64,
    radius: f64,
    speed: f64,
    direction: f64,
    rotation_angle: f64,
    rotation_speed: f64,
}

impl Shape {
    pub fn new(max_x: f64, max_y: f64, max_size: f64) -> Shape {
        let size = rand::thread_rng().gen_range(MIN_SHAPE_SIZE..max_size);
        let x = rand::thread_rng().gen_range((size / 2.0)..(max_x - (size / 2.0)));
        let y = rand::thread_rng().gen_range((size / 2.0)..(max_y - (size / 2.0)));
        let rotation_speed = rand::thread_rng().gen_range(0.05..0.5);
        let direction = rand::thread_rng().gen_range(0.0..360.0);
        Shape {
            x,
            y,
            width: size,
            height: size,
            speed: 0.5,
            radius: 10.0,
            direction,
            rotation_angle: 0.0,
            rotation_speed,
        }
    }
    fn animate(self, max_x: f64, max_y: f64, cursor_pos: (i32, i32), cursor_speed: (i32, i32)) -> Shape {
        let angle_rad = self.direction as f64 * PI / 180.0;
        let mut new_direction = self.direction;
        let mut new_rotation_speed = self.rotation_speed;
        let mut new_x = self.x + self.speed * angle_rad.cos();
        if new_x - self.width / 2.0 < 0 as f64 {
            new_direction = 180.0 - self.direction;
            new_direction = (new_direction + 360.0) % 360.0;
            new_x = self.x;
            new_rotation_speed = new_rotation_speed * -1.0;
        }
        if new_x + self.width / 2.0 > max_x as f64 {
            new_direction = 180.0 - self.direction;
            new_direction = (new_direction + 360.0) % 360.0;
            new_x = self.x;
            new_rotation_speed = new_rotation_speed * -1.0;
        }
        let mut new_y = self.y + self.speed * angle_rad.sin();
        if new_y + self.height / 2.0 > max_y as f64 {
            new_direction = self.direction * -1.0;
            new_direction = (new_direction + 360.0) % 360.0;
            new_y = self.y;
            new_rotation_speed = new_rotation_speed * -1.0;
        }
        if new_y - self.height / 2.0 < 0 as f64 {
            new_direction = self.direction * -1.0;
            new_direction = (new_direction + 360.0) % 360.0;
            new_y = self.y;
            new_rotation_speed = new_rotation_speed * -1.0;
        }
        let min = vec![
            (new_x - self.width / 2.0) as f64,
            (max_x as f64 - (new_x + self.width / 2.0)) as f64,
            (new_y - self.height / 2.0) as f64,
            (max_y as f64 - (new_y + self.height / 2.0)) as f64,
        ]
        .iter()
        .fold(f64::INFINITY, |a, &b| a.min(b));

        let max = vec![min / 6.0, self.width / 2.6]
            .iter()
            .fold(f64::INFINITY, |a, &b| a.min(b));

        Shape {
            x: new_x,
            y: new_y,
            width: self.width,
            height: self.height,
            speed: self.speed,
            direction: new_direction,
            radius: self.width / 2.0 - max,
            rotation_speed: new_rotation_speed,
            rotation_angle: self.rotation_angle + new_rotation_speed,
        }
    }
}

#[wasm_bindgen]
pub struct Background {
    canvas: HtmlCanvasElement,
    context: CanvasRenderingContext2d,
    opacity: f64,
    color: Color,
    quantity: u32,
    animation: Rc<RefCell<i32>>,
    shapes: Rc<RefCell<Vec<Shape>>>,
    cursor_position: Rc<RefCell<(i32, i32)>>,
    cursor_speed: Rc<RefCell<(i32, i32)>>,
}

#[wasm_bindgen]
impl Background {
    pub fn quantity(mut self, quantity: u32) -> Self {
        self.quantity = quantity;
        self
    }
    pub fn opacity(mut self, opacity: f64) -> Self {
        self.opacity = opacity;
        self
    }
    pub fn color(mut self, color: String) -> Self {
        self.color = Color::from_hexa(&color).unwrap();
        self
    }
    pub fn init(&mut self) -> () {
        let width = self.canvas.width();
        let height = self.canvas.height();
        let max_size_ref = std::cmp::min(width, height);
        let shapes = (0..self.quantity)
            .map(|_| {
                Shape::new(width as f64, height as f64, max_size_ref as f64 / 4.8)
                    .animate(width as f64, height as f64, (0, 0), (0, 0))
            })
            .collect();

        self.context.set_global_alpha(self.opacity);
        self.context
            .set_fill_style(&JsValue::from_str(&self.color.to_string()));

        draw(&self.context, &shapes);
        let cloned_shapes = Rc::clone(&self.shapes);
        let mut shapes_value = cloned_shapes.borrow_mut();
        *shapes_value = shapes;
    }
    pub fn pause(&self) -> () {
        let animation_cloned = Rc::clone(&self.animation);
        let animation_borrowed = animation_cloned.borrow().clone();
        cancel_animation_frame(animation_borrowed);
        let mut animation_borrowed_mut = animation_cloned.borrow_mut();
        *animation_borrowed_mut = 0;
    }
    pub fn stop(&self) -> () {
        self.pause();
        let cloned_shapes = Rc::clone(&self.shapes);
        let mut shapes_value = cloned_shapes.borrow_mut();
        *shapes_value = vec![];
        draw(&self.context, &vec![])
    }
    pub fn play(&mut self) -> () {
        let animation_cloned = Rc::clone(&self.animation);
        let animation_borrowed = animation_cloned.borrow().clone();
        if animation_borrowed > 0 {
            return;
        }
        let current_shapes = Rc::clone(&self.shapes).borrow().clone();
        if current_shapes.len() == 0 as usize {
            self.init();
        }
        let cloned_cursor_position = Rc::clone(&self.cursor_position).clone();
        let cloned_cursor_speed = Rc::clone(&self.cursor_speed).clone();
        let closure = Closure::wrap(Box::new(move |event: Event| {
            event.prevent_default();
            if let Some(mouse_event) = event.dyn_ref::<MouseEvent>() {
                let offset_x = mouse_event.offset_x();
                let offset_y = mouse_event.offset_y();
                let movement_x = mouse_event.movement_x();
                let movement_y = mouse_event.movement_y();
                let mut cursor_position_borrowed_mut = cloned_cursor_position.borrow_mut();
                *cursor_position_borrowed_mut = (offset_x, offset_y);
                let mut cursor_speed_borrowed_mut = cloned_cursor_speed.borrow_mut();
                *cursor_speed_borrowed_mut = (movement_x, movement_y);
            }
        }) as Box<dyn FnMut(Event)>);

        self.canvas
            .add_event_listener_with_callback("mousemove", closure.as_ref().unchecked_ref())
            .unwrap();

        // Remember to forget the closure to release resources when done
        closure.forget();

        let width = self.canvas.width();
        let height = self.canvas.height();

        let cloned_animation = Rc::clone(&self.animation);
        let cloned_shapes = Rc::clone(&self.shapes);

        let context = self.context.clone();

        let f = Rc::new(RefCell::new(None));
        let g = f.clone();

        let cloned_cursor_position = Rc::clone(&self.cursor_position);

        *g.borrow_mut() = Some(Closure::wrap(Box::new(move || {
            let cursor_pos = cloned_cursor_position.borrow().clone();
            let cursor_speed = cloned_cursor_position.borrow().clone();
            let pos = cloned_cursor_position.borrow().clone();
            let closure_shapes_borrowing = cloned_shapes.borrow().clone();
            let shapes = closure_shapes_borrowing
                .iter()
                .map(|old| old.animate(width as f64, height as f64, cursor_pos, cursor_speed))
                .collect();
            draw(&context, &shapes);
            let mut shapes_value = cloned_shapes.borrow_mut();
            *shapes_value = shapes;
            let animation_id = request_animation_frame(f.borrow().as_ref().unwrap());
            let mut d = cloned_animation.borrow_mut();
            *d = animation_id.clone();
        }) as Box<dyn FnMut()>));

        request_animation_frame(g.borrow().as_ref().unwrap());
    }
}

fn draw(context: &CanvasRenderingContext2d, shapes: &Vec<Shape>) {
    context.clear_rect(
        0.0,
        0.0,
        context.canvas().unwrap().width().into(),
        context.canvas().unwrap().height().into(),
    );
    shapes.iter().for_each(|shape| {
        context.save();
        context.translate(shape.x, shape.y).unwrap();
        context
            .rotate(shape.rotation_angle * std::f64::consts::PI / 180.0)
            .unwrap();
        round_rect(
            context,
            -(shape.width / 2.0),
            -(shape.height / 2.0),
            shape.width.into(),
            shape.height.into(),
            shape.radius,
        );
        context.restore();
    })
}

fn round_rect(context: &CanvasRenderingContext2d, x: f64, y: f64, w: f64, h: f64, radius: f64) {
    let r = x + w;
    let b = y + h;
    context.begin_path();
    context.move_to(x + radius, y);
    context.line_to(r - radius, y);
    context.quadratic_curve_to(r, y, r, y + radius);
    context.line_to(r, y + h - radius);
    context.quadratic_curve_to(r, b, r - radius, b);
    context.line_to(x + radius, b);
    context.quadratic_curve_to(x, b, x, b - radius);
    context.line_to(x, y + radius);
    context.quadratic_curve_to(x, y, x + radius, y);
    context.fill();
}

#[wasm_bindgen]
pub fn shapy_moves(canvas_id: &str) -> Background {
    let document = web_sys::window().unwrap().document().unwrap();
    let canvas = document
        .get_element_by_id(canvas_id)
        .unwrap()
        .dyn_into::<HtmlCanvasElement>()
        .unwrap();
    let context = canvas
        .get_context("2d")
        .unwrap()
        .unwrap()
        .dyn_into::<CanvasRenderingContext2d>()
        .unwrap();

    Background {
        canvas,
        context,
        opacity: 0.5,
        color: Color::from_hexa("#000").unwrap(),
        quantity: 8,
        animation: Rc::new(RefCell::new(0)),
        shapes: Rc::new(RefCell::new(vec![])),
        cursor_position: Rc::new(RefCell::new((0, 0))),
        cursor_speed: Rc::new(RefCell::new((0, 0))),
    }
}