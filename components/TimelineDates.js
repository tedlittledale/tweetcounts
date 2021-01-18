import React from "react";
import styled from "styled-components";
import Day from "./Day";
import { media } from "../utils/media";

const DatesWrap = styled.div`
  position: relative;
  z-index: 100000;
  margin: 0 20px;
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
            England's second lockdown ends at 12.01am, and the second tier
            system is adopted. Gyms, hairdressers and non-essential shops are
            allowed to reopen
          </li>
        </ul>
      </Day>
      <Day date={`2020-12-03`}>
        <ul>
          <li>
            With a 7 day rolling average of 519 cases per 100k people, Medway
            has the highest case rate in England{" "}
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
            Several of the tier 3 areas are starting to show a decline in cases.
          </li>
        </ul>
      </Day>
      <Day date={`2020-12-07`} highlight={0}>
        <ul>
          <li>Meanwhile most Tier 2 areas are beginning to rise quickly </li>
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
            London, and parts of Essex and Hertfordshire, are placed into tier
            three of England's COVID tier system following an increase in case
            numbers in those areas
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
            Bedfordshire, Buckinghamshire, Berkshire and Hertfordshire, as well
            as parts of Surrey, East Sussex, Cambridgeshire and Hampshire move
            from tier two to tier three from Saturday 19 December, while Bristol
            and North Somerset will move from tier three to tier two.
            Herefordshire will be moved from tier two to tier one.
          </li>
        </ul>
      </Day>
      <Day date={`2020-12-20`} update>
        <ul>
          <li>
            <h3>Tiers updated:</h3>
            <p>
              London, South East and East of England go into new Tier 4
              restrictions
            </p>
          </li>
        </ul>
      </Day>
      <Day date={`2020-12-21`}>
        <ul>
          <li>All but two of the tier 4 regions started off in tier 2 </li>
        </ul>
      </Day>
      <Day date={`2020-12-22`}>
        <ul>
          <li>
            The vast majority of areas which began in tier 3 (the highest when
            lockdown ended) remained in tier 3 or lower
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
            Tier four restrictions are extended in England after rules are
            briefly relaxed for Christmas Day.
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
            43 areas are moved into tier 4 restrictions, meanaing a total of 44
            million people in England are now living under the toughest measures
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
          <li>A third lockdown begins for all regions.</li>
        </ul>
      </Day>
    </DatesWrap>
  );
};

export default DatesContainer;
