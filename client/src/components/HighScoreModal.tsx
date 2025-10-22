import * as Dialog from "@radix-ui/react-dialog";
import type { SavedGameType } from "../providers/types";
import type { Dispatch, SetStateAction } from "react";

interface HighScoreModalProps {
  open: boolean;
  scores: Array<SavedGameType>;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}

export const HighScoreModal = ({ open, onOpenChange, scores }: HighScoreModalProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay id="modal-container" className="fixed inset-0 bg-black bg-opacity-50 z-50" />
        <Dialog.Content
          id="highscore-modal-content"
          className="modal-content fixed left-1/2 top-1/2 z-50 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 bg-slate-700 text-white p-8 rounded-2xl shadow-lg border-4 border-yellow-400 focus:outline-none"
        >
          <Dialog.Title className="font-bangers text-7xl text-yellow-400 text-center mb-6">Hall of Fame</Dialog.Title>

          <ol id="highscore-list" className="list-decimal list-inside text-3xl space-y-3">
            {scores.length === 0 ? (
              <li className="text-center text-2xl text-slate-300">No high scores recorded yet.</li>
            ) : (
              scores.map((entry: SavedGameType, index) => (
                <li key={`${entry.initials}-${entry.score}-${index}`}>
                  <span className="font-semibold">{entry.initials || "---"}</span> — {entry.score} pts
                </li>
              ))
            )}
          </ol>

          <div className="mt-8 space-y-4">
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
