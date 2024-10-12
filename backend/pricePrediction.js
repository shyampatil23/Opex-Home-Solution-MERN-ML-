import { spawn } from 'child_process';
import path from 'path';

// Function to call the Python script for price prediction
export const predictPrice = (houseFeatures, callback) => {
  // Define the path to your Python script (update the path if necessary)
  const pythonScriptPath = path.join(__dirname, '../AI_ML/price_prediction.py');

  // Convert house features into a JSON string to send to the Python script
  const houseFeaturesString = JSON.stringify(houseFeatures);

  // Spawn a child process to run the Python script
  const pythonProcess = spawn('python', [pythonScriptPath, houseFeaturesString]);

  let dataToSend = '';

  // Listen for data output from the Python script
  pythonProcess.stdout.on('data', (data) => {
    dataToSend += data.toString();
  });

  // Handle errors during the Python script execution
  pythonProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  // Handle the completion of the Python process
  pythonProcess.on('close', (code) => {
    console.log(`Python process exited with code ${code}`);
    callback(dataToSend); // Send the data back to the caller
  });
};
