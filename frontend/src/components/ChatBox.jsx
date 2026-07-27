import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Sparkles } from "lucide-react";
import { toast } from "sonner";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import InputBox from "./InputBox";
import LanguageSelector from "./LanguageSelector";
import TriageCard from "./TriageCard";

export default function ChatBox() {
  const [message, setMessage] = useState("");
  const [language, setLanguage] = useState("Auto Detect");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  async function sendMessage() {
    if (!message.trim()) {
      toast.error("Please describe your symptoms.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/triage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          language,
        }),
      });

      if (!response.ok) {
        throw new Error("Unable to contact server.");
      }

      const data = await response.json();

      setResult(data);

      toast.success("Analysis complete.");
    } catch (err) {
      console.error(err);

      toast.error("Failed to analyze symptoms.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="overflow-hidden rounded-[32px] border-0 bg-white/80 shadow-2xl backdrop-blur-xl">

      <CardContent className="p-0">

        {/* Header */}

        <div className="flex flex-col gap-6 p-8 md:flex-row md:items-center md:justify-between">

          <div className="flex items-start gap-4">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">

              <Bot className="h-7 w-7 text-primary" />

            </div>

            <div>

              <h2 className="text-2xl font-bold">

                Describe Your Symptoms

              </h2>

              <p className="mt-2 text-muted-foreground">

                Use your own language. Our AI automatically understands and
                classifies the urgency.

              </p>

            </div>

          </div>

          <LanguageSelector
            language={language}
            setLanguage={setLanguage}
          />

        </div>

        <Separator />

        {/* Input */}

        <div className="p-8">

          <InputBox
  message={message}
  setMessage={setMessage}
  loading={loading}
  sendMessage={sendMessage}
  language={language}
/>

        </div>

        {/* Thinking */}

        <AnimatePresence>

          {loading && (

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="border-t bg-slate-50 p-10"
            >

              <div className="flex items-center gap-4">

                <motion.div
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: "linear",
                  }}
                  className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10"
                >

                  <Sparkles className="text-primary" />

                </motion.div>

                <div>

                  <h3 className="font-semibold text-lg">

                    Gemma is thinking...

                  </h3>

                  <p className="text-muted-foreground">

                    Understanding language • Extracting symptoms • Estimating urgency

                  </p>

                </div>

              </div>

            </motion.div>

          )}

        </AnimatePresence>

        {/* Result */}

        <AnimatePresence>

          {result && (

            <motion.div
              initial={{
                opacity: 0,
                y: 40,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.4,
              }}
              className="border-t bg-slate-50 p-8"
            >

              <TriageCard result={result} />

            </motion.div>

          )}

        </AnimatePresence>

      </CardContent>

    </Card>
  );
}