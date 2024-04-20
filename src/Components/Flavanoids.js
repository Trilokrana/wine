import React from "react";
import { Table } from "@mantine/core";
import wineData from "../WineDataSet/WineData"; // assuming wineData is imported from wineData.js

const FlavanoidsStaticsTable = () => {
  // Aggregate Flavanoids by Alcohol class
  const classData = {};
  wineData().forEach((wine) => {
    if (!classData[wine.Alcohol]) classData[wine.Alcohol] = [];
    classData[wine.Alcohol].push(wine.Flavanoids);
  });

  const calculateMean = (numbers) =>
    numbers.length > 0
      ? numbers.reduce((a, b) => a + b, 0) / numbers.length
      : 0;

  // Calculates the median of an array of numbers
  const calculateMedian = (numbers) => {
    const sorted = [...numbers].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 !== 0
      ? sorted[mid]
      : (sorted[mid - 1] + sorted[mid]) / 2;
  };

  // Calculates the mode of an array of numbers
  const calculateMode = (numbers) => {
    const counts = {};
    numbers.forEach((number) => {
      counts[number] = (counts[number] || 0) + 1;
    });
    const maxCount = Math.max(...Object.values(counts));
    return Object.keys(counts).filter((number) => counts[number] === maxCount);
  };

  // Calculate statistics
  // Calculate statistics
  const statisticsData = Object.keys(classData).map((alcoholClass) => {
    return {
      class: `Class ${alcoholClass}`,
      mean: calculateMean(classData[alcoholClass]).toFixed(3),
      median: calculateMedian(classData[alcoholClass]).toFixed(3),
      mode: calculateMode(classData[alcoholClass]).join(", "),
    };
  });

  // Define columns for the table
  const columns = [
    { title: "Measure", dataKey: "measure" },
    { title: "Alcohol 1", dataKey: "alcohol1" },
    { title: "Alcohol 2", dataKey: "alcohol2" },
    { title: "Alcohol 3", dataKey: "alcohol3" },
  ];

  const rows = [
    {
      measure: "Flavanoids Mean",
      alcohol1: statisticsData[0].mean,
      alcohol2: statisticsData[1].mean,
      alcohol3: statisticsData[2].mean,
    },
    {
      measure: "Flavanoids Median",
      alcohol1: statisticsData[0].median,
      alcohol2: statisticsData[1].median,
      alcohol3: statisticsData[2].median,
    },
    {
      measure: "Flavanoids Mode",
      alcohol1: statisticsData[0].mode,
      alcohol2: statisticsData[1].mode,
      alcohol3: statisticsData[2].mode,
    },
  ];

  return (
    <>
      <Table
        striped
        highlightOnHover
        withTableBorder
        withColumnBorders
        style={{ margin: "0 auto", width: "80%" }}
      >
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                style={{
                  border: "1px solid black",
                  padding: "8px",
                  textAlign: "center",
                }}
                key={col.title}
              >
                {col.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td
                style={{
                  border: "1px solid black",
                  padding: "8px",
                  textAlign: "center",
                }}
              >
                {row.measure}
              </td>
              {Object.values(row)
                .filter((val, index) => index !== 0)
                .map((value, vIndex) => (
                  <td
                    style={{
                      border: "1px solid black",
                      padding: "8px",
                      textAlign: "center",
                      backgroundColor: "rgba(211,211,211,0.2)",
                    }}
                    key={vIndex}
                  >
                    {value}
                  </td>
                ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default FlavanoidsStaticsTable;
