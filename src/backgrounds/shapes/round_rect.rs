/*
use std::f32::consts::PI;

use rand::Rng;
use web_sys::CanvasRenderingContext2d;

use super::shape::{Shape, ShapeContext};

#[derive(Clone, Copy)]
pub struct RoundRect {
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


impl Shape for RoundRect {
     fn new(context: ShapeContext) -> RoundRect {
        let size = rand::thread_rng().gen_range(context.min_width..context.max_width);
        let x = rand::thread_rng().gen_range((size / 2)..(context.max_x - (size / 2)));
        let y = rand::thread_rng().gen_range((size / 2)..(context.max_y - (size / 2)));
        let rotation_speed = rand::thread_rng().gen_range(0.05..0.5);
        let direction = rand::thread_rng().gen_range(0.0..360.0);
        RoundRect {
            x: x as f64,
            y: y as f64,
            width: size as f64,
            height: size as f64,
            speed: 0.5,
            radius: 10.0,
            direction,
            rotation_angle: 0.0,
            rotation_speed,
        }
    }
    fn animate(self, context: ShapeContext) -> RoundRect {
        let angle_rad = self.direction * (PI as f64) / 180.0;
        let mut new_direction = self.direction;
        let mut new_rotation_speed = self.rotation_speed;
        let mut new_x = self.x + self.speed * angle_rad.cos();
        if new_x - self.width / 2.0 < 0 as f64 {
            new_direction = 180.0 - self.direction;
            new_direction = (new_direction + 360.0) % 360.0;
            new_x = self.x;
            new_rotation_speed = new_rotation_speed * -1.0;
        }
        if new_x + self.width / 2.0 > context.max_x as f64 {
            new_direction = 180.0 - self.direction;
            new_direction = (new_direction + 360.0) % 360.0;
            new_x = self.x;
            new_rotation_speed = new_rotation_speed * -1.0;
        }
        let mut new_y = self.y + self.speed * angle_rad.sin();
        if new_y + self.height / 2.0 > context.max_y as f64 {
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
            (context.max_x as f64 - (new_x + self.width / 2.0)) as f64,
            (new_y - self.height / 2.0) as f64,
            (context.max_y as f64 - (new_y + self.height / 2.0)) as f64,
        ]
        .iter()
        .fold(f64::INFINITY, |a, &b| a.min(b));

        let max = vec![min / 6.0, self.width / 2.6]
            .iter()
            .fold(f64::INFINITY, |a, &b| a.min(b));

        RoundRect {
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
    fn draw(self, context: CanvasRenderingContext2d) -> {
        context.save();
        context.translate(self.x, self.y).unwrap();
        context
            .rotate(shape.rotation_angle * std::f64::consts::PI / 180.0)
            .unwrap();
        round_rect(
            context,
            -(self.width / 2.0),
            -(self.height / 2.0),
            self.width.into(),
            self.height.into(),
            self.radius,
        );
        context.restore();
    }
}
*/
