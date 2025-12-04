import { type Dispatch, type SetStateAction } from "react";
import HomeIcon from "../icons/HomeIcon";

type EditorHeaderProps = {
  setLoadEditor?: Dispatch<SetStateAction<boolean>>;
  displayHomeIcon?: boolean;
};

const EditorHeader = ({
  setLoadEditor = () => {},
  displayHomeIcon = true,
}: EditorHeaderProps) => {
  return (
    <header className="workspace-bar workspace-bar--title">
      {displayHomeIcon && (
        <button
          className="workspace-back workspace-back--icon"
          onClick={() => setLoadEditor(false)}
          aria-label="Back to home"
        >
          <HomeIcon />
        </button>
      )}
      <div className="workspace-title">
        <img
          src="/logo_new.svg"
          alt="CodeXlatr logo"
          className="workspace-logo"
        />
        <span>CodeXlatr</span>
      </div>
    </header>
  );
};

export default EditorHeader;
