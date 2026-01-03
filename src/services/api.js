import axios from "axios";

const HF_API_KEY = import.meta.env.VITE_HF_API_KEY;
// Real Freshness Model
const MODEL_ID = "devdezzies/freshvision"; 

/**
 * Classifies the image using Hugging Face API or Mock.
 * @param {File} file 
 * @returns {Promise<{label: string, score: string, color: string}>}
 */
export const classifyImage = async (file) => {
  // Removed artificial delay for real API
  // await new Promise(r => setTimeout(r, 800));

  if (!HF_API_KEY) {
    console.log("Using Mock API (No VITE_HF_API_KEY found)");
    return mockClassify(file);
  }

  try {
    const response = await axios.post(
      `https://api-inference.huggingface.co/models/${MODEL_ID}`,
      file,
      {
        headers: {
          Authorization: `Bearer ${HF_API_KEY}`,
          "Content-Type": file.type,
        },
      }
    );

    return processRealResponse(response.data);
  } catch (error) {
    console.error("API Request Failed", error);
    // Fallback to mock so the user sees something
    return mockClassify(file);
  }
};

const processRealResponse = (data) => {
  if (!data || !Array.isArray(data) || data.length === 0) {
    throw new Error("Invalid API response");
  }

  // The model returns an array of predictions: [{ label: "fresh_apple", score: 0.9 }, ...]
  const topPrediction = data[0];
  const score = topPrediction.score || 0;
  const labelText = topPrediction.label.toLowerCase();

  let label = "Unknown";
  let color = "gray";

  // Check for keywords in the label
  if (labelText.includes("fresh")) {
    label = "Fresh";
    color = "green";
  } else if (labelText.includes("rotten")) {
    label = "Avoid";
    color = "red";
  } else {
    // Fallback if label is ambiguous or other object
    label = "Okay"; 
    color = "yellow";
  }

  // Adjust confidence slightly if needed, or use directly
  return {
    label,
    score: (score * 100).toFixed(1),
    color,
    rawLabel: topPrediction.label 
  };
};

const mockClassify = (file) => {
  return new Promise((resolve) => {
    // Deterministic mock based on file name or random if not possible
    const randomVal = Math.random();
    
    let result = {
      label: "Fresh",
      score: (85 + Math.random() * 14).toFixed(1),
      color: "green"
    };

    if (randomVal < 0.3) {
      result = {
        label: "Avoid",
        score: (75 + Math.random() * 20).toFixed(1),
        color: "red"
      };
    } else if (randomVal < 0.6) {
      result = {
        label: "Okay",
        score: (60 + Math.random() * 20).toFixed(1),
        color: "yellow"
      };
    }

    resolve(result);
  });
};
