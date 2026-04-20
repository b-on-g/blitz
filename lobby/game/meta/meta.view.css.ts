namespace $.$$ {
	$mol_style_define($bog_blitz_lobby_game_meta, {
		flex: { direction: 'column' },
		gap: '0.75rem',
		width: '100%',
		maxWidth: '30rem',
		padding: { top: '0.5rem', bottom: '0.5rem', left: '1rem', right: '1rem' },
		Stats: {
			flex: { direction: 'row', wrap: 'wrap' },
			align: { items: 'baseline' },
			gap: '0.75rem',
			padding: { top: '0.5rem', bottom: '0.5rem', left: '0.75rem', right: '0.75rem' },
			background: { color: $mol_theme.card },
			borderRadius: '0.75rem',
		},
		Stats_answered: {
			font: { weight: 600 },
		},
		Stats_correct: {
			font: { weight: 600 },
			color: $mol_theme.special,
		},
		Stats_percent: {
			font: { size: '1.25rem', weight: 700 },
			margin: { left: 'auto' },
		},
		Stats_percent_hint: {
			font: { size: '0.75rem' },
			opacity: 0.6,
			width: '100%',
			textAlign: 'right',
		},
		Players_list: {
			flex: { direction: 'row', wrap: 'wrap' },
			gap: '0.5rem',
		},
		Player_row: {
			flex: { direction: 'row' },
			align: { items: 'center' },
			gap: '0.5rem',
			padding: { top: '0.375rem', bottom: '0.375rem', left: '0.625rem', right: '0.75rem' },
			background: { color: $mol_theme.card },
			borderRadius: '1rem',
			boxShadow: `0 0 0 1px ${$mol_theme.line} inset`,
		},
		Player_bullet: {
			width: '0.625rem',
			height: '0.625rem',
			borderRadius: '50%',
			background: { color: '#8a8a8a99' },
			flex: { shrink: 0 },
		},
		Player_name: {
			font: { size: '0.875rem', weight: 500 },
		},
		'@': {
			'data-status': {
				'correct': {
					boxShadow: '0 0 0 1px #2ecc71cc inset',
					Player_bullet: {
						background: { color: '#2ecc71ff' },
					},
				},
				'wrong': {
					boxShadow: '0 0 0 1px #e74c3ccc inset',
					Player_bullet: {
						background: { color: '#e74c3cff' },
					},
				},
				'none': {
					opacity: 0.6,
				},
			},
		},
	})
}
