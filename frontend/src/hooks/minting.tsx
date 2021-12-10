import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
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
import React from "react";

export const MintingContext = React.createContext<any>({});

export const useMinting = () => {
  const [provider] = useContext(ProviderContext);
  const [currentAddress, setCurrentAddress] = useState<string>();
  const { init } = useContext(SymfoniContext);
  const [chainId, setChainId] = useState<number>();
  const { instance: gangstaEggsInstance } = useContext(GangstaEggsContext);
  const { instance: pricerInstance } = useContext(PricerContext);
  const { instance: eggTokenInstance } = useContext(EggTokenContext);
  const [pricer, setPricer] = useState<Pricer>();
  const [gangstaEggs, setGangstaEggs] = useState<GangstaEggs>();
  const [eggToken, setEggToken] = useState<EggToken>();
  const [network, setNetwork] = useState<Network>();

  const [connected, setConnected] = useState(false);
  const [balanceIsPositive, setBalanceIsPositive] = useState(false);
  const networkIsGood = chainId === 0x13881;
  const contractAttached = !!gangstaEggs;
  const readyToMint =
    connected && balanceIsPositive && networkIsGood && contractAttached;

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
    const checkBalance = async () => {
      const balance = await provider.getBalance(currentAddress);
      const isPositive = balance.gt(0);
      setBalanceIsPositive(isPositive);
    };
    if (provider && currentAddress) {
      checkBalance();
    }
  }, [provider, currentAddress]);

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
                  rpcUrls: ["https://rpc-endpoints.superfluid.dev/mumbai"],
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
      toast.error("Please install MetaMask browser extension");
      return;
    }
    init("any");
  };

  const mintEgg = async () => {
    try {
      const price = await pricer!.mintingPrice();
      await gangstaEggs!.mintEgg({ value: price });
    } catch (error) {
      toast.error(error.data.message);
      console.log(error);
    }
  };

  return {
    connect,
    connected,
    balanceIsPositive,
    networkIsGood,
    contractAttached,
    switchChain,
    readyToMint,
    mintEgg,
    network,
    eggToken,
    gangstaEggs,
    currentAddress,
  };
};
