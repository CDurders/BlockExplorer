import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import alchemy from '../utils/alchemy';
import { Utils } from 'alchemy-sdk';
import { Link } from 'react-router-dom';

const AddressDetails = () => {
    const [balance, setBalance] = useState();
    const [assetTransfers, setAssetTransfers] = useState([]);

    useEffect(() => {
        async function getAddressDetails() {
            setBalance(await alchemy.core.getBalance(id));
            setAssetTransfers(await alchemy.core.getAssetTransfers({
                fromAddress: id,
                category: ['external', 'erc20', 'erc721']
            }));
        }

        getAddressDetails();
    }, []);

  const { id } = useParams();

  return (
    <ul>
      <li>Address: {id}</li>
      <div>
        { 
          balance &&
          <li> Address balance: {Utils.formatEther(balance)} ETH</li>
        }
      </div>
      <div>
        {
          assetTransfers?.transfers && 
          <li>{assetTransfers.transfers.length} Transactions from this address: </li>
        }
      </div>
      <div>
        { 
          assetTransfers?.transfers &&
          assetTransfers?.transfers.map((tx, index) => (
            <div key={index}>
              <Link to={`/tx/${tx.hash}`}>
                <button> Transaction: {tx.hash}</button>
              </Link>
            </div>
          ))}
      </div>
    </ul>
  );
};

export default AddressDetails;