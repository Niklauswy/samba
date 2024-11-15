
const express = require('express');
const { exec } = require('child_process');
const app = express();
const port = 3000;

app.use(express.json()); // Add this middleware to parse JSON request bodies

const executeAddUserScript = (script, userData, res) => {
  const child = exec(script, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return res.status(500).json({ error: 'Server Error', details: error.message });
    }
    try {
      const jsonData = JSON.parse(stdout);
      res.status(200).json(jsonData);
    } catch (parseError) {
      console.error(`parse error: ${parseError}`);
      res.status(500).json({ error: 'Server Error', details: parseError.message });
    }
  });

  // Send user data to the Perl script via stdin
  child.stdin.write(JSON.stringify(userData));
  child.stdin.end();
};

app.post('/api/users/create', (req, res) => {
  const userData = req.body;
  executeAddUserScript('perl addUser.pl', userData, res);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});