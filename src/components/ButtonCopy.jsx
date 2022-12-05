import { useEffect } from "react";
import { useState } from "react"
import { toast } from "react-toastify";

const ButtonCopy = () => {
    const [copied, setCopied] = useState(false);

    const copy =() => {
        const el = document.createElement("input");
        el.value = window.location.href;
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
        setCopied(true);
    }
    
    useEffect(() => {
        if (copied) {
            toast.success('Copied!');
            setCopied(false)
        }
    },[copied])

    return (
        <button className="btn btn-copy" onClick={copy}>
        <i class="fa-solid fa-copy"></i> {copied ? "Copied!" : "Copy link"}
      </button>
    )
}

export default ButtonCopy