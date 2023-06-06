import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import { useGetUsersQuery } from './usersApiSlice'
import { memo } from 'react'

const User = ({ userId }) => {
  const { user } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[userId]
    }),
  })

  const navigate = useNavigate();

  if (user) {
    const handleEdit = () => navigate(`/dashboard/users/${userId}`);

    const userRolesString = user.roles.toString().replaceAll(",", ", ");

    const cellStatus = user.active ? "" : "table__cell--inactive";

    return (
      <tr className="table__row user">
        <td className={`table__cell ${cellStatus}`}>{user.username}</td>
        <td className={`table__cell ${cellStatus}`}>{userRolesString}</td>
        <td className={`table__cell ${cellStatus}`}>
          <button className="icon-button table__button" onClick={handleEdit}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </td>
      </tr>
    );
  } else return null;
};
export default memo(User);

/* Note */

// useSelector: This is a hook provided by the React Redux library. It allows you to extract data from the Redux store in a React component. The useSelector hook takes a selector function as an argument.

// (state) => selectUserById(state, userId): This is the selector function passed to useSelector. It receives the current Redux state as an argument and returns a specific piece of data from that state. In this case, it appears to be using a helper function called selectUserById to retrieve a user object based on a given userId.

// state: This is the parameter passed to the selector function, representing the current Redux state. It contains the entire state tree, which includes all the data stored in the Redux store.

// userId: This is likely a variable representing the ID of the user you want to select from the Redux store. It's used as an argument for the selectUserById function inside the selector.
