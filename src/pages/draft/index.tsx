import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import useArticleManagement from '../../hooks/useArticleManagement';
import { useState, useEffect } from 'react';

type ArticleType = {
  content: string;
  title: string;
  id: string;
  // Add other properties as needed
};



const MyEditor = ({ article, onSave }: { article: ArticleType, onSave: (content: any) => void }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: article?.content,
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

const DraftComponent = () => {

  const [isSaving, setIsSaving] = useState(false);
  const [timerId, setTimerId] = useState<number | null>(null);

  const {
    draftArticle,
    draftArticles,
    saveDraftArticle,
    openDraftArticle,
  } = useArticleManagement();


  // Auto-save draft every second
  useEffect(() => {
    const autoSaveDraft = async () => {
      setIsSaving(true);
      await saveDraftArticle();
      setIsSaving(false);
    };

    if (draftArticle.id && !timerId) {
      const id = setInterval(autoSaveDraft, 1000);
      setTimerId(id as unknown as number);
      console.log('saved')
    }

    return () => {
      if (timerId) {
        clearInterval(timerId as unknown as NodeJS.Timeout);
        setTimerId(() => null);
      }
    };
  }, [draftArticle.id, saveDraftArticle, timerId]);



  return (
    <div>
      {/* <button onClick={createDraftArticle}>Create Draft</button> */}

      <ul>
        {draftArticles.map(draftArticle => ( // Update this line
          <li key={draftArticle.id} onClick={() => openDraftArticle(draftArticle.id)}>
            {draftArticle.title}
          </li>
        ))}
      </ul>

      <MyEditor article={draftArticle} onSave={saveDraftArticle} />
      {isSaving && <p>Saving draft...</p>}
    </div>
  );
};

export default DraftComponent; 