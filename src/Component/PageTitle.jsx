import { useEffect } from "react";

const DEFAULT_TITLE = "LoanLink | Microloan Management System";

const PageTitle = ({title}) => {
  useEffect(() => {
    if (title) {
      document.title = `${title} | LoanLink`;
    } else {
      document.title = DEFAULT_TITLE;
    }

    // Optional cleanup (good practice)
    return () => {
      document.title = DEFAULT_TITLE;
    };
  }, [title]);
};

export default PageTitle;
