import { useContext } from "react";
import { FilterContext, allStateKey } from "../Context/FilterContext";
import { FilterActionTypes, RouteCategories } from "../../types";

import styles from "./RouteFilters.module.css";

export const RouteFilters: React.FC = () => {
  const { filterState, filterStateDispatch } = useContext(FilterContext);

  return (
    <>
      <div className={styles.filter}>
        <input
          className={styles.checkbox}
          type="checkbox"
          onChange={() => {
            filterStateDispatch({
              type: FilterActionTypes.ALL,
            });
          }}
          checked={filterState?.[allStateKey]}
        />
        <span className={styles.checkboxLabel}>{allStateKey}</span>
      </div>

      {Object.values(RouteCategories).map((category) => (
        <div key={category} className={styles.filter}>
          <input
            className={styles.checkbox}
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
          <span className={styles.checkboxLabel}>{category}</span>
        </div>
      ))}
    </>
  );
};
