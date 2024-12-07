import { ethers } from 'ethers';

const REVIEW_CONTRACT_ADDRESS = '0xC2987cAEe9d4069a1965B667A0edb6143f891CB2';
const REVIEW_CONTRACT_ABI = [
  'function mintReview(string memory hotelId, uint8 rating, string memory reviewText, string memory bookingProof) external returns (uint256)',
  'function getHotelReviews(string memory hotelId) external view returns (uint256[] memory)',
  'function getUserReviews(address user) external view returns (uint256[] memory)',
  'function getReview(uint256 reviewId) external view returns (address reviewer, string memory hotelId, uint8 rating, string memory reviewText, string memory bookingProof, uint256 timestamp)',
  'event ReviewMinted(uint256 indexed reviewId, address indexed reviewer, string indexed hotelId, uint8 rating, uint256 timestamp)'
];

export class ReviewContract {
  private contract: ethers.Contract;
  private signer: ethers.Signer | null = null;

  constructor(provider: ethers.BrowserProvider) {
    this.contract = new ethers.Contract(REVIEW_CONTRACT_ADDRESS, REVIEW_CONTRACT_ABI, provider);
  }

  async connect(signer: ethers.Signer) {
    this.signer = signer;
    this.contract = this.contract.connect(signer);
  }

  async mintReview(
    hotelId: string,
    rating: number,
    reviewText: string,
    bookingProof: string
  ): Promise<ethers.TransactionResponse> {
    if (!this.signer) throw new Error('Wallet not connected');

    try {
      // Convert rating to uint8
      const ratingBN = ethers.toBigInt(rating);
      
      const tx = await this.contract.mintReview(
        hotelId,
        ratingBN,
        reviewText,
        bookingProof,
        {
          gasLimit: ethers.toBigInt(500000)
        }
      );
      return tx;
    } catch (error) {
      console.error('Error minting review:', error);
      throw error;
    }
  }

  async getHotelReviews(hotelId: string) {
    try {
      const reviews = await this.contract.getHotelReviews(hotelId);
      return reviews.map((id: bigint) => id);
    } catch (error) {
      console.error('Error getting hotel reviews:', error);
      throw error;
    }
  }

  async getReview(reviewId: bigint) {
    try {
      const review = await this.contract.getReview(reviewId);
      return {
        reviewer: review[0],
        hotelId: review[1],
        rating: Number(review[2]),
        reviewText: review[3],
        bookingProof: review[4],
        timestamp: Number(review[5])
      };
    } catch (error) {
      console.error('Error getting review:', error);
      throw error;
    }
  }
}