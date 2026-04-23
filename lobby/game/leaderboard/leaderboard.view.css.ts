namespace $.$$ {
	$mol_style_define($bog_blitz_lobby_game_leaderboard, {
		flex: {
			direction: 'row',
			wrap: 'wrap',
		},
		gap: '1.5rem',
		padding: { top: '0.5rem', left: '1rem', right: '1rem' },
		width: '100%',
		My_row: {
			width: '100%',
			background: { color: $mol_theme.card },
			borderRadius: '0.75rem',
			boxShadow: `0 0 0 2px ${$mol_theme.special}`,
			padding: { top: '0.5rem', bottom: '0.5rem', left: '0.75rem', right: '0.75rem' },
		},
		Top: {
			flex: { grow: 1, basis: 0, direction: 'column' },
			minWidth: '15rem',
		},
		Bottom: {
			flex: { grow: 1, basis: 0, direction: 'column' },
			minWidth: '15rem',
		},
		Top_title: {
			font: { size: '1rem', weight: 700 },
			opacity: 0.5,
			padding: { bottom: '0.25rem', left: '0.75rem' },
		},
		Bottom_title: {
			font: { size: '1rem', weight: 700 },
			opacity: 0.5,
			padding: { bottom: '0.25rem', left: '0.75rem' },
		},
	})
}
