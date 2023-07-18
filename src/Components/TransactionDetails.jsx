import React from 'react';
import alchemy from '../utils/alchemy';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const TransactionsDetails = () => {
    const [txDetails, setTxDetails] = useState();

    useEffect(() => {
        async function getTxDetails() {
            setTxDetails(await alchemy.core.getTransactionReceipt(id));
        }

        getTxDetails();
    }, []);

  const { id } = useParams();

  return (
    <ul>
      <li>Transaction hash: {id}</li>
      <div>
        <li>To: {txDetails?.to}
          <Link to={`/address/${txDetails?.to.toString()}`}>
            <button> View address details</button>
          </Link>
        </li>
      </div>
      <div>
        <li>From: {txDetails?.from}
          <Link to={`/address/${txDetails?.from.toString()}`}>
            <button> View address details</button>
          </Link>
        </li>
      </div>
      <div>
        <li>Included in block: {txDetails?.blockNumber}
          <Link to={`/block/${txDetails?.blockNumber.toString()}`}>
            <button> View block</button>
          </Link>
        </li>
      </div>
      <li>Gas price: {txDetails?.effectiveGasPrice.toString() / 1000000000} Gwei</li>
      <li>Gas used: {txDetails?.gasUsed.toString()}</li>
    </ul>
  );
};

export default TransactionsDetails;