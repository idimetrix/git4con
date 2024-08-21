export const exit = (message: string) => {
  console.error(`\x1b[1m\x1b[31m❌ ${message}\x1b[0m`);
  process.exit(1);
};
