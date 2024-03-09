import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import {
  actGetCategories,
  categoriesRecordsCleanUp,
} from "@store/categories/categoriesSlice";
import { Category } from "@components/eCommerce";
import { GridList, Heading } from "@components/common";
import { Loading } from "@components/feedback";
import { TCategory } from "@customTypes/category";

const Categories = () => {
  const dispatch = useAppDispatch();
  const { loading, error, records } = useAppSelector(
    (state) => state.categories
  );

  useEffect(() => {
    dispatch(actGetCategories());

    return () => {
      dispatch(categoriesRecordsCleanUp());
    };
  }, [dispatch]);

  return (
    <>
      <Heading title="Categories" />
      <Loading status={loading} error={error}>
        <GridList<TCategory>
          records={records}
          renderItem={(record) => <Category {...record} />}
        />
      </Loading>
    </>
  );
};

export default Categories;
