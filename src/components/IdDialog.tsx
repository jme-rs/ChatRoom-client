import { useState } from "react";
// import { invoke } from "@tauri-apps/api/tauri";
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


export default function IdDialog({ setId }: { setId: (arg0: string) => void }) {
  const [tmpId, setTmpId] = useState("");

  return (
    <Dialog>
      <DialogTrigger disableButtonEnhancement>
        <Button>Set your ID</Button>
      </DialogTrigger>
      <DialogSurface>
        <DialogBody>
          <DialogContent>

            <Input
              placeholder="Input your ID"
              value={tmpId}
              onChange={(e) => setTmpId(e.target.value)}
              style={{ width: "100%" }}
            />

          </DialogContent>
          <DialogActions fluid>

            <DialogTrigger disableButtonEnhancement>
              <Button
                appearance="primary"
                onClick={() => {
                  if (tmpId === "") return;
                  setId(tmpId);
                  console.log("set id: ", tmpId);
                }}
              >
                Apply
              </Button>
            </DialogTrigger>

            <DialogTrigger disableButtonEnhancement>
              <Button
                appearance="secondary"
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
