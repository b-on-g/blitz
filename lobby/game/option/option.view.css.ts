namespace $.$$ {
	$mol_style_define($bog_blitz_lobby_game_option, {
		flex: {
			direction: 'row',
			wrap: 'wrap',
		},
		align: { items: 'center' },
		gap: '0.5rem',
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
			borderRadius: '50%',
			overflow: 'hidden',
			flex: { shrink: 0 },
			align: { items: 'center' },
			justify: { content: 'center' },
			color: '#ffffff',
			boxShadow: `0 0 0 2px ${$mol_theme.back}`,
		},
		Picker_avatar: {
			width: '70%',
			height: '70%',
		},
		'@': {
			'data-selected': {
				true: {
					boxShadow: `0 0 0 3px ${$mol_theme.special}`,
					opacity: 1,
				},
				false: {
					opacity: 1,
				},
			},
			'data-correct': {
				true: {
					boxShadow: '0 0 0 3px #22c55e',
					background: {
						color: '#22c55e33',
					},
					opacity: 1,
				},
				false: {
					boxShadow: '0 0 0 3px #ef4444',
					background: {
						color: '#ef444433',
					},
					opacity: 0.6,
				},
			},
		},
	})
}
