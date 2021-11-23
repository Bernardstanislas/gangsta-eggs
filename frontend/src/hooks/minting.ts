import { Web3Provider } from "@ethersproject/providers";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { GangstaEggsContext, PricerContext, SymfoniContext } from "../hardhat/SymfoniContext";
import deployments from "../../../contracts.json";
import { Pricer } from "../hardhat/typechain/Pricer";
import { GangstaEggs } from "../hardhat/typechain/GangstaEggs";

export const useMinting = () => {
  const [provider, setProvider] = useState<Web3Provider>();
  const {init, currentHardhatProvider} = useContext(SymfoniContext);
  const {instance: gangstaEggsInstance} = useContext(GangstaEggsContext);
  const {instance: pricerInstance} = useContext(PricerContext);
  const [pricer, setPricer] = useState<Pricer>();
  const [gangstaEggs, setGangstaEggs] = useState<GangstaEggs>();

  const connected = currentHardhatProvider !== '';

  const connect = async () => {
    if (connected) {
      return;
    }
    if (!window.ethereum) {
      toast.error("No web3 provider found");
      return;
    }
    init();
  }

  const initialize = async () => {
    if (!window.ethereum) {
      return;
    }
    const provider = (new Web3Provider(window.ethereum));
    setProvider(provider);
  }

  const mintEgg = async () => {
    const price = await pricer!.mintingPrice();
    await gangstaEggs!.mintEgg("yolo", {value: price});
  }

  useEffect(() => {
    initialize();
  }, []);

  useEffect(() => {
    if (!connected || !gangstaEggsInstance || !pricerInstance) {
      return;
    }
    if (!provider) {
      return;
    }
    const networkName = provider?.network?.name;
    if(!networkName) {
      toast.error("No network found");
      return;
    }
    if (!(networkName in deployments)) {
      toast.error(`Contract not deployed on network ${networkName}`);
    }
    const deployment = (deployments as unknown as  Record<string, any>)[networkName];

    setGangstaEggs(gangstaEggsInstance.attach(deployment.GangstaEggs));
    setPricer(pricerInstance.attach(deployment.Pricer));
  }, [connected, gangstaEggsInstance, pricerInstance, provider]);

  return {
    connect,
    connected,
    mintEgg
  }
};
