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
			margin: {
				bottom: '0.5rem',
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
				size: '3rem',
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
			margin: {
				top: '0.5rem',
			},
		},
	})
}
