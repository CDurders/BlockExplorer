import React from 'react';
import { useEffect, useState } from 'react';
import alchemy from '../utils/alchemy';


const NFTPage = () => {
    const [collections, setCollections] = useState([]);

    useEffect(() => {
        async function getNFTDetails() {
            const collections = {};
            collections["Kanpai Pandas"] = await alchemy.nft.getFloorPrice("0xaCF63E56fd08970b43401492a02F6F38B6635C91");
            collections["Opepen"] = await alchemy.nft.getFloorPrice("0x6339e5E072086621540D0362C4e3Cea0d643E114");
            collections["Pudgy Penguins"] = await alchemy.nft.getFloorPrice("0xbd3531da5cf5857e7cfaa92426877b022e612cf8");
            setCollections(collections);
        }

        getNFTDetails();
    }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Collection</th>
          <th>OpenSea</th>
          <th>LooksRare</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(collections).map(([key, value]) => (
          <tr key={key}>
            <td>{key}</td>
            <td>
              <div>
                {value.openSea.floorPrice}
                <a href={value.openSea.collectionUrl} target="_blank">
                  <button>Go to collection</button>
                </a>
              </div>
            </td>
            <td>
              <div>
                {value.looksRare.floorPrice}
                <a href={value.looksRare.collectionUrl} target="_blank">
                  <button>Go to collection</button>
                </a>
              </div>
            </td>
          </tr>
          ))}
      </tbody>
    </table>
  );
};

export default NFTPage;