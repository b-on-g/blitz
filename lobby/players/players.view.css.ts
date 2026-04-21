namespace $.$$ {
	$mol_style_define($bog_blitz_lobby_players, {
		Player_name_input: {
			':not(:placeholder-shown):not(:focus):not(:hover):not(:disabled)': {
				color: $mol_theme.text,
			},
		},
		Player: {
			align: { items: 'center' },
			background: { color: $mol_theme.card },
			borderRadius: '0.75rem',
			padding: { top: '0.5rem', bottom: '0.5rem', left: '0.75rem', right: '0.75rem' },
			margin: { bottom: '0.25rem', top: '0.25rem' },
			flex: {
				wrap: 'wrap',
			},
			gap: '0.5rem',
			'@': {
				bog_blitz_mine: {
					true: {
						background: { color: $mol_theme.card },
						boxShadow: `0 0 0 1px ${$mol_theme.line}`,
						borderRadius: '0.5rem',
					},
				},
			},
		},
		Player_avatar: {
			width: '2.5rem',
			height: '2.5rem',
		},
		Player_color_palette: {
			flex: {
				direction: 'row',
				wrap: 'wrap',
				basis: '100%',
			},
			gap: '0.25rem',
			margin: { top: '0.25rem' },
		},
		Color_swatch: {
			width: '1.25rem',
			height: '1.25rem',
			minWidth: '1.25rem',
			borderRadius: '50%',
			padding: { top: '0px', bottom: '0px', left: '0px', right: '0px' },
			cursor: 'pointer',
			transition: 'box-shadow 0.15s',
		},
	})
}
