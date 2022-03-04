import React, { useState } from "react";
import styled from "styled-components";
import { useMst } from "../models/Root";
import { PlusIcon, MinusIcon } from "./Icons";

const FormWrap = styled.div`
  width: 100%;
  display: grid;
  justify-items: <center></center>;
  justify-self: center;
  padding: 16px;
  input {
    margin-top: 6px;
    padding: 6px;
    border-radius: 6px;
  }
  a {
  }
`;

const Button = styled.a`
  display: inline-block;
  height: 30px;
  width: 30px;
  margin-top: 2px;
`;

const SubmitButton = styled.button`
  display: inline-block;
  background: var(--color-pagecontent);
  color: white;
  padding: 10px;
  border-radius: 6px;
  border: none;
  margin: 10px;
  cursor: pointer;
`;

const InputRow = styled.div`
  display: grid;
  grid: 1fr / 1fr 1fr auto;
  grid-gap: 8px;
  margin-top: 10px;
  > div {
    display: grid;
    grid: ${({ isFirst }) => (isFirst ? `20px auto / 1fr` : `auto  / 1fr`)};
    align-items: center;
  }
`;

const SubmitArea = styled.div`
  width: 100%;
  text-align: left;
  margin-top: 40px;
`;

const QueryForm = () => {
  const { chartModel } = useMst();
  const [queries, setQueries] = useState([{ name: "", query: "" }]);
  const [fetching, setFetching] = useState(false);
  console.log({ queries });
  const getGraphData = async () => {
    setFetching(true);
    const response = await fetch(
      `/api/twitter/tweetCount/${encodeURIComponent(JSON.stringify(queries))}`
    );
    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      throw new Error(message);
    }
    const data = await response.json();
    console.log({ data });
    chartModel.processData({ data: data.results });
    setFetching(false);
  };
  return (
    <FormWrap>
      <div>
        <h3>
          1. Add your search queries (click plus to compare multiple search
          terms):
        </h3>
        {queries.map((query, idx) => (
          <InputRow isFirst={idx === 0}>
            <div>
              {idx === 0 && <label htmlFor={`name${idx}`}>Name</label>}
              <input
                type="text"
                id={`name${idx}`}
                value={queries[idx].name}
                onChange={(e) => {
                  setQueries(
                    queries.map((q, i) =>
                      i === idx ? { ...q, name: e.target.value } : q
                    )
                  );
                }}
              />
            </div>
            <div>
              {idx === 0 && <label htmlFor={`query${idx}`}>Search terms</label>}
              <input
                type="text"
                id={`query${idx}`}
                value={queries[idx].query}
                onChange={(e) => {
                  setQueries(
                    queries.map((q, i) =>
                      i === idx ? { ...q, query: e.target.value } : q
                    )
                  );
                }}
              />
            </div>
            <div>
              {idx === 0 && <div></div>}
              {idx === queries.length - 1 ? (
                <Button
                  aria-role="button"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setQueries([...queries, { name: "", query: "" }]);
                  }}
                >
                  <PlusIcon />
                </Button>
              ) : (
                <div>
                  <Button
                    aria-role="button"
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setQueries(queries.filter((q, i) => i !== idx));
                    }}
                  >
                    <MinusIcon />
                  </Button>
                </div>
              )}
            </div>
          </InputRow>
        ))}
      </div>
      {queries[0].query && queries[0].name && (
        <SubmitArea>
          <h3>2. Generate chart</h3>
          <SubmitButton
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              getGraphData();
            }}
          >
            {fetching ? "Fetching..." : "Submit"}
          </SubmitButton>
        </SubmitArea>
      )}
    </FormWrap>
  );
};

export default QueryForm;
