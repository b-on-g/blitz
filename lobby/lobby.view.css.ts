namespace $.$$ {
	$mol_style_define($bog_blitz_lobby, {
		Qr: {
			border: {
				radius: $mol_gap.round,
			},
			align: { self: 'center' },
		},
		Player_name_input: {
			':not(:placeholder-shown):not(:focus):not(:hover):not(:disabled)': {
				color: $mol_theme.text,
			},
		},
		Player: {
			alignItems: 'center',
		},
	})
}
