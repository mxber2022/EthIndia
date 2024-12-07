import { useState } from "react";
import zkeSDK from "@zk-email/sdk";

export default function ZKEmailProofComponent() {
  const [proof, setProof] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (event: any) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      // Read the file as text
      const eml = await file.text();

      // Initialize the SDK
      const sdk = zkeSDK();

      // Get the blueprint
      const blueprint = await sdk.getBlueprint(
        "mxber2022/HotelConfirmation@v1"
      );

      // Create a prover
      const prover = blueprint.createProver();

      // Generate the proof
      const generatedProof = await prover.generateProof(eml);
      const { proofData, publicData } = generatedProof.getProofData();
      setProof({ proofData, publicData });
    } catch (error) {
      console.error("Error generating proof:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <div>
        <h1>ZK Email Proof Generator</h1>

        <input
          type="file"
          accept=".eml"
          onChange={handleFileUpload}
          disabled={loading}
        />

        {loading && <p>Generating proof...</p>}

        {proof && (
          <div>
            <h3>Proof Generated:</h3>
            <pre>{JSON.stringify(proof, null, 2)}</pre>
          </div>
        )}
      </div>
    </main>
  );
}
