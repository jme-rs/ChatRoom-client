import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { Routes, Route, useNavigate } from "react-router-dom";
import {
  Tab,
  TabList,
} from "@fluentui/react-components";

import styles from "./App.module.scss";
import ChatArea from "./components/ChatArea";
import CreateDialog from "./components/CreateDialog";
import IdDialog from "./components/IdDialog";


function App() {
  const [roomList, setRoomList] = useState<string[]>([]);
  const [id, setId] = useState("");
  const navigate = useNavigate();

  async function getRoomList() {
    const res: string = await invoke("get_room_list");
    setRoomList(JSON.parse(res) as string[]);
  }

  useEffect(() => {
    getRoomList();
    const interval = setInterval(() => {
      getRoomList();
      console.log("getRoomList()");
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.container}>

      <div className={styles.tab}>

        <TabList
          // defaultSelectedValue="test_room"
          onTabSelect={(_e, tab) => navigate(tab.value as string)}
          vertical
          size="large"
          className={styles.TabList}
        >
          {roomList.map((room, idx) => <Tab key={idx} value={room}>{room}</Tab>)}
        </TabList>

        {/* <div className={styles.wrapper}> */}
          <div className={styles.dialog}>
            <CreateDialog />
            <IdDialog setId={setId} />
          </div>
        {/* </div> */}

      </div>

      <div className={styles.chat}>
        <Routes>
          {roomList.map((room, idx) => {
            return (
              <Route
                key={idx}
                path={`/${room}`}
                element={<ChatArea room={room} id={id} />}
              />
            )
          })}
        </Routes>
      </div>

    </div>
  );
}

export default App;
