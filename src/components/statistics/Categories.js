import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTheme } from "@mui/material/styles";

import CustomCard from "../CustomCard";
import {BaseUrl} from  '../../BaseUrl'
// Font Awesome Icon
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCoins as CoinsIcon } from "@fortawesome/free-solid-svg-icons";
library.add(CoinsIcon);

const Categories = () => {
  const theme = useTheme();

  const [categories, setCategories] = useState([]);

  const fetchCategories = () => {
    axios
      .get(`${BaseUrl}/categories/count`, {
        headers: {
          Accept: "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        setCategories(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <CustomCard
      text="CATEGORIES"
      value={categories.count}
      color={theme.palette.error.dark}
      icon={CoinsIcon}
    />
  );
};

export default Categories;
