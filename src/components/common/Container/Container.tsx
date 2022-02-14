import React from "react";
import "./styles.scss";

interface Props {
  children?: React.ReactNode
}

const Container = (props: Props) => {
  return <div className="root-container">
		{props.children}
	</div>;
};

export default Container;
