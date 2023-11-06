use std::fmt::{self};

#[derive(Debug)]
pub struct Color {
    pub red: u8,
    pub green: u8,
    pub blue: u8,
}

impl ToString for Color {
    fn to_string(&self) -> String {
        self.to_hexa()
    }
}

#[derive(Debug)]
pub enum ColorCreationError {
    BadFormat,
}

impl fmt::Display for ColorCreationError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match self {
            ColorCreationError::BadFormat => write!(f, "Bad format"),
        }
    }
}

#[allow(dead_code)]
impl Color {
    pub fn from_rgb(red: u8, green: u8, blue: u8) -> Color {
        Color { red, green, blue }
    }
    pub fn from_hexa(hexa: &str) -> Result<Color, ColorCreationError> {
        if !hexa.starts_with('#') {
            return Err(ColorCreationError::BadFormat);
        }

        let length = hexa.len();

        if length != 4 && length != 7 {
            #[allow(dead_code)]
            return Err(ColorCreationError::BadFormat);
        }

        let colors: (String, String, String) = match length {
            4 => (
                hexa[1..2].to_string() + &hexa[1..2],
                hexa[2..3].to_string() + &hexa[2..3],
                hexa[3..4].to_string() + &hexa[3..4],
            ),
            7 => (
                hexa[1..3].to_string(),
                hexa[3..5].to_string(),
                hexa[5..7].to_string(),
            ),
            _ => ("00".to_string(), "00".to_string(), "00".to_string()),
        };
        print!("{}", colors.0);

        let red = u8::from_str_radix(&colors.0, 16).map_err(|_| ColorCreationError::BadFormat)?;
        let green = u8::from_str_radix(&colors.1, 16).map_err(|_| ColorCreationError::BadFormat)?;
        let blue = u8::from_str_radix(&colors.2, 16).map_err(|_| ColorCreationError::BadFormat)?;

        Ok(Color { red, green, blue })
    }
    pub fn to_hexa(&self) -> String {
        let red = format!("{:X}", self.red);
        let red = if red.len() > 1 {
            red
        } else {
            String::from('0') + &red
        };
        let green = format!("{:X}", self.green);
        let green = if green.len() > 1 {
            green
        } else {
            String::from('0') + &green
        };
        let blue = format!("{:X}", self.blue);
        let blue = if blue.len() > 1 {
            blue
        } else {
            String::from('0') + &blue
        };
        format!("#{}{}{}", red, green, blue)
    }
    pub fn get_lighter_color(&self, percent: f32) -> Color {
        Color {
            red: std::cmp::min(
                self.red as u32 + (self.red as f32 * percent).round() as u32,
                255_u32,
            ) as u8,
            green: std::cmp::min(
                self.green as u32 + (self.green as f32 * percent).round() as u32,
                255_u32,
            ) as u8,
            blue: std::cmp::min(
                self.blue as u32 + (self.blue as f32 * percent).round() as u32,
                255_u32,
            ) as u8,
        }
    }
    pub fn get_darker_color(&self, percent: f32) -> Color {
        Color {
            red: std::cmp::max(
                self.red as u32 - (self.red as f32 * percent).round() as u32,
                0_u32,
            ) as u8,
            green: std::cmp::max(
                self.green as u32 - (self.green as f32 * percent).round() as u32,
                0_u32,
            ) as u8,
            blue: std::cmp::max(
                self.blue as u32 - (self.blue as f32 * percent).round() as u32,
                0_u32,
            ) as u8,
        }
    }
}

#[cfg(test)]
mod color_tests {
    use super::*;

    #[test]
    fn from_rgb() {
        assert_eq!(Color::from_rgb(0, 128, 255).red, 0);
        assert_eq!(Color::from_rgb(0, 128, 255).green, 128);
        assert_eq!(Color::from_rgb(0, 128, 255).blue, 255);
    }

    #[test]
    fn from_hexa() {
        assert_eq!(
            Color::from_hexa("23").unwrap_err().to_string(),
            ColorCreationError::BadFormat.to_string()
        );
        assert_eq!(
            Color::from_hexa("@FFFFFF").unwrap_err().to_string(),
            ColorCreationError::BadFormat.to_string()
        );
        assert_eq!(
            Color::from_hexa("#XXFFFF").unwrap_err().to_string(),
            ColorCreationError::BadFormat.to_string()
        );
        assert_eq!(Color::from_hexa("#FF0000").unwrap().red, 255);
        assert_eq!(Color::from_hexa("#00FF00").unwrap().green, 255);
        assert_eq!(Color::from_hexa("#FF0").unwrap().blue, 0);
    }

    #[test]
    fn to_hexa() {
        let color = Color::from_rgb(0, 0, 0);
        assert_eq!(color.to_hexa(), "#000000");
        let color = Color::from_rgb(255, 0, 255);
        assert_eq!(color.to_hexa(), "#FF00FF");
    }

    #[test]
    fn to_string() {
        let color = Color::from_rgb(0, 0, 0);
        assert_eq!(color.to_string(), "#000000");
        let color = Color::from_rgb(255, 0, 255);
        assert_eq!(color.to_string(), "#FF00FF");
    }

    #[test]
    fn get_lighter_color() {
        let color = Color::from_rgb(128, 128, 255);
        assert_eq!(color.get_lighter_color(0.2).to_string(), "#9A9AFF");
    }

    #[test]
    fn get_darker_color() {
        let color = Color::from_rgb(128, 128, 0);
        assert_eq!(color.get_darker_color(0.2).to_string(), "#666600");
    }
}
