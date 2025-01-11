import styles from "./Evaluation.module.css";

import { observer } from "mobx-react-lite";
import IEvaluation from "./IEvaluation";
import { FC } from "react";

/**
 * Evaluation component
 */
const Evaluation: FC<IEvaluation> = observer(({ value }) => {
	const textOptions = {
		3: "Плохо",
		4: "Хорошо",
		5: "Отлично",
	};

	return <span className={styles[`ev-${value}`]}>{textOptions[value]}</span>;
});

export default Evaluation;
