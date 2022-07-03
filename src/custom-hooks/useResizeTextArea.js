import { useEffect } from "react";

export default function useResizeTextArea(textAreaRef) {

  const handleTextAreaSize = () => {
    if (textAreaRef.current === null) return;
    textAreaRef.current.style.height = 'inherit';
    const computed = window.getComputedStyle(textAreaRef.current);
    const height = parseInt(computed.getPropertyValue('border-top-width'), 10)
      + parseInt(computed.getPropertyValue('padding-top'), 10)
      + textAreaRef.current.scrollHeight
      + parseInt(computed.getPropertyValue('padding-bottom'), 10)
      + parseInt(computed.getPropertyValue('border-bottom-width'), 10);
    textAreaRef.current.style.height = `${height}px`;
  };

  useEffect(() => {
    handleTextAreaSize();
  }, []);

  return handleTextAreaSize;
}