namespace $.$$ {
	$mol_style_define($bog_blitz_profile_page, {
		Card: {
			flex: {
				direction: 'column',
			},
			padding: {
				top: 32,
				bottom: 32,
				left: 16,
				right: 16,
			},
			gap: '1.5rem',
			maxWidth: 480,
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
		Avatar_button: {
			borderRadius: '50%',
			overflow: 'hidden',
			width: 120,
			height: 120,
			flex: {
				shrink: 0,
			},
		},
		Avatar_image: {
			width: 120,
			height: 120,
			objectFit: 'cover',
			borderRadius: '50%',
		},
		Avatar_icon: {
			width: 120,
			height: 120,
			borderRadius: '50%',
			font: {
				size: 64,
			},
		},
		Avatar_upload_hint: {
			font: {
				size: 11,
			},
			opacity: 0.5,
			text: {
				align: 'center',
			},
		},
		Name_row: {
			justify: {
				content: 'center',
			},
		},
		Name_input: {
			font: {
				size: 24,
				weight: 600,
			},
			text: {
				align: 'center',
			},
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
				top: 8,
				bottom: 8,
				left: 12,
				right: 12,
			},
			borderRadius: 8,
			background: {
				color: $mol_theme.card,
			},
		},
		Stat_label: {
			font: {
				size: 15,
			},
		},
		Stat_value: {
			font: {
				size: 15,
				weight: 700,
			},
		},
		History_title: {
			font: {
				size: 18,
				weight: 600,
			},
			margin: {
				top: 8,
			},
		},
		History: {
			width: '100%',
			gap: '0.5rem',
		},
		History_row: {
			padding: {
				top: 10,
				bottom: 10,
				left: 12,
				right: 12,
			},
			borderRadius: 8,
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
				size: 13,
			},
		},
		History_date: {
			opacity: 0.4,
			font: {
				size: 12,
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
				top: 16,
				bottom: 16,
				left: 16,
				right: 16,
			},
			borderRadius: 12,
			background: {
				color: $mol_theme.card,
			},
			width: '100%',
			margin: {
				top: 8,
			},
		},
		Fun_title: {
			font: {
				size: 16,
				weight: 600,
			},
			margin: {
				bottom: 4,
			},
		},
		Fun_text: {
			text: {
				align: 'center',
			},
			opacity: 0.7,
			font: {
				size: 14,
			},
		},
	})
}
