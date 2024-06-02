import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';
import classNames from 'classnames';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

export const ArrowButton = ({
	onClick,
	isOpen,
}: {
	onClick: OnClick;
	isOpen?: boolean;
}) => {
	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			onClick={onClick}
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={classNames(styles.container, isOpen && styles.containerOpen)}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={classNames(styles.arrow, isOpen && styles.arrowOpen)}
			/>
		</div>
	);
};
