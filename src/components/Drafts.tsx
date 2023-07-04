import { useEffect, useState } from "react";
import { collection, onSnapshot, DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { db } from '../utils/firebase';
import { Link } from "react-router-dom";
import { Text } from "@chakra-ui/react";

export interface Draft {
  id: string;
  headerImage: string;
  heading: string;
  content: {
    blocks: {
      type: string;
      data: {
        text: string;
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
        headerImage: doc.data().headerImage || "",
        heading: doc.data().heading || "",
        content: doc.data().content || { blocks: [] },
      })) as Draft[];

      setDrafts(draftsData);
    });

    // Cleanup the listener when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []);

  console.log(drafts);

  return (
    <div>
      <h2>Drafts List</h2>
      {drafts.map((draft) => {
        return (
          <div key={draft.id}>
            <Link to={"/edit/" + draft.id}>
              <Text>{draft.heading}</Text>
               <Text> {draft.id} </Text>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default DraftsList;
