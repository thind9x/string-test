export const getMessages = (
    state = { lists: [], indexRead: '' },
    action: {
        type: string;
        payload: {
            listId?: {};
            oldListIndex?: any;
            newListIndex?: any;
        };
    },
) => {
    switch (action.type) {
        case 'ADD_LIST_MESSAGES': {
            const { listId } = action.payload;
            return { lists: [...state?.lists, listId] };
        }

        case 'MAKE_READ':
            return {
                loading: false,
                indexRead: action.payload,
                error: '',
            };
        case 'MOVE_LIST_MESSAGES': {
            const { oldListIndex, newListIndex } = action.payload;
            const newLists = Array.from(state?.lists);
            const [removedList] = newLists.splice(oldListIndex, 1);
            newLists.splice(newListIndex, 0, removedList);
            return { lists: newLists };
        }
        case 'DELETE_LIST_MESSAGES': {
            const { listId } = action.payload;
            const filterDeleted = (tmpListId: any) => tmpListId !== listId;
            const newLists = state.lists.filter(filterDeleted);
            return { lists: newLists };
        }
        default:
            return state;
    }
};
