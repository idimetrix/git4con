import { exec, ExecOptions } from 'child_process';

export const execAwait = (
  command: string,
  options: ExecOptions = {},
): Promise<{
  stdout: string;
  stderr: string;
}> =>
  new Promise((resolve, reject) => {
    try {
      exec(command, options, (error, stdout, stderr) => {
        if (error) {
          reject({ stdout, stderr });
        } else {
          resolve({ stdout, stderr });
        }
      });
    } catch (error: any) {
      reject({ stdout: '', stderr: error.message });
    }
  });
