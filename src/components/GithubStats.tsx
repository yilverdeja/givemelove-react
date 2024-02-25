import { useState, useEffect } from 'react';
import { FaGithub } from 'react-icons/fa';
import { FaStar } from 'react-icons/fa';

interface Props {
	apiUrl: string;
}

interface GithubRepoStats {
	stargazers_count: number;
	html_url: string;
}

const GithubStats = ({ apiUrl }: Props) => {
	const [stars, setStars] = useState(0);
	const [repository, setRepository] = useState('');

	useEffect(() => {
		const githubRepoInfo = localStorage.getItem('github-repo-info');
		if (githubRepoInfo) {
			const info: GithubRepoStats = JSON.parse(githubRepoInfo);
			setStars(info.stargazers_count);
			setRepository(info.html_url);
			return;
		}
		fetch(apiUrl)
			.then((res) => {
				return res.json();
			})
			.then((data: GithubRepoStats) => {
				setStars(data.stargazers_count);
				setRepository(data.html_url);
				localStorage.setItem(
					'github-repo-info',
					JSON.stringify({
						stargazers_count: data.stargazers_count,
						html_url: data.html_url,
					})
				);
			});
	}, []);

	return (
		<a
			className="flex justify-center items-center gap-5 no-underline text-black dark:text-white hover:cursor-pointer"
			target="_blank"
			href={repository}
		>
			<FaGithub size={20} />
			<div className="flex justify-center items-center gap-1">
				{stars}
				<FaStar size={20} />
			</div>
		</a>
	);
};

export default GithubStats;
