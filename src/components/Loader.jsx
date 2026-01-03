import React from "react";
import { Loader2 } from "lucide-react";

const Loader = () => {
  return (
    <div
      className="flex flex-col items-center justify-center py-10 animate-in fade-in zoom-in duration-300"
      role="status"
      aria-live="polite"
    >
      <div className="relative">
        <Loader2 className="w-16 h-16 text-blue-600 dark:text-blue-400 animate-spin" />
        <div className="absolute inset-0 bg-blue-400 dark:bg-blue-600 opacity-20 blur-xl rounded-full"></div>
      </div>
      <p className="mt-4 text-gray-600 dark:text-gray-300 font-medium text-lg">
        Analyzing food freshness...
      </p>
      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
        running neural network inference
      </p>
    </div>
  );
};

export default Loader;
