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
			flex: { direction: 'column' },
			gap: '0.125rem',
		},
		Player_row: {
			flex: { direction: 'row' },
			align: { items: 'center' },
			gap: '0.5rem',
			padding: { top: '0.25rem', bottom: '0.25rem', left: '0.25rem', right: '0.25rem' },
		},
		Player_bullet: {
			width: '0.625rem',
			height: '0.625rem',
			borderRadius: '50%',
			background: { color: '#8a8a8a99' },
			flex: { shrink: 0 },
			margin: { left: 'auto' },
		},
		Player_name: {
			font: { size: '0.875rem', weight: 500 },
		},
		'@': {
			'data-status': {
				'correct': {
					Player_bullet: {
						background: { color: '#2ecc71ff' },
					},
				},
				'wrong': {
					Player_bullet: {
						background: { color: '#e74c3cff' },
					},
				},
				'none': {
					opacity: 0.6,
				},
			},
		},
		'@media': {
			'(width < 600px)': {
				padding: { top: '0.25rem', bottom: '0.25rem', left: '0.5rem', right: '0.5rem' },
				gap: '0.5rem',
				Stats: {
					gap: '0.5rem',
					padding: { top: '0.375rem', bottom: '0.375rem', left: '0.5rem', right: '0.5rem' },
				},
				Stats_percent: {
					font: { size: '1.1rem', weight: 700 },
				},
				Player_row: {
					gap: '0.375rem',
					padding: { top: '0.2rem', bottom: '0.2rem', left: '0.125rem', right: '0.125rem' },
				},
				Player_name: {
					font: { size: '0.8rem', weight: 500 },
				},
			},
		},
	})
}
