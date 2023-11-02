import * as core from '@actions/core'
import * as github from '@actions/github'

/**
 * The main function for the action.
 *
 *  - Gets the pull request body from the payload.
 *  - Gets the keyword from the action input.
 *  - Gets the optional output prefix from the action input.
 *  - Finds the associated value from the pull request body's specified keyword.
 *  - Sets the found value as an output with optional prefix.
 *
 * @returns {Promise<void>} Resolves when the action is complete.
 */
const main = async (): Promise<void> => {
  try {
    const KEYWORD_INPUT = "keyword";
    const OUTPUT_PREFIX_INPUT = "outputPrefix";
    const KEYWORD_VALUE_OUTPUT = "keywordValue";
    
    const { context: { payload } } = github;
    const body = payload?.pull_request?.body;
    const keywordName = core.getInput(KEYWORD_INPUT, { required: true });
    const prefix = core.getInput(OUTPUT_PREFIX_INPUT);

    const regex = new RegExp(`${keywordName}=([^\n\r]+)(?=\n|\r|$)`);
    const match = body?.match(regex);

    if (match) {
      const value = match[1];
      core.setOutput(KEYWORD_VALUE_OUTPUT, prefix + value);
    } else {
      throw Error(`The pull request body does not contain the keyword ${keywordName}.`);
    }
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message);
  }
}

main();
