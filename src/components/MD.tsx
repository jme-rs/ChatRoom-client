import { unified } from 'unified';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
// import rehypeReact from "rehype-react";
// import * as prod from "react/jsx-runtime";
import remarkBreaks from "remark-breaks";
import rehypeStringify from 'rehype-stringify';


export function getMdParser() {
  return unified()
    .use(remarkParse)
    .use(remarkBreaks)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeStringify)
}
