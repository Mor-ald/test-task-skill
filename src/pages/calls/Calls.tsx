import styles from "./Calls.module.css";

import { observer } from "mobx-react-lite";
import { FC, useCallback, useEffect, useState } from "react";
import CallsStore from "./CallsStore.ts";
import { fetchCallsData } from "../../services/FetchData.ts";
import getDatesByInterval from "../../utils/GetDatesByInterval.ts";
import { toJS } from "mobx";
import TypeSelector from "../../components/type-selector/TypeSelector.tsx";
import ResetFilters from "../../components/reset-filters/ResetFilters.tsx";
import DatePicker from "../../components/date-picker/DatePicker.tsx";

/**
 * Calls page
 */
const Calls: FC = observer(() => {
	const [store] = useState(() => CallsStore);

	// Load calls data
	const loadData = useCallback(async () => {
		const [sD, eD] = getDatesByInterval(toJS(store.selectedDatesInterval));
		const data = await fetchCallsData(sD, eD);

		store.onChangeData(data);
	}, [store]);

	useEffect(() => {
		loadData().then();
	}, [loadData]);

	return (
		<div>
			<div className={styles["filters-container"]}>
				<div className={styles["filters-call"]}>
					<TypeSelector value={toJS(store.selectedCallType)} onChangeValue={store.onChangeCallType} />
					<ResetFilters value={toJS(store.selectedCallType)} onChangeValue={store.onChangeCallType} />
				</div>
				<div>
					<DatePicker value={toJS(store.selectedDatesInterval)} onChangeValue={store.onChangeDatesInterval} />
				</div>
			</div>
			<div className={"table-container"}></div>
		</div>
	);
});

export default Calls;
