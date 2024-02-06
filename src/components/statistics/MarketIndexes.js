import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';
import {BaseUrl} from "../../BaseUrl"
import CustomCard from '../CustomCard';

// Font Awesome Icon
import { library } from '@fortawesome/fontawesome-svg-core';
import { faChartColumn as ChartColumnIcon } from '@fortawesome/free-solid-svg-icons';
library.add(ChartColumnIcon);

const MarketIndexes = () => {
  const theme = useTheme();

  const [indexes, setIndexes] = useState([]);
  console.log(indexes.totalCount , ">>>");
  const fetchIndexes = () => {
    axios
      .get(`${BaseUrl}/businesses/businesses/count`, {
        headers: {
          Accept: 'application/json',
        },
      })
      .then((response) => {
        setIndexes(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchIndexes();
  }, []);

  return (
    <CustomCard
      text='Total Listing'
      value={indexes.totalCount}
      color={theme.palette.primary.main}
      icon={ChartColumnIcon}
    />
  );
};

export default MarketIndexes;
