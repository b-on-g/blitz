namespace $.$$ {
	$mol_style_define($bog_blitz, {
		Title: {
			flex: {
				grow: 1,
				basis: 0,
			},
			align: {
				items: 'center',
			},
		},
		Navbar: {
			flex: {
				grow: 0,
			},
		},
		Tools: {
			flex: {
				grow: 1,
				basis: 0,
			},
			justify: {
				content: 'flex-end',
			},
		},

		Mobile_menu: {
			display: 'none',
		},

		'@media': {
			'(width < 600px)': {
				Mobile_menu: {
					display: 'flex',
				},
				Navbar: {
					display: 'none',
				},
			},
		},
	})
}
