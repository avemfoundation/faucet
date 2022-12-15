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


# Token Request API

## Overview

The Token Request API is an API for requesting tokens from a smart contract faucet. This API accepts a request with a user's Ethereum address, validates the address, and then makes a request to the smart contract faucet to transfer tokens to the user's address. The API also tracks the timestamp of the last request made by each user to enforce a minimum wait time before another request can be made.

## API Endpoints

### POST /request-tokens

Makes a request to the faucet to transfer tokens to the user's Ethereum address.

#### Request Body

The request body should be a JSON object with the following format:

```
{
"address": "<user's Ethereum address>"
}
```

#### Response

If the request is successful, the response will be a JSON object with the following format:

```
{
"success": true
}
```

If the request is unsuccessful, the response will be a JSON object with the following format:
```
{
"error": "<error message>"
}
```
