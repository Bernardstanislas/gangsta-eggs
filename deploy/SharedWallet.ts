// eslint-disable-next-line node/no-unpublished-import
import { DeployFunction } from "hardhat-deploy/dist/types";

const func: DeployFunction = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  // the following will only deploy "GenericMetaTxProcessor" if the contract was never deployed or if the code changed since last deployment
  await deploy("SharedWallet", {
    from: deployer,
    log: true,
    args: [[deployer], [10]],
    proxy: true,
  });
};

module.exports = func;
