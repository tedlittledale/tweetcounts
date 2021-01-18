import React from "react";
import styled from "styled-components";
import Day from "./Day";
import { media } from "../utils/media";

const DatesWrap = styled.div`
  position: relative;
  z-index: 100000;
  margin: 0;
  border-right: 1px solid var(--color-faint);
  ${media.phablet`padding-top:300px`}
  ${media.phone`padding-top:300px`}
`;

const DatesContainer = () => {
  return (
    <DatesWrap>
      {/* <Day date={`2020-12-01`}>
        <ul>
          <li>
            MPs vote 291–78 in favour of introducing England's tough new COVID
            tier system, with 55 backbench Conservatives voting against the
            government, while another 16 abstain.
          </li>
        </ul>
      </Day> */}
      <Day date={`2020-12-02`} update>
        <h3>Tier update</h3>
        <ul>
          <li>
            <h3>Lockdown ends:</h3>
            <p>
              England's second lockdown ends at 12.01am, and the second tier
              system is adopted. Gyms, hairdressers and non-essential shops are
              allowed to reopen
            </p>
          </li>
        </ul>
      </Day>
      <Day date={`2020-12-03`}>
        <ul>
          <li>
            <p>
              With a 7 day rolling average of 519 cases per 100k people, Medway
              has the highest case rate in England
            </p>
          </li>
        </ul>
      </Day>
      <Day date={`2020-12-04`}>
        <ul>
          <li></li>
        </ul>
      </Day>
      <Day date={`2020-12-05`}>
        <ul>
          <li></li>
        </ul>
      </Day>
      <Day date={`2020-12-06`}>
        <ul>
          <li>
            <p>
              Several of the Tier Three areas are starting to show a decline in
              cases.
            </p>
          </li>
        </ul>
      </Day>
      <Day date={`2020-12-07`} highlight={0}>
        <ul>
          <li>
            <p>Meanwhile most Tier 2 areas are beginning to rise quickly </p>
          </li>
        </ul>
      </Day>
      <Day date={`2020-12-08`}>
        <ul>
          <li></li>
        </ul>
      </Day>
      <Day date={`2020-12-09`}>
        <ul>
          <li></li>
        </ul>
      </Day>
      <Day date={`2020-12-10`}>
        <ul>
          <li></li>
        </ul>
      </Day>
      <Day date={`2020-12-11`}>
        <ul>
          <li></li>
        </ul>
      </Day>
      <Day date={`2020-12-12`}>
        <ul>
          <li></li>
        </ul>
      </Day>
      <Day date={`2020-12-13`}>
        <ul>
          <li></li>
        </ul>
      </Day>
      <Day date={`2020-12-14`}>
        <ul>
          <li></li>
        </ul>
      </Day>
      <Day date={`2020-12-15`}>
        <ul>
          <li></li>
        </ul>
      </Day>
      <Day date={`2020-12-16`} update>
        <ul>
          <li>
            <h3>Tiers updated:</h3>
            <p>
              London, and parts of Essex and Hertfordshire, are placed into Tier
              Three of England's COVID tier system following an increase in case
              numbers in those areas
            </p>
          </li>
        </ul>
      </Day>
      <Day date={`2020-12-17`}>
        <ul>
          <li></li>
        </ul>
      </Day>
      <Day date={`2020-12-18`}>
        <ul>
          <li></li>
        </ul>
      </Day>
      <Day date={`2020-12-19`} update>
        <ul>
          <li>
            <h3>Tiers updated:</h3>
            <p>
              Several more south eastern areas move from Tier Two to Tier Three.
              Bristol and North Somerset move from Tier three to Tier two.
              Herefordshire will be moved from Tier Two to Tier One.
            </p>
          </li>
        </ul>
      </Day>
      <Day date={`2020-12-20`} update>
        <ul>
          <li>
            <h3>Tiers updated:</h3>
            <p>
              London, South East and East of England go into new Tier Four
              restrictions
            </p>
          </li>
        </ul>
      </Day>
      <Day date={`2020-12-21`}>
        <ul>
          <li>
            <p>
              All but two of the areas now in Tier Four were initially placed in
              Tier 2 when lockdown ended.
            </p>
          </li>
        </ul>
      </Day>
      <Day date={`2020-12-22`}>
        <ul>
          <li>
            <p>
              Conversely, all but two of the areas which were initially placed
              in Tier Three (the highest when lockdown ended) at this point
              remained in Tier Three or lower.
            </p>
          </li>
        </ul>
      </Day>
      <Day date={`2020-12-23`}>
        <ul>
          <li></li>
        </ul>
      </Day>
      <Day date={`2020-12-24`}>
        <ul>
          <li></li>
        </ul>
      </Day>
      <Day date={`2020-12-25`}>
        <ul>
          <li></li>
        </ul>
      </Day>
      <Day date={`2020-12-26`} update>
        <ul>
          <li>
            <p>
              Tier four restrictions are extended in England after rules are
              briefly relaxed for Christmas Day.
            </p>
          </li>
        </ul>
      </Day>
      <Day date={`2020-12-27`}>
        <ul>
          <li></li>
        </ul>
      </Day>
      <Day date={`2020-12-28`}>
        <ul>
          <li></li>
        </ul>
      </Day>
      <Day date={`2020-12-29`}>
        <ul>
          <li></li>
        </ul>
      </Day>
      <Day date={`2020-12-30`}>
        <ul>
          <li></li>
        </ul>
      </Day>
      <Day date={`2020-12-31`} update>
        <ul>
          <li>
            <p>
              43 areas are moved into Tier Four restrictions, meanaing a total
              of 44 million people in England are now living under the toughest
              measures
            </p>
          </li>
        </ul>
      </Day>
      <Day date={`2021-01-01`}>
        <ul>
          <li></li>
        </ul>
      </Day>
      <Day date={`2021-01-02`}>
        <ul>
          <li></li>
        </ul>
      </Day>
      <Day date={`2021-01-03`}>
        <ul>
          <li></li>
        </ul>
      </Day>
      <Day date={`2021-01-04`}>
        <ul>
          <li></li>
        </ul>
      </Day>
      <Day date={`2021-01-05`} update>
        <ul>
          <li>
            <p>A third lockdown begins for all regions.</p>
          </li>
        </ul>
      </Day>
    </DatesWrap>
  );
};

export default DatesContainer;
