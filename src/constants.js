export const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export const ChainsConfig = {
	THETA_TESTNET: {
		chainId: 365,
		chainName: "Theta Testnet",
		nativeCurrency: { name: "TFUEL", symbol: "TFUEL", decimals: 18 },
		rpcUrls: [" https://eth-rpc-api-testnet.thetatoken.org/rpc"],
		blockExplorerUrls: [" https://testnet-explorer.thetatoken.org/"],
	},
	THETA_MAINNET: {
		chainId: 314,
		chainName: "Filecoin Mainnet",
		nativeCurrency: { name: "Filecoin", symbol: "FIL", decimals: 18 },
		rpcUrls: ["https://api.node.glif.io"],
		blockExplorerUrls: ["https://fvm.starboard.ventures/explorer/tx/"],
	},
	POLYGON_TESTNET: {
		chainId: 80001,
		rpcUrls: ["https://matic-mumbai.chainstacklabs.com"],
		chainName: "Polygon Testnet",
		nativeCurrency: {
			name: "tMATIC",
			symbol: "tMATIC",
			decimals: 18,
		},
		blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
	},
};

export const CONTRACT_ADDRESS = "0xb1Cf086A2A4061e5f448Ce84d726b68A391dB17a";
