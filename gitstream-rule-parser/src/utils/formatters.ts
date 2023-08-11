import _ from 'lodash';
import prettier from 'prettier';
import { spawnSync } from 'child_process';

const PYTHON_COMMAND = 'python';

export const minify = (text: string) =>
  text.replace(/\s+/g, ' ').replaceAll("'", '"').trim();

export const removeEmptyLines = (text: string) =>
  text.replace(/^\s*[\r\n]/gm, '');

export const jsFormatter = (content: string, file: string) => {
  return minify(
    prettier.format(content, {
      semi: false,
      singleQuote: true,
      filepath: file,
    })
  );
};
export const pyFormatter = (content: string) => {
  // Format the code with black
  const blackResult = spawnSync(PYTHON_COMMAND, [
    '-c',
    `import black; print(black.format_str(${JSON.stringify(
      content
    )}, mode=black.FileMode()))`,
  ]);
  const formattedCode = blackResult.stdout.toString();
  return removeEmptyLines(formattedCode);
};

const SUPPORTED_FORMATTERS = {
  js: jsFormatter,
  ts: jsFormatter,
  html: jsFormatter,
  py: pyFormatter,
  default: minify,
};
export const format = (content: string, file: string) => {
  const fileExtension = file.split('.').pop() ?? '';
  const formatter = _.get(
    SUPPORTED_FORMATTERS,
    fileExtension,
    SUPPORTED_FORMATTERS.default
  );
  return formatter(content, file);
};
