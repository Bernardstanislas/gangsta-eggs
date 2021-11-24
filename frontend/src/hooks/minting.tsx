import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  CurrentAddressContext,
  EggTokenContext,
  GangstaEggsContext,
  PricerContext,
  ProviderContext,
  SymfoniContext,
} from "../hardhat/SymfoniContext";
import deployments from "../../../contracts.json";
import { Pricer } from "../hardhat/typechain/Pricer";
import { GangstaEggs } from "../hardhat/typechain/GangstaEggs";
import { Network } from "@ethersproject/networks";
import { EggToken } from "../hardhat/typechain/EggToken";

export const useMinting = () => {
  const [provider] = useContext(ProviderContext);
  const [currentAddress] = useContext(CurrentAddressContext);
  const { init } = useContext(SymfoniContext);
  const [connected, setConnected] = useState(false);
  const [readyToMint, setReadyToMint] = useState(false);
  const [chainId, setChainId] = useState<number>();
  const { instance: gangstaEggsInstance } = useContext(GangstaEggsContext);
  const { instance: pricerInstance } = useContext(PricerContext);
  const { instance: eggTokenInstance } = useContext(EggTokenContext);
  const [pricer, setPricer] = useState<Pricer>();
  const [gangstaEggs, setGangstaEggs] = useState<GangstaEggs>();
  const [eggToken, setEggToken] = useState<EggToken>();
  const [network, setNetwork] = useState<Network>();

  useEffect(() => {
    if (!window.ethereum) {
      return;
    }
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
    initChainId();
  }, [provider]);

  useEffect(() => {
    const switchChain = async () => {
      if (connected && chainId !== 0x13881) {
        try {
          // check if the chain to connect to is installed
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x13881" }], // chainId must be in hexadecimal numbers
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
                    chainId: "0x13881",
                    rpcUrls: ["https://matic-mumbai.chainstacklabs.com"],
                    chainName: "Polygon Testnet Mumbai",
                    nativeCurrency: {
                      name: "MATIC",
                      symbol: "MATIC",
                      decimals: 18,
                    },
                    blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
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
    switchChain();
  }, [connected, chainId]);

  useEffect(() => {
    const contractsConnector = async () => {
      if (
        !connected ||
        chainId !== 0x13881 ||
        !provider ||
        !pricerInstance ||
        !gangstaEggsInstance ||
        !eggTokenInstance
      ) {
        return;
      }
      setPricer(await pricerInstance.attach(deployments.maticmum.Pricer));
      setGangstaEggs(
        await gangstaEggsInstance.attach(deployments.maticmum.GangstaEggs)
      );
      setEggToken(await eggTokenInstance.attach(deployments.maticmum.EggToken));
    };
    contractsConnector();
  }, [
    connected,
    chainId,
    gangstaEggsInstance,
    pricerInstance,
    eggTokenInstance,
    provider,
  ]);

  useEffect(() => {
    setReadyToMint(!!pricer && !!gangstaEggs && chainId === 0x13881);
  }, [pricer, gangstaEggs, chainId]);

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

  const connect = async () => {
    if (!window.ethereum) {
      toast.error("No web3 provider found");
      return;
    }
    init("web3modal");
  };

  const mintEgg = async () => {
    const price = await pricer!.mintingPrice();
    await gangstaEggs!.mintEgg("yolo", { value: price });
  };

  return {
    connect,
    readyToMint,
    mintEgg,
    network,
    eggToken,
    gangstaEggs,
  };
};
