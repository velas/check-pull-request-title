const core = require('@actions/core');
const github = require('@actions/github');

function run() {
  const title = github.context.payload.pull_request.title;
  const prURL = github.context.payload.pull_request._links.html;

  if (!title) throw new Error(`Not title provided`);
  // const title = 'VTX-100, vtx-111 some text () bla bla []';
  const pattern = 'vtx-\\d+';
  const regex = new RegExp(pattern, 'gim');
  core.info(`Title: ${title}`);
  const matches = title.match(regex);
  core.info(`Matches: ${matches}`);
  const isValid = !!matches;

  core.info(`Is valid: ${isValid}`);
  if (!isValid) {
    core.setFailed(
      `Pull request title "${title}" does not match regex pattern "${pattern}".`,
    )
  }

  // console.log('PULL REQUEST:');
  // console.log(JSON.stringify(github.context.payload.pull_request, null, 2));
  
  console.log(`Title: ${title}`);
  console.log(`URL: ${prURL}`);
  if (github && github.context && github.context.payload && github.context.payload.pull_request) {
    core.setOutput('title', title);
    core.setOutput('url', prURL);
  }
}

run()
