#!/bin/bash
echo "[+] Running vulnerability patch tests against the live app..."

# Wait for app to be ready
curl -s "${API_BASE_URL}/api" || { echo "App not reachable."; exit 1; }

# Run Jest or Curl-based integration tests
npm test > log_output.txt 2> test_output.txt

# Print output to console
# echo -e "\n\n[+] Test output:\n"
# cat test_output.txt

# Extract test suite summary line
summary_line=$(grep "Test Suites:" test_output.txt)

if echo "$summary_line" | grep -q "failed"; then
  echo -e "\n❌ Some tests failed. Try again."
else
  echo -e "\n✅ All tests passed! Here's your flag: ${FLAG}"
fi
