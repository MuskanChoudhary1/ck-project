import { useState } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { toast } from "react-toastify";


function PolicyBox({ policy }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(policy);
    setCopied(true);
    toast.success("Copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="policy-box">
      <pre>{policy}</pre>

      <div className="policy-copy-icon" onClick={copy}>
        {copied ? (
          <CheckCircleIcon className="copy-icon success" />
        ) : (
          <ContentCopyIcon className="copy-icon" />
        )}
      </div>
    </div>
  );
}

export default PolicyBox;
