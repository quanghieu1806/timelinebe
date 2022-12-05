import React, { useState, useMemo } from 'react';
import JoditEditor from 'jodit-react';

const EditorText = ({setContent ,content, ref}) => {
	

	return (
		<JoditEditor
			ref={ref}
			value={content}
            onChange={newContent =>  setContent(newContent)}
            className="editor-text"
		/>
	);
};

export default EditorText