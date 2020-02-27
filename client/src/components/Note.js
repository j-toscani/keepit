import React, { useContext } from "react";
import { css } from "@emotion/core";
import { ThemeContext } from "../themes/ThemeContext";
import { fetchList, deleteEntry } from "../api/notes";
import Button from "../components/Button";

export default function Note({ entry, setData }) {
  const { theme } = useContext(ThemeContext);

  const { _id, name, content } = entry;
  return (
    <div
      css={css`
        width: 200px;
        height: 240px;
      `}
    >
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: space-around;
          border-bottom: 1px solid black;
          padding: 5px;
          background: ${theme.contrast};
        `}
      >
        <label>{name}</label>
        <Button
          handleClick={() => {
            deleteEntry("/notes", _id)
              .then(() =>
                fetchList("/notes").then(response => setData(response))
              )
              .catch(() => alert("Note could not be found."));
          }}
        >
          X
        </Button>
      </div>

      <div
        css={css`
          padding: 10px;
          height: 100%;
          width: 100%;
          background: ${theme.accent};
          color: ${theme.contrast};
        `}
      >
        {content}
      </div>
    </div>
  );
}
