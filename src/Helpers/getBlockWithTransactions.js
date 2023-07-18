import alchemy from "../utils/alchemy";

async function getTransactionsFromBlock(blockNumber) {
    return (await alchemy.core.getBlockWithTransactions(blockNumber)).transactions;
} 

export default getTransactionsFromBlock;