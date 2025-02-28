import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [articleData, onArticleDataUpdate] = useState(defaultArticleState);

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleData.fontFamilyOption.value,
					'--font-size': articleData.fontSizeOption.value,
					'--font-color': articleData.fontColor.value,
					'--container-width': articleData.contentWidth.value,
					'--bg-color': articleData.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				articleData={articleData}
				onArticleDataUpdate={onArticleDataUpdate}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
