import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'
const useConversation = create(
	persist(
	(set) => ({
	selectedConversation: null,
	setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
	messages: [],
	setMessages: (messages) => set({ messages }),
	conversations: {
		users:[],
		nextCursor:null,
		hasNextPage:false,
	},
	setConversations: (conversations) => set({ conversations }), // this function updates the whole conversation array, used when loadMore button is clicked in sidebar
	appendConversation: (conversation) => { // this function is used when a single user is to be appended in the sidebar i.e when using the searching option
		 set((state) => {
          // avoid duplicates based on _id
          const alreadyExists = state.conversations.users.some(
            (u) => u._id === conversation._id
          );

          if (alreadyExists) return state; // no change

          return {
            conversations: {
              ...state.conversations,
              users: [conversation, ...state.conversations.users],
            },
          };
        });
	}
	}),
	{ // persisting the conversation data in local storage
      name: "conversation-storage",
	  storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        conversations: state.conversations,
        selectedConversation: state.selectedConversation,
      }),
    }
));

export default useConversation;
