namespace $.$$ {
	$mol_style_define($bog_blitz_lobby_host, {
		Qr: {
			border: {
				radius: $mol_gap.round,
			},
			align: { self: 'center' },
			maxWidth: '22rem',
		},
		Quiz_title: {
			align: { self: 'center' },
			font: { size: '1.75rem', weight: 700 },
			margin: { top: '1rem' },
			textAlign: 'center',
		},
		Land_id: {
			align: { self: 'center' },
			font: { size: '0.85rem' },
			opacity: 0.45,
			textAlign: 'center',
		},
		Start: {
			align: { self: 'center' },
			maxWidth: '20rem',
			textAlign: 'center',
			margin: { top: '1.5rem' },
		},
		Counter: {
			align: { self: 'center' },
			font: { size: '1.25rem', weight: 500 },
			opacity: 0.7,
			margin: { top: '1.5rem', bottom: '1.5rem' },
		},
		'@media': {
			'(width < 600px)': {
				Qr: {
					maxWidth: '16rem',
				},
				Quiz_title: {
					font: { size: '1.35rem', weight: 700 },
					margin: { top: '0.5rem' },
				},
				Start: {
					margin: { top: '1rem' },
				},
				Counter: {
					font: { size: '1rem', weight: 500 },
					margin: { top: '0.75rem', bottom: '0.75rem' },
				},
			},
		},
	})
}
