import { useState } from "react";
import ImageUploader from "./components/ImageUploader";
import PredictionResult from "./components/PredictionResult";
import Loader from "./components/Loader";
import { classifyImage } from "./services/api";
import {
  Sparkles,
  History,
  Leaf,
  Apple,
  Check,
  AlertOctagon,
  Moon,
  Sun,
  Info,
} from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "./hooks/useTheme";
import "./styles.css";

function App() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);
  const { theme, toggleTheme } = useTheme();

  const handleImageSelect = (file, previewUrl) => {
    setImage(file);
    setPreview(previewUrl);
    setResult(null);
    setError(null);
  };

  const handleAnalyze = async () => {
    if (!image) return;

    setLoading(true);
    setError(null);

    try {
      const data = await classifyImage(image);
      setResult(data);

      // Add to history
      setHistory((prev) => [{ ...data, preview, id: Date.now() }, ...prev]);
    } catch (err) {
      console.error(err);
      setError("Failed to analyze image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-green-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-panel dark:bg-slate-900/80 dark:border-slate-700 border-b border-white/50 shadow-sm transition-colors">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <div className="bg-green-500 p-2 rounded-lg text-white shadow-lg shadow-green-500/20">
              <Apple size={24} />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-400 dark:to-blue-400">
              FreshSense AI
            </h1>
          </motion.div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-slate-600 dark:text-slate-300"
              aria-label="Toggle Dark Mode"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            {/* GitHub link removed */}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Main Content Area */}
        <div className="lg:col-span-8 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center space-y-4 mb-10"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Is your food <span className="gradient-text">Fresh?</span>
            </h2>
            <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
              Upload a photo of fruits like{" "}
              <strong>apples, bananas, oranges</strong>, or everyday food items
              to instantly detect freshness and quality using advanced computer
              vision.
            </p>
          </motion.div>

          <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl shadow-blue-900/5 dark:shadow-black/20 ring-1 ring-black/5 dark:ring-white/5 transition-colors">
            <ImageUploader
              onImageSelect={handleImageSelect}
              selectedImage={preview}
            />

            <div className="mt-8 flex justify-center">
              {loading ? (
                <Loader />
              ) : (
                <button
                  onClick={handleAnalyze}
                  disabled={!image || loading}
                  className={`
                    group relative px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all
                    ${
                      !image
                        ? "bg-gray-200 dark:bg-slate-700 text-gray-400 dark:text-slate-500 cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:scale-105 active:scale-95"
                    }
                  `}
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className={image ? "animate-pulse" : ""} />
                    Analyze Freshness
                  </span>
                </button>
              )}
            </div>

            {error && (
              <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl flex items-center justify-center gap-2 border border-red-100 dark:border-red-900/50 animate-in fade-in">
                <AlertOctagon size={20} />
                {error}
              </div>
            )}

            <PredictionResult result={result} />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
          >
            {[
              {
                title: "Instant Analysis",
                icon: <Sparkles className="w-6 h-6 text-purple-500" />,
                desc: "Get results in seconds with our optimized AI model.",
              },
              {
                title: "High Accuracy",
                icon: <Check className="w-6 h-6 text-green-500" />,
                desc: "Trained on thousands of food images for precise detection.",
              },
              {
                title: "Track History",
                icon: <History className="w-6 h-6 text-blue-500" />,
                desc: "Keep a record of all your scans automatically.",
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700"
              >
                <div className="bg-slate-50 dark:bg-slate-700/50 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Sidebar / History */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg shadow-gray-100 dark:shadow-none border border-gray-100 dark:border-slate-700 sticky top-28 transition-colors">
            <div className="flex items-center gap-2 mb-6 text-gray-800 dark:text-slate-200">
              <History size={20} className="text-blue-500" />
              <h3 className="font-bold text-lg">Recent Analysis</h3>
            </div>

            {history.length === 0 ? (
              <div className="text-center py-12 text-gray-400 dark:text-slate-500 border-2 border-dashed border-gray-100 dark:border-slate-700 rounded-xl">
                <p>No history yet.</p>
                <p className="text-xs mt-1">
                  Uploaded images will appear here.
                </p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[600px] overflow-y-auto no-scrollbar pr-2">
                {history.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-3 rounded-xl bg-gray-50 dark:bg-slate-700/50 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors cursor-default border border-transparent hover:border-gray-200 dark:hover:border-slate-600"
                  >
                    <img
                      src={item.preview}
                      alt="History"
                      className="w-16 h-16 rounded-lg object-cover bg-white dark:bg-slate-600 shadow-sm"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <span
                          className={`font-bold text-sm px-2 py-0.5 rounded-full ${
                            item.label === "Fresh"
                              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                              : item.label === "Okay"
                              ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                              : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                          }`}
                        >
                          {item.label}
                        </span>
                        <span className="text-xs text-gray-400 dark:text-gray-500">
                          {new Date(item.id).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                          {item.score}% Confidence
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-indigo-900 dark:bg-slate-800 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden ring-1 ring-indigo-500/20">
            <div className="relative z-10">
              <h3 className="font-bold text-lg mb-2 text-white">
                How it works?
              </h3>
              <p className="text-indigo-200 dark:text-slate-400 text-sm leading-relaxed mb-4">
                We use a pre-trained computer vision model (ResNet-based)
                adapted for food quality assessment. It analyzes texture, color,
                and surface patterns to predict freshness.
              </p>
              <div className="text-xs text-indigo-300 dark:text-slate-500 font-mono bg-indigo-950/50 dark:bg-black/20 p-2 rounded">
                Model: Hugging Face Generic
              </div>
            </div>
            {/* Decorative blob */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-indigo-600 dark:bg-indigo-500 rounded-full blur-2xl opacity-50"></div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
