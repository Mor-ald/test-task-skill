/**
 * Type of table item data (call)
 */
export type TableItem = {
	id: number; // id
	partnership_id: string; // id партнера
	partner_data: {
		id: string;
		name: string;
		phone: string;
	};
	date: string; // Дата и время звонка
	date_notime: string;
	time: number; // Длительность звонка
	from_number: string; // Номер с которого был звонок
	from_extension: string;
	to_number: string;
	to_extension: string;
	is_skilla: number;
	status: string;
	record: string; // id записи звонка
	line_number: string;
	line_name: string;
	in_out: number | null; // Признак входящего или исходящего звонка (1 - входящий звонок, 0 - исходящий звонок, пусто - все звонки)
	from_site: number;
	source: string; // Источник
	errors: [];
	disconnect_reason: string;
	results: [];
	stages: [];
	abuse: {
		date: string;
		person_name: string;
		message: string;
		support_read_status: number;
		support_answer_status: number;
		answers: [
			{
				message: string;
				from_support: number;
				support_read_status: number;
				person_read_status: number;
			},
		];
	};
	contact_name: string; // Имя абонента
	contact_company: string; // Название компании
	person_id: number;
	person_name: string;
	person_surname: string;
	person_avatar: string; // Аватар
};

/**
 * Type of table data (calls)
 */
export type TableData = TableItem[];
