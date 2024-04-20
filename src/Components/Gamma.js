import React from "react";
import { Table } from "@mantine/core";
import wineData from "../WineDataSet/WineData"; // assuming wineData is imported from wineData.js

// Function to calculate Gamma and statistics for each alcohol class
const calculateGammaAndStats = () => {
  let data = wineData();

  // Calculate Gamma for each point
  data.forEach(point => {
    point.Gamma = (point.Ash * point.Hue) / point.Magnesium;
  });

  // Filter data points based on alcohol classes
  const alcoholClass1 = data.filter(point => point.Alcohol === 1);
  const alcoholClass2 = data.filter(point => point.Alcohol === 2);
  const alcoholClass3 = data.filter(point => point.Alcohol === 3);

  // Calculate mean, median, and mode of Gamma for each alcohol class
  const calculateStats = (classData) => {
    const gammaValues = classData.map(point => point.Gamma);

    const mean = gammaValues.reduce((acc, val) => acc + val, 0) / gammaValues.length;

    const sortedGamma = gammaValues.sort((a, b) => a - b);
    const mid = Math.floor(sortedGamma.length / 2);
    const median = sortedGamma.length % 2 === 0 ? (sortedGamma[mid - 1] + sortedGamma[mid]) / 2 : sortedGamma[mid];

    const modeMap = {};
    gammaValues.forEach(num => {
      modeMap[num] = (modeMap[num] || 0) + 1;
    });

    let maxCount = Math.max(...Object.values(modeMap));
    const mode = Number(Object.keys(modeMap).find(key => modeMap[key] === maxCount));

    return {
      mean: mean.toFixed(3),
      median: median.toFixed(3),
      mode: mode.toFixed(3)
    };
  };

  // Calculate statistics for each alcohol class
  const statsAlcoholClass1 = calculateStats(alcoholClass1);
  const statsAlcoholClass2 = calculateStats(alcoholClass2);
  const statsAlcoholClass3 = calculateStats(alcoholClass3);

  return {
    AlcoholClass1: statsAlcoholClass1,
    AlcoholClass2: statsAlcoholClass2,
    AlcoholClass3: statsAlcoholClass3
  };
};

const WineStatisticsTable = () => {
  const gammaStats = calculateGammaAndStats();

  const rows = [
    {
      measure: "Gamma Mean",
      alcohol1: gammaStats.AlcoholClass1.mean,
      alcohol2: gammaStats.AlcoholClass2.mean,
      alcohol3: gammaStats.AlcoholClass3.mean,
    },
    {
      measure: "Gamma Median",
      alcohol1: gammaStats.AlcoholClass1.median,
      alcohol2: gammaStats.AlcoholClass2.median,
      alcohol3: gammaStats.AlcoholClass3.median,
    },
    {
      measure: "Gamma Mode",
      alcohol1: gammaStats.AlcoholClass1.mode,
      alcohol2: gammaStats.AlcoholClass2.mode,
      alcohol3: gammaStats.AlcoholClass3.mode,
    },
  ];

  return (
    <Table striped highlightOnHover style={{ border: "1px solid black", marginTop: "20px", width: "80%", margin: "50px auto",  textAlign: "center" }}>
  <thead>
    <tr>
      <th style={{ border: "1px solid black", padding: "8px" }}>Measure</th>
      <th style={{ border: "1px solid black", padding: "8px" }}>Alcohol 1</th>
      <th style={{ border: "1px solid black", padding: "8px" }}>Alcohol 2</th>
      <th style={{ border: "1px solid black", padding: "8px" }}>Alcohol 3</th>
    </tr>
  </thead>
  <tbody>
    {rows.map((row, index) => (
      <tr key={index}>
        <td style={{ border: "1px solid black", padding: "8px" }}>{row.measure}</td>
        <td style={{ border: "1px solid black", padding: "8px" }}>{row.alcohol1}</td>
        <td style={{ border: "1px solid black", padding: "8px" }}>{row.alcohol2}</td>
        <td style={{ border: "1px solid black", padding: "8px" }}>{row.alcohol3}</td>
      </tr>
    ))}
  </tbody>
</Table>


  );
};

export default WineStatisticsTable;
