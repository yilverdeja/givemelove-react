interface Props {
	contributionCount: number;
	totalCount: number;
}

const ContributionText = ({ contributionCount, totalCount }: Props) => {
	return (
		<div className="font-semibold">
			Contribution: {contributionCount} (
			{((contributionCount / totalCount) * 100).toFixed(2)}%)
		</div>
	);
};

export default ContributionText;
