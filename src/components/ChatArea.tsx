import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { Send24Regular } from "@fluentui/react-icons";
import {
  Textarea,
  Button,
  Persona,
  Title1,
  Body2,
} from "@fluentui/react-components";

import styles from './ChatArea.module.scss';
import { Message } from '../types/message';
import { getMdParser } from './MD';


const mdParser = getMdParser();


export default function ChatArea({
  room,
  id
}: {
  room: string,
  id: string;
}) {
  const [inputMsg, setInputMsg] = useState("");
  const [timeline, setTimeline] = useState<Message[]>([]);

  async function sendMsg() {
    await invoke("send_msg", { id: id || "unknown", room: room, msg: inputMsg });
  }

  async function refreshTimeline() {
    const res: string = await invoke("get_msg", { room: room });
    const json = JSON.parse(res).message as Message[];
    setTimeline(json);
  }

  useEffect(() => {
    refreshTimeline();
  }, [room]);

  useEffect(() => {
    const interval = setInterval(() => {
      refreshTimeline();
      console.log("refreshTimeline()");
    }, 3000);
    return () => clearInterval(interval);
  }, [room]);

  return (
    <div className={styles.container}>

      <div className={styles.title}>
        <Title1>{room}</Title1>
      </div>

      {/* <div>
        <Button onClick={refreshTimeline}>Get</Button>
      </div> */}

      <div className={styles.messages}>
        {timeline.map((msg, idx) =>
          <div className={styles.content}>
            <Persona
              key={idx}
              name={msg.id}
              secondaryText={msg.timestamp}
              // tertiaryText={msg.message}
              className={styles.Persona}
            />
            {/* <Body2 className={styles.Body2}>{msg.message}</Body2> */}
            <Body2 className={styles.Body2}>
              <div
                key={idx}
                dangerouslySetInnerHTML={{
                  __html: mdParser.processSync(msg.message),
                }}
              />
            </Body2>
          </div>
        )}
      </div>
      <div className={styles.wrapper}>

        <div className={styles.InputContainer} >
          <Textarea
            placeholder="Input your message..."
            onChange={(e) => setInputMsg(e.target.value)}
            value={inputMsg}
            style={{
              width: "100%",
            }}
          />
          <div className={styles.sendButton}>
            <Button
              appearance="primary"
              onClick={() => {
                if (inputMsg === "") return;
                setInputMsg("");
                sendMsg();
              }}
              size="small"
              className={styles.Button}
            >
              <Send24Regular />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
