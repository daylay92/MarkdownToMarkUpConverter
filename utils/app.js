import fs from "fs";
import config from "../config";
import { join } from "path";
import RtfRegex from "./regex/rtf_regex";
const {
  root,
  no_params,
  read_error,
  write_error,
  markdown_folder,
  markup_folder,
  name_regex,
  replace_value
} = config;

export const startConvertion = path => {
  if (!path) return console.log(no_params);
  const dir = join(root, markup_folder);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
  fs.readFile(
    join(root, markdown_folder, path),
    { encoding: "utf8" },
    (err, data) => {
      if (err) return console.log(read_error(err.stack));
      const { computeResult } = new RtfRegex();
      try {
        const result = computeResult(data);
        const fileName = path.replace(name_regex, replace_value);
        fs.writeFile(join(root, markup_folder, fileName), result, err => {
          if (err) console.log(write_error(err.stack));
        });
        console.log(result);
      } catch (error) {
        console.log(error.stack);
      }
    }
  );
};

//  startConvertion('markdown.md');

import("make-runnable");
