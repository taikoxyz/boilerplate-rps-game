# RPS

## Disclaimer
This code is intended for educational purposes only. It is not production-ready. Use at your own risk.

## Running the code
1. Deploy the contracts
```bash
cd packages/contracts
pnpm test
pnpm deploy:hekla
```
2. Deploy [the subgraph](./packages/subgraph/README.md)

3. Update the deployment values in the [setup contract](./packages/contracts/script/setup.s.sol) and start the game with test data:
```bash
cd packages/contracts
pnpm setup:hekla
```

4. Update the deployment values for the [close contract](./packages/contracts/script/close.s.sol) and close the game (publish the results):
```bash
cd packages/contracts
pnpm close:hekla
```
