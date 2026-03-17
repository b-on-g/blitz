namespace $.$$ {
	$mol_style_define($bog_blitz_lobby_game_leaderboard_row, {
		flex: { direction: 'row' },
		gap: '0.75rem',
		padding: { top: '0.5rem', bottom: '0.5rem', left: '0.75rem', right: '0.75rem' },
		Rank: {
			minWidth: '2.5rem',
			font: { weight: 700 },
		},
		Name: {
			flex: { grow: 1 },
		},
		Score: {
			font: { weight: 600 },
		},
		'@': {
			'data-mine': {
				true: {
					background: { color: $mol_theme.card },
					font: { weight: 700 },
				},
			},
		},
	})
}
