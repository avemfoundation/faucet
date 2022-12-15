//Alpha version 0.0.2a
const express = require('express');
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('addresses.db');

const app = express();

app.use(express.json());


app.post('/request-tokens', async (req, res) => {

    await new Promise((resolve, reject) => {
        db.run(
            'CREATE TABLE IF NOT EXISTS addresses (address TEXT PRIMARY KEY, timestamp INTEGER)',
            (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            }
        );
    });

    const {
        address
    } = req.body;

    // Validate the user's address
    if (!address || !isValidAddress(address)) {
        res.status(400).send({
            error: 'Invalid address. Please provide a valid Ethereum address.',
        });
        return;
    }

    // Check if the user has waited long enough before making another request
    const lockTime = await getLockTime(address);
    if (Date.now() < lockTime) {
        // User has not waited long enough, return an error
        res.status(400).send({
            error: 'You must wait before requesting tokens again. Please try again later.',
        });
        return;
    }

    // User has waited long enough, fulfill the request and save their address and timestamp
    try {
        // TODO: Call the contract's requestTokens method to fulfill the user's request

        await saveAddress({
            address,
            timestamp: Date.now()
        });
        res.send({
            success: true
        });
    } catch (err) {
        res.status(500).send({
            error: 'An error occurred while processing your request. Please try again later.',
        });
    }
});

async function getLockTime(address) {
    try {
        const result = await new Promise((resolve, reject) => {
            db.get(
                'SELECT timestamp FROM addresses WHERE address = ?',
                [address],
                (err, row) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(row ? row.timestamp : 0);
                    }
                }
            );
        });
        return result;
    } catch (err) {
        throw err;
    }
}

function isValidAddress(address) {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
}

async function saveAddress(data) {
    try {
        await new Promise((resolve, reject) => {
            db.run(
                'INSERT INTO addresses (address, timestamp) VALUES (?, ?)',
                [data.address, data.timestamp],
                (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                }
            );
        });
    } catch (err) {
        throw err;
    }
}

app.listen(3000, () => {
    console.log('Token request API listening on port 3000');
});