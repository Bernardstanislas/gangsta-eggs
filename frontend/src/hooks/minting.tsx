import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  EggTokenContext,
  GangstaEggsContext,
  GenerationTrackerContext,
  MinimalForwarderContext,
  MintingQuotaContext,
  PricerContext,
  ProviderContext,
  SymfoniContext,
} from "../hardhat/SymfoniContext";
import deployments from "../../../contracts.json";
import { Pricer } from "../hardhat/typechain/Pricer";
import { GangstaEggs } from "../hardhat/typechain/GangstaEggs";
import { Network } from "@ethersproject/networks";
import { EggToken } from "../hardhat/typechain/EggToken";
import React from "react";
import { signMetaTxRequest } from "../../../utils/signer";
import { MinimalForwarder } from "../hardhat/typechain/MinimalForwarder";
import axios from "axios";
import { MintingQuota } from "../hardhat/typechain/MintingQuota";
import { GenerationTracker } from "../hardhat/typechain/GenerationTracker";
import { ethers } from "ethers";

// @ts-ignore
const CHAIN_ID = import.meta.env.VITE_CHAIN_ID;
// @ts-ignore
const CHAIN_NAME = import.meta.env.VITE_CHAIN_NAME;
// @ts-ignore
const NETWORK_SLUG = import.meta.env.VITE_NETWORK_SLUG;
// @ts-ignore
const RPC_URL = import.meta.env.VITE_RPC_URL;
// @ts-ignore
const EXPLORER_URL = import.meta.env.VITE_EXPLORER_URL;
// @ts-ignore
const WEBHOOK_URL = import.meta.env.VITE_WEBHOOK_URL;

export const MintingContext = React.createContext<any>({});

export const useMinting = () => {
  const [provider] = useContext(ProviderContext);
  const [currentAddress, setCurrentAddress] = useState<string>();
  const { init } = useContext(SymfoniContext);
  const [chainId, setChainId] = useState<number>();
  const { instance: gangstaEggsInstance } = useContext(GangstaEggsContext);
  const { instance: pricerInstance } = useContext(PricerContext);
  const { instance: eggTokenInstance } = useContext(EggTokenContext);
  const { instance: forwarderInstance } = useContext(MinimalForwarderContext);
  const { instance: mintingQuotaInstance } = useContext(MintingQuotaContext);
  const { instance: generationTrackerInstance } = useContext(
    GenerationTrackerContext
  );
  const [pricer, setPricer] = useState<Pricer>();
  const [gangstaEggs, setGangstaEggs] = useState<GangstaEggs>();
  const [eggToken, setEggToken] = useState<EggToken>();
  const [forwarder, setForwarder] = useState<MinimalForwarder>();
  const [mintingQuota, setMintingQuota] = useState<MintingQuota>();
  const [generationTracker, setGenerationTracker] =
    useState<GenerationTracker>();
  const [network, setNetwork] = useState<Network>();

  const [connected, setConnected] = useState(false);
  const [minting, setMinting] = useState(false);
  const [remainingMinting, setRemainingMinting] = useState<number>();
  const [firstGenerationCount, setFirstGenerationCount] = useState<number>();
  const networkIsGood = chainId === parseInt(CHAIN_ID);
  const contractAttached = !!gangstaEggs && !!mintingQuota;
  const readyToMint = connected && networkIsGood && contractAttached;
  const [currentPrice, setCurrentPrice] = useState<string>();

  useEffect(() => {
    const networkSwitcher = async () => {
      if (network) {
        if (chainId && chainId !== network.chainId) {
          window.location.reload();
        }
      }
    };
    networkSwitcher();
  }, [network, chainId]);

  useEffect(() => {
    if (!window.ethereum) {
      return;
    }
    window.ethereum.on("accountsChanged", (accounts: string[]) => {
      if (accounts.length === 0) {
        toast.error("Please connect to MetaMask");
      }
      setCurrentAddress(accounts[0]);
    });
    window.ethereum.on("chainChanged", setChainId);
    return () => window.ethereum.removeListener("chainChanged", setChainId);
  }, []);

  useEffect(() => {
    if (!provider) {
      return;
    }
    const initChainId = async () => {
      const network = await provider.getNetwork();
      setChainId(network.chainId);
    };
    const initCurrentAddress = async () => {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (accounts.length === 0) {
        toast.error("Please connect to MetaMask");
      }
      setCurrentAddress(accounts[0]);
    };
    initChainId();
    initCurrentAddress();
  }, [provider]);

  const switchChain = async () => {
    if (connected && chainId !== parseInt(CHAIN_ID)) {
      try {
        // check if the chain to connect to is installed
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: CHAIN_ID }], // chainId must be in hexadecimal numbers
        });
      } catch (error: any) {
        // This error code indicates that the chain has not been added to MetaMask
        // if it is not, then install it into the user MetaMask
        if (error.code === 4902) {
          try {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: CHAIN_ID,
                  rpcUrls: [RPC_URL],
                  chainName: CHAIN_NAME,
                  nativeCurrency: {
                    name: "MATIC",
                    symbol: "MATIC",
                    decimals: 18,
                  },
                  blockExplorerUrls: [EXPLORER_URL],
                },
              ],
            });
          } catch (addError) {
            console.error(addError);
          }
        }
        console.error(error);
      }
      return;
    }
  };

  useEffect(() => {
    const contractsConnector = async () => {
      if (
        !connected ||
        chainId !== parseInt(CHAIN_ID) ||
        !provider ||
        !pricerInstance ||
        !gangstaEggsInstance ||
        !eggTokenInstance ||
        !forwarderInstance ||
        !mintingQuotaInstance ||
        !generationTrackerInstance
      ) {
        return;
      }
      setPricer(await pricerInstance.attach(deployments[NETWORK_SLUG].Pricer));
      setGangstaEggs(
        await gangstaEggsInstance.attach(deployments[NETWORK_SLUG].GangstaEggs)
      );
      setEggToken(
        await eggTokenInstance.attach(deployments[NETWORK_SLUG].EggToken)
      );
      setForwarder(
        await forwarderInstance.attach(
          deployments[NETWORK_SLUG].MinimalForwarder
        )
      );
      setMintingQuota(
        await mintingQuotaInstance.attach(
          deployments[NETWORK_SLUG].MintingQuota
        )
      );
      setGenerationTracker(
        await generationTrackerInstance.attach(
          deployments[NETWORK_SLUG].GenerationTracker
        )
      );
    };
    contractsConnector();
  }, [
    connected,
    chainId,
    gangstaEggsInstance,
    pricerInstance,
    eggTokenInstance,
    forwarderInstance,
    mintingQuotaInstance,
    generationTrackerInstance,
    provider,
  ]);

  useEffect(() => {
    if (provider && currentAddress !== "") {
      setConnected(true);
    }
  }, [provider, currentAddress]);

  useEffect(() => {
    const networkFinder = async () => {
      if (!provider) {
        return;
      }
      setNetwork(await provider.getNetwork());
    };
    networkFinder();
  }, [chainId, provider]);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (readyToMint) {
        const remainingMinting = await mintingQuota.remainingMinting(
          currentAddress
        );
        const price = await pricer.mintingPrice();
        setCurrentPrice(ethers.utils.formatEther(price).substring(0, 5));
        setRemainingMinting(remainingMinting.toNumber());
        const firstGenerationCount =
          await generationTracker.firstGenerationEggsCount();
        setFirstGenerationCount(firstGenerationCount.toNumber());
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [readyToMint, currentAddress, mintingQuota, generationTracker, pricer]);

  const connect = async () => {
    if (!window.ethereum) {
      toast.error("Please install MetaMask browser extension");
      return;
    }
    init("web3modal");
  };

  const metaMintEgg = async () => {
    const from = currentAddress;
    const data = gangstaEggs.interface.encodeFunctionData("mintEgg");
    const to = gangstaEggs.address;
    const request = await signMetaTxRequest(provider, forwarder, {
      from,
      data,
      to,
    });
    const response = await axios.post(WEBHOOK_URL, request);
    const result = JSON.parse(response.data.result);
    toast.success(
      <div>
        <p>
          Egg minting started,{" "}
          <a
            className="underline"
            target="_blank"
            href={`${EXPLORER_URL}tx/${result.txHash}`}
            rel="noreferrer"
          >
            follow the transaction
          </a>
        </p>
        <p>Refresh this page once the transaction is confirmed</p>
      </div>
    );
  };

  const mintEgg = async () => {
    try {
      setMinting(true);
      const remainingMinting = await mintingQuota.remainingMinting(
        currentAddress
      );
      if (remainingMinting.lt(1)) {
        toast.error("You have reached your egg minting quota");
        setMinting(false);
        return;
      }
      const balance = await provider.getBalance(currentAddress);
      const airdropFinished = await pricer.airdropFinished();
      const canSendTx = airdropFinished;
      const needsFunds = balance.isZero() && airdropFinished;
      if (needsFunds) {
        toast.info(
          <span>
            You need some MATIC to mint an egg, please refer to{" "}
            <a
              className="underline"
              href="https://bustling-vicuna-1dd.notion.site/Tutorial-how-to-buy-Gangsta-eggs-light-version-4b593fdbb12748549344f08d2d2f23f6"
            >
              our guide
            </a>{" "}
            to learn how to buy some
          </span>
        );
      } else {
        // if (canSendTx) {
        const price = await pricer.mintingPrice();
        await gangstaEggs.mintEgg({ value: price });
        toast.success(
          "Transaction sent, wait a moment until your newly minted egg appears below!"
        );
        // } else {
        //   await metaMintEgg();
        // }
      }
    } catch (error) {
      toast.error(
        "Free minting limit reached, either buy some MATIC or come back in an hour"
      );
      // if (error.data?.message) {
      //   toast.error(error.data.message);
      // } else {
      //   toast.error(error.message);
      // }
      console.log(error);
    } finally {
      setMinting(false);
    }
  };

  return {
    connect,
    connected,
    minting,
    networkIsGood,
    remainingMinting,
    firstGenerationCount,
    contractAttached,
    switchChain,
    readyToMint,
    mintEgg,
    network,
    eggToken,
    gangstaEggs,
    currentAddress,
    currentPrice,
  };
};
