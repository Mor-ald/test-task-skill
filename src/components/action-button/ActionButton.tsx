import styles from "./ActionButton.module.css";

import { FC } from "react";
import { IActionButton } from "./IActionButton.ts";
import { observer } from "mobx-react-lite";

/**
 * ActionButton component
 */
const ActionButton: FC<IActionButton> = observer(({ children, active }) => {
	return (
		<div className={styles["action-button"]}>
			<span className={styles["action-button-content"]}>{children}</span>
			{active ? (
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<g clipPath="url(#clip0_1_866)">
						<path d="M12 8L6 14L7.41 15.41L12 10.83L16.59 15.41L18 14L12 8Z" fill="#002CFB" />
					</g>
					<defs>
						<clipPath id="clip0_1_866">
							<rect width="24" height="24" fill="white" />
						</clipPath>
					</defs>
				</svg>
			) : (
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
			)}
		</div>
	);
});

export default ActionButton;
