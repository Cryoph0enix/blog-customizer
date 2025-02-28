import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import React, { useState, useRef } from 'react';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import clsx from 'clsx';

import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleFormConfigProps = {
	articleData: ArticleStateType;
	onArticleDataUpdate: (newData: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	articleData,
	onArticleDataUpdate,
}: ArticleFormConfigProps) => {
	const articleFormRef = useRef<HTMLDivElement>(null);
	const [sidebarState, setSidebarState] = useState(false);

	const [state, setState] = useState({
		fontFamilyOption: defaultArticleState.fontFamilyOption,
		fontColor: defaultArticleState.fontColor,
		backgroundColor: defaultArticleState.backgroundColor,
		contentWidth: defaultArticleState.contentWidth,
		fontSizeOption: defaultArticleState.fontSizeOption,
	});

	const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
		onArticleDataUpdate({ ...articleData, ...state });
	};

	const handleReset = () => {
		setState(defaultArticleState);
		onArticleDataUpdate(defaultArticleState);
	};

	const sidebarOpenClass = clsx(
		styles.container,
		sidebarState && styles.container_open
	);

	useOutsideClickClose({
		rootRef: articleFormRef,
		isOpen: sidebarState,
		onClose: () => setSidebarState(false),
		onChange: () => {},
	});

	const handleChange = (key: keyof typeof state, value: any) => {
		setState((prev) => ({ ...prev, [key]: value }));
	};

	return (
		<div ref={articleFormRef}>
			<ArrowButton
				onClick={() => setSidebarState(!sidebarState)}
				isOpen={sidebarState}
			/>
			<aside className={sidebarOpenClass}>
				<form
					className={styles.form}
					onReset={handleReset}
					onSubmit={handleSubmit}>
					<Text size={31} weight={800} uppercase={true}>
						Задайте параметры
					</Text>
					<Select
						options={fontFamilyOptions}
						selected={state.fontFamilyOption}
						onChange={(value) => handleChange('fontFamilyOption', value)}
						title={'Шрифт'}
					/>
					<RadioGroup
						options={fontSizeOptions}
						selected={state.fontSizeOption}
						name='fontSize'
						onChange={(value) => handleChange('fontSizeOption', value)}
						title='Размер шрифта'
					/>
					<Select
						options={fontColors}
						selected={state.fontColor}
						onChange={(value) => handleChange('fontColor', value)}
						title='Цвет шрифта'
					/>
					<div className={styles.separatorCentered}>
						<Separator />
					</div>
					<Select
						options={backgroundColors}
						selected={state.backgroundColor}
						onChange={(value) => handleChange('backgroundColor', value)}
						title='Цвет фона'
					/>
					<Select
						options={contentWidthArr}
						selected={state.contentWidth}
						onChange={(value) => handleChange('contentWidth', value)}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='clear' onClick={handleReset} />
						<Button title='Применить' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
