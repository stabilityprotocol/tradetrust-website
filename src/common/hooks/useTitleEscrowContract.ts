import { useState, useEffect } from "react";
import { useTokenRegistryContract } from "./useTokenRegistryContract";
import { providers, Signer } from "ethers";
import { TitleEscrowFactory } from "@govtechsg/token-registry";
import { TitleEscrow } from "@govtechsg/token-registry/types/TitleEscrow";

export const useTitleEscrowContract = (
  tokenRegistryAddress: string,
  tokenId: string,
  provider: providers.Provider | Signer
) => {
  const [titleEscrow, setTitleEscrow] = useState<TitleEscrow>();
  const { tokenRegistry } = useTokenRegistryContract(tokenRegistryAddress, provider);

  useEffect(() => {
    if (!tokenRegistry) return;
    const updateTitleEscrow = async () => {
      const titleEscrowAddress = await tokenRegistry.ownerOf(tokenId);
      const instance = TitleEscrowFactory.connect(titleEscrowAddress, provider);
      setTitleEscrow(instance);
    };
    updateTitleEscrow();
  }, [tokenRegistry, tokenId, provider]);

  return { titleEscrow };
};