export const messages = (...values: any[]) => {
  console.log('\x1b[35m', ...values, '\x1b[0m');
};

export const succeses = (...values: any[]) => {
  console.log('\x1b[32m', ...values, '\x1b[0m');
};

export const warnings = (...values: any[]) => {
  console.log('\x1b[33m', ...values, '\x1b[0m');
};

export const errors = (...values: any[]) => {
  console.log('\x1b[31m', ...values, '\x1b[0m');
};
