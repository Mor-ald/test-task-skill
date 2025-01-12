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
import Table from "../../components/table/Table.tsx";
import { DatesInterval } from "../../ts/DatesInterval.ts";

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

	// Update data when select new interval
	const onPickNewDatesInterval = useCallback(
		(interval: DatesInterval) => {
			store.onChangeDatesInterval(interval);
			loadData().then();
		},
		[loadData, store],
	);

	useEffect(() => {
		loadData().then();
	}, [loadData]);

	return (
		<div className={styles["calls"]}>
			<div className={styles["filters-container"]}>
				<div className={styles["filters-call"]}>
					<TypeSelector value={toJS(store.selectedCallType)} onChangeValue={store.onChangeCallType} />
					<ResetFilters value={toJS(store.selectedCallType)} onChangeValue={store.onChangeCallType} />
				</div>
				<div>
					<DatePicker value={toJS(store.selectedDatesInterval)} onChangeValue={onPickNewDatesInterval} />
				</div>
			</div>
			<div className={styles["table-container"]}>
				{toJS(store.callsAPIData) ? <Table callsApiData={toJS(store.callsAPIData!)} callType={toJS(store.selectedCallType)} /> : <div>Загрузка...</div>}
			</div>
		</div>
	);
});

export default Calls;
