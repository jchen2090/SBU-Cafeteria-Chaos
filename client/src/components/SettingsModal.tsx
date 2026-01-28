import * as Dialog from "@radix-ui/react-dialog";
import type { Dispatch, SetStateAction } from "react";
import { useGameContext } from "../providers/GameStateProvider";
import { Button } from "./ui/button";

interface SettingsModalProp {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}

export const SettingsModal = ({ open, onOpenChange }: SettingsModalProp) => {
  const { state, dispatch } = useGameContext();

  const changeTrayToTop = () => {
    dispatch({ type: "CHANGE_TRAY_POSITION", payload: "TOP" });
  };

  const changeTrayToBottom = () => {
    dispatch({ type: "CHANGE_TRAY_POSITION", payload: "BOTTOM" });
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay id="modal-container" className="fixed inset-0 bg-black bg-opacity-50 z-50" />
        <Dialog.Content
          id="highscore-modal-content"
          className="modal-content fixed left-1/2 top-1/2 z-50 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 bg-slate-700 text-white p-8 rounded-2xl shadow-lg border-4 border-yellow-400 focus:outline-none"
        >
          <Dialog.Title className="font-bangers text-7xl text-yellow-400 text-center">Settings</Dialog.Title>
          <Dialog.Description className="text-center text-lg">
            Change where you want the food tray to be
          </Dialog.Description>

          <div className="grid grid-cols-2 my-6 gap-4">
            <Button
              variant="special"
              className={`${
                state.config.FOOD_TRAY_POSITION === "TOP" ? "bg-special" : "bg-inherit"
              } hover:bg-yellow-500 text-white font-normal text-lg rounded-sm hover:scale-105 shadow-lg border-4 border-yellow-400 cursor-pointer py-4`}
              onClick={() => changeTrayToTop()}
            >
              Top
            </Button>
            <Button
              className={`${
                state.config.FOOD_TRAY_POSITION === "BOTTOM" ? "bg-special" : "bg-inherit"
              } hover:bg-yellow-500 text-white font-normal text-lg rounded-sm hover:scale-105 shadow-lg border-4 border-yellow-400 cursor-pointer py-4`}
              onClick={() => changeTrayToBottom()}
            >
              Bottom
            </Button>
          </div>

          <Dialog.Close asChild>
            <Button
              variant="destructive"
              className="w-full text-white font-bold text-2xl py-6 px-8 rounded-full cursor-pointer"
            >
              Close
            </Button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
