import { useCallback, useMemo, useState } from "react";
import { ClipboardDocumentIcon, ClipboardDocumentCheckIcon } from '@heroicons/react/24/outline';

interface CopyLinkProps {
  link?: string;
}

export const CopyButton = ({
  link
}: CopyLinkProps) => {
  const linkReady = useMemo(() => !!link, [link]);
  const [linkCopied, setLinkCopied] = useState(false);
  const onClick = useCallback(() => {
    if (link) {
      navigator.clipboard.writeText(link).then(() => {
        setLinkCopied(() => {
          setTimeout(() => {
            setLinkCopied(false);
          }, 600);
          return true;
        });
      });
    }
  }, [link]);
  return (
    <button
      className="text-xl bg-white text-black w-24 h-8 rounded-sm flex justify-center disabled:bg-gray-300"
      type="button"
      onClick={onClick}
      disabled={!linkReady}
    >
      {
        linkCopied ?
          <ClipboardDocumentCheckIcon className="size-8"/>
          : <ClipboardDocumentIcon className="size-8"/>
      }
    </button>
  );
};