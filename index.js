const core = require('@actions/core');
const github = require('@actions/github');

(function run() {
  const title = github.context.payload.pull_request.title;
  core.info(`PR title: ${title}`);

  if (!title) throw new Error(`Pull request title is empty`);

  core.info(`Title: ${title}`);
  const ticketIDPattern = core.getInput('ticket_id_pattern'); //'vtx-\\d+';
  const ticketTypesPattern = core.getInput('ticket_types_pattern');

  core.info('ticketIDPattern:', String(ticketIDPattern));
  core.info('ticketTypesPattern:', String(ticketTypesPattern));

  const regexTicketID = new RegExp(ticketIDPattern, 'gim');
  const ticketIDMatch = title.match(regexTicketID);
  core.info(`ticketIDMatch: ${ticketIDMatch}`);

  const regexTicketType = new RegExp(ticketTypesPattern, 'gim');
  const ticketTypeMatch = title.match(regexTicketType);
  core.info(`ticketTypeMatch: ${ticketTypeMatch}`);
  
  if (!title.includes('@no-title-check')) {
    if (!ticketIDMatch) {
      core.setFailed(
        `Pull request title "${title}" does not contain Jira ticker ID for provided pattern: ${ticketIDPattern}`,
        )
      }
      
      if (!ticketTypeMatch) {
      core.setFailed(
        `Pull request title "${title}" does not contain any of ticket types: ${ticketTypesPattern}`,
      )
    }
  }
})();
