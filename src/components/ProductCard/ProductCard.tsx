import ImageProduct from "components/common/ImageProduct/ImageProduct";
import React from "react";
import { IProduct } from "utils/types/product.types";
import "./styles.scss";

interface IProductCardProps {
  product: IProduct;
}

const ProductCard = (props: IProductCardProps) => {
  const { product } = props;

  const formatDescription = (word: string) => {
    let maxLength = 100; // maximum number of characters to extract

    //trim the string to the maximum length
    let trimmedString = word.substring(0, maxLength);
    
    //re-trim if we are in the middle of a word
    if(word.length > 100) {
      trimmedString = trimmedString.substring(
        0,
        Math.min(trimmedString.length, trimmedString.lastIndexOf(" "))
      ) + ' ...';
    }

    return trimmedString
  };
  return (
    <div className="root-product-card">
      <div className="product-image">
        <ImageProduct
          rank={product.rank}
          newUpdate={product.updatedAt}
          images={
            product.imageUrls[0]
              ? product.imageUrls
              : [
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVHyMlVDh0U4aPkn5vmaUw_YHAY_lLFSeN6w&usqp=CAU",
                ]
          }
        />
      </div>
      <div className="product-content">
        <p className="product-name">{product.name}</p>
        <p className="product-description"
          dangerouslySetInnerHTML={{
            __html: `${formatDescription(product.description)}`,
          }}
        />
      </div>
    </div>
  );
};

export default ProductCard;
