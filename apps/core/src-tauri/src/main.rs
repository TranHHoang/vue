// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{CustomMenuItem, Menu, Submenu};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
  format!("Hello, {}! You've been greeted from Rust!", name)
}

fn main() {
  let open = CustomMenuItem::new("open", "Open File").accelerator("cmdOrControl+O");
  let save = CustomMenuItem::new("save", "Save File").accelerator("cmdOrControl+S");
  let file_menu = Submenu::new("File", Menu::new().add_item(open).add_item(save));

  let menu = Menu::new().add_submenu(file_menu);

  tauri::Builder::default()
    .menu(menu)
    .on_menu_event(|event| match event.menu_item_id() {
      "open" => event.window().emit("menu_event", "open_file").unwrap(),
      "save" => event.window().emit("menu_event", "save_file").unwrap(),
      _ => (),
    })
    .invoke_handler(tauri::generate_handler![greet])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
