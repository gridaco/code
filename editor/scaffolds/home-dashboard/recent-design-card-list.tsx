import styled from "@emotion/styled";
import router from "next/router";
import React, { useEffect, useState } from "react";
import { LastusedDisplayType } from "repository";
import {
  BuiltinDemoFileCard,
  Cards,
  ImportNewDesignCard,
} from "components/home/cards";

export function RecentDesignCardList({
  recents,
}: {
  recents: LastusedDisplayType[];
}) {
  const oncardclick = (id: string, d) => {
    console.log("click", id);
    router.push(`/to-code/${id}`); // fixme id is not a param
  };

  const also_show_demo = false; // recents.length <= 2; // DISABLED

  return (
    <ListWrap>
      <ImportNewDesignCard key={"importnew"} />
      {also_show_demo && <BuiltinDemoFileCard key={"builtin"} />}
      {recents.map((recentDesign) => {
        switch (recentDesign.type) {
          case "file": {
            return <Cards.File key={recentDesign.key} data={recentDesign} />;
          }
          default: {
            throw new Error("unknown type");
          }
        }
      })}
    </ListWrap>
  );
}

const ListWrap = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;
