import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Utils } from 'alchemy-sdk';
import { Link } from 'react-router-dom';
import getTransactionsFromBlock from '../Helpers/getBlockWithTransactions';

const BlockTransactions = () => {
  const [blockTransactions, setBlockTransactions] = useState();

  useEffect(() => {
      async function getBlockTransactions() {
        setBlockTransactions(await getTransactionsFromBlock(parseInt(id)));
      }

      getBlockTransactions();
  }, []);

const { id } = useParams();

  return (
    <table>
      <thead>
        <tr>
          <th>Transaction hash</th>
          <th>From</th>
          <th>To</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        {blockTransactions?.map((row) => (
          <tr key={row.hash}>
            <td>
              <div>
                <Link to={`/tx/${row.hash}`}>
                  <button> Transaction: {row.hash}</button>
                </Link>
              </div>
            </td>
            <td>
              <div>
                <Link to={`/address/${row.from}`}>
                  <button> From: {row.from}</button>
                </Link>
              </div>
            </td>
            <td>
              <div>
                <Link to={`/address/${row.to}`}>
                  <button> To: {row.to}</button>
                </Link>
              </div>
            </td>
            <td>{Utils.formatEther(row.value)} ETH</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BlockTransactions;