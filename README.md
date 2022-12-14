# Avem Faucet Smart-Contract

This contract is a simple faucet that allows users to request a specified amount of ether from a pool of funds. The contract has the following features:

- The `owner` address can set the amount of ether that will be dispensed to users who request tokens (the `drip` value).
- Users must wait 24 hours between requesting tokens from the faucet.
- The contract includes a `donateToFaucet` function that allows users to donate ether to the contract's pool of funds.
- The `getFaucetInfo` function allows users to view the current `owner` and `drip` values.
- The `getFaucetBalance` function allows users to view the current balance of the contract.
- The `getLockTime` function allows users to view the time at which they will be able to request tokens again.

## Usage

To use the faucet, follow these steps:

1. Call the `requestTokens` function, providing the address to which the ether should be sent.
2. Wait for the transaction to be mined. If the contract has sufficient funds and the user has waited the required amount of time, the specified amount of ether will be sent to the provided address.

## Security

The contract includes the following security measures:

- The `owner` address is set in the contract constructor and can only be changed by calling the `setOwner` function, which can only be called by the current owner.
- The `drip` value is set in the contract constructor and can only be changed by calling the `setDrip` function, which can only be called by the current owner.
- The `requestTokens` function includes a `require` statement that checks that the user has waited the required amount of time before requesting tokens again.
- The `requestTokens` function includes a `require` statement that checks that the contract has sufficient funds to fulfill the request.
