import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';
dayjs.extend(relativeTime);
dayjs.extend(updateLocale);
dayjs.updateLocale('en', {
	relativeTime: {
		future: 'just now',
		past: '%s ago',
		s: 'a few seconds',
		m: 'a minute',
		mm: '%d minutes',
		h: 'an hour',
		hh: '%d hours',
		d: 'a day',
		dd: '%d days',
		M: 'a month',
		MM: '%d months',
		y: 'a year',
		yy: '%d years',
	},
});
import { GrRefresh } from 'react-icons/gr';

interface Props {
	currentDateTime: Date;
	lastUpdated: Date;
	onRefresh: () => void;
}

const UpdateText = ({ lastUpdated, onRefresh, currentDateTime }: Props) => {
	return (
		<div className="flex flex-row gap-2 items-center justify-center">
			<GrRefresh onClick={onRefresh} className="hover:cursor-pointer" />
			updated {dayjs(lastUpdated).from(currentDateTime)}
		</div>
	);
};

export default UpdateText;
