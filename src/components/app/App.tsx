import { CSSProperties, useState } from 'react';
import { Article } from 'components/article';
import { ArticleParamsForm } from 'components/article-params-form';
import { defaultArticleState } from 'src/constants/articleProps';
import styles from '../../styles/index.module.scss';

const App = () => {
	const [articleData, onArticleDataUpdate] = useState(defaultArticleState);

	return (
		<main
			className={styles.main}
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

export default App;
