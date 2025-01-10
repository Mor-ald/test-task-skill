import { observer } from "mobx-react-lite";
import { FC, useCallback, useEffect, useState } from "react";
import CallsStore from "./CallsStore.ts";
import { fetchCallsData } from "../../services/FetchData.ts";
import getDatesByInterval from "../../utils/GetDatesByInterval.ts";
import { toJS } from "mobx";

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
			<div className={"filter-container"}></div>
			<div className={"table-container"}></div>
		</div>
	);
});

export default Calls;
