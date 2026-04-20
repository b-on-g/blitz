namespace $.$$ {
	$mol_style_define($bog_blitz_lobby_game_timer, {
		flex: {
			direction: 'column',
		},
		align: { items: 'stretch' },
		gap: '0.35rem',
		minWidth: '3.5rem',
		Digits: {
			font: { size: '2rem', weight: 800 },
			textAlign: 'center',
			color: $mol_theme.special,
			lineHeight: '1',
		},
		Bar: {
			height: '0.35rem',
			background: {
				color: $mol_theme.special,
			},
			borderRadius: '0.25rem',
		},
		'@media': {
			'(width < 600px)': {
				minWidth: '2.75rem',
				Digits: {
					font: { size: '1.5rem', weight: 800 },
				},
			},
		},
	})
}
