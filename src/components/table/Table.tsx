import styles from "./Table.module.css";

import { observer } from "mobx-react-lite";
import { ITable } from "./ITable";
import { FC, useCallback, useEffect, useState } from "react";
import TableStore from "./TableStore";
import { TableItem } from "../../ts/TableData";
import createDate from "../../utils/CreateDate";
import { toJS } from "mobx";
import Evaluation from "../evaluation/Evaluation";

const Table: FC<ITable> = observer(({ callsApiData, callType }) => {
	const [store] = useState(() => TableStore);

	useEffect(() => {
		switch (callType) {
			case "all": {
				store.onChangeData(callsApiData.results);
				break;
			}
			case "incoming": {
				store.onChangeData(callsApiData.results.filter((i) => i.in_out === 1));
				break;
			}
			case "outgoing": {
				store.onChangeData(callsApiData.results.filter((i) => i.in_out === 0));
				break;
			}
		}
	}, [callType, callsApiData.results, store]);

	const ArrowDown = useCallback(() => {
		return (
			<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<g clipPath="url(#clip0_1_863)">
					<path opacity="0.8" d="M7.41 8.58997L12 13.17L16.59 8.58997L18 9.99997L12 16L6 9.99997L7.41 8.58997Z" fill="#ADBFDF" />
				</g>
				<defs>
					<clipPath id="clip0_1_863">
						<rect width="24" height="24" fill="white" />
					</clipPath>
				</defs>
			</svg>
		);
	}, []);

	const TypeCell = useCallback(({ item }: { item: TableItem }) => {
		switch (item.in_out) {
			case 1:
				return (
					<td>
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M18.5217 7.17704L17.3447 6L7.66957 15.6751V10.1739H6V18.5217H14.3478V16.8522H8.84661L18.5217 7.17704Z" fill="#002CFB" />
						</svg>
					</td>
				);
			case 2:
				return (
					<td>
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M6.00023 17.3447L7.17728 18.5217L16.8524 8.8466V14.3478H18.522V5.99999L10.1741 5.99999V7.66955L15.6754 7.66955L6.00023 17.3447Z"
								fill="#28A879"
							/>
						</svg>
					</td>
				);
			default:
				return <td></td>;
		}
	}, []);

	const DateCell = useCallback(({ item }: { item: TableItem }) => {
		return <td>{item.date.slice(11, 16)}</td>;
	}, []);

	const AvatarCell = useCallback(({ item }: { item: TableItem }) => {
		return (
			<td>
				<img src={item.person_avatar} alt="avatar" />
			</td>
		);
	}, []);

	const CallCell = useCallback(({ item }: { item: TableItem }) => {
		const content = [];

		if (item.contact_name) content.push(item.contact_name);
		if (item.contact_company) content.push(item.contact_company);
		if (item.from_number) content.push(item.from_number);

		return <td>{content.map((c, i) => (i === 0 ? <div>{c}</div> : <div className={styles["call-cell-content-secondary"]}>{c}</div>))}</td>;
	}, []);

	const SourceCell = useCallback(({ item }: { item: TableItem }) => {
		return <td>{item.source}</td>;
	}, []);

	const EvaluationCell = useCallback(() => {
		const randomNumber = Math.floor(Math.random() * 3) + 3; // from 3 to 5

		return (
			<td>
				<Evaluation value={randomNumber as 3 | 4 | 5} />
			</td>
		);
	}, []);

	const CallTimeCell = useCallback(({ item }: { item: TableItem }) => {
		const min = `${Math.floor(item.time / 60)}`;
		const sec = item.time % 60 < 10 ? `0${item.time % 60}` : `${item.time % 60}`;
		return <td>{min + ":" + sec}</td>;
	}, []);

	/**
	 * Thead of table
	 */
	const TableThead = useCallback(() => {
		return (
			<thead className={styles["table-thead"]}>
				<tr>
					<th className={styles["table-type-cell"]}>Тип</th>
					<th className={styles["table-date-cell"]}>
						<div className={styles["table-sort"]}>
							Время
							<ArrowDown />
						</div>
					</th>
					<th className={styles["table-avatar-cell"]}>Сотрудник</th>
					<th className={styles["table-call-cell"]}>Звонок</th>
					<th className={styles["table-source-cell"]}>Источник</th>
					<th className={styles["table-eval-cell"]}>Оценка</th>
					<th className={styles["table-time-cell"]}>
						<div className={styles["table-sort"]}>
							Длительность
							<ArrowDown />
						</div>
					</th>
				</tr>
			</thead>
		);
	}, [ArrowDown]);

	/**
	 * Tbody of table
	 */
	const TableTBody = useCallback(() => {
		const dateNow = new Date();
		dateNow.setDate(dateNow.getDate() - 1); // yesterday
		const strDateY = createDate(dateNow);
		dateNow.setDate(dateNow.getDate() - 1); // two days ago
		const strDateTDA = createDate(dateNow);

		const dates = Array.from(new Set(toJS(store.data).map((item) => item.date_notime)));

		return (
			<tbody className={styles["table-tbody"]}>
				{dates.map((d, i) => {
					const items = toJS(store.data).filter((item) => item.date_notime === d);
					const itemsQuantity = items.length;
					const date = d === strDateY ? "Вчера" : d === strDateTDA ? "Позавчера" : d;

					return (
						<>
							{i !== 0 && (
								<tr className={styles["table-date-row"]}>
									<td colSpan={7}>
										<span>{date}</span>
										<sup>{itemsQuantity}</sup>
									</td>
								</tr>
							)}
							{items.map((item) => (
								<tr key={item.id}>
									<TypeCell item={item} />
									<DateCell item={item} />
									<AvatarCell item={item} />
									<CallCell item={item} />
									<SourceCell item={item} />
									<EvaluationCell />
									<CallTimeCell item={item} />
								</tr>
							))}
						</>
					);
				})}
			</tbody>
		);
	}, [AvatarCell, CallCell, CallTimeCell, DateCell, EvaluationCell, SourceCell, TypeCell, store.data]);

	return (
		<table className={styles["table"]}>
			<TableThead />
			<TableTBody />
		</table>
	);
});

export default Table;
