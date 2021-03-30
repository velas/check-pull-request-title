const core = require('@actions/core');
const github = require('@actions/github');

function run() {
  // const pattern = core.getInput('pattern')
  // const regex = new RegExp(pattern);
  // const title =
  //   github.context.payload &&
  //   github.context.payload.pull_request &&
  //   github.context.payload.pull_request.title
  // core.info(title)
  // const isValid = regex.test(title)
  // if (!isValid) {
  //   core.setFailed(
  //     `Pull request title "${title}" does not match regex pattern "${pattern}".`,
  //   )
  // }

  // console.log('PULL REQUEST:');
  // console.log(JSON.stringify(github.context.payload.pull_request, null, 2));
  console.log('TITLE:');
  console.log(github.context.payload.pull_request.title);
  console.log('URL:');
  console.log(github.context.payload.pull_request.html_url);
  if (github && github.context && github.context.payload && github.context.payload.pull_request) {
    core.setOutput('title', github.context.payload.pull_request.title);
    core.setOutput('url', github.context.payload.pull_request.url);
  }
}

run()
