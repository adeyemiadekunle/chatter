import { useEffect, useState } from "react";
import { collection, onSnapshot, DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { db } from '../utils/firebase';
import { Link } from "react-router-dom";
import Output from 'editorjs-react-renderer';

interface Draft {
  id: string;
  content: {
    blocks: {
      type: string;
      data: {
        level: number;
      };
    }[];
  };
}

const DraftsList: React.FC = () => {
  const [drafts, setDrafts] = useState<Draft[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "drafts"), (snapshot) => {
      const draftsData = snapshot.docs.map((doc: QueryDocumentSnapshot<DocumentData>) => ({
        id: doc.id,
        ...doc.data()
      })) as Draft[];
      setDrafts(draftsData);
    });

    // Cleanup the listener when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div>
      <h2>Drafts List</h2>
      {drafts.map((draft) => {
        const headingBlock = draft.content.blocks.find(block => block.type === 'header' && block.data.level === 1);
        return (
          <div key={draft.id}>
            <Link to={"/edit/" + draft.id}>
              {headingBlock && <Output data={headingBlock} />}
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default DraftsList;
