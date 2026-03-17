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
		Avatar_wrap: {
			justify: {
				content: 'center',
			},
		},
		Avatar: {
			borderRadius: '50%',
			overflow: 'hidden',
			width: '80px',
			height: '80px',
			flex: {
				shrink: 0,
			},
		},
		Avatar_image: {
			width: '80px',
			height: '80px',
			objectFit: 'cover',
			borderRadius: '50%',
		},
		Avatar_icon: {
			width: '80px',
			height: '80px',
			borderRadius: '50%',
			font: {
				size: '2.5rem',
			},
		},
		Avatar_upload_hint: {
			font: {
				size: '0.7rem',
			},
			opacity: 0.5,
			textAlign: 'center',
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
		History_title: {
			font: {
				size: '1.1rem',
				weight: 600,
			},
			margin: {
				top: '0.5rem',
			},
		},
		History: {
			width: '100%',
			gap: '0.5rem',
		},
		History_row: {
			padding: {
				top: '0.625rem',
				bottom: '0.625rem',
				left: '0.75rem',
				right: '0.75rem',
			},
			borderRadius: '8px',
			background: {
				color: $mol_theme.card,
			},
			gap: '0.75rem',
		},
		History_title_text: {
			flex: {
				grow: 1,
			},
			font: {
				weight: 500,
			},
		},
		History_score: {
			font: {
				weight: 600,
			},
			color: $mol_theme.special,
		},
		History_place: {
			opacity: 0.6,
			font: {
				size: '0.8rem',
			},
		},
		History_date: {
			opacity: 0.4,
			font: {
				size: '0.75rem',
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
