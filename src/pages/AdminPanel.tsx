import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

const AdminPanel: React.FC = () => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPdfFile(e.target.files[0]);
      setError(null);
      setSuccess(null);
    }
  };

  const handleUpload = async () => {
    if (!pdfFile) {
      setError("Please select a PDF file.");
      return;
    }
    setUploading(true);
    setError(null);
    setSuccess(null);
    // TODO: Integrate PDF parsing and topic creation logic here
    setTimeout(() => {
      setUploading(false);
      setSuccess("PDF uploaded and processed successfully (mock).");
    }, 2000);
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Admin Panel: Upload New Topic PDF</h2>
        <Input type="file" accept="application/pdf" onChange={handleFileChange} />
        <Button className="mt-4" onClick={handleUpload} disabled={uploading}>
          {uploading ? "Uploading..." : "Upload PDF"}
        </Button>
        {error && <div className="text-red-500 mt-2">{error}</div>}
        {success && <div className="text-green-500 mt-2">{success}</div>}
      </Card>
    </div>
  );
};

export default AdminPanel;
