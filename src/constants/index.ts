import cliProgress from 'cli-progress';
import * as path from 'node:path';

export const NAME = 'git4con';
export const CONTRIBUTIONS = `${NAME}-contributions`;
export const ROOT = process.env.INIT_CWD || process.cwd();
export const GIT = path.join(ROOT, '.git/config');
export const SYNC = path.join(ROOT, 'sync');
export const ENTRY = '=)';

export const LINKEDIN = 'https://www.linkedin.com/in/dimetrix';
export const GITHUB = 'https://github.com/idimetrix';

export const PROGRESS = new cliProgress.SingleBar(
  {},
  cliProgress.Presets.shades_classic,
);
