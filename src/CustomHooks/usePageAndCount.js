import { useSelector } from "react-redux";
import {
  pageCountSelector,
  pageSelector,
} from "../redux/store/selectors/moviesSelector";

export const usePageAndCount = () => {
  const page = useSelector(pageSelector);
  const pageCount = useSelector(pageCountSelector);
  return { page, pageCount };
};
