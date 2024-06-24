"use client";

import CircularProgress from "@mui/material/CircularProgress";
import { useFormStatus } from "react-dom";
import { createURL } from "./create-url";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-blue-500 enabled:hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Submit
      {pending && (
        <span>
          {" "}
          <CircularProgress size="1rem" style={{ color: "white" }} />
        </span>
      )}
    </button>
  );
}

export default function UrlForm() {
  return (
    <form action={createURL}>
      <input
        type="url"
        name="url"
        placeholder="Enter the link here"
        required
        className="bg-gray-100 hover:bg-white focus:bg-white py-2 px-4 rounded"
      />
      <SubmitButton />
    </form>
  );
}
