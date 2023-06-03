import React from "react";
import { useGetUsersQuery } from "./usersApiSlice";
import User from "./User";

const UsersList = () => {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery(undefined, {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>{error?.data?.message}</p>;

  if (isSuccess) {
    const { ids } = users;

    const tableContent = ids?.length
      ? ids.map((userId) => <User key={userId} userId={userId} />)
      : null;

    return (
      <table>
        <thead>
          <tr>
            <th scope="col">Username</th>
            <th scope="col">Roles</th>
            <th scope="col">Edit</th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    );
  }
};

export default UsersList;

/* Note */

// undefined: The first argument to useGetUsersQuery is the arg, which represents any argument needed for the API request. In this case, undefined indicates that no specific argument is required for the API request to fetch the users.

// pollingInterval: 60000: This option specifies the time interval, in milliseconds, at which the API request should be automatically refetched. In this example, the API request to get users will be automatically refetched every 60 seconds (1 minute).

// refetchOnFocus: true: This option determines whether the API request should be automatically refetched when the browser window or tab regains focus. Setting it to true means that the API request will be refetched when the user interacts with the application window after switching to a different window or tab.

// refetchOnMountOrArgChange: true: This option specifies whether the API request should be refetched when the component mounts or when the arg value changes. If set to true, the API request will be refetched when the component is initially rendered (mounted) and whenever the arg value changes.

// By passing these options to the useGetUsersQuery hook, you configure how the API request should behave in terms of automatic polling, refetching on focus, and refetching on mount or argument change.
