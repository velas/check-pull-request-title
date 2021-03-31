const core = require('@actions/core');
const github = require('@actions/github');

function run() {
  const title = github.context.payload.pull_request.title;
  core.info(`PR title: ${title}`);
  const prURL = github.context.payload.pull_request._links.html.href;
  console.log(`PR url: ${prURL}`);

  if (!title) throw new Error(`No title passed`);
  const ticketIDPattern = 'vtx-\\d+';
  const ticketTypePattern = 'bugfix|feature';
  const regexTicketID = new RegExp(ticketIDPattern, 'gim');
  const regexTicketType = new RegExp(ticketTypePattern, 'gim');
  const ticketIDMatch = title.match(regexTicketID);
  const ticketTypeMatch = title.match(regexTicketType);
  core.info(`Ticket id match: ${ticketIDMatch}`);
  core.info(`Ticket type match: ${ticketTypeMatch}`);

  if (title.includes('no-title-check')) return;

  if (ticketIDMatch) {
    core.setFailed(
      `Pull request title "${title}" does not contain Jira ticker ID (e.g. VTX-13). Please add it to title`,
    )
  }

  if (ticketTypeMatch) {
    core.setFailed(
      `Pull request title "${title}" does not contain ticket type "feature" or "bugfix"`,
    )
  }

  // console.log('PULL REQUEST:');
  // console.log(JSON.stringify(github.context.payload.pull_request, null, 2));
  
  if (github && github.context && github.context.payload && github.context.payload.pull_request) {
    core.setOutput('title', title);
    core.setOutput('url', prURL);
  }
}

run()
