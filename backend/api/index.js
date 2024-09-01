require('dotenv').config()

const express = require("express");

const PORT = process.env.PORT || 3001;

// ERC721 - ABI
// const TSHIRT_ABI = require("../../contract/artifacts/contracts/TShirtNFT.sol/TShirtNFT.json");
const TSHIRT_ABI = require("./TShirtNFT.json");

// Server Key - T-Shirt company
const SERVER_KEY = process.env.SERVER_KEY;

// NFT Contract Address
const NFT_CONTRACT_ADDRESS = process.env.TSHIRT_NFT_CONTRACT_ADDRESS;

const app = express();
app.use(express.json());

app.get("/", (request, response) => {
    response.send({"Hello": "world"});
 });


app.get("/status", (request, response) => {
    const status = {
        "Status": "Running"
    };
    
    response.send(status);
 });



app.get("/create/:user_address", async (request, response) => {

    try {
        let user_address = req.params['user_address'];

        let provider = new ethers.JsonRpcProvider("https://spicy-rpc.chiliz.com/");

        let signer = new ethers.Wallet(SERVER_KEY, provider);

        let contract = new ethers.Contract(
            NFT_CONTRACT_ADDRESS,
            TSHIRT_ABI.abi,
            signer
        );

        let response = await contract.buyTShirt(user_address);

        console.log(response);
    
    } catch (error) {
        console.log(error);
        res.status(500).send('Error when minting a new NFT.');
    }
});



app.listen(PORT, () => console.log("Server Listening on PORT:", PORT));


module.exports = app;