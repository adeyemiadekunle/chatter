import React from 'react'
import { db } from "../../utils/firebase";
import { useParams } from "react-router-dom";
import { updateDoc, doc, arrayUnion, arrayRemove, onSnapshot,
  } from "firebase/firestore";




const Bookmarks = () => {
    const  [bookmarks, setBookmarks] = React.useState<any[]>([]);


  return (
    <div>Bookmarks</div>
  )
}

export default Bookmarks