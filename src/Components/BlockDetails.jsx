import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import alchemy from '../utils/alchemy';
import { Link } from 'react-router-dom';

const BlockDetails = () => {
    const [blockDetails, setBlockDetails] = useState();

    useEffect(() => {
        async function getBlockDetails() {
            setBlockDetails(await alchemy.core.getBlock(parseInt(id)));
        }

        getBlockDetails();
    }, []);

  const { id } = useParams();

  return (
    <ul>
      <li>Block number: {id}</li>
      <li>Block hash: {blockDetails?.hash}</li>
      <li>Gas used: {blockDetails?.gasUsed.toString()}</li>
      <li>Gas limit: {blockDetails?.gasLimit.toString()}</li>
      <div>
        <li>Miner: {blockDetails?.miner}
          <Link to={`/address/${blockDetails?.miner.toString()}`}>
            <button> View address details</button>
          </Link>
        </li>
      </div>
      <div>
        <li>Number of transactions: {blockDetails?.transactions.length}
          <Link to={`/blocktxs/${id}`}>
            <button> View transactions </button>
          </Link>
        </li>
      </div>
      <li>Parent block hash: {blockDetails?.parentHash}</li>
      <li>Timestamp: {blockDetails?.timestamp}</li>
    </ul>
  );
};

export default BlockDetails;