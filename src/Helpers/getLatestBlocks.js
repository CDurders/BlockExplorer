import alchemy from "../utils/alchemy";
import getBlockNumber from "./getBlockNumber";

async function getLatestBlocks(blockNumberToStartFrom) {
    let blockDetails = []; 
    for (let i = 0; i < 20; i++) {
        blockDetails.push(await alchemy.core.getBlock( blockNumberToStartFrom - i));
    }

    return blockDetails;
}

export default getLatestBlocks