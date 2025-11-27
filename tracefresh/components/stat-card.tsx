import clsx from 'clsx';

const colorMap: Record<string, string> = {
	'yellow-500': 'bg-yellow-500',
	'blue-500': 'bg-blue-500',
	'red-500': 'bg-red-500',
};

type StatCardProps = {
	name: string;
	icon: React.ReactNode;
	value: string | number;
	color: string;
};

export function StatCard({ name, icon, value, color }: StatCardProps) {
	return (
		<div key={name} className={`flex p-3 gap-5 items-center border-2 hover:border-${color}}`} >
			<div className={clsx('flex items-center justify-center w-12 h-12 rounded-md border-2', colorMap[color] || 'bg-gray-200')}>
				{icon}
			</div>
			<div className="flex flex-col gap">
				<h2 className="text-sm font-medium text-muted-foreground">{name}</h2>
				<p className="font-black text-2xl">{value}</p>
			</div>
		</div>
	)
}
