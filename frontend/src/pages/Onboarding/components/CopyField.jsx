import { useState } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { toast } from "react-toastify";

export default function CopyField({ value }) {

  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="copy-field" onClick={copy}>
      
 
      {copied ? (
        <CheckCircleIcon className="copy-icon success" />
      ) : (
        <ContentCopyIcon className="copy-icon" />
      )}

      <span>{value}</span>
    </div>      
  );
}
