const UsernamePlaceholder = (props) => {
  if (props.username) {
    return <h5>Username: {props.username}</h5>;
  }

  return (
    <>
      <label htmlFor="username">Username:</label>
      <input
        id="username"
        type="text"
        onBlur={(event) => props.onUsernameInformed(event.target.value)}
      />
    </>
  );
};

export default UsernamePlaceholder;
