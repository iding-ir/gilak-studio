import { useRef, useState } from "react";

import { IconButton } from "../Icon";
import { Tooltip } from "../Tooltip";
import { CopyToClipboardWrapper } from "./CopyToClipboardWrapper";
import IconCheck from "./icon-check.svg?url";
import IconCopy from "./icon-copy.svg?url";

export type CopyToClipboardProps = {
  tooltip: string;
  tooltipAfter: string;
  value: string;
};

export const CopyToClipboard = ({
  tooltip,
  tooltipAfter,
  value,
}: CopyToClipboardProps) => {
  const [clicked, setClicked] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const handleClick = () => {
    setClicked(true);

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      setClicked(false);
      timeoutRef.current = null;
    }, 2000);
  };

  return (
    <Tooltip content={clicked ? tooltipAfter : tooltip}>
      <CopyToClipboardWrapper value={value}>
        <IconButton
          variant="primary"
          icon={clicked ? IconCheck : IconCopy}
          onClick={handleClick}
          aria-label={clicked ? tooltipAfter : tooltip}
        />
      </CopyToClipboardWrapper>
    </Tooltip>
  );
};
