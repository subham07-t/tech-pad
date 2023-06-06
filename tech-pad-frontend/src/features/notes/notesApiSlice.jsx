import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const notesAdapter = createEntityAdapter({});
const initialState = notesAdapter.getInitialState();

export const notesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotes: builder.query({
      query: () => ({
        url: '/notes',
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError
        },
      }),
      transformResponse: (responseData) => {
        const loadedNotes = responseData.map((note) => {
          note.id = note._id;
          return note;
        });
        return notesAdapter.setAll(initialState, loadedNotes);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "note", id: "LIST" },
            ...result.ids.map((id) => ({ type: "note", id })),
          ];
        } else return [{ type: "note", id: "LIST" }];
      },
    }),
    addNewNote: builder.mutation({
      query: (initialNote) => ({
        url: "/notes",
        method: "POST",
        body: {
          ...initialNote,
        },
      }),
      invalidatesTags: [{ type: "Note", id: "LIST" }],
    }),
    updateNote: builder.mutation({
      query: (initialNote) => ({
        url: "/notes",
        method: "PATCH",
        body: {
          ...initialNote,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Note", id: arg.id }],
    }),
    deleteNote: builder.mutation({
      query: ({ id }) => ({
        url: `/notes`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Note", id: arg.id }],
    }),
  }),
});

export const {
  useGetNotesQuery,
  useAddNewNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
} = notesApiSlice;

// returns the query result object
export const selectNotesResult = notesApiSlice.endpoints.getNotes.select();

// creates memoized selector
const selectNotesData = createSelector(
  selectNotesResult,
  (notesResult) => notesResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllNotes,
  selectById: selectNoteById,
  selectIds: selectNoteIds,
  // Pass in a selector that returns the notes slice of state
} = notesAdapter.getSelectors(
  (state) => selectNotesData(state) ?? initialState
);

/* Note */

// Creating a memoized selector means using a selector function that caches its output based on the inputs provided. It avoids unnecessary recomputations and improves performance by returning the cached result when the inputs haven't changed.

// createEntityAdapter({}) creates an instance of the entity adapter with an empty configuration object {}. The configuration object allows you to customize the behavior of the adapter, but in this case, we're passing an empty object to use the default configuration.

// notesAdapter is the instance of the entity adapter that provides several utility functions for managing normalized entity state.

// notesAdapter.getInitialState() returns the initial state object for the entity adapter. The initial state is an empty state object with the required fields for managing entities.

// Visualizing the state:

// The initial state object returned by getInitialState() can be visualized as follows:

// javascript
// Copy code
// const initialState = {
//   ids: [],     // Array to store the IDs of entities
//   entities: {}, // Object to store the entities by their IDs
// };
// The ids array stores the IDs of the entities in the order in which they were added. The entities object stores the entities themselves, where each entity is represented by an object with its ID as the key.

// Initially, both ids and entities are empty arrays/objects because no entities have been added yet.

// Here's an example of how the state might look after adding a couple of notes:

// javascript
// Copy code
// const state = {
//   ids: [1, 2],   // IDs of the added notes
//   entities: {
//     1: { id: 1, title: 'Note 1', text: 'Lorem ipsum...' },
//     2: { id: 2, title: 'Note 2', text: 'Dolor sit amet...' },
//   },
// };

// By using notesAdapter and its utility functions, you can easily add, update, and query entities in a normalized manner, while the adapter takes care of the underlying state management.
