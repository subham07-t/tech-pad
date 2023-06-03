import { store } from "../../app/store";
import { notesApiSlice } from "../notes/notesApiSlice";
import { usersApiSlice } from "../users/usersApiSlice";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const Prefetch = () => {
  useEffect(() => {
    console.log("subscribing");
    const notes = store.dispatch(notesApiSlice.endpoints.getNotes.initiate());
    const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate());

    return () => {
      console.log("unsubscribing");
      notes.unsubscribe();
      users.unsubscribe();
    };
  }, []);

  return <Outlet />;
};
export default Prefetch;

/* Note */

// The store.dispatch function is a method provided by Redux that allows you to dispatch actions to the Redux store. It is used to trigger state updates by sending actions to the store's reducer functions.

// The initiate method is a built-in method provided by RTK Query that triggers the API request and returns a Promise that resolves with the result.

// The unsubscribe method is specific to RTK Query and allows you to cancel an ongoing request.

// Why this component for ?

// The Prefetch component uses the useEffect hook to dispatch API requests (getNotes and getUsers) using RTK Query's initiate method when the component mounts. It also sets up cleanup logic to unsubscribe and cancel the dispatched requests if the component is unmounted. This approach allows you to prefetch data before rendering the child components, enhancing performance and providing the necessary data for the subsequent rendering.
