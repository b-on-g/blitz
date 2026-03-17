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
			gap: '1rem',
			padding: {
				top: '2rem',
				bottom: '2rem',
				left: '1rem',
				right: '1rem',
			},
			maxWidth: '400px',
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
		Avatar: {
			font: {
				size: '0.75rem',
			},
			opacity: 0.5,
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
		},
	})
}
