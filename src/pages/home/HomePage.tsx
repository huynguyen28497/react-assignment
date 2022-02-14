import Footer from "components/common/Footer/Footer";
import Header from "components/common/Header/Header";
import ListShow from "components/ListShow/ListShow";
import Pagination from "components/Pagination/Pagination";
import React, { useEffect, useState } from "react";
import { IProduct } from "utils/types/product.types";
import listData from "./catalog.json";
import "./styles.scss";

interface Props {}

const HomePage = (props: Props) => {
  const [allList, setAllList] = useState([] as IProduct[]);
  //for pagination
  const [page, setPage] = useState(0);
  //itemPerPage
  const itemPerPage = 12;

  useEffect(() => {
    //remove inactive and deleted
    const load = listData.data.filter(
      (i) => i.status === "active" && !i.isDeleted
    );
    //set to allList
    setAllList(load);
  }, []);

  return (
    <div className="root">
      <Header />
      <ListShow
        items={allList}
        page={page}
        itemPerPage={itemPerPage}
      />
      <Pagination
        count={allList.length}
        setPage={setPage}
        page={page}
        itemPerPage={itemPerPage}
      />
      <Footer />
    </div>
  );
};

export default HomePage;
