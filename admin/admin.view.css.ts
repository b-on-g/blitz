namespace $.$$ {
	$mol_style_define($bog_blitz_admin, {
		Body: {
			maxWidth: '50rem',
			align: {
				self: 'center',
			},
			flex: {
				grow: 1,
			},
			width: '100%',
		},
		Create_button: {
			align: {
				self: 'flex-start',
			},
			margin: {
				top: '0.5rem',
				bottom: '0.5rem',
				left: '1rem',
				right: '1rem',
			},
		},
		Bot_expander: {
			margin: {
				top: 0,
				bottom: 0,
				left: '1rem',
				right: '1rem',
			},
		},
		Bot: {
			height: '25rem',
			border: {
				radius: '0.5rem',
			},
			overflow: 'auto',
		},
		Import_expander: {
			margin: {
				top: 0,
				bottom: 0,
				left: '1rem',
				right: '1rem',
			},
		},
		Import_area: {
			height: '19rem',
			background: {
				color: $mol_theme.card,
			},
			border: {
				radius: '0.5rem',
			},
		},
		Import_button: {
			align: {
				self: 'flex-start',
			},
			border: {
				radius: '0.5rem',
			},
			margin: {
				top: '0.5rem',
				bottom: '0.5rem',
				left: 0,
				right: 0,
			},
		},
		Quizzes_list: {
			gap: '0.5rem',
			padding: {
				top: '0.5rem',
				bottom: '0.5rem',
				left: '1rem',
				right: '1rem',
			},
		},
		'@media': {
			'(width < 600px)': {
				Create_button: {
					margin: {
						top: '0.5rem',
						bottom: '0.5rem',
						left: '0.5rem',
						right: '0.5rem',
					},
				},
				Bot_expander: {
					margin: {
						top: 0,
						bottom: 0,
						left: '0.5rem',
						right: '0.5rem',
					},
				},
				Bot: {
					height: '18rem',
				},
				Import_expander: {
					margin: {
						top: 0,
						bottom: 0,
						left: '0.5rem',
						right: '0.5rem',
					},
				},
				Import_area: {
					height: '14rem',
				},
				Quizzes_list: {
					padding: {
						top: '0.5rem',
						bottom: '0.5rem',
						left: '0.5rem',
						right: '0.5rem',
					},
				},
			},
		},
	})
}
