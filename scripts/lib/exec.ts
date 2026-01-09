import { spawnSync } from "child_process";

type ExecOptions = {
  cwd?: string;
  env?: NodeJS.ProcessEnv;
};

export function exec(command: string, args: string[], options: ExecOptions = {}) {
  const result = spawnSync(command, args, {
    stdio: "inherit",
    cwd: options.cwd,
    env: options.env ?? process.env,
    shell: false
  });

  if (result.status !== 0) {
    throw new Error(`${command} failed with code ${result.status ?? "unknown"}`);
  }
}
