import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import NFT from "../artifacts/contracts/SleepyKoala.sol/ISleepyKoala.json";

interface Props {
  wallet: string;
  hasNft: boolean;
  setHasNft: React.Dispatch<React.SetStateAction<any>>;
}

interface IContract {
  hasNFT(): Promise<boolean>;
  mintNFT(): Promise<void>;
}

class MockContract implements IContract {
  async hasNFT(): Promise<boolean> {
    return true;
  }
  async mintNFT(): Promise<void> {}
}

const Minter: React.FC<Props> = ({ wallet }) => {
  const [injectContract, setInjectContract] = useState<
    IContract | MockContract
  >();
  const [loading, setLoading] = useState(false);
  const [hasNft, setHasNft] = useState(false);
  const [hasTrueNft, setHasTrueNft] = useState(false);
  const [tokenId, setTokenId] = useState(0);

  const mintNFT = async () => {
    try {
      const { ethereum } = window;
      const provider = new ethers.providers.Web3Provider(
        ethereum,
        window.ethereum.givenProvider
      );
      const signer = provider.getSigner();
      const nftContract = new ethers.Contract(
        "0x90dE6E6bBb75554F4FB9F6C449A9aAdd6bBB1FA9",
        NFT.abi,
        signer
      );

      setLoading(true);

      console.log("loading", loading);

      let nftTx = await nftContract.functions.mint(wallet, false);
      console.log("Mining....", nftTx.hash);

      let tx = await nftTx.wait();

      console.log("Mined!", tx);

      setHasNft(true);

      setLoading(false);
      console.log(
        `Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTx.hash}`
      );

      getNFTdata(tx);
    } catch (error) {
      console.log("Error minting character", error);
    }
  };

  function getNFTdata(contractTX) {
    const { ethereum } = window;

    const provider = new ethers.providers.Web3Provider(
      ethereum,
      window.ethereum.givenProvider
    );
    const signer = provider.getSigner();

    const nftContract = new ethers.Contract(
      "0x90dE6E6bBb75554F4FB9F6C449A9aAdd6bBB1FA9",
      NFT.abi,
      signer
    );

    console.log("contractTX", contractTX);
    const tokenId = contractTX.logs[0].topics[3];
    const tokenInt = ethers.BigNumber.from(tokenId);
    // const address = ethers.utils.getAddress(contractTX);

    console.log("tokenId", tokenId);
    console.log("tokenInt", tokenInt);

    nftContract.getTokenData(tokenInt).then((data: any) => {
      setHasTrueNft(data);
    });
  }

  function handleClickInvert(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    setLoading(true);
    // interact with contract
    setLoading(false);
  }

  // useEffect(() => {
  //   getNFTdata(1);
  // }, []);

  return (
    <>
      <div className="relative p-5 bg-white rounded-lg shadow mt-4">
        <div className="relative">
          <div className="text-center">
            <div className="mt-8 text-center">
              <h2 className="text-l">Welcome {wallet}</h2>
            </div>
            {!hasNft ? (
              <div>
                <div className="mt-6">
                  <h2 className="text-l text-gray-600">
                    You need to mint NFTX
                  </h2>
                </div>

                <div className="mt-6 md:mt-8">
                  <button
                    className="w-full md:w-auto text-sm bg-gray-500 px-4 py-2 text-white rounded-3xl font-medium hover:bg-blue-600"
                    onClick={() => mintNFT()}
                  >
                    {loading ? "Minting..." : "Mint NFTX"}
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div>
                  <div className="mt-6">
                    <h2 className="text-l text-gray-600">
                      {`You have minted NFTX`}
                    </h2>
                  </div>

                  <div className="mt-6 md:mt-8">
                    <button
                      className="w-full md:w-auto text-sm bg-gray-500 px-4 py-2 text-white rounded-3xl font-medium hover:bg-blue-600"
                      onClick={handleClickInvert}
                    >
                      Invert NFTX
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Minter;