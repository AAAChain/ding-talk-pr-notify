const core = require('@actions/core');
const github = require('@actions/github');
const DingRobot = require('ding-robot');


async function run() {
  try {
    const context = github.context;
    const { owner, repo } = context.repo;
    const pr = context.payload.pull_request
    const dingTalkToken = core.getInput('ding_talk_token');
    const extraContent = core.getInput('extraContent') || '';
    const repoUrl = core.getInput('repoUrl');
    const atAll = core.getInput('atAll') || false;

    if (!dingTalkToken) {
      core.setFailed('Please set DingTalk access token!');
    }

    const robot = new DingRobot(dingTalkToken, (error) => {
      if (error) {
        core.setFailed(error.message);
      }
    });
    const prLink = repoUrl ? `${repoUrl}/${pr.number}` : _links.html.href;
    const content = `📢 ${pr.user.login} 发起PR: (${pr.title}), 请大家帮忙review, 🔗 链接: ${prLink}, ${extraContent}`;
    robot.atAll(atAll).text(content);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
