#!/usr/bin/env node

import fs from 'node:fs';
import prompts from 'prompts';
import { select } from '@inquirer/prompts';

import {
  errors,
  execAwait,
  exit,
  messages,
  random,
  succeses,
  wait,
  warnings,
} from './utils';
import {
  CONTRIBUTIONS,
  ENTRY,
  GIT,
  GITHUB,
  LINKEDIN,
  NAME,
  PROGRESS,
  ROOT,
  SYNC,
} from './constants';

const instructions = () => {
  errors(
    `❌ Invalid repository, you must be inside the "${CONTRIBUTIONS}" repository.`,
  );

  messages(`\n`, `New to Git4con? 👋 Follow the steps below to get started!`);

  succeses(`\n`, `1. Install the ${NAME} package`);

  messages(`Run 👉 \`npm i -g ${NAME}\``);

  succeses(
    `\n`,
    `2. Create the ${CONTRIBUTIONS} repository with the link below`,
  );

  messages(
    `CMD + Click 👉 https://github.com/new?owner=@me&name=${CONTRIBUTIONS}&visibility=private`,
  );

  succeses(`\n`, '3. `git clone <repository url>`');

  succeses(
    `\n`,
    `4. \`cd ${CONTRIBUTIONS}\` (should now be inside the \`${CONTRIBUTIONS}\` directory)`,
  );

  succeses(
    `\n`,
    `5. run the command \`${NAME}\` inside the \`${CONTRIBUTIONS}\` directory`,
  );
};

const cmd =
  process.platform == 'darwin'
    ? 'open'
    : process.platform == 'win32'
      ? 'start'
      : 'xdg-open';

try {
  if (
    !fs
      .readFileSync(GIT, 'utf8')
      .match(/url = (.+)/)[1]
      .includes(CONTRIBUTIONS)
  ) {
    instructions();
    process.exit();
  }
} catch {
  instructions();
  process.exit();
}

const sync = fs.existsSync(SYNC);

if (!sync) {
  try {
    fs.writeFileSync(SYNC, '');
  } catch {
    exit(
      `Error creating the file \`sync\`, please make sure you have write permissions to the "${ROOT}" directory.`,
    );
  }
}

const onboarding = async () => {
  const contents = fs.readFileSync(SYNC, 'utf8');

  if (contents.startsWith(ENTRY)) return;

  while (1) {
    warnings(
      '🚨 Complete the following steps to get LIFETIME ACCESS to Git4con! 🚨 \n',
    );

    messages('1) LinkedIn: Connect me if we’re not already connected\n');

    succeses(`CMD + Click 👉 ${LINKEDIN} \n`);

    await wait(5000);

    await execAwait(`${cmd} ${LINKEDIN}`);

    let value = await prompts({
      type: 'text',
      name: 'value',
      message: 'Done? y/Y',
      validate: value => ['y', 'Y'].includes(value),
    });

    if (!value.value) {
      errors('Canceling... Please try again...');
      continue;
    } else messages();

    messages('2) GitHub: Follow me if you’re not already following\n');

    succeses(`CMD + Click 👉 ${GITHUB} \n`);

    await wait(5000);

    await execAwait(`${cmd} ${GITHUB}`);

    value = await prompts({
      type: 'text',
      name: 'value',
      message: 'Done? y/Y',
      validate: value => ['y', 'Y'].includes(value),
    });

    if (!value.value) {
      errors('Canceling... Please try again...');
      continue;
    } else messages();

    break;
  }

  fs.writeFileSync(SYNC, ENTRY);

  succeses('🥳 Congratulations! You now have LIFETIME ACCESS to Git4con! 🎉');
};

const contributions = async () => {
  const currentYear = new Date().getFullYear();
  const startYear = currentYear - 50;

  const choices = Array.from(
    { length: currentYear - startYear + 1 },
    (_, i) => {
      const year = currentYear - i;
      return {
        name: year === currentYear ? `${year} (this year)` : year.toString(),
        value: year,
      };
    },
  );

  const selectedYear = await select({
    message: 'Select the year you want to add commits to',
    choices,
  });

  const daysSinceYearStart = Math.floor(
    (new Date().getTime() -
      new Date(new Date().getFullYear(), 0, 0).getTime()) /
      (1000 * 60 * 60 * 24),
  );

  const totalDaysToMakeCommits =
    currentYear === selectedYear ? daysSinceYearStart : 365;

  let daysSinceSelectedYearStart =
    currentYear === selectedYear
      ? daysSinceYearStart
      : (currentYear - selectedYear - 1) * 365 + daysSinceYearStart;

  let currentDaysCommitted = 0;
  let totalCommits = 0;

  messages(`Processing for "${selectedYear}"...`);

  PROGRESS.start(totalDaysToMakeCommits, currentDaysCommitted);

  for (let i = 0; i < totalDaysToMakeCommits; i++) {
    if (Math.random() >= 0.8) {
      currentDaysCommitted++;
      PROGRESS.update(currentDaysCommitted);
      continue;
    }

    const randomCommitsPerDay = random(1, 3);

    for (let j = 0; j < randomCommitsPerDay; j++) {
      await fs.promises.appendFile(SYNC, random(0, 1).toString());

      await execAwait('git add .');
      await execAwait(
        `git commit --date "${daysSinceSelectedYearStart + i} day ago" -m "w"`,
      );

      totalCommits++;
    }

    currentDaysCommitted++;

    PROGRESS.update(currentDaysCommitted);
  }

  await execAwait('git push');

  succeses(
    `\n`,
    `You have successfully pushed ${totalCommits} commits to GitHub for ${selectedYear}, go check your profile!`,
  );
  succeses(`P.S. Did you like ${NAME}? Please star our GitHub repository ❤️`);
  succeses(`CMD + Click 👉 ${GITHUB}`);
};

(async () => {
  await onboarding();
  await contributions();
})();
