import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Select } from '../select';
import styles from './ArticleParamsForm.module.scss';
import { FormEvent, useState } from 'react';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import classNames from 'classnames';
import { useOutsideClickClose } from './hooks/useOutsideClickClose';

type ArticleProps = {
	options: ArticleStateType;
	submit(options: ArticleStateType): void;
};

export const ArticleParamsForm = (props: ArticleProps) => {
	const {
		options: {
			fontFamilyOption,
			fontColor,
			backgroundColor,
			contentWidth,
			fontSizeOption,
		},
		submit,
	} = props;

	const [isOpen, setIsOpen] = useState(false);

	const [selectedFont, setSelectedFont] = useState(fontFamilyOption);
	const [selectedFontSize, setSelectedFontSize] = useState(fontSizeOption);
	const [selectedFontColor, setSelectedFontColor] = useState(fontColor);
	const [selectedBagroundColor, setSelectedBagroundColor] =
		useState(backgroundColor);
	const [selectcontentWidth, setSelectedContentWidth] = useState(contentWidth);

	const outsideClickCloser = useOutsideClickClose(() => {
		setIsOpen(false);
	});

	const handleReset = () => {
		setSelectedFont(fontFamilyOptions[0]);
		setSelectedFontSize(fontSizeOptions[0]);
		setSelectedFontColor(fontColors[0]);
		setSelectedBagroundColor(backgroundColors[0]);
		setSelectedContentWidth(contentWidthArr[0]);
		submit({
			fontFamilyOption: fontFamilyOptions[0],
			fontColor: fontColors[0],
			backgroundColor: backgroundColors[0],
			contentWidth: contentWidthArr[0],
			fontSizeOption: backgroundColors[0],
		});
	};

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();
		submit({
			fontFamilyOption: selectedFont,
			fontColor: selectedFontColor,
			backgroundColor: selectedBagroundColor,
			contentWidth: selectcontentWidth,
			fontSizeOption: selectedFontSize,
		});
	};

	const handleClickOpen = () => {
		setIsOpen(!isOpen);
	};

	return (
		<>
			<ArrowButton onClick={handleClickOpen} isOpen={isOpen} />
			<aside
				className={classNames(
					styles.container,
					isOpen && styles.containerOpen
				)}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					ref={outsideClickCloser}>
					<h2 className={styles.heading}>Задайте параметры</h2>
					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						onChange={setSelectedFont}
						selected={selectedFont}
					/>
					<RadioGroup
						title='размер шрифта'
						selected={selectedFontSize}
						name='radio'
						onChange={setSelectedFontSize}
						options={fontSizeOptions}
					/>
					<Select
						title='Цвет шрифта'
						options={fontColors}
						onChange={setSelectedFontColor}
						selected={selectedFontColor}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						options={backgroundColors}
						onChange={setSelectedBagroundColor}
						selected={selectedBagroundColor}
					/>
					<Select
						title='Ширина контента'
						options={contentWidthArr}
						onChange={setSelectedContentWidth}
						selected={selectcontentWidth}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={handleReset} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
