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
		fetch(apiUrl)
			.then((res) => {
				return res.json();
			})
			.then((data: GithubRepoStats) => {
				setStars(data.stargazers_count);
				setRepository(data.html_url);
			});
	});
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
