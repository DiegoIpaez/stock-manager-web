import React, { useState } from 'react';
import { Popover, PopoverContent } from './shadcn/popover';
import { PopoverArrow, PopoverTrigger } from '@radix-ui/react-popover';
import { Button } from './shadcn/button';
import Spinner from './feedback/Spinner';

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
      <PopoverContent className="text-sm">
        <PopoverArrow />
        {content}
        <div className="flex justify-end gap-2 mt-4">
          <Button className="cursor-pointer" onClick={() => handleOnCancel()}>
            No
          </Button>
          <Button
            onClick={() => onOk()}
            className="bg-red-500 hover:bg-red-500-dark text-white cursor-pointer"
          >
            {loading && <Spinner />}
            Yes
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
