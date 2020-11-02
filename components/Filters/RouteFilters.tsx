import React, { useContext } from "react";
import { FilterContext, allStateKey } from "../Context/FilterContext";
import { FilterActionTypes, RouteCategories } from "../../types";

export const RouteFilters: React.FC = ({}) => {
  const { filterState, filterStateDispatch } = useContext(FilterContext);

  return (
    <>
      <div>
        <input
          type="checkbox"
          onChange={() => {
            filterStateDispatch({
              type: FilterActionTypes.ALL,
            });
          }}
          checked={filterState?.[allStateKey]}
        />
        {allStateKey}
      </div>

      {Object.values(RouteCategories).map((category) => (
        <div key={category}>
          <input
            type="checkbox"
            onChange={() => {
              filterStateDispatch({
                type: FilterActionTypes.SINGLE,
                key: category,
                isChecked: !filterState?.[category],
              });
            }}
            checked={filterState?.[category]}
          />
          {category}
        </div>
      ))}
    </>
  );
};
