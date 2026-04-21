namespace $.$$ {
	const group_style = {
		flex: { direction: 'column' },
		align: { items: 'center' },
	} as const

	const btn_style = {
		font: { size: '2rem' },
		padding: { left: '0.25rem', right: '0.25rem', top: '0.25rem', bottom: '0.25rem' },
		minWidth: '2.5rem',
		minHeight: '2.5rem',
	} as const

	const count_style = {
		font: { size: '0.75rem' },
		textAlign: 'center',
		minWidth: '1rem',
	} as const

	$mol_style_define($bog_blitz_lobby_reactions, {
		flex: { direction: 'row' },
		gap: '0.25rem',
		align: { items: 'flex-end', self: 'stretch' },
		width: '95%',
		padding: { bottom: '1rem', right: '0.75rem' },
		position: 'fixed',
		bottom: '1rem',
		right: '1rem',
		zIndex: 100,
		'@': {
			'data-in-flow': {
				'true': {
					position: 'static',
					bottom: 'auto',
					right: 'auto',
					zIndex: 'auto',
				},
			},
		},
		'@media': {
			'(width < 600px)': {
				padding: { bottom: '1.5rem', right: '1rem' },
				bottom: '0.25rem',
				right: '0.25rem',
				transform: 'scale(0.75)',
				transformOrigin: 'bottom right',
				opacity: 0.85,
				'@': {
					'data-in-flow': {
						'true': {
							bottom: 'auto',
							right: 'auto',
							transform: 'none',
							opacity: 1,
						},
					},
				},
			},
		},
		Spacer: {
			flex: {
				grow: 1,
			},
		},
		Group_heart: group_style,
		Group_smile: group_style,
		Group_fire: group_style,
		Group_clap: group_style,
		Group_poop: group_style,
		Btn_heart: btn_style,
		Btn_smile: btn_style,
		Btn_fire: btn_style,
		Btn_clap: btn_style,
		Btn_poop: btn_style,
		Count_heart: count_style,
		Count_smile: count_style,
		Count_fire: count_style,
		Count_clap: count_style,
		Count_poop: count_style,
		Fly: {
			position: 'absolute',
			top: '0px',
			left: '50%',
			font: { size: '2rem' },
			lineHeight: '1',
			pointerEvents: 'none',
			willChange: 'transform, opacity',
			animation: {
				name: 'bog_blitz_fly_up',
				duration: '1.5s',
				timingFunction: 'ease-out',
				fillMode: 'forwards',
			},
			transform: 'translate(calc(-50% + var(--bog_blitz_fly_jitter, 0px)), 0)',
		},
	})

	$mol_style_attach(
		'bog_blitz_lobby_reactions_keyframes',
		`@keyframes bog_blitz_fly_up {
			0% { opacity: 1; transform: translate(calc(-50% + var(--bog_blitz_fly_jitter, 0px)), 0); }
			100% { opacity: 0; transform: translate(calc(-50% + var(--bog_blitz_fly_jitter, 0px)), -200px); }
		}`,
	)
}
