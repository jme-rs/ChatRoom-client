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
            println!("get_room_list: {}", res.status().to_string());
            Ok(res.text().await.unwrap())
        }
        Err(e) => {
            println!("get_room_list: {}", e);
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
            println!("create_room: {}", res.status().to_string());
            Ok(())
        }
        Err(e) => {
            println!("create_room: {}", e);
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
            println!("get_chat_room: {}", res.status().to_string());
            Ok(res.text().await.unwrap())
        }
        Err(e) => {
            println!("get_chat_room: {}", e);
            Err(())
        }
    }
}

#[tauri::command]
async fn send_msg(id: &str, room: &str, msg: &str) -> Result<(), ()> {
    let msg = msg.replace("\n", "\\n");
    let client = Client::new();

    let res = client
        .post(format!("http://localhost:8080/{}", room))
        .body(format!("{{\"id\": \"{}\", \"message\": \"{}\"}}", id, msg))
        .send()
        .await;

    match res {
        Ok(res) => {
            println!("send_msg: {}", res.status().to_string());
            Ok(())
        }
        Err(e) => {
            println!("send_msg: {}", e);
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
            println!("get_msg: {}", res.status().to_string());
            Ok(res.text().await.unwrap())
        }
        Err(e) => {
            println!("get_msg: {}", e);
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
AAAAB3NzaC1yc2EAAAADAQABAAABAQDXVjnYwYK4k2E9Y0MD4Zb4+m9v4AdsGnjIqU0vQcSuG5nu7AxVtdMeh1jO9Jwrre8G3awX4jVJWKw/zvwob9VC3lSyxMjiahPkvdpii5f7jW8w0F3t282r1tGzqCkV5ZrIReO5CV+kLba6zzcP80QwSTODyVBMxgfYB93Wv9s6uuqeYowhQvdfPxAtfs3WWSQ/nVqIzcBbYyOhivFLCNudAjAXiDhCuypUUe2r7AdtDtiwrjLotVC44Z9egD46sd3mgmqiLU9eE9smVI6jtTUb7cWA1LGQ/o8Uz+7P0mKFzM48RSIYQNQQTe3X/7WfZ/QyhAOUk645S/jNpTwcsTbh