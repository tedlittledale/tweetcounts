import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import { useMst } from "../models/Root";
import Key from "./Key";
import Axes from "./Axes";
import Line from "./Line";
import Points from "./Points";
import Loading from "./Loading";
import Map from "./Map";
import Legend from "./Legend";

const ChartWrap = styled("div")`
  margin-top: 50px;
  width: 100%;
  position: relative;
  text-align: center;
  h2 {
    background-image: linear-gradient(
      to bottom right,
      hsl(205, 87%, 29%),
      hsl(205, 76%, 39%)
    );
    margin: 0 0 10px;
    padding: 20px 40px;
    border-radius: 5px 5px 0 0;
    text-align: center;
    color: #fff;
    font-weight: normal;
    letter-spacing: 0.8px;
  }
  > div {
    width: 80%;
    max-width: 960px;
    border-radius: 5px;
    box-shadow: 0 5px 15px hsla(0, 0%, 0%, 0.2);
    box-sizing: border-box;
    background: white;
    margin: 0 auto;
    > div {
      position: relative;
    }
  }
`;

const Credit = styled.div`
  padding: 20px;
  text-align: left;
  a {
    text-decoration: underline;
    color: hsl(205, 82%, 33%);
  }
  margin-bottom: 30px;
`;

const Chart = ({ model }) => {
  const [chartWidth, setChartWidth] = useState(null);
  const { chartModel } = useMst();
  const targetRef = useRef();
  const updateScales = () => {
    const { width } = targetRef.current.getBoundingClientRect();
    setChartWidth(width);
    console.log({ width });
    chartModel.setUpScales({ width });
  };
  useEffect(() => {
    console.log("updateScales");
    updateScales();
    window.addEventListener("resize", updateScales);
    return () => {
      window.removeEventListener("resize", updateScales);
    };
  }, [chartModel.data]);
  return (
    <>
      <ChartWrap>
        <div ref={targetRef}>
          {chartModel.ready ? (
            <div>
              <Axes
                yTicks={chartModel.getYAxis()}
                xTicks={chartModel.getXAxis()}
                width={chartWidth}
                xLabel={``}
                yLabel={`Tweet count`}
                paddingAndMargins={chartModel.paddingAndMargins}
              ></Axes>
              {chartModel.data.map(({ result, queryName }, idx) => (
                <Line
                  data={chartModel.getLine({
                    data: result.data,
                    idx
                  })}
                ></Line>
              ))}
              {/* {chartModel.data.map(({ result, queryName }, idx) => (
                <Points
                  data={chartModel.getPoints({
                    data: result.data,
                    idx
                  })}
                ></Points>
              ))} */}
              <Legend cities={chartModel.getCities()} />
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </ChartWrap>
    </>
  );
};

export default observer(Chart);
