export function classifyTask(input) {
  const text = input.toLowerCase();
  if (text.includes("invoice") || text.includes("ocr") || text.includes("pdf")) {
    return "document-intelligence";
  }
  if (text.includes("voice") || text.includes("transcript") || text.includes("call")) {
    return "voice-communication";
  }
  if (text.includes("image") || text.includes("creative") || text.includes("design")) {
    return "creative-generation";
  }
  if (text.includes("market") || text.includes("portfolio") || text.includes("trading")) {
    return "fintech-intelligence";
  }
  if (text.includes("3d") || text.includes("simulation") || text.includes("usd")) {
    return "3d-simulation";
  }
  return "engineering-orchestration";
}
