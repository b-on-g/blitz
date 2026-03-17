namespace $.$$ {
	$mol_style_define($bog_blitz_lobby_game_leaderboard_row, {
		flex: { direction: 'row' },
		align: { items: 'center' },
		gap: '0.5rem',
		padding: { top: '0.5rem', bottom: '0.5rem', left: '0.75rem', right: '0.75rem' },
		background: { color: $mol_theme.card },
		borderRadius: '0.75rem',
		margin: { bottom: '0.25rem' },
		Rank: {
			minWidth: '2.5rem',
			font: { weight: 700 },
			opacity: 0.4,
		},
		Name: {
			flex: { grow: 1 },
		},
		Score: {
			font: { weight: 600 },
			opacity: 0.7,
		},
		'@': {
			'data-mine': {
				true: {
					Rank: {
						opacity: 1,
						color: $mol_theme.special,
					},
					Score: {
						opacity: 1,
					},
				},
			},
			'data-medal': {
				'1': {
					boxShadow: '0 0 0 2px #FFD700 inset',
					Rank: { opacity: 1, font: { size: '1.25rem' } },
				},
				'2': {
					boxShadow: '0 0 0 2px #C0C0C0 inset',
					Rank: { opacity: 1, font: { size: '1.25rem' } },
				},
				'3': {
					boxShadow: '0 0 0 2px #CD7F32 inset',
					Rank: { opacity: 1, font: { size: '1.25rem' } },
				},
			},
		},
	})
}
