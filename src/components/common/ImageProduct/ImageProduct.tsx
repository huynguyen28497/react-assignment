import React, { useEffect, useState } from "react";
import "./styles.scss";
import moment from "moment";

interface Props {
  images: string[];
  newUpdate: string;
  rank: number;
}

const ImageProduct = (props: Props) => {
  const { images, rank, newUpdate } = props;
  const [image, setImage] = useState("");

  const autoImage = (i: number) => {
    if (i === images.length) {
      i = 0;
    }
    setImage(images[i]);
    i++;
  };

  useEffect(() => {
    let i = 0;
    let func: any = autoImage;
    func(i);
    return () => {
      func = null;
    };
  }, []);

  return (
    <div className="root-image-product">
      <img src={image} />
      {rank <= 20 ? <div className="product-rank">Top {rank}</div> : null}
      {+moment().diff(newUpdate, "days") < 70 ? (
        <div className="product-new">New</div>
      ) : null}
    </div>
  );
};

export default ImageProduct;
