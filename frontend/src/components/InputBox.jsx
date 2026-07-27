import { speechLanguageCodes } from "../utils/languageCodes";
import { useEffect, useRef, useState } from "react";

import { ArrowUp, Mic, MicOff, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function InputBox({
  message,
  setMessage,
  loading,
  sendMessage,
  language,
}) {
  const textareaRef = useRef(null);

  const [listening, setListening] = useState(false);

  useEffect(() => {
    autoResize();
  }, [message]);

  function autoResize() {
    const el = textareaRef.current;

    if (!el) return;

    el.style.height = "0px";
    el.style.height = Math.min(el.scrollHeight, 220) + "px";
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      if (!loading) {
        sendMessage();
      }
    }
  }

  function startVoiceInput() {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition is not supported.");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = speechLanguageCodes[language] || "en-IN";

    recognition.interimResults = true;
    recognition.maxAlternatives = 1;
    recognition.continuous = false;

    setListening(true);

    recognition.start();

    recognition.onresult = (event) => {
      let transcript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }

      setMessage(transcript);
    };

    recognition.onerror = (event) => {
      console.error(event);

      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };
  }

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-3xl border bg-background shadow-sm transition-all focus-within:ring-2 focus-within:ring-primary/40">
        <Textarea
          ref={textareaRef}
          rows={1}
          value={message}
          disabled={loading}
          onKeyDown={handleKeyDown}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Describe your symptoms... (Example: I have had fever and headache for two days.)"
          className="min-h-[140px] resize-none border-0 bg-transparent px-6 py-5 text-base shadow-none focus-visible:ring-0"
        />

        <div className="flex items-center justify-between border-t px-5 py-4">
          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant={listening ? "destructive" : "outline"}
              size="icon"
              disabled={loading}
              onClick={startVoiceInput}
            >
              {listening ? (
                <MicOff className="h-5 w-5" />
              ) : (
                <Mic className="h-5 w-5" />
              )}
            </Button>
            <span className="mt-1 text-xs text-muted-foreground">
    🎤 {language}
  </span>

            <span className="text-sm text-muted-foreground">
              {message.length} characters
            </span>
          </div>

          <Button
            onClick={sendMessage}
            disabled={loading || !message.trim()}
            className="rounded-full px-6"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                Analyze
                <ArrowUp className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </div>

      <p className="text-center text-sm text-muted-foreground">
        Press <kbd className="rounded border px-1 py-0.5">Enter</kbd> to
        analyze, or{" "}
        <kbd className="rounded border px-1 py-0.5">Shift + Enter</kbd> for a
        new line.
      </p>
    </div>
  );
}
