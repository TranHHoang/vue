import { listen } from "@tauri-apps/api/event";

const MENU_EVENT = "menu_event";
const OPEN_FILE = "open_file";
const SAVE_FILE = "save_file";

export type EventHandler = () => Promise<void>;

export async function registerEventHandlers(handlers: {
  openFile: EventHandler;
  saveFile: EventHandler;
}) {
  return listen(MENU_EVENT, (e) => {
    switch (e.payload) {
      case OPEN_FILE: {
        void handlers.openFile();
        break;
      }
      case SAVE_FILE: {
        void handlers.saveFile();
        break;
      }
    }
  });
}
