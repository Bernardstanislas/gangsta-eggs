/* eslint-disable node/no-unpublished-import */
import deployments from "../contracts.json";

type Deployments = {
  [networkName: string]: {
    [contractName: string]: string;
  };
};

export const getContract = async (contract: string, ethers: any) => {
  const network = await ethers.provider.getNetwork();

  const factory = await ethers.getContractFactory(contract);

  const address = (deployments as Deployments)[network.name][contract];

  return await factory.attach(address);
};
