import React from 'react';
import './FrontPage.css';
import ButtonColumn from './ButtonColumn';

const FrontPage = ( {blocks, transactions} ) => {
  const blockNumbers = blocks.map(x => x.number);
  const transactionHashes = transactions.map(x => x.hash);
  return (
    <div className="front-page">
      <div className="block">
        <h2>Latest Blocks</h2>
        <ButtonColumn items={blockNumbers} buttonText={"Block number: "} linkPrefix={"block"} />
      </div>
      <div className="block">
        <h2>Latest transactions</h2>
        <ButtonColumn items={transactionHashes} buttonText="Transaction: " linkPrefix={"tx"}/>
      </div>
    </div>
  );
};

export default FrontPage;