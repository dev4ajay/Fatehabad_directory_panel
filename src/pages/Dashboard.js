import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";

import DashboardHeader from "../components/DashboardHeader";
import Categories from "../components/statistics/Categories";
import Exchanges from "../components/statistics/Exchanges";
import AssetPlatforms from "../components/statistics/AssetPlatforms";
import MarketIndexes from "../components/statistics/MarketIndexes";

import Spacer from "../components/Spacer";

const Dashboard = () => {
  const theme = useTheme();

  return (
    <>
      <Box
        sx={{
          backgroundColor: theme.palette.background.default,
          minHeight: "100%",
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <Grid container spacing={3}>
            <DashboardHeader />
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <Categories />
            </Grid>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <Exchanges />
            </Grid>
             {/* <Grid item lg={3} sm={6} xl={3} xs={12}>
              <AssetPlatforms />
            </Grid> */}
            
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <MarketIndexes />
            </Grid> 
          </Grid>
        </Container>
      </Box>
      <Spacer sx={{ pt: 7 }} />
    </>
  );
};

export default Dashboard;
