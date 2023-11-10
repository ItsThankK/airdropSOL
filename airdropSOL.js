// Import Solana web3 functionalities
const {
  Connection,
  PublicKey,
  clusterApiUrl,
  Keypair,
  LAMPORTS_PER_SOL
} = require("@solana/web3.js");

//import user input functionality
const prompt = require('prompt-sync')({sigint: true});

// Create a new keypair
const newPair = new Keypair();

// Extract the public key from the user.
const walletAddr = prompt("Supply your wallet address : ");
// Here's a test wallet address: mPkvNnDmNbFVi8cQhKAgXhyhXiMD25tvwsunRyRc7e9

// Connect to the Devnet
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

console.log("Users wallet address: ", walletAddr);

// Get the wallet balance from a given private key
const getWalletBalance = async (walletAddr) => {
  try {
      // Get balance of the user provided wallet address
      const walletBalance = await connection.getBalance(new PublicKey(walletAddr));
      console.log(`Wallet balance: ${parseInt(walletBalance) / LAMPORTS_PER_SOL} SOL`);
  } catch (err) {
      console.log(err);
  }
};

const airDropSol = async (walletAddr) => {
  try {
      // Request airdrop of 2 SOL to the wallet
      console.log("Airdropping some SOL to the wallet!");
      const fromAirDropSignature = await connection.requestAirdrop(new PublicKey(walletAddr),
          2 * LAMPORTS_PER_SOL
      );
      await connection.confirmTransaction(fromAirDropSignature);
  } catch (err) {
      console.log(err);
  }
};

// Show the wallet balance before and after airdropping SOL
const mainFunction = async () => {
  await getWalletBalance(walletAddr);
  await airDropSol(walletAddr);
  await getWalletBalance(walletAddr);
}

mainFunction();

