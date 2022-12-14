import React from "react";

function CreateUserForm({ signUpUser }) {
  return (
    <form className="FormElement" onSubmit={(e) => signUpUser(e)}>
      <label htmlFor="name">Username</label>
      <input type="text" name="name" />
      <label htmlFor="email">Email</label>
      <input type="email" name="email" />
      <label htmlFor="password">Password</label>
      <input type="password" name="password" />

      <div className="ButtonWrapper">
        <button type="submit" className="Button">
          Submit
        </button>
      </div>
    </form>
  );
}

export default CreateUserForm;
