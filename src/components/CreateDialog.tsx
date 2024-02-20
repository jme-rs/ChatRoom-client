import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogBody,
  DialogActions,
  DialogContent,
  Button,
  Input,
} from "@fluentui/react-components";


export default function CreateDialog() {
  const [roomName, setRoomName] = useState("");

  async function createRoom() {
    await invoke("create_room", { room: roomName });
  }

  return (
    <Dialog>
      <DialogTrigger disableButtonEnhancement>
        <Button>Create new room</Button>
      </DialogTrigger>
      <DialogSurface>
        <DialogBody>
          <DialogContent>

            <Input
              placeholder="Input room name"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              style={{ width: "100%" }}
            />

          </DialogContent>
          <DialogActions fluid>

            <DialogTrigger disableButtonEnhancement>
              <Button
                appearance="primary"
                onClick={() => {
                  if (roomName === "") return;
                  setRoomName("");
                  createRoom();
                }}
              >
                Create
              </Button>
            </DialogTrigger>
            <DialogTrigger disableButtonEnhancement>
              <Button
                appearance="secondary"
                onClick={() => setRoomName("")}
              >
                Cancel
              </Button>
            </DialogTrigger>

          </DialogActions>
        </DialogBody>
      </DialogSurface>
    </Dialog >
  )
}
