namespace $.$$ {
	$mol_style_define($bog_blitz_lobby_game_option, {
		flex: {
			direction: 'row',
			wrap: 'wrap',
		},
		align: { items: 'center' },
		gap: '0.5rem',
		outline: 'none',
		transition: 'transform 0.15s ease, box-shadow 0.15s ease, background-color 0.15s ease',
		':focus': { outline: 'none' },
		':focus-visible': { outline: 'none' },
		Option_image: {
			maxWidth: '8rem',
			maxHeight: '6rem',
			objectFit: 'contain',
			borderRadius: '0.5rem',
		},
		Picker_area: {
			flex: {
				direction: 'row',
				wrap: 'wrap',
				basis: '100%',
			},
			align: { items: 'center' },
			gap: '0.25rem',
			margin: { top: '0.25rem' },
			minHeight: '1.5rem',
		},
		Picker: {
			width: '1.5rem',
			height: '1.5rem',
			boxShadow: `0 0 0 2px ${$mol_theme.back}`,
			animation: {
				name: 'bog_blitz_picker_wobble',
				duration: '1.2s',
				timingFunction: 'ease-in-out',
				iterationCount: 'infinite',
			},
			transformOrigin: 'center bottom',
			':nth-child(2n)': {
				animationDelay: '-0.4s',
			},
			':nth-child(3n)': {
				animationDelay: '-0.8s',
			},
		},
		'@': {
			'data-selected': {
				true: {
					boxShadow: `inset 0 0 0 2px ${$mol_theme.special}`,
					background: {
						color: '#a855f733',
					},
					transform: 'scale(1.01)',
					opacity: 1,
				},
				false: {
					opacity: 1,
				},
			},
			'data-submitted': {
				true: {
					boxShadow: `0 0 0 3px ${$mol_theme.special}`,
					background: {
						color: '#a855f755',
					},
					transform: 'scale(1.02)',
					opacity: 1,
				},
				false: {},
			},
			'data-correct': {
				true: {
					boxShadow: '0 0 0 3px #22c55e',
					background: {
						color: '#22c55e33',
					},
					opacity: 1,
					transform: 'none',
				},
				false: {
					boxShadow: '0 0 0 3px #ef4444',
					background: {
						color: '#ef444433',
					},
					opacity: 0.6,
					transform: 'none',
				},
			},
		},
	})

	$mol_style_attach(
		'bog_blitz_lobby_game_option_keyframes',
		`@keyframes bog_blitz_picker_wobble {
			0%   { transform: rotate(-8deg) translateY(0); }
			25%  { transform: rotate(8deg)  translateY(-2px); }
			50%  { transform: rotate(-6deg) translateY(0); }
			75%  { transform: rotate(6deg)  translateY(-1px); }
			100% { transform: rotate(-8deg) translateY(0); }
		}`,
	)
}
