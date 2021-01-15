import React from "react";
import styled from "styled-components";
import Day from "./Day";
import { media } from "../utils/media";

const DatesWrap = styled.div`
  position: relative;
  z-index: 100000;
  margin-left: 20px;
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
      <Day date={`2020-12-03`}></Day>
      <Day date={`2020-12-04`}>
        <ul>
          <li>
            Figures from the Office for National Statistics indicate COVID-19
            rates are falling in every part of England apart from the North
            East, with 1 in 105 people having the virus in the week up to 28
            November, down from 1 in 85 the week before.
          </li>
        </ul>
      </Day>
      <Day date={`2020-12-05`}>
        <ul>
          <li>
            Following criticism that the mass COVID testing introduced to tier 3
            areas may not be accurate, Dr Susan Hopkins, chief medical adviser
            to NHS Test and Trace, defends the tests, saying they could identify
            many cases of infection in people without symptoms.
          </li>
        </ul>
      </Day>
      <Day date={`2020-12-06`}>
        <ul>
          <li></li>
        </ul>
      </Day>
      <Day date={`2020-12-07`}>
        <ul>
          <li></li>
        </ul>
      </Day>
      <Day date={`2020-12-08`}>
        <ul>
          <li>
            Health Secretary Matt Hancock urges Londoners to adhere to COVID-19
            regulations as cases rise in London.
          </li>
        </ul>
      </Day>
      <Day date={`2020-12-09`}>
        <ul>
          <li>
            Experts have called for London to be placed into tier 3 COVID
            restrictions to avoid a spike in cases over Christmas after figures
            indicated a spike in cases in London on 2 December
          </li>
        </ul>
      </Day>
      <Day date={`2020-12-10`}>
        <ul>
          <li>
            Figures from NHS England show the number of patients in England
            waiting over a year for routine hospital care is now 100 times
            higher than before the pandemic.
          </li>
        </ul>
      </Day>
      <Day date={`2020-12-11`}>
        <ul>
          <li>
            Figures from the Office for National Statistics for the week ending
            5 December indicate COVID cases in England are continuing to fall,
            apart from in London and the East of England
          </li>
        </ul>
      </Day>
      <Day date={`2020-12-12`}>
        <ul>
          <li>
            In a letter to Prime Minister Boris Johnson, NHS Providers, the body
            representing hospital trusts in England, warns that relaxing the
            COVID tier system could result in a third wave of the virus at the
            busiest time of year for hospitals.
          </li>
        </ul>
      </Day>
      <Day date={`2020-12-13`}>
        <ul>
          <li></li>
        </ul>
      </Day>
      <Day date={`2020-12-14`}>
        <ul>
          <li>
            Health Secretary Matt Hancock announces that London, most of Essex
            and parts of Hertfordshire will move to tier 3 restrictions from
            Wednesday 16 December following an increase in COVID cases in the
            south east and the identification of a new strain of the virus that
            spreads much quicker.
          </li>
        </ul>
      </Day>
      <Day date={`2020-12-15`}>
        <ul>
          <li>
            Mass testing of secondary school pupils will be greatly increased in
            January with the objective of sending fewer people home. Pupils who
            come into contact with someone testing positive for COVID-19 will be
            offered seven days of tests, while teachers will have weekly tests.
          </li>
        </ul>
      </Day>
      <Day date={`2020-12-16`}>
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
          <li>
            Bedfordshire, Buckinghamshire, Berkshire and Hertfordshire, as well
            as parts of Surrey, East Sussex, Cambridgeshire and Hampshire are to
            be moved from tier two to tier three from Saturday 19 December,
            while Bristol and North Somerset will move from tier three to tier
            two. Herefordshire will be moved from tier two to tier one.
          </li>
        </ul>
      </Day>
      <Day date={`2020-12-18`}>
        <ul>
          <li>
            Prime Minister Boris Johnson says that he hopes to avoid another
            national lockdown for England, but admits COVID cases have risen
            "very much".
          </li>
        </ul>
      </Day>
      <Day date={`2020-12-19`}>
        <ul>
          <li>
            Prime Minister Boris Johnson announces that London, South East and
            East of England are to go into new Tier 4 restrictions from the
            following day. The rules are mostly the same as the national
            restrictions in November, with non-essential retail, hairdressers
            and gyms closing.
          </li>
        </ul>
      </Day>
      <Day date={`2020-12-20`}>
        <ul>
          <li>
            <h3>Tiers updated:</h3>
            <p>
              London, South East and East of England are to go into new Tier 4
            </p>
          </li>
        </ul>
      </Day>
      <Day date={`2020-12-21`}>
        <ul>
          <li>
            Sir Patrick Vallance, the UK's chief scientific adviser, suggests
            that more areas of England will need to go into Tier 4 restrictions
            to combat the new variant of COVID-19.
          </li>
        </ul>
      </Day>
      <Day date={`2020-12-22`}>
        <ul>
          <li>
            England's second lockdown ends at 12.01am, and the second tier
            system is adopted. Gyms, hairdressers and non-essential shops are
            allowed to reopen
          </li>
        </ul>
      </Day>
      <Day date={`2020-12-23`}>
        <ul>
          <li>
            Health Secretary Matt Hancock announces that Sussex, Oxfordshire,
            Suffolk, Norfolk, Cambridgeshire, Hampshire (except the New Forest)
            and parts of Essex and Surrey still in tier three are to be moved to
            tier four restrictions from Boxing Day. Many other areas will move
            up a tier to tiers two and three.[
          </li>
        </ul>
      </Day>
      <Day date={`2020-12-24`}>
        <ul>
          <li>
            Figures released by the Office for National Statistics indicate 1 in
            85 people in England has COVID, with Figures for the week to 18
            December estimating that almost 650,000 people had the virus, up
            from 570,000 the previous week.
          </li>
        </ul>
      </Day>
      <Day date={`2020-12-25`}>
        <ul>
          <li>Rules relaxed briefly for Christmas Day</li>
        </ul>
      </Day>
      <Day date={`2020-12-26`}>
        <ul>
          <li>
            Tier four restrictions are extended in England after rules are
            briefly relaxed for Christmas Day.
          </li>
        </ul>
      </Day>
      <Day date={`2020-12-27`}>
        <ul>
          <li>
            Police break up an illegal rave attended by 100 people in the
            Shudehill area of Manchester.
          </li>
        </ul>
      </Day>
      <Day date={`2020-12-28`}>
        <ul>
          <li>
            Cabinet Office Minister Michael Gove says he is confident the
            staggered return of secondary schools can happen in January.
          </li>
        </ul>
      </Day>
      <Day date={`2020-12-29`}>
        <ul>
          <li>
            It is reported that COVID patients are being treated in ambulances
            outside hospitals in north east London as pressure grows on health
            trusts in London.
          </li>
        </ul>
      </Day>
      <Day date={`2020-12-30`}>
        <ul>
          <li>
            Tier four measures are extended to more parts of England from
            midnight, with the Midlands, North East, parts of the North West and
            South West joining London and the South East in the toughest
            restrictions.
          </li>
        </ul>
      </Day>
      <Day date={`2020-12-31`}>
        <ul>
          <li>
            As more areas of England enter tier four restrictions, a total of 44
            million people are now living under the toughest measures
          </li>
        </ul>
      </Day>
      <Day date={`2021-01-01`}>
        <ul>
          <li>
            The UK government announces that all primary schools in London will
            remain closed for the start of the winter term.
          </li>
        </ul>
      </Day>
      <Day date={`2021-01-02`}>
        <ul>
          <li>
            Police chiefs have called for police officers to be given priority
            for COVID vaccinations after reports that 1,300 Metropolitan Police
            officers are absent from work because of the virus.
          </li>
        </ul>
      </Day>
      <Day date={`2021-01-03`}>
        <ul>
          <li>
            Leader of the Opposition Sir Keir Starmer calls for a national
            lockdown to be announced within 24 hours in order to tackle the
            rising number of COVID cases
          </li>
          <li>
            Prime Minister Boris Johnson has urged parents of primary age
            children to send them to school the following day if their school is
            open, saying there is "no doubt in my mind that schools are safe"
          </li>
        </ul>
      </Day>
      <Day date={`2021-01-04`}>
        <ul>
          <li>
            Prime Minister Boris Johnson makes a televised address in which he
            announces another lockdown for England, with rules similar to those
            in March 2020
          </li>
        </ul>
      </Day>
      <Day date={`2021-01-05`}>
        <ul>
          <li>
            The UK records over 60,000 positive cases of COVID in one day,[18]
            the highest ever, with over 50,000 of those cases being from
            England.
          </li>
        </ul>
      </Day>
      <Day date={`2021-01-06`}>
        <ul>
          <li>
            With the third lockdown officially under way, Boris Johnson says he
            cannot guarantee that all children will be back at school before the
            summer holidays
          </li>
        </ul>
      </Day>
    </DatesWrap>
  );
};

export default DatesContainer;
