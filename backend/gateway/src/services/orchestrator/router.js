const departmentMap = {
  "document-intelligence": ["document-ai", "security-ai", "memory-ai"],
  "voice-communication": ["voice-ai", "security-ai", "memory-ai"],
  "creative-generation": ["creative-ai", "security-ai", "memory-ai"],
  "fintech-intelligence": [
    "market-intelligence-ai",
    "research-ai",
    "security-ai",
    "memory-ai",
  ],
  "3d-simulation": ["3d-ai", "security-ai", "memory-ai"],
  "engineering-orchestration": ["ceo-ai", "cto-ai", "security-ai", "memory-ai"],
};

export function routeToDepartments(classification, departments) {
  const selected = departmentMap[classification] ?? departmentMap["engineering-orchestration"];
  return selected
    .map((id) => departments.find((department) => department.id === id))
    .filter(Boolean)
    .filter((department) => department.enabled)
    .sort((a, b) => a.routingPriority - b.routingPriority);
}
