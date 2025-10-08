import useGetConversations from "../../hooks/useGetConversations";
import { getRandomEmoji } from "../../utils/emojis";
import Conversation from "./Conversation";

const Conversations = () => {
  const { loading, conversations,loadMore } = useGetConversations(); 
	// conversations is now an object of the structure {
	// 	users,
	// 	nextCursor,
	// 	hasNextPage
	// }

  return (
    <div className="py-2 flex flex-col overflow-auto">
	  {/* moved the loader up here since errors were being caused in the previous implementation */}
      {loading ? (
        <span className="loading loading-spinner mx-auto"></span>
      ) : (
        <>
          {conversations.users.map((conversation, idx) => (
            <Conversation
              key={conversation._id}
              conversation={conversation}
              emoji={getRandomEmoji()}
              lastIdx={idx === conversations.users.length - 1}
            />
          ))}
		  {conversations.hasNextPage?<button onClick={loadMore}>Load more</button>:null}
        </>
      )}
    </div>
  );
};
export default Conversations;

// STARTER CODE SNIPPET
// import Conversation from "./Conversation";

// const Conversations = () => {
//  return (
//      <div className='py-2 flex flex-col overflow-auto'>
//          <Conversation />
//          <Conversation />
//          <Conversation />
//          <Conversation />
//          <Conversation />
//          <Conversation />
//      </div>
//  );
// };
// export default Conversations;