import React from "react";

function CreatePostForm({ createPost }) {
  return (
    <form className="FormElement" onSubmit={(e) => createPost(e)}>
      <label htmlFor="text">New Post</label>
      <input type="text" name="text" />

      <div className="ButtonWrapper">
        <button type="submit" className="Button">
          Submit
        </button>
      </div>
    </form>
  );
}

export default CreatePostForm;
