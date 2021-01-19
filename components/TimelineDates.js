import React from "react";
import styled from "styled-components";
import Day from "./Day";
import { media } from "../utils/media";

const DatesWrap = styled.div`
  position: relative;
  z-index: 100000;
  margin: 0;

  border-bottom: 1px solid var(--color-faint);
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
              system is adopted.
            </p>
          </li>
        </ul>
      </Day>
      <Day date={`2020-12-03`}>
        <ul>
          <li>
            <p>
              With a 7 day rolling average of 519 cases per 100k people, Medway
              has the highest case rate in England.
            </p>
          </li>
        </ul>
      </Day>
      <Day date={`2020-12-04`}>
        <ul>
          <li>
            <p>
              Within days it is clear that case rates in Tier Two areas are
              rising faster than in Tier Three areas.
            </p>
          </li>
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
              While case rates are starting to fall in Tier 3 areas, cases are
              continuing to rise in Tier 2 areas.
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
          <li>
            <p>Cases continue to rise accross all Tier Two areas.</p>
          </li>
        </ul>
      </Day>
      <Day date={`2020-12-10`}>
        <ul>
          <li>
            <p>
              Meanwhile, the majority of areas in Tier Three see their case
              rates decrease or stay the same.
            </p>
          </li>
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
          <li>
            <p>
              The majority of Tier Two areas now have a higher case rate than
              the median Tier Three case rate.
            </p>
          </li>
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
              Three. All of these areas started this period in Tier Two and
              these regions now make up the majority of the worst affected areas
              in the country.
            </p>
          </li>
        </ul>
      </Day>
      <Day date={`2020-12-17`}>
        <ul>
          <li>
            <p>
              Thirty four of the thirty six areas with the highest case rates
              were initially placed into Tier Two.
            </p>
          </li>
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
              Just three days after the last tier changes several more south
              eastern areas move from Tier Two into Tier Three, while two areas
              which began in Tier Three are able to be moved to Tier Two.
            </p>
          </li>
        </ul>
      </Day>
      <Day date={`2020-12-20`} update>
        <ul>
          <li>
            <h3>Tiers updated:</h3>
            <p>
              Areas within London, the South East and the East of England go
              into new stricter Tier Four restrictions.
            </p>
          </li>
        </ul>
      </Day>
      <Day date={`2020-12-21`}>
        <ul>
          <li>
            <p>
              All but two of the areas now in Tier Four were initially placed
              into the more lax Tier Two restrictions when lockdown ended.
            </p>
          </li>
        </ul>
      </Day>
      <Day date={`2020-12-22`}>
        <ul>
          <li>
            <p>
              Conversely, all but two of the areas which were initially placed
              in Tier Three (the highest when lockdown ended) have managed to
              remain in Tier Three or lower.
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
          <li>
            <p>
              One of the few areas in Tier Four to begin trending downwards is
              Medway, which was never placed into the more lax Tier Two
              restrictions.
            </p>
          </li>
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
              Several more areas are moved into higher tiers after rules are
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
          <li>
            <p>
              By the 29th December cases are beginnng to rise rapidly accross
              all regions.
            </p>
          </li>
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
              An additional 43 areas are moved into Tier Four restrictions,
              meanaing a total of 44 million people in England are now living
              under the toughest measures
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
          <li>
            <p>
              Cases continue to rise rapidly with the new Covid variant and the
              relaxing of restrictions at Christmas appearing to pay a part.
            </p>
          </li>
        </ul>
      </Day>
      <Day date={`2021-01-03`}>
        <ul>
          <li></li>
        </ul>
      </Day>
      <Day date={`2021-01-04`}>
        <ul>
          <li>
            <p>
              The Prime Minister announces that a new lockdown will begin at
              Midnight.
            </p>
          </li>
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
