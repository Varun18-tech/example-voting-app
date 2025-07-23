const axios = require('axios');
const assert = require('assert');

// URLs for the services.
const vote_url = 'http://vote:80';
const result_url = 'http://result:80';

describe('Application Health Checks', function() {
  // Set a timeout for the tests.
  this.timeout(10000);

  // Test Case 1: Check if the Voting page loads
  it('should successfully load the voting page', async function() {
    const response = await axios.get(vote_url);
    assert.strictEqual(response.status, 200, 'Voting page did not return a success status.');
  });

  // Test Case 2: Check if the Results page loads
  it('should successfully load the result page', async function() {
    const response = await axios.get(result_url);
    assert.strictEqual(response.status, 200, 'Result page did not return a success status.');
  });
});
