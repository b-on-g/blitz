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
		Avatar_circle: {
			borderRadius: '50%',
			overflow: 'hidden',
			width: '80px',
			height: '80px',
			minWidth: '80px',
			minHeight: '80px',
			maxWidth: '80px',
			maxHeight: '80px',
			flex: {
				shrink: 0,
				grow: 0,
			},
		},
		Avatar: {
			font: {
				size: '0.75rem',
			},
			opacity: 0.5,
		},
		Avatar_image: {
			width: '100%',
			height: '100%',
			objectFit: 'cover',
		},
		Avatar_icon: {
			width: '100%',
			height: '100%',
			font: {
				size: '2.5rem',
			},
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
	})
}
