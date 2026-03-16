namespace $.$$ {
	$mol_style_define($bog_blitz_lobby_players, {
		Player_name_input: {
			':not(:placeholder-shown):not(:focus):not(:hover):not(:disabled)': {
				color: $mol_theme.text,
			},
		},
		Player: {
			alignItems: 'center',
		},
		Player_icon: {
			width: '2.5rem',
			height: '2.5rem',
			borderRadius: '50%',
			overflow: 'hidden',
			flex: { shrink: 0 },
		},
		Player_image: {
			width: '2.5rem',
			height: '2.5rem',
			borderRadius: '50%',
			overflow: 'hidden',
			objectFit: 'cover',
			flex: { shrink: 0 },
		},
	})
}
