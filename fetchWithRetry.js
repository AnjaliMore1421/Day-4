// fetchWithRetry.js

/**
 * Fetch wrapper with retry logic
 * 
 * @param {string} url - API endpoint
 * @param {object} options - fetch options
 * @param {number} retries - number of retry attempts
 * @param {number} delay - delay between retries in ms
 */

async function fetchWithRetry(url, options = {}, retries = 3, delay = 1000) {
  try {
    const response = await fetch(url, options);

    // Check if HTTP status is OK (200–299)
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    // Return parsed JSON if successful
    return await response.json();

  } catch (error) {
    // Retry if attempts are left
    if (retries > 0) {
      console.warn(`Retrying... Attempts left: ${retries}`);

      // Wait for 'delay' ms before retrying
      await new Promise(resolve => setTimeout(resolve, delay));

      // Recursive call with one less retry
      return fetchWithRetry(url, options, retries - 1, delay);
    } else {
      // No retries left → throw final error
      throw error;
    }
  }
}

export default fetchWithRetry;

/*
==================== OUTPUT EXAMPLES ====================

1) Success Case:
------------------------------------------------
{ id: 1, name: "Sample Data" }

2) Retry then Success:
-----------------------------------------------
Retrying... Attempts left: 3
Retrying... Attempts left: 2
{ id: 1, name: "Sample Data" }

3) All Retries Failed:
-----------------------------------------------
Retrying... Attempts left: 3
Retrying... Attempts left: 2
Retrying... Attempts left: 1
Failed: HTTP Error: 500

4) Network Error:
-----------------------------------------------
Retrying... Attempts left: 3
Retrying... Attempts left: 2
Retrying... Attempts left: 1
Failed: Failed to fetch

================================================
*/
