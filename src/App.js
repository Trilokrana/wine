// app.js
import React, { useState } from "react";
import { Container } from "@mantine/core";
import wineData from "./WineDataSet/WineData";
import FlavanoidStatsTable from "./Components/Flavanoids";
import WineStatisticsTable from "./Components/Gamma";

function App() {
  const [data] = useState(wineData);
  console.log(data);
  return (
    <Container size="sm">
      <h1 style={{textAlign:"center"}}>Class-wise Statistical Measures of Flavanoids</h1>
      <FlavanoidStatsTable />
      <h1 style={{textAlign:"center"}}>Class-wise Statistical Measures of Gamma</h1>
      <WineStatisticsTable />
    </Container>
  );
}

export default App;
