const { writeFileSync, copyFileSync } = require('fs');
const path = require('path');
const { transactions } = require('../../contracts/broadcast/deploy.s.sol/31337/run-latest.json');

function main() {
  const rpsTx = transactions.find((tx) => tx.contractName === 'RPS');
  const tokenTx = transactions.find((tx) => tx.contractName === null);

  const RPS_ADDRESS = rpsTx.contractAddress;
  const MOCK_ERC721_TOKEN = tokenTx.contractAddress;

  console.info(`RPS_ADDRESS: ${RPS_ADDRESS}`);
  console.info(`MOCK_ERC721_TOKEN: ${MOCK_ERC721_TOKEN}`);

  writeFileSync(
    path.join(__dirname, '../config.json'),
    JSON.stringify(
      {
        network: 'mainnet',
        RPS_ADDRESS,
        MOCK_ERC721_TOKEN,
      },
      null,
      2,
    ),
  );

  // copy over the ABIs
  copyFileSync(path.join(__dirname, '../../contracts/out/RPS.sol/RPS.json'), path.join(__dirname, '../abi/RPS.json'));

  copyFileSync(
    path.join(__dirname, '../../contracts/out/MockERC721.sol/MockERC721.json'),
    path.join(__dirname, '../abi/MockERC721.json'),
  );
}

main();
