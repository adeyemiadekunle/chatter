
const UserStats = ({ userId }: { userId: string }) => {
    const [followersCount, setFollowersCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);
  
    useEffect(() => {
      const fetchUserStats = async () => {
        try {
          const userRef = doc(db, "users", userId);
          const userDoc = await getDoc(userRef);
  
          if (userDoc.exists()) {
            const { followers, following } = userDoc.data();
  
            setFollowersCount(followers.length);
            setFollowingCount(following.length);
          }
        } catch (error) {
          console.error(`Error fetching user stats for user ${userId}:`, error);
        }
      };
  
      fetchUserStats();
    }, [userId]);
  
    return (
      <div>
        <p>Followers: {followersCount}</p>
        <p>Following: {followingCount}</p>
      </div>
    );
  };
  