const axios = require('axios');
const assert = require('assert');

// Inside a Docker Compose network, services can talk to each other using their names.
const vote_url = 'http://vote:80';
const result_url = 'http://result:80';

describe('Application Health Checks', function() {
  // Test Case 1: Check if the Voting page loads
  it('should successfully load the voting page', async function() {
    this.timeout(5000); // Set a 5-second timeout for the test
    const response = await axios.get(vote_url);
    assert.strictEqual(response.status, 200, 'Voting page did not return a success status.');
  });

  // Test Case 2: Check if the Results page loads
  it('should successfully load the result page', async function() {
    this.timeout(5000); // Set a 5-second timeout for the test
    const response = await axios.get(result_url);
    assert.strictEqual(response.status, 200, 'Result page did not return a success status.');
  });
});
