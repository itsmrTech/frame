import { CodeGenerator } from './compiler/codegen';

// Get the FramePaper file path from the command-line arguments
const args = process.argv.slice(2);

if (args.length === 0) {
  console.error('Please provide the path to the FramePaper JSON file.');
  process.exit(1); // Exit the process with an error code
}

const framePaperPath = args[0];
console.log(`Using FramePaper file: ${framePaperPath}`);

// Generate code based on the FramePaper
CodeGenerator.generateAll(framePaperPath);
