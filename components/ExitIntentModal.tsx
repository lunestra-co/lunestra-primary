import React, { useEffect, useState } from "react";
import Button from "./Button";
import { X, Sparkles } from "lucide-react";

export default function ExitIntentModal() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      // Trigger if mouse leaves top of viewport (user going to close tab/change url)
      if (e.clientY <= 0 && !hasTriggered) {
        // Check session storage to avoid spamming
        const sessionTriggered = sessionStorage.getItem("exitIntentShown");
        if (!sessionTriggered) {
          setIsVisible(true);
          setHasTriggered(true);
          sessionStorage.setItem("exitIntentShown", "true");
        }
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [hasTriggered]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsVisible(false)}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-lg shadow-2xl animate-fade-in-up overflow-hidden">
        {/* Close Button */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-brandblack transition-colors z-20"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex flex-col">
          {/* Decorative Top */}
          <div className="h-2 bg-gradient-to-r from-brandblack via-sapphire to-brandblack"></div>

          <div className="p-10 lg:p-12 text-center">
            <div className="w-16 h-16 bg-brandgray rounded-full flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-8 h-8 text-sapphire" />
            </div>

            <h2 className="font-serif text-3xl text-brandblack mb-4">
              Before You Go...
            </h2>

            <p className="font-sans text-gray-600 text-sm leading-relaxed mb-8">
              Couldn't find the perfect stone? Our inventory extends far beyond
              what is displayed online. Let our Master Gemologist personally
              source your ideal gem from our private reserve.
            </p>

            <div className="space-y-4">
              <a href="#inquire" onClick={() => setIsVisible(false)}>
                <Button variant="primary" className="w-full">
                  Ask the Curator
                </Button>
              </a>

              <button
                onClick={() => setIsVisible(false)}
                className="text-xs uppercase tracking-widest text-gray-400 hover:text-brandblack transition-colors"
              >
                No, thank you. I'm just browsing.
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
