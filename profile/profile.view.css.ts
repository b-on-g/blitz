namespace $.$$ {
	$mol_style_define($bog_blitz_profile_page, {
		Card: {
			flex: {
				direction: 'column',
			},
			padding: {
				top: '2rem',
				bottom: '2rem',
				left: '1rem',
				right: '1rem',
			},
			gap: '1.5rem',
			maxWidth: '480px',
			align: {
				self: 'center',
				items: 'center',
			},
		},
		Avatar_icon: {
			width: '4rem',
			height: '4rem',
			flex: { shrink: 0, grow: 0 },
			align: { self: 'center' },
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
			minWidth: '2rem',
			minHeight: '2rem',
			maxWidth: '2rem',
			maxHeight: '2rem',
			borderRadius: '50%',
			padding: { top: '0px', bottom: '0px', left: '0px', right: '0px' },
			boxSizing: 'border-box',
			flex: { shrink: 0, grow: 0 },
			cursor: 'pointer',
			transition: 'box-shadow 0.15s',
		},
		Name_row: {
			justify: {
				content: 'center',
			},
		},
		Name_input: {
			font: {
				size: '1.5rem',
				weight: 600,
			},
			textAlign: 'center',
		},
		Stats: {
			flex: {
				direction: 'column',
			},
			gap: '0.5rem',
			width: '100%',
		},
		Stat_row: {
			justify: {
				content: 'space-between',
			},
			padding: {
				top: '0.5rem',
				bottom: '0.5rem',
				left: '0.75rem',
				right: '0.75rem',
			},
			borderRadius: '8px',
			background: {
				color: $mol_theme.card,
			},
		},
		Stat_label: {
			font: {
				size: '0.95rem',
			},
		},
		Stat_value: {
			font: {
				size: '0.95rem',
				weight: 700,
			},
		},
		Games_section: {
			flex: {
				direction: 'column',
			},
			width: '100%',
			gap: '0.75rem',
		},
		Games_title: {
			font: {
				size: '1.1rem',
				weight: 600,
			},
		},
		Games_list: {
			gap: '0.5rem',
		},
		Games_empty: {
			textAlign: 'center',
			opacity: 0.5,
			font: {
				size: '0.875rem',
			},
		},
		Game_row: {
			justify: {
				content: 'space-between',
			},
			align: {
				items: 'center',
			},
			padding: {
				top: '0.5rem',
				bottom: '0.5rem',
				left: '0.75rem',
				right: '0.75rem',
			},
			borderRadius: '8px',
			background: {
				color: $mol_theme.card,
			},
		},
		Game_info: {
			flex: {
				direction: 'column',
			},
			gap: '0.125rem',
		},
		Game_title: {
			font: {
				size: '0.95rem',
				weight: 600,
			},
		},
		Game_details: {
			font: {
				size: '0.8rem',
			},
			opacity: 0.6,
		},
		Game_score: {
			font: {
				size: '1.1rem',
				weight: 700,
			},
			flex: {
				shrink: 0,
			},
		},
		Fun_card: {
			flex: {
				direction: 'column',
			},
			align: {
				items: 'center',
			},
			padding: {
				top: '1rem',
				bottom: '1rem',
				left: '1rem',
				right: '1rem',
			},
			borderRadius: '12px',
			background: {
				color: $mol_theme.card,
			},
			width: '100%',
			margin: {
				top: '0.5rem',
			},
		},
		Fun_title: {
			font: {
				size: '1rem',
				weight: 600,
			},
			margin: {
				bottom: '0.25rem',
			},
		},
		Fun_text: {
			textAlign: 'center',
			opacity: 0.7,
			font: {
				size: '0.875rem',
			},
		},
		'@media': {
			'(width < 600px)': {
				Card: {
					padding: {
						top: '1rem',
						bottom: '1rem',
						left: '0.5rem',
						right: '0.5rem',
					},
					gap: '1rem',
				},
				Name_input: {
					font: { size: '1.25rem', weight: 600 },
				},
				Stat_row: {
					padding: {
						top: '0.375rem',
						bottom: '0.375rem',
						left: '0.5rem',
						right: '0.5rem',
					},
				},
				Game_row: {
					padding: {
						top: '0.375rem',
						bottom: '0.375rem',
						left: '0.5rem',
						right: '0.5rem',
					},
				},
				Fun_card: {
					padding: {
						top: '0.75rem',
						bottom: '0.75rem',
						left: '0.5rem',
						right: '0.5rem',
					},
				},
			},
		},
	})
}
