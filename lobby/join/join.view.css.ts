namespace $.$$ {
	$mol_style_define($bog_blitz_lobby_join, {
		Body: {
			flex: {
				direction: 'column',
			},
			align: {
				items: 'center',
				self: 'center',
			},
			gap: '1.5rem',
			padding: {
				top: '3rem',
				bottom: '2rem',
				left: '1.5rem',
				right: '1.5rem',
			},
			maxWidth: '400px',
			width: '100%',
			boxSizing: 'border-box',
		},
		Avatar: {
			width: '100px',
			height: '100px',
			align: {
				self: 'center',
			},
		},
		Color_palette: {
			flex: {
				direction: 'column',
			},
			align: {
				items: 'center',
			},
			gap: '0.5rem',
			width: '100%',
			margin: {
				bottom: '1rem',
			},
		},
		Color_hint: {
			font: {
				size: '0.8rem',
			},
			opacity: 0.6,
		},
		Color_swatches: {
			flex: {
				direction: 'row',
				wrap: 'wrap',
			},
			justify: {
				content: 'center',
			},
			gap: '0.5rem',
		},
		Color_swatch: {
			width: '2.25rem',
			height: '2.25rem',
			minWidth: '2.25rem',
			borderRadius: '50%',
			padding: { top: '0px', bottom: '0px', left: '0px', right: '0px' },
			transition: 'box-shadow 0.15s, transform 0.15s',
			cursor: 'pointer',
			overflow: 'visible',
		},
		Swatch_avatar: {
			width: '100%',
			height: '100%',
		},
		Player_name_input: {
			font: {
				size: '1.5rem',
				weight: 600,
			},
			textAlign: 'center',
			width: '100%',
		},
		Join: {
			width: '100%',
			margin: {
				top: '0.5rem',
			},
		},
		'@media': {
			'(width < 600px)': {
				Body: {
					gap: '1rem',
					padding: {
						top: '1.5rem',
						bottom: '1rem',
						left: '0.75rem',
						right: '0.75rem',
					},
				},
				Avatar: {
					width: '80px',
					height: '80px',
				},
				Player_name_input: {
					font: {
						size: '1.25rem',
						weight: 600,
					},
				},
			},
		},
	})
}
