import { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

import './App.css';
import FrontPage from './Components/FrontPage';
import getBlockNumber from './Helpers/getBlockNumber';
import getLatestBlocks from './Helpers/getLatestBlocks';
import getTransactionsFromBlock from './Helpers/getBlockWithTransactions';
import BlockDetails from './Components/BlockDetails';
import TransactionsDetails from './Components/TransactionDetails';
import AddressDetails from './Components/AddressDetails';
import alchemy from './utils/alchemy';
import BlockTransactions from './Components/BlockTransactions';
import NFTPage from './Components/NFTPage';

function App() {
  const [blockNumber, setBlockNumber] = useState();
  const [gasPrice, setGasPrice] = useState();
  const [latestBlocks, setLatestBlocks] = useState([]);
  const [transactions, setLatestTransactions] = useState([]);

  useEffect(() => {
    async function getInformation() {
        const blockNumber = await getBlockNumber();
        setBlockNumber(blockNumber);
        setLatestBlocks(await getLatestBlocks(blockNumber));
        setLatestTransactions(await getTransactionsFromBlock(blockNumber));
        setGasPrice(await alchemy.core.getGasPrice());
    }

    getInformation();
  }, []);

  return (
    <>
    <Router>
      <div className="App">
        <div>
          { gasPrice && 
            <p> Gas price: {gasPrice.toString() / 1000000000} Gwei</p>
          }
        </div>
        <Link to={``}>
          <button> Front page</button>
        </Link>
        <Link to={`/block/${blockNumber}`}>
          <button> Latest Block: {blockNumber}</button>
        </Link>
        <Link to={`/NFT`}>
          <button> NFT page</button>
        </Link>
      </div>
      <Route 
        exact path="/"           
        render={(props) => (
          <FrontPage {...props} blocks={latestBlocks} transactions={transactions} />
        )}>
      </Route>
      <Route path="/block/:id" component={BlockDetails} />
      <Route path="/tx/:id" component={TransactionsDetails} />
      <Route path="/address/:id" component={AddressDetails} />
      <Route path="/blocktxs/:id" component={BlockTransactions} />
      <Route path="/NFT/" component={NFTPage} />
    </Router>
    </>
  );
}

export default App;
