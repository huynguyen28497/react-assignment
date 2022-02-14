import Container from "components/common/Container/Container";
import ProductCard from "components/ProductCard/ProductCard";
import React, { useEffect } from "react";
import { IProduct } from "utils/types/product.types";
import "./styles.scss";

interface IListShowProps {
  items: IProduct[];
  page: number;
  itemPerPage: number;
}

const ListShow = (props: IListShowProps) => {
  const { items, itemPerPage = 12, page = 0 } = props;

  //write fetch page function

  //when page change  smooth to Top
  useEffect(() => {
    const ref = document.querySelector('#product-list-root');
    ref?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [page]);

  return (
    <>
      <Container>
        <div className="product-list-root" id="product-list-root">
          {items
            .slice(
              itemPerPage * page,
              page === 0 ? itemPerPage : itemPerPage * (page + 1)
            )
            .map((item) => (
              <React.Fragment key={item.uuid}>
                <ProductCard product={item} />
              </React.Fragment>
            ))}
        </div>
      </Container>
    </>
  );
};

export default ListShow;
