namespace $.$$ {
	$mol_style_define($bog_blitz_lobby_game_leaderboard, {
		flex: {
			direction: 'row',
			wrap: 'wrap',
		},
		gap: '1rem',
		padding: { top: '1rem', left: '1rem', right: '1rem' },
		width: '100%',
		My_row: {
			width: '100%',
			background: { color: $mol_theme.card },
			padding: { top: '0.5rem', bottom: '0.5rem' },
		},
		Top: {
			flex: { grow: 1, basis: 0 },
			minWidth: '15rem',
		},
		Bottom: {
			flex: { grow: 1, basis: 0 },
			minWidth: '15rem',
		},
		Top_title: {
			font: { size: '1.25rem', weight: 700 },
			padding: { bottom: '0.5rem' },
		},
		Bottom_title: {
			font: { size: '1.25rem', weight: 700 },
			padding: { bottom: '0.5rem' },
		},
	})
}
