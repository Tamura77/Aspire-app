import {useQuery} from "@tanstack/react-query";
import { fetchExample } from "../requests/example";

import HelpModal from "../components/helpModal";

function PageNotFound () {
  return (
    <div className="error">
      <h1>Page not found</h1>
      <HelpModal />

    </div>
    
  )
}

export default PageNotFound;