import React, { useState } from "react";
import { Popover, PopoverContent } from "./shadcn/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { Button } from "./shadcn/button";
import { Loader } from "lucide-react";

export default function Popconfirm({
  content,
  trigger,
  loading,
  onOk = async () => {},
  onCancel = () => {},
}: {
  content: React.ReactNode;
  trigger: React.ReactNode;
  loading?: boolean;
  onOk?: () => Promise<void>;
  onCancel?: () => void;
}) {
  const [open, setOpen] = useState(false);

  function handleOnCancel() {
    setOpen(false);
    onCancel();
  }
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>{trigger}</PopoverTrigger>
      <PopoverContent>
        {content}
        <div className="flex justify-end gap-2">
          <Button onClick={() => onOk()}>
            {loading && <Loader className="animate-spin" />}
            Yes
          </Button>
          <Button
            className="bg-red-500 hover:bg-red-500-dark"
            onClick={() => handleOnCancel()}
          >
            No
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
