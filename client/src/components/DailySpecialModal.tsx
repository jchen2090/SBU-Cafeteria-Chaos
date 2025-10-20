import * as Dialog from "@radix-ui/react-dialog";
import type { Dispatch, SetStateAction } from "react";
import { generateSpecialOrder, getFoodEmoji } from "../utils/Foods";
import { useGameContext } from "../providers/GameStateProvider";

interface DailySpecialModalProps {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}

export const DailySpecialModal = ({ open, onOpenChange }: DailySpecialModalProps) => {
  const { dispatch } = useGameContext();
  // Special orders should terminate faster than any other orders
  const specialOrder = generateSpecialOrder(8);

  const addSpecialOrder = () => {
    dispatch({ type: "TOGGLE_CHALLENGE_MODE" });
    dispatch({ type: "SET_CHALLENGE_ORDER", payload: specialOrder });
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay id="modal-container" className="fixed inset-0 bg-black bg-opacity-50 z-50" />
        <Dialog.Content
          id="highscore-modal-content"
          className="modal-content fixed left-1/2 top-1/2 z-50 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 bg-slate-700 text-white p-8 rounded-2xl shadow-lg border-4 border-yellow-400 focus:outline-none"
        >
          <Dialog.Title className="font-bangers text-7xl text-yellow-400 text-center mb-6">
            ✨ Daily Special ✨
          </Dialog.Title>

          <div className="flex flex-col items-center justify-center">
            <p className="text-2xl">{specialOrder?.name}</p>

            <div className="flex flex-row w-3/4">
              {specialOrder.items.map((item) => (
                <span className="food-emoji">{getFoodEmoji(item)}</span>
              ))}
            </div>

            <p className="mt-4 text-xl text-yellow-300">This order is worth {specialOrder.value} points!</p>
          </div>

          <div className="flex mt-8 space-y-4 justify-center items-center gap-2">
            <Dialog.Close asChild>
              <button
                className="close-modal-btn bg-green-500 hover:bg-green-600 w-full text-white font-bold text-2xl py-3 px-8 rounded-full m-0"
                onClick={addSpecialOrder}
              >
                Start Challenge!
              </button>
            </Dialog.Close>
            <Dialog.Close asChild>
              <button className="close-modal-btn bg-red-500 hover:bg-red-600 w-full text-white font-bold text-2xl py-3 px-8 rounded-full">
                Close
              </button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
