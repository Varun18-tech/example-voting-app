const axios = require('axios');
const assert = require('assert');

// URLs for the services.
const vote_url = 'http://vote:80/';
const result_url = 'http://result:80/results';

// A helper function to introduce a delay.
const wait = ms => new Promise(res => setTimeout(res, ms));

describe('Voting App E2E Tests', function() {
  this.timeout(10000);

  // --- Health Checks ---
  it('should successfully load the voting page', async function() {
    const response = await axios.get(vote_url);
    assert.strictEqual(response.status, 200, 'Voting page did not return a success status.');
  });

  it('should successfully load the result page', async function() {
    const response = await axios.get('http://result:80/');
    assert.strictEqual(response.status, 200, 'Result page did not return a success status.');
  });

  // --- E2E Voting Flow Test ---
  it('should correctly count a new vote', async function() {
    // Get initial vote count
    const initialResultResponse = await axios.get(result_url);
    const initialVotes = parseInt(initialResultResponse.data.a) || 0;

    // THIS IS THE CORRECTED PART: We now send the data as a simple string.
    const voteData = 'vote=a';

    await axios.post(vote_url, voteData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    // Wait for the worker to process the vote
    await wait(3000);

    // Get the new results after voting
    const finalResultResponse = await axios.get(result_url);
    const finalVotes = parseInt(finalResultResponse.data.a);

    // Assert that the vote count has increased by one
    assert.strictEqual(finalVotes, initialVotes + 1, 'The vote count for "a" did not increase by one.');
  });
});
