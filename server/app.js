// import express from "express";
// import fs from "fs/promises"; // Use fs.promises for async/await
// import zkeSDK from "@zk-email/sdk";
// import ProofStatus from "@zk-email/sdk";
// import cors from "cors";

// const app = express();
// const port = 3000;
// app.use(cors());
// app.use(express.json()); // To parse JSON bodies

// // Define the blueprintSlug
// const blueprintSlug = "mxber2022/HotelConfirmation@v1";

// // Function to generate proof
// async function generateProof() {
//   try {
//     const sdk = zkeSDK();

//     // Read the EML file asynchronously
//     const eml = (
//       await fs.readFile(
//         "/Users/maharajababu/Documents/Projects/EthIndia/server/booking.eml"
//         // "utf-8" // Specify encoding to read the content as a string
//       )
//     ).toString();

//     // const externalInputs = [
//     //   {
//     //     maxLength: 64,
//     //     name: "address",
//     //     value: "0x0000000000000000000000000000000000000000", // Placeholder address
//     //   },
//     // ];

//     // // Initialize the SDK

//     // Get the blueprint by slug
//     const blueprint = await sdk.getBlueprint(blueprintSlug);

//     // Create the prover from the blueprint
//     const prover = blueprint.createProver();

//     // Generate the proof
//     const proof = await prover.generateProof(eml);

//     // Check the proof status
//     let status = await proof.checkStatus();
//     console.log("Initial Status is: ", status);
//     const {
//       proofData,
//       publicData,
//       externalInputs: externalInputsData,
//       publicOutputs,
//     } = proof.getProofData();

//     const callData = await proof.createCallData();

//     console.log("proof: ", proofData);
//     console.log("public: ", publicData);
//     console.log("external inputs: ", externalInputsData);
//     console.log("public outputs: ", publicOutputs);
//     console.log("callData: ", callData);
//     console.log(
//       "verifier address: ",
//       blueprint?.props.verifierContract?.address
//     );

//     // Return the proof data and relevant details
//     return {
//       proofData,
//       publicData,
//       externalInputsData,
//       publicOutputs,
//       callData,
//       verifierAddress: blueprint?.props.verifierContract?.address,
//     };
//   } catch (error) {
//     console.error("Error generating proof:", error);
//     throw new Error("Proof generation failed");
//   }
// }

// // API endpoint to trigger proof generation
// app.post("/generate-proof", async (req, res) => {
//   try {
//     const proofData = await generateProof();
//     res.json(proofData);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Start the Express server
// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });
import express from "express";
import fs from "fs/promises"; // Use fs.promises for async/await
import zkeSDK from "@zk-email/sdk";
import cors from "cors";

const app = express();
const port = 3000;
app.use(cors());
app.use(express.json()); // To parse JSON bodies

// Define the blueprintSlug
const blueprintSlug = "mxber2022/HotelConfirmation@v1";

// Function to generate proof
async function generateProof() {
  try {
    const sdk = zkeSDK();

    // Read the EML file asynchronously
    const eml = (
      await fs.readFile(
        "/Users/maharajababu/Documents/Projects/EthIndia/server/booking.eml"
      )
    ).toString();

    // Get the blueprint by slug
    const blueprint = await sdk.getBlueprint(blueprintSlug);

    // Create the prover from the blueprint
    const prover = blueprint.createProver();

    // Generate the proof
    const proof = await prover.generateProof(eml);

    // Check the proof status
    let status = await proof.checkStatus();
    console.log("Initial Status is: ", status);

    const {
      proofData,
      publicData,
      externalInputs: externalInputsData,
      publicOutputs,
    } = proof.getProofData();

    const callData = await proof.createCallData();
    const onchainstatius = await proof.verifyOnChain();
    console.log("onchainstatius: ", onchainstatius);

    console.log("proof: ", proofData);
    console.log("public: ", publicData);
    console.log("external inputs: ", externalInputsData);
    console.log("public outputs: ", publicOutputs);
    console.log("callData: ", callData);
    console.log(
      "verifier address: ",
      blueprint?.props.verifierContract?.address
    );

    // Convert BigInt values to string
    return {
      proofData: convertBigIntToString(proofData),
      publicData: convertBigIntToString(publicData),
      externalInputsData: convertBigIntToString(externalInputsData),
      publicOutputs: convertBigIntToString(publicOutputs),
      callData: convertBigIntToString(callData),
      verifierAddress: blueprint?.props.verifierContract?.address,
    };
  } catch (error) {
    console.error("Error generating proof:", error);
    throw new Error("Proof generation failed");
  }
}

// Function to convert BigInt to string for all nested objects
function convertBigIntToString(obj) {
  if (obj === null || obj === undefined) return obj;

  if (typeof obj === "bigint") {
    return obj.toString(); // Convert BigInt to string
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => convertBigIntToString(item)); // Handle arrays
  }

  if (typeof obj === "object") {
    const newObj = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        newObj[key] = convertBigIntToString(obj[key]); // Recursively handle objects
      }
    }
    return newObj;
  }

  return obj;
}

// API endpoint to trigger proof generation
app.post("/generate-proof", async (req, res) => {
  try {
    const proofData = await generateProof();
    res.json(proofData); // Send the processed data
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
