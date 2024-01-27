import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { Code as CodeIcon } from "@mui/icons-material";

import Panel from "./Panel";

function CodePanel(props) {
  return (
    <Panel label="Code" icon={<CodeIcon color="disabled" sx={{ mr: 1 }} />} defaultExpanded={true}>
      <SyntaxHighlighter language="python" style={docco} customStyle={{ fontSize: 14 }}>
        {props.content}
      </SyntaxHighlighter>
    </Panel>
  );
}
export default CodePanel;
