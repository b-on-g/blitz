namespace $.$$ {
	$mol_style_define($bog_blitz_lobby_waiting, {
		Quiz_title: {
			align: { self: 'center' },
			font: { size: '1.75rem', weight: 700 },
			margin: { top: '1rem' },
			textAlign: 'center',
		},
		Waiting_message: {
			align: { self: 'center' },
			font: { size: '1.5rem', weight: 500 },
			opacity: 0.6,
			padding: { bottom: '0.5rem', top: '1rem' },
		},
		Counter: {
			align: { self: 'center' },
			font: { size: '1.25rem', weight: 500 },
			opacity: 0.7,
			padding: { bottom: '1.5rem', top: '1rem' },
		},
		'@media': {
			'(width < 600px)': {
				Quiz_title: {
					font: { size: '1.35rem', weight: 700 },
					margin: { top: '0.5rem' },
				},
				Waiting_message: {
					font: { size: '1.15rem', weight: 500 },
					padding: { bottom: '0.25rem', top: '0.5rem' },
				},
				Counter: {
					font: { size: '1rem', weight: 500 },
					padding: { bottom: '0.75rem', top: '0.5rem' },
				},
			},
		},
	})
}
