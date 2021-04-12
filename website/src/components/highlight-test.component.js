import React from "react";
import Highlighter from "react-highlight-words";

function HighlightTest() {
    return(
        <Highlighter
        highlightClassName="YourHighlightClass"
        searchWords={["and", "or", "the"]}
        autoEscape={true}
        textToHighlight="Did you see the yellow banana and the red apple? Or did you forget to look?"
      />
    );
}

export default HighlightTest;
