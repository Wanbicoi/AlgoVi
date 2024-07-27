import { Link } from "@radix-ui/themes";
import { Link as RouterLink } from "react-router-dom";

export default function App() {
  return (
    <Link asChild>
      <RouterLink to={"bubble-sort"}>Bubble Sort</RouterLink>
    </Link>
  );
}
