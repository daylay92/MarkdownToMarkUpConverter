const config = {
  root: __dirname,
  markup_folder: `/markup/`,
  markdown_folder: `/markdown/`,
  no_params: `Do pass in the file name of the markdown as a parameter (Eg. markdown.md)`,
  name_regex: /\/?(.+?)[.]\w+?$/gi,
  replace_value: `$1.rtf`,
  token: `5c79d7d3-5995-44b6-9b32-523949ff1900`,
  read_error(stack) {
    return `something went wrong while reading your markup file.\n To debug, You can check this out: \n\n ${stack}`;
  },
  write_error(stack) {
    return `something went wrong while writing the markup file.\n To debug, You can check this out :\n\n ${stack}`;
  }
};

module.exports = config;
