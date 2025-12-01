import * as Dialog from "@radix-ui/react-dialog";
import * as Tabs from "@radix-ui/react-tabs";
import type { SavedGameType } from "../providers/types";
import type { Dispatch, SetStateAction } from "react";
import { useGameContext } from "../providers/GameStateProvider";

interface HighScoreModalProps {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}

function getPlacementColor(index: number) {
  switch (index) {
    case 0: {
      return "bg-amber-500/70 border-amber-500";
    }
    case 1: {
      return "bg-slate-500/70 border-slate-500";
    }
    case 2: {
      return "bg-amber-700/70 border-amber-700";
    }
  }
}

function getMedal(index: number) {
  switch (index) {
    case 0: {
      return "🥇";
    }
    case 1: {
      return "🥈";
    }
    case 2: {
      return "🥉";
    }
  }
}

export const HighScoreModal = ({ open, onOpenChange }: HighScoreModalProps) => {
  const { state } = useGameContext();
  const { highScores, pastSemesters } = state;

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay id="modal-container" className="fixed inset-0 bg-black bg-opacity-50 z-50" />
        <Dialog.Content
          id="highscore-modal-content"
          className="modal-content fixed left-1/2 top-1/2 z-50 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 bg-slate-700 text-white p-8 rounded-2xl shadow-lg border-4 border-yellow-400 focus:outline-none"
        >
          <Dialog.Title className="font-bangers text-7xl text-yellow-400 text-center mb-6">Hall of Fame</Dialog.Title>

          <Tabs.Root defaultValue="top">
            <Tabs.List className="flex space-x-4 mb-6 justify-center">
              <Tabs.Trigger
                value="top"
                className="px-6 py-2 text-2xl font-bold rounded-lg data-[state=active]:bg-yellow-400 data-[state=active]:text-black bg-slate-600"
              >
                Current Semester
              </Tabs.Trigger>

              <Tabs.Trigger
                value="history"
                className="px-6 py-2 text-2xl font-bold rounded-lg data-[state=active]:bg-yellow-400 data-[state=active]:text-black bg-slate-600"
              >
                Last Semester
              </Tabs.Trigger>
            </Tabs.List>
            {/* TOP SCORES */}
            <Tabs.Content value="top">
              <ol className="list-decimal list-inside text-3xl space-y-3">
                {highScores.length === 0 ? (
                  <li className="text-center text-2xl text-slate-300">No high scores recorded yet.</li>
                ) : (
                  highScores.map((entry: SavedGameType, index) => (
                    <li key={`${entry.initials}-${entry.score}-${index}`}>
                      <span className="font-semibold">{entry.initials || "---"}</span> — {entry.score} pts
                    </li>
                  ))
                )}
              </ol>
            </Tabs.Content>
            {/* SCORE HISTORY */}
            <Tabs.Content value="history">
              <ol className="list-none list-inside text-2xl space-y-2">
                {pastSemesters.length === 0 ? (
                  <li className="text-center text-xl text-slate-300">No historical scores recorded yet.</li>
                ) : (
                  pastSemesters.map((entry, index) => (
                    <div className={`${getPlacementColor(index)} rounded-lg p-4 border`} key={index}>
                      <li key={index}>
                        <span>{getMedal(index)}</span>
                        <span className="font-semibold">{entry.initials || "---"}</span> — {entry.score} pts
                        <span className="text-slate-300 text-lg"> ({entry.semester})</span>
                      </li>
                    </div>
                  ))
                )}
              </ol>
            </Tabs.Content>
          </Tabs.Root>

          <div className="mt-8">
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
