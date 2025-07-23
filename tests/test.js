const axios = require('axios');
const assert = require('assert');

// URLs for the services. The result app serves its API at the /results endpoint.
const vote_url = 'http://vote:80';
const result_url = 'http://result:80/results';

// A helper function to introduce a delay, giving the worker time to process.
const wait = ms => new Promise(res => setTimeout(res, ms));

describe('Voting App E2E Tests', function() {
  // Set a longer timeout for all tests in this suite, as they involve network calls.
  this.timeout(10000);

  // --- Test Case 1: Health Check for Voting page (same as before) ---
  it('should successfully load the voting page', async function() {
    const response = await axios.get(vote_url);
    assert.strictEqual(response.status, 200, 'Voting page did not return a success status.');
  });

  // --- Test Case 2: Health Check for Results page (same as before) ---
  it('should successfully load the result page', async function() {
    const response = await axios.get('http://result:80/');
    assert.strictEqual(response.status, 200, 'Result page did not return a success status.');
  });

  // --- Test Case 3: The NEW End-to-End Voting Flow Test ---
  it('should correctly count a new vote', async function() {
    // Step 1: Get the initial results before voting
    const initialResultResponse = await axios.get(result_url);
    const initialVotes = parseInt(initialResultResponse.data.a) || 0;

    // Step 2: Cast a new vote for option 'a' (Cats) by sending a POST request
    const voteData = new URLSearchParams();
    voteData.append('vote', 'a');
    await axios.post(vote_url, voteData);

    // Step 3: Wait for the worker to process the vote from the queue
    await wait(3000); // Wait 3 seconds

    // Step 4: Get the new results after voting
    const finalResultResponse = await axios.get(result_url);
    const finalVotes = parseInt(finalResultResponse.data.a);

    // Step 5: Assert that the vote count has increased by exactly one
    assert.strictEqual(finalVotes, initialVotes + 1, 'The vote count for "a" did not increase by one.');
  });
});
