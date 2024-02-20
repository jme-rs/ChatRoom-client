// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod client;

use reqwest::Client;

#[tauri::command]
async fn get_room_list() -> Result<String, ()> {
    let client = Client::new();
    let res = client.get("http://localhost:8080").send().await;

    match res {
        Ok(res) => {
            println!("{}", res.status().to_string());
            Ok(res.text().await.unwrap())
        }
        Err(e) => {
            println!("{}", e);
            Err(())
        }
    }
}

#[tauri::command]
async fn create_room(room: &str) -> Result<(), ()> {
    let client = Client::new();
    let res = client
        .post(format!("http://localhost:8080"))
        .body(format!("{{\"room\": \"{}\"}}", room))
        .send()
        .await;

    match res {
        Ok(res) => {
            println!("{}", res.status().to_string());
            Ok(())
        }
        Err(e) => {
            println!("{}", e);
            Err(())
        }
    }
}

#[tauri::command]
async fn get_chat_room(room: &str) -> Result<String, ()> {
    let client = Client::new();
    let res = client
        .get(format!("http://localhost:8080/{}", room))
        .send()
        .await;

    match res {
        Ok(res) => {
            println!("{}", res.status().to_string());
            Ok(res.text().await.unwrap())
        }
        Err(e) => {
            println!("{}", e);
            Err(())
        }
    }
}

#[tauri::command]
async fn send_msg(id: &str, room: &str, msg: &str) -> Result<(), ()> {
    let client = Client::new();
    let res = client
        .post(format!("http://localhost:8080/{}", room))
        .body(format!("{{\"id\": \"{}\", \"message\": \"{}\"}}", id, msg))
        .send()
        .await;

    match res {
        Ok(res) => {
            println!("{}", res.status().to_string());
            Ok(())
        }
        Err(e) => {
            println!("{}", e);
            Err(())
        }
    }
}

#[tauri::command]
async fn get_msg(room: &str) -> Result<String, ()> {
    let client = Client::new();
    let res = client
        .get(format!("http://localhost:8080/{}", room))
        .send()
        .await;

    match res {
        Ok(res) => {
            println!("{}", res.status().to_string());
            Ok(res.text().await.unwrap())
        }
        Err(e) => {
            println!("{}", e);
            Err(())
        }
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            send_msg,
            get_msg,
            create_room,
            get_room_list,
            get_chat_room
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
