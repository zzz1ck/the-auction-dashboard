import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import pg from 'pg';
import path from 'path';
import 'dotenv/config';

const SMART_CONTRACT: string = 'v1.the-auction.near';

const { Pool } = pg;
const pool = new Pool({
  user: 'public_readonly',
  host: 'mainnet.db.explorer.indexer.near.dev',
  database: 'mainnet_explorer',
  password: 'nearprotocol',
  port: 5432,
});

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/api/v1/transactions', (req, res) => {
  pool.query(
    'SELECT signer_account_id, args FROM transactions tx INNER JOIN transaction_actions txa ON tx.transaction_hash = txa.transaction_hash WHERE receiver_account_id = $1 AND NOT signer_account_id = $1 AND action_kind = $2',
    [SMART_CONTRACT, 'FUNCTION_CALL'],
    (error, results) => {
      if (error) {
        throw error;
      }

      res.status(200).json(results.rows);
    }
  );
});

// ORDER BY CAST(ara.args::json->>'deposit' AS real) DESC
app.get('/api/v1/bidders', (req, res) => {
  try {
    pool.query(
      `SELECT predecessor_account_id as signer_account_id, args::json->>'deposit' as deposit FROM receipts r INNER JOIN action_receipt_actions ara ON r.receipt_id = ara.receipt_id INNER JOIN execution_outcomes eo ON r.receipt_id = eo.receipt_id WHERE receiver_account_id = $1 AND action_kind = $2 AND NOT predecessor_account_id = $1 AND status::text LIKE 'SUCCESS%' AND ara.args::json->>'method_name' = $3`,
      [SMART_CONTRACT, 'FUNCTION_CALL', 'place_bid'],
      (error, results) => {
        if (error) {
          throw error;
        }

        res.status(200).json(results.rows);
      }
    );
  } catch (e) { throw e; }
});

if (process.env.NODE_ENV == 'production') {
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/../client/public/index.html'));
  });
  app.use(express.static(path.join(__dirname + '/../client/public')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/../client/public/index.html'));
  });
}

app.listen(process.env.PORT || 8000, () => {
  console.log(`Server is running on ${process.env.PORT || 8000} port.`);
});
