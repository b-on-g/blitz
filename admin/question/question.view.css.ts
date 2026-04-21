namespace $.$$ {
	$mol_style_define($bog_blitz_admin_question, {
		background: {
			color: $mol_theme.card,
		},
		border: {
			radius: '0.5rem',
		},
		padding: {
			top: '0.5rem',
			bottom: '0.5rem',
			left: '0.75rem',
			right: '0.75rem',
		},
		Header: {
			gap: '0.25rem',
		},
		Delete: {
			color: '#cc3333',
		},
		Options_section: {
			padding: {
				top: 0,
				bottom: 0,
				left: '1rem',
				right: 0,
			},
			gap: '0.5rem',
		},
		Add_option: {
			align: {
				self: 'flex-start',
			},
		},
		Image_section: {
			align: {
				items: 'center',
			},
			gap: '0.375rem',
			flex: {
				wrap: 'wrap',
			},
		},
		Image_upload: {
			Native: {
				top: 0,
				height: '100%',
			},
		},
		Image_preview: {
			width: '4rem',
			height: '4rem',
			minWidth: '4rem',
			border: {
				radius: '0.375rem',
			},
			overflow: 'hidden',
			flex: {
				shrink: 0,
			},
		},
		Image_url_input: {
			flex: {
				grow: 1,
				shrink: 1,
				basis: '8rem',
			},
		},
		'@media': {
			'(width < 600px)': {
				padding: {
					top: '0.375rem',
					bottom: '0.375rem',
					left: '0.5rem',
					right: '0.5rem',
				},
				Options_section: {
					padding: {
						top: 0,
						bottom: 0,
						left: '0.5rem',
						right: 0,
					},
				},
				Image_preview: {
					width: '3rem',
					height: '3rem',
					minWidth: '3rem',
				},
			},
		},
	})
}
