import alchemy from "../utils/alchemy";

async function getBlockNumber() {
    return await alchemy.core.getBlockNumber();
} 

export default getBlockNumber;