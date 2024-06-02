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
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { useOutsideClickClose } from './hooks/useOutsideClickClose';
import { Text } from '../text/Text';
import clsx from 'clsx';

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

	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const [selectedFont, setSelectedFont] = useState(fontFamilyOption);
	const [selectedFontSize, setSelectedFontSize] = useState(fontSizeOption);
	const [selectedFontColor, setSelectedFontColor] = useState(fontColor);
	const [selectedBagroundColor, setSelectedBagroundColor] =
		useState(backgroundColor);
	const [selectcontentWidth, setSelectedContentWidth] = useState(contentWidth);

	const outsideClickCloser = useOutsideClickClose(() => {
		setIsMenuOpen(false);
	}, isMenuOpen);

	const handleReset = () => {
		setSelectedFont(defaultArticleState.fontFamilyOption);
		setSelectedFontSize(defaultArticleState.fontSizeOption);
		setSelectedFontColor(defaultArticleState.fontColor);
		setSelectedBagroundColor(defaultArticleState.backgroundColor);
		setSelectedContentWidth(defaultArticleState.contentWidth);
		submit({
			fontFamilyOption: defaultArticleState.fontFamilyOption,
			fontColor: defaultArticleState.fontColor,
			backgroundColor: defaultArticleState.backgroundColor,
			contentWidth: defaultArticleState.contentWidth,
			fontSizeOption: defaultArticleState.fontSizeOption,
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
		setIsMenuOpen(!isMenuOpen);
	};

	return (
		<>
			<ArrowButton onClick={handleClickOpen} isOpen={isMenuOpen} />
			<aside
				className={clsx(styles.container, {
					[styles.containerOpen]: isMenuOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					ref={outsideClickCloser}>
					<Text as={'h2'} weight={800} size={31} family='open-sans' uppercase>
						Задайте параметры
					</Text>
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
