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
		Avatar_circle: {
			borderRadius: '50%',
			overflow: 'hidden',
			width: '100px',
			height: '100px',
			minWidth: '100px',
			minHeight: '100px',
			maxWidth: '100px',
			maxHeight: '100px',
			flex: {
				shrink: 0,
				grow: 0,
			},
			align: {
				items: 'center',
			},
			justify: {
				content: 'center',
			},
			color: '#ffffff',
			margin: {
				bottom: '0.5rem',
			},
		},
		Avatar_icon: {
			width: '70%',
			height: '70%',
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
			width: '2rem',
			height: '2rem',
			borderRadius: '50%',
			padding: { top: '0px', bottom: '0px', left: '0px', right: '0px' },
			minWidth: '2rem',
			transition: 'box-shadow 0.15s',
			cursor: 'pointer',
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
				Avatar_circle: {
					width: '80px',
					height: '80px',
					minWidth: '80px',
					minHeight: '80px',
					maxWidth: '80px',
					maxHeight: '80px',
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
