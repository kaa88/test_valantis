import { ComponentProps } from "react";
import classes from "./Products.module.scss";
import Header from "../Header/Header";
import List from "../List/List";

const Products = function ({
  className = "",
  ...props
}: ComponentProps<"div">) {
  return (
    <div className={`${className} ${classes.default}`} {...props}>
      <Header className={classes.header} />
      <List className={classes.list} />
    </div>
  );
};
export default Products;
