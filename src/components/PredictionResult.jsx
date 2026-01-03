import React from "react";
import {
  CheckCircle,
  AlertTriangle,
  XCircle,
  Info,
  Activity,
} from "lucide-react";

const PredictionResult = ({ result }) => {
  if (!result) return null;

  const { label, score, color, rawLabel } = result;

  // Visual configuration based on result label/color
  const getStatusConfig = (statusLabel) => {
    const l = statusLabel.toLowerCase();
    if (l === "fresh") {
      return {
        bg: "bg-green-50 dark:bg-green-900/20",
        border: "border-green-200 dark:border-green-900",
        text: "text-green-700 dark:text-green-400",
        icon: (
          <CheckCircle className="w-12 h-12 text-green-500 dark:text-green-400" />
        ),
        message: "Great! This food looks fresh and safe to eat.",
        barColor: "bg-green-500 dark:bg-green-400",
      };
    } else if (l === "okay") {
      return {
        bg: "bg-yellow-50 dark:bg-yellow-900/20",
        border: "border-yellow-200 dark:border-yellow-900",
        text: "text-yellow-700 dark:text-yellow-400",
        icon: (
          <AlertTriangle className="w-12 h-12 text-yellow-500 dark:text-yellow-400" />
        ),
        message: "Quality is acceptable, but check carefully before consuming.",
        barColor: "bg-yellow-500 dark:bg-yellow-400",
      };
    } else {
      return {
        bg: "bg-red-50 dark:bg-red-900/20",
        border: "border-red-200 dark:border-red-900",
        text: "text-red-700 dark:text-red-400",
        icon: <XCircle className="w-12 h-12 text-red-500 dark:text-red-400" />,
        message: "Warning: Signs of spoilage detected. Better avoid.",
        barColor: "bg-red-500 dark:bg-red-400",
      };
    }
  };

  const config = getStatusConfig(label);

  return (
    <div
      className={`mt-8 w-full max-w-lg mx-auto rounded-3xl p-6 border-2 shadow-sm animate-in fade-in slide-in-from-bottom-5 ${config.bg} ${config.border}`}
      role="region"
      aria-live="polite"
    >
      <div className="flex items-center gap-5 mb-6">
        <div className="p-3 bg-white dark:bg-slate-800 rounded-full shadow-sm">
          {config.icon}
        </div>
        <div>
          <h2 className={`text-3xl font-black tracking-tight ${config.text}`}>
            {label}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
            Confidence Score
          </p>
        </div>
        <div className="ml-auto text-right">
          <div className={`text-2xl font-bold ${config.text}`}>{score}%</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-3 mb-4 overflow-hidden">
        <div
          className={`h-3 rounded-full transition-all duration-1000 ease-out ${config.barColor}`}
          style={{ width: `${score}%` }}
        ></div>
      </div>

      <div className="bg-white/60 dark:bg-black/20 rounded-xl p-4 border border-black/5 dark:border-white/5">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-gray-400 dark:text-gray-500 mt-1 shrink-0" />
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {config.message}
          </p>
        </div>
        {rawLabel && (
          <div className="mt-2 text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1 pl-8">
            <Activity size={12} /> Model detection: {rawLabel}
          </div>
        )}
      </div>
    </div>
  );
};

export default PredictionResult;
