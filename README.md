

# Theta+📺

Theta+ (Thetaplus) is a decentralized version of [Lick](https://kick.com/)/[YouTube](https://youtube.com/), powered by [Theta Network](https://www.thetatoken.org/), allowing users to upload and stream entertaining content and make a living out of it.

![Home Page](https://9d7487a2-be2a-42e2-a2ec-5e5b6d457821-c6413e.spheron.app/Screenshot_122.png)
[](https://kissingface.xyz)<center>https://thetaplus.xyz</center>

# Get Started

The codebase of GUI for the platform is built using React.js. Smart contracts written in Solidity. Contract's are deployed in Theta Network and Client in Vercel. 

Find all the respective codebase below. 

1. [Client](https://github.com/leostelon/thetatube-client)
2. [Contracts](https://github.com/leostelon/thetatube-client/tree/main/src/contracts)
3. [Polybase](https://github.com/leostelon/thetatube-client/tree/main/src/database)

**Website**

[thetaplus.xyz](https://thetaplus.xyz/)

# Accomplishments/Milestones

 - Support for any user to create and publish NFT's as premium passes🎟️.
 - Added DRM support. Token gated content🚪.
 - Upload upto 1080px videos.
 - Premium purchase using TFUEL.

# Technology
- **Theta Video API** a decentralized video delivery network, we were able to distribute content at scale and also lower our cost to encode, store and deliver video.  [[know more]](https://www.thetavideoapi.com/)
 - **Theta DRM** to token gate content. 
 - **Theta EVM** to store and retrieve subscription based NFT's. 
 - Database,  is handled by **Polybase**, the database for web3. [[know more]](https://polybase.xyz/)
	- Find schemas and logic [here](https://github.com/leostelon/thetatube-client/tree/main/src/database).
- Host and maintained in **Vercel**. [[know more]](https://vercel.com/)
- Thumbnails, profile pictures and media are stored in IPFS using [nft.storage](https://nft.storage/). Visit the docs to get the key if your running it locally.

Follow the below steps to run it locally.

## Client💻

1. Clone Repo.
> $ git clone https://github.com/leostelon/thetatube-client kissingface-client
>  $ cd kissingface-client
2. Add the .env file in the root directory. Replace the value accordingly.

REACT_APP_THETA_API_KEY=<< theta-api-key >>
REACT_APP_THETA_SECRET=<< theta-secret >>
REACT_APP_POLYBASE_NAMESPACE=<< visit polybase docs to get the key>>
REACT_APP_JWT_SECRET=somesecret
REACT_APP_NFTSTORAGE_KEY=<<nft.storage.key>>
REACT_APP_IPFS_BASE_URL=https://ipfs.io/ipfs
	  
4. Run the client!
> $ npm run start

## What next?👨‍💻
 - [x] MVP
 - [x] Polybase models
 - [ ] Live Stream Support