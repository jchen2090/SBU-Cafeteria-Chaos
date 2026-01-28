import * as Dialog from "@radix-ui/react-dialog";
import type { Dispatch, SetStateAction } from "react";
import { Button } from "./ui/button";

interface DailySpecialModalProps {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}

export const FeedbackModal = ({ open, onOpenChange }: DailySpecialModalProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay id="modal-container" className="fixed inset-0 bg-black bg-opacity-50 z-50" />
        <Dialog.Content className="modal-content fixed left-1/2 top-1/2 z-50 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 bg-slate-700 text-white p-8 rounded-2xl shadow-lg border-4 border-yellow-400 focus:outline-none">
          <Dialog.Title className="font-bangers text-7xl text-yellow-400 text-center mb-6">
            Tell us what you think
          </Dialog.Title>

          <div className="flex justify-center">
            <img src="../imgs/qr-code.svg" className="h-96" />
          </div>

          <p className="italic text-center mt-2">
            This is an anonymous survey. All feedback will be directly sent to ASA.
          </p>

          <div className="flex mt-8 space-y-4 justify-center items-center gap-2">
            <Dialog.Close asChild>
              <Button
                variant="destructive"
                className="w-full text-white font-bold text-2xl py-5 px-8 rounded-full cursor-pointer"
              >
                Close
              </Button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
