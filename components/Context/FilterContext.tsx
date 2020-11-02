import React, { createContext, useReducer } from "react";
import { FilterActionTypes, RouteCategories } from "../../types";

type FilterStateItem = {
  [key: string]: boolean;
};

type FilterActions = FilterActionTypes.ALL | FilterActionTypes.SINGLE;

type FilterAction = {
  type: FilterActions;
  key?: RouteCategories;
  isChecked?: boolean;
};

interface ContextProps {
  filterState: FilterStateItem;
  filterStateDispatch: React.Dispatch<FilterAction>;
}

export const allStateKey = "All";

const FilterContext = createContext<Partial<ContextProps>>({});

const FilterContextProvider = ({ children }) => {
  const initialFilterState: FilterStateItem = Object.values(
    RouteCategories
  ).reduce(
    (acc: Object, curr: string): FilterStateItem => {
      return {
        [curr]: true,
        ...acc,
      } as FilterStateItem;
    },
    {
      [allStateKey]: true,
    } as any
  );

  const filterReducer: React.Reducer<FilterStateItem, FilterAction> = (
    state: FilterStateItem,
    action: FilterAction
  ): FilterStateItem => {
    switch (action.type) {
      case FilterActionTypes.ALL:
        // Set all state entries to be "true"
        const newState = Object.keys(state).reduce((acc, curr) => {
          return {
            [curr]: true,
            ...acc,
          };
        }, {});

        return newState;
      case FilterActionTypes.SINGLE:
        state[action.key] = action.isChecked;

        // Filter the single filers and return if they're set to true
        const activeSingleFilters: Array<boolean> = Object.entries(state)
          .filter(([key]: [string, boolean]): boolean => {
            return key !== allStateKey;
          })
          .reduce((acc, [, value]: [string, boolean]) => {
            return [value, ...acc];
          }, []);

        // Check the length of the active single filters
        // Sets ALL to true if every single filter is active
        state[allStateKey] =
          activeSingleFilters.length && activeSingleFilters.every((i) => i);

        return {
          ...state,
        };
      default:
        return state;
    }
  };

  const [filterState, filterStateDispatch] = useReducer(
    filterReducer,
    initialFilterState
  );

  return (
    <FilterContext.Provider
      value={{
        filterState,
        filterStateDispatch,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export { FilterContext, FilterContextProvider };
