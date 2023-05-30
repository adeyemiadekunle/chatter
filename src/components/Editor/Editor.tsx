import { EditorContent, useEditor, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';


const MyEditor = ({ article, onSave }) => {
    const editor = useEditor({
      extensions: [StarterKit],
      content: article.content,
      onUpdate: ({ editor }) => {
        const content = editor.getJSON();
        // Update the draftArticle with the new content
        onSave(content);
      },
    });
  
    return (
      <div>
        <EditorContent editor={editor} />
      </div>
    );
  };
  