namespace $.$$ {
	$mol_style_define($bog_blitz_lobby_game_option, {
		Option_image: {
			maxWidth: '8rem',
			maxHeight: '6rem',
			objectFit: 'contain',
			borderRadius: '0.5rem',
		},
		'@': {
			'data-selected': {
				true: {
					boxShadow: `0 0 0 3px ${$mol_theme.special}`,
					opacity: 1,
				},
				false: {
					opacity: 1,
				},
			},
			'data-correct': {
				true: {
					boxShadow: '0 0 0 3px #22c55e',
					background: {
						color: '#22c55e33',
					},
					opacity: 1,
				},
				false: {
					boxShadow: '0 0 0 3px #ef4444',
					background: {
						color: '#ef444433',
					},
					opacity: 0.6,
				},
			},
		},
	})
}
