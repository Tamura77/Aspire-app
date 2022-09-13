import {useQuery} from "@tanstack/react-query";
import { fetchExample } from "../requests/example";

function PageNotFound () {
  return (
    <div className="error">
      <h1>Page not found</h1>

    </div>
    
  )
}

export default PageNotFound;