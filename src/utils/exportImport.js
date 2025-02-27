export const exportJSON = (data, filename = "workflow.json") => {
  try {
    if (!Array.isArray(data)) throw new Error("Invalid data format. Expected an array.");

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } catch (error) {
    console.error("Export failed:", error.message);
  }
};

export const importJSON = (event, setNodes) => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const importedData = JSON.parse(e.target.result);

      // Validate imported JSON structure
      if (!Array.isArray(importedData)) throw new Error("Invalid JSON format. Expected an array.");
      if (!importedData.every(node => node.id && node.type && node.position && node.data)) {
        throw new Error("Missing required node properties.");
      }

      setNodes(importedData);
    } catch (error) {
      console.error("Import failed:", error.message);
      alert(`Error: ${error.message}`);
    }
  };

  reader.onerror = () => {
    console.error("File reading error.");
    alert("Error reading file.");
  };

  reader.readAsText(file);
};
