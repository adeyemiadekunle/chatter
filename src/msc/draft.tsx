import { useEffect, useRef } from 'react'
import { EditorContent, useEditor } from '@tiptap/react'
import Placeholder from '@tiptap/extension-placeholder'
import StarterKit from '@tiptap/starter-kit'
import MenuBar from '../../components/TiptapMenu'
import useRichTextEditor from '../../hooks/useArticleManagement'
import { Box, VStack, Button } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'



export default () => {
  const {
    drafts,
    currentDraft,
    loadDrafts,
    loadDraft,
    saveCurrentDraft,
    handleEditorChange,
    createNewDraft,
  } = useRichTextEditor();
  const { draftId } = useParams(); // Acce

  // Load existing drafts if available
  useEffect(() => {
    loadDrafts();
    return () => {
      // Cleanup function
      saveCurrentDraft();
    }
  }, [loadDrafts, saveCurrentDraft]);

  // Load the specific draft based on the draftId parameter
  useEffect(() => {
    if (draftId) {
      loadDraft(draftId);
    }
  }, [draftId, loadDraft]);

  const editor = useEditor({
    extensions: [
      Placeholder.configure({
        placeholder: 'Getting typing...',
        emptyEditorClass: 'is-editor-empty',
      }),
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
    ],
    content: currentDraft,
    onUpdate: handleEditorChange,

  })

 
  return (
    <>
      <Box>
        <VStack>
          <Box>
            <div>
              <h2>Drafts</h2>
              <ul>
                {drafts.map((draft) => (
                  <li key={draft.id} onClick={() => loadDraft(draft.id)}>
                    {draft.id}
                  </li>
                ))}
              </ul>
            </div>
          </Box>
          <Box>
            <div className='editor_container'>
              <MenuBar editor={editor} />
              <EditorContent editor={editor} />
              <Button onClick={saveCurrentDraft}>Save Current Draft</Button>
            </div>
          </Box>
        </VStack>
      </Box>
    </>

  )
}