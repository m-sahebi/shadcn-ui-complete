export default {
  '*.{js,mjs,cjs,ts,tsx}': [
    () => 'tsc -p tsconfig.json --noEmit',
    'eslint --fix',
    'prettier --write',
  ],
  '!(*.js|*.mjs|*.cjs|*.ts|*.tsx)': ['prettier --write --ignore-unknown'],
};
