const core = require('@actions/core');
const github = require('@actions/github');

function run() {
  const title = github.context.payload.pull_request.title;
  core.info(`PR title: ${title}`);
  const prURL = github.context.payload.pull_request._links.html.href;
  core.info(`PR url: ${prURL}`);

  if (!title) throw new Error(`No title passed`);
  core.info(`Title: ${title}`);
  const ticketIDPattern = core.getInput('ticket_pattern'); //'vtx-\\d+';
  core.info(`ticketIDPattern: ${ticketIDPattern}`);
  const regexTicketID = new RegExp('vtx-\\d+', 'gim');
  const ticketIDMatch = title.match(regexTicketID);
  core.info(`ticketIDMatch: ${ticketIDMatch}`);

  const ticketTypePattern = 'bugfix|feature|tests';
  const regexTicketType = new RegExp(ticketTypePattern, 'gim');
  const ticketTypeMatch = title.match(regexTicketType);
  core.info(`ticketTypeMatch: ${ticketTypeMatch}`);
  
  if (!title.includes('no-title-check')) {
    if (!ticketIDMatch) {
      core.setFailed(
        `Pull request title "${title}" does not contain Jira ticker ID (e.g. VTX-13).`,
        )
      }
      
      if (!ticketTypeMatch) {
      core.setFailed(
        `Pull request title "${title}" does not contain ticket type "feature" or "bugfix" (or "tests")`,
      )
    }
  }

  // console.log(JSON.stringify(github.context.payload.pull_request, null, 2));
  
  if (github && github.context && github.context.payload && github.context.payload.pull_request) {
    core.setOutput('title', title);
    core.setOutput('url', prURL);
    core.info(`PR title: ${title}`);
    core.info(`PR URL: ${prURL}`);
  }
}

run();
