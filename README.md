# EthIndia

# TrustStay – Anonymous Hotel Review Platform (Powered by TLSNotary)

**Overview**  
**TrustStay** is a **Web3 hotel review platform** that ensures only verified guests can post reviews. Using **TLSNotary**, we cryptographically confirm that the reviewer has booked and stayed at the hotel, while preserving their anonymity. The platform leverages blockchain technology to store reviews in a tamper-proof, decentralized manner, ensuring transparent and trustworthy feedback for travelers.

## Features

- **TLSNotary Booking Verification**: Only verified guests who have booked and stayed at a hotel can leave reviews.
- **Anonymity**: Users' identities are kept anonymous through privacy-preserving cryptographic protocols, ensuring honest reviews.
- **Blockchain-Powered**: Reviews are stored on a blockchain to prevent tampering, ensuring all feedback remains transparent and immutable.
- **Trusted Reviews**: Genuine feedback from real guests eliminates fake or manipulated reviews, building trust for future travelers.

## Architecture

- **Frontend**: Built using React.js for an intuitive user interface where guests can leave and browse reviews.
- **Smart Contracts**: Solidity contracts on Ethereum/Polygon store reviews and ensure immutability.
- **TLSNotary**: Verifies that users have a valid booking before allowing them to submit a review, without revealing personal information.
- **Backend**: Node.js and Express.js API to handle communication between the blockchain, TLSNotary, and the frontend.

## Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the App](#running-the-app)
- [Usage](#usage)
- [Smart Contract Deployment](#smart-contract-deployment)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

### Prerequisites

To run this project locally, ensure you have the following installed:

- **Node.js** (v16.x or higher)
- **npm** or **yarn**
- **MetaMask** or any Ethereum-compatible wallet
- **Hardhat** (for deploying smart contracts)
- **TLSNotary**: Set up the TLSNotary client for booking verification.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/mxber2022/truststay.git
   cd truststay
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up the environment variables:

   - Create a `.env` file in the root directory.
   - Add the following environment variables:

     ```bash
     REACT_APP_INFURA_API_KEY=your_infura_project_id
     REACT_APP_CONTRACT_ADDRESS=your_deployed_contract_address
     ```

4. Install and configure TLSNotary client:
   - Follow the instructions from [TLSNotary](https://github.com/tlsnotary/tlsnotary) to set up the client.

### Running the App

1. Start the local development server:

   ```bash
   npm start
   ```

2. To deploy the smart contracts, use Hardhat:

   ```bash
   npx hardhat run scripts/deploy.js --network <network_name>
   ```

   Replace `<network_name>` with the appropriate network (e.g., localhost, rinkeby).

3. After deployment, update the `REACT_APP_CONTRACT_ADDRESS` in the `.env` file with the deployed contract address.

## Usage

### Submit a Review

1. **Verify Your Booking**: Before submitting a review, TLSNotary will verify your booking by confirming the authenticity of the booking confirmation from the hotel or booking platform.
2. **Submit Your Review**: Once the booking is verified, you can submit a review anonymously. Your review will be stored immutably on the blockchain.

### View Reviews

- Browse reviews for different hotels, knowing that each review has been verified and comes from a legitimate guest who stayed at the hotel.

## Smart Contract Deployment

The platform uses smart contracts to store reviews on the blockchain. To deploy the contracts:

1. Compile the smart contracts:

   ```bash
   npx hardhat compile
   ```

2. Deploy the contracts:

   ```bash
   npx hardhat run scripts/deploy.js --network <network_name>
   ```

3. After deployment, copy the contract address and update your `.env` file with the address.

## Contributing

We welcome contributions to improve the project! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix:
   ```bash
   git checkout -b feature/new-feature
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "Add new feature"
   ```
4. Push your changes to your fork:
   ```bash
   git push origin feature/new-feature
   ```
5. Open a Pull Request with a description of your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

### Demo & Contact

- Live Demo: [Insert URL Here]
- For questions or suggestions, reach out to [contact@example.com](mailto:contact@example.com).

---

Let's build trust in the hotel review ecosystem with **TrustStay**, powered by **TLSNotary**!
