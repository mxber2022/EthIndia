import { useState } from "react";
import zkeSDK from "@zk-email/sdk";
import { ExternalInputInput, ProofStatus } from "@zk-email/sdk";

export default function ZKEmailProofComponent() {
  const [proof, setProof] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (event: any) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      const eml = await file.text();
      console.log("eml: ", eml);
      const externalInputs: ExternalInputInput[] = [
        {
          maxLength: 64,
          name: "address",
          value: "0x0000000000000000000000000000000000000000",
        },
      ];

      const sdk = zkeSDK();
      const blueprint = await sdk.getBlueprint(
        "mxber2022/HotelConfirmation@v1"
      );
      const prover = blueprint.createProver();

      // Generate the proof
      const proof = await prover.generateProof(eml, externalInputs);
      console.log("proof: ", proof);

      let status = await proof.checkStatus();
      // Should be InProgress
      console.log(
        "Initial Status is in progress: ",
        status === ProofStatus.InProgress
      );

      // You can now either manually use checkStatus in interval or use waitForCompletion
      status = await proof.waitForCompletion();
      console.log("status: ", status);
      if (status === ProofStatus.Failed) {
        throw new Error("Failed to generate proof");
      }

      const {
        proofData,
        publicData,
        externalInputs: externalInputsData,
        publicOutputs,
      } = proof.getProofData();

      const callData = await proof.createCallData();

      console.log("proof: ", proofData);
      console.log("public: ", publicData);
      console.log("external inputs: ", externalInputsData);
      console.log("public outputs: ", publicOutputs);
      console.log("callData: ", callData);
      console.log(
        "verifier address: ",
        blueprint?.props.verifierContract?.address
      );

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
