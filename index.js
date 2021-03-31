const core = require('@actions/core');
const github = require('@actions/github');

function run() {
  const title = github.context.payload.pull_request.title;
  core.info(`PR title: ${title}`);
  const prURL = github.context.payload.pull_request._links.html.href;
  core.info(`PR url: ${prURL}`);

  if (!title) throw new Error(`No title passed`);
  const ticketIDPattern = 'vtx-\\d+';
  const regexTicketID = new RegExp(ticketIDPattern, 'gim');
  const ticketIDMatch = title.match(regexTicketID);

  const ticketTypePattern = 'bugfix|feature';
  const regexTicketType = new RegExp(ticketTypePattern, 'gim');
  const ticketTypeMatch = title.match(regexTicketType);
  
  const isTests = title.toLowerCase().includes('[tests]');

  if (!title.includes('no-title-check')) {
    if (!ticketIDMatch) {
      core.setFailed(
        `Pull request title "${title}" does not contain Jira ticker ID (e.g. VTX-13). Please add it to title`,
        )
      }
      
      if (!ticketTypeMatch && !isTests) {
      core.setFailed(
        `Pull request title "${title}" does not contain ticket type "feature" or "bugfix"`,
      )
    }
  }

  // console.log('PULL REQUEST:');
  // console.log(JSON.stringify(github.context.payload.pull_request, null, 2));
  
  core.info(`issests: ${isTests}`);

  if (github && github.context && github.context.payload && github.context.payload.pull_request) {
    core.setOutput('title', title);
    core.setOutput('url', prURL);
    core.setOutput('istests', isTests);
  }
}

run()
