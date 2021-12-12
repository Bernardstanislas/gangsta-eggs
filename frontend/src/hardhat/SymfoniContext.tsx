/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { providers, Signer, ethers } from "ethers";
import React, { useEffect, useState } from "react";
import Web3Modal, { IProviderOptions } from "web3modal";
import { GangstaEggs } from "./typechain/GangstaEggs";
import { GangstaEggs__factory } from "./typechain/factories/GangstaEggs__factory";
import { BreedingTracker } from "./typechain/BreedingTracker";
import { BreedingTracker__factory } from "./typechain/factories/BreedingTracker__factory";
import { FeatureFlag } from "./typechain/FeatureFlag";
import { FeatureFlag__factory } from "./typechain/factories/FeatureFlag__factory";
import { GenerationTracker } from "./typechain/GenerationTracker";
import { GenerationTracker__factory } from "./typechain/factories/GenerationTracker__factory";
import { MintingQuota } from "./typechain/MintingQuota";
import { MintingQuota__factory } from "./typechain/factories/MintingQuota__factory";
import { Pricer } from "./typechain/Pricer";
import { Pricer__factory } from "./typechain/factories/Pricer__factory";
import { EggTokenTest } from "./typechain/EggTokenTest";
import { EggTokenTest__factory } from "./typechain/factories/EggTokenTest__factory";
import { ChickToken } from "./typechain/ChickToken";
import { ChickToken__factory } from "./typechain/factories/ChickToken__factory";
import { EggToken } from "./typechain/EggToken";
import { EggToken__factory } from "./typechain/factories/EggToken__factory";
import { ERC721Upgradeable } from "./typechain/ERC721Upgradeable";
import { ERC721Upgradeable__factory } from "./typechain/factories/ERC721Upgradeable__factory";
import { EscrowUpgradeable } from "./typechain/EscrowUpgradeable";
import { EscrowUpgradeable__factory } from "./typechain/factories/EscrowUpgradeable__factory";

const emptyContract = {
    instance: undefined,
    factory: undefined
};
const defaultProvider: providers.Provider | undefined = undefined;
export const ProviderContext = React.createContext<[providers.Provider | undefined, React.Dispatch<React.SetStateAction<providers.Provider | undefined>>]>([defaultProvider, () => { }]);
const defaultCurrentAddress: string = "";
export const CurrentAddressContext = React.createContext<[string, React.Dispatch<React.SetStateAction<string>>]>([defaultCurrentAddress, () => { }]);
const defaultSigner: Signer | undefined = undefined;
export const SignerContext = React.createContext<[Signer | undefined, React.Dispatch<React.SetStateAction<Signer | undefined>>]>([defaultSigner, () => { }]);
const defaultSymfoniContext: SymfoniContextInterface = {
    currentHardhatProvider: "",
    init: () => { throw Error("Symfoni context not initialized") },
    loading: false,
    messages: [],
    providers: []
};
export const SymfoniContext = React.createContext<SymfoniContextInterface>(defaultSymfoniContext);
export const GangstaEggsContext = React.createContext<SymfoniGangstaEggs>(emptyContract);
export const BreedingTrackerContext = React.createContext<SymfoniBreedingTracker>(emptyContract);
export const FeatureFlagContext = React.createContext<SymfoniFeatureFlag>(emptyContract);
export const GenerationTrackerContext = React.createContext<SymfoniGenerationTracker>(emptyContract);
export const MintingQuotaContext = React.createContext<SymfoniMintingQuota>(emptyContract);
export const PricerContext = React.createContext<SymfoniPricer>(emptyContract);
export const EggTokenTestContext = React.createContext<SymfoniEggTokenTest>(emptyContract);
export const ChickTokenContext = React.createContext<SymfoniChickToken>(emptyContract);
export const EggTokenContext = React.createContext<SymfoniEggToken>(emptyContract);
export const ERC721UpgradeableContext = React.createContext<SymfoniERC721Upgradeable>(emptyContract);
export const EscrowUpgradeableContext = React.createContext<SymfoniEscrowUpgradeable>(emptyContract);

export interface SymfoniContextInterface {
    init: (provider?: string) => void;
    loading: boolean;
    messages: string[];
    currentHardhatProvider: string;
    providers: string[];
}

export interface SymfoniProps {
    autoInit?: boolean;
    showLoading?: boolean;
    loadingComponent?: React.ReactNode;
}

export interface SymfoniGangstaEggs {
    instance?: GangstaEggs;
    factory?: GangstaEggs__factory;
}

export interface SymfoniBreedingTracker {
    instance?: BreedingTracker;
    factory?: BreedingTracker__factory;
}

export interface SymfoniFeatureFlag {
    instance?: FeatureFlag;
    factory?: FeatureFlag__factory;
}

export interface SymfoniGenerationTracker {
    instance?: GenerationTracker;
    factory?: GenerationTracker__factory;
}

export interface SymfoniMintingQuota {
    instance?: MintingQuota;
    factory?: MintingQuota__factory;
}

export interface SymfoniPricer {
    instance?: Pricer;
    factory?: Pricer__factory;
}

export interface SymfoniEggTokenTest {
    instance?: EggTokenTest;
    factory?: EggTokenTest__factory;
}

export interface SymfoniChickToken {
    instance?: ChickToken;
    factory?: ChickToken__factory;
}

export interface SymfoniEggToken {
    instance?: EggToken;
    factory?: EggToken__factory;
}

export interface SymfoniERC721Upgradeable {
    instance?: ERC721Upgradeable;
    factory?: ERC721Upgradeable__factory;
}

export interface SymfoniEscrowUpgradeable {
    instance?: EscrowUpgradeable;
    factory?: EscrowUpgradeable__factory;
}

export const Symfoni: React.FC<SymfoniProps> = ({
    showLoading = true,
    autoInit = true,
    ...props
}) => {
    const [initializeCounter, setInitializeCounter] = useState(0);
    const [currentHardhatProvider, setCurrentHardhatProvider] = useState("");
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState<string[]>([]);
    const [signer, setSigner] = useState<Signer | undefined>(defaultSigner);
    const [provider, setProvider] = useState<providers.Provider | undefined>(defaultProvider);
    const [currentAddress, setCurrentAddress] = useState<string>(defaultCurrentAddress);
    const [fallbackProvider] = useState<string | undefined>(undefined);
    const [providerPriority, setProviderPriority] = useState<string[]>(["web3modal", "hardhat"]);
    const [GangstaEggs, setGangstaEggs] = useState<SymfoniGangstaEggs>(emptyContract);
    const [BreedingTracker, setBreedingTracker] = useState<SymfoniBreedingTracker>(emptyContract);
    const [FeatureFlag, setFeatureFlag] = useState<SymfoniFeatureFlag>(emptyContract);
    const [GenerationTracker, setGenerationTracker] = useState<SymfoniGenerationTracker>(emptyContract);
    const [MintingQuota, setMintingQuota] = useState<SymfoniMintingQuota>(emptyContract);
    const [Pricer, setPricer] = useState<SymfoniPricer>(emptyContract);
    const [EggTokenTest, setEggTokenTest] = useState<SymfoniEggTokenTest>(emptyContract);
    const [ChickToken, setChickToken] = useState<SymfoniChickToken>(emptyContract);
    const [EggToken, setEggToken] = useState<SymfoniEggToken>(emptyContract);
    const [ERC721Upgradeable, setERC721Upgradeable] = useState<SymfoniERC721Upgradeable>(emptyContract);
    const [EscrowUpgradeable, setEscrowUpgradeable] = useState<SymfoniEscrowUpgradeable>(emptyContract);
    useEffect(() => {
        if (messages.length > 0)
            console.debug(messages.pop())
    }, [messages])

    const getProvider = async (): Promise<{ provider: providers.Provider, hardhatProviderName: string } | undefined> => {
        let hardhatProviderName = "Not set";
        let _providerPriority = [...providerPriority];
        // Fallback provider
        if (fallbackProvider && autoInit && initializeCounter === 0) {
            if (localStorage.getItem("WEB3_CONNECT_CACHED_PROVIDER") === null) {
                _providerPriority = _providerPriority.sort((a, b) => {
                    return a === fallbackProvider ? -1 : b === fallbackProvider ? 1 : 0;
                })
            }
        }
        const provider = await _providerPriority.reduce(async (maybeProvider: Promise<providers.Provider | undefined>, providerIdentification) => {
            let foundProvider = await maybeProvider
            if (foundProvider) {
                return Promise.resolve(foundProvider)
            }
            else {
                switch (providerIdentification.toLowerCase()) {
                    case "web3modal":
                        try {
                            const provider = await getWeb3ModalProvider()
                            const web3provider = new ethers.providers.Web3Provider(provider);
                            hardhatProviderName = "web3modal";
                            return Promise.resolve(web3provider)
                        } catch (error) {
                            return Promise.resolve(undefined)
                        }
                    case "hardhat":
                        try {
                            const provider = new ethers.providers.JsonRpcProvider({
                                url: "http://127.0.0.1:8545",
                            });
                            hardhatProviderName = "hardhat";
                            return Promise.resolve(provider)
                        } catch (error) {
                            return Promise.resolve(undefined)
                        } default:
                        return Promise.resolve(undefined)
                }
            }
        }, Promise.resolve(undefined)) // end reduce
        return provider ? { provider, hardhatProviderName } : undefined
    };
    const getSigner = async (_provider: providers.Provider, hardhatProviderName: string): Promise<Signer | undefined> => {
        switch (hardhatProviderName) {
            case "web3modal":
                const web3provider = _provider as ethers.providers.Web3Provider
                return await web3provider.getSigner()
            case "hardhat":
                return ethers.Wallet.fromMnemonic("test test test test test test test test test test test junk").connect(_provider)
            default:
                return undefined
        }
    };
    const getWeb3ModalProvider = async (): Promise<any> => {
        const providerOptions: IProviderOptions = {

        };
        const web3Modal = new Web3Modal({
            // network: "mainnet",
            cacheProvider: false,
            providerOptions, // required
        });
        return await web3Modal.connect();
    };

    useEffect(() => {
        let subscribed = true
        const doAsync = async () => {
            const finish = (text: string) => {
                setLoading(false)
                setMessages(old => [...old, text])
            }
            const finishWithContracts = (text: string) => {
                setGangstaEggs(getGangstaEggs(_provider, _signer))
                setBreedingTracker(getBreedingTracker(_provider, _signer))
                setFeatureFlag(getFeatureFlag(_provider, _signer))
                setGenerationTracker(getGenerationTracker(_provider, _signer))
                setMintingQuota(getMintingQuota(_provider, _signer))
                setPricer(getPricer(_provider, _signer))
                setEggTokenTest(getEggTokenTest(_provider, _signer))
                setChickToken(getChickToken(_provider, _signer))
                setEggToken(getEggToken(_provider, _signer))
                setERC721Upgradeable(getERC721Upgradeable(_provider, _signer))
                setEscrowUpgradeable(getEscrowUpgradeable(_provider, _signer))
                finish(text)
            }
            if (!autoInit && initializeCounter === 0) return finish("Auto init turned off.")
            setLoading(true)
            setMessages(old => [...old, "Initiating Symfoni React"])
            const providerObject = await getProvider() // getProvider can actually return undefined, see issue https://github.com/microsoft/TypeScript/issues/11094

            if (!subscribed || !providerObject) return finish("No provider or signer.")
            const _provider = providerObject.provider
            setProvider(_provider)
            setMessages(old => [...old, "Useing " + providerObject.hardhatProviderName])
            setCurrentHardhatProvider(providerObject.hardhatProviderName)
            const _signer = await getSigner(_provider, providerObject.hardhatProviderName);

            if (!subscribed || !_signer) return finishWithContracts("Provider, without signer.")
            setSigner(_signer)
            setMessages(old => [...old, "Useing signer"])
            const address = await _signer.getAddress()

            if (!subscribed || !address) return finishWithContracts("Provider and signer, without address.")
            setCurrentAddress(address)

            return finishWithContracts("Completed Symfoni context initialization.")
        };
        doAsync();
        return () => { subscribed = false }
    }, [initializeCounter])

    const getGangstaEggs = (_provider: providers.Provider, _signer?: Signer) => {
        let instance = _signer ? GangstaEggs__factory.connect(ethers.constants.AddressZero, _signer) : GangstaEggs__factory.connect(ethers.constants.AddressZero, _provider)
        const contract: SymfoniGangstaEggs = {
            instance: instance,
            factory: _signer ? new GangstaEggs__factory(_signer) : undefined,
        }
        return contract
    }
        ;
    const getBreedingTracker = (_provider: providers.Provider, _signer?: Signer) => {
        let instance = _signer ? BreedingTracker__factory.connect(ethers.constants.AddressZero, _signer) : BreedingTracker__factory.connect(ethers.constants.AddressZero, _provider)
        const contract: SymfoniBreedingTracker = {
            instance: instance,
            factory: _signer ? new BreedingTracker__factory(_signer) : undefined,
        }
        return contract
    }
        ;
    const getFeatureFlag = (_provider: providers.Provider, _signer?: Signer) => {
        let instance = _signer ? FeatureFlag__factory.connect(ethers.constants.AddressZero, _signer) : FeatureFlag__factory.connect(ethers.constants.AddressZero, _provider)
        const contract: SymfoniFeatureFlag = {
            instance: instance,
            factory: _signer ? new FeatureFlag__factory(_signer) : undefined,
        }
        return contract
    }
        ;
    const getGenerationTracker = (_provider: providers.Provider, _signer?: Signer) => {
        let instance = _signer ? GenerationTracker__factory.connect(ethers.constants.AddressZero, _signer) : GenerationTracker__factory.connect(ethers.constants.AddressZero, _provider)
        const contract: SymfoniGenerationTracker = {
            instance: instance,
            factory: _signer ? new GenerationTracker__factory(_signer) : undefined,
        }
        return contract
    }
        ;
    const getMintingQuota = (_provider: providers.Provider, _signer?: Signer) => {
        let instance = _signer ? MintingQuota__factory.connect(ethers.constants.AddressZero, _signer) : MintingQuota__factory.connect(ethers.constants.AddressZero, _provider)
        const contract: SymfoniMintingQuota = {
            instance: instance,
            factory: _signer ? new MintingQuota__factory(_signer) : undefined,
        }
        return contract
    }
        ;
    const getPricer = (_provider: providers.Provider, _signer?: Signer) => {
        let instance = _signer ? Pricer__factory.connect(ethers.constants.AddressZero, _signer) : Pricer__factory.connect(ethers.constants.AddressZero, _provider)
        const contract: SymfoniPricer = {
            instance: instance,
            factory: _signer ? new Pricer__factory(_signer) : undefined,
        }
        return contract
    }
        ;
    const getEggTokenTest = (_provider: providers.Provider, _signer?: Signer) => {
        let instance = _signer ? EggTokenTest__factory.connect(ethers.constants.AddressZero, _signer) : EggTokenTest__factory.connect(ethers.constants.AddressZero, _provider)
        const contract: SymfoniEggTokenTest = {
            instance: instance,
            factory: _signer ? new EggTokenTest__factory(_signer) : undefined,
        }
        return contract
    }
        ;
    const getChickToken = (_provider: providers.Provider, _signer?: Signer) => {
        let instance = _signer ? ChickToken__factory.connect(ethers.constants.AddressZero, _signer) : ChickToken__factory.connect(ethers.constants.AddressZero, _provider)
        const contract: SymfoniChickToken = {
            instance: instance,
            factory: _signer ? new ChickToken__factory(_signer) : undefined,
        }
        return contract
    }
        ;
    const getEggToken = (_provider: providers.Provider, _signer?: Signer) => {
        let instance = _signer ? EggToken__factory.connect(ethers.constants.AddressZero, _signer) : EggToken__factory.connect(ethers.constants.AddressZero, _provider)
        const contract: SymfoniEggToken = {
            instance: instance,
            factory: _signer ? new EggToken__factory(_signer) : undefined,
        }
        return contract
    }
        ;
    const getERC721Upgradeable = (_provider: providers.Provider, _signer?: Signer) => {
        let instance = _signer ? ERC721Upgradeable__factory.connect(ethers.constants.AddressZero, _signer) : ERC721Upgradeable__factory.connect(ethers.constants.AddressZero, _provider)
        const contract: SymfoniERC721Upgradeable = {
            instance: instance,
            factory: _signer ? new ERC721Upgradeable__factory(_signer) : undefined,
        }
        return contract
    }
        ;
    const getEscrowUpgradeable = (_provider: providers.Provider, _signer?: Signer) => {
        let instance = _signer ? EscrowUpgradeable__factory.connect(ethers.constants.AddressZero, _signer) : EscrowUpgradeable__factory.connect(ethers.constants.AddressZero, _provider)
        const contract: SymfoniEscrowUpgradeable = {
            instance: instance,
            factory: _signer ? new EscrowUpgradeable__factory(_signer) : undefined,
        }
        return contract
    }
        ;

    const handleInitProvider = (provider?: string) => {
        if (provider) {
            setProviderPriority(old => old.sort((a, b) => {
                return a === provider ? -1 : b === provider ? 1 : 0;
            }))
        }
        setInitializeCounter(initializeCounter + 1)
    }
    return (
        <SymfoniContext.Provider value={{ init: (provider) => handleInitProvider(provider), providers: providerPriority, currentHardhatProvider, loading, messages }}>
            <ProviderContext.Provider value={[provider, setProvider]}>
                <SignerContext.Provider value={[signer, setSigner]}>
                    <CurrentAddressContext.Provider value={[currentAddress, setCurrentAddress]}>
                        <GangstaEggsContext.Provider value={GangstaEggs}>
                            <BreedingTrackerContext.Provider value={BreedingTracker}>
                                <FeatureFlagContext.Provider value={FeatureFlag}>
                                    <GenerationTrackerContext.Provider value={GenerationTracker}>
                                        <MintingQuotaContext.Provider value={MintingQuota}>
                                            <PricerContext.Provider value={Pricer}>
                                                <EggTokenTestContext.Provider value={EggTokenTest}>
                                                    <ChickTokenContext.Provider value={ChickToken}>
                                                        <EggTokenContext.Provider value={EggToken}>
                                                            <ERC721UpgradeableContext.Provider value={ERC721Upgradeable}>
                                                                <EscrowUpgradeableContext.Provider value={EscrowUpgradeable}>
                                                                    {showLoading && loading ?
                                                                        props.loadingComponent
                                                                            ? props.loadingComponent
                                                                            : <div>
                                                                                {messages.map((msg, i) => (
                                                                                    <p key={i}>{msg}</p>
                                                                                ))}
                                                                            </div>
                                                                        : props.children
                                                                    }
                                                                </EscrowUpgradeableContext.Provider >
                                                            </ERC721UpgradeableContext.Provider >
                                                        </EggTokenContext.Provider >
                                                    </ChickTokenContext.Provider >
                                                </EggTokenTestContext.Provider >
                                            </PricerContext.Provider >
                                        </MintingQuotaContext.Provider >
                                    </GenerationTrackerContext.Provider >
                                </FeatureFlagContext.Provider >
                            </BreedingTrackerContext.Provider >
                        </GangstaEggsContext.Provider >
                    </CurrentAddressContext.Provider>
                </SignerContext.Provider>
            </ProviderContext.Provider>
        </SymfoniContext.Provider>
    )

};
